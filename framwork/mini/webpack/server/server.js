const http = require("http");

export default class Server {
  constructor(options) {}

  createServer(options) {
    const server = http.createServer((req, res) => {});
    this.server = server;
  }
}
