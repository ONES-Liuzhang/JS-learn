import React, { Consumer, useContext, createContext, useState } from "react";
// connect 核心原理
// 前置知识 React的 Provider 和 Consumer 以及 Context

// <Provider store={store}></Provider>

const reduxContext = createContext();

const connect = (mapStateToProps, mapDispatchToProps) => (Component) =>
  function Connect(props) {
    const store = useContext(reduxContext);

    // 使store的更新可以触发组件渲染
    const [, setCount] = useState(true);
    const forceUpdate = () => setCount((val) => !val);
    store.subscribe(() => forceUpdate());

    return (
      <Consumer>
        <Component
          {...props}
          {...mapStateToProps(store.getState())}
          {...mapDispatchToProps(store.dispatch)}
        ></Component>
      </Consumer>
    );
  };
