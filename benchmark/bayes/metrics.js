const evaluate = require('./evaluate.json');
const metrics = require('../metrics');
const path = require('path');

metrics(evaluate, path.join(__dirname, 'metrics.json'));