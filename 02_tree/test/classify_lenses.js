const {createTree, classify, storeTree} = require('../trees');
const {createLenses} = require('../helps');

const lenses = createLenses();
const lensesLabels = ['age', 'prescript', 'astigmatic', 'terRate'];

const lensesTree = createTree(lenses, lensesLabels, true);

storeTree(lensesTree, 'lenses_tree.txt');
console.log(lensesTree);
console.log(classify(lensesTree, lensesLabels, ['presbyopic', 'myope', 'no', 'reduced']));