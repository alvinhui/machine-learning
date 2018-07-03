const Tokenizer = require('./tokenizer');

(async function(){
  const tokenizer = new Tokenizer();
  await tokenizer.loadDict();
  console.log('total', tokenizer.total);

  console.log(tokenizer.cut('中国是一个发展中国家'));
  console.log(tokenizer.cut('这里是美丽的北京大学'));
  console.log(tokenizer.cut('我是北京大学生'));
})()
