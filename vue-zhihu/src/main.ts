import { createApp } from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'
import App from './App.vue'

axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  store.commit('setError', { status: false })
  return config
})
axios.interceptors.response.use(
  config => {
    store.commit('setLoading', false)
    return config
  },
  err => {
    const { error } = err.response.data
    store.commit('setError', { status: true, message: error })
    store.commit('setLoading', false)
    return Promise.reject(error)
  }
)

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
