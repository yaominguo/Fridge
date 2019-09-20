// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import VueRouter from 'vue-router';
import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import App from './App';
import router from './router';
import store from './store';
import server from './server';
import api from './server/api';
import cookie from './local-cookie';
import CommonMethod from '@/components/Helper/CommonMethod/common.js';
import BtnPermissionCheck from '@/btn-permission/btn-permission-check.js';
import singleSpaVue from 'single-spa-vue';
import './assets/styles/default.css';

Vue.config.productionTip = false;
Vue.prototype.$ajax = server;
Vue.prototype.$api = api;
Vue.prototype.$cookie = cookie;
Vue.prototype.$com = CommonMethod;
Vue.use(iView);

let vueLifecycles = null
if (!window.isSpa) {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
  });
} else {
  vueLifecycles = singleSpaVue({
    Vue,
    appOptions: {
      el: '#content',
      router: router,
      store: store,
      render: h => h('div', {attrs: {id: 'content'}}, [h(App)]),
    },
  })
}
export const bootstrap = [
  vueLifecycles ? vueLifecycles.bootstrap : null,
];

export const mount = [
  vueLifecycles ? vueLifecycles.mount : null,
];

export const unmount = [
  vueLifecycles ? vueLifecycles.unmount : null,
];
