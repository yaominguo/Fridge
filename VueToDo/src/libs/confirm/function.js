import Vue from 'vue'
import Component from './func-confirm'

const ConfirmModalConstructor = Vue.extend(Component)

const confirm = (options) => {
  const {title, content} = options
  const instance = new ConfirmModalConstructor({
    propsData: {
      title,
      content
    }
  })
  instance.vm = instance.$mount()
  document.body.append(instance.vm.$el)
  instance.vm.visible = true
}

export default confirm
