const validate = require('./validate.json');
const evaluate = require('../evaluate');
const path = require('path');

evaluate(validate, path.join(__dirname, 'metrics.json'));