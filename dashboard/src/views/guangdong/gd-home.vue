<template>
  <div id="container" :style="`background-image: url(${require('@/assets/images/stars-bg.png')})`">
    <ThemeTitle class="theme">广东省渔业大数据专题</ThemeTitle>
    <div
      v-for="(item, index) in routes"
      :key="item"
      @click="handleSelect(item)"
      :class="`box box${index + 1}`"
      :style="`background-image: url(${require('@/assets/images/home-card-bg.png')})`"
    >
      <p><span/>{{titles[index]}}</p>
      <img :src="require(`@/assets/images/screenshots/${item}.png`)"/>
    </div>
  </div>
</template>

<script>
import ThemeTitle from './components/title'
export default {
  name: 'GDHome',
  components: {
    ThemeTitle,
  },
  data() {
    return {
      routes: ['industry', 'special', 'production', 'trade', 'fish', 'disease', 'enterprise', 'flow'],
      titles: ['广东省渔业产业布局分析专题', '广东省渔业特色种苗专题', '广东省渔业生产专题', '渔业种业综合交易平台交易分析专题', '广东省罗非鱼专题', '广东省水生动物病害数据分析专题', '广东省渔业企业介绍专题', '操作流程'],
    }
  },
  methods: {
    handleSelect(name) {
      this.$router.push({name})
    }
  }
}
</script>

<style lang="stylus" scoped>
#container
  $gd-layout()
  grid-template-areas \
    '. theme theme .'\
    'box1 box2 box3 box4'\
    'box5 box6 box7 box8'
  grid-template-rows 4rem 1fr 1fr
  grid-template-columns 1fr 1fr 1fr 1fr
  .theme
    grid-area theme
    width 100%
  .box
    width 100%
    height 100%
    background-size 100% 100%
    padding 2rem
    cursor pointer
    display flex
    flex-direction column
    justify-content center
    &:hover
      background-color $color-map(0.3)
    >p
      display flex
      align-items center
      color #b3ecff
      font-size 1.2rem
      font-weight bold
      margin-bottom 1rem
      >span
        display inline-block
        margin-right 0.8rem
        width 0.4rem
        height 1rem
        background #b3ecff
    >img
      width 100%
      height 56%
  .box1
    grid-area box1
  .box2
    grid-area box2
  .box3
    grid-area box3
  .box4
    grid-area box4
  .box5
    grid-area box5
  .box6
    grid-area box6
  .box7
    grid-area box7
  .box8
    grid-area box8
</style>
