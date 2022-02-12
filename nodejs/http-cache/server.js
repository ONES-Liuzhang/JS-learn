const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(201, {
    "content-type": "text/html; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  // 强缓存
  if (req.url === "/cache1") {
    res.setHeader("Cache-Control", "max-age=120");
  } else if (req.url === "/cache2") {
  } else if (req.url === "/accept") {
  }

  res.end("HelloWorld 你好");
});

server.listen(3333, () => {
  console.log("server listening on 3333");
});
