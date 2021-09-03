// 假设用户要支持自定义的 clean 的命令
// 这里的 plugins 的文件夹，讲道理不是放在这里的，只是写的 demo
// module.exports = (api) => {}
module.exports = (options) => (api) => {
  console.log('options: ', options);
  api.registerCommands('clean', (...args) => {
    // clean 命令的逻辑
    console.log('exec clean script success!');
  })
}