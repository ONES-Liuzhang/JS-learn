const path = require('path')
const fs = require('fs')


const assetspath = path.resolve(__dirname, '../../assets')


// const filepath = path.resolve(assetspath, 'lifecycle.png')
const filepath = path.resolve(assetspath, 'test.js')

//参数2：配置项，有highWaterMark  每次能读取多少，默认是64k，一次读取64k 不需要更改
let rs = fs.createReadStream(filepath, {     // 返回了一个可读流的实例
  // flags: 'r',      //对文件进行何种操作
  encoding: 'utf-8',       //设置之后，读取的是字符串，不然默认为buffer
  // start: 3,                //从索引3开始读
  // end: 7,                // 读到索引为7的  包括结束
  highWaterMark: 1024, // 每次读取的个数
})

rs.on('open', () => {
  console.log('开始读取文件');
});


rs.on('data', (data) => {
  console.log('读取到的数据:');
  console.log(data);
});

rs.on('end', () => {
  console.log('文件全部读取完毕');
});

rs.on('close', () => {
  console.log('文件被关闭');
});

rs.on('error', (err) => {
  console.log('读取文件失败');
});
