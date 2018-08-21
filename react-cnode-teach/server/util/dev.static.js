const axios = require('axios')
const path = require('path')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const serialize = require('serialize-javascript')
const ejs = require('ejs')
const asyncBootstrap = require('react-async-bootstrapper')
const ReactSSR = require('react-dom/server')
const Helmet = require('react-helmet').default

const serverConfig = require('../../build/webpack.config.server')

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/server.ejs')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

// const Module = module.constructor
const NativeModule = require('module')
const vm = require('vm')
const getModuleFromString = (bundle, filename) => {
  const m = {exports: {}}
  const wrapper = NativeModule.wrap(bundle)
  const script = new vm.Script(wrapper, {
    filename: filename,
    displayErrors: true,
  })
  const result = script.runInThisContext()
  result.call(m.exports, m.exports, require, m)
  return m
}
const mfs = new MemoryFs
const serverCompiler = webpack(serverConfig)
//fs是在硬盘上读写，mfs是内存上读写，速度会比较快
serverCompiler.outputFileSystem = mfs
let serverBundle, createStoreMap

// 监听server-entry里依赖的文件是否有变化, 每次有更新就更新serverBundle
serverCompiler.watch({}, (err, stats) => {
  if(err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(serverConfig.output.path, serverConfig.output.filename)
  const bundle = mfs.readFileSync(bundlePath, 'utf-8') //读出来是string，不是模块
  // const m = new Module()
  // m._compile(bundle, 'server-entry.js') //用module解析string的内容生成新的模块,记得指定文件名
  const m = getModuleFromString(bundle, 'server-entry.js')
  serverBundle = m.exports.default
  createStoreMap = m.exports.createStoreMap
})

const getStoreState = (stores) => (
  Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
)

module.exports = function(app){
  /**
   * 这里没法像server.js里用express.static处理静态文件
   * 因为这里没有静态文件夹生成，都是在内存里面
   */
  //因为客户端的js都在webpack-dev-server里面存储
  //把静态文件全部代理到webpack-dev-server的服务上面
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }))
  app.get('*', function(req, res){
    getTemplate().then(template => {
      const routerContext = {}
      const stores = createStoreMap()
      const app = serverBundle(stores, routerContext, req.url)

      asyncBootstrap(app).then(() => {
        if (routerContext.url) {
          res.status(302).setHeader('Location', routerContext.url)
          res.end()
          return
        }
        const helmet = Helmet.rewind()
        const state = getStoreState(stores)
        const content = ReactSSR.renderToString(app)
        // res.send(template.replace('<!-- app -->', content))
        const html = ejs.render(template, {
          appString: content,
          initialState: serialize(state),
          meta: helmet.meta.toString(),
          title: helmet.title.toString(),
          style: helmet.style.toString(),
          link: helmet.link.toString(),
        })
        res.send(html)
      })
    })
  })
}
