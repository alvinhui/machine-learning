module.exports = function(inX, trainingData, labels, k, debug = false) {

  // 确定目标点 x 与训练数据中每个点的距离
  //    欧氏距离公式：https://zh.wikipedia.org/wiki/%E6%AC%A7%E5%87%A0%E9%87%8C%E5%BE%97%E8%B7%9D%E7%A6%BB
  //    公式图：https://wikimedia.org/api/rest_v1/media/math/render/svg/bfa1815838113388d78c9402bba7308d734a4af2
  const distances =[];
  trainingData.forEach(element => {
    let distance = 0;
    element.forEach((value, index) => {
      const diff = inX[index] - value;
      distance += (diff * diff);
    });
    distances.push(Math.sqrt(distance));
  });
  debug && console.log('distances', distances);

  // 将训练数据按照与 x 点的距离从近到远排序
  const sortedDistIndicies = distances
    .map((value, index) => {
      return {value, index};
    })
    .sort((a, b) => a.value - b.value );
  debug && console.log('sortedDistIndicies', sortedDistIndicies);

  // 确定前 k 个点类别的出现频率
  const classCount = {};
  for (let i = 0; k > i; i++) {
    const voteLabel = labels[sortedDistIndicies[i].index];
    classCount[voteLabel] = (classCount[voteLabel] || 0) + 1
  }
  debug && console.log('classCount', classCount);

  // 返回出现频率最高的类别作为当前点的预测分类
  let predictedClass = '';
  let topCount = 0;
  for (const voteLabel in classCount) {
    if (classCount[voteLabel] > topCount) {
      predictedClass = voteLabel;
      topCount = classCount[voteLabel];
    }
  }

  return predictedClass;
};