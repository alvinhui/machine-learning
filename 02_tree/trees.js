const debug  = require('debug')('trees:index');
const {log2, uniqueDataSetColumn, majorityCnt} = require('./helps');
const fs = require('fs');

function calcShannonEnt(dataSet) {
  const labelCounts = {};
  for (let featVec of dataSet) {
    const currentLabel = featVec[featVec.length - 1];
    if (Object.keys(labelCounts).indexOf(currentLabel) === -1) {
      labelCounts[currentLabel] = 1;
    } else {
      labelCounts[currentLabel]++;
    }
  }

  // 信息熵公式图：https://wikimedia.org/api/rest_v1/media/math/render/svg/67841ec4b4f7e6ab658842ef2f53add46a2debbd
  let shannonEnt = 0.0;
  const numEntries = dataSet.length;
  for (let i in labelCounts) {
    const x = labelCounts[i];
    const prob = x / numEntries; // p(x)
    shannonEnt = shannonEnt - prob * log2(prob); // -Σp*log(p) 
  }
  return shannonEnt;
}

function splitDataSet(dataSet, axis, value) {
  const retDataSet = [];
  for (let featVec of dataSet) {
    if (featVec[axis] === value) {
      let reducedFeatVec = featVec.slice(0, axis);
      reducedFeatVec = reducedFeatVec.concat(featVec.slice(axis + 1));
      debug('reducedFeatVec %o', reducedFeatVec);

      retDataSet.push(reducedFeatVec);
    }
  }

  debug('retDataSet %o', retDataSet);

  return retDataSet;
}

function chooseBestFeatureToSplit(dataSet) {
  const numberFeatures = dataSet[0].length;
  let baseEntropy = calcShannonEnt(dataSet);
  let bestInfoGain = 0.0;
  let bestFeature = -1;
  for (let i = 0, length = numberFeatures - 1; length > i; i++) {
    const uniqueValues = uniqueDataSetColumn(dataSet, i);
    let newEntropy = 0.0;
    uniqueValues.forEach((value) => {
      const subDataSet = splitDataSet(dataSet, i, value);
      const prob = subDataSet.length / dataSet.length;
      newEntropy += prob * calcShannonEnt(subDataSet);
    });
    const infoGain = baseEntropy - newEntropy;
    if (infoGain > bestInfoGain) {
      bestInfoGain = infoGain;
      bestFeature = i;
    }
  }

  return bestFeature;
}

function createTree(dataSet, labels) {
  const classList = dataSet.map((elements) => elements[elements.length - 1]);
  
  // 当所有的分类都属于同一类目时，停止划分数据
  let count = 0;
  classList.forEach((classItem) => {
    if (classItem === classList[0]) {
      count++;
    }
  });
  if (count == classList.length) {
    return classList[0]
  }

  // 数据集中没有其余特征时，停止划分数据
  if (dataSet[0].length === 1) {
    return majorityCnt(classList);
  }

  // 找到最佳划分数据集的特征
  const bestFeat = chooseBestFeatureToSplit(dataSet);
  debug('bestFeat %s', bestFeat);

  const bestFeatLabel = labels[bestFeat];
  const myTree = {[bestFeatLabel]: {}};

  // 获得特征的枚举值
  const uniqueValues = uniqueDataSetColumn(dataSet, bestFeat);
  debug('uniqueValues %o', uniqueValues);

  uniqueValues.forEach((value) => {
    const newDataSet = splitDataSet(dataSet, bestFeat, value);
    const subLabels = labels.filter((label, key) => key !== bestFeat);
    myTree[bestFeatLabel][value] = createTree(newDataSet, subLabels)
  });

  return myTree;
}

function classify(inputTree, featLabels, testVec) {
  const firstStr = Object.keys(inputTree)[0];
  const secondDict = inputTree[firstStr];
  const featIndex = featLabels.indexOf(firstStr);
  const key = testVec[featIndex];
  const valueOfFeat = secondDict[key];
  if (typeof valueOfFeat === 'object') {
    return classify(valueOfFeat, featLabels, testVec);
  } else {
    return valueOfFeat;
  }
}

function storeTree(inputTree, filename) {
  fs.writeFileSync(filename, JSON.stringify(inputTree))
}

function grabTree(filename) {
  return JSON.parse(fs.readFileSync(filename, 'utf8'))
}

module.exports = {
  calcShannonEnt,
  splitDataSet,
  chooseBestFeatureToSplit,
  createTree,
  classify,
  storeTree,
  grabTree
};