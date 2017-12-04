const classify = require('./kNN');
const mnist = require('mnist');

const trainingData = [[8, 8], [9, 9], [1, 1], [0, 0]];
const labels = ['B', 'B', 'A', 'A'];
console.log(classify([8.5, 8.5], trainingData, labels, 2, true));

// const trainingData = [[1.0, 1.1], [1.0, 1.0], [1.2, 1.2], [0, 0], [0, 0.1]];
// const labels = ['A', 'A', 'A', 'B', 'B'];
// console.log(classify([0.8, 0.9], trainingData, labels, 3, true));

// const trainingData = mnist.set(1000).training;
// let trainingImages = [];
// let labels = [];
// trainingData.forEach(({input, output}) => {
//   const number = output.indexOf(output.reduce((max, activation) => Math.max(max, activation), 0));
//   trainingImages.push(input);
//   labels.push(number);
// });

// const number = 1;
// const input = mnist[number].get();
// console.log(classify(input, trainingImages, labels, 3, true));