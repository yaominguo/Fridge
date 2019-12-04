// 罗非鱼专题 - 市场平均价格
<template>
  <div class="chart" ref="chart"/>
</template>

<script>
export default {
  name: 'PriceChart',
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const chart = this.$echarts.init(this.$refs.chart)
      const options = {
        grid: {
          top: '50px',
          left: '30px',
          right: '30px',
          bottom: '5px',
          width: 'auto',
          height: 'auto',
          containLabel: true,
        },
        legend: {
          top: 20,
          right: 10,
          data: ['成鱼市场均价', '鱼苗市场均价'],
          textStyle: {
            color: '#ccc',
            fontSize: this.fontSize,
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisLabel: {
            textStyle: {
              color: '#ccc',
            },
            fontSize: this.fontSize,
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(91,213,255,0.3)'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(91,213,255,0.3)'
            }
          }
        },
        yAxis: {
          name: '(元/公斤)',
          nameTextStyle: {
            color: '#fff',
            fontSize: this.fontSize,
          },
          type: 'value',
          interval: 60,
          min: 0,
          max: 300,
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(91,213,255,0.3)'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#ccc',
            },
            fontSize: this.fontSize,
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(91,213,255,0.3)'
            }
          },
        },
        series: [
          {
            name: '成鱼市场均价',
            type: 'line',
            itemStyle: {
              color: '#0076FF'
            },
            areaStyle: {},
            data: [265, 285, 160, 246, 256, 185, 160, 225, 245, 165, 245, 180],
          },
          {
            name: '鱼苗市场均价',
            type: 'line',
            itemStyle: {
              color: '#F47C1F',
            },
            areaStyle: {},
            data: [155, 190, 250, 136, 146, 275, 270, 135, 155, 275, 155, 267],
          },
        ],
      }
      chart.setOption(options)
    }
  },
  computed: {
    fontSize() {
      return Math.floor(window.innerWidth / 100) - 1
    },
  }
}
</script>

<style lang="stylus" scoped>
.chart
  height 100%
  width 100%
</style>
