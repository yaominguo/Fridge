<template>
  <ul class="list">
    <li
      v-for="key in letters"
      :key="key"
      :ref="key"
      @click="handleClick"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      {{key}}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CityAlphabet',
  props: {
    cities: Object
  },
  computed: {
    letters () {
      return Object.keys(this.cities)
    }
  },
  data () {
    return {
      touchStatus: false,
      startY: 0,
      timer: null
    }
  },
  updated () {
    this.startY = this.$refs['A'][0].offsetTop
  },
  methods: {
    handleClick (e) {
      this.$emit('switchChar', e.target.innerText)
    },
    handleTouchStart () {
      this.touchStatus = true
    },
    handleTouchMove (e) {
      if (this.touchStatus) {
        // const startY = this.$refs['A'][0].offsetTop
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          const touchY = e.touches[0].clientY - 96
          const index = Math.floor((touchY - this.startY) / 24)
          if (index >= 0 && index < this.letters.length) {
            this.$emit('switchChar', this.letters[index])
          }
        }, 16)
      }
    },
    handleTouchEnd () {
      this.touchStatus = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .list
    position: absolute
    top: 6rem
    right: 0
    bottom: 0
    width: 1.5rem
    padding: 0
    margin: 0
    list-style: none
    display: flex
    flex-direction: column
    justify-content: center
    li
      color: $bgColor
      line-height: 1.5rem
      text-align: center
      font-size: 0.8rem
</style>
