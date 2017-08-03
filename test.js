const { createHash } = require('crypto');
const { hashSpan, xorSpan } = require('.');

const a = 'abcdefghi';
const b = 'bacdefghi';

console.log(xorSpan(a, a));
console.log(hashSpan(a, a));

const hashA = createHash('sha256');
const hashB = createHash('sha256');

hashA.update(a);
hashB.update(b);

const digestA = hashA.digest();
const digestB = hashB.digest();

console.log(xorSpan(a, b));
console.log(xorSpan(digestA, digestB));
console.log(hashSpan(a, b));
console.log(hashSpan(a, digestB, undefined, undefined, 'digest'));
