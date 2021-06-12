function fn(a, b, c) {
  const sum = a + b + c;
  console.log("总数为：", sum);
  return sum;
}

function curry(fn) {
  let len = fn.length;
  let argList = [];
  return function curryFn(...args) {
    len -= args.length;
    argList.push(...args);
    if (len > 0) {
      return curryFn;
    } else {
      return fn.apply(null, argList);
    }
  };
}

let newFn = curry(fn);

newFn(2, 3, 4);
newFn(2)(3, 4);
newFn(2)(3)(4);

// fn(2,3,4)
// fn(2)(3,4)
// fn(2)(3)(4)
