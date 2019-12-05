<template>
  <div id="container" :style="`background-image: url(${require('@/assets/images/stars-bg.png')})`">
    <GuangdongMap />
    <ThemeTitle style="width: 200%;">渔业种业综合交易平台交易分析专题</ThemeTitle>
    <div class="box1">
      <m-card mode="2" title="排名">
        <DataList :list="list1"/>
      </m-card>
    </div>
    <div class="box2">
      <m-card mode="2" title="各品种成交均价">
        <ProgressList :list="list2"/>
      </m-card>
    </div>
    <div class="box3">
      <m-card mode="2" title="采购供应数据">
        <m-chart :options="options1" :data="data1" />
      </m-card>
    </div>
    <div class="box4">
      <m-card mode="2" title="累计违规举报次数">
        <m-chart :showLegend="false" :options="options2" :data="data2" />
      </m-card>
    </div>
  </div>
</template>

<script>
import DataList from './components/list'
import ProgressList from './components/progress-list'
import ThemeTitle from './components/title'
import GuangdongMap from './components/map'
export default {
  name: 'GDProduction',
  components: {
    DataList,
    ProgressList,
    ThemeTitle,
    GuangdongMap,
  },
  data() {
    return {
      list1: [
        {name: '淡水鱼苗', value: 8279, unit: '亿尾'},
        {name: '淡水鱼种', value: 222544, unit: '吨'},
        {name: '投放鱼种', value: 193027, unit: '吨'},
        {name: '稚鳖', value: 6549, unit: '万只'},
        {name: '稚龟', value: 655, unit: '万只'},
        {name: '鳗苗捕捞', value: 43, unit: '千克'},
        {name: '海水鱼苗', value: 508510, unit: '万尾'},
        {name: '虾类育苗', value: 5455, unit: '万尾'},
        {name: '贝类育苗', value: 293678, unit: '万尾'},
        {name: '海带', value: 100, unit: '亿株'},
        {name: '紫菜', value: 0.06, unit: '亿株'},
        {name: '海参', value: 0.09, unit: '亿头'},
      ],
      list2: [
        {name: '淡水鱼苗', value: 15, unit: '元/斤'},
        {name: '淡水鱼种', value: 12, unit: '元/斤'},
        {name: '投放鱼种', value: 29, unit: '元/斤'},
        {name: '稚鳖', value: 21, unit: '元/斤'},
        {name: '稚龟', value: 15, unit: '元/斤'},
        {name: '鳗苗捕捞', value: 11, unit: '元/斤'},
        {name: '海水鱼苗', value: 19, unit: '元/斤'},
        {name: '虾类育苗', value: 9, unit: '元/斤'},
        {name: '贝类育苗', value: 21, unit: '元/斤'},
        {name: '海带', value: 28, unit: '元/斤'},
        {name: '紫菜', value: 4, unit: '元/斤'},
        {name: '海参', value: 200, unit: '元/斤'},
      ],
      options1: {
        colors: [['#1FECFF', '#0076FF'], ['#c16ad6', '#3725b2']],
        legend: {
          top: 20,
          right: 10,
          left: 'auto',
        },
        xAxis: {
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        },
        yAxis: {
          name: '(吨)',
          interval: 2000,
        },
        series: {
          type: 'bar',
          barWidth: '30%',
          barGap: 0,
        }
      },
      data1: [
        {name: '供应数据', data: [6500, 8500, 6000, 4600, 5600, 8500, 6000, 2500, 4500, 6500, 4500, 8000]},
        {name: '采购数据', data: [5500, 9000, 5000, 3600, 4600, 7500, 7000, 3500, 5500, 7500, 5500, 6700]},
      ],
      options2: {
        xAxis: {
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        },
        yAxis: {
          name: '(次)',
          interval: 20,
        },
        series: {
          type: 'bar',
          itemStyle: {
            shadowColor: '#0076FF',
            shadowBlur: 6,
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: '#1FECFF'},
              {offset: 1, color: '#0076FF'}
            ])
          },
        }
      },
      data2: [
        {data: [30, 50, 10, 60, 70, 40, 50, 70, 30, 50, 90, 58]},
      ],
    }
  },
}
</script>

<style lang="stylus" scoped>
#container
  $gd-layout()
  grid-template-areas \
    'box1 . . box2'\
    'box1 . . box2'\
    'box3 box3 box4 box4'
  grid-template-rows 1fr 1fr 1fr
  grid-template-columns 1fr 1.2fr 1.2fr 1fr
  .box1
    grid-area box1
  .box2
    grid-area box2
  .box3
    grid-area box3
  .box4
    grid-area box4
</style>
