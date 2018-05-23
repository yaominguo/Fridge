const http = require('http')
const fs = require('fs')
const qs = require('querystring')
const u = require('url')

let users = {}

http.createServer((req, res) => {
  const obj = u.parse(req.url, true)
  const {pathname, query} = obj
  let str = ''
  req.on('data', (data) => {
    str += data
  })
  req.on('end', () => {
    const POST = qs.parse(str)
    const GET = query
    if (pathname == '/user') {
      // 请求接口
      switch (GET.act) {
        case 'reg':
          if (users[GET.user]) {
            res.write('{"ok": false, "msg": "已存在的用户!"}')
          } else {
            users[GET.user] = GET.pass
            res.write('{"ok": true, "msg": "注册成功！"}')
          }
          break
        case 'login':
          if (!users[GET.user]) {
            res.write('{"ok": false, "msg": "此用户不存在！"}')
          } else if (users[GET.user] !== GET.pass){
            res.write('{"ok": false, "msg": "用户名或密码有误！"}')
          } else {
            res.write('{"ok": true, "msg": "登录成功！"}')
          }
          break
        default:
          res.write('{"ok": false, "msg": "未知的act！"}')
      }
      res.end()
    } else {
      // 请求页面
      fs.readFile(`./www${pathname}`, (err, data) => {
        if (err) {
          res.write('404')
        } else {
          res.write(data)
        }
        res.end()
      })
    }
  })
}).listen(8080)