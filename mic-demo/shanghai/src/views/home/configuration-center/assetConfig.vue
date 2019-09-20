<template>
  <Tabs value="assetBase" name="tab-2b" :animated="false">
    <TabPane label="基础数据配置" tab="tab-2b" name="assetBase">
      <AssetBase />
    </TabPane>
    <TabPane label="出资人管理" tab="tab-2b" name="investor">
      <InvestorManagement />
    </TabPane>
    <TabPane label="小区管理" tab="tab-2b" name="community">
      <CommunityManagement />
    </TabPane>
    <TabPane label="停车位配置" tab="tab-2b" name="parking">
      <ParkingSetting />
    </TabPane>
  </Tabs>
</template>

<script>
import AssetBase from './assetBase';
import CommunityManagement from '@/views/asset/region/community';
import InvestorManagement from '@/views/asset/investor/investor';
import ParkingSetting from './parkingSetting';
export default {
  name: 'AssetConfig',
  components: {
    AssetBase,
    CommunityManagement,
    InvestorManagement,
    ParkingSetting
  }
}
</script>

<style>

</style>
