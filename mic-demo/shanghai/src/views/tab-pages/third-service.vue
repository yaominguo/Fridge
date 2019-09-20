<template>
<Card dis-hover>
  <Tabs type="card" value="info" :animated="false">
    <TabPane label="三方信息" name="info">
    </TabPane>
    <TabPane label="三方服务合同" name="contract">
    </TabPane>
    <TabPane label="三方人员管理" name="management">
    </TabPane>
  </Tabs>
</Card>
</template>

<script>

export default {
  name: 'ThirdService',
  components: {
  }
}
</script>

<style>

</style>
