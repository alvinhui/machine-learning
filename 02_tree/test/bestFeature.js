const {chooseBestFeatureToSplit} = require('../trees');
const {createDataSet} = require('../helps');

const {dataSet} = createDataSet();
console.log(dataSet);
console.log(chooseBestFeatureToSplit(dataSet));