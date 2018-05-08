import Notification from './notification.vue'

export default {
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
