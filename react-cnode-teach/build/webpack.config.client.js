const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  mode: 'production',
  // 入口文件
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  // 出口文件
  output: {
    filename: '[name].[hash].js', //这里的name是entry里的app
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/', //帮助我们区分url是静态资源还是api请求
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      },
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
    new HTMLPlugin({
      template: path.join(__dirname, '../client/template.html')
    })
  ]
}
if(isDev){
  config.mode = 'development'
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0', //这样可以支持localhost或ip地址的方式访问
    port: '8888',
    contentBase: path.join(__dirname, '../dist'),
    hot: true,
    overlay: { //报错弹窗更明显
      errors: true
    },
    publicPath: '/public', //前面需要加/public才能访问到生成的静态文件
    historyApiFallback: {
      index: '/public/index.html'   //所有404的请求全部返回到这个html
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config