const {intents} = require('./trainingData_chinese.json');
const nodejieba = require('nodejieba');
const { createVocabList, words2Vec, train } = require('../naiveBayes');
const { storeModel, tokenizer } = require('../../utils');
const path = require('path');

const document = [];
const classes = [];
const responses = {};
intents.forEach(function(intent) {
  const {patterns, tag} = intent;
  patterns.forEach(function(pattern) {
    // const words = tokenizer(pattern);
    const words = nodejieba.cut(pattern);
    document.push(words);
    classes.push(tag);
  });
  responses[tag] = intent.responses;
});

console.log('document', JSON.stringify(document));
console.log('classes', classes);

const vocabList = createVocabList(document);
const trainMat = [];
for (const words of document) {
  trainMat.push(words2Vec(vocabList, words));
}

console.log('trainMat', JSON.stringify(trainMat));

const model = train(trainMat, classes);
model.vocabList = vocabList;
model.responses = responses;
storeModel(model, path.join(__dirname, 'model_chinese.txt'));