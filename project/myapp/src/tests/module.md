```js
// moduleA.ts
export let changeVal = () => {
  console.log("Es6 changeVal 第一次调用");
  changeVal = () => {
    console.log("Es6 changeVal 第二次调用");
  };
};

// commonjsA.js
let changeValCjs = () => {
  console.log("cjs changeVal 第一次调用");
  changeVal = () => {
    console.log("cjs changeVal 第二次调用");
  };
};

exports.changeValCjs = changeValCjs;
```
