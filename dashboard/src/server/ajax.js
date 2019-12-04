import axios from 'axios'
import qs from 'qs'
import api from './api'

const Axios = axios.create({
  baseURL: api.BASE_URL,
  timeout: 50000,
})
Axios.interceptors.request.use(config => {
  // 启动loading，添加token
  // config.headers.Authorization = token
  return config
}, error => {
  return Promise.reject(error)
})

Axios.interceptors.response.use(response => {
  // TODO 返回的数据status判断错误操作等……
  return response.data
}, error => {
  return Promise.resolve(error.response)
})

export default {
  post(url, data) {
    return Axios({
      method: 'POST',
      url,
      data: qs.stringify(data),
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
    }).then(res => res)
  },
  get(url, params) {
    return Axios({
      method: 'GET',
      url,
      params, // get 请求时带的参数
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8',
      }
    }).then(res => res)
  }
}
