<template>
  <div id="title" ref="title">
    <img :src="bgImg"/>
    <p><slot /></p>
  </div>
</template>

<script>
const titleBg1 = require('@/assets/images/title-bg.png')
const titleBg2 = require('@/assets/images/title-bg2.png')
export default {
  name: 'ThemeTitle',
  data() {
    return {
      bgImg: titleBg1,
    }
  },
  mounted() {
    const width = this.$refs.title && this.$refs.title.style.width
    if (width && Number(width.split('%')[0]) >= 90) {
      this.bgImg = titleBg2
    }
  },
}
</script>

<style lang="stylus" scoped>
#title
  display flex
  align-items center
  justify-content center
  position relative
  min-width 60%
  margin 0 auto
  height 4.2rem
  >img
    position absolute
    width 100%
    height 100%
    top 0
    left 0
  >p
    font-family $font-pang
    font-size 2.5rem
    -webkit-background-clip text
    -webkit-text-fill-color transparent
    background-image linear-gradient(to right, #1efbff, #0094ff)
</style>
