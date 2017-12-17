const {createTree} = require('../trees');
const {createDataSet} = require('../helps');

const {dataSet, labels} = createDataSet();
console.log(dataSet)
console.log(JSON.stringify(createTree(dataSet, labels)))