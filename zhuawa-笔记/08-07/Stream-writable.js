const { Writable, Readable } = require("stream");

const writable = new Writable();

writable._write = function (data, enc, next) {
  process.stdout.write(data.toString().toUpperCase() + "\n");

  // 通知处理下一个数据
  process.nextTick(next);
};

writable.write("aa");
writable.write("bb");
writable.write("cc");

writable.end();

writable.on("finish", () => {
  process.stdout.write("end");
});
