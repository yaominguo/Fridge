<template>
<ul class="list">
  <template v-if="list.length > 0 && list[0].price">
    <li class="row title">
      <p>主要品种</p>
      <p>品种优势</p>
      <p>价格</p>
      <p>供苗期</p>
      <p>联系方式</p>
    </li>
    <VueSeamlessScroll v-if="list.length > 0" :autoPlay="true" :class-option="{step: 0.5, limitMoveNum: 3}" :data="list" class="seamless-wrap">
      <li class="row" v-for="(item, i) in list" :key="item.name + i">
        <p>
          {{item.name}}
          <img :src="require(`@/assets/images/${item.img}`)" />
        </p>
        <p class="over">{{item.advantage}}</p>
        <p>
          {{item.price && item.price.split(' ')[0]}}
          <br/>
          {{item.price && item.price.split(' ')[1]}}
        </p>
        <p>{{item.date}}</p>
        <p>
          {{item.contact && item.contact.split(' ')[0]}}
          <br/>
          {{item.contact && item.contact.split(' ')[1]}}
          <br/>
          {{item.contact && item.contact.split(' ')[2]}}
        </p>
      </li>
    </VueSeamlessScroll>
  </template>
  <template v-else>
    <VueSeamlessScroll v-if="list.length > 0" :autoPlay="true" :class-option="{step: 0.5, limitMoveNum: 3}" :data="list" class="seamless-wrap">
      <li class="section" v-for="(item, i) in list" :key="item.name + i">
        <section>
          <h3 class="title">{{item.name}}</h3>
          <b>优势：</b>
          <p>{{item.advantage}}</p>
        </section>
        <section>
          <img :src="require(`@/assets/images/${item.img}`)" />
        </section>
      </li>
    </VueSeamlessScroll>
  </template>
</ul>
</template>

<script>
import VueSeamlessScroll from 'vue-seamless-scroll'
export default {
  name: 'EnterpriseProductions',
  components: {VueSeamlessScroll},
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
.list
  height 100%
.section
  display flex
  align-items center
  background $color-map(0.1)
  margin-top 1rem
  border-top 0.1rem solid $color-map(1)
  padding 1rem
  >section
    flex 3
    &:last-child
      flex 1
    .title
      color #fff
    b
      display block
      color $color-map(1)
      margin 0.5rem 0
    >p
      padding-right 2rem
    img
      width 100%
.row
  display flex
  color #ccc
  padding 0.5rem
  align-items center
  justify-content space-between
  border-bottom 0.1rem solid rgba(28, 66, 95, 0.4)
  background $color-map(0.05)
  &.title
    font-weight bold
    color #fff
    background $color-map(0.2)
    position sticky
    top 0
  &:nth-child(2n)
    background transparent
  p
    text-align left
    width 20%
    padding 0 0.5rem
    line-height 1.6
    img
      width 100%
    &:nth-child(2)
      width 50%
    &:nth-child(4)
      width 13%
  .over
    max-height 8rem
    overflow auto
.seamless-wrap
  overflow hidden
</style>
