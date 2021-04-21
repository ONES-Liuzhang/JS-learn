// 需要按照 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印
// 异步串行
// function createFlow(arr) {
//   const result = [];
//   expand(arr);
//   function expand(arr) {
//     for (let i = 0; i < arr.length; i++) {
//       const child = arr[i];
//       if (child.isFlow) {
//         result.push(child);
//       } else if (Array.isArray(child)) {
//         result.push(createFlow(child));
//       } else {
//         result.push(child);
//       }
//     }
//   }

//   async function run(cb) {
//     for (let i = 0; i < result.length; i++) {
//       if (typeof result[i] === "function") await result[i]();
//       else await result[i].run(() => {});
//     }
//     cb && cb();
//   }
//   return {
//     run,
//     isFlow: true,
//   };
// }

let timer;
const _toString = (obj) => Object.prototype.toString.call(obj).slice(8, -1);
const noop = Object.create(Function);
// 使用reduce
const createFlow = (function () {
  const id = Symbol("flow");
  return function (taskQueue) {
    function run(cb = noop) {
      timer = Date.now();
      const tasks = [...taskQueue, cb];
      function _run(task) {
        const type = _toString(task);
        if (type === "Promise") return task;
        if (task[id] /* Function createFlow */) return task.run();
        if (type === "Function") return delay(0).then(() => task());
        if (type === "Array") return createFlow(task).run();
      }
      /* return Promise */
      return tasks.reduce(
        (pre, curr) =>
          pre.then(() => {
            return _run(curr);
          }),
        Promise.resolve()
      );
    }
    return { [id]: true, run };
  };
})();
function log(...args) {
  return console.log(`timer: ${Date.now() - timer}`, ...args);
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const subFlow = createFlow([() => delay(1000).then(() => log("c"))]);

createFlow([
  () => log("a"),
  () => log("b"),
  subFlow,
  [() => delay(1000).then(() => log("d")), () => log("e")],
]).run(() => {
  console.log("done");
});
