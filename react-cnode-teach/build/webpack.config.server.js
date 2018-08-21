const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

module.exports = webpackMerge(baseConfig, {
  mode: 'development',
  target: 'node', //打包出来的内容是用在哪个执行环境当中的
  // 入口文件
  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
  },
  externals: Object.keys(require('../package.json').dependencies),
  // 出口文件
  output: {
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2' //规范，如amd、cmd、commonjs等
  },
})
