const {createTree, storeTree} = require('../trees');
const {toZeroOne} = require('../helps');
const mnist = require('mnist');
const path = require('path');

// 1. 收集数据
const {trainingData} = require('./mnist_data');

// 2. 准备数据
let data = [];
trainingData.forEach(({input, output}) => {
  const number = String(output.indexOf(output.reduce((max, activation) => Math.max(max, activation), 0)));
  
  // 数值型特征转换为标称型
  data.push(toZeroOne(input).concat([number]));
});
const labels = mnist[0].get().map((number, key) => `number_${key}`);

// 3. 分析数据：在命令行中检查数据，确保它的格式符合要求
console.log('data', JSON.stringify(data[0]));
console.log('labels', JSON.stringify(labels));

// 4. 训练算法
const tree = createTree(data, labels);
console.log('tree', JSON.stringify(tree));

// 存储学到的知识
storeTree(tree, path.join(__dirname, 'mnist_tree.txt'));