const evaluate = require('./evaluate.json');
const metrics = require('../metrics');
const path = require('path');

let {yTrue, yPred} = evaluate;
yPred = yPred.map(function(item) {
  return item[0].intent;
});

metrics({yTrue, yPred}, path.join(__dirname, 'metrics.json'));