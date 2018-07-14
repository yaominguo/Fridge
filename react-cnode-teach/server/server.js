const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const serverEntry = require('../dist/server-entry').default

/**require出来的serverEntry是这样的，不像import会返回default的部分 */
// { __esModule: true,
//   default:
//    { '$$typeof': Symbol(react.element),
//      type: [Function: t],
//      key: null,
//      ref: null,
//      props: {},
//      _owner: null 
//     } 
// }

const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
const app = express()

// 以/public开头的判断为静态文件，映射到dist文件夹下
app.use('/public', express.static(path.join(__dirname, '../dist')))


app.get('*', function(req, res){
  // 服务端渲染
  const appString = ReactSSR.renderToString(serverEntry)
  const htmlBody = template.replace('<!-- app -->', appString)
  res.send(htmlBody)
}) 

app.listen(2333, function(){
  console.log('Server is listening on port 2333!')
})