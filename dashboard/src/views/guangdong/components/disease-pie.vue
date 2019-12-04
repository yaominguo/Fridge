// 疫病灾害分析专题 - 灾害情报
<template>
  <div class="chart" ref="chart"/>
</template>

<script>
import { log } from 'util'
export default {
  name: 'DiseaseTrend',
  data() {
    return {
      data: [
        {name: '广州市', value: 14, icon: 'circle'},
        {name: '韶关市', value: 6, icon: 'circle'},
        {name: '深圳市', value: 6, icon: 'circle'},
        {name: '珠海市', value: 19, icon: 'circle'},
        {name: '汕头市', value: 9, icon: 'circle'},
        {name: '佛山市', value: 3, icon: 'circle'},
        {name: '江门市', value: 10, icon: 'circle'},
        {name: '湛江市', value: 7, icon: 'circle'},
        {name: '茂名市', value: 6, icon: 'circle'},
        {name: '肇庆市', value: 4, icon: 'circle'},
        {name: '惠州市', value: 4, icon: 'circle'},
        {name: '梅州市', value: 12, icon: 'circle'},
      ],
      color: ['#5BD5FF','#3391FF','#005ECC','#71C012','#589C20','#F47C1F','#FF9D27','#FFCE34','#FF8080','#CC4D4D','#C15CFF','#8400FF']
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const chart = this.$echarts.init(this.$refs.chart)
      const options = {
        legend: {
          orient: 'vertical',
          y: 'center',
          left: '50%',
          height: '80%',
          textStyle: {
            color: '#ccc',
            fontSize: this.fontSize,
          },
          formatter: name => {
            const item = this.data.find(el => el.name === name)
            return `${name} ${item.value}%`
          },
          data: this.data,
        },
        tooltip: {
          trigger: 'item',
        },
        color: this.color,
        series: [
          {
            type: 'pie',
            label: {
              show: false,
            },
            center: ['25%', '50%'],
            data: this.data,
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
