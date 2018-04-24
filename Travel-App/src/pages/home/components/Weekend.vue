<template>
  <div>
    <div class="title">周末去哪儿</div>
    <ul>
      <li class="item border-bottom" v-for="item in list" :key="item.id">
        <img :src="item.imgUrl" alt="picture">
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
  props: {
    list: Array
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
