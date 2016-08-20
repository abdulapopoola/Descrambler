'use strict';

var caeser = require('./caeser');

//Get text from textarea
//Add button listener
//Show shift
//show entropy
var decode = function () {
    var cipherInput = document.getElementById('cipherInput').value;
    var decoded = caeser.decode(cipherInput);
    document.getElementById('decodedCipher').value = decoded;
};

module.exports = decode;
