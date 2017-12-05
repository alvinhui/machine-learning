function log2(val) {
  return Math.log(val) / Math.LN2;
}

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

function majorityCnt(classList) {
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
  log2,
  toZeroOne,
  uniqueDataSetColumn,
  majorityCnt
};