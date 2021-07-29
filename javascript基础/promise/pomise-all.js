function promiseAll(promiseArr) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promiseAll)) {
      return reject(new Error("必须传入一个数组！"));
    }
    const promiseNums = promiseAll.length;
    const result = [];
    let counter = 0;
    for (let i = 0; i < promiseNums; i++) {
      Promise.resolve(promiseAll[i])
        .then((res) => {
          counter++;
          result[i] = res;

          if (counter === promiseNums) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}
