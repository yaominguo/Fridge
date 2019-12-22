<template>
  <div class="enterprise-card">
    <template v-if="mode == 'simple'">
      <div class="enterprise-card-simple">
        <div class="simple-logo">
          <div class="img-wrapper">
            <img width="60%" :src="require(`@/assets/images/${enterprise.logoPath}`)" />
            <div class="edge top-left"/>
            <div class="edge top-right"/>
            <div class="edge bottom-left"/>
            <div class="edge bottom-right"/>
          </div>
        </div>
        <div class="simple-base">
          <p class="name small">地址</p>
          <p>{{enterprise.address}}</p>
          <p class="name small">联系方式</p>
          <p>{{enterprise.contact}}</p>
        </div>
      </div>
    </template>
    <template v-if="mode == 'complete'">
      <div class="enterprise-card-complete">
        <section>
          <div class="complete-base">
            <p class="name title">{{enterprise.name}}</p>
            <p>{{enterprise.address}}</p>
            <br/>
            <p class="name">公司介绍</p>
            <div class="introduction" v-html="enterprise.introHtml" />
          </div>
          <div class="complete-logo">
            <div class="img-wrapper">
              <img :src="require(`@/assets/images/${enterprise.logoPath}`)" />
              <div class="edge top-left"/>
              <div class="edge top-right"/>
              <div class="edge bottom-left"/>
              <div class="edge bottom-right"/>
            </div>
          </div>
        </section>
        <section>
          <p class="name">主要产品</p>
          <EnterpriseProductions :list="enterprise.productions"/>
        </section>
      </div>
    </template>
  </div>
</template>

<script>
import EnterpriseProductions from './enterprise-productions'
export default {
  name: 'enterpriseCard',
  components: {
    EnterpriseProductions,
  },
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
}
</script>

<style lang="stylus" scoped>
.enterprise-card
  color #ccc
  height 100%
  overflow hidden
  line-height 1.6
  >div
    height 100%
  .img-wrapper
    background $color-map(0.1)
    height 100%
    display flex
    align-items center
    justify-content center
    position relative
    .edge
      position absolute
      width 0
      border 0.6rem solid $color-map(1)
      &.top-left
        top 0
        left 0
        border-right-color transparent
        border-bottom-color transparent
      &.top-right
        top 0
        right 0
        border-left-color transparent
        border-bottom-color transparent
      &.bottom-left
        bottom 0
        left 0
        border-right-color transparent
        border-top-color transparent
      &.bottom-right
        bottom 0
        right 0
        border-left-color transparent
        border-top-color transparent
    img
      width 80%
      padding 1rem
      background-color #fff
  .name
    color $color-map(1)
    font-family $font-pang
    font-size 1.8rem
    &.small
      font-size 1.4rem
      margin-top 0.5rem
    &.title
      color $color-green
.enterprise-card-simple
  display flex
  padding 1rem
  align-items center
  .simple-logo
    flex 1.5
    height 70%
  .simple-base
    flex 2
    margin-left 1rem
.enterprise-card-complete
  display flex
  flex-direction column
  padding 1rem
  section
    display flex
    flex 1
    margin-bottom 2rem
    &:last-child
      flex-direction column
      flex 2
    .complete-base
      flex 2
    .introduction
      height 8rem
      overflow auto
    .complete-logo
      flex 1.2
      .img-wrapper
        margin-left 3rem

</style>
