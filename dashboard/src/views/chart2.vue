<template>
  <div class="chart" ref="chart"/>
</template>

<script>
export default {
  name: 'Chart',
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const chart = this.$echarts.init(this.$refs.chart)
      const options = {
        grid: {
          top: '30px',
          left: '5px',
          right: '5px',
          bottom: '5px',
          width: '100%',
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
              color: '#fff',
            },
            fontSize: this.fontSize,
          },
          axisLine: {
            lineStyle: {
              color: '#aaa',
            }
          },
        },
        yAxis: {
          // name: '收入（万元）',
          // nameTextStyle: {
          //   color: '#1ce8ff',
          //   padding: [0, 0, 0, 30],
          // },
          type: 'value',
          interval: 20,
          splitLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: '#fff',
            },
            fontSize: this.fontSize,
          },
          axisLine: {
            lineStyle: {
              color: '#aaa',
            }
          },
        },
        series: [
          {
            type: 'bar',
            barWidth: '40%',
            barGap: 0,
            itemStyle: {
              shadowColor: '#1ce8ff',
              shadowBlur: 6,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: '#1ce8ff'},
                {offset: 1, color: '#0079fd'}
              ])
            },
            data: [10, 20, 30, 40, 50, 60, 10, 20, 30, 40, 50, 60],
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
