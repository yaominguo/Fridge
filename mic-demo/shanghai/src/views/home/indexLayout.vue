<template>
  <Management class="management-layout"
    :menu="menu"
    hide-trigger
    isCollapsed
    :mode="2"
    :breadcrumb="false"
    :footer="false">
    <div slot="logo" class="logo">
      <img @click="routerTo('Portal')" src="@/assets/images/logo.png" alt="Beyond">
    </div>
    <div slot="menu" class="menu">
      <Row>
        <Col>&nbsp;</Col>
        <!-- <Col span="24">
          <div  v-for="(menuItem,menuIndex) in menuList" :key="menuIndex" @click="routeKey = menuItem.permKey" :class="menuItem.permKey == routeKey? 'route-menu active-route' :'route-menu'">
              {{menuItem.permName}}
          </div>
        </Col> -->
        <!-- <Col span="3" v-for="(menuItem,menuIndex) in menuList" :key="menuIndex">
          <div @click="toNext(menuItem.permKey)" class="route-menu">
              {{menuItem.permName}}
          </div>
        </Col> -->
      </Row>
    </div>
    <div class="profile" slot="profile">
      <img v-if="avatarImg" class="avatar" :src="avatarImg" />
      <Icon v-else type="ios-contact" size="24" />
      <span v-if="!isLogin" style="margin-left: 8px; cursor: pointer;" @click="routerTo('Login')">登录 | 注册</span>
      <Dropdown v-else @on-click="userActions">
        <a href="javascript:void(0)" style="color: #515a6e;" >
            <span v-show="isLogin!='undefined'">你好，{{isLogin}}</span>
            <Icon type="md-arrow-dropdown" />
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="person" style="textAlign: center;">
            个人中心
          </DropdownItem>
          <DropdownItem name="configurationCenter" style="textAlign: center;">
            配置中心
          </DropdownItem>
          <DropdownItem name="branchList" style="textAlign: center;">
              分店管理
          </DropdownItem>
          <DropdownItem name="staffManage" style="textAlign: center;">
              员工管理
          </DropdownItem>
          <DropdownItem name="orgFlatsList" style="textAlign: center;">
              房源分配
          </DropdownItem>
          <DropdownItem name="logout" style="textAlign: center;">
            退出登录
          </DropdownItem>
        </DropdownMenu>
    </Dropdown>
    <Dropdown v-if="storeList.length>1">
        <a href="javascript:void(0)" style="color: #515a6e;margin-left:20px;">
            <span v-if="userStore == null || userStore == ''">选择分店</span>
            <span v-else>{{userStore.storeName}}</span>
            <Icon type="md-arrow-dropdown" />
        </a>
        <DropdownMenu slot="list">
           <DropdownItem :selected="userStore !=null && (store.id == userStore.id)" v-for="(store,index) in storeList" :key="index" v-on:click.native="checkStore(store.id)">{{store.storeName}}</DropdownItem>
        </DropdownMenu>
    </Dropdown>
    <Dropdown v-if="storeList.length == 1 && (userStore == null || userStore == '') ">
        <a href="javascript:void(0)" style="color: #515a6e;margin-left:20px;">
            <span>选择分店</span>
            <Icon type="md-arrow-dropdown" />
        </a>
        <DropdownMenu slot="list">
           <DropdownItem :selected="store.id == userStore.id" v-for="(store,index) in storeList" :key="index" v-on:click.native="checkStore(store.id)">{{store.storeName}}</DropdownItem>
        </DropdownMenu>
    </Dropdown>
    </div>
    <div slot="content" class="content">
      <div>
          <ShowIndex :userStore="userStore" :storeList="storeList" :list="menuList"></ShowIndex>
      </div>
      <Loader/>
    </div>
    <div slot="footer" class="footer">
      &copy;COPYRIGHT©2019 ALL RIGHTS RESERVED | Powered by BEYONDSOFT
    </div>    
  </Management>
</template>

<script>
import { menuRouter } from '@/router/router';
import Management from './indexManagement';
import Loader from '@/components/Loader/Loader';
import ShowIndex from './index';

