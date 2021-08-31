// 一个简单的nextTick
const callbacks = [];
let pending = false;

// 执行所有callback
function flashCallbacks() {
  pending = false;

  const copies = callbacks.slice(0);
  callbacks.length = 0;
  for (let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

let timerFunc;

// 微任务降级 Promise -> mutationObserver -> setImmediate -> setTimeout
if (typeof Promise !== "undefined" && isNative(Promise)) {
  let p = Promise.resolve();
  timerFunc = () => {
    p.then(() => {
      flashCallbacks();
    });
  };
} else if (
  typeof MutationObserver !== "undefined" &&
  isNative(MutationObserver)
) {
  let counter = 1;
  const textCode = document.createTextNode(String(counter));
  const mo = new MutationObserver(flashCallbacks);

  // 当文本发生变化时触发MutationObserver绑定的事件
  mo.observe(textCode, {
    characterData: true,
  });

  timerFunc = () => {
    textCode.data = counter = String((counter + 1) % 2);
  };
} else {
  timerFunc = () => {
    setImmediate(flashCallbacks, 0);
  };
}

function nextTick(cb, ctx) {
  let _resolve;
  callbacks.push(() => {
    if (cb) {
      cb.call(ctx);
    } else {
      _resolve(ctx);
    }
  });

  if (!pending) {
    pending = true;
    timerFunc();
  }

  if (!cb && typeof Promise !== "undefined") {
    return new Promise((resolve) => {
      _resolve = resolve;
    });
  }
}

function isNative(fn) {
  return fn && /native code/.test(fn.toString());
}

nextTick(() => {
  console.log(1);
  nextTick(() => {
    console.log(4);
  });
});

Promise.resolve()
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(6);
  });

nextTick(() => {
  console.log(2);
  nextTick(() => {
    console.log(5);
  });
});
