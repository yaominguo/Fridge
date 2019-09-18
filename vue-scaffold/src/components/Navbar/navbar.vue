<template>
  <div class="header">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="item in list" :key="item.name">
        <router-link v-if="checkPath(item.path)" :to="item.path">{{item.name}}</router-link>
        <span v-else>{{item.name}}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
// 不够严谨，临时制造，需要改进

export default {
  name: 'NavBar',
  data() {
    return {
      list: [],
    }
  },
  mounted() {
    let list = this.$cookie.get('NavbarList')
    if (list && list.length > 0) {
      list = JSON.parse(list)
      if (this.$route.path != list[list.length - 1].path) {
        this.list = [{name: '首页', path: '/'}]
        return
      }
      this.list = list
    }
  },
  methods: {
    checkPath(path) {
      return this.list[0].path === path
    },
  },
  watch: {
    $route(to, from) {
      const filter = (item) => {
        return item.path == to.path
      }
      const index = this.list.findIndex(filter)
      if (index >= 0) {
        this.list = this.list.slice(0, index + 1)
      } else {
        if (to.matched[1].parent.path) {
          this.list = [{
            name: to.matched[1].parent.meta.title,
            path: to.matched[1].parent.path
          }]
        }
        if(this.$route.meta.title){
          this.list.push({
            name: this.$route.meta.title,
            path: this.$route.path,
          })
        }
        if (to.path.indexOf('home') >= 0) {
          this.list = [{name: '首页', path: '/'}]
        }
      }
      if (to.path.indexOf('home') < 0) {
        this.list.unshift({name: '首页', path: '/'})
      }
      if (to.path.indexOf('person') >= 0) {
        this.list = [{name: '首页', path: '/'}, {name: '个人中心', path: '/person'}]
      }
      const NavbarList = JSON.stringify(this.list)
      this.$cookie.set('NavbarList', NavbarList)
    }
  },
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  height: 100%;
}
</style>

