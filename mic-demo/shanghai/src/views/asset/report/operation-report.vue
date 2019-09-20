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
        <div v-if="curMenu == '运营情况汇总'">
          <Form :label-width="70">
            <Row>
              <Col :span="8">
                <FormItem label="管理人员">
                  <Select v-model="managerName" clearable filterable transfer>
                    <Option v-for="item in options.manager" :key="item" :value="item">{{item}}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :span="8" :offset="8">
                <div class="btn-container">
                  <Button type="primary" :to="summaryUrl" target="_blank" ghost>打开新页面预览</Button>
                  <Button type="primary" :to="summaryUrl+'&type=1'" target="_blank">导出运营情况汇总</Button>
                </div>
              </Col>
            </Row>
          </Form>
          <Divider style="margin:0;"/>
          <iframe @load="$store.dispatch('setLoading', false)" style="width:100%;minHeight: 400px;" :src="summaryUrl" frameborder="0"></iframe>
        </div>
        <div v-else-if="curMenu == '运营情况明细'">
          <Form :label-width="70">
            <Row>
              <Col :span="8">
                <FormItem label="区域">
                  <Select v-model="zoneName" clearable filterable transfer>
                    <Option v-for="item in options.zone" :key="item.id" :value="item.county">{{item.county}}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :span="8" :offset="8">
                <div class="btn-container">
                  <Button type="primary" :to="detailsUrl" target="_blank" ghost>打开新页面预览</Button>
                  <Button type="primary" :to="detailsUrl+'&type=1'" target="_blank">导出运营情况明细</Button>
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
  name: 'OperationReport',
  data() {
    return {
      curMenu: '运营情况汇总',
      financeMenus: [
        {name: '运营情况汇总'},
        {name: '运营情况明细'},
      ],
      options: {
        manager: [],
        zone: [],
      },
      zoneName: null,
      managerName: null,
    };
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

<style scoped>
.tab .ivu-tabs-nav-scroll{
  padding-left: 20px;
}
.btn-container {
  display: flex;
  justify-content: space-around;
}
</style>

