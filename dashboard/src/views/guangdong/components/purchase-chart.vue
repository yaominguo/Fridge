// 交易分析专题 - 累计违规举报次数
<template>
  <div class="chart" ref="chart"/>
</template>

<script>
export default {
  name: 'PurchaseChart',
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
          data: ['供应数据', '采购数据'],
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
          name: '(吨)',
          nameTextStyle: {
            color: '#fff',
            fontSize: this.fontSize,
          },
          type: 'value',
          interval: 2000,
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
            name: '供应数据',
            type: 'bar',
            barWidth: '30%',
            barGap: 0,
            itemStyle: {
              shadowColor: '#0076FF',
              shadowBlur: 6,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: '#1FECFF'},
                {offset: 1, color: '#0076FF'}
              ])
            },
            data: [6500, 8500, 6000, 4600, 5600, 8500, 6000, 2500, 4500, 6500, 4500, 8000],
          },
          {
            name: '采购数据',
            type: 'bar',
            barWidth: '30%',
            barGap: 0,
            itemStyle: {
              shadowColor: '#c16ad6',
              shadowBlur: 6,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: '#c16ad6'},
                {offset: 1, color: '#3725b2'}
              ])
            },
            data: [5500, 9000, 5000, 3600, 4600, 7500, 7000, 3500, 5500, 7500, 5500, 6700],
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
