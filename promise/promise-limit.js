// 场景：并发控制
// 一次最多只有limit个任务在执行
// 1.使用Promise.race实现
function limitLoad(urls, handler, limit) {
  // 练习边界条件的处理方式
  if (!Array.isArray(urls)) {
    return new Error("第一个参数请传入一个数组！");
  }

  if (Number.isNaN(Number(limit))) {
    return new Error("第二个参数必须传入一个数字！");
  }

  if (Number(limit) <= 0) {
    return Promise.all(urls.map((url) => handler(url)));
  }

  const urlList = [].concat(urls);

  const promiseQueue = urlList
    .splice(0, limit)
    .map((url, index) => handler(url).then(() => index));

  let p = Promise.race(promiseQueue);
  let task = null;
  while (urlList.length > 0 && (task = urlList.shift())) {
    p = p.then((index) => {
      promiseQueue[index] = handler(task).then(() => index);

      return Promise.race(promiseQueue);
    });
  }
}

function handler(url) {
  return new Promise((resolve) => {
    console.log(url, "----开始执行----start");
    setTimeout(() => {
      console.log(url, "end");
      resolve();
    }, 800);
  });
}

limitLoad([1, 2, 3, 4, 5], handler, 3);

// 2.不使用Promise.race()
function limitLoad2(urls, handler, limit) {}
