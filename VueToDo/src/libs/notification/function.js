import Vue from 'vue'
import Component from './func-notification'

const NotificationConstructor = Vue.extend(Component)

const instances = []
let seed = 1

const notify = (options) => {
  // 有涉及DOM操作，故无法再服务端渲染
  if (Vue.prototype.$isServer) return

  const { defaultAutoCloseDuration, ...rest } = options
  const instance = new NotificationConstructor({
    propsData: {...rest},
    data: {
      defaultAutoCloseDuration: defaultAutoCloseDuration || 3000
    }
  })

  const id = `notification_${seed++}`
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)

  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)
  return instance.vm
}

export default notify
