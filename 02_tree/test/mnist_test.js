const {classify, grabTree} = require('../trees');
const {toZeroOne} = require('../helps');
const mnist = require('mnist');
const path = require('path');
const fs = require('fs');

// 1. 加载测试数据
const testData = JSON.parse(fs.readFileSync(path.join(__dirname, 'mnist_testData.json'), 'utf8'));
const testCount = testData.length;

// 使用知识信息
const tree = grabTree(path.join(__dirname, './mnist_tree.txt'));
const labels = mnist[0].get().map((number, key) => `number_${key}`);

// 1. 测试算法
let errorCount = 0;
const startTime = Date.now();
testData.forEach(({input, output}, key) => {
  const number = output.indexOf(output.reduce((max, activation) => Math.max(max, activation), 0));
  const predicted = classify(tree, labels, toZeroOne(input));
  const result = predicted == number;
  console.log(`${key}. number is ${number}, predicted is ${predicted}, result is ${result}`);

  if (!result) {
    errorCount++;
  }
});
console.log(`The total number of errors is: ${errorCount}`);
console.log(`The total error rate is: ${errorCount / testCount}`);
console.log(`Spend: ${(Date.now() - startTime) / 1000}s`);

// 2. 使用算法
const number = 8;
console.log('Result is', classify(tree, labels, toZeroOne(mnist[number].get())));