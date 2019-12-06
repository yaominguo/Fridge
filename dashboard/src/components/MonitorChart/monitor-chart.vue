<template>
  <div class="chart" ref="chart"/>
</template>

<script>
export default {
  name: 'CommonChart',
  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
    showLegend: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Object,
      default() {
        return {
          colors: null,
          grid: {},
          legend: {},
          tooltip: {},
          xAxis: {},
          yAxis: {},
        }
      }
    },
  },
  mounted() {
    if (this.data.length > 0) {
      this.$nextTick(this.init)
    }
  },
  methods: {
    init() {
      const chart = this.$echarts.init(this.$refs.chart)
      chart.setOption(this.config)
    }
  },
  computed: {
    config() {
      const options = {}
      const colors = this.options.colors || ['#21640D', '#2F8B14', '#71C012', '#FFCE34', '#F47C1F']

      options.grid = Object.assign(this.defaultOptions.grid, this.options.grid)
      options.tooltip = Object.assign(this.defaultOptions.tooltip, this.options.tooltip)
      if(this.showLegend) {
        options.legend = Object.assign(this.defaultOptions.legend, this.options.legend)
        if (this.options.series.type === 'pie') {
          options.color = this.options.color || colors
          options.series = [this.options.series]
          options.series[0].data = options.legend.data = this.data
          return options
        }
        options.legend.data = this.data.map(item => item.name)
      }
      options.xAxis = Object.assign(this.defaultOptions.xAxis, this.options.xAxis)
      options.yAxis = Object.assign(this.defaultOptions.yAxis, this.options.yAxis)
      console.log(this.data)

      options.series = this.data.map((item, index) => {
        let color = colors[index]
        if (Array.isArray(color)) {
          color = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: color[0]},
            {offset: 1, color: color[1]}
          ])
        }
        const result = {
          name: item.name,
          barWidth: '50%',
          itemStyle: { color },
          data: item.data || []
        }
        if (this.options.series) {
          return Object.assign(result, this.options.series)
        }
        return result
      })
      return options
    },
    defaultOptions() {
      return {
        grid: {
          top: '25%',
          left: '3%',
          right: '3%',
          bottom: '5px',
          width: 'auto',
          height: 'auto',
          containLabel: true,
        },
        legend: {
          top: '5%',
          left: '6%',
          width: '100%',
          data: [],
          itemWidth: 15,
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
          data: [],
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
          nameTextStyle: {
            color: '#fff',
            fontSize: this.fontSize,
          },
          type: 'value',
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
      }
    },
    fontSize() {
      // return Math.floor(window.innerWidth / 100) - 1
      return Math.floor(screen.height * 1.48 / 100)
    },
  },
  watch: {
    data(cur, past) {
      console.log('sss', cur, past)

      if (cur && cur !== past && cur.length > 0) {
        this.init()
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
  .chart
    height 100%
    width 100%
</style>
