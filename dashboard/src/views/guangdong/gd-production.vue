<template>
  <div id="container" :style="`background-image: url(${require('@/assets/images/stars-bg.png')})`">
    <GuangdongMap />
    <ThemeTitle>广东省生产专题</ThemeTitle>
    <div class="area">
      <p>当前广东省养殖面积</p>
      <b><m-flip :value="888888888"/></b>
      <span>k㎡</span>
    </div>
    <div class="box1">
      <m-card mode="2" title="各品种企业排行榜">
        <DataList :list="list1"/>
      </m-card>
    </div>
    <div class="box2">
      <m-card mode="2" title="各市养殖面积">
        <DataList :list="list2"/>
      </m-card>
    </div>
    <div class="box3">
      <m-card mode="2" title="各品种养殖/出塘数据">
        <ProductionChart />
      </m-card>
    </div>
  </div>
</template>

<script>
import DataList from './components/list'
import ThemeTitle from './components/title'
import ProductionChart from './components/production-chart.vue'
import GuangdongMap from './components/map'
export default {
  name: 'GDProduction',
  components: {
    DataList,
    ThemeTitle,
    ProductionChart,
    GuangdongMap,
  },
  data() {
    return {
      list1: [
        {name: '淡水鱼苗', value: 8279, unit: '亿尾'},
        {name: '淡水鱼种', value: 222544, unit: '吨'},
        {name: '投放鱼种', value: 193027, unit: '吨'},
        {name: '稚鳖', value: 6549, unit: '万只'},
        {name: '稚龟', value: 655, unit: '万只'},
        {name: '鳗苗捕捞', value: 43, unit: '千克'},
        {name: '海水鱼苗', value: 508510, unit: '万尾'},
        {name: '虾类育苗', value: 5455, unit: '万尾'},
        {name: '贝类育苗', value: 293678, unit: '万尾'},
        {name: '海带', value: 100, unit: '亿株'},
        {name: '紫菜', value: 0.06, unit: '亿株'},
        {name: '海参', value: 0.09, unit: '亿头'},
      ],
      list2: [
        {name: '广州市', value: 7434.40, unit: 'k㎡'},
        {name: '韶关市', value: 18218.06, unit: 'k㎡'},
        {name: '深圳市', value: 1996.85, unit: 'k㎡'},
        {name: '珠海市', value: 1711.24, unit: 'k㎡'},
        {name: '汕头市', value: 2198.70, unit: 'k㎡'},
        {name: '佛山市', value: 3875, unit: 'k㎡'},
        {name: '江门市', value: 9505, unit: 'k㎡'},
        {name: '湛江市', value: 13225.44, unit: 'k㎡'},
        {name: '茂名市', value: 11458, unit: 'k㎡'},
        {name: '肇庆市', value: 7434.40, unit: 'k㎡'},
        {name: '惠州市', value: 11599, unit: 'k㎡'},
        {name: '梅州市', value: 15864.5, unit: 'k㎡'},
        {name: '汕尾市', value: 5271, unit: 'k㎡'},
        {name: '河源市', value: 15642, unit: 'k㎡'},
        {name: '阳江市', value: 7955.9, unit: 'k㎡'},
        {name: '清远市', value: 19000, unit: 'k㎡'},
        {name: '东莞市', value: 2460.10, unit: 'k㎡'},
        {name: '中山市', value: 1783.67, unit: 'k㎡'},
        {name: '潮州市', value: 3679, unit: 'k㎡'},
        {name: '揭阳市', value: 5240.5, unit: 'k㎡'},
        {name: '云浮市', value: 7785.11, unit: 'k㎡'},
      ]
    }
  },
}
</script>

<style lang="stylus" scoped>
#container
  width 100%
  height 100%
  background-size cover
  background-position center
  background-color #061627
  position relative
  display grid
  grid-template-areas \
    'box1 . box2'\
    'box1 . box2'\
    'box3 box3 box2'
  grid-template-rows 1fr 1fr 1fr
  grid-template-columns 1fr 3fr 1fr
  grid-gap 0.7rem
  padding 0.7rem
  .box1
    grid-area box1
  .box2
    grid-area box2
  .box3
    grid-area box3
  .area
    font-size 1.8rem
    color $color-map(1)
    position absolute
    top 10%
    left 0
    right 0
    text-align center
    p
      color #fff
      font-family $font-pang
    b
      font-size 3rem
    >span
      font-size 1.5rem
</style>
