const {createTree, createDataSet} = require('../trees');

const {dataSet, labels} = createDataSet();
console.log(dataSet)
console.log(JSON.stringify(createTree(dataSet, labels)))