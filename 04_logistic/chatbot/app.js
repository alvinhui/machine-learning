const { listen } = require('../utils');
const {Classifier} = require('../utils');

const classifier = new Classifier();
classifier.load();

listen(function(text) {
  if (text.length) {
    console.log(classifier.predict(text));
  } else {
    console.log('Any help?');
  }
})