const once = function (fn) {
  let called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(fn, arguments);
    }
  };
};

const a = once(() => {
  console.log(123);
});

a();
a();
