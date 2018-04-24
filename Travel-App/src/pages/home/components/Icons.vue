<template>
  <div class="container">
    <swiper :options="swiperOption">
      <swiper-slide class="icons" v-for="(page, index) in pages" :key="index">
        <div class="icon" v-for="icon in page" :key="icon.id">
          <img :src="icon.imgUrl" alt="icon">
          <p>{{icon.desc}}</p>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'HomeIcons',
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        autoplay: false
      }
    }
  },
  computed: {
    pages () {
      const pages = []
      this.list.forEach((icon, index) => {
        // 分页，8个icon为一页
        const page = Math.floor(index / 8)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(icon)
      })
      return pages
    }
  },
  props: {
    list: Array
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  @import '~styles/mixin.styl'
  .container >>> .swiper-pagination-bullet-active
    background: $bgColor
  .swiper-pagination
    bottom: 0
  .icons
    width: 100%
    overflow: hidden
    display: flex
    flex-wrap: wrap
    padding: 10px 0
    .icon
      width: 25%
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      img
        width: 50%
      p
        margin-top: 10px
        color: $fontColor
        font-size: 0.8rem
        max-width: 90%
        ellipsis()
</style>
