const net = require("net");
const PORT = 7777;
const HOST = "127.0.0.1";

const socket = new net.Socket();
const ServerName = `${HOST}:${PORT}`;

socket.connect(PORT, HOST, () => {
  console.log(`连接到服务器 ${ServerName}`);
  let count = 0;
  // 向服务端发送数据
  const timer = setInterval(() => {
    if (count > 10) {
      socket.write("我没事了, 告辞");
      clearInterval(timer);
      return;
    }
    socket.write("马冬梅" + count++);
  }, 1000);
});

// 接收消息
socket.on("data", (data) => {
  console.log(`${ServerName} - ${data}`);
  // 关闭连接
  // client.destroy();
});

// 关闭事件
socket.on("close", () => {
  console.log("Connection closed");
});

socket.on("error", (error) => {
  console.log(error);
});
