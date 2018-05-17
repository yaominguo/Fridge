const wx = require('nodejs-websocket')
const server = wx.createServer((conn) => {
  conn.on('text', (str) => {
    console.log(`这里是服务端，收到来自客户端的信息为：${str}`)
    // conn.sendText(str)
    // boardCast(str)
    const data = JSON.parse(str)
    switch (data.type) {
      case 'setname':
        conn.nickname = data.name
        boardCast(JSON.stringify({
          name: 'Server',
          text: `${data.name} 加入了房间`
        }))
        break
      case 'chat':
        boardCast(JSON.stringify({
          name: conn.nickname,
          text: data.text,
        }))
        break
      default:
        break
    }
  })
  conn.on('close', () => {
    boardCast(`${conn.nickname} 离开了房间`)
  })
  conn.on('error', (err) => {
    console.log(err)
  })
}).listen(2333)

function boardCast (str) {
  server.connections.forEach(conn => {
    conn.sendText(str)
  })
}