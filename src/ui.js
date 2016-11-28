'use strict';

var caeser = require('./caeser');

var decode = function () {
    var cipherInput = document.getElementById('cipherInput').value;
    var decoded = caeser.decode(cipherInput);
    document.getElementById('decodedCipher').value = decoded;
};

var updateUIElements = function () {
    var cipherInput = document.getElementById('cipherInput').value;
    var decoded = caeser.decode(cipherInput);
    document.getElementById('decodedCipher').value = decoded;
};

module.exports = {
    decode: decode,
    revealAllInfo: updateUIElements
};
