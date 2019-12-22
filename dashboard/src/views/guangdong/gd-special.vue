<template>
  <div id="container" :style="`background-image: url(${require('@/assets/images/stars-bg.png')})`">
    <ThemeTitle class="theme">广东省渔业特色种苗专题</ThemeTitle>
    <div v-for="(item, index) in fishChartData.value" :key="item.name" :class="`box${1 + index}`">
      <m-card mode="2" :title="`特色品种种苗数量 - ${item.name}`">
        <m-chart :options="getOptions(item)" :data="[item]" :showLegend="false"/>
      </m-card>
    </div>
  </div>
</template>

<script>
import ThemeTitle from './components/title'
import axios from 'axios'
export default {
  name: 'GDSpecial',
  components: {
    ThemeTitle,
  },
  data() {
    return {
      fishChartData: {
        name: [],
        value: [],
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      axios.get(this.$api.FILE_URL + 'gd-industry.json').then(res => {
        const {fishProduction} = res.data
        this.fishChartData = fishProduction
      })
    },
    getOptions(data) {
      return {
        colors: [['#1FECFF', '#0076FF']],
        xAxis: {
          data: this.fishChartData.name,
        },
        yAxis: {
          name: `(${data.unit})`,
        },
        series: {
          type: 'bar',
          barWidth: '40%',
        }
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
#container
  $gd-layout()
  grid-template-areas \
    '. theme .'\
    'box1 box2 box3'\
    'box4 box5 box6'
  grid-template-rows 4rem 1fr 1fr
  grid-template-columns 1fr 1fr 1fr
  .theme
    grid-area theme
    width 120%
    margin-left -10%
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
  .box6
    grid-area box6
</style>
