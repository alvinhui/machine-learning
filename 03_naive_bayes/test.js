const { loadDataSet, createVocabList, words2Vec, train, classify } = require('./naiveBayes');

// words2Vec
// const {document, classVec} = loadDataSet();
// const vocabList = createVocabList(document);
// console.log(vocabList);
// console.log(words2Vec(vocabList, document[0]));
// console.log(words2Vec(vocabList, document[3]));

// testingNB
const {document, classVec} = loadDataSet();
const vocabList = createVocabList(document);
const trainMat = [];

for (const words of document) {
  trainMat.push(words2Vec(vocabList, words));
}

console.log('trainMat', JSON.stringify(trainMat));
console.log('classVec', classVec);

const {weights, pAbusive} = train(trainMat, classVec);

console.log('weights', JSON.stringify(weights));
console.log('pAbusive', pAbusive);

const testEntry = ['love', 'my', 'dalmation'];
const testVec = words2Vec(vocabList, testEntry);
console.log('testEntry', testEntry);
console.log('classified as:', classify(testVec, weights, pAbusive));

const testEntry2 = ['stupid', 'garbage'];
const testVec2 = words2Vec(vocabList, testEntry2);
console.log('testEntry2', testEntry2);
console.log('classified as:', classify(testVec2, weights, pAbusive));