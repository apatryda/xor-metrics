const { createHash } = require('crypto');

const L = [
  0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4,
  1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5,
  1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5,
  2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6,
  1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5,
  2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6,
  2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6,
  3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7,
  1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5,
  2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6,
  2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6,
  3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7,
  2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6,
  3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7,
  3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7,
  4, 5, 5, 6, 5, 6, 6, 7, 5, 6, 6, 7, 6, 7, 7, 8,
];

const XorMetrics = {

  xorSpan(a, b, encAB, encB) {
    const A = a instanceof Buffer ? a : Buffer.from(a, encAB);
    const B = b instanceof Buffer ? b : Buffer.from(b, encB || encAB);
    const n = Math.min(A.length, B.length);
    let span = 0;

    for (let i = 0; i < n; i++) {
      span += L[A[i] ^ B[i]];
    }

    return span;
  },

  hashSpan(a, b, algorithm = 'sha256', encAB = 'utf8', encB) {
    const aIsADigest = String(encAB).startsWith('digest');
    const bIsADigest = encB ? String(encB).startsWith('digest') : aIsADigest;

    let A;

    if (aIsADigest) {
      A = a instanceof Buffer ? a : Buffer.from(a, encAB);
    } else {
      const hash = createHash(algorithm);
      hash.update(a, a instanceof Buffer ? undefined : String(encAB).slice('digest:'.length));
      A = hash.digest();
    }

    let B;

    if (bIsADigest) {
      B = b instanceof Buffer ? b : Buffer.from(b, encB || encAB);
    } else {
      const hash = createHash(algorithm);
      hash.update(b, b instanceof Buffer ? undefined : String(encB || encAB).slice('digest:'.length));
      B = hash.digest();
    }

    return XorMetrics.xorSpan(A, B);
  },

}

module.exports = XorMetrics;
