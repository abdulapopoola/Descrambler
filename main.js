(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.decrypt = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var shift = require('./decoder').shift;
var getAllShifts = require('./decoder').getAllShifts;
var decryptMany = require('./descrambler').decryptMany;

function encode(str, shiftCount) {
    return shift(str, shiftCount);
}

function decode(str) {
    var allPossibleStrs = getAllShifts(str);
    var options = decryptMany(allPossibleStrs);
    var index = options[0][0];
    return allPossibleStrs[index];
}

module.exports = {
    encode: encode,
    decode: decode,
    decrypted: decryptMany
};

},{"./decoder":3,"./descrambler":4}],2:[function(require,module,exports){
'use strict';

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

var constants = {
    UPPERCASE_A_CHARCODE: 65, //A
    UPPERCASE_Z_CHARCODE: 90, //Z
    LOWERCASE_A_CHARCODE: 97, //a
    LOWERCASE_Z_CHARCODE: 122, //z
    ALPHABET_COUNT: 26,
    UNIGRAM_FREQUENCIES: UNIGRAM_FREQUENCIES
};

Object.freeze(constants);

module.exports = constants;

},{}],3:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var constants = require('./constants');
var LOWERCASE_A_CHARCODE = constants.LOWERCASE_A_CHARCODE;
var LOWERCASE_Z_CHARCODE = constants.LOWERCASE_Z_CHARCODE;
var UPPERCASE_A_CHARCODE = constants.UPPERCASE_A_CHARCODE;
var UPPERCASE_Z_CHARCODE = constants.UPPERCASE_Z_CHARCODE;
var ALPHABET_COUNT = constants.ALPHABET_COUNT;

function getAllShifts(str) {
    var results = [];
    for (var i = 0; i < ALPHABET_COUNT; i++) {
        results[i] = shift(str, i);
    }
    return results;
}

//Shifts a str by shiftCount deplacement e.g. shift('ab', 2) -> 'cd'
function shift(str, shiftCount) {
    if (!utils.isString(str)) {
        return str;
    }

    var chars = str.split('');
    var shifted = [];
    shiftCount = shiftCount || 0;
    while (shiftCount < 0) {
        shiftCount += ALPHABET_COUNT;
    }

    for (var i = 0, len = chars.length; i < len; i++) {
        var charCode = chars[i].charCodeAt(0);
        var newCharCodeOffset;
        var newChar;
        if (utils.isLowerCaseCharCode(charCode)) {
            newCharCodeOffset = (charCode - LOWERCASE_A_CHARCODE + shiftCount) % ALPHABET_COUNT;
            newChar = String.fromCharCode(newCharCodeOffset + LOWERCASE_A_CHARCODE);
            shifted.push(newChar);
        } else if (utils.isUpperCaseCharCode(charCode)) {
            newCharCodeOffset = (charCode - UPPERCASE_A_CHARCODE + shiftCount) % ALPHABET_COUNT;
            newChar = String.fromCharCode(newCharCodeOffset + UPPERCASE_A_CHARCODE);
            shifted.push(newChar);
        } else {
            shifted.push(chars[i]);
        }
    }
    return shifted.join('');
}

module.exports = {
    shift: shift,
    getAllShifts: getAllShifts
};

},{"./constants":2,"./utils":6}],4:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var constants = require('./constants');
var LOWERCASE_A_CHARCODE = constants.LOWERCASE_A_CHARCODE;
var LOWERCASE_Z_CHARCODE = constants.LOWERCASE_Z_CHARCODE;
var UPPERCASE_A_CHARCODE = constants.UPPERCASE_A_CHARCODE;
var UPPERCASE_Z_CHARCODE = constants.UPPERCASE_Z_CHARCODE;
var UNIGRAM_FREQUENCIES = constants.UNIGRAM_FREQUENCIES;

function crossEntropy(str, freqArr) {
    if (!Array.isArray(freqArr) || !utils.isString(str)) {
        return;
    }

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
    if (!Array.isArray(possibilities)) {
        return;
    }

    var normalizedFreqs = utils.values(UNIGRAM_FREQUENCIES).map(function (freq) {
        return freq / 100;
    });

    var entropies = [];
    for (var i = 0, len = possibilities.length; i < len; i++) {
        var entropy = crossEntropy(possibilities[i], normalizedFreqs);
        var symbolCount = utils.nonAlphabeticalCharCount(possibilities[i]);
        entropies.push([i, entropy, symbolCount]);
    }

    entropies.sort(function (x, y) {
        // should this be exposed to the user?
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

module.exports = {
    decryptMany: decryptMany,
    crossEntropy: crossEntropy
};


},{"./constants":2,"./utils":6}],5:[function(require,module,exports){
'use strict';

var caeser = require('./caeser');

var decode = function () {
    var cipherInput = document.getElementById('cipherInput').value;
    var decoded = caeser.decode(cipherInput);
    document.getElementById('decodedCipher').value = decoded;
};

module.exports = decode;

},{"./caeser":1}],6:[function(require,module,exports){
'use strict';

var constants = require('./constants');
var LOWERCASE_A_CHARCODE = constants.LOWERCASE_A_CHARCODE;
var LOWERCASE_Z_CHARCODE = constants.LOWERCASE_Z_CHARCODE;
var UPPERCASE_A_CHARCODE = constants.UPPERCASE_A_CHARCODE;
var UPPERCASE_Z_CHARCODE = constants.UPPERCASE_Z_CHARCODE;
var ALPHABET_COUNT = constants.ALPHABET_COUNT;

function isLowerCaseCharCode(charCode) {
    return charCode >= LOWERCASE_A_CHARCODE && charCode <= LOWERCASE_Z_CHARCODE;
}

function isUpperCaseCharCode(charCode) {
    return charCode >= UPPERCASE_A_CHARCODE && charCode <= UPPERCASE_Z_CHARCODE;
}

function isString(val) {
    return typeof val === 'string';
}

function isObjectOrArray(val) {
    return typeof val === 'object';
}

function isString(val) {
    return typeof val === 'string' || val instanceof String;
}

function log2(val) {
    if (Math.log2) {
        return Math.log2(val);
    } else {
        return Math.log(val) / Math.log(2);
    }
}

function values(obj) {
    if (!obj || !isObjectOrArray(obj)) {
        return;
    }
    return Object.keys(obj).map(function (key) {
        return obj[key];
    });
}

function nonAlphabeticalCharCount(str) {
    if (!isString(str)) {
        return;
    }

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
    if (!isString(str)) {
        return;
    }

    var nonAlphabetical = nonAlphabeticalCharCount(str);
    tolerance = tolerance || 0.2;
    return nonAlphabetical > str.length * tolerance;
}

module.exports = {
    isLowerCaseCharCode: isLowerCaseCharCode,
    isUpperCaseCharCode: isUpperCaseCharCode,
    isString: isString,
    log2: log2,
    values: values,
    nonAlphabeticalCharCount: nonAlphabeticalCharCount,
    isGibberish: isGibberish
};

},{"./constants":2}]},{},[5])(5)
});