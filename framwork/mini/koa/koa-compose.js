module.exports = function compose(middleware) {
  return function (context, next) {
    dispatch(0);

    function dispatch(i) {
      let fn = middleware[i];

      if (i === middleware.length) fn = next;

      // 递归中止条件，如果 i > middleware.length 或者 中途设置了空的 middleware 都会终止递归
      if (!fn) return Promise.resolve();

      // 使用 bind 给下一个 dispatch 传参 这里并没有执行
      return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
    }
  };
};
