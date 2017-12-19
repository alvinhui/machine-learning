const {calcShannonEnt} = require('../trees');
const {createDataSet} = require('../helps');

const {dataSet} = createDataSet();
const data = dataSet.map((item) => item[item.length - 1]);
console.log(calcShannonEnt(dataSet));  // 0.9709505944546686

// 混合数据
dataSet[0][dataSet[0].length - 1] = 'maybe';
console.log(calcShannonEnt(dataSet));