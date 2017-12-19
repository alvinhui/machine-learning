const mnist = require('mnist');
const fs = require('fs');
const path = require('path');
const trainingCount = 8000;
const testCount = 2000;
const set = mnist.set(trainingCount, testCount);
const trainingData = set.training;
const testData = set.test;

fs.writeFileSync(path.join(__dirname, 'mnist_trainingData.json'), JSON.stringify(trainingData));
fs.writeFileSync(path.join(__dirname, 'mnist_testData.json'), JSON.stringify(testData));