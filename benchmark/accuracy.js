'use strict';

module.exports = (observation, classify) => {
  if (observation.length != classify.length) {
    throw new Error('NOT SAME');
  }

  let cls = {}, CLASS_SIZE = 0;
  for (let i = 0; i < observation.length; i++) {
    if (!cls[observation[i]]) {
      cls[observation[i]] = true;
      CLASS_SIZE++;
    }
  }

  const DATA_SIZE = observation.length - 1;

  // =================== evaluation matrix ===================
  //
  //                          observation
  //             ---------------------------------------
  //             |         | class  |   not  |         |
  //             |-------------------------------------|
  //             |  class  |   TP   |   FP   |   CLS   |
  //    classify |-------------------------------------|
  //             |   not   |   FN   |   TN   |         |
  //             |-------------------------------------|
  //             |         |   OBS  |        |  total  |
  //             ---------------------------------------
  //
  // =========================================================

  const em = {};

  const matrixTemplate = {
    'TP': 0,
    'FP': 0,
    'FN': 0,
    'TN': 0,
    'OBS': 0,
    'CLS': 0
  };

  for (let i = 0; i < DATA_SIZE; i++) {
    const obs = observation[i];
    const cls = classify[i];

    if (!em[obs]) {
      em[obs] = Object.assign({}, matrixTemplate);
    }
    if (!em[cls]) {
      em[cls] = Object.assign({}, matrixTemplate);
    }

    em[obs]['OBS']++;
    em[cls]['CLS']++;

    if (obs == cls) {
      em[obs]['TP']++;
    }
  }

  const macroAveraged = {
    'PRECISION': 0,
    'RECALL': 0,
    'F-MEASURE': 0
  };

  const microAveraged = {
    'PRECISION': 0,
    'RECALL': 0,
    'F-MEASURE': 0
  };

  const sum = {
    'TP': 0,
    'FP': 0,
    'FN': 0,
    'TN': 0
  };

  for (let key in em) {
    const item = em[key];
    item['FN'] = item['OBS'] - item['TP'];
    item['FP'] = item['CLS'] - item['TP'];
    item['TN'] = DATA_SIZE - item['OBS'] - item['FP'];

    sum['TP'] += item['TP'];
    sum['FP'] += item['FP'];
    sum['FN'] += item['FN'];
    sum['TN'] += item['TN'];

    item['PRECISION'] = item['TP'] / (item['TP'] + item['FP']);
    item['RECALL'] = item['TP'] / (item['TP'] + item['FN']);
    item['F-MEASURE'] = (item['PRECISION'] * item['RECALL'] * 2) / (item['PRECISION'] + item['RECALL']);
    item['ACCURACY'] = (item['TP'] + item['TN']) / (item['TP'] + item['FP'] + item['TN'] + item['FN']);

    macroAveraged['PRECISION'] += item['PRECISION'] ? item['PRECISION'] : 0;
    macroAveraged['RECALL'] += item['RECALL'] ? item['RECALL'] : 0;
  }

  const accuracy = (sum['TP'] + sum['TN']) / (sum['TP'] + sum['FP'] + sum['TN'] + sum['FN']);

  macroAveraged['PRECISION'] = macroAveraged['PRECISION'] / CLASS_SIZE;
  macroAveraged['RECALL'] = macroAveraged['RECALL'] / CLASS_SIZE;
  macroAveraged['F-MEASURE'] = (macroAveraged['PRECISION'] * macroAveraged['RECALL'] * 2) / (macroAveraged['PRECISION'] + macroAveraged['RECALL']);

  microAveraged['PRECISION'] = sum['TP'] / (sum['TP'] + sum['FP']);
  microAveraged['RECALL'] = sum['TP'] / (sum['TP'] + sum['FN']);
  microAveraged['F-MEASURE'] = (microAveraged['PRECISION'] * microAveraged['RECALL'] * 2) / (microAveraged['PRECISION'] + microAveraged['RECALL']);

  return {
    accuracy: accuracy,
    macro: macroAveraged,
    micro: microAveraged,
    matrix: em
  };
};