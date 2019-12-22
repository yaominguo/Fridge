<template>
  <div class="enterprise-card">
    <template v-if="mode == 'simple'">
      <div class="enterprise-card-simple">
        <div class="base simple-base">
          <p class="title">联系方式</p>
          <p class="detail">{{enterprise.address}}</p>
          <p class="detail">{{enterprise.contact}}</p>
        </div>
        <div class="logo simple-logo">
          <img width="60%" :src="$api.FILE_URL+enterprise.logoPath" />
        </div>
      </div>
    </template>
    <template v-if="mode=='complete'">
      <div class="enterprise-card enterprise-card-complete">
        <div class="base complete-base">
          <p class="enterprise-name">{{enterprise.name}}</p>
          <p class="detail">{{enterprise.address}}</p>
          <p class="detail">{{enterprise.contact}}</p>
        </div>
        <div class="logo complete-logo">
          <img width="60%" :src="$api.FILE_URL+enterprise.logoPath" />
        </div>
        <div class="productions">
          <p class="title">主要产品</p>
          <span class="item" v-for="(item,i) in enterprise.productions" :key='i'>{{enterprise.productions[i]}}</span>
        </div>
        <!-- <div class="honors" v-if="enterprise.honors.length>0">
          <p class="title">主要荣誉</p>
          <ul class="list">
            <li class="row" v-for="(honor,j) in enterprise.honors" :key="j">
              <p class="content">{{honor.intro}}</p><p class="time">{{honor.date}}</p>
            </li>
          </ul>
        </div> -->
        <div class="intros">
          <p class="title">公司介绍</p>
          <div class="content" v-html="enterprise.introHtml"></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'enterpriseCard',
  props: {
    enterprise: {
      type: Object,
      default() {
        return {}
      }
    },
    mode:{
      type:String,
      default: 'simple',
      validator (value) {
        // simple-简易 complete-完整
        return ['simple', 'complete'].indexOf(value) >= 0
      }
    }
  },
  data(){
    return {
      newEnterprise:{}
    }
  },
  watch:{
    enterprise: {
      handler: function(val) {
        console.log('enterprise',val)
        this.newEnterprise = val
      },
      deep: true
    },
  },
  mounted(){
    // console.log(this.enterprise)
  }
}
</script>

<style lang="stylus" scoped>
.enterprise-card
  color #fff
  .base
    font-size 1.4rem
    .detail
      padding-bottom 0.5rem
  .logo
    background-color rgba(255,255,255,1)
    margin 0.5rem 0
    width 100%
    display flex
    align-items center
    justify-content center
    border-radius 1rem
  .title
    font-family $font-pang
    font-size 1.6rem
    color $color-map(1)
    padding 1rem 0
.enterprise-card-simple
  $gd-layout()
  background-color transparent
  grid-template-areas \
    'base logo'
  grid-template-columns 2.2fr 0.8fr
  .simple-base
    grid-area base
  .simple-logo
    grid-area logo

.enterprise-card-complete
  $gd-layout()
  padding 2rem
  background-color transparent
  grid-template-areas \
    'complete-base complete-logo'\
    'productions complete-logo'\
    'intros intros'
  grid-template-rows 0.5fr 0.5fr 2fr
  grid-template-columns 2fr 1fr
  .complete-base
    grid-area complete-base
    font-size 1.6rem
  .complete-logo
    grid-area complete-logo
  .productions
    grid-area productions
    .item
      display inline-block
      word-wrap none
      padding 0.2rem 0.5rem
      font-size 1.3rem
  .honors
    grid-area honors
    .list
      height 100%
      overflow auto
      padding 0 0.5rem
    .row
      display flex
      color #ccc
      padding 0.5rem 0
      align-items top
      justify-content space-between
      border-bottom 0.1rem solid rgba(28, 66, 95, 0.4)
      font-size 1.3rem
      .time
        padding-left 1rem
        word-wrap none
        width 12rem
        text-align right
  .intros
    grid-area intros
    .content
      font-size 1.2rem
      height 15rem
      overflow-y scroll
      line-height 1.5
      p
        text-indent 2em
  .enterprise-name
    font-family $font-pang
    font-size 2.4rem
    color #71c012
    padding 1rem 0
</style>
