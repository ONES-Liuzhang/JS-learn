# redux-actions
核心函数
- createActions
- handleActions
- combineActions

`redux-actions`是个工具库，为了方便编写 redux 的 action 和 reducer 逻辑  
提供更便捷的异步操作，它跟 react、redux 是解耦的

**学习`redux-actions`的原理之前，需要了解`redux`的基本概念 `reducer`、`action` 和 `actionCreator`**

原理部分只提供简化的代码，不是源码解析！

## 用法

官方示例：

```js
import { createActions, handleActions, combineActions } from "redux-actions";

const defaultState = { counter: 10 };

const { increment, decrement } = createActions({
  INCREMENT: (amount = 1) => ({ amount }), // type: (...args) => payload
  DECREMENT: (amount = 1) => ({ amount: -amount }),
});

const reducer = handleActions(
  {
    [combineActions(increment, decrement)]: (
      state,
      { payload: { amount } }
    ) => {
      return { ...state, counter: state.counter + amount };
    },
  },
  defaultState
);

export default reducer;
```

### 原理

1. 工具函数
  源码中提供的工具函数，用到的比较多，所以提出来写在这里
  用于把数组项当作 `key` callback 的返回值当作 `value` 构造一个对象

```js
function arrayToObject(array, callback) {
  return array.reduce((patialObject, curr) => callback(patialObject, curr), {});
}

arrayToObject(["a", "b"], (patialObject, key) => ({
  ...patialObject,
  [key]: (val) => val,
})); // {a: (val) => val, b: (val) => val}
```

2. createActions

action 的结构是非常简单的，就是 redux 中定义的格式 `{type: string, payload: any}`

actionCreator 就是返回 action 的函数

createActions 的原理就是根据 `redux-actions` 的结构约定定义好之后，转换成 actionCreator

核心原理一个函数就搞定 👇👇👇

> ⚠️ [flag1] 源码中修改了 actionCreator 的 toString 方法，返回 type 的 string 值，这里就省略这一步了

```js
// 极简化版
function createActions(actionMap) {
  return arrayToObject(Object.keys(actionMap), (patialObject, type) => ({
    ...patialObject,
    [type.toLowerCase()]: function actionCreator() {  // 源码中对这个函数的 toString 做了处理，会返回 type.toLowerCase() 的值
      return {
        type,
        payload: actionMap[key](...args),
      };
    },
  }));
}
```

3. handleActions

handleActions 返回一个 reducer

原理很简单 👇👇👇
```js
/**
 * handleActions({
 *    [increment]: (state, { payload }) => ({ ...state, count: state.count + payload.count }),
 *    [decrement]: (state, { payload }) => ({ ...state, count: state.count + payload.count }),
 * }, {})
 */
function handleActions(handlers, defaultState) {
  // 源码中支持嵌套，会打平 handlers
  return (state = defaultState, { type, payload }) =>
    handlers[type.toString()](state, payload);
}
```

> 实际源码中，handlers 兼容了 Map，并且支持嵌套，会有一个打平的操作，根据 handlers 的结构自动给type加上命名空间

4. combineActions

还可以再简化一点！！套娃就完事了。

对这个例子来说，在我们定义的 action 下，`increment` 和 `decrement` 的函数体是一样的，那就**合并它！**

```js
handleActions({
    [increment]: (state, { payload }) => ({...state, count: state.count + payload.count }),
    [decrement]: (state, { payload }) => ({ ..state, count: state.count + payload.count,
    })},
  {}
);

// 🌟 改成这样，也就是官方示例中的样子
handleActions({
      [combineActions(increment, decrement)]: (state, { payload }) => ({...state, count: state.count + payload.count })
    },
  {}
);
```

combineActions 就是单纯把传入的多个参数通过连接符连接起来返回，要使用合并的功能，还需要对`handleActions`进行更改，当传入的`type` 可以命中到 `handleActions` 内 `key` 值规则时调用对应的reducer
```js
// actionsTypes.map(toString) 就调用了 actionCreator 的 toString方法，上面 [flag1] 提到过会返回 type 值
function combineActions(...actionsTypes) {
  return actionsTypes.map(toString).join("||")
}

// 改动一下handleActions
function handleActions(handlers, defaultState) {
  // return (state = defaultState, { type, payload }) =>
  //   handlers[type](state, payload);
  const reducers = Object.keys(handlers).map(type => {
    const types = type.toString().split("||")

    if ()
  })
}
```