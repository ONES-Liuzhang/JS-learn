const Koa = require("../application.js");
const http = require("http");

const app = new Koa();
http.createServer(app);

app.use(async function m1(ctx, next) {
  console.log(1);
  await next();
  console.log(4);
});

app.use(async function m2(ctx, next) {
  console.log(2);
  await next();
  console.log(3);
});

app.listen(3000, () => {
  console.log("server listening on 3000");
});
