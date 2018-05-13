var ml = require('machine_learning');
var x = [[0.4, 0.5, 0.5, 0.,  0.,  0.],
         [0.5, 0.3,  0.5, 0.,  0.,  0.],
         [0.4, 0.5, 0.5, 0.,  0.,  0.],
         [0.,  0.,  0.5, 0.3, 0.5, 0.],
         [0.,  0.,  0.5, 0.4, 0.5, 0.],
         [0.,  0.,  0.5, 0.5, 0.5, 0.]];
var y = [[1, 0],
        [1, 0],
        [1, 0],
        [0, 1],
        [0, 1],
        [0, 1]];

var classifier = new ml.LogisticRegression({
    'input' : x,
    'label' : y,
    'n_in' : 6,
    'n_out' : 2
});

classifier.set('log level',1);

var training_epochs = 800, lr = 0.01;

classifier.train({
    'lr' : lr,
    'epochs' : training_epochs
});

x = [[0.5, 0.5, 0., 0., 0., 0.]];

console.log("Result : ",classifier.predict(x));