var expect = require('chai').expect;
var pickday = require('../lib/pickday');

describe('pickday', function () {
    describe('.lookup()', function () {

        var dataStartingMonday = [
            { time: 1428242400, summary: 'Weathery Mon' },
            { time: 1428328800, summary: 'Weathery Tues' },
            { time: 1428415200, summary: 'Weathery Weds' },
            { time: 1428501600, summary: 'Weathery Thu' },
            { time: 1428588000, summary: 'Weathery Fri' },
            { time: 1428674400, summary: 'Weathery Sat' },
            { time: 1428760800, summary: 'Weathery Sun' },
            { time: 1428847200, summary: 'Weathery Mon' }
        ];

        var daysOfWeek = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];

        it('throws an error if time property is not present in an element', function () {
            var picker = new pickday();
            expect(
                picker.lookup.bind(picker, 
                    [
                        { testing: 'asdf' }
                    ],
                    daysOfWeek, 'wednesday')
            ).to.throw('Element has no timestamp');
        });

        it('throws an error if time property is not an integer', function () {
            var picker = new pickday();
            expect(
                picker.lookup.bind(picker, 
                    [
                        { time: 'asdf' }
                    ],
                    daysOfWeek, 'wednesday')
            ).to.throw('Property \'time\' is not a number');
        });

        it('throws an error if the day isn\'t found', function () {
            var picker = new pickday();
            expect(
                picker.lookup.bind(picker, dataStartingMonday, daysOfWeek, 'asdf')
            ).to.throw('Cannot find day asdf');
        });

        it('returns the first element whose timestamp resolves to a monday in data', function () {
            var picker = new pickday();
            expect(picker.lookup(dataStartingMonday, daysOfWeek, 'monday')).to.have.property('time').equal(1428242400);
        });

        it('returns the first element whose timestamp resolves to a tuesday in data', function () {
            var picker = new pickday();
            expect(picker.lookup(dataStartingMonday, daysOfWeek, 'tuesday')).to.have.property('time').equal(1428328800);
        });

    });
});
