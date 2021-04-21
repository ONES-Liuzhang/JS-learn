// 下载文件

const express = require('express')
const path = require('path')
const router = express.Router()

const assetspath = path.resolve(__dirname, '../../assets')

router.post('/', (req, res, next) => {

  res.sendFile(path.resolve(assetspath, 'lifecycle.png'));

})


module.exports = router
