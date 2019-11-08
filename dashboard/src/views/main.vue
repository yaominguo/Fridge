<template>
<div class="main-container" :style="`background-image: url(${require('@/assets/images/bg.jpg')})`">
  <div class="box1"><m-card></m-card></div>
  <div class="box2">
    <m-card>
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
          <Chart />
        </div>
      </div>
    </m-card>
  </div>
  <div class="box3"><m-card></m-card></div>
  <div class="box4"><m-card></m-card></div>
  <div class="box5"><m-card><Chart></Chart></m-card></div>
  <div class="box6">
    <m-card title="收入监控">
      <div style="text-align: center;">
        <m-brief style="margin: 0.5rem 0;" label="绩效" :count="3763175" unit="元"/>
        <m-progress :percent="percent" :color="['#0176fe', '#4aecfd']"/>
      </div>
    </m-card>
  </div>
</div>
</template>

<script>
import Chart from './chart'
export default {
  name: 'Main',
  components: {
    Chart,
  },
  data() {
    return {
      percent: 0,
    }
  },
  mounted() {
    setTimeout(() => {
      this.percent = 80
    }, 100)
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
  grid-template-rows 1fr 3fr 3fr 2fr
  grid-template-columns 1fr 1fr 1fr
  grid-gap 1rem
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
</style>
