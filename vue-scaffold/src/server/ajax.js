import axios from 'axios'
import qs from 'qs'
import api from './api'
import Store from '@/store'
import Cookie from '@/util/local-cookie'
import router from '@/router'
import {message} from 'ant-design-vue'

// 配置请求的根域名和超时时间
const Axios = axios.create({
  baseURL: api.BASE_URL,
  timeout: 15000,
})
const CancelToken = axios.CancelToken
let cancelRequest = null

// 根据报错的状态码进行错误处理
const errorHandler = (err) => {
  const errStatus = (err.response && err.response.status) || (err.data && err.data.errcode)
  if (errStatus) {
    switch (errStatus) {
    case 451:
      // token过期则推到登录页面
      message.error('token过期，请重新登录')
      router.push({
        name: 'login',
      })
      break
    case 404:
      message.error('网络请求不存在')
      break
    case 500:
      const code = err.response.data && err.response.data.code
      if (code == 911) {
        // refresh token过期则重新获取token或refresh token并刷新页面
        const params = {
          grant_type: 'refresh_token',
          client_id: 'house',
          client_secret: 'house',
          refresh_token: Cookie.get('refresh_token'),
        }
        request({
          method: 'POST',
          url: api.GET_TOKEN,
          params,
          contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        }).then(res => {
          Cookie.set('token', res.access_token)
          Cookie.set('refresh_token', res.refresh_token)
          router.go(0)
        })
      } else if (code == 710) {
        message.error(err.response.data.msg)
      } else {
        const resMsg = err.response.data && err.response.data.msg
        console.error(resMsg)
        message.error('500: 请求失败')
      }
      break
    default:
      message.error(err.response.data.message)
    }
  }else if (err.toString().indexOf('timeout') != -1) {
    Message.error('请求超时')
  } else if (err.toString().indexOf('Network Error') != -1) {
    Message.error('网络连接中断')
  }
}

Axios.interceptors.request.use(config => {
  const token = Cookie.get('token') || Store.state.token
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, error => {
  return Promise.reject(error)
})

Axios.interceptors.response.use(response => {
  return response.data
}, error => {
  errorHandler(error)
  return error
})

/**
 * 请求
 * @param {String} method [请求方法]
 * @param {String} url [请求地址]
 * @param {Object} params [请求参数]
 * @param {String} contentType [请求头，默认为'application/json;charset=UTF-8']
 * @param {Boolean} hideLoading [隐藏请求时的loading图，默认为false]
 */
const request = ({method, url, params, contentType = 'application/json;charset=UTF-8', hideLoading = false}) => {
  if (!url || typeof(url) != 'string') {
    throw new Error('接口URL不正确')
  }
  if (!params || typeof(params) == 'string' || typeof(params) == 'number') {
    params = {}
  }
  let config = {
    method,
    url,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': contentType,
    },
    cancelToken: new CancelToken((c) => {
      cancelRequest = c
    }),
  }
  if (method === 'GET') {
    config = Object.assign(config, {params})
  } else {
    if (contentType.toLowerCase().indexOf('x-www-form-urlencoded') >= 0) {
      config = Object.assign(config, {data: qs.stringify(params)})
    } else {
      config = Object.assign(config, {data: params})
    }
  }
  if (!hideLoading) {
    Store.commit('SET_LOADING', true)
  }

  return new Promise((resolve, reject) => {
    Axios(config)
      .then(res => {
        resolve(res)
        Store.commit('SET_LOADING', false)
      }).catch(err => {
        reject(err)
        Store.commit('SET_LOADING', false)
      })
  })
}

export default {
  /**
 * 取消请求
 * @param {String} txt [取消请求时需要显示在控制台的提示信息]
 */
  cancel(txt = '取消请求') {
    Store.commit('SET_LOADING', false)
    if (typeof(cancelRequest) === 'function') {
      return cancelRequest(txt)
    }
  },
  get(args) {
    return request({method: 'GET', ...args})
  },
  post(args) {
    return request({method: 'POST', ...args})
  },
  put(args) {
    return request({method: 'PUT', ...args})
  },
  delete(args) {
    return request({method: 'DELETE', ...args})
  },
  all(...ajaxs) {
    return Promise.all(ajaxs)
  },
}
