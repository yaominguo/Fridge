<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus">
@import './assets/css/variables.styl'

@font-face
  font-family DIN
  src url(./assets/font/DIN-Medium.otf)
@font-face
  font-family Microsoft YaHei UI
  src url(./assets/font/Microsoft-YaHei-UI-Bold.ttf)
html, body
  width 100%
  height 100%
  font-size 1vw
  user-select none
#app
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  font-family DIN, 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  width 100%
  height 100%
  color $fontColor
</style>
