const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

// 获取api文件夹列表
function findApiDirs(dirList, list = []) {
  if (dirList.length === 0) return list
  let templist = []
  dirList.forEach(dirpath => {
    const dirFiles = fs.readdirSync(dirpath)
    dirFiles.forEach(filename => {
      const filepath = path.resolve(dirpath, filename)
      const stats = fs.statSync(filepath)
      if (stats.isDirectory()) {
        if (filename === 'api') list.push(filepath)
        else templist.push(filepath)
      }
    })
  })
  return findApiDirs(templist, list)
}



// 获取的api文件列表
function findApiFiles(dirList, list = []) {
  if (dirList.length === 0) return list
  let templist = []
  dirList.forEach(dirpath => {
    const dirFiles = fs.readdirSync(dirpath)
    dirFiles.forEach(filename => {
      const filepath = path.resolve(dirpath, filename)
      const stats = fs.statSync(filepath)
      if (stats.isDirectory()) {
        templist.push(filepath)
      } else {
        let fileparse = path.parse(filepath)
        if (fileparse.ext === '.js') list.push({
          filepath,
          filename,
          key: fileparse.name.split('&')[0]
        })
      }
    })
  })
  return findApiFiles(templist, list)
}

exports.findApiDirs = findApiDirs
exports.findApiFiles = findApiFiles

// module.exports = router
