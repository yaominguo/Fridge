<template>
<Card dis-hover>
  <Tabs type="card" v-model="curTab" name="tab" :animated="false">
    <TabPane label="账务配置" name="accounting" tab="tab">
      <AccountConfig />
    </TabPane>
    <!-- <TabPane label="资产基础配置" name="asset" tab="tab">
      <AssetConfig />
    </TabPane> -->
    <TabPane label="租赁房源配置" name="house" tab="tab">
      <HouseConfig />
    </TabPane>
    <TabPane label="租约模板配置" name="contract" tab="tab">
      <ContractTemplate />
    </TabPane>
  </Tabs>

</Card>
</template>

<script>
import AccountConfig from './staging';
import AssetConfig from './assetConfig';
import HouseConfig from './rentalProperty';
import ContractTemplate from './contractTemplate/contractTemplateList';

export default {
  name: 'ConfigurationCenter',
  components: {
    AccountConfig,
    AssetConfig,
    HouseConfig,
    ContractTemplate,
  },
  data() {
    return {
      curTab: 'accounting',
    }
  },
  mounted() {
    const {type} = this.$route.meta;
    if (type) {
      this.curTab = type;
    }
  },
}
</script>

<style scoped>
</style>


