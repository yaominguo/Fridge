<template>
<div class="main-container" :style="`background-image: url(${require('@/assets/images/bg.jpg')})`">
  <div class="box1">
    <Header/>
  </div>
  <div class="box2">
    <m-card title="项目监控">
      <div style="height: 100%">
        <div style="display: flex;">
          <m-brief label="正常项目" :count="7" unit="个"/>&nbsp;&nbsp;&nbsp;
          <m-brief label="对应收入" :count="7697431" unit="元"/>
        </div>
        <div style="display: flex;">
          <m-brief label="应签未签合同项目" :count="6" unit="个"/>&nbsp;&nbsp;&nbsp;
          <m-brief label="对应收入" :count="6153417" unit="元"/>
        </div>
        <div style="height:80%">
          <Chart2/>
        </div>
      </div>
    </m-card>
  </div>
  <div class="box3">
    <m-card title="收入监控">
      <div class="chart-wrapper"><Chart/></div>
      <div style="height: 45%">
        <p style="color: #ccc;margin-bottom: 0.6rem;">收入组成</p>
        <div style="display: flex;margin-bottom: 0.8rem;"><span style="color: #0eb2ee; width: 15%;text-align: right;">人力制</span> <div style="width: 85%;margin-left: 1rem"><m-progress :percent="percent"/></div></div>
        <div style="display: flex;margin-bottom: 0.8rem;"><span style="color: #0eb2ee; width: 15%;text-align: right;">项目制</span> <div style="width: 85%;margin-left: 1rem"><m-progress :percent="percent"/></div></div>
        <div style="display: flex;margin-bottom: 4rem;"><span style="color: #0eb2ee; width: 15%;text-align: right;">其他收入</span> <div style="width: 85%;margin-left: 1rem"><m-progress :percent="percent"/></div></div>
      </div>
      <div style="text-align: right">
        <m-brief label="人均收入" :count="13417" unit="元"/>
      </div>
    </m-card>
  </div>
  <div class="box4">
    <m-card title="成本监控">
      <div class="chart-wrapper"><Chart2/></div>
      <div style="height: 45%;">
        <p style="color: #ccc;margin-bottom: 0.6rem;">成本组成</p>
        <div style="display: flex;margin-bottom: 0.8rem;"><span style="color: #0eb2ee; width: 15%;text-align: right;">人工成本</span> <div style="width: 85%;margin-left: 1rem"><m-progress :percent="percent"/></div></div>
        <div style="display: flex;margin-bottom: 0.8rem;"><span style="color: #0eb2ee; width: 15%;text-align: right;">报销成本</span> <div style="width: 85%;margin-left: 1rem"><m-progress :percent="percent"/></div></div>
        <div style="display: flex;margin-bottom: 0.8rem;"><span style="color: #0eb2ee; width: 15%;text-align: right;">计提成本</span> <div style="width: 85%;margin-left: 1rem"><m-progress :percent="percent"/></div></div>
        <div style="display: flex;margin-bottom: 0.8rem;"><span style="color: #0eb2ee; width: 15%;text-align: right;">硬件设备</span> <div style="width: 85%;margin-left: 1rem"><m-progress :percent="percent"/></div></div>
        <div style="display: flex;margin-bottom: 0.8rem;"><span style="color: #0eb2ee; width: 15%;text-align: right;">其他成本</span> <div style="width: 85%;margin-left: 1rem"><m-progress :percent="percent"/></div></div>
      </div>
      <div style="text-align: right">
        <m-brief label="人均成本" :count="6167" unit="元"/>
      </div>
    </m-card>
  </div>
  <div class="box5">
    <m-card title="人员监控">
      <div style="display: flex;align-items: center;">
        <div style="width: 0.6rem;height:1rem;background: #1ce8ff;margin: 0.3rem 0.5rem 0;"/>
        <m-brief label="有wbs覆盖" :count="33" unit="人"/>&nbsp;&nbsp;&nbsp;
        <m-brief label="对应成本" :count="4763175" unit="元"/>
      </div>
      <div style="display: flex;align-items: center;">
        <div style="width: 0.6rem;height:1rem;background: #c16ad6;margin: 0.3rem 0.5rem 0;"/>
        <m-brief label="无wbs覆盖" :count="10" unit="人"/>&nbsp;&nbsp;&nbsp;
        <m-brief label="对应成本" :count="3911143" unit="元"/>
      </div>
      <div style="height: 80%">
        <Chart/>
      </div>
    </m-card>
  </div>
  <div class="box6">
    <m-card title="绩效监控">
      <div style="text-align: center;">
        <m-brief style="margin: 0.5rem 0;" label="绩效" :count="3763175" unit="元"/>
        <m-progress :size="20" text-inside :percent="percent" :color="['#0176fe', '#4aecfd']"/>
      </div>
    </m-card>
  </div>
</div>
</template>

<script>
import Chart from './chart'
import Chart2 from './chart2'
import Header from './header'
export default {
  name: 'Main',
  components: {
    Chart,
    Chart2,
    Header,
  },
  data() {
    return {
      percent: 0,
    }
  },
  mounted() {
    setTimeout(() => {
      this.percent = 67
    }, 1000)
  }
}
</script>

<style lang="stylus" scoped>
.main-container
  width 100%
  height 100%
  display grid
  background-size cover
  grid-template-areas \
    'box1 box1 box1'\
    'box2 box3 box4'\
    'box5 box3 box4'\
    'box6 box6 box6'
  grid-template-rows auto 3fr 3fr 2fr
  grid-template-columns 1fr 1fr 1fr
  grid-gap 0.8rem
  padding 1rem
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
.chart-wrapper
  height 40%
  margin-bottom 1rem
  border-bottom $cardBorder
</style>
