import Vue from 'vue'
import Component from './func-confirm'

const ConfirmModalConstructor = Vue.extend(Component)

const closeModal = (vm) => {
  vm.visible = false
  document.body.removeChild(vm.$el)
  vm.$destroy()
}

const confirm = (options) => {
  const {title, content, ok, cancel, okBtn, cancelBtn} = options
  const instance = new ConfirmModalConstructor({
    propsData: {
      title,
      content,
      okBtn,
      cancelBtn
    }
  })
  instance.vm = instance.$mount()
  document.body.append(instance.vm.$el)
  instance.vm.visible = true

  instance.vm.$on('close', () => {
    if (cancel) {
      cancel()
    }
    closeModal(instance.vm)
  })
  instance.vm.$on('sure', () => {
    if (ok) {
      ok()
    }
    closeModal(instance.vm)
  })
}

export default confirm
