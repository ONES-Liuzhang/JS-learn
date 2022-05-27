const SelfPromise = require("./promise-class.js");

// / / / 1 / / 2 / 3 4 a b 5
SelfPromise.resolve()
  .then(() => {
    console.log("/");
    return SelfPromise.resolve(4);
  })
  .then((res) => {
    console.log(res);
  });

SelfPromise.resolve()
  .then(() => {
    console.log("/");
    return SelfPromise.resolve().then(() => {
      console.log("/");
      return SelfPromise.resolve("a");
    });
  })
  .then((res) => {
    console.log(res);
  });
SelfPromise.resolve()
  .then(() => {
    console.log("/");
    return SelfPromise.resolve().then(() => {
      console.log("/");
      return SelfPromise.resolve().then(() => {
        console.log("/");
        return SelfPromise.resolve("b");
      });
    });
  })
  .then((res) => {
    console.log(res);
  });
SelfPromise.resolve()
  .then(() => {
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
