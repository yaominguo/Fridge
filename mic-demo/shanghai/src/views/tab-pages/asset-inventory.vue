<template>
<Card dis-hover>
  <Tabs type="card" value="building" :animated="false">
    <TabPane label="楼栋" name="building">
    </TabPane>
    <TabPane label="广告位" name="advertising">
    </TabPane>
    <TabPane label="停车位" name="parking">
    </TabPane>
  </Tabs>
</Card>
</template>

<script>

export default {
  name: 'AssetInventory',
  components: {
  }
}
</script>

<style>

</style>
