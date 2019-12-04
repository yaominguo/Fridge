// 生产专题 - 各品种养殖/出塘数据
<template>
  <div class="chart" ref="chart"/>
</template>

<script>
export default {
  name: 'ProductionChart',
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const chart = this.$echarts.init(this.$refs.chart)
      const options = {
        grid: {
          top: '50px',
          left: '80px',
          right: '80px',
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
          data: ['淡水育苗', '淡水鱼种', '投放鱼种', '稚鳖', '稚龟', '鳗苗捕捞', '海水鱼苗', '虾类育苗', '贝类育苗', '海带', '紫菜', '海参'],
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
            type: 'bar',
            barWidth: '50%',
            barGap: 0,
            itemStyle: {
              shadowColor: '#0076FF',
              shadowBlur: 6,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: '#1FECFF'},
                {offset: 1, color: '#B645FF'}
              ])
            },
            data: [6500, 8500, 6000, 4600, 5600, 8500, 6000, 2500, 4500, 6500, 4500, 8000],
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
