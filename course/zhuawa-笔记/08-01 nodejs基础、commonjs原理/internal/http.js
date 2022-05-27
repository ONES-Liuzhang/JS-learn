const http = require("http");

const proxy = http.createServer((req, res) => {
  res.writeHead(200, { "x-my-header": "my-header" });
  res.end("Hello world");
});

proxy.listen(3456, "127.0.0.1", () => {
  console.log("server start");
});
