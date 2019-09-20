<template>
  <InfoModel
    label="出资人"
    :url="url"
    :searchUrl="searchUrl"
  />
</template>

<script>
import InfoModel from '../components/info-model';
export default {
  name: 'Investor',
  components: {
    InfoModel,
  },
  data() {
    return {
      url: this.$api.ASSET_INVESTOR,
      searchUrl: this.$api.SEARCH_INVESTOR,
    };
  },
}
</script>
