'use strict';

const LOWERCASE_A_CHARCODE = 97; //a
const LOWERCASE_Z_CHARCODE = 122; //z
const UPPERCASE_A_CHARCODE = 65; //A
const UPPERCASE_Z_CHARCODE = 90; //Z

const UNIGRAM_FREQUENCIES = {
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

function crossEntropy(str, freqArr) {
    if (isGibberish(str)) {
        return Infinity;
    }

    let sum = 0;
    let nonAlphabetical = 0;
    let len = str.length;
    for (let i = 0; i < len; i++) {
        let charCode = str.charCodeAt(i);
        if (charCode >= UPPERCASE_A_CHARCODE && charCode <= UPPERCASE_Z_CHARCODE) {
            let charFreq = freqArr[charCode - UPPERCASE_A_CHARCODE];
            sum += log2(charFreq);
        } else if (charCode >= LOWERCASE_A_CHARCODE && charCode <= LOWERCASE_Z_CHARCODE) {
            let charFreq = freqArr[charCode - LOWERCASE_A_CHARCODE];
            sum += log2(charFreq);
        } else {
            nonAlphabetical++;
        }
    }

    return -(sum / (len - nonAlphabetical));
}

function decryptMany(possibilities) {
    let normalizedFreqs = values(UNIGRAM_FREQUENCIES).map(freq => freq / 100);

    let entropies = [];
    for (let i = 0, len = possibilities.length; i < len; i++) {
        let entropy = crossEntropy(possibilities[i], normalizedFreqs);
        let symbolCount = nonAlphaSymbolCount(possibilities[i]);
        entropies.push([i, entropy, symbolCount]);
    }

    entropies.sort(function(x, y) {
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

function nonAlphaSymbolCount(str) {
    let strippedStr = str.replace(/\s/g, '').toLowerCase();
    let strLen = strippedStr.length;

    let count = 0;
    for (let i = 0; i < strLen; i++) {
        let charCode = strippedStr.charCodeAt(i);
        if (charCode < LOWERCASE_A_CHARCODE || charCode > LOWERCASE_Z_CHARCODE) {
            count++;
        }
    }

    return count;
}

function isGibberish(str, tolerance) {
    let nonAlphabetical = nonAlphaSymbolCount(str);
    tolerance = tolerance || 0.2;
    return nonAlphabetical > str.length * tolerance;
}

function log2(val) {
    if (Math.log2) {
        return Math.log2(val);
    } else {
        return Math.log(val) / Math.log(2);
    }
}

function values(obj) {
    return Object.keys(obj).map(key => obj[key]);
}

exports.decryptMany = decryptMany;