import React, { useContext, useEffect } from "react";

const Context = React.createContext();

export function Provider(props) {
  return (
    <Context.Provider value={props.store}>{props.children}</Context.Provider>
  );
}

// 要注意 useContext 不会受到 memo 等影响，不受 React 的渲染优化影响
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
