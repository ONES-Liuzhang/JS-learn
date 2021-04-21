let getData = () => {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("data");
    }, 1000);
  });
};

// asyncToGenerator
async function asyncFunc() {
  let data = await getData();
  console.log(data);
  let data1 = await getData();
  console.log(data1);
}
asyncFunc();

function* genFunc() {
  let data = yield getData();
  console.log(data);
  let data1 = yield getData();
  console.log(data1);
}

let g = genFunc();
// g.next();
// g.next(2222);
// g.next();
// g.next(33333);

// function asyncToGenerator(fn) {
//   return function () {
//     let gen = fn();
//     function step(preVal) {
//       let nextOne = gen.next(preVal);
//       let { value, done } = nextOne;
//       if (done) {
//         return preVal;
//       } else {
//         return value.then((res) => {
//           step(res);
//         });
//       }
//     }
//     step();
//   };
// }

// let test = asyncToGenerator(genFunc);
// test();
