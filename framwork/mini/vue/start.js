const express = require("express");
const http = require("http");

const app = express();

app.use(express.static("./front"));

app.listen(5000);

http.createServer(app);
