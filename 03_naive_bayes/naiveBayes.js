const math = require('mathjs');
const maxBy = require('lodash.maxby');
const fs = require('fs');

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

function regularizeWord(word) {
  return word.toLowerCase();
}

function createVocabList(document) {
  let list = [];
  document.forEach((words) => {
    list = list.concat([...new Set(words.map(word => regularizeWord(word)))]);
  });
  return list;
}

function words2Vec(vocabList, inputSet) {
  const returnVec = vocabList.map(() => 0);
  for (const word of inputSet) {
    const index = vocabList.indexOf(regularizeWord(word));
    if (index > -1) {
      returnVec[index] = 1;
    } else {
      // console.info(`The word: ${word} is not in vocabulary.`);
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

    // 计算 p(w0|1)p(w1|1)p(w2|1)，如果其中一个概率值为 0，则最后乘积也为 0。
    // 为降低这种影响，将所有词出现数初始化为 1， 并将分母初始化为 2。
    let pNum = math.ones(numWords); // math.zeros
    let pDenominator = 2.0; // 1.0
    for (let i = 0; (numTrainDocs - 1) > i; ++i) {
      if (categories[i] === label) {
        pNum = math.add(pNum, matrix[i]);
        pDenominator += math.sum(matrix[i]);
      }
    }

    // 计算乘积 p(w0|c1)p(w1|c1)p(w2|ci)...p(wN|ci) 时由于大多数因子都非常小，所以程序会得到不正确的答案。
    // 通过求对数可以避免下溢出或者浮点数舍入导致的错误。
    const pVec = math.log(math.divide(pNum, pDenominator));
    weights.push({
      label,
      pVec: pVec.valueOf()
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

    // 应用条件概率，公式：
    // 因为分母对于所有类别为常数，因为我们只要将分子最大化即可（因此不需要除以 p(x)）
    // 又因为各特征属性是条件独立的，所以有：
    const probability = math.sum(math.multiply(vec2Classify, pVec)) + math.log(pAbusive);
    const pc = {
      probability,
      label
    };
    console.log('result: ', pc);

    probabilities.push(pc);
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