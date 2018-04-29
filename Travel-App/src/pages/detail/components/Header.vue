<template>
  <div>
    <router-link tag="div" to="/" class="header-abs" v-show="showAbs" :style="absOpacity">
      <span class="iconfont">&#xe624;</span>
    </router-link>
    <div class="header-fixed" v-show="!showAbs" :style="fixedOpacity">
      <router-link tag="span" to="/" class="iconfont">&#xe624;</router-link>
      景点详情
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailHeader',
  data () {
    return {
      showAbs: true,
      fixedOpacity: {
        opacity: 0
      },
      absOpacity: {
        opacity: 1
      }
    }
  },
  methods: {
    handleScrollEvent () {
      const top = document.documentElement.scrollTop
      if (top > 0) {
        let opacity = top / 100
        opacity = opacity > 1 ? 1 : opacity
        this.fixedOpacity = { opacity }
        this.absOpacity = { opacity: 1 - opacity }
        this.showAbs = false
      } else {
        this.showAbs = true
      }
    }
  },
  activated () {
    window.addEventListener('scroll', this.handleScrollEvent)
  },
  deactivated () {
    window.removeEventListener('scroll', this.handleScrollEvent)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .header-abs
    position: absolute
    top: 0.5rem
    left: 0.5rem
    width: 2rem
    height: 2rem
    border-radius: 50%
    background: rgba(0,0,0,0.5)
    line-height: 2rem
    text-align: center
    .iconfont
      color: #fff
  .header-fixed
    position: fixed
    top: 0
    left: 0
    right: 0
    height: $headerHeight
    line-height: $headerHeight
    background: $bgColor
    color: #fff
    text-align: center
    z-index: 2
    .iconfont
      position: absolute
      left: 1rem
</style>
