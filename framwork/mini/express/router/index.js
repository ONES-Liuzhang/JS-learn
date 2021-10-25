const proto = (module.exports = function (options) {
  const router = function (req, res, next) {
    router.handle(req, res, next);
  };

  // 继承
  router.prototype = Object.create(proto);

  router.stack = [];

  return router;
});

proto.use = function (path, fn) {
  const layer = new Layer(
    path,
    {
      done: false,
    },
    fn
  );
  this.stack.push(layer);
};

proto.handle = function (req, res, out) {
  function next() {}
};
