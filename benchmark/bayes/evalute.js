const evaluate = require('../evaluate');
const natural = require('natural');
const path = require('path');

evaluate(new natural.BayesClassifier(), {learn: 'addDocument', train: 'train', classify: 'classify'}, path.join(__dirname, 'evaluate.json'));