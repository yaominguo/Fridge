<template>
  <div id="container" :style="`background-image: url(${require('@/assets/images/stars-bg.png')})`">
    <ThemeTitle class="theme">广东省产业布局分析专题</ThemeTitle>
    <div class="box1">
      <m-card mode="2" title="渔业经济产值">
        <m-chart :options="options1" :data="data1"/>
      </m-card>
    </div>
    <div class="box2">
      <m-card mode="2" title="渔业经济产量">
        <m-chart :options="options2" :data="data2"/>
      </m-card>
    </div>
    <div class="box3">
      <m-card mode="2" title="渔业加工产量">
        <m-chart :options="options3" :data="data3"/>
      </m-card>
    </div>
    <div class="box4">
      <m-card mode="2" title="各品种鱼苗数量">
        <FishChart />
      </m-card>
    </div>
    <div class="box5">
      <m-card mode="2" title="渔业种业经济产量">
        <m-chart :options="options5" :data="data5"/>
      </m-card>
    </div>
    <div class="box6">
      <m-card mode="2" title="渔业种业经济产值">
        <m-chart :options="options4" :data="data4"/>
      </m-card>
    </div>
  </div>
</template>

<script>
import ThemeTitle from './components/title'
import FishChart from './components/fish-chart'
export default {
  name: 'GDIndustry',
  components: {
    ThemeTitle,
    FishChart,
  },
  data() {
    return {
      options1: {
        xAxis: {
          data: ['2015年', '2016年', '2017年', '2018年'],
        },
        yAxis: {
          name: '(万元)',
          interval: 200,
          max: 1600,
        },
        series: {
          type: 'bar',
          stack: '总量',
        }
      },
      data1: [
        {name: '海水养殖', data: [200,200,200,200]},
        {name: '淡水养殖', data: [500,550,580,600]},
        {name: '海水捕捞', data: [160,160,160,160]},
        {name: '淡水捕捞', data: [100,100,100,100]},
        {name: '水产苗种', data: [200,200,200,200]},
      ],
      options2: {
        xAxis: {
          data: ['2015年', '2016年', '2017年', '2018年'],
        },
        yAxis: {
          name: '(吨)',
          interval: 200,
          max: 1600,
        },
        series: {
          type: 'bar',
          stack: '总量',
        }
      },
      data2: [
        {name: '海水养殖', data: [200,200,200,200]},
        {name: '淡水养殖', data: [500,550,580,600]},
        {name: '海水捕捞', data: [160,160,160,160]},
        {name: '淡水捕捞', data: [100,100,100,100]},
        {name: '水产苗种', data: [200,200,200,200]},
      ],
      options3: {
        colors: ['#F47C1F', '#71C012', '#FFCE34'],
        grid: {
          right: '5%',
        },
        xAxis: {
          data: ['2015年', '2016年', '2017年', '2018年'],
          boundaryGap: false,
        },
        yAxis: {
          name: '(吨)',
          interval: 100,
          max: 400,
        },
        series: {
          type: 'line',
          stack: '总量',
          areaStyle: {},
          symbol: 'circle',
        }
      },
      data3: [
        {name: '水产加工品总量', data: [130,140,150,145]},
        {name: '淡水加工品总量', data: [110,120,100,110]},
        {name: '海水加工品总量', data: [60,70,80,50]},
      ],
      options4: {
        colors: ['#F47C1F', '#71C012', '#FFCE34'],
        xAxis: {
          data: ['2015年', '2016年', '2017年', '2018年'],
        },
        yAxis: {
          name: '(万元)',
          interval: 200,
          max: 1600,
        },
        series: {
          type: 'bar',
          stack: '总量',
          areaStyle: {},
          symbol: 'circle',
        }
      },
      data4: [
        {name: '渔业产值', data: [200,200,200,200]},
        {name: '渔业工业和建筑业', data: [500,550,580,600]},
        {name: '渔业流通和服务业', data: [160,160,160,160]},
      ],
      options5: {
        colors: ['#347122', '#C13636', '#F47C1F', '#940BC3', '#0076FF'],
        grid: {
          right: '5%',
        },
        xAxis: {
          data: ['2015年', '2016年', '2017年', '2018年'],
          boundaryGap: false,
        },
        yAxis: {
          name: '(吨)',
          interval: 100,
          min: 200,
          max: 900,
        },
        series: {
          type: 'line',
          stack: '总量',
          symbol: 'circle',
        }
      },
      data5: [
        {name: '海水养殖', data: [250,300,350,300]},
        {name: '海水捕捞', data: [130,140,150,145]},
        {name: '淡水养殖', data: [110,120,100,110]},
        {name: '淡水捕捞', data: [60,70,80,50]},
        {name: '远洋渔业', data: [160,170,80,150]},
      ],
    }
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
