'use strict';

var utils = require('./utils');
var constants = require('./constants');
var LOWERCASE_A_CHARCODE = constants.LOWERCASE_A_CHARCODE;
var LOWERCASE_Z_CHARCODE = constants.LOWERCASE_Z_CHARCODE;
var UPPERCASE_Z_CHARCODE = constants.UPPERCASE_Z_CHARCODE;
var ALPHABET_COUNT = constants.ALPHABET_COUNT;

function getAllShifts(str) {
    var results = {};
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
            newCharCodeOffset = (charCode - utils.UPPERCASE_FIRST_CHARCODE + shiftCount) % ALPHABET_COUNT;
            newChar = String.fromCharCode(newCharCodeOffset + utils.UPPERCASE_FIRST_CHARCODE);
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
