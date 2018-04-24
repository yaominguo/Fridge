<template>
  <div>
    <div class="title">周末去哪儿</div>
    <ul>
      <li class="item border-bottom" v-for="item in list" :key="item.id">
        <img :src="item.src" alt="picture">
        <div class="info-container">
          <p class="info-title">{{item.title}}</p>
          <p class="info-desc">{{item.desc}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeWeekend',
  data () {
    return {
      list: [
        {id: 'w01', src: 'http://img1.qunarzz.com/sight/source/1603/6d/2f67ae0659f41f.jpg_r_640x214_bf6cbd0b.jpg', title: '背景赏花好地方', desc: '乱花渐欲迷人眼，浅草才能没马蹄~~'},
        {id: 'w02', src: 'http://img1.qunarzz.com/sight/source/1505/aa/7baaf8a851d221.jpg_r_640x214_1431200f.jpg', title: '北京必游TOP10', desc: '来北京非去这些地方莫属~~'},
        {id: 'w03', src: 'http://img1.qunarzz.com/sight/source/1505/9e/21df651e19af5d.jpg_r_640x214_3ea5bb38.jpg', title: '寻找北京的皇城范儿', desc: '数百年的宫廷庙宇，至今霸气犹在~~'}
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  @import '~styles/mixin.styl'
  .title
    color: $fontColor
    line-height: 2.5rem
    background: #efefef
    padding: 0 1rem
  ul
    margin: 0
    padding: 0
    list-style: none
    .item
      width: 100%
      overflow: hidden
      img
        display: block
        width: 100%
      .info-container
        display: flex
        height: 100%
        flex-direction: column
        justify-content: space-between
        padding: 0.8rem 1rem
        overflow: hidden
        p
          margin: 0
          max-width: 100%
          ellipsis()
        .info-desc
          color: #999
          font-size: 0.9rem
          margin-top: 0.5rem
</style>
