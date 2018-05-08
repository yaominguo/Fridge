<template>
  <transition name="fade">
    <div class="container" :style="style" v-show="visible">
      <span class="content">{{content}}</span>
      <a class="btn" @click="handleClose">{{btn}}</a>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Notification',
  computed: {
    style () {
      return {}
    }
  },
  data () {
    return {
      visible: true
    }
  },
  methods: {
    handleClose (e) {
      e.preventDefault()
      this.$emit('close')
    }
  },
  props: {
    content: {
      type: String,
      required: true
    },
    btn: {
      type: String,
      default: '关闭'
    }
  }
}
</script>

<style lang="stylus" scoped>
  .fade-enter-active, .fade-leave-active
    transition opacity .5s
  .fade-enter, .fade-leave-to
    opacity 0
  .container
    display flex
    background rgba(0,0,0,0.3)
    color #fff
    align-items center
    padding 20px
    position fixed
    min-width 280px
    box-shadow 0 3px 5px -1px rgba(0,0,0,0.2)
    flex-wrap wrap
    transition all .3s
    .content
      padding 0
    .btn
      color #ff4081
      padding-left 24px
      margin-left auto
      cursor pointer
</style>
