<template>
  <div id="container" :style="`background-image: url(${require('@/assets/images/stars-bg.png')})`">
    <ThemeTitle class="theme">广东省渔业产业布局分析专题</ThemeTitle>
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
    <div class="box4">
      <m-card mode="2" title="各市2018年渔业经济产值">
        <m-chart :showLegend="false" :options="options4" :data="data4"/>
      </m-card>
    </div>
    <div class="box5">
      <m-card mode="2" title="各市2018年渔业经济产量">
        <m-chart :showLegend="false" :options="options5" :data="data5"/>
      </m-card>
    </div>
    <div class="box6">
      <m-card mode="2" title="各市2018年渔业加工产量">
        <m-chart :showLegend="false" :options="options6" :data="data6"/>
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
          // top: '2%',
          left: '24%',
          top: '10%',
          itemWidth: 10,
          itemHeight: 10,
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
          // top: '2%',
          left: '38%',
          top: '10%',
          itemWidth: 10,
          itemHeight: 10,
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
        colors: ['#71C012', '#FFCE34', '#F47C1F'],
        legend: {
          // top: '2%',
          left: '32%',
          top: '10%',
          itemWidth: 10,
          itemHeight: 10,
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
      options4: {
        colors: [['#1FECFF', '#0076FF']],
        grid: {
          bottom: 0,
        },
        xAxis: {
          data: [],
          axisLabel: {
            rotate: 45,
            textStyle: {
              color: '#ccc',
            },
            fontSize: this.fontSize,
          },
        },
        yAxis: {
          name: '(万元)',
        },
        series: {
          type: 'bar',
          barWidth: '40%',
        }
      },
      options5: {
        colors: [['#1FECFF', '#0076FF']],
        grid: {
          bottom: 0,
        },
        xAxis: {
          data: [],
          axisLabel: {
            rotate: 45,
            textStyle: {
              color: '#ccc',
            },
            fontSize: this.fontSize,
          },
        },
        yAxis: {
          name: '(吨)',
        },
        series: {
          type: 'bar',
          barWidth: '40%',
        }
      },
      options6: {
        colors: [['#1FECFF', '#0076FF']],
        grid: {
          bottom: 0,
        },
        xAxis: {
          data: [],
          axisLabel: {
            rotate: 45,
            textStyle: {
              color: '#ccc',
            },
            fontSize: this.fontSize,
          },
        },
        yAxis: {
          name: '(吨)',
        },
        series: {
          type: 'bar',
          barWidth: '40%',
        }
      },
      data4: [],
      data5: [],
      data6: [],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      axios.get(this.$api.FILE_URL + 'gd-industry.json').then(res => {
        const {output, production, processProduction, cityOutput, cityProduction, cityProcessProduction} = res.data
        const textStyle = {
          color: '#ccc',
          fontSize: this.fontSize,
        }
        this.options1.xAxis.data = output.name
        this.options1.legend.textStyle = textStyle
        this.data1 = output.value
        this.options2.xAxis.data = production.name
        this.options2.legend.textStyle = textStyle
        this.data2 = production.value
        this.options3.xAxis.data = processProduction.name
        this.options3.legend.textStyle = textStyle
        this.data3 = processProduction.value
        const data4 = [], data5 = [], data6 = []
        cityOutput.forEach((item, index) => {
          this.options4.xAxis.data.push(item.name)
          data4.push(item.value)
        })
        cityProduction.forEach((item, index) => {
          this.options5.xAxis.data.push(item.name)
          data5.push(item.value)
        })
        cityProcessProduction.forEach((item, index) => {
          this.options6.xAxis.data.push(item.name)
          data6.push(item.value)
        })
        this.data4 = [{data: data4}]
        this.data5 = [{data: data5}]
        this.data6 = [{data: data6}]
      })
    },
    getOptions(data) {
      return {
        colors: [['#1FECFF', '#0076FF']],
        xAxis: {
          data: this.fishChartData.name,
        },
        yAxis: {
          name: `(${data.unit})`,
        },
        series: {
          type: 'bar',
          barWidth: '40%',
        }
      }
    },
  },
  computed: {
    fontSize() {
      return Math.floor(screen.height * 1.48 / 100) / 1.2
    },
  }
}
</script>

<style lang="stylus" scoped>
#container
  $gd-layout()
  grid-template-areas \
    '. theme .'\
    'box1 box4 box4'\
    'box2 box5 box5'\
    'box3 box6 box6'
  grid-template-rows 4rem 1fr 1fr 1fr
  grid-template-columns 1fr 1fr 1fr
  .theme
    grid-area theme
    width 150%
    margin-left -25%
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
</style>
