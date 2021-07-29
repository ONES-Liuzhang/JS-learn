const path = require('path');
const express = require('express');
const app = express();

app.get("/:something", function(req, res) {
  const { something } = req.params;
  res.send(`
    <p>hello world ${something}</p>
  `);
});

app.listen(8080);