<template>
  <div id="container"/>
</template>

<script>
const {AMap} = window
export default {
  name: 'Map3D',
  data() {
    return {
      map: null,
      buildingOptions: {
        hideWithoutStyle:false,//是否隐藏设定区域外的楼块
        areas:[
          { //围栏1
            //visible:false,//是否可见
            rejectTexture:true,//是否屏蔽自定义地图的纹理
            color1: 'ff99ff00',//楼顶颜色
            color2: 'ff999900',//楼面颜色
            path: [
              [121.498447,31.217582],
              [121.498466,31.218851],
              [121.497402,31.218943],
              [121.497423,31.217595],
            ]
          },
          {
            rejectTexture:true,//是否屏蔽自定义地图的纹理
            color1: 'ffcc0000',//楼顶颜色
            color2: 'ffaa0000',//楼面颜色
            path: [
              [121.497898,31.217932],
              [121.498456,31.217945],
              [121.498445,31.218445],
              [121.49791,31.218376],
            ]
          },
          {
            rejectTexture:true,//是否屏蔽自定义地图的纹理
            color1: 'ffffff00',//楼顶颜色
            color2: 'ffffcc00',//楼面颜色
            path: [
              [121.498696,31.218295],
              [121.498679,31.217744],
              [121.499197,31.217747],
              [121.499243,31.218324],
            ]
          },
        ]
      },

    }
  },
  mounted() {
    this.$nextTick(this.initMap)
  },
  methods: {
    initMap() {
      const buildingLayer = new AMap.Buildings({zIndex:130,merge:false,sort:false,zooms:[17,20]})
      buildingLayer.setStyle(this.buildingOptions)

      this.map = new AMap.Map('container', {
        resizeEnable: true,
        rotateEnable:true,
        pitchEnable:true,
        showLabel: false,
        zoom: 17,
        pitch:50,
        rotation:45,
        viewMode:'3D',//开启3D视图,默认为关闭
        buildingAnimation:true,//楼块出现是否带动画
        expandZoomRange:true,
        zooms:[17,20],
        center:[121.497915,31.218138],

        showIndoorMap:false,
        // mapStyle:'amap://styles/light',
        features:['bg','point','road'],
        layers:[
          new AMap.TileLayer({}),
          buildingLayer
        ]
      })

      this.map.on('click', e => {
        const location = [e.lnglat.getLng(), e.lnglat.getLat()]
        this.map.setZoomAndCenter(18.8, location)
        console.log(e, e.lnglat.getLng() + ',' + e.lnglat.getLat())
        this.showDetail(e, location)
      })

      this.map.addControl(new AMap.ControlBar({
        showZoomBar:false,
        showControlButton:true,
        position:{
          right:'10px',
          top:'10px'
        }
      }))

      new AMap.Polygon({
        bubble:true,
        fillColor: 'blue',
        fillOpacity:0.2,
        strokeWeight:1,
        path:this.buildingOptions.areas[0].path,
        map:this.map
      })
      // new AMap.Polygon({
      //   bubble:true,
      //   fillOpacity:0.2,
      //   strokeWeight:1,
      //   path:this.buildingOptions.areas[1].path,
      //   map:this.map
      // })

    },
    showDetail(e, location) {
      // TODO
      const infoWindow = new AMap.InfoWindow({
        content: `
            <div>
              <b>测试建筑物</b>
              <p>电话 : 021-1234567   邮编 : 200000</p>
            </div>
          `
      })
      infoWindow.open(this.map, location)
    },
  },
}
</script>

<style lang="stylus" scoped>
#container
  width 100%
  height 100%
  resize both
</style>
<style lang="stylus">
.amap-logo
.amap-copyright
  display none !important
</style>
