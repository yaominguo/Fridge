import Notification from './notification.vue'
import notify from './function'

export default (Vue) => {
  // 注册一个全局组件
  Vue.component(Notification.name, Notification)
  // 在Vue的原型方法中加入notify
  Vue.prototype.$notify = notify
}
