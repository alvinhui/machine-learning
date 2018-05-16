const evaluate = require('../evaluate');
const {TextCategorizerTrainer} = require('nlp-mitie');
const path = require('path');

evaluate(new TextCategorizerTrainer(path.join(__dirname, './total_word_feature_extractor.dat')), {learn: 'add', train: 'train', classify: 'classify', useModelAfterTrain: true}, path.join(__dirname, 'evaluate.json'));