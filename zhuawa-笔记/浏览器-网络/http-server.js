const http = require("http");

http
  .createServer((req, res) => {
    console.log(req);
    res
      .writeHead(200, {
        "Content-Type": "text/plain",
      })
      .end("hello world");
  })
  .listen(3000, "127.0.0.1", () => {
    console.log("listning on http:localhost://3000");
  });
