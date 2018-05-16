'use strict';

module.exports = (observation, classify) => {
    if (observation.length != classify.length)
        throw new Error('NOT SAME');

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

    let em = {};

    const matrix_template = {
        'TP': 0,
        'FP': 0,
        'FN': 0,
        'TN': 0,
        'OBS': 0,
        'CLS': 0
    };

    for (let i = 0; i < DATA_SIZE; i++) {
        let obs = observation[i];
        let cls = classify[i];

        if (!em[obs]) em[obs] = JSON.parse(JSON.stringify(matrix_template));
        if (!em[cls]) em[cls] = JSON.parse(JSON.stringify(matrix_template));

        em[obs]['OBS']++;
        em[cls]['CLS']++;

        if (obs == cls) em[obs]['TP']++;
    }

    let macro_averaged = {
        'PRECISION': 0,
        'RECALL': 0,
        'F-MEASURE': 0
    };

    let micro_averaged = {
        'PRECISION': 0,
        'RECALL': 0,
        'F-MEASURE': 0
    };

    let sum = {
        'TP': 0,
        'FP': 0,
        'FN': 0,
        'TN': 0
    };

    for (let key in em) {
        em[key]['FN'] = em[key]['OBS'] - em[key]['TP'];
        em[key]['FP'] = em[key]['CLS'] - em[key]['TP'];
        em[key]['TN'] = DATA_SIZE - em[key]['OBS'] - em[key]['FP'];

        sum['TP'] += em[key]['TP'];
        sum['FP'] += em[key]['FP'];
        sum['FN'] += em[key]['FN'];
        sum['TN'] += em[key]['TN'];

        em[key]['PRECISION'] = em[key]['TP'] / (em[key]['TP'] + em[key]['FP']);
        em[key]['RECALL'] = em[key]['TP'] / (em[key]['TP'] + em[key]['FN']);
        em[key]['F-MEASURE'] = (em[key]['PRECISION'] * em[key]['RECALL'] * 2) / (em[key]['PRECISION'] + em[key]['RECALL']);
        em[key]['ACCURACY'] = (em[key]['TP'] + em[key]['TN']) / (em[key]['TP'] + em[key]['FP'] + em[key]['TN'] + em[key]['FN']);

        macro_averaged['PRECISION'] += em[key]['PRECISION'] ? em[key]['PRECISION'] : 0;
        macro_averaged['RECALL'] += em[key]['RECALL'] ? em[key]['RECALL'] : 0;
    }

    let accuracy = (sum['TP'] + sum['TN']) / (sum['TP'] + sum['FP'] + sum['TN'] + sum['FN']);

    macro_averaged['PRECISION'] = macro_averaged['PRECISION'] / CLASS_SIZE;
    macro_averaged['RECALL'] = macro_averaged['RECALL'] / CLASS_SIZE;
    macro_averaged['F-MEASURE'] = (macro_averaged['PRECISION'] * macro_averaged['RECALL'] * 2) / (macro_averaged['PRECISION'] + macro_averaged['RECALL']);

    micro_averaged['PRECISION'] = sum['TP'] / (sum['TP'] + sum['FP']);
    micro_averaged['RECALL'] = sum['TP'] / (sum['TP'] + sum['FN']);
    micro_averaged['F-MEASURE'] = (micro_averaged['PRECISION'] * micro_averaged['RECALL'] * 2) / (micro_averaged['PRECISION'] + micro_averaged['RECALL']);

    let evaluation_result = {
        accuracy: accuracy,
        macro: macro_averaged,
        micro: micro_averaged,
        matrix: em
    };

    return evaluation_result;
};