const {splitDataSet} = require('../trees');
const {createDataSet} = require('../helps');

const {dataSet} = createDataSet();
// console.log(dataSet);
console.log('Triangle', splitDataSet(dataSet, 0, 'Triangle'));
console.log('Circular', splitDataSet(dataSet, 0, 'Circular'));