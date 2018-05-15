import Vue from 'vue'
import Component from './func-confirm'

const ConfirmModalConstructor = Vue.extend(Component)

const confirm = (options) => {
  const {title, content, ok, cancel} = options
  const instance = new ConfirmModalConstructor({
    propsData: {
      title,
      content
    }
  })
  instance.vm = instance.$mount()
  document.body.append(instance.vm.$el)
  instance.vm.visible = true

  instance.vm.$on('close', () => {
    if (cancel) {
      cancel()
    }
    instance.vm.visible = false
  })
  instance.vm.$on('sure', () => {
    if (ok) {
      ok()
    }
    instance.vm.visible = false
  })
}

export default confirm
