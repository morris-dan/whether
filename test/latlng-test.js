var expect = require('chai').expect;
var latLng = require('../lib/latlng');

describe('latLng', function () {
  describe('.lookup()', function () {

    it('throws an error for atlantis', function () {
      var coords = new latLng();
      expect(
          coords.lookup.bind(coords, 'atlantis')
      ).to.throw('Cannot find city atlantis');
    });

    it('returns the correct coordinates for sydney', function () {
      var coords = new latLng();
      expect(coords.lookup('sydney')).to.deep.equal({ 
        lat:-33.8733, 
        lng:151.2112, 
        city: 'sydney' 
      });
    });

    it('returns the correct coordinates for brisbane', function () {
      var coords = new latLng();
      var res = coords.lookup('brisbane');
      expect(res.lat)
      .to.be.above(-27.467)
      .and.to.be.below(-27.466);
      expect(res.lng)
      .to.be.above(153.033)
      .and.to.be.below(153.034);

    });

  });
});
