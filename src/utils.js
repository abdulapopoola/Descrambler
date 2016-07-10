'use strict';

var UPPERCASE_FIRST_CHARCODE = 65; //A
var UPPERCASE_LAST_CHARCODE = 90; //Z
var LOWERCASE_FIRST_CHARCODE = 97; //a
var LOWERCASE_LAST_CHARCODE = 122; //z
var ALPHABET_COUNT = 26;

function isLowerCaseCharCode(char) {
    return char >= LOWERCASE_FIRST_CHARCODE && char <= LOWERCASE_LAST_CHARCODE;
}

function isUpperCaseCharCode(char) {
    return char >= UPPERCASE_FIRST_CHARCODE && char <= UPPERCASE_LAST_CHARCODE;
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
    UPPERCASE_FIRST_CHARCODE: UPPERCASE_FIRST_CHARCODE,
    log2: log2,
    values: values
};
