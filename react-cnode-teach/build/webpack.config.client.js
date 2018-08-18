const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const HTMLPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = webpackMerge(baseConfig, {
  mode: 'production',
  // 入口文件
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  // 出口文件
  output: {
    filename: '[name].[hash].js', //这里的name是entry里的app
  },
  plugins: [
    // 生成html页面，同时将生成的js注入到html页面中
    new HTMLPlugin({
      template: path.join(__dirname, '../client/template.html')
    }),
    new HTMLPlugin({
      template: '!!ejs-compiled-loader!' + path.join(__dirname, '../client/server.template.ejs'),
      filename: 'server.ejs'
    })
  ]
})
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
    },
    proxy: {
      '/api': 'http://localhost:2333'
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
