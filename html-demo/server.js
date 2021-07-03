const express = require("express");
const http = require("http");

let port = 3888;

const app = express();

app.use(express.static("./css-html/"));

const server = http.createServer(app);

server.listen(port, () => {
  console.log("server now listening on ", port);
});

server.on("error", (err) => {
  server.close();
  if (err.code === "EADDRINUSE") {
    console.log(`端口${port}被占用`);
  }
});
