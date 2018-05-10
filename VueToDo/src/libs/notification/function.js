import Vue from 'vue'
import Component from './func-notification'

// 创建一个构造器
const NotificationConstructor = Vue.extend(Component)

const instances = []
let seed = 1

const removeInstance = (instance) => {
  if (!instance) return
  const len = instances.length
  // 在实例数组中移除已消失的元素实例
  const index = instances.findIndex(item => instance.id === item.id)
  instances.splice(index, 1)
  if (len <= 1) return
  // 将已消失的元素上方的元素下移
  const removeHeight = instance.vm.height
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset = parseInt(instances[i].verticalOffset) - removeHeight - 16
  }
}

const notify = (options) => {
  // 有涉及DOM操作，故无法再服务端渲染
  if (Vue.prototype.$isServer) return

  // 解构传入的参数，将默认等待时间和content、btn文字参数分开
  const { defaultAutoCloseDuration, ...rest } = options
  // 借由构造器创建一个实例
  const instance = new NotificationConstructor({
    // 在new创建的实例中传递props需要用propsData
    propsData: {...rest},
    data: {
      defaultAutoCloseDuration: defaultAutoCloseDuration || 5000
    }
  })
  // 为每个实例创建一个单独的id
  const id = `notification_${seed++}`
  instance.id = id

  // 实例化，在文档之外渲染
  instance.vm = instance.$mount()
  // 将实例化的渲染的DOM元素挂载进body里
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true

  let verticalOffset = 0
  instances.forEach(item => {
    // 新通知出现在前一个通知上面，并且有16px的间隔
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)
  // 响应元素消失事件
  instance.vm.$on('closed', () => {
    removeInstance(instance)
    // 从DOM流中移除
    document.body.removeChild(instance.vm.$el)
    // 完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。
    instance.vm.$destroy()
  })
  // 响应点击关闭事件
  instance.vm.$on('close', () => {
    instance.vm.visible = false
  })
  // 这里可有可无
  return instance.vm
}

export default notify
