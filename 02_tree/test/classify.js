const {createTree, classify} = require('../trees');
const {createDataSet} = require('../helps');

const {dataSet, labels} = createDataSet();
console.log(labels)

const tree = createTree(dataSet, labels);
console.log(JSON.stringify(tree));

console.log(classify(tree, labels, ['Triangle', 'Small']));
console.log(classify(tree, labels, ['Circular', 'Big']));