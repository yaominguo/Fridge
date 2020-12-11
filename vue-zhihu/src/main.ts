import { createApp } from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'
import App from './App.vue'

axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  return config
})
axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
})

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
