import routeList from '@/router/route-list'

export const permission = {
  methods: {
    getInfo() {
      this.$ajax.get({
        url: '/static/permission.json',
      }).then(res => {
        const {isAllPerm} = res // 是否有全部权限
        this.getPermission(isAllPerm)
      })
    },
    getPermission(isAllPerm) {
      if (this.$store.state.menuList && this.$store.state.menuList.length > 0) return // 如果有菜单了就不重复获取了（除非刷新）
      const parentMenus = ['1', '2', '3', '4'] //一级菜单码
      let menu = [], codeList = []
      if (isAllPerm) { //有全部权限
        parentMenus.forEach(parent => {
          const parentMenu = routeList[parent], subMenu = []
          parentMenu.meta.subMenus.forEach(code => {
            subMenu.push(routeList[code])
          })
          parentMenu.children = subMenu
          menu.push(parentMenu)
        })
        this.$router.addRoutes(menu)
        this.$router.options.routes.push(menu) // this.$router不是响应式的，所以手动将路由元注入路由对象
        this.$store.commit('SET_MENU', {menu, codeList, isAllPerm})
      } else { // 否则请求权限code列表
        this.$ajax.get({
          url: '/static/permission-code.json',
        }).then(res => {
          codeList = res.codes
          if (codeList.length <= 0) return
          parentMenus.forEach(parent => {
            if (codeList.indexOf(parent) >= 0) {
              const parentMenu = routeList[parent], subMenu = []
              parentMenu.meta.subMenus.forEach(code => {
                if (codeList.indexOf(code) >= 0) {
                  subMenu.push(routeList[code])
                }
              })
              parentMenu.children = subMenu
              menu.push(parentMenu)
            }
          })
          this.$router.addRoutes(menu)
          this.$router.options.routes.push(menu) // this.$router不是响应式的，所以手动将路由元注入路由对象
          this.$store.commit('SET_MENU', {menu, codeList, isAllPerm})
        })
      }
    },
  },
}
