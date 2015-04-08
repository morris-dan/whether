/**
 * LatLng module for looking up the lat/lng of a city.
 * 
 * Hard-coded for the requirements of this exercise (sydney|brisbane)
 * Maybe make a call to https://maps.googleapis.com/maps/api/geocode/json?address=sydney?
 * 
 * @module lib/latlng
 */
function LatLng() {

    /**
     * Looks up the lat and long of the city.
     * @method
     * @param {string} city - The city whose lat and lng we are looking up.
     */
    function lookup(city) {

        this.lat = null;
        this.lng = null;

        switch (city.toLowerCase()) {

            case 'brisbane':
                this.lat = -27.4667;
                this.lng = 153.0333;
                break;

            case 'sydney':
                this.lat = -33.8733;
                this.lng = 151.2112;
                break;

        }

        if (this.lat === null) {
            throw new Error('Cannot find city ' + city);
        }

        return {
            lat: this.lat,
            lng: this.lng,
            city: city.toLowerCase()
        }

    };

    return {
        lookup: lookup
    }

};

module.exports = LatLng;
