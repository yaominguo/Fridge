import Notification from './notification.vue'

export default {
  // 扩展Notification，这样这文件里定义的函数或data才能覆盖vue文件里的
  extends: Notification,
  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  mounted () {
    this.createTimer()
  },
  methods: {
    // 加载后创建一个定时器，让通知弹窗定时消失
    createTimer () {
      if (this.defaultAutoCloseDuration) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.defaultAutoCloseDuration)
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    // 当元素显示完成后获取其高度，为了消失时下移上方的元素
    afterEnter () {
      this.height = this.$el.offsetHeight
    }
  },
  beforeDestroy () {
    this.clearTimer()
  },
  data () {
    return {
      verticalOffset: 0,
      defaultAutoCloseDuration: 5000,
      height: 0,
      visible: false
    }
  }
}
