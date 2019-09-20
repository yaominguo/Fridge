<template>
<Card dis-hover>
  <Tabs type="card" value="summary" :animated="false">
    <TabPane label="资产收费汇总表" name="summary">
    </TabPane>
    <TabPane label="按管理人员查询租金统计" name="rent">
    </TabPane>
    <TabPane label="按小区查询租户信息" name="community">
    </TabPane>
    <TabPane label="查询租户缴费记录" name="record">
    </TabPane>
    <TabPane label="欠款明细表" name="debet">
    </TabPane>
    <TabPane label="预售明细表" name="pre">
    </TabPane>
    <TabPane label="日收费汇总表" name="day-summary">
    </TabPane>
    <TabPane label="日收费明细表" name="day-detail">
    </TabPane>
  </Tabs>
</Card>
</template>

<script>

export default {
  name: 'AccountStatistics',
  components: {
  }
}
</script>

<style>

</style>
