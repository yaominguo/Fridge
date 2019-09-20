<template>
  <div>
    <Form :label-width="70">
      <Row>
        <Col :span="6">
          <FormItem label="区域">
            <Select v-model="searchData.zoneId" clearable>
              <Option v-for="item in options.zone" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="小区">
            <Select v-model="searchData.communityId" :disabled="!searchData.zoneId" clearable>
              <Option v-for="item in options.community" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem>
            <Button @click="handleSearch" type="primary">查询</Button>
            <Button @click="handleReset" type="primary" ghost>重置</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Divider style="margin: 0 0 16px;"/>
    <Table :height="400" size="small" border :columns="columns" :data="dataSource" />
    <!-- <div class="pager">
      <Page @on-change="changePage" :current="pageNo" :page-size="pageSize" :total="total" show-total />
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'AssetDetail',
  data() {
    return {
      // pageNo: 1,
      // pageSize: 10,
      // total: 0,
      columns: [
        {
          title: '出资人',
          key: 'spnonsorName',
          align: 'center',
          minWidth: 100,
          fixed: 'left',
        },
        {
          title: '所属区域',
          key: 'zoneName',
          align: 'center',
          minWidth: 100,
          fixed: 'left',
        },
        {
          title: '小区名称',
          key: 'communityName',
          align: 'center',
          minWidth: 100,
          fixed: 'left',
        },
        {
          title: '房产地址',
          key: 'address',
          align: 'center',
          minWidth: 200,
        },
        {
          title: '入库时间',
          key: 'createTime',
          align: 'center',
          minWidth: 100,
        },
        {
          title: '产权人',
          key: 'rightPerson',
          align: 'center',
          children: [
            {
              title: '名称',
              key: 'floor_userName',
              align: 'center',
              minWidth: 100,
            },
            {
              title: '有无产权',
              key: 'hasRight',
              align: 'center',
              minWidth: 100,
              render: (h, params) => {
                const txt = params.row.floor_rightNo ? '有' : '无';
                return h('div', txt);
              },
            },
          ],
        },
        {
          title: '是否收益',
          key: 'haveIncome',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            const txt = params.row.haveIncome == '1' ? '是' : '否';
            return h('div', txt);
          },
        },
        {
          title: '楼栋信息',
          key: 'buildInfo',
          align: 'center',
          children: [
            {
              title: '楼名',
              key: 'floorName',
              align: 'center',
              minWidth: 100,
            },
            {
              title: '取得方式',
              key: 'floor_acquisitionMethodName',
              align: 'center',
              minWidth: 100,
            },
            {
              title: '出资人',
              key: 'floor_spnonsorName',
              align: 'center',
              minWidth: 100,
            },
            {
              title: '建筑面积',
              key: 'floor_buildArea',
              align: 'center',
              minWidth: 100,
            },
            {
              title: '套内面积',
              key: 'floor_realArea',
              align: 'center',
              minWidth: 100,
            },
            {
              title: '公摊面积',
              key: 'floor_averageArea',
              align: 'center',
              minWidth: 100,
            },
          ],
        },
        {
          title: '分户',
          key: 'roomInfo',
          align: 'center',
          children: [
            {
              title: '室号',
              key: 'roomNo',
              align: 'center',
              minWidth: 100,
            },
            {
              title: '取得方式',
              key: 'acquisitionMethodName',
              align: 'center',
              minWidth: 100,
            },
            {
              title: '出资人',
              key: 'spnonsorName',
              align: 'center',
              minWidth: 100,
            },
            {
              title: '建筑面积',
              key: 'buildArea',
              align: 'center',
              minWidth: 100,
            },
            {
              title: '套内面积',
              key: 'realArea',
              align: 'center',
              minWidth: 100,
            },
            {
              title: '公摊面积',
              key: 'averageArea',
              align: 'center',
              minWidth: 100,
            },
          ],
        },
        {
          title: '备注',
          key: 'ps',
          align: 'center',
          minWidth: 100,
        },
      ],
      dataSource: [],
      options: {
        community: '',
        zone: '',
      },
      searchData: {},
      floorData: {},
      communityList: [],
    }
  },
  mounted() {
    this.$ajax.all(...this.getOptions(), this.getFloorData())
      .then(this.communityList = this.options.community)
  },
  methods: {
    getOptions() {
      const { ASSET_COMMUNITY, ASSET_ZONE } = this.$api;
      const list = [
        {url: ASSET_COMMUNITY, name: 'community'},
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
    getFloorData() {
      let floorData = {};
      return this.$ajax.get(
        this,
        this.$api.ASSET_FLOOR,
        {},
        (res) => {
          const data = res.data.content;
          data.forEach(item => {
            const obj = {};
            for(let key in item) {
              obj['floor_' + key] = item[key];
            }
            floorData[item.id] = obj;
          });
          this.floorData = floorData;
          // this.getData();
          this.handleSearch();
        },
      )
    },
    getData() {
      return this.$ajax.get(
        this,
        this.$api.ASSET_HOUSE,
        {},
        (res) => {
          this.total = res.data.totalRows;
          const data = res.data.content;
          this.dataSource = data.map(item => {
            return Object.assign(item, this.floorData[item.floorId]);
          })
        }
      )
    },
    handleSearch() {
      const params = Object.assign(this.searchData, {
        pageNo: 1,
        pageSize: 1000,
      })
      this.$ajax.post(
        this,
        this.$api.ASSET_HOUSE_LIST,
        params,
        (res) => {
          const data = res.data.content;
          this.dataSource = data.map(item => {
            item.floorData = this.floorData[item.floorId];
            return item;
          })
        }
      )
    },
    handleReset() {
      this.searchData = {};
      this.getData();
    },
    // changePage(page) {
    //   this.pageNo = page;
    //   this.getData(this.searchData);
    // }
  },
  computed: {
    zoneObj() {
      if(!this.communityList) {
        this.communityList = this.options.community;
      };
      const obj = {};
      this.communityList.forEach(item => {
        if (!obj[item.zoneId]) {
          obj[item.zoneId] = [];
        }
        obj[item.zoneId].push(item);
      });
      return obj;
    },
  },
  watch: {
    'searchData.zoneId': {
      handler(cur, old) {
        this.options.community = this.zoneObj[cur];
        if (cur != old) {
          this.$delete(this.searchData, 'communityId');
        }
      }
    },
  }
}
</script>

<style scoped>
.pager{
  text-align: center;
  margin: 10px 0;
}
</style>

