const {intents} = require('../trainingData_chinese.json');
const natural = require('natural');
const nodejieba = require('nodejieba');
const path = require('path');

const classifier = new natural.LogisticRegressionClassifier();

intents.forEach(function(intent) {
  const {patterns, tag} = intent;
  patterns.forEach(function(pattern) {
    const words = nodejieba.cut(pattern);
    classifier.addDocument(words, tag);
  });
});

classifier.train();

classifier.save(path.join(__dirname, 'model_chinese.json'), function(err, classifier) {
  console.log('done');
});