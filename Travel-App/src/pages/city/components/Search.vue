<template>
  <div>
    <div class="search-bar">
      <input v-model="keyword" type="text" placeholder="请输入城市名或拼音">
    </div>
    <div class="search-content" ref="search" v-show="keyword">
      <ul>
        <li @click="handleCityClick(city.name)" class="border-bottom" v-for="city in searchResult" :key="city.id">
          {{city.name}}
        </li>
        <li class="no-message" v-show="isNoData">没有找到匹配城市</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import { mapMutations } from 'vuex'
export default {
  name: 'CitySearch',
  props: {
    cities: Object
  },
  methods: {
    handleCityClick (city) {
      this.changeCity(city)
      this.$router.push('/')
    },
    ...mapMutations(['changeCity'])
  },
  data () {
    return {
      keyword: '',
      timer: null,
      searchResult: []
    }
  },
  computed: {
    isNoData () {
      return !this.searchResult.length
    }
  },
  watch: {
    keyword () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (!this.keyword) {
        this.searchResult = []
        return
      }
      this.timer = setTimeout(() => {
        const result = []
        for (let key in this.cities) {
          this.cities[key].forEach(city => {
            if (city.spell.indexOf(this.keyword) >= 0 || city.name.indexOf(this.keyword) >= 0) {
              result.push(city)
            }
          })
        }
        this.searchResult = result
      }, 100)
    }
  },
  mounted () {
    this.scroll = new Bscroll(this.$refs.search)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .search-bar
    height: $headerHeight
    line-height: $headerHeight
    background: $bgColor
    padding: 0 1rem
    input
      height: 2rem
      width: 100%
      border-radius: 3px
      border: none
      padding: 0 1rem
      box-sizing: border-box
  .search-content
    z-index: 1
    overflow: hidden
    position: absolute
    top: 6rem
    left: 0
    right: 0
    bottom: 0
    background: #efefef
    ul
      list-style: none
      padding: 0
      margin: 0
      li
        line-height: 2.4rem
        color: #666
        padding-left: 1rem
        background: #fff
      .no-message
        text-align: center
</style>
