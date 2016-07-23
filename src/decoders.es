'use strict';

const UPPERCASE_FIRST_CHARCODE = 65; //A
const UPPERCASE_LAST_CHARCODE = 90; //Z
const LOWERCASE_FIRST_CHARCODE = 97; //a
const LOWERCASE_LAST_CHARCODE = 122; //z
const ALPHABET_COUNT = 26;

function getAllShifts(str) {
    let results = [];
    for (let i = 0; i < ALPHABET_COUNT; i++) {
        results[i] = shift(str, i);
    }
    return results;
}

//Shifts a str by shiftCount deplacement e.g. shift('ab', 2) -> 'cd'
function shift(str, shiftCount) {
    var chars = str.split('');
    var shifted = [];

    for (let i = 0, len = chars.length; i < len; i++) {
        let charCode = chars[i].charCodeAt(0);
        if (isLowerCase(charCode)) {
            let newCharCodeOffset = (charCode - LOWERCASE_FIRST_CHARCODE + shiftCount) % ALPHABET_COUNT;
            let newChar = String.fromCharCode(newCharCodeOffset + LOWERCASE_FIRST_CHARCODE);
            shifted.push(newChar);
        } else if (isUpperCase(charCode)) {
            let newCharCodeOffset = (charCode - UPPERCASE_FIRST_CHARCODE + shiftCount) % ALPHABET_COUNT;
            let newChar = String.fromCharCode(newCharCodeOffset + UPPERCASE_FIRST_CHARCODE);
            shifted.push(newChar);
        } else {
            shifted.push(chars[i]);
        }
    }
    return shifted.join('');
}

function isLowerCase(char) {
    return char >= LOWERCASE_FIRST_CHARCODE && char <= LOWERCASE_LAST_CHARCODE;
}

function isUpperCase(char) {
    return char >= UPPERCASE_FIRST_CHARCODE && char <= UPPERCASE_LAST_CHARCODE;
}
