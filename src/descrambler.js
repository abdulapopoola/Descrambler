'use strict';

var utils = require('./utils');
var constants = require('./constants');
var LOWERCASE_A_CHARCODE = constants.LOWERCASE_A_CHARCODE;
var LOWERCASE_Z_CHARCODE = constants.LOWERCASE_Z_CHARCODE;
var UPPERCASE_A_CHARCODE = constants.UPPERCASE_A_CHARCODE;
var UPPERCASE_Z_CHARCODE = constants.UPPERCASE_Z_CHARCODE;
var UNIGRAM_FREQUENCIES =  constants.UNIGRAM_FREQUENCIES;

function crossEntropy(str, freqArr) {
    if (utils.isGibberish(str)) {
        return Infinity;
    }

    var sum = 0;
    var nonAlphabetical = 0;
    var len = str.length;
    for (var i = 0; i < len; i++) {
        var charCode = str.charCodeAt(i);
        var charFreq;
        if (charCode >= UPPERCASE_A_CHARCODE && charCode <= UPPERCASE_Z_CHARCODE) {
            charFreq = freqArr[charCode - UPPERCASE_A_CHARCODE];
            sum += utils.log2(charFreq);
        } else if (charCode >= LOWERCASE_A_CHARCODE && charCode <= LOWERCASE_Z_CHARCODE) {
            charFreq = freqArr[charCode - LOWERCASE_A_CHARCODE];
            sum += utils.log2(charFreq);
        } else {
            nonAlphabetical++;
        }
    }

    return -(sum / (len - nonAlphabetical));
}

function decryptMany(possibilities) {
    var normalizedFreqs = utils.values(UNIGRAM_FREQUENCIES).map(function(freq) {
        return freq / 100;
    });

    var entropies = [];
    for (var i = 0, len = possibilities.length; i < len; i++) {
        var entropy = crossEntropy(possibilities[i], normalizedFreqs);
        var symbolCount = utils.nonAlphabeticalCharCount(possibilities[i]);
        entropies.push([i, entropy, symbolCount]);
    }

    entropies.sort(function(x, y) {
        // Compare by lowest entropy, then by symbol count and finally break ties by selecting chars index order
        if (x[1] < y[1]) return -1;
        else if (x[1] > y[1]) return 1;
        else if (x[2] < y[2]) return -1;
        else if (x[2] > y[2]) return 1;
        else if (x[0] < y[0]) return -1;
        else if (x[0] > y[0]) return 1;
        else return 0;
    });

    return entropies;
}

module.exports = decryptMany;
