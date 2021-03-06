// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import {Button, Divider, Progress, Select, Option} from 'view-design'
import animate from 'animate.css'
import ajax from '@/server/ajax'
import api from '@/server/api'
import MonitorCard from '@/components/MonitorCard'
import MonitorChart from '@/components/MonitorChart'
import MonitorCount from '@/components/MonitorCount'
import MonitorFlip from '@/components/MonitorFlip'
import MonitorBrief from '@/components/MonitorBrief'
import MonitorProgress from '@/components/MonitorProgress'
import 'view-design/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$ajax = ajax
Vue.prototype.$api = api
Vue.use(animate)
Vue.use(MonitorCard)
Vue.use(MonitorCount)
Vue.use(MonitorFlip)
Vue.use(MonitorBrief)
Vue.use(MonitorProgress)
Vue.use(MonitorChart)
Vue.component('Button', Button)
Vue.component('Divider', Divider)
Vue.component('Progress', Progress)
Vue.component('Select', Select)
Vue.component('Option', Option)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
