/* eslint-disable */
import * as axios from 'axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

const baseURL = 'http://localhost:8080';

const service = axios.default.create({
  baseURL,
  timeout: 15000,
  maxContentLength: 4000,
});

service.interceptors.request.use((config: AxiosRequestConfig) => config, (error: any) => {
  Promise.reject(error);
});

service.interceptors.response.use((response: AxiosResponse) => {
  if (response.status !== 200) {
    console.log('请求错误');
    return false;
  }
  return response.data;
}, (error: any) => Promise.reject(error));

export default service;
