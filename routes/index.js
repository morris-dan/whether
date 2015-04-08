var express = require('express');
var router = express.Router();
var latLng = require('../lib/latlng');
var pickDay = require('../lib/pickday')
var darkSky = require('../lib/darksky');
var config = require('../config')

/* GET home page. */

router.get('/', function(req, res) {
    res.render('index', { title: 'Weather Forecast' });
});

router.get('/weather', function(req, res) {
    res.render('index', { title: 'Weather Forecast' });
});

router.get('/weather/:city', function(req, res, next) {
  
    // lookup the city
    var coords = new latLng();
    coords.lookup(req.params.city);

    // retrieve the forecast for the coords of that city
    var forecast = new darkSky();
    forecast.getData(
        {
            apiUrl: config.dataUrl,
            apiKey: config.apiKey, 
            lat: coords.lat, 
            lng: coords.lng, 
            units: config.units
        },
        function(err, response, body) {

            if (err) {
                console.log('error getting forecast : http%i', response.statusCode);
            }
            else {

                var responseData = JSON.parse(body);

                console.log('success getting forecast : http%i', response.statusCode);

                if(/text\/html/.test(req.get('accept'))) {
                    // html response
                    res.render('weather', { 
                        title: 'Weather Forecast', 
                        city: req.params.city, 
                        coords: coords, 
                        data: responseData.daily 
                    });
                }
                else {
                    // json response
                    res.json({ title: 'Weather Forecast in JSON', city: req.params.city, coords: coords, data: responseData.daily });
                }

            }
        }
    );

});

router.get('/weather/:city/:dayOfWeek', function(req, res, next) {

  var coords = new latLng();
  coords.lookup(req.params.city);

  var forecast = new darkSky();
    forecast.getData(
        {
            apiUrl: config.dataUrl,
            apiKey: config.apiKey, 
            lat: coords.lat, 
            lng: coords.lng, 
            units: config.units
        },
        function(err, response, body) {

            if (err) {
                console.log('error getting forecast for s% : http%i', req.params.dayOfWeek, response.statusCode);
            }
            else {

                var responseData = JSON.parse(body);
                var picker = new pickDay();
                var thusDay = null;

                // pick the first element if today
                if (req.params.dayOfWeek === 'today') {

                    thusDay = responseData.daily.data[0];

                }
                else {
                    // use the day picker which examines the day of each time stamp
                    try {
                        thusDay = picker.lookup(responseData.daily.data, config.daysOfWeek, req.params.dayOfWeek);
                    }
                    catch (error) {
                        return next(error);
                    }

                }

                console.log('success getting forecast for %s : http%i', req.params.dayOfWeek, response.statusCode);

                if(/text\/html/.test(req.get('accept'))) {
                    // html response
                    res.render('daily', {
                        title: 'Weather Forecast', 
                        city: req.params.city, 
                        coords: coords,
                        dayOfWeek: req.params.dayOfWeek,
                        data: thusDay
                    });
                }
                else {
                    // json response
                    res.json({ title: 'Weather Forecast in JSON', city: req.params.city, coords: coords, dayOfWeek: req.params.dayOfWeek, data: thusDay });
                }

            }
        }
    );

});

module.exports = router;
