<template>
  <div id="container" :style="`background-image: url(${require('@/assets/images/stars-bg.png')})`">
    <ThemeTitle class="theme">广东省罗非鱼专题</ThemeTitle>
    <div class="box1">
      <m-card mode="2" title="2019罗非鱼各规格均价(元)">
        <FishList :list="fishList"/>
      </m-card>
    </div>
    <div class="box2">
      <m-card mode="2" title="罗非鱼生产加工数量趋势(万吨)">
        <m-chart :options="options" :data="data"/>
      </m-card>
    </div>
    <div class="box3">
      <m-card mode="2" title="罗非鱼国内外价格走势(元/斤)">
        <m-chart :options="options1" :data="data1"/>
      </m-card>
    </div>
    <div class="box4">
      <m-card mode="2" title="2019罗非鱼各规格趋势">
        <m-chart :options="options2" :data="data2"/>
      </m-card>
    </div>
    <div class="box5">
      <m-card mode="2" title="各规格罗非鱼价格比对">
        <m-chart :options="options3" :data="data3"/>
        <Select v-model="curType" class="select" size="small" @on-change="handleSelect">
          <Option v-for="item in types" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </m-card>
    </div>
  </div>
</template>

<script>
import ThemeTitle from './components/title'
import FishList from './components/fish-list'
import axios from 'axios'
export default {
  name: 'GDFish',
  components: {
    ThemeTitle,
    FishList,
  },
  data() {
    return {
      types: ['0.6-1斤', '1斤以上', '1.2斤以上'],
      curType: '0.6-1斤',
      options: {
        colors: ['#1fecff', 'gold'],
        legend: {
          top: '15%',
          left: '70%',
        },
        grid: {
          bottom: '10%',
        },
        xAxis: {
          data: [],
        },
        yAxis: {
          name: '(万吨)',
        },
        series: {
          type: 'bar',
          barWidth: '40%',
          stack: '总量',
        }
      },
      data: [],
      fishList: [],
      options1: {
        colors: ['#71C012', '#FFCE34', '#F47C1F'],
        legend: {
          // top: '2%',
          top: '15%',
          left: '35%',
        },
        grid: {
          right: '5%',
          bottom: '10%',
        },
        xAxis: {
          data: [],
          boundaryGap: false,
        },
        yAxis: {
          name: '(元/斤)',
        },
        series: {
          type: 'line',
          stack: '总量',
          areaStyle: {
            opacity: 0.5,
          },
          symbol: 'circle',
        }
      },
      data1: [],
      options2: {
        colors: ['#71C012', '#1fecff', '#F47C1F'],
        legend: {
          left: '60%'
        },
        xAxis: {
          data: [],
          boundaryGap: false,
        },
        yAxis: {
          name: '(元)',
        },
        series: {
          type: 'line',
          symbol: 'circle',
        }
      },
      data2: [],
      options3: {
        colors: ['#71C012', '#1fecff', '#F47C1F'],
        legend: {
          left: '45%'
        },
        xAxis: {
          data: [],
          boundaryGap: false,
        },
        yAxis: {
          name: '(元)',
        },
        series: {
          type: 'line',
          symbol: 'circle',
        }
      },
      data3: [],
      comparisonData: [],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      axios.get(this.$api.FILE_URL + 'gd-fish.json').then(res => {
        const {comparison, processTrend, priceTrend, comparison1, comparison2, comparison3} = res.data
        this.fishList = comparison.name.map((item, index) => {
          return {
            name: item,
            one: comparison.value[0].data[index],
            two: comparison.value[1].data[index],
            three: comparison.value[2].data[index],
          }
        })
        this.options.xAxis.data = processTrend.name
        this.data = processTrend.value
        this.options1.xAxis.data = priceTrend.name
        this.data1 = priceTrend.value
        this.options2.xAxis.data = comparison.name
        this.data2 = comparison.value
        this.options3.xAxis.data = comparison1.name
        this.data3 = comparison1.value
        this.comparisonData = [comparison1, comparison2, comparison3]
      })
    },
    handleSelect(type) {
      this.data3 = this.comparisonData[this.types.indexOf(type)].value
    },
  }
}
</script>

<style lang="stylus" scoped>
#container
  $gd-layout()
  grid-template-areas \
    '. theme theme theme theme .'\
    'box1 box1 box2 box2 box3 box3'\
    'box4 box4 box4 box5 box5 box5'
  grid-template-rows 4rem 35rem auto
  grid-template-columns 0.5fr 0.5fr 1fr 0.5fr 1fr 0.5fr
  .theme
    grid-area theme
  .box1
    grid-area box1
  .box2
    grid-area box2
  .box3
    grid-area box3
  .box4
    grid-area box4
  .box5
    grid-area box5
  .select
    position absolute
    top 1rem
    right 1rem
    width 9rem
</style>
