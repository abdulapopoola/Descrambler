'use strict';

var caeser = require('../src/caeser');

describe('Caeser', function () {
    it('can encode a string', function () {
        var string = 'Actions speak louder than words';
        var encoded = 'Kmdsyxc czoku vyenob drkx gybnc';
        expect(caeser.encode(string, 10)).toBe(encoded);
    });

    it('can decode an encoded string', function () {
        var string = 'Actions speak louder than words';
        var encoded = caeser.encode(string, 10);
        var decoded = caeser.decode(encoded);
        expect(decoded).toBe(string);
    });
});
