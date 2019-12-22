<template>
  <div id="container" :style="`background-image: url(${require('@/assets/images/stars-bg.png')})`">
    <ThemeTitle class="theme">操作流程</ThemeTitle>
    <div class="box">
      <div v-for="(item, index) in list" :key="item.name" :class="`dot dot${index + 1}`" @mouseenter="showOne(index)" @mouseleave="startMove">
        <span v-if="index > 5 && index != cur"/>
        <img v-else-if="index > 5 && index == cur" src="@/assets/images/flow-point.png"/>
        <p :class="cur == index ? 'on' : '' ">{{item.name}}</p>
        <span v-if="index <= 5 && index != cur"/>
        <img v-else-if="index <= 5 && index == cur" src="@/assets/images/flow-point.png"/>
      </div>
      <div class="outer">
        <span class="move-dot"/>
        <div class="repair top" />
        <div class="repair bottom" />
        <div class="inner">
          <div class="detail" :style="`background-image: url(${require('@/assets/images/flow-card-bg.png')})`">
            <img v-for="(img, i) in ((list[cur] && list[cur].imgs) || []) " :key="i" :src="require(`@/assets/images/screenshots/${img}.png`)" />
          </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import ThemeTitle from './components/title'
export default {
  name: 'GDFlow',
  components: {
    ThemeTitle,
  },
  data() {
    return {
      list: [
        {
          name: '养殖者注册',
          imgs: ['1-1', '1-2', '1-3'],
        },
        {
          name: '原良种实名认证',
          imgs: ['2-1', '2-2'],
        },
        {
          name: '发布供应信息',
          imgs: ['3-1'],
        },
        {
          name: '平台展示供应信息',
          imgs: ['4-1', '4-2', '4-3']
        },
        {
          name: '养殖业者下单',
          imgs: ['5-1']
        },
        {
          name: '原良种企业确认订单',
          imgs: ['6-1']
        },
        {
          name: '养殖业者支付订单',
          imgs: ['7-1']
        },
        {
          name: '原良种企业发货',
          imgs: ['8-1']
        },
        {
          name: '养殖业者确认收货',
          imgs: ['9-1']
        },
        {
          name: '原良种收款',
          imgs: ['10-1']
        },
        {
          name: '养殖业者订单评论',
          imgs: ['11-1', '11-2']
        },
      ],
      cur: 0,
      timer: null,
    }
  },
  mounted() {
    this.startMove()
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    showOne(i) {
      clearInterval(this.timer)
      this.cur = i
    },
    startMove() {
      this.timer = setInterval(() => {
        this.cur += 1
        if (this.cur >= this.list.length) {
          this.cur = 0
        }
      }, 4000)
    },
  }
}
</script>

<style lang="stylus" scoped>
#container
  $gd-layout()
  grid-template-areas \
    '.theme.'\
    'box box box'
  grid-template-rows 4rem 1fr
  grid-template-columns 1fr 1fr 1fr
  .theme
    grid-area theme
    width 100%
  .box
    grid-area box
    display flex
    align-items center
    justify-content center
    position relative
    .dot
      position absolute
      height 4rem
      top 4.8%
      display flex
      flex-direction column
      justify-content space-around
      align-items center
      z-index 10
      cursor pointer
      &.dot1
        left 15%
      &.dot2
        left 26%
      &.dot3
        left 39%
      &.dot4
        left 50%
      &.dot5
        left 64%
      &.dot6
        left 75%
      &.dot7
        top 88%
        left 75%
      &.dot8
        top 88%
        left 60%
      &.dot9
        top 88%
        left 45%
      &.dot10
        top 88%
        left 30%
      &.dot11
        top 88%
        left 15%
      >span
        display block
        padding 0.2rem
        margin 0.5rem 0
        width 1rem
        height 1rem
        background $color-map(1)
        border-radius 50%
        box-shadow 0 0 0 0.2rem #000, 0 0 0.8rem 0.2rem $color-map(1)
      >img
        width 3rem
        height 3rem
        animation shine 2s reverse linear infinite
      >p
        color #fff
        font-family $font-pang
        font-size 1.2rem
        &.on
          color $color-map(1)
          font-size 1.5rem
          text-shadow 0.1rem 0.1rem 0.3rem $color-map(0.8)
    .outer
      width 80rem
      height 45rem
      border 0.1rem solid $color-map(0.3)
      border-left none
      padding 0.5rem
      position relative
      overflow hidden
      .repair
        width 0.5rem
        height 0.7rem
        position absolute
        left 0
        border 0.1rem solid $color-map(0.3)
        border-right none
        &.top
          top -0.1rem
        &.bottom
          bottom -0.1rem
      .move-dot
        position absolute
        display block
        width 20rem
        height 0.2rem
        background linear-gradient(to right, #0094ff, #1efbff, #fff, #1efbff, #0094ff)
        box-shadow 0 0 1rem 0.8rem $color-map(0.3)
        animation move 4s ease-in-out infinite
      .inner
        width 100%
        height 100%
        border 0.1rem solid $color-map(0.3)
        border-left none
        display flex
        align-items center
        justify-content center
        .detail
          display flex
          justify-content space-around
          width 80%
          height 80%
          background-size 100% 100%
          padding 2rem
          >img
            width 30%
            height 100%

@keyframes move {
  0% {
    top 0.2rem
    left -100%
    transform rotate(0)
  }
  71% {
    top 0.2rem
    left 0
    transform rotate(0)
  }
  80% {
    top 0.2rem
    left 80rem
    transform rotate(0)
  }
  81% {
    left 69.6rem
    top 0.2rem
    transform rotate(90deg)
  }
  90% {
    left 69.6rem
    top 99%
    transform rotate(90deg)
  }
  91% {
    left 80rem
    top 99%
    transform rotate(180deg)
  }
  100% {
    left 0
    top 99%
    transform rotate(180deg)
  }
}
@keyframes shine {
  0% {
    transform scale(1)
  }
  50% {
    transform scale(1.5)
  }
  100% {
    transform scale(1)
  }
}
</style>
