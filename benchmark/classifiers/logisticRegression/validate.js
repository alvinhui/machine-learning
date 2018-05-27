const validate = require('../validate');
const {LogisticRegressionClassifier} = require('../../../lib/index');
const path = require('path');

validate(new LogisticRegressionClassifier(), {learn: 'addDocument', train: 'train', classify: 'classify'}, path.join(__dirname, 'validate.json'));