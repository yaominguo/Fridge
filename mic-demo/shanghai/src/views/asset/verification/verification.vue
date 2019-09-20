<template>
  <div>
    <ActiveForm
    ref="search"
    labelPosition="right"
    :labelWidth="100"
    :header="null"
    :layout="searchLayout"
    :model="searchModel" >
      <div class="btn-box">
        <Button type="primary" @click="handleSearch">查询</Button>
        <Button @click="handleReset">重置</Button>
      </div>
    </ActiveForm>
    <ActiveTable
      :showTitle="true"
      :columns="columns"
      :data="resultList"
      :pageSize="pageSize"
      :current="pageNo"
      :total="total"
      @on-page-change="changePage"
    />
  </div>
</template>

<script>
import ActiveForm from '@/components/Helper/Form/ActiveForm';
import ActiveTable from '@/components/Helper/Table/ActiveTable';

export default {
  name: 'AssetVerification',
  components: {
    ActiveForm,
    ActiveTable,
  },
  props: {
    type: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 0,
      url: this.$api.SEARCH_FLOOR,
      searchLayout:[
        {
          communityId: {
            label: '小区/公寓',
            type: 'select',
            width: 6,
            options: [],
            clearable: true,
          },
          projectId: {
            label: '所属项目',
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
          ownedWhole: {
            label: '持有方式',
            type: 'select',
            width: 6,
            options: [
              {text: '整栋', value: '1'},
              {text: '分散', value: '0'},
            ]
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
            options: [],
          },
          spnonsorId: {
            label: '出资人',
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
        },
      ],
      searchModel: {},
      resultList: [],
      columns: [
        {
          title: '楼名',
          key: 'name',
          minWidth: 200,
          fixed: 'left',
        },
        {
          title: '小区/公寓',
          key: 'communityName',
          minWidth: 150,
          fixed: 'left',
        },
        {
          title: '出资人',
          key: 'spnonsorName',
          minWidth: 100,
        },
        {
          title: '取得/持有方式',
          key: 'methods',
          minWidth: 150,
          render: (h, params) => {
            return h('div', `${params.row.acquisitionMethodName}/${params.row.ownedWhole == '1' ? '整栋' : '分散'}`);
          }
        },
        {
          title: '资产类型及用途',
          key: 'typeAndUse',
          minWidth: 150,
          render: (h, params) => {
            return h('div', [
              h('p', params.row.useAndClassName),
              h('p', params.row.assetUseName),
            ])
          }
        },
        {
          title: '房屋结构',
          key: 'housingStructureName',
          minWidth: 150,
        },
        {
          title: '面积',
          key: 'area',
          minWidth: 200,
          render: (h, params) => {
            const {buildArea, rightArea, averageArea, predictedArea, insideArea, rightRealArea} = params.row,
              build = (buildArea && buildArea != 0) ? `实测面积：${buildArea}㎡` : '',
              predicted = (predictedArea && predictedArea != 0) ? `预测(建筑)面积：${predictedArea}㎡` : '',
              inside = (insideArea && insideArea != 0) ? `套内面积：${insideArea}㎡` : '',
              average = (averageArea && averageArea != 0) ? `公摊面积：${averageArea}㎡` : '',
              right = (rightArea && rightArea != 0) ? `产证面积：${rightArea}㎡` : '',
              real = (rightRealArea && rightRealArea != 0) ? `产证实用面积：${rightRealArea}㎡` : '';
            return h('div', [
              h('p', predicted),
              h('p', build),
              h('p', inside),
              h('p', average),
              h('p', right),
              h('p', real),
            ]);
          }
        },
        {
          title: '产权',
          key: 'property',
          align: 'center',
          minWidth: 80,
          render: (h, params) => {
            return h('div', params.row.rightNo ? '有' : '无');
          }
        },
        {
          title: '项目',
          key: 'projectName',
          minWidth: 100,
        },
        {
          title: '作废原因',
          key: 'deleteReason',
          minWidth: 100,
        },
        {
          title: '操作',
          key: 'actions',
          align: 'center',
          minWidth: 100,
          fixed: 'right',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  size: 'small',
                  type: 'warning',
                },
                style: {
                  marginRight: '5px',
                },
                on: {
                  click: (e) => {
                    this.handleCancel(params.row.id);
                  }
                }
              }, '撤销'),
              // h('Button', {
              //   props: {
              //     size: 'small',
              //     type: 'error',
              //   },
              //   on: {
              //     click: (e) => {
              //       this.handleDelete(params.row.id);
              //     }
              //   }
              // }, '删除'),
            ]);
          }
        },
      ],
    };
  },
  mounted() {
    this.$ajax.all(...this.getOptions(), this.getTypes(), this.changeTab());
  },
  methods: {
    getOptions() {
      const { ASSET_COMMUNITY, ASSET_INVESTOR, ASSET_METHOD, ASSET_STRUCTION, ASSET_CLASS, ASSET_PROJECT, GET_ASSETUSE } = this.$api;
      const list = [
        {url: ASSET_COMMUNITY, name: 'communityId'},
        {url: ASSET_INVESTOR, name: 'spnonsorId'},
        {url: ASSET_METHOD, name: 'acquisitionMethodId'},
        {url: ASSET_STRUCTION, name: 'housingStructure'},
        // {url: ASSET_CLASS, name: 'useAndClassId'},
        {url: ASSET_PROJECT, name: 'projectId'},
        {url: GET_ASSETUSE, name: 'assetUseId'},
      ];
      return list.map(item =>
        this.$ajax.get(
          this,
          item.url,
          {},
          (res) => {
            const data = this.$com.confirm(res, 'data.content');
            this.searchLayout[0][item.name].options = data.map(item => {
              return {
                text: item.name,
                value: item.id,
              }
            });
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
      let obj = {};
      if (this.tabName == 'room') {
        obj = {
          pageSize: this.pageSize,
          pageNo: this.pageNo,
          status: '1',
        }
      } else {
        obj = {
          pageSize: this.pageSize,
          pageNo: this.pageNo,
          delete: '1',
        }
      }
      const params = Object.assign(options, obj);
      return this.$ajax.post(
        this,
        this.url,
        params,
        (res) => {
          this.total = res.data.totalRows;
          this.resultList = res.data.content;
        },
      );
    },
    changePage(page) {
      this.pageNo = page;
      this.getData();
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
      this.pageNo = 1;
      this.searchModel = {};
      this.getData();
    },
    changeTab() {
      if (this.tabName == 'room') {
        const list = [...this.columns];
        list.splice(5, 1);
        list[0] = {
          title: '楼名',
          key: 'floorName',
          minWidth: 160,
          fixed: 'left',
        };
        list.splice(1, 0, {
          title: '分户',
          key: 'roomNo',
          minWidth: 80,
          fixed: 'left',
        })
        this.columns = list;
        this.url = this.$api.ASSET_HOUSE_LIST;
      } else {
        const list = [...this.columns];
        list.splice(6, 0, {
          title: '房屋结构',
          key: 'housingStructureName',
          minWidth: 150,
        })
        list[0] = {
          title: '楼名',
          key: 'name',
          minWidth: 160,
          fixed: 'left',
        };
        list.splice(1, 1);
        this.columns = list;
        this.url = this.$api.SEARCH_FLOOR;
      }
      this.handleReset();
    },
    handleCancel(id) {
      this.$Modal.confirm({
        title: '是否确认撤销此资产',
        content: '<p>撤销后资产将回到原来位置，但关联的待租房源需手动创建。</p>',
        onOk: () => {
          if (this.tabName == 'room') {
            this.$ajax.delete(
              this,
              this.$api.DELETE_ROOM.replace('{id}', id).replace('{status}', '0'),
              null,
              () => {
                this.$Message.success('撤销成功');
                this.handleReset();
              },
            )
          } else {
            this.$ajax.put(
              this,
              this.$api.ASSET_FLOOR + id,
              {status: '1'}, //  '0:未撤销，1已撤销'
              () => {
                this.$Message.success('撤销成功');
                this.handleReset();
              }
            )
          }
        },
      });
    },
    handleDelete(id) {
      this.$Modal.confirm({
        title: '是否确认删除此资产',
        content: '<p>本操作不可撤销，删除后的资产将在本系统不被查询到。</p>',
        onOk: () => {
          if (this.tabName == 'room') {
            this.$ajax.delete(
              this,
              this.$api.ASSET_HOUSE + id,
              {},
              () => {
                this.$Message.success('删除成功');
                this.handleReset();
              },
            )
          } else {
            this.$ajax.delete(
              this,
              this.$api.ASSET_FLOOR + id,
              null,
              () => {
                this.$Message.success('删除成功');
                this.handleReset();
              }
            )
          }
        },
      });
    },
  },
  computed: {
    tabName() {
      return this.type;
    }
  },
}
</script>

<style scoped>
.btn-box {
  display: flex;
  justify-content: flex-end;
}
.btn-box>button {
  margin-left: 10px;
  min-width: 86px;
}
</style>

