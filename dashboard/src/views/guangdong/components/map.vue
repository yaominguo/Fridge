<template>
<div class="map-wrapper">
  <div id="map" />
  <div v-if="data.length > 0" class="visualmap">
    <p>高</p>
    <div class="bar" />
    <p>低</p>
  </div>
</div>
</template>

<script>
import guangdong from 'echarts/map/json/province/guangdong.json'
export default {
  name: 'GuangdongMap',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      locations: [],
      testData: [
        {name: 'test', value: [114.280637, 24.125178]},
        {name: 'test', value: [113.280637, 23.125178]},
        {name: 'test', value: [112.280637, 22.125178]},
        {name: 'test', value: [111.180637, 22.125178]},
        {name: 'test', value: [112.280637, 24.125178]},
        {name: 'test', value: [115.280637, 23.125178]},
        {name: 'test', value: [115.980637, 23.125178]},
        {name: 'test', value: [114.780637, 24.125178]},
      ],
      config: {},
      map: null,
      mapName: 'guangdong',
    }
  },
  mounted() {
    this.$nextTick(this.initMap)
  },
  methods: {
    initMap() {
      // 调整label坐标位置
      guangdong.features.forEach(el => {
        switch (el.properties.name) {
        case '河源市':
          el.properties.cp = [114.897802, 23.946266]
          break
        case '清远市':
          el.properties.cp = [113.051227, 24.185022]
          break
        case '肇庆市':
          el.properties.cp = [112.172529, 23.451546]
          break
        case '云浮市':
          el.properties.cp = [111.844439, 22.829801]
          break
        case '湛江市':
          el.properties.cp = [110.164977, 21.274898]
          break
        case '茂名市':
          el.properties.cp = [110.919229, 21.859751]
          break
        case '阳江市':
          el.properties.cp = [111.775107, 21.959222]
          break
        case '广州市':
          el.properties.cp = [113.580637, 23.325178]
          break
        case '江门市':
          el.properties.cp = [112.694942, 22.190431]
          break
        case '揭阳市':
          el.properties.cp = [116.055733, 23.243778]
          break
        case '潮州市':
          el.properties.cp = [116.832301, 23.761701]
          break
        case '汕尾市':
          el.properties.cp = [115.564238, 22.974485]
          break
        case '东莞市':
          el.properties.cp = [113.846262, 22.946237]
          break
        default:
          break
        }
        this.locations.push({name: el.properties.name, value: el.properties.cp})
      })
      this.$echarts.registerMap(this.mapName, guangdong)
      this.map = this.$echarts.init(document.getElementById('map'))
      this.config = {
        geo: {
          map: this.mapName,
          top: 80,
          label: {
            normal: {
              show: false,
              color: '#fff',
              fontSize: 10,
            },
            emphasis: {
              show: false,
              color: '#fff',
            }
          },
          itemStyle: {
            normal: {
              areaColor: 'rgba(0, 191, 255, 0.1)',
              borderColor: 'rgba(0, 191, 255, 0.6)',
              borderWidth: 0.4,
            },
            emphasis: {
              areaColor: '#5ad4ff',
              color: '#fff'
            }
          },
        },
        series: [
          // {
          //   name: '散点',
          //   type: 'scatter',
          //   coordinateSystem: 'geo',
          //   data: this.testData,
          //   symbolSize: 10,
          //   label: {
          //     normal: {
          //       show: false,
          //     },
          //     emphasis: {
          //       show: true,
          //       formatter: '{b}',
          //       position: 'right',
          //       rotate: 28,
          //     }
          //   },
          //   itemStyle: {
          //     normal: {
          //       color: '#5BD5FF',
          //       shadowColor: '#5BD5FF',
          //       shadowBlur: 2
          //     }
          //   }
          // },
          {
            name: '市',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: this.locations,
            symbolSize: 1,
            label: {
              normal: {
                show: true,
                formatter: '{b}',
                rotate: 28,
                color: '#fff',
                fontSize: this.fontSize,
                shadowColor: '#fff',
                shadowBlur: 2
              },
              emphasis: {
                show: false,
              }
            },
            itemStyle: {
              normal: {
                color: 'transparent',
              }
            }
          },
        ],
      }
      this.map.setOption(this.config)
    },
  },
  computed: {
    fontSize() {
      return Math.floor(window.innerWidth / 100) - 1
    },
  },
  watch: {
    data(cur, past) {
      if (cur && cur !== past && cur.length > 0) {
        this.config.series.push({
          type: 'map',
          map: this.mapName,
          geoIndex: 0,
          data: this.data,
        })
        this.config.visualMap = {
          show: false,
          // min: 0,
          // max: 60000,
          // left: '30%',
          // rotate: 28,
          // id: 'test',
          // text:['High','Low'],
          // realtime: false,
          // calculable: true,
          inRange: {
            color: ['rgba(91, 213, 255, 0.3)', 'rgba(91, 213, 255, 0.8)']
          }
        }
        this.map.setOption(this.config)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.map-wrapper
  width 100%
  height 100%
  position absolute
  #map
    width 100%
    height 100%
    transform rotate(28deg)
  .visualmap
    color #fff
    position: absolute;
    top: 20%;
    left: 30%;
    text-align center
    .bar
      width 2rem
      height 6rem
      background linear-gradient(to bottom, rgba(91, 213, 255, 0.8), rgba(91, 213, 255, 0.3))
</style>
