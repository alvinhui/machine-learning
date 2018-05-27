const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const {tokenizer, storeModel} = require('../../utils');

const dataPath = path.join(__dirname, '../data/');
const dirnames = fs.readdirSync(dataPath);

module.exports = function(classifier, options, filename) {
  const {learn, classify, train, useModelAfterTrain} = options;

  /** 获取原始数据中获取数据集（分词） **/

  const countNum = 200;
  /**
   * intents = {
   *   ['love']: [ 
   *     ['i', 'love', 'you'] 
   *   ]
   * }
   */
  const intents = {};
  dirnames.forEach(function(dirname) {
    if (dirname.indexOf('.') === -1) {
      const rawData = require(path.join(dataPath, dirname, `train_${dirname}_full`))[dirname];

      console.log(`${dirname} rawData length`, rawData.length);

      const examples = [];
      for (let {data} of rawData) {
        let words = [];
        for (let {text} of data) {
          words = words.concat(tokenizer(text));
        }

        if (words.length) {
          examples.push(words);
        }
      }

      intents[dirname] = examples.slice(0, countNum);
    }
  });

  console.log('intents-item length', intents[Object.keys(intents)[0]].length);

  /** 组装数据集 **/
  let dataset = [];
  for (let intent in intents) {
    const sentences = intents[intent];

    for (let words of sentences) {
      dataset.push({
        x: words,
        y: intent
      });
    }
  }

  dataset = _.shuffle(dataset);

  const trainRatio = 0.2;
  const trainNum = Math.round(dataset.length * trainRatio);
  const trainDateset = dataset.slice(0, trainNum);
  const testDateset = dataset.slice(trainNum);

  console.log('dataset length', dataset.length);
  console.log('trainDateset length', trainDateset.length);
  console.log('testDateset length', testDateset.length);

  /** 开始训练  **/
  for (let {x, y} of trainDateset) {
    classifier[learn](x, y);
  }

  const model = classifier[train]();
  
  /** 进行评价 **/
  console.log('Start validate...');
  const yPred = [];
  const yTrue = [];
  let i = 0;
  for (let {x, y} of testDateset) {
    console.log(`===> Handle test: ${i}/${testDateset.length}`);

    let label;
    if (useModelAfterTrain) {
      label = model[classify](x);
    } else {
      label = classifier[classify](x);
    }
    
    yPred.push(label);
    yTrue.push(y);
    i++;
  }

  console.log('yTrue: ', JSON.stringify(yTrue));
  console.log('yPred: ', JSON.stringify(yPred));

  storeModel({yTrue, yPred}, filename);

  console.log('done.');
}