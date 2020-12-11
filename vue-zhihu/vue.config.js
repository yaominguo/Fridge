module.exports = {
  outputDir: 'dist', //build输出目录
  assetsDir: 'assets', //静态资源目录（js, css, img）
  devServer: {
    proxy: {
      '/mock': {
        target: 'http://api.vikingship.xyz', //API服务器的地址
        ws: true, //代理websockets
        changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
        pathRewrite: {
          // 重写路径: 当检测到请求地址里包含 /v1 时,将此路径进行跨域代理操作
          '^/mock': ''
        }
      }
    }
  }
}
