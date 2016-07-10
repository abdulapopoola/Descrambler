'use strict';

var utils = require('./utils');

var LOWERCASE_A_CHARCODE = 97; //a
var LOWERCASE_Z_CHARCODE = 122; //z
var UPPERCASE_A_CHARCODE = 65; //A
var UPPERCASE_Z_CHARCODE = 90; //Z

var UNIGRAM_FREQUENCIES = {
    a: 8.04,
    b: 1.48,
    c: 3.34,
    d: 3.82,
    e: 12.49,
    f: 2.40,
    g: 1.87,
    h: 5.05,
    i: 7.57,
    j: 0.16,
    k: 0.54,
    l: 4.07,
    m: 2.51,
    n: 7.23,
    o: 7.64,
    p: 2.14,
    q: 0.12,
    r: 6.28,
    s: 6.51,
    t: 9.28,
    u: 2.73,
    v: 1.05,
    w: 1.68,
    x: 0.23,
    y: 1.66,
    z: 0.09
};

function crossEntropy(str, freqArr) {
    if (isGibberish(str)) {
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
        var symbolCount = nonAlphaSymbolCount(possibilities[i]);
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

function nonAlphaSymbolCount(str) {
    var strippedStr = str.replace(/\s/g, '').toLowerCase();
    var strLen = strippedStr.length;

    var count = 0;
    for (var i = 0; i < strLen; i++) {
        var charCode = strippedStr.charCodeAt(i);
        if (charCode < LOWERCASE_A_CHARCODE || charCode > LOWERCASE_Z_CHARCODE) {
            count++;
        }
    }

    return count;
}

function isGibberish(str, tolerance) {
    var nonAlphabetical = nonAlphaSymbolCount(str);
    tolerance = tolerance || 0.2;
    return nonAlphabetical > str.length * tolerance;
}

module.exports = decryptMany;
