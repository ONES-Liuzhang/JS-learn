// const createError = require('http-errors')
const express = require('express')
const path = require('path')
// const cookieParser = require('cookie-parser')
// const logger = require('morgan')

const app = express()

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs')

// app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(cookieParser())

// 静态访问路径
app.use(express.static(path.join(__dirname, 'public')))

// 跨域配置
app.all(
  '*',
  (() => {
    const allowHeaders = ['token', 'Content-Type'].join(',')
    const allowMethods = ['POST', 'GET', 'HEAD', 'OPTIONS'].join(',')
    const allowMaxAge = 60 * 60
    return (req, res, next) => {
      res.header('Access-Control-Allow-Origin', req.headers.origin)
      res.header('Access-Control-Allow-Headers', allowHeaders)
      res.header('Access-Control-Allow-Methods', allowMethods)
      res.header('Access-Control-Allow-Max-Age', allowMaxAge)

      if (req.method.toLowerCase() === 'options') res.sendStatus(200)
      else next()
    }
  })()
)

app.use('/upload', require('./routes/upload'))
app.use('/download', require('./routes/download'))

app.use('/', require('./routes/index'))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  // next(createError(404))
  next()
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
