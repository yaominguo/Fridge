<template>
  <Card dis-hover>
    <Layout :style="{background: '#fff',}">
      <Sider>
        <Menu :active-name = "curMenu" @on-select="selectMenu" :style="{width: '100%', height: '100%', zIndex: '1'}">
          <MenuItem
            v-for="item in financeMenus"
            :key="item.name"
            :name="item.name">
            {{item.name}}
          </MenuItem>
        </Menu>
      </Sider>
      <Content :style="{marginLeft: '16px',}">
        <div v-if="curMenu == '资产汇总表'">
          <Form :label-width="70">
            <Row>
              <Col :span="8">
                <FormItem label="取得方式">
                  <Select v-model="acquisitionName" clearable filterable transfer>
                    <Option v-for="item in options.acquisitionMethod" :key="item.id" :value="item.name">{{item.name}}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :span="8" :offset="8">
                <div class="btn-container">
                  <Button type="primary" :to="summaryUrl" target="_blank" ghost>打开新页面预览</Button>
                  <Button type="primary" :to="summaryUrl+'&type=1'" target="_blank">导出资产汇总表</Button>
                </div>
              </Col>
            </Row>
          </Form>
          <Divider style="margin:0;"/>
          <iframe @load="$store.dispatch('setLoading', false)" style="width:100%;minHeight: 400px;" :src="summaryUrl" frameborder="0"></iframe>
        </div>
        <div v-else-if="curMenu == '资产明细表'">
          <Form :label-width="70">
            <Row>
              <Col :span="8">
                <FormItem label="小区">
                  <Select v-model="communityId" clearable filterable transfer>
                    <Option v-for="item in options.community" :key="item.id" :value="item.id">{{item.name}}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :span="8" :offset="8">
                <div class="btn-container">
                  <Button type="primary" :to="detailsUrl" target="_blank" ghost>打开新页面预览</Button>
                  <Button type="primary" :to="detailsUrl+'&type=1'" target="_blank">导出资产明细表</Button>
                </div>
              </Col>
            </Row>
          </Form>
          <Divider style="margin:0;"/>
          <iframe @load="$store.dispatch('setLoading', false)" style="width:100%;minHeight: 400px;" :src="detailsUrl" frameborder="0"></iframe>
        </div>
      </Content>
    </Layout>
  </Card>
</template>

<script>
export default {
  name: 'AssetReport',
  data() {
    return {
      curMenu: '资产汇总表',
      financeMenus: [
        {name: '资产汇总表'},
        {name: '资产明细表'},
      ],
      communityId: null,
      acquisitionName: null,
      options: {
        community: [],
        acquisitionMethod: [],
      }
    };
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
.tab .ivu-tabs-nav-scroll{
  padding-left: 20px;
}
.btn-container {
  display: flex;
  justify-content: space-around;
}
</style>

