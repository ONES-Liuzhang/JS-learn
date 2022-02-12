const http = require("http");

class Koa {
  constructor() {
    this.context = {
      method: "GET",
      body: null,
    };
    this.middleWares = [];
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    server.listen(...args);
  }

  use(middleWare) {
    if (typeof middleWare !== "function") {
      throw new TypeError("middleWare 中间件必须是一个函数");
    }
    this.middleWares.push(middleWare);
  }

  callback() {
    const ctx = this.context;
    const fn = compose(this.middleWares);

    const handleRequest = (req, res) => {
      ctx.request = req;
      ctx.response = res;
      // 初始化一个默认的 statusCode
      res.statusCode = 404;

      return fn(ctx)
        .then(() => {
          // 判断ctx.body有没有值，有的话直接调用 res.end 返回结果给客户端。
          if (ctx.body) {
            res.end(ctx.body);
          } else {
            res.end();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    };

    return handleRequest;
  }
}

function compose(middleWares) {
  const len = middleWares.length;
  return function (ctx, next) {
    return dispatch(0);

    function dispatch(i) {
      let fn = middleWares[i];
      if (len === i) fn = next;
      if (!fn) return Promise.resolve(); // 递归终止条件

      return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
    }
  };
}

module.exports = Koa;
