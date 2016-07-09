'use strict';

var decoders = require('../src/decoder');

describe('Decoders', function() {
    it('creates files', function() {
        expect(decoders('a')).toBe(true);
    });
});
