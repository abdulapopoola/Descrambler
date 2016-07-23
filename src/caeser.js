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
    decode: decode
};
