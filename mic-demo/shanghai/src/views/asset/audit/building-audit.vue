<template>
<div>
  <Form :label-width="90" style="font-weight: bold">
    <FormItem label="审批状态">
      <RadioGroup @on-change="handleSearch" v-model="searchModel.checkStatus" type="button" >
        <Radio v-for="item in status" :key="item.id" :label="item.id">{{item.txt}}</Radio>
      </RadioGroup>
    </FormItem>
  </Form>
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
    </div>
  </ActiveForm>
  <ActiveTable
    :showTitle="true"
    :columns="tableLayout"
    :data="resultList"
    :pageSize="pageSize"
    :current="pageNo"
    :total="total"
    @on-page-change="changePage"
  />
  <Modal title="审批" v-model="showAudit">
    <Form ref="form" v-if="showAudit" :label-width="100" :rules="rules" :model="auditInfo">
      <FormItem label="审批结果" prop="isPass">
        <RadioGroup v-model="auditInfo.isPass">
          <Radio label="1">审批通过</Radio>
          <Radio label="0">审批拒绝</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="审批原因">
        <Input v-model="auditInfo.reason" type="textarea" placeholder="请输入审批原因"/>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="handleAudit" type="primary">确定</Button>
    </div>
  </Modal>
</div>
</template>

<script>
import ActiveForm from '@/components/Helper/Form/ActiveForm';
import ActiveTable from '@/components/Helper/Table/ActiveTable';
export default {
  name: 'BuildingAudit',
  components: {
    ActiveForm,
    ActiveTable,
  },
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 0,
      showAudit: false,
      status: [
        {id: 'all', txt: '全部'},
        {id: '1', txt: '待审批'},
        {id: '2', txt: '审批通过'},
        {id: '3', txt: '审批拒绝'},
        {id: '4', txt: '审批撤回'},
      ],
      searchLayout: [
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
          ownedWhole: {
            label: '持有方式',
            type: 'select',
            width: 6,
            options: [
              {text: '整栋', value: '1'},
              {text: '分散', value: '0'},
            ]
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
          communityId: {
            label: '所属小区',
            type: 'select',
            width: 6,
            options: [],
          },
        }
      ],
      searchModel: {
        checkStatus: 'all',
      },
      tableLayout: [
        {
          title: '楼名',
          key: 'name',
          minWidth: 200,
          fixed: 'left',
        },
        {
          title: '小区/公寓及项目',
          key: 'communityAndProject',
          minWidth: 150,
          render: (h, params) => {
            return h('div',[
              h('p', params.row.communityName),
              h('p', params.row.projectName),
            ])
          }
        },
        {
          title: '资产编号',
          key: 'no',
          minWidth: 120,
          // fixed: 'left',
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
            const acquisitionMethodName = params.row.acquisitionMethodName || '未知';
            let ownedWhole = '未知';
            if(params.row.ownedWhole == '1') {
              ownedWhole = '整栋';
            } else if (params.row.ownedWhole == '0') {
              ownedWhole = '分散';
            }
            return h('div', `${acquisitionMethodName}/${ownedWhole}`);
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
          minWidth: 70,
          align: 'center',
          render: (h, params) => {
            return h('div', params.row.rightNo ? '有' : '无');
          }
        },
        {
          title: '运营中',
          key: 'operating',
          minWidth: 90,
          align: 'center',
          render: (h, params) => {
            const txt = params.row.isOperating == '1' ? '是' : '否';
            return h('div', txt);
          }
        },
        {
          title: '盘点情况',
          key: 'checkDate',
          minWidth: 180,
          render: (h, params) => {
            const {checkDate} = params.row;
            const isChecked = checkDate != new Date().getFullYear() ? '否' : '是';
            return h('div', [
              h('p', `本周期是否已盘点：${isChecked}`),
              h('p', `最近盘点年份：${checkDate && checkDate != '0' ? checkDate + '年' : '无' }`),
            ]);
          }
        },
        {
          title: '状态',
          key: 'status',
          minWidth: 100,
          render: (h, params) => {
            return h('div', this.$com.transformCheckStatus(params.row.checkStatus));
          },
        },
        {
          title: '操作',
          key: 'actions',
          align: 'center',
          minWidth: 150,
          fixed: 'right',
          render: (h, params) => {
            const btn = () => {
              // 审批通过、撤回、驳回的不显示审批按钮
              if (['5', '6', '7'].indexOf(params.row.checkStatus) < 0) {
                return h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.curId = params.row.id;
                      this.auditInfo = {};
                      this.showAudit = true;
                    }
                  }
                } ,'审核');
              }
              return null;
            };
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  ghost: true,
                },
                style: {
                  marginRight: '5px',
                },
                on: {
                  click: () => this.$router.push({name: 'building-detail', query: {id: params.row.id}})
                },
              } ,'查看'),
              btn(),
            ])
          }
        },
      ],
      curId: null,
      resultList: [],
      auditInfo: {},
      rules: {
        isPass: [{
          required: true,
          message: "请选择审批结果",
        }],
      },
    }
  },
  mounted() {
    this.$ajax.all(this.getOptions(), this.getTypes(), this.handleSearch());
  },
  methods: {
    getOptions() {
      const { ASSET_COMMUNITY, ASSET_INVESTOR, ASSET_METHOD, ASSET_STRUCTION } = this.$api;
      const list = [
        {url: ASSET_COMMUNITY, name: 'communityId'},
        {url: ASSET_INVESTOR, name: 'spnonsorId'},
        {url: ASSET_METHOD, name: 'acquisitionMethodId'},
        {url: ASSET_STRUCTION, name: 'housingStructure'},
      ];
      return list.map(item =>
        this.$ajax.get(
          this,
          item.url,
          {},
          (res) => {
            const data = this.$com.confirm(res, 'data.content', []);
            const list = data.map(item => {
              return {
                text: item.name,
                value: item.id,
              }
            });
            this.searchLayout[0][item.name].options.push(...list);
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
      });
      return this.$ajax.post(
        this,
        this.$api.POST_AUDIT_BUILDING,
        params,
        (res) => {
          this.total = res.data.totalRows;
          this.resultList = res.data.content;
        },
      );
    },
    handleSearch() {
      const params = Object.assign({}, this.searchModel, {
        checkStatus: this.searchModel.checkStatus == 'all' ? null : this.searchModel.checkStatus,
      })
      this.getData(params);
    },
    handleReset() {
      this.pageNo = 1;
      this.searchModel = {checkStatus: 'all'};
      this.handleSearch();
    },
    changePage(page) {
      this.pageNo = page;
      this.handleSearch();
    },
    handleAudit() {
      this.$refs.form.validate(valid => {
        if (!valid) return;
        this.showAudit = false;
        let status = null;
        if (this.auditInfo.isPass == '1') {
          status = '5';
        } else if (this.auditInfo.isPass == '0'){
          status = '7';
        }
        this.$ajax.put(
          this,
          this.$api.POST_BUILDING_BACK_VERIFY.replace('{id}', this.curId) + '?status=' + status + '&reason=' + this.auditInfo.reason,
          null,
          () => {
            this.$Message.success('审批完成');
            this.handleReset();
          }
        )
      })
    },
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
