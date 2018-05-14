const fs = require('fs');
const nodejieba = require('nodejieba');
const LogisticRegression = require('./logistic');
const path = require('path');
const readline = require('readline');

function listen(handle) {
  const _ = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
  _.on('line', (line) => {
    line = line || '';
    if (line.toLowerCase() == 'quit') {
      _.close();
      process.exit();
    } else {
      handle && handle(line);
    }
  });
}

function storeModel(data, filename) {
  fs.writeFileSync(filename, JSON.stringify(data));
}

function grabModel(filename) {
  return JSON.parse(fs.readFileSync(filename, 'utf8'))
}

const Classifier = function(classifier, stemmer) {
  this.docs = [];
  this.features = {};
  this.classes = [];
};

Classifier.prototype.textToFeatures = function(words) {
  const _features = [];

  for(let feature in this.features) {
      if(words.indexOf(feature) > -1)
        _features.push(1);
      else
        _features.push(0);
  }

  return _features;
};
Classifier.prototype.tagToLabel = function(tag) {
  const label = [];
  for(let classer of this.classes) {
    if(classer == tag)
      label.push(1);
    else
      label.push(0);
  }
  return label;
};
Classifier.prototype.addDocuments = function(intents) {
  const docs = [];
  intents.forEach((intent) => {
    const {patterns, tag} = intent;
    patterns.forEach((pattern) => {
      const words = nodejieba.cut(pattern);
  
      docs.push({
        tag,
        words
      });
      
      for (let i = 0; i < words.length; i++) {
        let token = words[i];
        this.features[token] = (this.features[token] || 0) + 1;
      }
  
      if (this.classes.indexOf(tag) === -1) {
        this.classes.push(tag);
      }
    });
  });
  
  const input = [];
  const label = [];
  for (let doc of docs) {
    const {tag, words} = doc;
    input.push(this.textToFeatures(words));
    label.push(this.tagToLabel(tag));
  }

  const n_in = Object.keys(this.features).length;
  const n_out = this.classes.length;

  this.classifier = new LogisticRegression({
    input,
    label,
    n_in,
    n_out
  });
};
Classifier.prototype.train = function() {
  const epochs = 800, 
    lr = 0.01;

  this.classifier.train({
    lr,
    epochs
  });
};
Classifier.prototype.save = function() {
  const model = {
    W: this.classifier.W,
    b: this.classifier.b,
    features: this.features,
    classer: this.classes
  };
  
  storeModel(model, path.join(__dirname, 'model_chinese.txt'));
};
Classifier.prototype.load = function() {
  const model = grabModel(path.join(__dirname, 'model_chinese.txt'));
  this.classifier = new LogisticRegression();
  this.features = model.features;
  this.classes = model.classer;

  Object.assign(this.classifier, {
    W: model.W,
    b: model.b,
  });
};
Classifier.prototype.predict = function(text) {
  const words = nodejieba.cut(text);
  const features = this.textToFeatures(words);
  const results = this.classifier.predict([features]);
  const result = results[0];

  let max = 0;
  let index = 0;
  for(let key in result) {
    const value = result[key];
    if (value > max) {
      max = value;
      index = key;
    }
  }

  return this.classes[index];
};

module.exports = {
  Classifier,
  listen
};