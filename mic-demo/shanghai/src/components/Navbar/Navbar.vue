<template>
  <div class="header">
    <Breadcrumb>
      <BreadcrumbItem v-for="(item, i) in list" :key="item.name" :to="i == 0 ? null : item.path">{{item.name}}</BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    home: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      list: [],
    }
  },
  mounted() {
    let list = this.$cookie.get('NavbarList');
    if (list && list.length > 0) {
      this.list = JSON.parse(list);
    }
  },
  watch: {
    home(cur, past) {
      if (cur === past) return;
      if (!cur) {
        this.list[0] = {name: '首页', path: '/home'};
      } else {
        this.list[0] = cur;
      }
    },
    // $route(to, from) {
    //   const filter = (item) => {
    //       return item.path == to.path;
    //   }
    //   const index = this.list.findIndex(filter);
    //   if (index >= 0) {
    //     this.list = this.list.slice(0, index + 1);
    //   } else {
    //     if (to.matched[1].parent.path || to.meta.title == '个人中心' || to.meta.title == '配置中心') {
    //       this.list = this.list.slice(0, 1);
    //     }
    //     if(this.$route.meta.title){
    //       this.list.push({
    //         name: this.$route.meta.title,
    //         path: this.$route.path,
    //       })
    //     }

    //   }
    //   const NavbarList = JSON.stringify(this.list);
    //   this.$cookie.set('NavbarList', NavbarList);
    // },
    $route(to, from) {
      const filter = (item) => {
        return item.path == to.path;
      }
      const index = this.list.findIndex(filter);
      if (index >= 0) {
        this.list = this.list.slice(0, index + 1);
      } else {
        if (to.matched[1].parent.path) {
          this.list = [{
            name: to.matched[1].parent.meta.title,
            path: to.matched[1].parent.path
          }];
        }
        if(this.$route.meta.title){
          this.list.push({
            name: this.$route.meta.title,
            path: this.$route.path,
          })
        }
        if (to.path.indexOf('home') >= 0) {
          this.list = [{name: '首页'}];
        }
      }

      const NavbarList = JSON.stringify(this.list);
      this.$cookie.set('NavbarList', NavbarList);
    }
  },
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  /* position: sticky; */
  /* top: -30px; */
  /* z-index: 6; */

  /* background: #fff;
  height: 40px;
  margin: -10px 0 10px;
  padding: 0 16px;
  border: 1px solid #e8eaec; */
}
</style>

