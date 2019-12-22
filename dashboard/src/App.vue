<template>
  <div id="app">
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <router-view :key="$route.fullPath"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      routes: ['home', 'industry', 'special', 'production', 'trade', 'fish', 'disease', 'enterprise', 'flow'],
      cur: 0,
      timer: null,
      timeOuter: null,
      seconds: 1000 * 10
    }
  },
  mounted() {
    this.$router.push({
      name: this.routes[this.cur]
    })
    this.setTimer()
    document.body.addEventListener('mousemove', this.removeTimer)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    setTimer() {
      this.timer = setInterval(() => {
        this.cur += 1
        if (this.cur >= this.routes.length) {
          this.cur = 0
        }
        this.$router.push({
          name: this.routes[this.cur]
        })
      }, this.seconds)
    },
    removeTimer() {
      clearTimeout(this.timeOuter)
      clearInterval(this.timer)
      this.timer = null
      this.timeOuter = setTimeout(this.setTimer, this.seconds / 10)
    },
  },
  watch: {
    $route(to, from) {
      if (to.name && this.cur != this.routes.indexOf(to.name)) {
        this.cur = this.routes.indexOf(to.name)
      }
      // if (to.name === 'home') {
      //   clearInterval(this.timer)
      //   clearTimeout(this.timeOuter)
      //   this.timer = null
      //   this.cur = 0
      // } else {
      //   this.cur = this.routes.indexOf(to.name)
      // }
    }
  }
}
</script>

<style lang="stylus">
@import './assets/css/variables.styl'
@import './assets/css/reset.styl'

@font-face
  font-family DIN
  src url(./assets/font/DIN-Medium.otf)
@font-face
  font-family Microsoft YaHei UI
  src url(./assets/font/Microsoft-YaHei-UI-Bold.ttf)
@font-face
  font-family Pangmenzhengdao
  src url(./assets/font/pangmenzhengdao.ttf)
html, body
  background-color #000 !important
  width 100%
  height 100%
  user-select none
#app
  font-family DIN, 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  width 100%
  height 100%
  font-size 1rem
  overflow: hidden
  color $fontColor

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 0.5rem;
}
// /* 滚动槽 */
// ::-webkit-scrollbar-track {
//   -webkit-box-shadow: inset006pxrgba(0,0,0,0.3);
//   /* border-radius: 10px; */
// }
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  /* border-radius: 10px; */
  background:rgba(91, 213, 255, 0.2)
  -webkit-box-shadow:inset006pxrgba(0,0,0,0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background:rgba(91, 213, 255, 0.2)
}
</style>
