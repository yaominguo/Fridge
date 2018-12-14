<template>
  <div>
    <city-header></city-header>
    <city-search :cities="cities"></city-search>
    <city-list :letter="letter" :cities="cities" :hotCities="hotCities"></city-list>
    <city-alphabet :cities="cities" @switchChar="handleCharChange"></city-alphabet>
  </div>
</template>

<script>
import CityHeader from './components/Header'
import CitySearch from './components/Search'
import CityList from './components/List'
import CityAlphabet from './components/Alphabet'
import axios from 'axios'
import { getCity } from '../../api/api.js'
export default {
  name: 'City',
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CityAlphabet
  },
  data () {
    return {
      cities: {},
      hotCities: [],
      letter: ''
    }
  },
  methods: {
    requestCityInfo () {
      axios.get(getCity)
        .then(this.handleCityInfo)
    },
    handleCityInfo (res) {
      if (res.data.ret && res.data.data) {
        const data = res.data.data
        this.cities = data.cities
        this.hotCities = data.hotCities
      }
    },
    handleCharChange (letter) {
      this.letter = letter
    }
  },
  mounted () {
    this.requestCityInfo()
  }
}
</script>

<style lang="stylus" scoped>

</style>
