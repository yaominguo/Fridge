<template>
  <div class="container" @click="handleGallaryClick">
    <div class="wrapper">
      <swiper :options="swiperOptions">
        <swiper-slide v-for="(item, index) in imgs" :key="index">
          <img :src="item" alt="gallaryPicture">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonGallary',
  data () {
    return {
      swiperOptions: {
        pagination: '.swiper-pagination',
        paginationType: 'fraction',
        observeParents: true,
        observer: true
      }
    }
  },
  methods: {
    handleGallaryClick () {
      this.$emit('close')
    }
  },
  props: {
    imgs: {
      type: Array,
      default () {
        return ['https://img1.qunarzz.com/p/tts4/1803/ec/10e73e279b3ca502.jpg_r_640x420x90_81e87e44.jpg', 'https://img1.qunarzz.com/p/tts4/1803/ec/10e73e279b3ca502.jpg_r_640x420x90_81e87e44.jpg']
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container >>> .swiper-container
    overflow: inherit
  .container
    display: flex
    flex-direction: column
    justify-content: center
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #000
    z-index: 99
    .wrapper
      width: 100%
      height: 0
      padding-bottom: 100%
      .swiper-pagination
        color: #fff
        bottom: -3rem
      img
        width: 100%
</style>
