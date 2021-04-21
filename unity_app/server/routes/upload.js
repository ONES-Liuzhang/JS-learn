/* eslint-disable indent */
const formidable = require('formidable')
const http = require('http')
const util = require('util');
const express = require('express')
const chalk = require('chalk')
const path = require('path')
const router = express.Router()
const fs = require('fs')

const publicPath = path.resolve(__dirname, '../public')
const uploadPath = path.resolve(publicPath, 'upload')

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath)
}


router.post('/', (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = uploadPath
  form.keepExtensions = true; // 保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;   // 文件大小
  form.maxFields = 100;
  form.parse(req, (err, fields, files) => {
    let filesFile = files.file
    if (err) {
      return res.send({
        code: 500,
        msg: '内部服务器错误',
        data: '',
      })
    }
    let tempPath = path.relative(publicPath, filesFile.path)
    res.send({
      code: '0000',
      msg: '请求成功',
      data: {
        id: tempPath,
        path: 'http://localhost:8888/' + tempPath,
      },
    })
  });

})


module.exports = router
