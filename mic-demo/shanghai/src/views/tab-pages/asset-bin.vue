<template>
<Card dis-hover>
  <Tabs type="card" value="building" :animated="false">
    <TabPane label="楼栋" name="building">
      <RoomBin type="building"/>
    </TabPane>
    <TabPane label="分户" name="room">
      <RoomBin type="room"/>
    </TabPane>
    <TabPane label="广告位" name="advertising">
			<advertising />
    </TabPane>
    <TabPane label="停车位" name="parking">
      <parking />
    </TabPane>
  </Tabs>
</Card>
</template>

<script>
import parking from './bin/parking';
import advertising from './bin/advertising';
import RoomBin from '@/views/asset/verification/verification.vue';
export default {
  name: 'AssetBin',
  components: {
    parking,
		advertising,
    RoomBin,
  }
}
</script>

<style>

</style>
