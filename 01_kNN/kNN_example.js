const classify = require('./kNN');

// 1. 收集数据：忽略，直接使用 MNIST 
const mnist = require('mnist');

// 2. 准备数据
let trainingImages = [];
let labels = [];

const trainingCount = 8000;
const testCount = 2000;
const set = mnist.set(trainingCount, testCount);
const trainingSet = set.training;
const testSet = set.test;

trainingSet.forEach(({input, output}) => {

  // one-hot to number
  const number = output.indexOf(output.reduce((max, activation) => Math.max(max, activation), 0));
  trainingImages.push(input);
  labels.push(number);
});

// 3. 分析数据：在命令行中检查数据，确保它的格式符合要求
console.log('trainingImages', JSON.stringify(trainingImages));
console.log('labels', JSON.stringify(labels));

// 4. 训练算法：无，此步骤不适用于 kNN 算法

// 5. 测试算法
let errorCount = 0;
const startTime = Date.now();
testSet.forEach(({input, output}, key) => {
  const number = output.indexOf(output.reduce((max, activation) => Math.max(max, activation), 0));
  const predicted = classify(input, trainingImages, labels, 3);
  const result = predicted == number;
  console.log(`${key}. number is ${number}, predicted is ${predicted}, result is ${result}`);

  if (!result) {
    errorCount++;
  }
});
console.log(`The total number of errors is: ${errorCount}`);
console.log(`The total error rate is: ${errorCount/testCount}`);
console.log(`Spend: ${(Date.now() - startTime) / 1000}s`);

// 6. 使用算法
const number = 1;
const input = mnist[number].get();
console.log('Result is:', classify(input, trainingImages, labels, 3));