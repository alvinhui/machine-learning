
const mnist = require('mnist');
const trainingCount = 8000;
const testCount = 2000;
const set = mnist.set(trainingCount, testCount);
const trainingData = set.training;
const testData = set.test;

module.exports = {
  trainingData,
  testData,
  testCount,
  trainingCount
};