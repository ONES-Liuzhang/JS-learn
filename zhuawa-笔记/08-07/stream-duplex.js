const { Duplex } = require("stream");

const duplex = new Duplex();

duplex._write = function (buf, encode, next) {
  process.stdout.write(buf.toString() + "\n");
  next();
};

duplex._read = function (size) {
  this._readNum = this._readNum || 0;

  if (this._readNum > 2) {
    return this.push(null);
  }

  this.push(`${this._readNum++}`);
};

/** 监听写入 this.push(xxx) 的数据 */
duplex.on("data", (data) => {
  console.log(`ondata: ${data.toString()}\n`);
});

duplex.on("end", () => {
  console.log("END");
});

duplex.write("a");
duplex.write("b");
duplex.write("c");

duplex.end();
