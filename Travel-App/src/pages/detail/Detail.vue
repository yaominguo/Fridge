<template>
  <div>
    <detail-banner :sightName="sightName" :gallaryImgs="gallaryImgs" :bannerImg="bannerImg"></detail-banner>
    <detail-header></detail-header>
    <div class="content">
      <detail-list :list="categoryList"></detail-list>
    </div>
  </div>
</template>

<script>
import DetailBanner from './components/Banner'
import DetailHeader from './components/Header'
import DetailList from './components/List'
import axios from 'axios'
export default {
  name: 'Detail',
  components: {
    DetailBanner,
    DetailHeader,
    DetailList
  },
  data () {
    return {
      sightName: '',
      bannerImg: '',
      gallaryImgs: [],
      categoryList: []
    }
  },
  methods: {
    requestDetailInfo () {
      axios.get('/api/detail.json', {
        params: {
          id: this.$route.params.id
        }
      }).then(this.handleDetailInfo)
    },
    handleDetailInfo (res) {
      res = res.data
      if (res.ret && res.data) {
        this.sightName = res.data.sightName
        this.gallaryImgs = res.data.gallaryImgs
        this.bannerImg = res.data.bannerImg
        this.categoryList = res.data.categoryList
      }
    }
  },
  mounted () {
    this.requestDetailInfo()
  }
}
</script>
