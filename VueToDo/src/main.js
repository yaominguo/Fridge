// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import createStore from './store/store'
import Notification from './libs/notification'
import Tabs from './libs/tabs'
import './assets/styles/global.styl'
Vue.config.productionTip = false
Vue.use(Notification)
Vue.use(Tabs)
Vue.use(Vuex)

const store = createStore()

/* eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  store,
  // components: { App },
  // template: '<App/>'
  render: (h) => h(App)
}).$mount('#app')
