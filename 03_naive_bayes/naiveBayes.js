const math = require('mathjs');

function createList(length, number = 0) {
  const list = [];
  for (const i = 0; length > i; i++) {
    list.push(number);
  }
  return list;
}

function addVec(v1, v2) {

}

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

// 二分类训练
function train(matrix, categories, debug = false) {
  const numTrainDocs = matrix.length;
  const numWords = matrix[0].length;
  const pAbusive = 0.5;
  let p0Num = math.zeros(numWords);
  let p1Num = math.zeros(numWords);
  let p0Denominator = 0.0, 
    p1Denominator = 0.0;

  for (let i = 0; (numTrainDocs - 1) > i; ++i) {
    if (categories[i] === 1) {
      p1Num = math.add(p1Num, matrix[i]);
      p1Denominator += math.sum(matrix[i]);
    } else {
      p0Num = math.add(p0Num, matrix[i]);
      p0Denominator += math.sum(matrix[i]);
    }
  }

  const p1Vec = math.divide(p1Num, p1Denominator);
  const p0Vec = math.divide(p0Num, p0Denominator);

  return {
    p1Vec,
    p0Vec,
    pAbusive
  };
}

// 二分类预测
function classify(vec2Classify, p0Vec, p1Vec, pClass1) {
  const p1 = math.sum(math.multiply(vec2Classify, p1Vec)) + math.log(pClass1);
  const p0 = math.sum(math.multiply(vec2Classify, p0Vec)) + math.log(1.0 - pClass1);
  return p1 > p0 ? 1 : 0;
}

module.exports = {
  loadDataSet,
  createVocabList,
  words2Vec,
  document2VecList,
  train,
  classify
};