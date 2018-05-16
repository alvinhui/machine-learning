const {storeModel} = require('../utils');

module.exports = function(evaluate, filename) {
  const {yTrue, yPred} = evaluate;

  console.log('yTrue', yTrue.length);
  console.log('yPred', yPred.length);

  const accuracy = require('../accuracy');
  const result = accuracy(yTrue, yPred);

  storeModel(result, filename);
}