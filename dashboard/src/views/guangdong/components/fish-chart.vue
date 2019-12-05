// 产业布局分析专题 - 各品种鱼苗数量
<template>
<div class="wrapper">
  <div class="chart" ref="chart" />
  <Select v-model="theme" class="select" size="small">
    <Option v-for="item in themes" :value="item" :key="item">{{ item }}</Option>
  </Select>
</div>
</template>

<script>
export default {
  name: 'FishChart',
  data() {
    return {
      theme: '淡水鱼',
      themes: ['淡水鱼', '海水鱼'],
      dates: ['2014年', '2015年', '2016年', '2017年', '2018年'],
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const chart = this.$echarts.init(this.$refs.chart)
      const options = {
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
          data: this.themes,
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
          data: this.dates,
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
          name: '(亿尾)',
          nameTextStyle: {
            color: '#fff',
            fontSize: this.fontSize,
          },
          type: 'value',
          interval: 200,
          min: 8000,
          max: 9000,
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
            itemStyle: {
              shadowColor: '#0076FF',
              shadowBlur: 6,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: '#1FECFF'},
                {offset: 1, color: '#0076FF'}
              ])
            },
            data: [8700,8300,8500,8400,8300],
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
.wrapper
  position relative
  width 100%
  height 100%
  .chart
    height 100%
    width 100%
  .select
    position absolute
    top 1rem
    right 1rem
    width 8rem
</style>