export default {
  name: 'Portal',
  components: {
    Management,
    Loader,
    ShowIndex
  },
  data() {
    return {
      menu: menuRouter,
      isCollapsed: true,
      menuList:[],
      routeKey:null,
      userStore:null,
      storeList:[],
    };
  },
  mounted() {
    this.getMenuTree();
    this.getInfo();
    this.queryStore();
  },
  methods: {
    // 选择分店,切换分店
      checkStore(id){
          this.$ajax.put(
              this,
              this.$api.CHOOSE_STORE.replace('{id}',id),
              {},(res)=>{
                  this.storeShow=false;
                  this.getInfo();
                  this.queryStore();
                  this.getMenuTree();
              }
          )
      },
    // 获取权限
    getMenuTree(){
        this.$ajax.get(
            this,
            // this.$api.GET_MENU_TREE+'?isTree=true',
            'http://119.28.130.217:3000/mock/154/service-permission/menu/tree',
            {},(res)=>{
                this.menuList=res.data.content;
                this.routeKey=this.$route.query.parentKey;
            }
        )
    },
    // 查询分店
    queryStore(){
        this.$ajax.get(
            this,
            this.$api.BELONG_STAFF,
            {},
            (res)=>{
                this.storeList=res.data.content;
            }
        )   
    },
    getInfo() {
      return this.$ajax.get(
        this,
        this.$api.GET_USER_INFO,
        {},
        (res) => {
          this.userStore=res.data.content.storeInfo === undefined ? null : res.data.content.storeInfo;
          this.$cookie.set('userStore',this.userStore);
          
          if(res.data.content.storeInfo == null || res.data.content.storeInfo == null){
              this.storeShow=true;
          }
          this.$store.dispatch('setUserInfo',  res.data.content);
        }
      )
    },
    // 下一步点击事件
    toNext(parentKey,childKey){
        let query={};
        if(parentKey){
            query.parentKey=parentKey;
        }
        if(childKey){
            query.childKey=childKey;
        }
        this.$router.push({
            name:'home',
            query:query
        })
    },
    branchList(name) {
        this.$router.push({
            name:'BranchList',
        })
    },
    staffManage(name) {
        this.$router.push({
            name:'StaffManage',
        });
    },
    orgFlatsList(name) {
        this.$router.push({
            name:'OrgFlatsList',
        })
    },
    userActions(name) {
      if (!name) return;
      this[name]();
    },
    funcAction(name){
      if (!name) return;
      this.routerTo(name);
    },
    logout() {
      this.$cookie.remove('token');
      this.routerTo('Login');
    },
    person() {
      this.$router.push({
        name: 'person',
      })
    },
    configurationCenter(){
      this.$router.push({
        name: 'ConfigurationCenter'
      })
    },
    routerTo(name) {
      this.$router.push({
        name:name,
      });
    },
  },
  computed: {
    isLogin() {
      if (!this.userInfo||this.userInfo==undefined) {
        return '';
      }
      return `${this.userInfo.name || this.userInfo.acctPhone || this.userInfo.username }`;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
    avatarImg() {
      const { profilePicture } = this.userInfo;
      if (profilePicture) {
        return profilePicture;
      }
      return '';
    }
  }
};
</script>

<style scoped>
.management-layout {
  width: 100%;
  height: 100%;
}
.logo{
  display: flex;
  align-items: center;
  height: 64px;
  width: 78px;
  background: #00284E;
  box-shadow: 2px 0 6px rgba(0,21,41,.35);
}
.logo:hover {
  background: rgb(0, 61, 119);
  cursor: pointer;
}
.logo > img {
  width: 36px;
  height: 36px;
  cursor: pointer;
  margin: 0 auto;
}
.header {
  height: 64px;
}
.header-title {
  height: 64px;
}
.header-menu {
  padding: 0 50px;
  height: 64px;
}
.sub-header {
  height: 48px;
  background: #efefef;
}
.content {
  /* padding-bottom: 50px; */
  /* background: url('../assets/bg.jpg') center; */
  background-size: 100%;
  min-height: 100%;
  position: relative;
}
.footer {
  font-size: 12px;
  line-height: 64px;
}
.profile {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 40px;
}
.avatar {
  width: 26px;
  height: 26px;
  margin-right: 10px;
  border-radius: 50%;
}
.route-menu{
  text-align:center;
  cursor: pointer;
  /* width: 90px; */
  padding:0px 10px;
  text-align: center;
  display: inline-block;
  position: relative;
  margin:0px 10px;
}
.route-menu:hover{
  color:#2d8cf0;
}
.active-route::after{
  content:'';
  width:100%;
  height: 2px;
  background-color: #2d8cf0;
  position: absolute;
  left: 0px;
  bottom: 0px;
}
.route-logo{
    width:60px;
    height: 60px;
}
.route-logo>img{
    width:100%;height:100%;
}  
.store-card{
    height: 120px;
    cursor: pointer;
    margin:20px 0px;
}
</style>
