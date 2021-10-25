const delegate = require("delegates");
// 委托模式，把 request 的内部方法暴露到 外部对象 proto 上
const proto = {
  request: {
    acceptsLanguages() {
      console.log("method acceptsLanguages");
    },
  },
};

delegate(proto, "request")
  .method("acceptsLanguages")
  .method("acceptsEncodings")
  .method("acceptsCharsets")
  .method("accepts")
  .method("is")
  .access("querystring")
  .access("idempotent")
  .access("socket")
  .access("length")
  .access("query")
  .access("search")
  .access("status")
  .access("method")
  .access("path")
  .access("body")
  .access("host")
  .access("url")
  .getter("subdomains")
  .getter("protocol")
  .getter("header")
  .getter("stale")
  .getter("fresh")
  .getter("secure")
  .getter("ips")
  .getter("ip");

console.log(proto);
