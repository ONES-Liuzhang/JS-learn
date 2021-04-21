const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const { findApiDirs, findApiFiles } = require('../utils')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send({
    code: '999999',
    msg: 'error',
  })
})

// const apiDirPath = path.resolve(__dirname, '../api')

const interfaceMap = {}
const urlMap = {}
console.log(`----------------文件遍历开始-------------------`)
console.log(``)

const apiDirs = findApiDirs([path.resolve(__dirname, '../../packages')])
apiDirs.push(path.resolve(__dirname, '../api'))  //
const apiFiles = findApiFiles(apiDirs)  // api文件对象

readDirRoute(apiFiles)

console.log(``)
console.log(`----------------文件遍历结束-------------------`)


/**
 * 遍历文件目录获取路由
 * @param {*} dirPath
 */
function readDirRoute(apiFlies) {
  apiFlies.forEach((apiItem) => {
    const { filepath, key, filename } = apiItem
    if (key.substr(0, 1) === '_') {
      // 正常接口
      let url = key.replace(/_/g, '/')
      if (urlMap[url]) throw new Error(`相同重复的url: ${filename}`)
      let route = { url, filepath, filename: key }
      urlMap[url] = route
      addRoute(route)
    } else {
      // callFunc 的接口号
      if (interfaceMap[key]) throw new Error(`相同重复的接口号: ${key}`)
      console.log(`   添加接口号: '${chalk.blue.bold(key)}',   文件名: '${chalk.red.bold(filename)}'`)
      interfaceMap[key] = { filename, filepath, funcName: key }
    }
  })
}

function addRoute({ url, filepath, filename, method = 'post' }) {
  console.log(`   添加路由项: '${chalk.blue.bold(url)}',  文件名: '${chalk.red.bold(filename)}'`)
  if (method === 'post') {
    router.post(url, (req, res, next) => {
      routeCb({ req, res, next, filepath, url })
    })
  } else {
    router.get(url, (req, res, next) => {
      routeCb({ req, res, next, filepath, url })
    })
  }
}

router.post('/callFunc', (req, res, next) => {
  let interfaceName = req.body.funcName
  let route = interfaceMap[interfaceName]
  if (!route) {
    res.status(500)
    res.send({
      code: '999999',
      msg: `找不到对应的接口号${interfaceName}`,
    })
    return
  }
  routeCb(Object.assign({ req, res, next }, route))
})



/**
 *路由回调
 * @param {*} param0
 */
function routeCb({ req, res, next, filepath, url, funcName }) {
  console.log('')
  let date = chalk.cyan(new Date().toLocaleDateString())
  if (funcName) {
    console.log(`--------------调用接口 /callFunc: ${funcName} ${date}----------------`)
  } else {
    console.log(`--调用接口: ${url} ${date}----------------`)
  }
  console.log(`   --访问文件地址: ${chalk.blue.bold.underline(filepath)}`)
  let { body } = req
  if (Object.keys(body).length > 0) console.log(`   --参数: ${JSON.stringify(body)}`)

  let funcStr = fs.readFileSync(filepath)
  // eslint-disable-next-line no-new-func
  let fn = new Function(['req', 'res', 'path', 'fs', 'log', 'params'], funcStr)
  try {
    // eslint-disable-next-line no-useless-call
    fn.call(null, req, res, path, fs, log, body)
  } catch (err) {
    console.log(`**********************************************`)
    console.log(`文件路径报错`, err)
    console.log(`**********************************************`)
    res.status(503)
    res.send({
      code: '999999',
      msg: '执行文件报错',
      data: { err, filepath },
    })
  }
  fn = null
  console.log(`--------------调用结束----------------`)
}

function log(...args) {
  console.log.apply(null, ['    ', ...args])
}

module.exports = router
