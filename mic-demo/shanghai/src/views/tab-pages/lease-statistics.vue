<template>
<Card dis-hover>
  <Tabs type="card" value="summary" :animated="false">
    <TabPane label="资产经营状态汇总表" name="summary">
      <iframe @load="$store.dispatch('setLoading', false)" style="width:100%;minHeight: 400px;" :src="summaryUrl" frameborder="0"></iframe>
    </TabPane>
    <TabPane label="按管理人员查询全部经营状态" name="manager">
      <Form :label-width="70">
        <Row>
          <Col :span="8">
            <FormItem label="管理人员">
              <Select v-model="managerName" clearable filterable transfer>
                <Option v-for="item in options.manager" :key="item" :value="item">{{item}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8" :offset="1">
            <div class="btn-container">
              <Button type="primary" :to="summaryUrl" target="_blank" ghost>打开新页面预览</Button>
              <Button type="primary" :to="summaryUrl+'&type=1'" target="_blank">导出运营情况汇总</Button>
            </div>
          </Col>
        </Row>
      </Form>
      <iframe @load="$store.dispatch('setLoading', false)" style="width:100%;minHeight: 400px;" :src="summaryUrl" frameborder="0"></iframe>
    </TabPane>
    <!-- <TabPane label="按小区查询资产经营状态明细" name="community">
    </TabPane> -->
    <TabPane label="按区域查询资产经营状态明细" name="region">
      <Form :label-width="70">
        <Row>
          <Col :span="8">
            <FormItem label="区域">
              <Select v-model="zoneName" clearable filterable transfer>
                <Option v-for="item in options.zone" :key="item.id" :value="item.county">{{item.county}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8" :offset="1">
            <div class="btn-container">
              <Button type="primary" :to="detailsUrl" target="_blank" ghost>打开新页面预览</Button>
              <Button type="primary" :to="detailsUrl+'&type=1'" target="_blank">导出运营情况明细</Button>
            </div>
          </Col>
        </Row>
      </Form>
      <iframe @load="$store.dispatch('setLoading', false)" style="width:100%;minHeight: 400px;" :src="detailsUrl" frameborder="0"></iframe>
    </TabPane>
  </Tabs>
</Card>
</template>

<script>

export default {
  name: 'LeaseStatistics',
  data() {
    return {
      options: {
        manager: [],
        zone: [],
      },
      zoneName: null,
      managerName: null,
    }
  },
  mounted() {
    this.getOptions();
  },
  methods: {
    selectMenu(name) {
      this.curMenu = name;
      this.zoneName = null;
      this.managerName = null;
    },
    getOptions() {
      const { GET_MANAGER, ASSET_ZONE } = this.$api;
      const list = [
        {url: GET_MANAGER, name: 'manager'},
        {url: ASSET_ZONE, name: 'zone'},
      ];
      return list.map(item =>
        this.$ajax.get(
          this,
          item.url,
          {},
          (res) => {
            this.options[item.name] = res.data && res.data.content;
          },
          true,
        )
      );
    },
  },
  computed: {
    summaryUrl() {
      this.$store.dispatch('setLoading', true);
      let manager = '';
      if (this.managerName) {
        manager = `&blamerName=${this.managerName}`;
      }
      return `${this.$api.OPERATION_SUMMARY}?token=${this.$cookie.get('token')}${manager}`;
    },
    detailsUrl() {
      this.$store.dispatch('setLoading', true);
      let zone = '';
      if (this.zoneName) {
        zone = `&countyName=${this.zoneName}`;
      }
      return `${this.$api.OPERATION_DETAILS}?token=${this.$cookie.get('token')}${zone}`;
    },
  },
}
</script>

<style>

</style>
