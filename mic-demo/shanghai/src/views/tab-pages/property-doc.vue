<template>
<Card dis-hover>
  <Tabs type="card" value="repair" :animated="false">
    <TabPane label="报修维修" name="repair">
    </TabPane>
    <TabPane label="物业巡查" name="patrol">
    </TabPane>
    <TabPane label="投诉建议" name="complaint">
    </TabPane>
  </Tabs>
</Card>
</template>

<script>

export default {
  name: 'PropertyDoc',
  components: {
  }
}
</script>

<style>

</style>
