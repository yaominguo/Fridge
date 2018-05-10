<script>
export default {
  name: 'Tab',
  props: {
    index: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String,
      default: 'tab'
    }
  },
  mounted () {
    // 将自身传递添加到父组件也就是tabs中的panes中
    this.$parent.panes.push(this)
  },
  computed: {
    active () {
      // tabs中的value与自身的index相等即为选中状态
      return this.$parent.value === this.index
    }
  },
  methods: {
    handleClick () {
      // 触发父组件也就是tabs中的onChange函数
      this.$parent.onChange(this.index)
    }
  },
  render () {
    const tab = this.$slots.label || <span>{this.label}</span>
    const classNames = {
      tab: true,
      active: this.active
    }
    return (
      <li class={classNames} on-click={this.handleClick}>
        {tab}
      </li>
    )
  }
}
</script>

<style lang="stylus" scoped>
  .tab
    list-style none
    line-height 40px
    margin-right 30px
    position relative
    bottom -2px
    padding 0 10px
    cursor pointer
    &.active
      border-bottom 2px solid skyblue
    &:last-child
      margin-right 0
</style>
