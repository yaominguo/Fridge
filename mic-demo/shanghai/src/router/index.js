import Vue from 'vue';
import VueRouter from 'vue-router';
import { routers } from './router';
import Cookies from 'js-cookie';
import server from '../server';

Vue.use(VueRouter);
const RouterConfig = {
    mode: 'history',
    base: '/shanghai/',
    routes: routers
};

const router = new VueRouter(RouterConfig);

// router.beforeEach((to, from, next) => {
//     // server.cancel(); // 路由切换则终止当前页面的请求
//     let token = Cookies.get("token");
//     // let store = Cookies.get('userStore'); //判断是否选择分店
//     if (to.path !== '/login' && !token) {
//         next("/login");
//     } else {
//         next();
//         // if (to.path == '/index' || (store != null && store != '')) {
//         //     next();
//         // } else {
//         //     next("/index")
//         // }
//     }
// });
export default router;
