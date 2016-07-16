'use strict';

var constants = require('./constants');
var LOWERCASE_A_CHARCODE = constants.LOWERCASE_A_CHARCODE;
var LOWERCASE_Z_CHARCODE = constants.LOWERCASE_Z_CHARCODE;
var UPPERCASE_A_CHARCODE = constants.UPPERCASE_A_CHARCODE;
var UPPERCASE_Z_CHARCODE = constants.UPPERCASE_Z_CHARCODE;
var ALPHABET_COUNT = constants.ALPHABET_COUNT;

function isLowerCaseCharCode(char) {
    return char >= LOWERCASE_A_CHARCODE && char <= LOWERCASE_Z_CHARCODE;
}

function isUpperCaseCharCode(char) {
    return char >= UPPERCASE_A_CHARCODE && char <= UPPERCASE_Z_CHARCODE;
}

function isString(val) {
    return typeof val === 'string';
}

function log2(val) {
    if (Math.log2) {
        return Math.log2(val);
    } else {
        return Math.log(val) / Math.log(2);
    }
}

function values(obj) {
    return Object.keys(obj).map(function (key) {
        return obj[key];
    });
}

module.exports = {
    isLowerCaseCharCode: isLowerCaseCharCode,
    isUpperCaseCharCode: isUpperCaseCharCode,
    isString: isString,
    log2: log2,
    values: values
};
