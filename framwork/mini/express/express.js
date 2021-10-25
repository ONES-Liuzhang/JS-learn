const Router = require("router");

module.exports = function createApplication() {
  const app = function (req, res, next) {
    app.handle(req, res, next);
  };

  // app.use(fn) 或者 app.use(path, fn)
  // 依赖收集： router 收集中间件 存入 stack
  app.use = function (path, fn) {
    if (typeof path === "function") {
      fn = path;
      path = "/"; // 默认值
    }

    // 第一次调用use的时候，挂载 router
    this.lazyrouter();
    const router = this._router;

    return router.use(path, fn);
  };

  /** 懒加载 router */
  app.lazyrouter = function () {
    if (!this._router) {
      this._router = new Router();
    }
  };

  app.handle = function (req, res, callback) {
    if (!this._router) {
      return console.log("no routes defined on app");
    }

    // 设置回调默认值
    const done =
      callback ||
      function () {
        console.log("done");
      };

    const router = this._router;

    // 依赖消费： 消费 stack 队列
    return router.handle(req, res, done);
  };

  return app;
};
