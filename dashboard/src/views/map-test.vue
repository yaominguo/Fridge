<template>
  <div id="map" :style="`background-image: url(${require('@/assets/images/stars-bg.png')})`"/>
</template>

<script>
import china from 'echarts/map/js/china'
import sichuan from 'echarts/map/js/province/sichuan'
import anhui from 'echarts/map/js/province/anhui'

//定义全国省份的数组
let provinces = ['shanghai', 'hebei','shanxi','neimenggu','liaoning','jilin','heilongjiang','jiangsu','zhejiang','anhui','fujian','jiangxi','shandong','henan','hubei','hunan','guangdong','guangxi','hainan','sichuan','guizhou','yunnan','xizang','shanxi1','gansu','qinghai','ningxia','xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen', 'taiwan']

let provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林','黑龙江',  '江苏', '浙江', '安徽', '福建', '江西', '山东','河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门', '台湾']

export default {
  name: 'MapTest',
  mounted() {
    this.$nextTick(() => {
      const data = [
        { name: '北京', value: 177 },
        { name: '天津', value: 42 },
        { name: '河北', value: 102 },
        { name: '山西', value: 81 },
        { name: '内蒙古', value: 17 },
        { name: '辽宁', value: 67 },
        { name: '吉林', value: 182 },
        { name: '黑龙江', value: 100 },
        { name: '上海', value: 24 },
        { name: '江苏', value: 299 },
        { name: '浙江', value: 114 },
        { name: '安徽', value: 29 },
        { name: '福建', value: 316 },
        { name: '江西', value: 91 },
        { name: '山东', value: 19 },
        { name: '河南', value: 137 },
        { name: '湖北', value: 26 },
        { name: '湖南', value: 114 },
        { name: '重庆', value: 91 },
        { name: '四川', value: 25 },
        { name: '贵州', value: 62 },
        { name: '云南', value: 83 },
        { name: '西藏', value: 9 },
        { name: '陕西', value: 80 },
        { name: '甘肃', value: 256 },
        { name: '青海', value: 10 },
        { name: '宁夏', value: 18 },
        { name: '新疆', value: 67 },
        { name: '广东', value: 123 },
        { name: '广西', value: 59 },
        { name: '海南', value: 14 }
      ]
      // 初始化echarts
      let map = this.$echarts.init(document.getElementById('map'))
      // console.log(map)

      // 定义初始加载的地图区域,中国地图
      let selected = 'china'

      var geoCoordMap = {}
      var max = 480,
        min = 9 // todo
      var maxSize4Pin = 100,
        minSize4Pin = 20
      var mapFeatures = this.$echarts.getMap(selected).geoJson.features
      // myChart.hideLoading();
      mapFeatures.forEach(function(v) {
        // 地区名称
        var name = v.properties.name
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp
      })

      var convertData = function(data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            })
          }
        }
        return res
      }

      const config = {
        visualMap: {
          show: false,
          min: 0,
          max: 200,
          calculable: true,
          inRange: {
            opacity: 0.3,
            color: ['rgba(91, 213, 255, 0.1)', 'rgba(91, 213, 255, 0.2)', 'rgba(91, 213, 255, 0.3)', 'rgba(91, 213, 255, 0.4)', 'rgba(91, 213, 255, 0.5)']
            // color: ['#3B5077', '#031525'] // 蓝黑
            // color: ['#ffc0cb', '#800080'] // 红紫
            // color: ['#3C3B3F', '#605C3C'] // 黑绿
            // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
            // color: ['#23074d', '#cc5333'] // 紫红
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#1488CC', '#2B32B2'] // 浅蓝
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
          }
        },
      }
      // 定义加载地图的方法
      // 参数为要显示地图区域的名字
      let loadMap = (param) => {
        config.geo = {
          // map: 'china' | '四川'
          // 必须要先引入了对应地图的js文件或者json文件，在这一步的时候，echarts会自动将对应的JS文件注入，地图才会显示.
          map: param,
          // regions: [{
          //   name: '江苏',
          //   selected: true,
          //   itemStyle: {
          //     areaColor: '#5ad4ff',
          //     color: 'red',
          //     shadowColor: 'rgba(0, 0, 0, 1)',
          //     shadowBlur: 10,
          //     shadowOffsetY: 10,
          //     shadowOffsetX: -5,
          //   }
          // }],
          itemStyle: {
            normal: {
              areaColor: 'rgba(0, 191, 255, 0.1)',
              borderColor: 'rgba(0, 191, 255, 0.6)',
              borderWidth: 0.4,
              // shadowColor: 'rgba(0, 0, 0, 0.5)',
              // shadowBlur: 10,
              // shadowOffsetY: 10,
              // shadowOffsetX: 10,
            },
            emphasis: {
              areaColor: '#5ad4ff',
              color: '#fff'
            }
          }
        },
        config.series = [
          {
            type: 'map',
            map: param,
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            roam: true,
            animation: false,
            data: data
          },
        ]
        map.setOption(config)
      }

      // 第一次加载地图
      loadMap(selected)

      // 判断当前要加载的地图是不是省？
      let isProvince = (name) => {
        return provincesText.some((province) => {
          return province === name
        })
      }

      // 定义方法加载某个省的地图文件
      let loadScriptMap = (name, callback) => {
        // 获取这个省的拼音名字 name = '四川' => pinyinName = 'sichuan'
        let pinyinName = provinces[provincesText.indexOf(name)]
        console.log(pinyinName)
        // 引入这个对应的地图JS，如果是在项目中要打包，请将这些文件提取出来，放在静态资源中
        // build的时候这些文件不会被打包，无可加载资源地图是不会显示的！！！！
        let currentMap = require(`echarts/map/js/province/${pinyinName}`)
        callback(name)
      }

      // 监听地图点击事件
      map.on('click', (ev) => {
        console.log(ev)
        ev.selected = true
        config.geo.regions = [{
          name: ev.data.name,
          selected: true,
          itemStyle: {
            areaColor: '#5ad4ff',
            color: 'red',
            shadowColor: 'rgba(0, 0, 0, 1)',
            shadowBlur: 10,
            shadowOffsetY: 10,
            shadowOffsetX: -5,
          }
        }]
        config.series[1] = {
          name: '点',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbol: 'pin', //气泡
          symbolSize: function(val) {
            var a = (maxSize4Pin - minSize4Pin) / (max - min)
            var b = minSize4Pin - a * min
            b = maxSize4Pin - a * max
            return a * val[2] + b
          },
          label: {
            normal: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: 9
              }
            }
          },
          itemStyle: {
            normal: {
              color: '#F62157' //标志颜色
            }
          },
          zlevel: 106,
          data: convertData([ev.data])
        }
        map.setOption(config)

        // // 如果点击的是一个省，那就切换到这个省的地图
        // if (isProvince(ev.name)) {
        //   selected = ev.name
        //   console.log(selected)
        //   // 从外部加载这个省的地图文件
        //   loadScriptMap(ev.name, loadMap)
        // } else {
        //   // 否则切换中国地图
        //   selected = 'china'
        //   loadMap(selected)
        // }
      })
    })
  },
}
</script>

<style lang="stylus" scoped>
#map
  width 100%
  height 100%
  background-size cover
  background-position center
  background-color #061627
</style>
