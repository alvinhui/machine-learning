const { classify, words2Vec } = require('../naiveBayes');
const path = require('path');
const random = require('lodash.random');
const nodejieba = require('nodejieba');
const { grabModel, tokenizer, listen } = require('../../utils');

const {weights, pAbusive, vocabList, responses} = grabModel(path.join(__dirname, './model_chinese.txt'));

function response(tag) {
  const sentences = responses[tag];
  return sentences[random(0, sentences.length - 1)];
}

listen(function(text) {
  if (text.length) {
    // const words = tokenizer(text);
    const words = nodejieba.cut(text);
    const testVec = words2Vec(vocabList, words);
    console.log(response(classify(testVec, weights, pAbusive)));
  } else {
    console.log('Any help?');
  }
})