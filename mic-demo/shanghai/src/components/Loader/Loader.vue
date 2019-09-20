<template>
  <Spin fix size="large" v-show="showLoading" style="zIndex: 9999;">
    <Icon type="ios-loading" size="20" class="demo-spin-icon-load"></Icon>
    <div>{{msg}}</div>
  </Spin>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    msg: {
      type: String,
      default: '加载中...',
    },
  },
  computed: {
    showLoading() {
      return this.$store.state.showLoading;
    },
  },
};
</script>

<style scoped>
  .demo-spin-icon-load{
    z-index: 8888;
    animation: ani-demo-spin 0.8s linear infinite;
  }
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
</style>


