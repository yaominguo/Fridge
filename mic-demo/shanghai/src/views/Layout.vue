<template>
  <Management class="management-layout"
    hide-trigger
    isCollapsed
    :mode="2"
    :logoSpan="3"
    :breadcrumb="false"
    :footer="false">
    <Guide slot="other"/>
    <div slot="logo" class="logo">
      <img @click="toHome" src="@/assets/images/logo.png" alt="Beyond">
    </div>
    <div slot="menu">
      <Navbar :home="home"/>
    </div>
    <!-- <div slot="menu">
      <Menu @on-select="handleMenuSelect" :active-name="curTopMenu" mode="horizontal" id="topMenuBar">
        <div v-for="item in menuList" :key="item.id">
          <Submenu v-if="item.children && item.children.length>0" :name="item.id">
            <template slot="title">{{item.name}}</template>
            <MenuGroup>
              <MenuItem v-for="sub in item.children" :key="sub.id" :name="sub.id">
              {{sub.name}}
              </MenuItem>
            </MenuGroup>
          </Submenu>
          <MenuItem v-else :name="item.id">
            {{item.name}}
          </MenuItem>
        </div>
      </Menu>
    </div> -->
    <div class="profile" slot="profile">
      <Dropdown id="fastBtn" trigger="hover" style="margin-right: 10%"  @on-click="funcAction">
        <a href="javascript:void(0)">
           <Icon type="ios-add-circle-outline" size="22" />
        </a>
        <DropdownMenu slot="list">
            <DropdownItem name="house/quicklyAddRoom">
              房源录入
            </DropdownItem>
            <DropdownItem name="contract/tenant-register-more">
                租客登记
            </DropdownItem>
           <!--  <DropdownItem name="account/list">
               添加账单
            </DropdownItem> -->
            <DropdownItem name="accounting/notes">
               记笔账
              </DropdownItem>
        </DropdownMenu>
    </Dropdown>
    <Avatar v-if="userInfo.profilePicture" class="avatar" :src="userInfo.profilePicture" />
    <Avatar v-else icon="ios-contact" class="avatar"/>
    <span v-if="!isLogin" style="margin-left: 8px; cursor: pointer;" @click="routerTo('Login')">登录 | 注册</span>
    <Dropdown v-else @on-click="userActions" transfer>
      <a href="javascript:void(0)" style="color: #515a6e;">
          <span v-show="isLogin!='undefined'">你好，{{isLogin}}</span>
          <Icon type="md-arrow-dropdown" />
      </a>
      <DropdownMenu slot="list">
        <DropdownItem name="person">
          个人中心
        </DropdownItem>
        <!-- <DropdownItem name="configurationCenter">
          配置中心
        </DropdownItem>
        <DropdownItem name="authorityCenter">
          权限中心
        </DropdownItem> -->
        <DropdownItem name="logout">
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
           <DropdownItem v-for="(store,index) in storeList" :key="index" :selected="userStore !=null && (store.id == userStore.id)"   v-on:click.native="checkStore(store.id)">{{store.storeName}}</DropdownItem>
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
    <div slot="content" class="content" :style="fireFoxStyle">
      <!-- <Navbar :home="home"/> -->
      <router-view :key="$route.path"></router-view>
      <Loader/>
    </div>
    <div slot="footer" class="footer">
      &copy;COPYRIGHT©2019 ALL RIGHTS RESERVED | Powered by BEYONDSOFT
    </div>
    <div slot="other">
      <Modal v-model="storeShow"
        :mask-closable="false"
        :closable="false"
    >
        <div slot="header" style="font-weight:700">
            请选择分店
        </div>
        <Row :gutter="20">
            <Col span="8" v-for="(store,index) in storeList" :key="index">
                <Card class="store-card" v-on:click.native="checkStore(store.id)">
                    <div style="text-align:center;">
                        <img  :src="store.pic" class="route-logo" alt="">
                        <div>{{store.storeName}}</div>
                    </div>
                </Card>
            </Col>
        </Row>
        <div slot="footer"></div>
    </Modal>
    </div>
  </Management>
</template>

<script>
// import { menuRouter } from '@/router/router';
import Management from '@/components/Layout/Management';
// import Navigation from '@/components/Layout/Navigation';
import Loader from '@/components/Loader/Loader';
import Navbar from '@/components/Navbar/Navbar';
// import TopMenu from '@/components/Layout/TopMenu';
import Guide from '@/views/Guide';

