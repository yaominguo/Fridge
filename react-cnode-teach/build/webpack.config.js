const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口文件
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  // 出口文件
  output: {
    filename: '[name].[hash].js', //这里的name是entry里的app
    path: path.join(__dirname, '../dist'),
    publicPath: '', //帮助我们区分url是静态资源还是api请求
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
  },
  plugins: [
    // 生成html页面，同时将生成的js注入到html页面中
    new HTMLPlugin()
  ]
}