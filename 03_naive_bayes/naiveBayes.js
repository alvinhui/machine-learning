function createList(length, number = 0) {
  const list = [];
  for (const i = 0; length > i; i++) {
    list.push(number);
  }
  return list;
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

function train(matrix, categories) {

}

function classify() {

}

module.exports = {
  loadDataSet,
  createVocabList,
  words2Vec,
  document2VecList,
  train,
  classify
};