<template>
  <div id="container" :style="`background-image: url(${require('@/assets/images/stars-bg.png')})`">
    <ThemeTitle class="theme">广东省产业布局分析专题</ThemeTitle>
    <div class="box1">
      <m-card mode="2" title="渔业经济产值">
        <m-chart :options="options1" :data="data1"/>
      </m-card>
    </div>
    <div class="box2">
      <m-card mode="2" title="渔业经济产量">
        <m-chart :options="options2" :data="data2"/>
      </m-card>
    </div>
    <div class="box3">
      <m-card mode="2" title="渔业加工产量">
        <m-chart :options="options3" :data="data3"/>
      </m-card>
    </div>
    <div v-for="(item, index) in fishChartData.value" :key="item.name" :class="`box${4 + index}`">
      <m-card mode="2" :title="`特色品种鱼苗数量 - ${item.name}`">
        <m-chart :options="getOptions(item)" :data="[item]" :showLegend="false"/>
      </m-card>
    </div>
  </div>
</template>

<script>
import ThemeTitle from './components/title'
import axios from 'axios'
export default {
  name: 'GDIndustry',
  components: {
    ThemeTitle,
  },
  data() {
    return {
      options1: {
        legend: {
          top: '2%',
        },
        xAxis: {
          data: [],
        },
        yAxis: {
          name: '(万元)',
        },
        series: {
          type: 'bar',
          barWidth: '40%',
          stack: '总量',
        }
      },
      data1: [],
      options2: {
        legend: {
          top: '2%',
        },
        xAxis: {
          data: [],
        },
        yAxis: {
          name: '(吨)',
        },
        series: {
          type: 'bar',
          barWidth: '40%',
          stack: '总量',
        }
      },
      data2: [],
      options3: {
        colors: ['#21640D', '#FFCE34', '#F47C1F'],
        legend: {
          top: '2%',
        },
        grid: {
          right: '5%',
        },
        xAxis: {
          data: [],
          boundaryGap: false,
        },
        yAxis: {
          name: '(吨)',
        },
        series: {
          type: 'line',
          stack: '总量',
          areaStyle: {},
          symbol: 'circle',
        }
      },
      data3: [],
      fishChartData: {
        name: [],
        value: [],
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      axios.get(this.$api.FILE_URL + 'gd-industry.json').then(res => {
        const {output, production, processProduction, fishProduction} = res.data
        this.options1.xAxis.data = output.name
        this.data1 = output.value
        this.options2.xAxis.data = production.name
        this.data2 = production.value
        this.options3.xAxis.data = processProduction.name
        this.data3 = processProduction.value
        this.fishChartData = fishProduction
      })
    },
    getOptions(data) {
      return {
        xAxis: {
          data: this.fishChartData.name,
        },
        yAxis: {
          name: data.unit,
        },
        series: {
          type: 'bar',
          barWidth: '40%',
          itemStyle: {
            shadowColor: '#0076FF',
            shadowBlur: 6,
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: '#1FECFF'},
              {offset: 1, color: '#0076FF'}
            ])
          },
        }
      }
    },
  }
}
</script>

<style lang="stylus" scoped>
#container
  $gd-layout()
  grid-template-areas \
    '. theme .'\
    'box1 box2 box3'\
    'box4 box5 box6'\
    'box7 box8 box9'
  grid-template-rows 4rem 1fr 1fr 1fr
  grid-template-columns 1fr 1fr 1fr
  .theme
    grid-area theme
    width 120%
    margin-left -10%
  .box1
    grid-area box1
  .box2
    grid-area box2
  .box3
    grid-area box3
  .box4
    grid-area box4
  .box5
    grid-area box5
  .box6
    grid-area box6
  .box7
    grid-area box7
  .box8
    grid-area box8
  .box9
    grid-area box9
</style>
