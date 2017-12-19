function createDataSet() {
  const dataSet = [
    ['Triangle', 'Small', 'Cat'],
    ['Triangle', 'Small', 'Cat'],
    ['Triangle', 'Big', 'Tiger'],
    ['Circular', 'Small', 'Tiger'],
    ['Circular', 'Big', 'Tiger'],
  ];
  const labels = ['Shape', 'Size'];
  return {
    dataSet,
    labels
  };
}

function createLenses() {
  return [
    ['young', 'myope', 'no', 'reduced', 'no lenses'],
    ['young', 'myope', 'no', 'normal', 'soft'],
    ['young', 'myope', 'yes', 'reduced', 'no lenses'],
    ['young', 'myope', 'yes', 'normal', 'hard'],
    ['young', 'hyper', 'no', 'reduced', 'no lenses'],
    ['young', 'hyper', 'no', 'normal', 'soft'],
    ['young', 'hyper', 'yes', 'reduced', 'no lenses'],
    ['young', 'hyper', 'yes', 'normal', 'hard'],
    ['pre', 'myope', 'no', 'reduced', 'no lenses'],
    ['pre', 'myope', 'no', 'normal', 'soft'],
    ['pre', 'myope', 'yes', 'reduced', 'no lenses'],
    ['pre', 'myope', 'yes', 'normal', 'hard'],
    ['pre', 'hyper', 'no', 'reduced', 'no lenses'],
    ['pre', 'hyper', 'no', 'normal', 'soft'],
    ['pre', 'hyper', 'yes', 'reduced', 'no lenses'],
    ['pre', 'hyper', 'yes', 'normal', 'no lenses'],
    ['presbyopic', 'myope', 'no', 'reduced', 'no lenses'],
    ['presbyopic', 'myope', 'no', 'normal', 'no lenses'],
    ['presbyopic', 'myope', 'yes', 'reduced', 'no lenses'],
    ['presbyopic', 'myope', 'yes', 'normal', 'hard'],
    ['presbyopic', 'hyper', 'no', 'reduced', 'no lenses'],
    ['presbyopic', 'hyper', 'no', 'normal', 'soft'],
    ['presbyopic', 'hyper', 'yes', 'reduced', 'no lenses'],
    ['presbyopic', 'hyper', 'yes', 'normal', 'no lenses'],
  ];
}

function log2(val) {
  return Math.log(val) / Math.LN2;
}

// 获取某个特征的所有枚举值
function uniqueDataSetColumn(dataSet, i) {
  const uniqueValues = [];
  dataSet.forEach((element) => {
    const value = element[i];
    if (uniqueValues.indexOf(value) === -1) {
      uniqueValues.push(value)
    }
  });
  return uniqueValues;
}

function majority(classList) {
  const classCount = {};
  for (let vote of classList) {
    if (Object.keys(classCount).indexOf(vote) === -1) {
      classCount[vote] = 1;
    } else {
      classCount[vote]++;
    }
  }

  let predictedClass = '';
  let topCount = 0;
  for (const voteLabel in classCount) {
    if (classCount[voteLabel] > topCount) {
      predictedClass = voteLabel;
      topCount = classCount[voteLabel];
    }
  }
  return predictedClass;
}

function toZeroOne(numbers) {
  return numbers.map((number) => number > 0.5 ? 1 : 0);
}

module.exports = {
  createDataSet,
  createLenses,
  log2,
  toZeroOne,
  uniqueDataSetColumn,
  majority
};