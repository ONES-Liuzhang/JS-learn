const SelfPromise = require("./promise-class.js");

SelfPromise.all = function (promises) {
  return new SelfPromise((resolve, reject) => {
    const result = [];
    let counter = 0;

    promises.forEach((p, index) => {
      SelfPromise.resolve(p).then(
        (value) => {
          counter++;
          result[index] = value;
          if (counter === promises.length) {
            resolve(result);
          }
        },
        (reason) => {
          reject(reason);
        }
      );
    });
  });
};
