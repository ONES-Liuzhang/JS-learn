// 声明 8 byte 的内存空间
const buf = new ArrayBuffer(8);

// 把这段内存空间转化为无符号 8 位 整型数据
const arr = new Uint8Array(buf);

console.log(arr);
