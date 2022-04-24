const WebSocket = require("ws");

const socket = new WebSocket(`ws://localhost:5555`);

socket.on("open", function open() {
  socket.send("something");
});

socket.on("pong", () => {
  console.log("pong");
});

socket.on("message", function message(data) {
  console.log("received: %s", data);
});

socket.addEventListener("close", () => {
  console.log("client close");
});
