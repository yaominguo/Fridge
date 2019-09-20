 import Vue from 'vue';

const BtnPermissionCheck = Vue.directive('permission', {
  bind: function (el, binding, vnode) {
    if (!Vue.prototype.$_hasPermission(binding.value, vnode)) {
      const comment = document.createComment(' ');
      Object.defineProperty(comment, 'setAttribute', {
        value: () => undefined,
      });
      vnode.elm = comment;
      vnode.text = ' ';
      vnode.isComment = true;
      vnode.context = undefined;
      vnode.tag = undefined;
      vnode.data.directives = undefined;

      if (vnode.componentInstance) {
        vnode.componentInstance.$el = comment;
      }
      if (el.parentNode) {
        el.parentNode.replaceChild(comment, el);
      }
    }
  }
});
Vue.prototype.$_hasPermission = function (value, vnode) {
  let isExist = false;
  // 获取用户按钮权限
  const btnPermissionsArr = vnode.context.$route.meta.btnPermission;
  if (!btnPermissionsArr || btnPermissionsArr.length<=0) {
    return false;
  }
  if (btnPermissionsArr.indexOf(value) >= 0) {
    isExist = true;
  }
  return isExist;
};
export default BtnPermissionCheck;
