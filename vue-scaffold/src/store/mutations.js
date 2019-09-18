export default {
  SET_LOADING(state, data) {
    state.showLoading = data
  },
  SET_MENU(state, {menu, codeList, isAllPerm}) {
    state.menuList = JSON.parse(JSON.stringify(menu)) // 保存菜单
    state.permissionCodeList = codeList // 保存权限code数组
    state.hasAllRight = isAllPerm // 保存是否拥有全部权限
  },
}
