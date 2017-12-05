const {splitDataSet, createDataSet} = require('../trees');

const {dataSet} = createDataSet();
// console.log(dataSet);
console.log(splitDataSet(dataSet, 0, 1));
console.log(splitDataSet(dataSet, 0, 0));