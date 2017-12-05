const {chooseBestFeatureToSplit, createDataSet} = require('../trees');

const {dataSet} = createDataSet();
console.log(dataSet);
console.log(chooseBestFeatureToSplit(dataSet));