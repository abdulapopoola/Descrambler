'use strict';

var crossEntropy = require('../src/descrambler').crossEntropy;
var decryptMany = require('../src/descrambler').decryptMany;
var utils = require('../src/utils');

describe('Descrambler', function () {
    describe('decryptMany', function () {
        it('should return undefined for non-array arguments', function () {
            expect(decryptMany()).toBeUndefined();
            expect(decryptMany(true)).toBeUndefined();
            expect(decryptMany({})).toBeUndefined();
            expect(decryptMany('fdasdfaf')).toBeUndefined();
            expect(decryptMany(null)).toBeUndefined();
        });

        it('should invoked the expected functions', function () {
            var nonAlphabeticalCharCountSpy = spyOn(utils, 'nonAlphabeticalCharCount');

            decryptMany(['sssa']);
            expect(nonAlphabeticalCharCountSpy).toHaveBeenCalled();
        });
    });

    describe('crossEntropy', function () {
        it('should return undefined if str is not a string', function () {
            expect(crossEntropy()).toBeUndefined();
            expect(crossEntropy(true)).toBeUndefined();
            expect(crossEntropy(null)).toBeUndefined();
            expect(crossEntropy(22334)).toBeUndefined();
            expect(crossEntropy({})).toBeUndefined();
        });

        it('should return undefined if freqArr is not an array', function () {
            expect(crossEntropy('aa')).toBeUndefined();
            expect(crossEntropy('aa', true)).toBeUndefined();
            expect(crossEntropy('aa', null)).toBeUndefined();
            expect(crossEntropy('aa', 22334)).toBeUndefined();
            expect(crossEntropy('aa', {})).toBeUndefined();
        });

        it('should return Infinity if str is Gibberish', function () {
            var log2Spy = spyOn(utils, 'log2');
            spyOn(utils, 'isGibberish').and.returnValue(true);
            expect(crossEntropy('aaa', [])).toBe(Infinity);
            expect(log2Spy).not.toHaveBeenCalled();
        });

        it('should invoke utils log function', function () {
            var log2Spy = spyOn(utils, 'log2');
            spyOn(utils, 'isGibberish').and.returnValue(false);
            crossEntropy('test', []);
            expect(log2Spy).toHaveBeenCalled();
        });
    });
});
