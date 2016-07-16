'use strict';

var UNIGRAM_FREQUENCIES = {
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

var constants = {
    UPPERCASE_A_CHARCODE: 65, //A
    UPPERCASE_Z_CHARCODE: 90, //Z
    LOWERCASE_A_CHARCODE: 97, //a
    LOWERCASE_Z_CHARCODE: 122, //z
    ALPHABET_COUNT: 26,
    UNIGRAM_FREQUENCIES: UNIGRAM_FREQUENCIES
};

Object.freeze(constants);

module.exports = constants;
