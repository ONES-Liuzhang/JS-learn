# redux

全局状态管理，也可以理解为是全局的状态共享。

单向数据流

redux 是与 react 完全解耦的

**状态管理的步骤**
(1) 在组件之外声明状态
(2) 把该状态注入到组件中
(3) 状态改变时，要触发组件的更新 subscribe

## 概念

### redux

- state
- reducer
- action
- dispatch
- subscribe
- getState
- combineReducers 合并多个 reducer，以便区分模块
- bindActionCreators

### react-redux

redux 是与 react 无关的库，而 react-redux 是它们之间的桥梁

- connect
- Provider + context
- ViewComponent

hooks

- useDispatch
- useReducer
- useSelector 使用这种方式可以替代 connect，可以选择 state 中的某个属性返回。**注意要在顶部组件中使用 Provider 注入了 store 才可以这么用**

```js
export default function App() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  const increment = () =>
    dispatch({
      type: "module1/CHANGE_COUNT",
      payload: { count: count + 1 },
    });

  return <button onClick={increment}>{count} ++ </button>;
}
```

## redux

基本用法
第一步：在组件之外创建 Store

```js
const initialState = {
  count: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD":
      return { count: state.count + action.payload };
    case "DECREMENT":
      return { count: state.count - action.payload };
    default:
      return state;
  }
}

const store = createStore(reducer);
```

第二步：注入项目根容器，借助 `react-redux` 的 `Provider`

```js
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

第三步：分发给子孙组件，比如有 `Container` 组件

connect 是一个高阶组件，它接收函数，返回一个高阶组件

- mapStateToprops 将 state 映射到 props
- mapDispatchToProps 将 dispatch 映射到 props

```js
import { connect } from "react-redux";
import Container from "./Container";

export default connect(mapStateToProps, mapDispatchToProps)(Container);
```

---

### redux 原理

```js
function createStore(reducer) {
  let state;
  let listeners = [];
  const getState = () => {
    return state;
  };

  // 触发某个 action，得到新的 state 并保存
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => {
      listener(state);
    });
  };

  const subscribe = (cb) => {
    listeners.push(cb);

    // 返回一个卸载函数
    return () => {
      listeners = listeners.filter((fn) => fn !== cb);
    };
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
}
```

connect 原理

```js
export function connect(mapStateToProps, mapDispatchToProps) {
  return (WrappedComponent) => (props) => {
    const store = useContext(Context);

    // 关联更新的手动档实现
    const [, setFlag] = useState(false);
    const forceUpdate = () => setFlag((flag) => !flag);
    useEffect(() => {
      // store 订阅， state 发生改变时， 触发组件的 re-render
      store.subscribe(() => {
        forceUpdate();

        return store.unsubscribe;
      });
    }, []);

    return (
      <WrappedComponent
        {...props}
        {...mapStateToProps(store.getState())}
        {...mapDispatchToProps(store.dispatch)}
      />
    );
  };
}
```

简化 👉 先变形，再提取公共逻辑。

```js
mapDispatchToProps = (dispatch) => {
  onDecrement: (...args) => dispatch({ type: "INCREMENT", payload }),
  onAdd: () => dispatch({ type: "ADD" }),
}
```

```js
// action.js
function onDecrement(payload) {
  return {
    type: "INCREMENT",
    payload
  }
}

function onAdd() {
  return {
    type: "ADD"
  }
}

mapDispatchToProps = (dispatch) => {
  onDecrement: (...args) => dispatch(onDecrement(...args)),
  onAdd: (...args) => dispatch(onAdd(...args)),
}
```

🌟 redux 提供了工具函数 `bindActionCreators`

```js
import * as actions from "./action.js"

mapDispatchToProps = (dispatch) => {
  ...bindActionCreators(actions, dispatch)
}

// 一种简单的实现
function bindActionCreators(actions, dispatch) {
  const result = {}
  Object.keys(actions).forEach((key) => {
    result[key] = (...args) => dispatch(actions[key](...args))
  })
  return result
}
```

### redux-thunk
一般来说，一个acition里只调用一次dispatch，但是也有可能会出现多次的情况。
再次变形
TODO `redux-thunk` 和 redux中间件 原理
```js
// 1. 使用中间件
import { applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import reducer from "./reducer";

const store = createStore(reducer, applyMiddleware(thunk));

// 2. 在action中，可以返回一个函数
function onAdd() {
  return (dispatch) => {
    dispatch({type: "xxx"})
  }
}

mapDispatchToProps = (dispatch) => {
    onAdd: () => dispatch(onAdd),
}
```