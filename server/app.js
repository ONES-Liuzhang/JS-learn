const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const dirSync = fs.realpathSync(process.cwd());
console.log("dirSync", dirSync);
let dir = fs.realpath(process.cwd(), (err, dir) => {
	console.log(err);
	console.log((dir = dir));
});

const buffer = fs.readFileSync("./a.js", "utf-8");
console.log(buffer);

app.get("/", function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.send("hello");
});

app.listen(9999);
