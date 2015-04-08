var request = require('request');
/**
 * DarkSky module retrieves the forecast data using the api from DarkSky.
 * Url is formatted according to information provided at:
 * http://developer.forecast.io
 * @module lib/darksky
 */
function DarkSky() {

    /**
     * Prepares the Dark Sky Forecast API get request per https://developer.forecast.io/docs/v2
     * Does not implement 'TimeMachine' functionality.
     * @method
     * @param {Object} options - {apiUrl:<string>,apiKey:<string>,lat:<float>,lng:<float>,units:<string/optional>}
     * @param {function} callback - async callback function
     */
    function getData(options, callback) {

        if(!options || Object.keys(options).length < 4) throw new Error('Valid options: { apiUrl:<string>, apiKey:<string>, lat:<float>, lng:<float>, units:<string/optional> }');
        if(!options.hasOwnProperty('apiUrl')) throw new Error('Please pass in a valid DarkSky forecast API url');
        if(!options.hasOwnProperty('apiKey')) throw new Error('Please pass in a valid DarkSky forecast API key');
        if(!options.hasOwnProperty('lat')) throw new Error('Please pass in a valid latitude to get a forecast');
        if(!options.hasOwnProperty('lng')) throw new Error('Please pass in a valid longitude to get a forecast');

        if (options.apiKey == '<add secret api key here>') {
            throw new Error('Please supply your API key.  This can found in /config.js');
        }
        if (isNaN(options.lat) || options.lat < -90 || options.lat > 90) {
            throw new Error('Please pass in a valid latitude - got bad value of "' + options.lat + '"');
        }
        if (isNaN(options.lng) || options.lng < -180 || options.lng > 180) {
            throw new Error('Please pass in a valid longitude - got bad value of "' + options.lng + '"');
        }

        var dataUrl = options.apiUrl;

        Object.keys(options).forEach(function(key) {
            dataUrl = dataUrl.replace('['+key+']', options[key]);
        });

        request.get(dataUrl, function(err, response, body){
            if (err !== null || ((response.statusCode / 100) >> 0 !== 2)) {
                console.log(err, response);
                callback(new Error('Bad call to dark sky api.forecast.io'), response);
            } else {
                callback(null, response, body);
            }
        });

    }

    return {
        getData: getData
    }

};

module.exports = DarkSky;
