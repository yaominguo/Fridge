import 'babel-polyfill'
import Vue from 'vue'
import Layout from './layout.vue'
import iView from 'iview'
import singleSpaVue from 'single-spa-vue'
import 'iview/dist/styles/iview.css'

Vue.use(iView)

Vue.config.productionTip = false
const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el: '#app',
    render: h => h('div', {attrs: {id: 'Layout'}}, [h(Layout)]),
  },
})

export const bootstrap = [
  vueLifecycles.bootstrap,
]

export const mount = [
  vueLifecycles.mount,
]

export const unmount = [
  vueLifecycles.unmount,
]
