<template>
  <div id="app">
    <!-- <input type="button" value="notify" @click="notify"> -->
    <!-- <input type="button" value="confirm" @click="confirm"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    // notify () {
    //   this.$notify({
    //     content: 'test $notify',
    //     btn: 'close'
    //   })
    // }
    // confirm () {
    //   this.$confirm({
    //     title: 'test',
    //     content: 'Are u sure to do this?'
    //   })
    // }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
