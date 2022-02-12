const Koa = require("../index.js");

const app = new Koa();

app.use(async function m1(ctx, next) {
  console.log(1);
  await next();
  console.log(4);

  ctx.response.statusCode = 200;
  ctx.body = "Hello World";
});

app.use(async function m2(ctx, next) {
  console.log(2);
  await next();
  console.log(3);
});

app.listen(3000, () => {
  console.log("server listening on 3000");
});
