<template>
  <div class="container">
    <swiper :options="swiperOption">
      <swiper-slide class="icons" v-for="(page, index) in pages" :key="index">
        <div class="icon" v-for="icon in page" :key="icon.id">
          <img :src="icon.src" alt="icon">
          <p>{{icon.text}}</p>
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
      icons: [
        {id: 'icon1', text: '热门景点', src: 'http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png'},
        {id: 'icon2', text: '热门景点', src: 'http://img1.qunarzz.com/piao/fusion/1804/ff/fdf170ee89594b02.png'},
        {id: 'icon3', text: '热门景点', src: 'http://img1.qunarzz.com/piao/fusion/1803/bd/9f7b9b2b60c1502.png'},
        {id: 'icon4', text: '热门景点', src: 'http://img1.qunarzz.com/piao/fusion/1804/5a/13ceb38dcf262f02.png'},
        {id: 'icon5', text: '热门景点', src: 'http://img1.qunarzz.com/piao/fusion/1803/76/eb88861d78fb9902.png'},
        {id: 'icon6', text: '热门景点', src: 'http://img1.qunarzz.com/piao/fusion/1803/6c/9e54a8540fee0102.png'},
        {id: 'icon7', text: '热门景点', src: 'http://img1.qunarzz.com/piao/fusion/1803/67/9a1678221b8e0e02.png'},
        {id: 'icon8', text: '热门景点', src: 'http://img1.qunarzz.com/piao/fusion/1803/fa/fe1915e1d20bcc02.png'},
        {id: 'icon9', text: '热门景点', src: 'http://img1.qunarzz.com/piao/fusion/1803/fa/fe1915e1d20bcc02.png'}
      ],
      swiperOption: {
        pagination: '.swiper-pagination'
      }
    }
  },
  computed: {
    pages () {
      const pages = []
      this.icons.forEach((icon, index) => {
        // 分页，8个icon为一页
        const page = Math.floor(index / 8)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(icon)
      })
      return pages
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
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
</style>
