<template>
  <div class="container" ref="container">
    <div>
      <div class="section">
        <div class="title">当前城市</div>
        <div class="button-list">
          <div class="wrapper">
            <button>北京</button>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="title">热门城市</div>
        <div class="button-list">
          <div class="wrapper">
            <button>北京</button>
          </div>
          <div class="wrapper">
            <button>北京</button>
          </div>
          <div class="wrapper">
            <button>北京</button>
          </div>
          <div class="wrapper">
            <button>北京</button>
          </div>
          <div class="wrapper">
            <button>北京</button>
          </div>
          <div class="wrapper">
            <button>北京</button>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="title">A</div>
        <div class="item-list">
          <div class="item border-bottom">阿尔拉</div>
          <div class="item border-bottom">阿尔拉</div>
          <div class="item border-bottom">阿尔拉</div>
          <div class="item border-bottom">阿尔拉</div>
          <div class="item border-bottom">阿尔拉</div>
          <div class="item border-bottom">阿尔拉</div>
        </div>
        <div class="title">A</div>
        <div class="item-list">
          <div class="item border-bottom">阿尔拉</div>
          <div class="item border-bottom">阿尔拉</div>
          <div class="item border-bottom">阿尔拉</div>
          <div class="item border-bottom">阿尔拉</div>
          <div class="item border-bottom">阿尔拉</div>
          <div class="item border-bottom">阿尔拉</div>
        </div>
        <div class="title">A</div>
        <div class="item-list">
          <div class="item border-bottom">阿尔拉</div>
          <div class="item border-bottom">阿尔拉</div>
          <div class="item border-bottom">阿尔拉</div>
          <div class="item border-bottom">阿尔拉</div>
          <div class="item border-bottom">阿尔拉</div>
          <div class="item border-bottom">阿尔拉</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
  name: 'CityList',
  mounted () {
    this.scroll = new Bscroll(this.$refs.container)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  @import '~styles/mixin.styl'
  .container
    position: absolute
    top: 6rem
    left: 0
    right: 0
    bottom: 0
    overflow: hidden
    .title
      sectionTitle()
    .button-list
      width: 100%
      padding: 0.5rem 1.5rem 0.5rem 1rem
      overflow: hidden
      box-sizing: border-box
      .wrapper
        width: 33.33%
        float: left
        margin: 0.5rem 0
        button
          width: 90%
          line-height: 1.8rem
          border: 0.05rem solid #ccc
          text-align: center
          border-radius: 0.2rem
          background: #fff
          color: #666
    .item-list
      .item
        line-height: 2.4rem
        color: #666
        padding-left: 1rem
</style>
