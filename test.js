// / / / 1 / / 2 / 3 4 a b 5
Promise.resolve()
  .then(() => {
    // tick1
    console.log("/");
    return Promise.resolve(4);
  })
  .then((res) => {
    // tick4
    console.log(res);
  });

Promise.resolve()
  .then(() => {
    console.log("/"); // tick1
    // 返回值x 是一个Promise
    let p = Promise.resolve().then(() => {
      console.log("/"); // tick2
      return Promise.resolve("a"); // tick5
    });

    return p; //
  })
  .then((res) => {
    console.log(res);
  });
Promise.resolve()
  .then(() => {
    //tick1
    console.log("/");
    return Promise.resolve().then(() => {
      console.log("/");
      return Promise.resolve().then(() => {
        console.log("/");
        return Promise.resolve("b");
      });
    });
  })
  .then((res) => {
    console.log(res);
  });

Promise.resolve()
  .then(() => {
    // tick1
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  })
  .then(() => {
    console.log(7);
  })
  .then(() => {
    console.log(8);
  })
  .then(() => {
    console.log(9);
  });
