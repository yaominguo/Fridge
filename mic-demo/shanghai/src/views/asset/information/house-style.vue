<template>
  <InfoModel
    label="房型"
    :url="url"
    :searchUrl="searchUrl"
  />
</template>

<script>
import InfoModel from '../components/info-model';
export default {
  name: 'HouseStyle',
  components: {
    InfoModel,
  },
  data() {
    return {
      url: this.$api.ASSET_STYLE,
      searchUrl: this.$api.SEARCH_STYLE,
    };
  },
}
</script>
