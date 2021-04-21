// eslint-disable-next-line radix
const time = parseInt(params.time) || 0
log(`请求延时, 延时${time}秒`)

log(params)
setTimeout(() => {
  res.send({ code: '000000', data: { time, desc: '请求延时接口', abc: 34242 } })
}, time * 1000)
