<template>
  <div id="container" :style="`background-image: url(${require('@/assets/images/stars-bg.png')})`">
    <GuangdongMap />
    <ThemeTitle style="width: 300%;">全省疫病灾害数据分析专题</ThemeTitle>
    <div class="sum">
      <p>全省水产疫病爆发<b><m-count :value="2" :decimal="0"/></b>次</p>
      <p>面积<b><m-count :value="11.24"/></b>k㎡</p>
      <p>损失<b><m-count :value="67.15"/></b>万元</p>
    </div>
    <div class="box1">
      <m-card mode="2" title="各品种受灾严重程度">
        <DataList :list="list1"/>
      </m-card>
    </div>
    <div class="box2">
      <m-card mode="2" title="各市疫病情况">
        <DiseaseList :list="list2"/>
      </m-card>
    </div>
    <div class="box3">
      <m-card mode="2" title="疫情情况趋势">
        <m-chart :showLegend="false" :options="options" :data="data"/>
      </m-card>
    </div>
    <div class="box4">
      <m-card mode="2" title="疫病立春灾害情报">
        <DiseasePie />
      </m-card>
    </div>
  </div>
</template>

<script>
import DataList from './components/list'
import DiseaseList from './components/disease-list'
import ThemeTitle from './components/title'
import DiseasePie from './components/disease-pie.vue'
import GuangdongMap from './components/map'
export default {
  name: 'GDDisease',
  components: {
    DataList,
    DiseaseList,
    ThemeTitle,
    DiseasePie,
    GuangdongMap,
  },
  data() {
    return {
      options: {
        xAxis: {
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          boundaryGap: false,
        },
        yAxis: {
          name: '(次)',
          min: 0,
          max: 10,
          interval: 2,
        },
        series: {
          type: 'line',
          areaStyle: {},
        },
        colors: ['rgba(0, 118, 255, 1)'],
      },
      data: [
        {data: [2,5,8,3,1,6,4,5,8,4,3,4]}
      ],
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
        {name: '广州市', area: 74.40, count: 7, lose: 74},
        {name: '韶关市', area: 118.06, count: 1, lose: 11},
        {name: '深圳市', area: 16.85, count: 1, lose: 16},
        {name: '珠海市', area: 11.24, count: 1, lose: 11},
        {name: '汕头市', area: 28.70, count: 2, lose: 28},
        {name: '佛山市', area: 35, count: 3, lose: 35},
        {name: '江门市', area: 95, count: 9, lose: 95},
        {name: '湛江市', area: 125.44, count: 1, lose: 12},
        {name: '茂名市', area: 158, count: 1, lose: 15},
        {name: '肇庆市', area: 74.40, count: 7, lose: 74},
        {name: '惠州市', area: 199, count: 1, lose: 19},
        {name: '梅州市', area: 164.5, count: 1, lose: 16},
        {name: '汕尾市', area: 51, count: 5, lose: 51},
        {name: '河源市', area: 142, count: 1, lose: 14},
        {name: '阳江市', area: 75.9, count: 7, lose: 75},
        {name: '清远市', area: 100, count: 1, lose: 10},
        {name: '东莞市', area: 20.10, count: 2, lose: 20},
        {name: '中山市', area: 13.67, count: 1, lose: 13},
        {name: '潮州市', area: 39, count: 3, lose: 39},
        {name: '揭阳市', area: 50.5, count: 5, lose: 50},
        {name: '云浮市', area: 75.11, count: 7, lose: 75},
      ]
    }
  },
}
</script>

<style lang="stylus" scoped>
#container
  $gd-layout()
  grid-template-areas \
    'box1 . . . box2'\
    'box1 . . . box2'\
    'box3 box3 box4 box4 box2'
  grid-template-rows 1fr 1fr 1fr
  grid-template-columns 1.2fr 1fr 1fr 1fr 1.2fr
  .sum
    display flex
    justify-content space-around
    width 40%
    margin 0 auto
    font-family $font-pang
    font-size 1.4rem
    color #fff
    position absolute
    top 10%
    left 0
    right 0
    text-align center
    b
      font-family $font-din
      color $color-map(1)
      font-size 1.8rem
      margin 0 0.5rem
  .box1
    grid-area box1
  .box2
    grid-area box2
  .box3
    grid-area box3
  .box4
    grid-area box4
</style>
