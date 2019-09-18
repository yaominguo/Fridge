// 整体布局文件
<template>
  <a-layout id="layout">
    <Loader />
    <a-layout-sider breakpoint="lg" collapsedWidth="0">
      <div class="logo" />
      <a-menu mode="vertical" theme="dark" style="text-align:left;">
        <a-sub-menu v-for="menu in menus" :key="menu.name">
          <span slot="title"><a-icon :type="menu.meta.icon" /><span>{{menu.meta.title}}</span></span>
          <template v-if="menu.children && menu.children.length > 0">
            <a-menu-item
              v-for="child in menu.children"
              :key="child.name"
              @click="$router.push({name: child.name})">
              {{child.meta.title}}
            </a-menu-item>
          </template>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }">
        <div style="display: flex; align-items: center;justify-content: space-between; padding: 0 1rem;">
          <NavBar />
          <div>
            <a-dropdown>
              <a href="#">
                <a-icon type="user" /> 测试用户 <a-icon type="down" />
              </a>
              <a-menu slot="overlay" @click="handleClick">
                <a-menu-item key="1">个人中心</a-menu-item>
                <a-menu-item key="2">退出登录</a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '98%' }">
          <router-view :key="$route.path"/>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import NavBar from '@/components/Navbar/navbar'
import Loader from '@/components/Loader/loader'
export default {
  name: 'Layout',
  components: {
    NavBar,
    Loader,
  },
  computed: {
    menus() {
      return this.$store.state.menuList
    }
  },
  methods: {
    handleClick({key}) {
      if (key == 1) {
        this.$router.push({name: 'person'})
      }
      if (key == 2) {
        this.$cookie.remove('token')
        this.$router.replace({name: 'login'})
      }
    }
  }
}
</script>

<style>
#layout {
  width: 100%;
  height: 100%;
}
#layout .logo {
  height: 64px;
  background: #00284e;
  width: 100%;
}
</style>
