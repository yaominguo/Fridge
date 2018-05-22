const http = require('http')
const u = require('url')
const qs = require('querystring')

http.createServer((req,res) => {
  let str = '' //非标准
  /** POST **/
  // 有一段数据到达，数据量大的时候会有多次
  req.on('data', (data) => {
    str += data
  })
  // 数据全部到达完毕，只会有一次
  req.on('end', () => {
    const obj = qs.parse(str)
    console.log('接收完毕')
  })

  /** GET **/
  // 有true才能将query解析为对象
  const obj = u.parse(req.url, true)
  console.log(obj.query)
  res.write('url parse page')
  res.end()
}).listen('8080')