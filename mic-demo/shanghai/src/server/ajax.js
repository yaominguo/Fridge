/* axios请求封装 */
import axios from 'axios';
import qs from 'qs';
import { Message } from 'iview';
import Store from '@/store';
import Cookie from '@/local-cookie';
import router from '@/router';
import api from './api';

const CancelToken = axios.CancelToken;
const errorHandle = (err) => {
    const errStatus = (err.response && err.response.status) || (err.data && err.data.errcode);
    // console.log('---err---', errStatus, err);
    if (errStatus) {
        switch (errStatus) {
            case 451:
                Message.error('token过期，请重新登录');
                router.push({
                    name: 'Login',
                });
                break;
            case 404:
                Message.error('404: 网络请求不存在');
                break;
            case 500:
                if (err.response.data && err.response.data.code && err.response.data.code == '911') {
                    // 用refresh_token请求更新token
                    const params = {
                        grant_type: 'refresh_token',
                        client_id: 'house',
                        client_secret: 'house',
                        refresh_token: Cookie.get('refresh_token'),
                    };
                    request(
                        'login',
                        null,
                        api.GET_TOKEN,
                        params,
                        (res) => {
                            Cookie.set("token", res.access_token);
                            Cookie.set("refresh_token", res.refresh_token);
                            router.go(0);
                        },
                    );
                } else if (err.response.data && err.response.data.code && err.response.data.code == '710') {
                    Message.error(err.response.data.msg);
                } else {
                    const resMsg = err.response.data && err.response.data.msg;
                    const message = resMsg ? `(${resMsg})` : '';
                    Message.error(`500: 请求失败 ${message}`);
                }
                break;
            default:
                Message.error(err.response.data.message);
        }
    } else if (err.toString().indexOf('timeout') != -1) {
        Message.error('请求超时');
    }
};
let cancelRequest;

const ajax = axios.create({
    timeout: 15000,
});

// ajax.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// ajax.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

ajax.interceptors.request.use(
    (config) => {
        // 如果是登陆或注册请求就用x-www-form-urlencoded
        if (config.url.indexOf('/uaa/public/register') >= 0 || config.url.indexOf('/uaa/oauth/token') >= 0) {
            config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        } else {
            // 头部token
            const token = Cookie.get('token') || Store.state.token;
            if (token) {
                config.headers.Authorization = token;
            }
            config.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
        }
        return config;
    },
    err => Promise.error(err),
);

ajax.interceptors.response.use(
    (res) => {
        if (res.status === 200) {
            return Promise.resolve(res);
        }
        return Promise.reject(res);
    },
    (err) => {
        errorHandle(err);
        return Promise.reject(err);
    },
);

/**
 * 主要的请求方法封装
 * @param { String }  method  [请求方法，默认为‘get’]
 * @param { Object }  vm  [实例对象]
 * @param { String }  url [api接口]
 * @param { Object }  params  [请求参数]
 * @param { Function }  callback  [回调函数]
 */
const request = (method, vm, url, params, callback, hideLoading) => {
    if (!url || typeof url != 'string') {
        throw new Error('接口URL不正确！');
    }
    if (!params || typeof params == 'string') {
        params = {};
    }

    let config = {
        method,
        url,
        cancelToken: new CancelToken((c) => {
            cancelRequest = c;
        }),
    };

    if (method === 'get') {
        config = Object.assign(config, { params });
    } else if (method === 'login') {
        config = Object.assign(config, { data: qs.stringify(params), method: 'post' });
    } else {
        config = Object.assign(config, { data: params });
    }
    if (!hideLoading) {
        Store.dispatch('setLoading', true); // 开启loading图
    }

    return new Promise((resolve) => {
        ajax(config)
            .then((res) => {
                if (res && res.data && res.data.errcode) {
                    errorHandle(res);
                    return;
                }
                resolve(res);
                if (typeof callback === 'function') {
                    callback.call(vm, res.data);
                }
                if (!hideLoading) {
                    Store.dispatch('setLoading', false); // 关闭loading图
                }
            }).catch((err) => {
                if (!hideLoading) {
                    Store.dispatch('setLoading', false); // 关闭loading图
                }
                console.error(err);
            });
    });
}

export default {
    /**
     * 取消请求的方法，在页面中需要的地方this.$ajax.cancel()调用即可
     * @param  { String }  txt  [控制台显示的Cancel-Message]
     */
    cancel(txt) {
        if (typeof(cancelRequest) === 'function') {
            Store.dispatch('setLoading', false);
            return cancelRequest(txt);
        }
    },
    get(args) {
        return request('get', ...args);
    },

    /**
   * graphql请求方法
   * @param { String }  query  [请求体]
   * @param { Object }  variables  [参数（变量）对象集合]
   */
    gql(query, variables) {
      return ajax.post(api.BASEURL.replace('api', 'graphql'), { query, variables });
    },
    post(args) {
        return request('post', ...args);
    },
    put(args) {
        return request('put', ...args);
    },
    delete(args) {
        return request('delete', ...args);
    },
    login(args) {
        return request('login', ...args);
    },
    /**
     * 同步请求方法
     * @param { Array } functions [传入的请求方法数组（必须是ajax请求的方法）]
     */
    all(functions) {
        return Promise.all(functions);
    }
};
