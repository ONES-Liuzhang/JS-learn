const http = require("http");

const options = {
  method: "GET",
  hostname: "127.0.0.1",
  port: 3000,
  path: "/",
};

const req = http.request(options, (res) => {
  res.setEncoding("utf8");
  res.on("data", (data) => {
    console.log(data);
  });
});

req.end();
