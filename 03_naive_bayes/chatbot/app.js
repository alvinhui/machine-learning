const { classify, grabModel, words2Vec, tokenizer, listen } = require('../naiveBayes');
const path = require('path');
const random = require('lodash.random');

const {weights, pAbusive, vocabList, responses} = grabModel(path.join(__dirname, './model.txt'));

function response(tag) {
  const sentences = responses[tag];
  return sentences[random(0, sentences.length - 1)];
}

listen(function(text) {
  if (text.length) {
    const testVec = words2Vec(vocabList, tokenizer(text));
    console.log(response(classify(testVec, weights, pAbusive)));
  } else {
    console.log('Any help?');
  }
})