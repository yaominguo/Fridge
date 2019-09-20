<template>
  <InfoModel
    label="用途/分类"
    :url="url"
    :searchUrl="searchUrl"
  />
</template>

<script>
import InfoModel from '../components/info-model';
export default {
  name: 'Classification',
  components: {
    InfoModel,
  },
  data() {
    return {
      url: this.$api.ASSET_CLASS,
      searchUrl: this.$api.SEARCH_CLASS,
    };
  },
}
</script>
