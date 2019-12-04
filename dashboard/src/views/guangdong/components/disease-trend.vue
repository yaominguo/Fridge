// 疫病灾害分析专题 - 疫情情况趋势
<template>
  <div class="chart" ref="chart"/>
</template>

<script>
export default {
  name: 'DiseaseTrend',
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
          name: '(次)',
          nameTextStyle: {
            color: '#fff',
            fontSize: this.fontSize,
          },
          type: 'value',
          interval: 2,
          min: 0,
          max: 10,
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
            type: 'line',
            areaStyle: {
              color: 'rgba(0, 118, 255, 0.5)'
            },
            itemStyle: {
              color: 'rgba(0, 118, 255, 1)'
            },
            data: [2,5,8,3,1,6,4,5,8,4,3,4],
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
