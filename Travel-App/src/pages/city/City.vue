<template>
  <div>
    <city-header></city-header>
    <city-search></city-search>
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
      cities: [],
      hotCities: [],
      letter: ''
    }
  },
  methods: {
    requestCityInfo () {
      axios.get('/api/city.json')
        .then(this.handleCityInfo)
    },
    handleCityInfo (res) {
      console.log(res)
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
