const path = require('path');
const express = require('express');
const app = express();

app.get("/", function(req, res) {
  res.sendFile(path.resolve(__dirname, './index.html'));
});

app.get("/home", function(req, res) {
  res.sendFile(path.resolve(__dirname, './index.html'));
});

app.get("/about", function(req, res) {
  res.sendFile(path.resolve(__dirname, './index.html'));
});

app.listen(8080);