// 交易分析专题 - 累计违规举报次数
<template>
  <div class="chart" ref="chart"/>
</template>

<script>
export default {
  name: 'ReportChart',
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
          interval: 20,
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
            type: 'bar',
            barWidth: '50%',
            barGap: 0,
            itemStyle: {
              shadowColor: '#0076FF',
              shadowBlur: 6,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: '#1FECFF'},
                {offset: 1, color: '#0076FF'}
              ])
            },
            data: [30, 50, 10, 60, 70, 40, 50, 70, 30, 50, 90, 58],
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
