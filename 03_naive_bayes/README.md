# 朴素贝叶斯

- [朴素贝叶斯的实现](naiveBayes.js)

  ```bash
  $ node test.js
  ```
- [基于朴素贝叶斯实现聊天机器人](chatbot/app.js)

  ```bash
  $ node chatbox/app.js
  $ Hello
  $ Hello, thanks for visiting
  ```

## 优缺点

主要优点：

- 朴素贝叶斯模型发源于古典数学理论，有稳定的分类效率。
- 对小规模的数据表现很好，能个处理多分类任务，适合增量式训练，尤其是数据量超出内存时，我们可以一批批的去增量训练。
- 对缺失数据不太敏感，算法也比较简单，常用于文本分类。

主要缺点：

- 理论上，朴素贝叶斯模型与其他分类方法相比具有最小的误差率。但是实际上并非总是如此，这是因为朴素贝叶斯模型假设属性之间相互独立，这个假设在实际应用中往往是不成立的，在属性个数比较多或者属性之间相关性较大时，分类效果不好。而在属性相关性较小时，朴素贝叶斯性能最为良好。对于这一点，有半朴素贝叶斯之类的算法通过考虑部分关联性适度改进。
- 需要知道先验概率，且先验概率很多时候取决于假设，假设的模型可以有很多种，因此在某些时候会由于假设的先验模型的原因导致预测效果不佳。
- 由于我们是通过先验和数据来决定后验的概率从而决定分类，所以分类决策存在一定的错误率。
- 对输入数据的表达形式很敏感。

## 参考资料

* [Naive Bayes and Text Classification – Introduction and Theory](http://sebastianraschka.com/Articles/2014_naive_bayes_1.html)
* [朴素贝叶斯分类器的应用](http://www.ruanyifeng.com/blog/2013/12/naive_bayes_classifier.html)
* [朴素贝叶斯实战与进阶](http://blog.csdn.net/longxinchen_ml/article/details/50629613)
* [算法杂货铺——分类算法之朴素贝叶斯分类](http://www.cnblogs.com/leoo2sk/archive/2010/09/17/naive-bayesian-classifier.html)
