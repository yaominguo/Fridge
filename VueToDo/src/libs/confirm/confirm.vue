<template>
  <div v-show="visible" class="mask">
    <div class="board">
      <h2>{{title}}</h2>
      <p>{{content}}</p>
      <div class="btn-container">
        <button class="cancel">取消</button>
        <button class="ok">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmModal',
  data () {
    return {
      visible: false
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
    }
  }
}
</script>

<style lang="stylus" scoped>
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
