<template>
  <Menu mode="horizontal" theme="light" active-name="0">
    <template v-for="(menu,index) in menus">
    <MenuItem v-if="!menu.subMenu" :name="menu.code" :key="index" :to="{name: menu.path}">
      {{ menu.name }}
    </MenuItem>
    <Submenu v-else :name="menu.code" :key="index">
      <template slot="title">
        {{ menu.name }}
      </template>
      <template v-for="(sub, key) in menu.subMenu">
        <MenuItem :name="sub.code" :key="key" :to="{name: sub.path}">{{ sub.name }}</MenuItem>
      </template>
    </Submenu>
    </template>
  </Menu>
</template>

<script>
export default {
  name: 'TopMenu',
  props: {
    menus: {
      type: Array,
      default() {
        return [
          {
            code: 'Home',
            name: '首页',
            path: 'home'
          },
          {
            code: 'Assets',
            name: '资产',
            path: ''
          },
          {
            code: 'PublicHousing',
            name: '公租房',
            path: ''
          },
          {
            code: 'RentalHousing',
            name: '住房租赁',
            path: '',
            subMenu: [
              {
                code: 'StateOwnedPublicHousing',
                name: '国有公房',
                path: ''
              },
              {
                code: 'TalentApartment',
                name: '人才公寓',
                path: ''
              },
              {
                code: 'RentalApartment',
                name: '长租公寓',
                path: ''
              }
            ]
          },
          {
            code: 'RentalBusiness',
            name: '非居租赁',
            path: '',
            subMenu: [
              {
                code: 'RentalShop',
                name: '商铺门面',
                path: ''
              },
              {
                code: 'RentalOffice',
                name: '办公楼',
                path: ''
              }
            ]
          },
          {
            code: 'PropertyService',
            name: '物业服务',
            path: ''
          },
          {
            code: 'HousingSales',
            name: '物业服务',
            path: ''
          },
          {
            code: 'Finance',
            name: '财务',
            path: ''
          },
          {
            code: 'Access',
            name: '权限',
            path: ''
          },
        ]
      }
    }
  },
  data() {
    return {
    };
  }
}
</script>


<style scoped>


</style>
