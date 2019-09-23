import 'babel-polyfill'
import {registerApplication, start} from 'single-spa'
import axios from 'axios'
import fetchInject from 'fetch-inject';


(async function loadApp(){
  window.isSpa = true
  await registerApplication('layout', () => import('@/components/layout/index.js'), () => true)

  // await loadResource('/api')
  // await loadResource('http://127.0.0.1:2333')
  // registerApplication('management', () => Promise.resolve(window['mic:management']), pathPrefix('/management'))

  // await loadResource('/shanghai')
  Promise.resolve(loadResource('/shanghai')).then(() => {
    registerApplication('shanghai', () =>  Promise.resolve(window['mic:shanghai']), pathPrefix('/shanghai'))
  })
})()

start()

async function loadResource(url) {
  const res = await axios.get(url + '/index.html')
  const html = res.data, base = url + '/static/',
    css = html.match(/css\/app.*?\.css/gi),
    manifest = html.match(/js\/manifest.*?\.js/gi),
    vendor = html.match(/js\/vendor.*?\.js/gi),
    app = html.match(/js\/app.*?\.js/gi)

  if (IEVersion() == -1) { // 非ie浏览器
    await fetchInject([ // 优先注入,避免‘call’ of undefined的错误
      base + manifest[0],
      base + vendor[0],
    ])
    await fetchInject([ // app.js需要在manifest和vendor之后注入
      base + app[0],
      base + css[0],
    ])
  } else { // ie环境
    let a = document.createElement('script')
    a.innerHTML = (await axios.get(base + manifest[0])).data
    document.head.appendChild(a)
    let b = document.createElement('script')
    b.innerHTML = (await axios.get(base + vendor[0])).data
    document.head.appendChild(b)
    let c = document.createElement('script')
    c.innerHTML = (await axios.get(base + app[0])).data
    document.head.appendChild(c)
    let d = document.createElement('style')
    d.innerHTML = (await axios.get(base + css[0])).data
    document.head.appendChild(d)
  }
}

function pathPrefix(prefix) {
  return function(location) {
    return location.pathname.indexOf(`${prefix}`) >= 0
  }
}
 /**
   * 判断是否是ie并返回版本号
   */
function IEVersion() {
  const userAgent = navigator.userAgent //取得浏览器的userAgent字符串
  const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 //判断是否IE<11浏览器
  const isEdge = userAgent.indexOf('Edge') > -1 && !isIE //判断是否IE的Edge浏览器
  const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
  if(isIE) {
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    const fIEVersion = parseFloat(RegExp['$1'])
    if(fIEVersion == 7) {
      return 7
    } else if(fIEVersion == 8) {
      return 8
    } else if(fIEVersion == 9) {
      return 9
    } else if(fIEVersion == 10) {
      return 10
    } else {
      return 6//IE版本<=7
    }
  } else if(isEdge) {
    return 'edge'//edge
  } else if(isIE11) {
    return 11 //IE11
  }else{
    return -1//不是ie浏览器
  }
}
