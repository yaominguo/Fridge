<template>
  <div class="banner">
    <img class="banner-img" src="https://img1.qunarzz.com/p/tts4/1803/ec/10e73e279b3ca502.jpg_r_640x420x90_81e87e44.jpg" alt="banner-img">
    <div class="banner-info">
      <div class="banner-title">上海的海洋世界呀呀呀</div>
      <div class="banner-number">
        <span class="iconfont">&#xe62f;</span>
        39
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBanner'
}
</script>

<style lang="stylus" scoped>
  @import '~styles/mixin.styl'
  .banner
    position: relative
    overflow: hidden
    height: 0
    width: 100%
    padding-bottom: 55%
    .banner-img
      width: 100%
    .banner-info
      position: absolute
      bottom: 0
      left: 0
      right: 0
      display: flex
      align-items: center
      color: #ffffff
      background: linear-gradient(top, rgba(0,0,0,0), rgba(0,0,0,0.8))
      height: 2rem
      .banner-title
        flex: 1
        padding-left: 1rem
        ellipsis()
      .banner-number
        padding: 0 1rem
        font-size: 0.8rem
        span
        font-size: 0.8rem
</style>
