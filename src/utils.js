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
