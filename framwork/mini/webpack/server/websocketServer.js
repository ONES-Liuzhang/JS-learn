const http = require("http");
const WebSocket = require("ws");

class WebsocketServer {
  static heartbeatInterval = 3000;

  constructor() {
    this.server = http.createServer((req, res) => {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end("hello world");
    });
    // httpServer 收到 ws协议请求时，会触发 upgrade
    this.server.on("upgrade", (req, sock, head) => {
      console.log("协议升级");

      this.impl.handleUpgrade(req, sock, head, (connection) => {
        this.impl.emit("connection", connection, req);
      });
    });

    this.clients = [];

    this.impl = new WebSocket.Server({
      noServer: true,
    });

    this.impl.on("error", (error) => {
      console.error("错误信息：", error);
    });

    // 心跳 heartBeat
    const interval = setInterval(() => {
      this.clients.forEach((client) => {
        // 一个心跳时时长服务端没有响应则关闭客服端
        if (client.isAlive === false) client.terminate();

        client.ping();
      });
    }, WebsocketServer.heartbeatInterval);

    this.impl.on("connection", (client) => {
      console.log("client ", client, "已连接！");
      this.clients.push(client);

      client.isAlive = true;

      // 心跳
      client.on("pong", () => {
        client.isAlive = true;
      });

      client.on("close", () => {
        this.clients.splice(this.clients.indexOf(client), 1);
      });
    });

    this.impl.on("close", () => {
      clearInterval(interval);
    });

    // 开始监听 5555 端口
    this.server.listen(5555, () => {
      console.log("监听5555端口");
    });
  }
}

new WebsocketServer();
