import Vue from 'vue'
import Router from 'vue-router'
import {routes} from './routes'
import Cookie from '@/util/local-cookie'

Vue.use(Router)

const config = {
  mode: 'history',
  routes,
}
const router = new Router(config)

router.beforeEach((to, from, next) => {
  const token = Cookie.get('token')
  // 当前无token且不在login页面则推到登录页面
  if (to.path != '/login' && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
