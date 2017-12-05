const {calcShannonEnt, createDataSet} = require('../trees');

const {dataSet} = createDataSet();
console.log(calcShannonEnt(dataSet));

dataSet[0][dataSet[0].length - 1] = 'maybe';
console.log(calcShannonEnt(dataSet));