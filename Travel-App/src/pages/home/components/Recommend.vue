<template>
  <div>
    <div class="title">热销推荐</div>
    <ul>
      <li class="item border-bottom" v-for="item in list" :key="item.id">
        <img :src="item.src" alt="picture">
        <div class="info-container">
          <p class="info-title">{{item.title}}</p>
          <p class="info-desc">{{item.desc}}</p>
          <button class="info-btn">查看详情</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  data () {
    return {
      list: [
        {id: 'r01', src: 'http://img1.qunarzz.com/sight/p0/1507/36/ce3d2d6c9ab44d67ae68d940b8781829.water.jpg_200x200_0938a8f2.jpg', title: '野生动物园', desc: '这里是描述啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊~~'},
        {id: 'r02', src: 'http://img1.qunarzz.com/sight/p0/1507/36/ce3d2d6c9ab44d67ae68d940b8781829.water.jpg_200x200_0938a8f2.jpg', title: '野生动物园', desc: '这里是描述啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊~~'},
        {id: 'r03', src: 'http://img1.qunarzz.com/sight/p0/1507/36/ce3d2d6c9ab44d67ae68d940b8781829.water.jpg_200x200_0938a8f2.jpg', title: '野生动物园', desc: '这里是描述啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊~~'}
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
    line-height: 2rem
    background: #efefef
    padding: 0 1rem
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
