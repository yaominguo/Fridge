<template>
  <transition name="fade">
    <div v-show="visible" class="mask">
      <div class="board">
        <h2>{{title}}</h2>
        <p>{{content}}</p>
        <div class="btn-container">
          <button class="cancel" @click="cancel">{{cancelBtn}}</button>
          <button class="ok" @click="sure">{{okBtn}}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ConfirmModal',
  data () {
    return {
      visible: true
    }
  },
  methods: {
    cancel () {
      this.$emit('close')
    },
    sure () {
      this.$emit('sure')
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    cancelBtn: {
      type: String,
      default: '取消'
    },
    okBtn: {
      type: String,
      default: '确定'
    }
  }
}
</script>

<style lang="stylus" scoped>
  .fade-enter-active, .fade-leave-active
    transition opacity .5s
  .fade-enter, .fade-leave-to
    opacity 0
  .mask
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 100
    background rgba(0,0,0,0.3)
    display flex
    align-items center
    justify-content center
    .board
      width 300px
      background #fff
      border-radius 5px
      h2
        border-bottom 1px solid #ccc
        text-align center
        margin 0
        line-height 50px
      p
        text-align center
      .btn-container
        display flex
        justify-content space-around
        margin 10px 0
        button
          width 100px
          padding 10px 20px
          border-radius 5px
          border none
          outline none
          cursor pointer
          color #fff
          &:hover
            opacity 0.5
          &.cancel
            background red
          &.ok
            background skyblue
</style>
