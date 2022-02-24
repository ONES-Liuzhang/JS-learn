const socket = new WebSocket(`ws://${location.host}`);

socket.addEventListener("message", ({ data }) => {
  console.log("client:", data.message);
});

socket.addEventListener("close", () => {
  console.log("client close");
});
