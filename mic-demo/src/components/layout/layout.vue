<template>
  <Layout style="height:100%;">
    <Sider style="height: 100%;"  ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
      <Header :style="{padding: 0}">
        <h1 style="color: #fff;textAlign:center;">Total</h1>
      </Header>
      <Menu @on-select="navigateTo" style="height: 100%;" theme="dark" width="auto" :class="MenuItemClasses">
        <menu-item name="/management">
          <Icon type="ios-search"></Icon>
          <span>Zhongbang</span>
        </menu-item>
        <menu-item name="/management/basic/community-management">
          <Icon type="ios-search"></Icon>
          <span>test</span>
        </menu-item>
        <menu-item name="/shanghai">
          <Icon type="ios-settings"></Icon>
          <span>Shanghai</span>
        </menu-item>
      </Menu>
    </Sider>
    <Layout style="height: 100%;">
      <Header :style="{padding: 0, zIndex: 10}" class="layout-header-bar">
        <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
      </Header>
      <Content :style="{padding: '20px', overflowY: 'auto', height: '100%'}">
        <div id="content"></div>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import {navigateToUrl} from 'single-spa'
export default {
  data () {
    return {
      isCollapsed: false
    }
  },
  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ]
    },
    MenuItemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  methods: {
    navigateTo(url) {
      navigateToUrl(url)
    },
    collapsedSider () {
      this.$refs.side1.toggleCollapse()
    }
  }
}
</script>

<style scoped>
  .layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .menu-icon{
    transition: all .3s;
  }
  .rotate-icon{
    transform: rotate(-90deg);
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
</style>
