const path = require('path')

module.exports = {
  target: 'node', //打包出来的内容是用在哪个执行环境当中的
  // 入口文件
  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
  },
  // 出口文件
  output: {
    filename: 'server-entry.js', 
    path: path.join(__dirname, '../dist'),
    publicPath: '/public', //帮助我们区分url是静态资源还是api请求
    libraryTarget: 'commonjs2' //规范，如amd、cmd、commonjs等
  },
  module: {
    rules: [
      {
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  }
}