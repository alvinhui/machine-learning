process.env.DEBUG = 'trees:*';

const {createTree, classify} = require('../trees');
const {createDataSet} = require('../helps');

const {dataSet, labels} = createDataSet();
console.log(labels)

const tree = createTree(dataSet, labels);

console.log(classify(tree, labels, [1, 0]));
console.log(classify(tree, labels, [1, 1]));