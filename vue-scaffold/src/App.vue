<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {permission} from '@/util/mixins'
export default {
  name: 'App',
  mixins: [permission],
  created() {
    this.getInfo()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
