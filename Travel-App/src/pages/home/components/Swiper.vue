<template>
  <div class="container">
    <swiper :options="swiperOption">
    <swiper-slide v-for="image in images" :key="image.id">
      <img :src="image.src" alt="picture">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
  </div>
</template>

<script>
export default {
  name: 'HomeSwiper',
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true
      },
      images: [
        {id: 1, src: 'http://img1.qunarzz.com/piao/fusion/1804/14/21f410d1016c8702.jpg_640x200_84d0effe.jpg'},
        {id: 2, src: 'http://img1.qunarzz.com/piao/fusion/1804/fb/9140fd5178ae6b02.jpg_640x200_40ef818b.jpg'},
        {id: 3, src: 'http://img1.qunarzz.com/piao/fusion/1804/4c/9f170839b372c302.jpg_640x200_68e5cc5b.jpg'}
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container >>> .swiper-pagination-bullet-active
    background: #fff
  .container
    overflow: hidden
    width: 100%
    height: 0
    padding-bottom: 32%
    img
      width: 100%
</style>
