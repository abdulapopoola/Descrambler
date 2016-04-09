//'use strict';

const UPPERCASE_FIRST_CHARCODE = 65; //A
const UPPERCASE_LAST_CHARCODE = 90; //Z
const LOWERCASE_FIRST_CHARCODE = 97; //a
const LOWERCASE_LAST_CHARCODE = 122; //z
const ALPHABET_COUNT = 26;

var frequencies = {
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

function decrypt(str) {
    let normalizedFreqs = values(frequencies).map(function(freq){
        return freq / 100;
    });
    
    let possibilities = getAllShifts(str);
    let entropies = [];
    for(let i = 0, len = Object.keys(possibilities).length; i < len; i++){
        let entropy = crossEntropy(possibilities[i], normalizedFreqs);
        entropies.push([i, entropy]);    
    }    
    
    entropies.sort(function(x, y) {
		// Compare by lowest entropy, break ties by lowest shift
		if (x[1] < y[1]) return -1;
		else if (x[1] > y[1]) return 1;
		else if (x[0] < y[0]) return -1;
		else if (x[0] > y[0]) return 1;
		else return 0;
	});
    
    let bestAnswerIndex = entropies[0][0];
    return possibilities[bestAnswerIndex];
}

function getAllShifts(str) {
    let results = {};
    for(let i = 0; i < ALPHABET_COUNT; i++){
        results[i] = shift(str, i);
    }
    return results;
}

//Shifts a str by shiftCount deplacement e.g. shift('aa', 2) -> 'cc'
function shift(str, shiftCount) {
    var chars = str.split('');
    var shifted = [];
    
    for(let i = 0, len = chars.length; i < len; i++){
        let charCode = chars[i].charCodeAt(0);
        if(isLowerCase(charCode)){
            let newCharCodeOffset = modulo(charCode - LOWERCASE_FIRST_CHARCODE - shiftCount, ALPHABET_COUNT);
            let newChar = String.fromCharCode(newCharCodeOffset + LOWERCASE_FIRST_CHARCODE);
            shifted.push(newChar);
        } else if(isUpperCase(charCode)) {
            let newCharCodeOffset = modulo(charCode - UPPERCASE_FIRST_CHARCODE - shiftCount, ALPHABET_COUNT);
            let newChar = String.fromCharCode(newCharCodeOffset + UPPERCASE_FIRST_CHARCODE);
            shifted.push(newChar);            
        } else {
            shifted.push(chars[i]);
        }
    }
    return shifted.join('');
}

// Cross entropy: https://en.wikipedia.org/wiki/Cross_entropy
function crossEntropy(str, freqArr) {
    str = str.toLowerCase();
    var sum = 0;
    var nonAlphabetical = 0;
    var len = str.length;
    for(var i = 0; i < len; i++){
        var charIndex = str.charCodeAt(i);
        if( charIndex >=97 && charIndex <= 122){
            var charFreq = freqArr[charIndex - 97];
            sum += log2(charFreq);    
        } else {
            nonAlphabetical++;
        }
    }
    return -(sum / (len - nonAlphabetical));
}

function log2(val){
    if(Math.log2){
        return Math.log2(val);
    } else {
        return Math.log(val) / Math.log(2);
    }
}

function isLowerCase(char){
    return char >= LOWERCASE_FIRST_CHARCODE && char <= LOWERCASE_LAST_CHARCODE;
}

function isUpperCase(char){
    return char >= UPPERCASE_FIRST_CHARCODE && char <= UPPERCASE_LAST_CHARCODE;
}

function modulo(dividend, divisor){
    let modulo = dividend % divisor;
    if(modulo < 0){
        //ensure it wraps around
        modulo += dividend;
    }
    return modulo;
}

function values(obj){
    return Object.keys(obj).map(key => obj[key]);
}

decrypt('GUVF VF FBZR FNZCYR GRKG URER.');
//module.exports = decrypt;