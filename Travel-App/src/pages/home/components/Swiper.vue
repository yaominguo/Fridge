<template>
  <div class="container">
    <swiper :options="swiperOption" v-if="showSwiper">
      <swiper-slide v-for="image in list" :key="image.id">
        <img :src="image.imgUrl" alt="picture">
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
        loop: true,
        autoplay: 3000
      }
    }
  },
  computed: {
    showSwiper () {
      return this.list.length
    }
  },
  props: {
    list: Array
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
