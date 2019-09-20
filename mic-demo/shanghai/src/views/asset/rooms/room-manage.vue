<template>
  <Card dis-hover >
    <Layout :style="{background: '#fff',}">
      <Sider id="sideMenu" :style="maxHeight">
        <Tabs @on-click="selectTab" id="login-container" :animated="false">
          <TabPane
            v-for="tab in tabs"
            :key="tab.name"
            :label="tab.name"
            :name="tab.name">
            <Menu @on-select="selectMenu" v-if="tab.name == '项目'" active-name="all" style="zIndex: 1; ">
              <MenuItem
                v-for="item in options.projectId"
                :key="item.value"
                :name="item.value">
                {{item.text}}
              </MenuItem>
            </Menu>
            <Menu @on-select="selectMenu" v-else-if="tab.name == '小区/公寓'" active-name="all" style="zIndex: 1; ">
              <MenuItem
                v-for="item in options.communityId"
                :key="item.value"
                :name="item.value">
                {{item.text}}
              </MenuItem>
            </Menu>
          </TabPane>
        </Tabs>
      </Sider>
      <Content :style="{marginLeft: '16px',}">
        <div ref="card">
          <ActiveForm
          ref="search"
          labelPosition="right"
          :labelWidth="90"
          :header="null"
          :layout="searchLayout"
          :model="searchModel" >
            <div class="btn-box">
              <Button type="primary" @click="handleSearch">查询</Button>
              <Button @click="handleReset">重置</Button>
              <Button @click="$router.push({'name': 'add-single-room'})" type="primary">单间新增分户</Button>
              <Button @click="$router.push({'name': 'add-batch-room'})" type="primary">批量新增分户</Button>
            </div>
          </ActiveForm>
          <RoomTable
            :showTitle="true"
            :data="resultList"
            :pageSize="pageSize"
            :pageNo="pageNo"
            :total="total"
            @success="handleSearch"
            @changePage="changePage"
          />
        </div>
      </Content>
    </Layout>
  </Card>
</template>

<script>
import ActiveForm from '@/components/Helper/Form/ActiveForm';
import ActiveTable from '@/components/Helper/Table/ActiveTable';
import RoomTable from './room-table';

