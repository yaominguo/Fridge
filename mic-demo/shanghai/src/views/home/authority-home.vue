// 权限中心首页
<template>
  <Home />
</template>

<script>
import Home from './home';
export default {
  name: 'AuthorityHome',
  components: {
    Home,
  },
  mounted() {
    if ( this.$store.state.firstOnload) {
      this.$router.push({
        path: '/staff/staff/staff-management',
      })
      this.$store.dispatch('setFirstLoad', false);
    }
  }
}
</script>
