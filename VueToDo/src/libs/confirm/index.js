import ConfirmModal from './confirm.vue'
import confirm from './function'

export default (Vue) => {
  Vue.component(ConfirmModal.name, ConfirmModal)
  Vue.prototype.$confirm = confirm
}