export default {
  name: 'AssetRoom',
  components: {
    RoomTable,
    ActiveForm,
    ActiveTable,
  },
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 0,
      curTab: '项目',
      tabs: [
        {name: '项目'},
        {name: '小区/公寓'},
      ],
      searchLayout:[
        {
          spnonsorId: {
            label: '出资人',
            type: 'select',
            width: 6,
            options: [],
          },
          acquisitionMethodId: {
            label: '取得方式',
            type: 'select',
            width: 6,
            options: [],
          },
          houseType: {
            label: '房型',
            type: 'select',
            width: 6,
            options: [],
          },
          housingStructure: {
            label: '房屋结构',
            type: 'select',
            width: 6,
            options: [],
          },
          useAndClass: {
            label: '资产类型',
            type: 'cascader',
            width: 6,
            options: [],
          },
          assetUseId: {
            label: '资产用途',
            type: 'select',
            width: 6,
            options: [
              {text: '自用', value: '0'},
              {text: '出租', value: '1'},
              {text: '出售', value: '2'},
            ],
          },
          // projectId: {
          //   label: '项目',
          //   type: 'select',
          //   width: 6,
          //   options: [],
          // },
          checkStatus: {
            label: '审批状态',
            type: 'select',
            width: 6,
            options: [
              {text: '草稿', value: '0'},
              {text: '新增审批中', value: '1'},
              {text: '修改审批中', value: '2'},
              {text: '作废审批中', value: '3'},
              {text: '运营审批中', value: '4'},
              {text: '审核通过', value: '5'},
              {text: '审核撤回', value: '6'},
              {text: '审核驳回', value: '7'},
            ],
          },
          leaseStatus: {
            label: '运营状态',
            type: 'select',
            width: 6,
            options: [
              {text: '未运营', value: '0'},
              {text: '运营中/未租', value: '1'},
              {text: '运营中/已租', value: '2'},
            ],
          },
          address: {
            label: '地址',
            type: 'input',
            width: 6,
          },
          communityId: {
            label: '小区/公寓',
            type: 'select',
            width: 6,
            options: [],
          },
        },
      ],
      searchModel: {},
      resultList: [],
      options: {
        projectId: [{text: '全部', value: 'all'}],
        communityId: [{text: '全部', value: 'all'}],
      },
      formData: {
        blamer: null,
      },
      curProject: null,
      curOptions: {},
      currentId: '',
      fullHeight: document.documentElement.clientHeight,
      communityList: [],
    }
  },
  mounted() {
    this.$ajax.all(...this.getOptions(), this.getTypes(), this.getData());
  },
  methods: {
    // 获取选择框选项
    getOptions() {
      const { ASSET_COMMUNITY, ASSET_INVESTOR, ASSET_METHOD, ASSET_STRUCTION, ASSET_PROJECT,  } = this.$api;
      const list = [
        {url: ASSET_COMMUNITY, name: 'communityId'},
        {url: ASSET_INVESTOR, name: 'spnonsorId'},
        {url: ASSET_METHOD, name: 'acquisitionMethodId'},
        {url: ASSET_STRUCTION, name: 'housingStructure'},
        {url: ASSET_PROJECT, name: 'projectId'},
      ];
      this.options = {
        projectId: [{text: '全部', value: 'all'}],
        communityId: [{text: '全部', value: 'all'}],
      };
      return list.map(item =>
        this.$ajax.get(
          this,
          item.url,
          {},
          (res) => {
            const data = this.$com.confirm(res, 'data.content', []);
            if (item.name == 'projectId' || item.name == 'communityId') {
              const list = data.map(item => {
                return {
                  text: item.name,
                  value: item.id,
                }
              });
              if (item.name == 'communityId' || item.name == 'projectId') {
                this.communityList = data;
              }
              this.options[item.name].push(...list);
            } else {
              this.searchLayout[0][item.name].options = data.map(item => {
                return {
                  text: item.name,
                  value: item.id,
                }
              });
            }
            this.selectTab('项目');
          },
          true,
        )
      );
    },
    getTypes() {
      return this.$ajax.get(
        this,
        this.$api.ASSET_TYPES,
        null,
        (res) => {
          const options = [
            {
              value: '0',
              label: '公租房',
              children: [],
            },
            {
              value: '1',
              label: '非居',
              children: [],
            },
            {
              value: '2',
              label: '租赁',
              children: [],
            }
          ];
          const data = res.data.content;
          if (data && data.length > 0) {
            data.forEach(child => {
              options.forEach(parent => {
                if (child.type == parent.value) {
                  parent.children.push({
                    value: child.id,
                    label: child.name,
                  })
                }
              })
            })
          }
          this.searchLayout[0].useAndClass.options = options;
        },
        true,
      )
    },
    getData(options = {}) {
      const params = Object.assign(options, {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        // delete: '0',
      }, this.curOptions);
      return this.$ajax.post(
        this,
        this.$api.ASSET_HOUSE_LIST,
        params,
        (res) => {
          this.total = res.data.totalRows;
          this.resultList = res.data.content;
          this.fullHeight = document.documentElement.clientHeight;
        },
      );
    },
    selectMenu(id) {
      if (id == 'all') {
        id = null;
      }
      this.pageNo = 1;
      if (this.curTab == '项目') {
        this.curOptions = {projectId: id};
        this.getData({projectId: id});
      } else {
        this.curOptions = {communityId: id};
        if (id) {
          const data = this.communityList.filter(item => item.id == id);
          this.curProject = data[0].projectId + '#' + data[0].projectName;
        } else {
          this.curProject = null;
        }
        this.getData({communityId: id});
      }
    },
    selectTab(tab) {
      this.curTab = tab;
      this.curOptions = {};
      if (tab == '项目') {
        this.$delete(this.searchLayout[0], 'projectId')
        this.searchLayout[0].communityId = {
          label: '小区/公寓',
          type: 'select',
          width: 6,
          options: this.options.communityId.slice(1),
        }
      } else {
        this.$delete(this.searchLayout[0], 'communityId')
        this.searchLayout[0].projectId = {
          label: '项目',
          type: 'select',
          width: 6,
          options: this.options.projectId.slice(1),
        }
      }
    },
    changePage(page) {
      this.pageNo = page;
      const params = {...this.searchModel};
      if (params.useAndClass) {
        params.useAndClassId = params.useAndClass[1];
        this.$delete(params, 'useAndClass');
      }
      this.getData(params);
    },
    handleSearch() {
      this.pageNo = 1;
      const params = {...this.searchModel};
      if (params.useAndClass) {
        params.useAndClassId = params.useAndClass[1];
        this.$delete(params, 'useAndClass');
      }
      this.getData(params);
    },
    handleReset() {
      this.searchModel = {};
      this.pageNo = 1;
      this.getData();
    },
  },
  computed: {
    maxHeight() {
      return {maxHeight: this.fullHeight + 'px'};
    },
  },
}
</script>

<style scoped>
#sideMenu {
  overflow-x: hidden;
  overflow-y: auto;
  background: #fff;
  min-height: 480px;
  border-right: 1px solid #e8eaec;
  padding-right: 10px;
}
.tab .ivu-tabs-nav-scroll{
  padding-left: 20px;
}
.btn-box {
  display: flex;
  justify-content: flex-end;
}
.btn-box>button, .btn-box>a {
  margin-left: 10px;
  min-width: 86px;
}
</style>
