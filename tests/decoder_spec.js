'use strict';

var shift = require('../src/decoder').shift;
var getAllShifts = require('../src/decoder').getAllShifts;

describe('Decoder', function () {
    describe('Shift', function () {
        describe('with characters', function () {
            it('can shift a single char', function () {
                expect(shift('a', 2)).toBe('c');
            });

            it('does not shift when shiftCount is zero', function () {
                expect(shift('a', 0)).toBe('a');
            });

            it('defaults shiftCount to 0', function () {
                expect(shift('a')).toBe('a');
            });

            it('can shift backwards using negative shiftCount values', function () {
                expect(shift('c', -2)).toBe('a');
            });

            it('can wrap around with large shiftCount values', function () {
                expect(shift('a', 51)).toBe('z');
            });

            it('can wrap around with large shiftCount values', function () {
                expect(shift('a', -53)).toBe('z');
            });

            it('does not shift non-alphabetical values', function () {
                expect(shift('~', -53)).toBe('~');
            });
        });

        describe('with strings', function () {
            it('can shift strings', function () {
                expect(shift('abcdef', 3)).toBe('defghi');
            });

            it('does not shift when shiftCount is zero', function () {
                expect(shift('aaaa', 0)).toBe('aaaa');
            });

            it('can wrap around with large shiftCount values', function () {
                expect(shift('aaa', -53)).toBe('zzz');
            });
        });

        describe('mirrors non-string-like values', function () {
            it('returns undefined for undefined arguments', function () {
                expect(shift()).toBeUndefined();
            });

            it('returns number value for number values', function () {
                expect(shift(33333)).toBe(33333);
            });
        });
    });

    describe('GetAllShifts', function () {
        it('returns an object', function () {
            expect(getAllShifts('aaa')).toBeDefined();
        });
    });
});
