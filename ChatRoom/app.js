const wx = require('nodejs-websocket')
const server = wx.createServer((conn) => {
  conn.on('text', (str) => {
    console.log(`这里是服务端，${str}`)
  })
  setTimeout(() => {
    conn.sendText('来自服务端的消息')
  }, 5000)
}).listen(2333)