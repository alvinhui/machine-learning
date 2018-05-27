const validate = require('../validate');
const {BayesClassifier} = require('../../../lib/index');
const path = require('path');

validate(new BayesClassifier(), {learn: 'addDocument', train: 'train', classify: 'classify'}, path.join(__dirname, 'validate.json'));