export default {
  name: 'Portal',
  components: {
    Management,
    // Navigation,
    Loader,
    Navbar,
    // TopMenu,
    Guide,
  },
  data() {
    return {
      // menu: menuRouter,
      isCollapsed: true,
      menuList:[
        {name: '资产', id: 'assetRouter'},
        {name: '公租房', id: 'publicRouter'},
        {name: '住房租赁', id: '2', children: [
          {name: '国有公房', id: 'stateHouseRouter'},
          {name: '人才公寓', id: 'apartmentRouter'},
          {name: '普通住房', id: 'normalHouseRouter'},
        ]},
        {name: '非居租赁', id: '3', children: [
          {name: '商铺', id: 'shopRouter'},
          {name: '商务办公', id: 'officeRouter'},
        ]},
        {name: '物业服务', id: 'serviceRouter'},
        {name: '财务', id: 'financeRouter'},
      ],
      home: {},
      model: {
        assetRouter: {
          name: '资产首页',
          path: '/asset-home',
        },
        publicRouter: {
          name: '公租房首页',
          path: '/public-home',
        },
        authorityRouter: {
          name: '权限中心首页',
          path: '/authority-home',
        },
        normalHouseRouter: {
          name: '普通住房首页',
          path: '/normal-home',
        },
        stateHouseRouter: {
          name: '国有公房首页',
          path: '/state-home',
        },
        apartmentRouter: {
          name: '人才公寓首页',
          path: '/apartment-home',
        },
        shopRouter: {
          name: '商铺首页',
          path: '/shop-home',
        },
        officeRouter: {
          name: '商务办公首页',
          path: '/office-home',
        },
      },
      routeKey:null,
      userStore:null,
      storeList:[],
      storeShow:false,
      curTopMenu: null,
    };
  },
  mounted() {
    // this.getMenuTree();
    this.getInfo();
    this.queryStore();
    // this.curTopMenu = this.$cookie.get('curTopMenuName');
    // if (!this.curTopMenu) {
    //   this.handleMenuSelect('assetRouter');
    //   return;
    // }
    // this.$store.dispatch('setMenu', this.curTopMenu);
    this.$store.dispatch('setMenu');
  },
  methods: {
    // handleMenuSelect(name) {
    //   // let houseIds=[
    //   //   {
    //   //     name:'publicRouter',
    //   //     key:'0'
    //   //   },
    //   //   {
    //   //     name:'stateHouseRouter',
    //   //     key:'1'
    //   //   },
    //   //   {
    //   //     name:'apartmentRouter',
    //   //     key:'2'
    //   //   },
    //   //   {
    //   //     name:'normalHouseRouter',
    //   //     key:'3'
    //   //   },
    //   //   {
    //   //     name:'shopRouter',
    //   //     key:'4'
    //   //   },
    //   //   {
    //   //     name:'officeRouter',
    //   //     key:'5'
    //   //   }
    //   // ];
    //   // let keyHouse=houseIds.filter((e)=>e.name==name);
    //   // if(this.$cookie.get('houseKind')){
    //   //   if(keyHouse.length>0){
    //   //     this.$cookie.remove('houseKind');
    //   //     this.$cookie.set('houseKind',JSON.stringify(keyHouse));
    //   //   }
    //   // }else{
    //   //   this.$cookie.set('houseKind',JSON.stringify(keyHouse));
    //   // }
    //   if (this.model[name]) {
    //     this.home = this.model[name];
    //     this.$router.replace({
    //       path: this.model[name].path,
    //     })
    //   } else {
    //     this.home = null;
    //     this.$router.replace({
    //       path: '/home',
    //     })
    //   }
    //   this.curTopMenu = name;
    //   this.$cookie.set('curTopMenuName', name);
    //   this.$store.dispatch('setMenu', name);
    // },
    // 选择分店,切换分店
      checkStore(id){
          this.$ajax.put(
              this,
              this.$api.CHOOSE_STORE.replace('{id}',id),
              {},(res)=>{
                this.storeShow=false;
                if(this.$route.name == 'home'){
                  window.location.reload();
                }else{
                  this.$router.push({
                    name:'home'
                  })
                  // this.getMenuTree();
                }
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
    authorityCenter() {
      const name = 'authorityRouter';
      this.$store.dispatch('setFirstLoad', true);
      this.handleMenuSelect(name);
    },
    getInfo() {
      return this.$ajax.get(
        this,
        this.$api.GET_USER_INFO,
        {},
        (res) => {
          this.userStore=res.data.content.storeInfo === undefined ? null : res.data.content.storeInfo;
          //集团id
          this.$cookie.set('corporationId',res.data.content.corporationId);
          //默认模板id
          this.$cookie.set('contractId',res.data.content.corporationInfo.contractId?res.data.content.corporationInfo.contractId:'');

          //1 可以签电子合同 0或空字符串 不可以签电子合同
          if(this.userStore.signStatus){
            this.$cookie.set('signStatus',this.userStore.signStatus);
          }else{
            this.$cookie.set('signStatus','0')
          }


          if(this.userStore == null || this.userStore == ''){
            this.storeShow=true;
          }
          this.$store.dispatch('setUserInfo',  res.data.content);
        }
      )
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
    toHome() {
      this.$router.replace({
        path: this.home.path || '/asset-home',
      })
    },
    person() {
      this.$router.push({
        name: 'person',
      })
    },
    configurationCenter(){
      this.$router.push({
        name: 'config-detail'
      })
    },
    routerTo(name) {
      this.$router.push({
        name,
      });
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
    fireFoxStyle() {
      const userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
      if (userAgent.indexOf("Firefox") > -1) { //判断是否Firefox浏览器
        return {'padding-bottom': '80px'};
      }
      return {};
    },
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
  height: 66px;
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
  /* background-size: 100%; */
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
  margin-right: 10px;
  /* border: 1px solid #eee; */
}
.store-card{
    height: 120px;
    cursor: pointer;
    margin:20px 0px;
}
.route-logo{
  width:60px;
  height:60px;
}
</style>
