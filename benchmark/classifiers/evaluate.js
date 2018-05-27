const {storeModel} = require('../utils');

module.exports = function(validate, filename) {
  const {yTrue, yPred} = validate;

  console.log('yTrue', yTrue.length);
  console.log('yPred', yPred.length);

  const accuracy = require('../accuracy');
  const result = accuracy(yTrue, yPred);

  storeModel(result, filename);
}