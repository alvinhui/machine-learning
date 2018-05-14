const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../../data/');
const dirnames = fs.readdirSync(dataPath);
const natural = require('natural');
const {tokenizer, trim} = require('../../utils');

const intents = {};

let trainingDataLength = 0;
let validateDataLength = 0;
dirnames.forEach(function(dirname) {
  if (dirname.indexOf('.') === -1) {
    const train = require(path.join(dataPath, dirname, `train_${dirname}`))[dirname];
    const validate = require(path.join(dataPath, dirname, `validate_${dirname}`))[dirname];

    trainingDataLength = train.length;
    validateDataLength = validate.length;

    intents[dirname] = {
      train,
      validate
    };
  }
});

// console.log('intents', intents);
console.log('training data length: ', trainingDataLength);
console.log('validate data length: ', validateDataLength);

// 对原始数据进行格式化
const limitTrain = 70;
const limitValidate = 30;
const examples = {};
for (let key in intents) {
  const {train, validate} = intents[key];

  examples[key] = {
    train: [],
    validate: []
  };

  let i = 0;
  for (let intent of train) {
    if (limitTrain > i) {
      let words = [];
      const {data} = intent;
      for (let item of data) {
        const {text} = item;
        const tokens = tokenizer(text.trim());
        words = words.concat(tokens);
      }

      examples[key].train.push(words);

      i++;
    }
  }

  let j = 0;
  for (let intent of validate) {
    if (limitValidate > j) {
      let words = [];
      const {data} = intent;
      for (let item of data) {
        const {text} = item;
        const tokens = tokenizer(text.trim());
        words = words.concat(tokens);
      }

      examples[key].validate.push(words);

      j++;
    }
  }
}

// console.log('examples', JSON.stringify(examples, null, 4));

const classifier = new natural.LogisticRegressionClassifier();

// do training
for (let key in examples) {
  const data = examples[key];
  const {train} = data;

  for (let words of train) {
    classifier.addDocument(words, key);
  }
}

function evaluate(trainType) {
  console.log('done train');

  let correct = 0;
  let total = 0;
  for (let key in examples) {
    const data = examples[key];
    const {validate} = data;

    for (let words of validate) {
      const label = classifier.classify(words);

      total++;
      if (label === key) {
        correct++;
      }
    }
  }

  const accuracy = correct / total;
  const precision = 0;
  console.log('accuracy: ', accuracy);
  console.log(`${trainType} spend: ${(Date.now() - startTime) / 1000}s`);
}

const startTime = Date.now();

classifier.trainParallel(() => evaluate('trainParallel'));

// classifier.train();
// evaluate('train');