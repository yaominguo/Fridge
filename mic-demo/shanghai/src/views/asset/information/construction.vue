<template>
  <InfoModel
    label="房屋结构"
    :url="url"
    :searchUrl="searchUrl"
  />
</template>

<script>
import InfoModel from '../components/info-model';
export default {
  name: 'HouseConstruction',
  components: {
    InfoModel,
  },
  data() {
    return {
      url: this.$api.ASSET_STRUCTION,
      searchUrl: this.$api.SEARCH_STRUCTION,
    };
  },
}
</script>
