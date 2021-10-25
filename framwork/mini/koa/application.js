const EventEmitter = require("eventemitter3");
const compose = require("./koa-compose");
const http = require("http");

module.exports = class Application extends EventEmitter {
  constructor(options) {
    super();
    this.middleware = [];
    this.options = options;
    this.context = {
      method: "GET",
      url: "/",
      body: undefined,
      set(key, val) {
        console.log("context.set ", `${key} : ${val}`);
      },
    };
  }

  use(fn) {
    this.middleware.push(fn);
    return this;
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    server.listen(...args);
    return this;
  }

  /** http回调入口 */
  callback() {
    // 处理中间件
    const fn = compose(this.middleware);
    const ctx = this.context;

    const handleRequest = function (req, res) {
      ctx.req = req;
      ctx.response = res;
      fn(ctx, async () => {
        console.log("complate!");
      });
    };

    return handleRequest;
  }
};
