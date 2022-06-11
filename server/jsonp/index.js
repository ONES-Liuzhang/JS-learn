const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  const queryStr = url.split("?")[1];

  const query = queryStr
    ? queryStr.split("&").reduce((acc, cur) => {
        if (cur) {
          const [key, value] = cur.split("=");
          acc[key] = value;
        }
        return acc;
      }, {})
    : {};

  res.writeHead(200, {
    "Content-Type": "text/plain",
  });
  res.end(`${query.callback}("jsonpData")`);
});

server.on("error", (err) => {
  console.log(err);
});

server.on("listening", () => {
  console.log("listening");
});

server.listen(3333, () => {
  console.log("server is running at 3333");
});
