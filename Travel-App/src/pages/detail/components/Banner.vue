<template>
  <div>
    <div class="banner" @click="handleBannerClick">
      <img class="banner-img" :src="bannerImg" alt="banner-img">
      <div class="banner-info">
        <div class="banner-title">{{sightName}}</div>
        <div class="banner-number">
          <span class="iconfont">&#xe62f;</span>
          {{gallaryImgs.length}}
        </div>
      </div>
    </div>
    <fade-animation>
      <common-gallary @close="closeGallary" :imgs="gallaryImgs" v-show="showGallary"></common-gallary>
    </fade-animation>
  </div>
</template>

<script>
import CommonGallary from 'common/gallary/Gallary'
import FadeAnimation from 'common/fade/Fade'
export default {
  name: 'DetailBanner',
  components: {
    CommonGallary,
    FadeAnimation
  },
  data () {
    return {
      showGallary: false
    }
  },
  methods: {
    handleBannerClick () {
      this.showGallary = true
    },
    closeGallary () {
      this.showGallary = false
    }
  },
  props: {
    sightName: String,
    gallaryImgs: Array,
    bannerImg: String
  }
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
