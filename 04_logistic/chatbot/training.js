const {intents} = require('./trainingData_chinese.json');
const {Classifier} = require('../utils');

const classifier = new Classifier();
classifier.addDocuments(intents);
classifier.train();
classifier.save();