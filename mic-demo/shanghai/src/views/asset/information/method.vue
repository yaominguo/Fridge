<template>
  <InfoModel
    label="取得方式"
    :url="url"
    :searchUrl="searchUrl"
  />
</template>

<script>
import InfoModel from '../components/info-model';
export default {
  name: 'GetMethod',
  components: {
    InfoModel,
  },
  data() {
    return {
      url: this.$api.ASSET_METHOD,
      searchUrl: this.$api.SEARCH_METHOD,
    };
  },
}
</script>
