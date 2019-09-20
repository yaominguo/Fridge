<template>
<Card dis-hover>
  <Tabs type="card" value="building" :animated="false">
    <TabPane label="楼栋档案" name="building">
    </TabPane>
    <TabPane label="分户档案" name="room">
    </TabPane>
    <TabPane label="广告位档案" name="advertising">
    </TabPane>
    <TabPane label="停车位档案" name="parking">
    </TabPane>
  </Tabs>
</Card>
</template>

<script>

export default {
  name: 'AssetDoc',
  components: {
  }
}
</script>

<style>

</style>
