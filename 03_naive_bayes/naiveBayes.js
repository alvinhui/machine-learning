const math = require('mathjs');
const maxBy = require('lodash.maxby');

function loadDataSet() {
  const document = [
    ['my', 'dog', 'has', 'flea', 'problems', 'help', 'please'],
    ['maybe', 'not', 'take', 'him', 'to', 'dog', 'park', 'stupid'],
    ['my', 'dalmation', 'is', 'so', 'cute', 'I', 'love', 'him'],
    ['stop', 'posting', 'stupid', 'worthless', 'garbage'],
    ['mr', 'licks', 'ate', 'my', 'steak', 'how', 'to', 'stop', 'him'],
    ['quit', 'buying', 'worthless', 'dog', 'food', 'stupid']
  ];
  const classVec = [0, 1, 0, 1, 0, 1];
  return {
    document,
    classVec
  };
}

function createVocabList(document) {
  let list = [];
  document.forEach((words) => {
    list = list.concat([...new Set(words)]);
  });
  return list;
}

function words2Vec(vocabList, inputSet) {
  const returnVec = vocabList.map(() => 0);
  for (const word of inputSet) {
    const index = vocabList.indexOf(word);
    if (index > -1) {
      returnVec[index] = 1;
    } else {
      console.info(`The word: ${word} is not in vocabulary.`);
    }
  }
  return returnVec;
}

function document2VecList(document) {
  const vocabList = createVocabList(document);
  const list = [];
  for (const words of document) {
    list.push(words2Vec(vocabList, words));
  }
  return list;
}

function train(matrix, categories) {
  const labels = [];
  categories.forEach((category) => {
    if (labels.indexOf(category) === -1) {
      labels.push(category);
    }
  });

  const pAbusive = 1 / labels.length;

  const weights = [];
  const numTrainDocs = matrix.length;
  const numWords = matrix[0].length;
  labels.forEach((label) => {
    let pNum = math.zeros(numWords);
    let pDenominator = 0.0;
    for (let i = 0; (numTrainDocs - 1) > i; ++i) {
      if (categories[i] === label) {
        pNum = math.add(pNum, matrix[i]);
        pDenominator += math.sum(matrix[i]);
      }
    }
    const pVec = math.divide(pNum, pDenominator);
    weights.push({
      label,
      pVec
    });
  });
  return {
    weights,
    pAbusive
  };
}

function classify(vec2Classify, weights, pAbusive) {
  const probabilities = [];
  weights.forEach(({label, pVec}) => {
    const probability = math.sum(math.multiply(vec2Classify, pVec)) + math.log(pAbusive);
    probabilities.push({
      probability,
      label
    });
  });
  return maxBy(probabilities, (o) => o.probability).label;
}

module.exports = {
  loadDataSet,
  createVocabList,
  words2Vec,
  document2VecList,
  train,
  classify
};