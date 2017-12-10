const { loadDataSet, createVocabList, words2Vec } = require('./naiveBayes');

const {document, classVec} = loadDataSet();
const vocabList = createVocabList(document);
console.log(vocabList);
console.log(words2Vec(vocabList, document[0]));
console.log(words2Vec(vocabList, document[3]));