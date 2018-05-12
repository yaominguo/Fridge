import Vue from 'vue'
import Router from 'vue-router'
import TodoApp from '@/todo/TodoApp'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    // 保存滚动行为
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: [
    {
      path: '/',
      redirect: '/app'
    },
    {
      path: '/app',
      name: 'TodoApp',
      component: TodoApp,
      // SEO优化
      meta: {
        title: 'This is app',
        description: 'This is todo app with Vue'
      }
    }
  ]
})
