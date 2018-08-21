const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')
const serverRender = require('./util/server-render.js')
const fs = require('fs')
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave: false,
  savaUninitialized: false,
  secret: 'react cnode class'
}))

// 处理小图标请求
app.use(favicon(path.join(__dirname, '../favicon.ico')))

app.use('/api/user', require('./util/handle-login'))
app.use('/api', require('./util/proxy'))

if(!isDev){
  const serverEntry = require('../dist/server-entry')
  const template = fs.readFileSync(path.join(__dirname, '../dist/server.ejs'), 'utf-8')
  // 以/public开头的判断为静态文件，映射到dist文件夹下
  app.use('/public', express.static(path.join(__dirname, '../dist')))
  app.get('*', function(req, res, next){
    serverRender(serverEntry, template, req, res).catch(next)
  })
} else {
  const devStatic = require('./util/dev.static')
  devStatic(app)
}

app.use(function (error, req, res, next) {
  console.error(error)
  res.status(500).send(error)
})

app.listen(2333, function(){
  console.log('Server is listening on port 2333!')
})
