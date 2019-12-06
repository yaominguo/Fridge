<template>
  <div id="container" :style="`background-image: url(${require('@/assets/images/stars-bg.png')})`">
    <GuangdongMap :data="cityDiseaseArea"/>
    <ThemeTitle style="width: 300%;">全省疫病灾害数据分析专题</ThemeTitle>
    <div class="sum">
      <p>全省水产疫病爆发<b><m-count :value="sum.total" :decimal="0"/></b>次</p>
      <p>面积<b><m-count :value="sum.area"/></b>k㎡</p>
      <p>损失<b><m-count :value="sum.loss"/></b>万元</p>
    </div>
    <div class="box1">
      <m-card mode="2" title="各疫病的发病次数">
        <DataList :list="disease" :decimal="0"/>
      </m-card>
    </div>
    <div class="box2">
      <m-card mode="2" title="各市疫病情况">
        <DiseaseList :list="citySituation"/>
      </m-card>
    </div>
    <div class="box3">
      <m-card mode="2" title="疫情情况趋势">
        <m-chart :showLegend="false" :options="options" :data="data"/>
      </m-card>
    </div>
    <div class="box4">
      <m-card mode="2" title="各类发病次数占比">
        <m-chart :options="options2" :data="data2"/>
      </m-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import DataList from './components/list'
import DiseaseList from './components/disease-list'
import ThemeTitle from './components/title'
import GuangdongMap from './components/map'
export default {
  name: 'GDDisease',
  components: {
    DataList,
    DiseaseList,
    ThemeTitle,
    GuangdongMap,
  },
  data() {
    return {
      dataSource: [],
      options: {
        xAxis: {
          data: [],
          boundaryGap: false,
        },
        yAxis: {
          name: '(次)',
        },
        series: {
          type: 'line',
          areaStyle: {},
        },
        colors: ['rgba(0, 118, 255, 1)'],
      },
      data: [],
      options2: {
        legend: {
          orient: 'vertical',
          y: 'center',
          left: '60%',
          top: '10%',
          data: [],
          formatter: name => {
            const item = this.data2.find(el => el.name === name)
            return `${name} ${item.value}次`
          }
        },
        tooltip: {
          trigger: 'item',
        },
        color: ['#3391FF','#71C012','#F47C1F','#CC4D4D','#C15CFF','#8400FF'],
        series: {
          type: 'pie',
          label: {
            show: false,
          },
          center: ['30%', '50%'],
          data: [],
        }
      },
      data2: [],
      sum: {
        total: 0,
        area: 0,
        loss: 0,
      },
      rate: [],
      trend: [],
      citySituation: [],
      disease: [],
      cityDiseaseArea: [],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      axios.get(this.$api.FILE_URL + 'gd-disease.json').then(res => {
        for (let key in res.data) {
          this[key] = res.data[key]
        }
        const chartData = []
        this.trend.forEach(item => {
          this.options.xAxis.data.push(item.name)
          chartData.push(item.value)
        })
        this.data = [{data: chartData}]
        this.data2 = this.rate.map(item => {
          item.icon = 'circle'
          return item
        })
      })
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
    width 50%
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
