'use strict';

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

function decrypt() {
    
}

function entropy(str, freqArr) {
    str = str.toLowerCase();
    var sum = 0;
    var nonAlphabetical = 0;
    for(var i = 0, len = str.length; i < len; i++){
        var charIndex = str.charCodeAt(i);
        if( charIndex >=65 && charIndex <= 90){
            var charFreq = freqArr[charIndex - 65];
            sum += Math.log(charFreq);    
        } else {
            nonAlphabetical++;
        }
    }
    return -(sum * (len - nonAlphabetical)) / Math.log(2);
}

module.exports = decrypt;