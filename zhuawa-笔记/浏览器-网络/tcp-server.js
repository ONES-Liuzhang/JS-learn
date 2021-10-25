const net = require("net");

net
  .createServer((socket) => {
    const remoteName = `${socket.remoteAddress}:${socket.remotePort}`;
    console.log(`${remoteName} 连接到本服务器`);

    socket.on("data", (data) => {
      console.log(`${remoteName} - ${data}`);
      socket.write(`好的，收到：重复一遍，是 ${data} 吗`);
    });

    socket.on("close", () => {
      console.log(`${remoteName} 连接关闭`);
    });
  })
  .listen(7777, "127.0.0.1", () => {
    console.log("Server listening on 3222");
  });
