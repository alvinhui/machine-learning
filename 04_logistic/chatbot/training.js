const {intents} = require('./trainingData_chinese.json');
const nodejieba = require('nodejieba');
const {tokenizer} = require('../utils');
const word2vec = require('word2vec');

w2v.loadModel(__dirname + '/vectors.txt', function( err, model ) {
  const x = [];
  const y = [];
  const classes = [];
  intents.forEach(function(intent) {
    const {patterns, tag} = intent;
    patterns.forEach(function(pattern) {
      const words = tokenizer(pattern);

      x.push(words);
      y.push(tag);

      if (classes.indexOf(tag) === -1) {
        classes.push(tag);
      }
    });
    responses[tag] = intent.responses;
  });
});


