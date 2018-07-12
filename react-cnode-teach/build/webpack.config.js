const path = require('path')

module.exports = {
  // 入口文件
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  // 出口文件
  output: {
    filename: '[name].[hash].js', //这里的name是entry里的app
    path: path.join(__dirname, '../dist'),
    publicPath: '/public', //帮助我们区分url是静态资源还是api请求
  }
}