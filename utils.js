const readline = require('readline');
const path = require('path');
const fs = require('fs');

function storeModel(data, filename) {
  fs.writeFileSync(filename, JSON.stringify(data));
}

function grabModel(filename) {
  return JSON.parse(fs.readFileSync(filename, 'utf8'))
}

function trim(word) {
  return word.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,"")
}

/**
 * Given an input string, tokenize it into an array of word tokens.
 * This is the default tokenization function used if user does not provide one in `options`.
 *
 * @param  {String} text
 * @return {Array}
 */
function tokenizer(text) {
  text = text.trim();

  //remove punctuation from text - remove anything that isn't a word char or a space
  var rgxPunctuation = /[^(a-zA-ZA-Яa-я0-9_)+\s]/g

  var sanitized = text.replace(rgxPunctuation, ' ')

  const words = [];
  const tokens = sanitized.split(/\s+/)
  for (let token of tokens) {
    const newToken = trim(token);
    if (newToken.length) {
      words.push(token.toLowerCase());
    }
  }

  return words;
}

function listen(handle) {
  const _ = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
  _.on('line', (line) => {
    line = line || '';
    if (line.toLowerCase() == 'quit') {
      _.close();
      process.exit();
    } else {
      handle && handle(line);
    }
  });
}

module.exports = {
  tokenizer,
  listen,
  trim,
  storeModel,
  grabModel
};