const { listen } = require('../../utils');
const natural = require('natural');
const nodejieba = require('nodejieba');
const path = require('path');

natural.LogisticRegressionClassifier.load(path.join(__dirname, 'model_chinese.json'), null, function(err, classifier) {
  listen(function(text) {
    if (text.length) {
      console.log(classifier.classify(nodejieba.cut(text)));
    } else {
      console.log('Any help?');
    }
  });
});