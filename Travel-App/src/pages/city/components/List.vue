<template>
  <div class="container" ref="container">
    <div>
      <div class="section">
        <div class="title">当前城市</div>
        <div class="button-list">
          <div class="wrapper">
            <button>{{this.currentCity}}</button>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="title">热门城市</div>
        <div class="button-list">
          <div class="wrapper" v-for="city in hotCities" :key="city.id">
            <button @click="handleCityClick(city.name)">{{city.name}}</button>
          </div>
        </div>
      </div>
      <div class="section" v-for="(item, key) in cities" :key="key" :ref="key">
        <div class="title">{{key}}</div>
        <div class="item-list">
          <div @click="handleCityClick(city.name)" class="item border-bottom" v-for="city in item" :key="city.id">
            {{city.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'CityList',
  computed: {
    ...mapState({
      currentCity: 'city'
    })
  },
  methods: {
    handleCityClick (city) {
      // this.$store.dispatch('changeCity', city)
      this.changeCity(city)
      this.$router.push('/')
    },
    ...mapMutations(['changeCity'])
  },
  mounted () {
    this.scroll = new Bscroll(this.$refs.container)
  },
  props: {
    cities: Object,
    hotCities: Array,
    letter: String
  },
  watch: {
    letter () {
      if (this.letter) {
        const ele = this.$refs[this.letter][0]
        this.scroll.scrollToElement(ele)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  @import '~styles/mixin.styl'
  .container
    position: absolute
    top: 6rem
    left: 0
    right: 0
    bottom: 0
    overflow: hidden
    .title
      sectionTitle()
    .button-list
      width: 100%
      padding: 0.5rem 1.5rem 0.5rem 1rem
      overflow: hidden
      box-sizing: border-box
      .wrapper
        width: 33.33%
        float: left
        margin: 0.5rem 0
        button
          width: 90%
          line-height: 1.8rem
          border: 0.05rem solid #ccc
          text-align: center
          border-radius: 0.2rem
          background: #fff
          color: #666
    .item-list
      .item
        line-height: 2.4rem
        color: #666
        padding-left: 1rem
</style>
