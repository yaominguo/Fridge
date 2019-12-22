<template>
  <div id="container" :style="`background-image: url(${require('@/assets/images/stars-bg.png')})`">
    <ThemeTitle class="theme">广东省渔业企业介绍专题</ThemeTitle>
    <template v-if="enterpriseList.length>0">
      <div v-for="(enterprise,i) in enterpriseList" :key="enterprise.name + i" :class="index == i ? `box box${i + 1} cur` : `box box${i + 1}`" @mouseenter="showOne(i)" @mouseleave="startTimer">
        <m-card mode="2" :title="enterprise.name">
          <EnterpriseCard :enterprise="enterprise" />
        </m-card>
      </div>
      <div class="box7">
        <m-card mode="2" title="产品信息">
          <EnterpriseCard mode="complete" :enterprise="enterpriseList[index]" />
        </m-card>
      </div>
    </template>
  </div>
</template>

<script>
import ThemeTitle from './components/title'
import EnterpriseCard from './components/enterprise-card'
import axios from 'axios'
export default {
  name: 'Enterprise',
  components: {
    ThemeTitle,
    EnterpriseCard
  },
  data() {
    return {
      index: 0,
      enterpriseList: [],
      timerHanlder:null,
      timeInterval:5000
    }
  },
  mounted() {
    this.getData()
  },
  beforeDestroy() {
    clearInterval(this.timerHanlder)
  },
  methods: {
    getData() {
      axios.get(this.$api.FILE_URL + 'gd-enterprise.json').then(res => {
        this.enterpriseList = res.data.enterprise
        this.startTimer()
      })
    },
    showOne(index){
      clearInterval(this.timerHanlder)
      this.index = index
    },
    startTimer(){
      this.timerHanlder = setInterval(this.changeEnterprise, this.timeInterval)
    },
    changeEnterprise(){
      this.index += 1
      if (this.index >= this.enterpriseList.length) {
        this.index = 0
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
#container
  $gd-layout()
  grid-template-areas \
    '. theme .'\
    'box1 box7 box2'\
    'box3 box7 box4'\
    'box5 box7 box6'
  grid-template-rows 4rem 1fr 1fr 1fr
  grid-template-columns 1fr 2fr 1fr
  .theme
    grid-area theme
    width 80%
  .box
    opacity 0.3
    &.cur
      opacity 1
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
  .box7
    grid-area box7
</style>
