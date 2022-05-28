function createStore(reducer, ...middlewares) {
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

module.exports = {
  createStore
}