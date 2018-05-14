// 使用社区的 bayes 库进行测试

const bayes = require('bayes')
const nodejieba = require('nodejieba');
const { intents } = require('../chatbot/trainingData_chinese.json');
const { listen } = require('../../utils');

const classifier = bayes({
  tokenizer: (s) => nodejieba.cut(s)
});

intents.forEach(function(intent) {
  const {patterns, tag} = intent;
  patterns.forEach(function(pattern) {
    classifier.learn(pattern, tag)
  });
});

listen(function(text) {
  if (text.length) {
    console.log(classifier.categorize(text));
  } else {
    console.log('在干啥');
  }
})