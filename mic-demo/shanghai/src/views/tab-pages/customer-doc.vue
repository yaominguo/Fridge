<template>
<Card dis-hover>
  <Tabs type="card" value="tenant" :animated="false">
    <TabPane label="租客档案" name="tenant">
    </TabPane>
    <TabPane label="业主档案" name="owner">
    </TabPane>
    <TabPane label="意向客户档案" name="interested">
    </TabPane>
  </Tabs>
</Card>
</template>

<script>

export default {
  name: 'CustomerDoc',
  components: {
  }
}
</script>

<style>

</style>
