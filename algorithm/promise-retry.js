// use strict

function retry(fn, time = 1) {
  let count = 1;

  function tryFn() {
    console.log(`尝试第${count++}次`);
    return new Promise((resolve, reject) => {
      resolve(fn());
    })
      .then((res) => res)
      .catch((err) => {
        if (--time > 0) {
          return tryFn();
        } else {
          return Promise.reject(err);
        }
      });
  }
  return tryFn();
}

retry(() => {
  throw new Error(2);
}, 3)
  .then((res) => console.log(res))
  .catch((err) => console.error("error:", err));
