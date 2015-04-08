var _ = require('underscore');
/**
 * PickDay module for finding the data element whose time property resolves to a day of the week
 * @module lib/pickday
 */
function PickDay() {

    /**
     * Searches for the element in the data whose time property resolves to the passed day, given a list of day names compatible.
     * If the element does not have a property time, throw an error.
     * If the element's time property does not resolve to a unix timestamp, throw an error.
     * If the element's time property does not match one in the data, throw an error.
     * @method
     * @param {Array} data - The daily data from api.forecast.io.
     * @param {Array} dayNames - The array of day names that match indices of Data.getDay().
     * @param {string} dayOfWeek - The name of the day that we have been passed.
     * @returns {Object} JSON object of the day's forecast data.
     */
    function lookup(data, dayNames, dayOfWeek) {

        var res = _.filter(data, function(el,ix){
            if (!el.hasOwnProperty('time')) {
                throw new Error('Element has no timestamp');
            }
            if (typeof el.time !== "number") {
                throw new Error('Property \'time\' is not a number');
            }
            var d = new Date(el.time * 1000);
            // console.log(dayOfWeek, d.getDay(), dayNames[d.getDay()], dayNames[d.getDay()] === dayOfWeek)
            return (dayNames[d.getDay()] === dayOfWeek);
        });

        if (res.length === 0) {
            throw new Error('Cannot find day ' + dayOfWeek);
        }

        return res[0];

    };

    return {
        lookup: lookup
    }

};

module.exports = PickDay;
