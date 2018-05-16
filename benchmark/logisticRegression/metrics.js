const {yTrue, yPred} = require('./result.json');

console.log('yTrue', yTrue.length);
console.log('yPred', yPred.length);

const accuracy = require('../../accuracy');
const result = accuracy(yTrue, yPred);

console.log('accuracy', result);