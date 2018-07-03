const readline = require('readline');
const fs = require('fs');
const maxBy = require('lodash.maxby');

class Tokenizer {
  constructor() {
    this.FREQ = {};
    this.total = 0;
  }

  async loadDict() {
    const result = await this.generateDict();
    this.FREQ = result.frequencies;
    this.total = result.total;
  }

  generateDict() {
    return new Promise(function(resolve, reject) {
      let frequencies = {};
      let total = 0;

      const rl = readline.createInterface({
        input: fs.createReadStream('dict.txt'),
        crlfDelay: Infinity
      });
      
      rl
        .on('line', (line) => {
          const values = line.split(' ').slice(0, 2);
          const word = values[0];
          const frequency = Number(values[1]);
          frequencies[word] = frequency;
          total += frequency;
          for (let i = 0; word.length > i; i++) {
            const wordFrag = word.slice(0, i + 1);
            if (typeof frequencies[wordFrag] === 'undefined') {
              frequencies[wordFrag] = 0;
            }
          }
        })
        .on('close', () => {
          resolve({total, frequencies});
        });
    })
  }

  cut(sentence) {
    const DAG = this.getDAG(sentence); console.log('DAG\n', DAG);
    const route = this.calculate(sentence, DAG); console.log('route\n', route);
    
    const tokens = [];
    let x = 0;
    const length = sentence.length;
    while (x < length) {
      const y = route[x][1] + 1;
      tokens.push(sentence.slice(x, y));
      x = y;
    }
    return tokens;
  }

  // 基于前缀词典实现高效的词图扫描，生成句子中汉字所有可能成词情况所构成的有向无环图 (DAG)
  getDAG(sentence) {
    const DAG = {};
    const length = sentence.length;
    for (let k = 0; length > k; k++) {
      const tmpList = [];
      let i = k;
      let frag = sentence[k];

      while(i < length && typeof this.FREQ[frag] != 'undefined') {
        if (this.FREQ[frag] > 0) {
          tmpList.push(i);
        }

        i += 1;
        frag = sentence.slice(k, i + 1);
      }

      if (!tmpList.length) {
        tmpList.push(k)
      }

      DAG[k] = tmpList;
    }

    return DAG;
  }

  // 动态规划查找最大概率路径, 找出基于词频的最大切分组合
  calculate(sentence, DAG) {
    const length = sentence.length;
    const logTotal = Math.log(this.total);

    const route = {};
    route[length] = [0, 0];
    for (let i = length - 1; i > -1; i--) {
      route[i] = maxBy(
        DAG[i].map((x) => [
          Math.log(this.FREQ[sentence.slice(i, x + 1)] || 1) - 
          logTotal + 
          route[x + 1][0], 
          x
        ]), 
        (item) => item[0]
      );
    }
    return route;
  }
}

module.exports = Tokenizer;