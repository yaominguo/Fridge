<template>
<Card dis-hover>
  <Tabs type="card" value="summary" :animated="false">
    <TabPane label="资产汇总表" name="summary">
      <Form :label-width="70">
        <Row>
          <Col :span="8">
            <FormItem label="取得方式">
              <Select v-model="acquisitionName" clearable filterable transfer>
                <Option v-for="item in options.acquisitionMethod" :key="item.id" :value="item.name">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8" :offset="1">
            <div class="btn-container">
              <Button type="primary" :to="summaryUrl" target="_blank" ghost>打开新页面预览</Button>
              <Button type="primary" :to="summaryUrl+'&type=1'" target="_blank">导出资产汇总表</Button>
            </div>
          </Col>
        </Row>
      </Form>
      <iframe @load="$store.dispatch('setLoading', false)" style="width:100%;minHeight: 400px;" :src="summaryUrl" frameborder="0"></iframe>
    </TabPane>
    <TabPane label="资产明细表" name="detail">
      <Form :label-width="70">
        <Row>
          <Col :span="8">
            <FormItem label="小区">
              <Select v-model="communityId" clearable filterable transfer>
                <Option v-for="item in options.community" :key="item.id" :value="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8" :offset="1">
            <div class="btn-container">
              <Button type="primary" :to="detailsUrl" target="_blank" ghost>打开新页面预览</Button>
              <Button type="primary" :to="detailsUrl+'&type=1'" target="_blank">导出资产明细表</Button>
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
  name: 'AssetStatistics',
  data() {
    return {
      communityId: null,
      acquisitionName: null,
      options: {
        community: [],
        acquisitionMethod: [],
      }
    }
  },
  mounted() {
    this.getOptions();
  },
  methods: {
    selectMenu(name) {
      this.curMenu = name;
      this.communityId = null;
      this.acquisitionName = null;
    },
    getOptions() {
      const { ASSET_METHOD, ASSET_COMMUNITY } = this.$api;
      const list = [
        {url: ASSET_METHOD, name: 'acquisitionMethod'},
        {url: ASSET_COMMUNITY, name: 'community'},
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
      let acquisitionName = '';
      if (this.acquisitionName) {
        acquisitionName = `&acquire=${this.acquisitionName}`;
      }
      return `${this.$api.VIEW_SUMMARY}?token=${this.$cookie.get('token')}${acquisitionName}`;
    },
    detailsUrl() {
      this.$store.dispatch('setLoading', true);
      let community = '';
      if (this.communityId) {
        community = `&communityId=${this.communityId}`;
      }
      return `${this.$api.VIEW_DETAILS}?token=${this.$cookie.get('token')}${community}`;
    },
  },
}
</script>

<style scoped>
</style>
