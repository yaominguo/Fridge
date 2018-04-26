<template>
  <div>
    <div class="title">热销推荐</div>
    <ul>
      <li class="item border-bottom" v-for="item in list" :key="item.id">
        <img :src="item.imgUrl" alt="picture">
        <div class="info-container">
          <p class="info-title">{{item.title}}</p>
          <p class="info-desc">{{item.desc}}</p>
          <router-link :to="'/detail/' + item.id">
            <button class="info-btn">查看详情</button>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props: {
    list: Array
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  @import '~styles/mixin.styl'
  .title
    sectionTitle()
    margin-top: 1rem
  ul
    margin: 0
    padding: 0
    list-style: none
    .item
      display: flex
      align-items: center
      padding: 1rem
      height:5rem
      img
        width:6rem
        height: 100%
      .info-container
        display: flex
        flex: 1
        height: 100%
        flex-direction: column
        justify-content: space-between
        padding-left: 1rem
        overflow: hidden
        p
          margin: 0
          max-width: 100%
          ellipsis()
        .info-desc
          color: #999
          font-size: 0.9rem
        .info-btn
          width:30%
          background: #ff9300
          padding: 0.3rem 0.5rem
          color: #fff
          border: none
          border-radius: 0.3rem
          font-size: 0.8rem
</style>
