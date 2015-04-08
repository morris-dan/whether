var expect = require('chai').expect;
var nock = require('nock');
var darksky = require('../lib/darksky');
var config  = require('../config');

describe('darksky', function () {

    describe('.getData() throws error when incorrectly initialised', function () {

        it('throws an error when options are empty', function(){

            var forecast = new darksky();

            expect(
                forecast.getData.bind(forecast, {}, function(){})
            ).to.throw('Valid options: { apiUrl:<string>, apiKey:<string>, lat:<float>, lng:<float>, units:<string/optional> }');

        });

        it('throws an error when required options are invalid', function(){

            var forecast = new darksky();
            var options = {
                apiUrl: 'asdf',
                apiKey: 'asdf',
                lat: 'asdf',
                lng: 'asdf',
            };

            expect(
                forecast.getData.bind(forecast, options, function(){})
            ).to.throw('Please pass in a valid latitude - got bad value of "asdf"');

        });

    });

    describe('.getData() mock data matches the expected structure', function(){

        var options = {
            apiUrl: config.dataUrl,
            apiKey: 'apikey',
            lat: -45, 
            lng: 90, 
            units: 'si'
        };

        beforeEach(function(){

            // nock up the expected json response
            nock('https://api.forecast.io')
                .get('/forecast/apikey/-45,90?units=si')
                .replyWithFile(201, __dirname + '/../public/data/sydney.json');

        });

        it('.contains object data.currently', function(){
            var forecast = new darksky();
            forecast.getData(options, function(err, data) {
                if (err) {
                    console.log('error getting forecast : ', err);
                }
                else {
                    var responseData = JSON.parse(data.body);
                    expect(responseData.currently).to.instanceOf(Object);
                    expect(Object.keys(responseData.currently).length).to.be.above(0);
                }
            });
        });

        it('contains array data.daily.data', function(){
            var forecast = new darksky();
            forecast.getData(options, function(err, data) {
                if (err) {
                    console.log('error getting forecast : ', err);
                }
                else {
                    var responseData = JSON.parse(data.body);
                    expect(responseData.daily.data).to.be.instanceOf(Array);
                    expect(responseData.daily.data.length).to.be.above(0);
                }
            });
        });

    });

});