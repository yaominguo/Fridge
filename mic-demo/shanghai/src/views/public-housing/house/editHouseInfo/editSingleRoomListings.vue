<template>
  <div>
    <editHouseInfo  :pageType="'editSingleRoomListings'" :searchId="11"></editHouseInfo>
  </div>
</template>
<script>
import editHouseInfo from "../components/editHouseInfo.vue";
export default {
  components: {
    editHouseInfo
  }
};
</script>
<style scoped>
</style>
