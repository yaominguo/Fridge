<template>
  <Menu class="ov-navigation"
    mode="horizontal"
    active-name="1"
    @on-select="handleRouteTo">
    <template v-for="item in data" >
      <MenuItem :name="item.path" :key="item.name">
        {{ item.name }}
      </MenuItem>
    </template>
  </Menu>
</template>

<script>
export default {
  name: 'navigation',
  data() {
    return {
      data: [
        {
          name: '首页',
          path: 'home',
          blank: false,
        },
        {
          name: '人才中心',
          path: '',
          blank: false,
        },
        {
          name: '业务中心',
          path: '',
          blank: false,
        },
        {
          name: '报表中心',
          path: '',
          blank: false,
        },
      ],
    };
  },
  methods: {
    handleRouteTo(name) {
      this.$router.push({
        name,
      });
    },
  },
};
</script>

<style scoped>
.ov-navigation {
  height: 64px;
}
</style>

<style>
.ov-navigation.ivu-menu-horizontal.ivu-menu-light:after {
  background: transparent;
}
</style>

