const createApp = require("./app");
const fs = require("fs");
const path = require("path");
const server = require("express")();
const renderer = require("vue-server-renderer").createRenderer({
  template: fs.readFileSync(
    path.resolve(__dirname, "./template/index.template.html"),
    "utf-8"
  ),
});

server.get("*", (req, res) => {
  const app = createApp(req);
  // 插值
  const context = {
    title: "Vue SSR",
    metas: `
        <meta name="keyword" content="vue,ssr">
        <meta name="description" content="vue srr demo">
    `,
  };

  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      return res.send("系统错误！");
    }
    res.send(html);
  });
});

server.listen(8080, "0.0.0.0", () => {
  console.log("server lisening on 8080");
});
