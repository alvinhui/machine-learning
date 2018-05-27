const validate = require('../validate');
const {LogisticRegressionClassifier} = require('../../../lib/index');
const path = require('path');
var word2vec = require( 'word2vec' );

word2vec.loadModel(path.join(__dirname, './GoogleNews-vectors-negative300-SLIM.bin'), function( error, model ) {

  const classifier = new LogisticRegressionClassifier();

  classifier.textToFeatures = function(observation) {
    console.log('observation length: ', observation.length);

    const features = [];
    let i = 0;
    const length = Object.keys(this.features).length;
    for(let feature in this.features) {
      console.log(`===> Handle feature: ${i}/${length}`);
      
      let max = 0;
      for (let token of observation) {
        const value = model.similarity(token, feature);
        if (value > max) {
          max = value;
        }
      }

      features.push(max);
      i++;
    }
    return features;
  }

  validate(classifier, {learn: 'addDocument', train: 'train', classify: 'classify'}, path.join(__dirname, 'validate.json'));
});

