<template>
  <Card dis-hover>
    <ActiveForm
      labelPosition="right"
      :labelWidth="60"
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
    <RepairModal :repairId="currentId" :showModal="showModal" @success="handleSuccess" @close="handleClose"/>
  </Card>
</template>

<script>
import ActiveForm from '@/components/Helper/Form/ActiveForm.vue';
import ActiveTable from '@/components/Helper/Table/ActiveTable.vue';
import RepairModal from './components/repair-modal';

export default {
  name: 'RepairList',
  components: {
    ActiveForm,
    ActiveTable,
    RepairModal,
  },
  data() {
    return {
      total: 0,
      pageNo: 1,
      pageSize: 10,
      showModal: false,
      searchLayout:[
        {
          tenantName: {
            label: '租客',
            type: 'input',
            width: 6,
          },
          time: {
            label: '报修时间',
            type: 'date',
            dateType: 'daterange',
            format: 'yyyy-MM-dd',
            width: 6,
          },
          address: {
            label: '地址',
            type: 'input',
            width: 6,
          },
          status: {
            label: '状态',
            type: 'select',
            options: [
              {
                text: '待处理',
                value: 0,
              },
              {
                text: '处理中',
                value: 1,
              },
              {
                text: '已处理',
                value: 2,
              },
            ],
            width: 6,
          },
        },
      ],
      searchModel: {},
      columns: [
        {
          title: '租客',
          key: 'tenant',
          width: 130,
          render: (h, params) => {
            const tip = h('Tooltip', {
              props: {
                content: params.row.tenantPhone,
              }
            }, [
              h('Icon', {
                props: {
                  type: 'ios-call',
                  size: 14,
                },
                style: {
                  cursor: 'pointer',
                  marginLeft: '5px',
                }
              })
            ]);
            return h('div', [
              h('span', params.row.tenantName || '未知'),
              params.row.tenantPhone ? tip : null,
            ]);
          }
        },
        {
          title: '房源地址',
          key: 'address',
        },
        {
          title: '报修内容',
          key: 'content',
        },
        {
          title: '状态',
          key: 'status',
          width: 110,
          align: 'center',
          render: (h, params) => {
            const status = this.$com.transformRepairStatus(params.row.status);
            return h('div', [
              h('Tag', {
                props: {
                  color: status.color,
                },
              }, status.txt)
            ]);
          }
        },
        {
          title: '操作',
          key: 'actions',
          width: 180,
          align: 'center',
          render: (h, params) => {
            const dealBtn = h('Button', {
              props: {
                type: 'primary',
                size: 'small',
              },
              style: {
                'marginLeft': '5px',
              },
              on: {
                click: () => {
                  this.showModal = true;
                  this.currentId = params.row.id;
                }
              }
            }, '处理登记');
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  ghost: true,
                  size: 'small',
                },
                on: {
                  click: () => {
                    this.$router.push({
                      name: 'repair-detail',
                      query: {
                        repairId: params.row.id,
                      }
                    })
                  }
                },
              }, '查看'),
              params.row.status == '2' ? '' : dealBtn,
            ]);
          }
        },
      ],
      resultList: [],
      currentId: '',
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      const options = {...this.searchModel};
      if (options.time && options.time.length>0) {
        options.createTime_gt = options.time[0];
        options.createTime_lt = options.time[1];
      }
      this.$delete(options, 'time');
      const params = Object.assign(options, {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
      });
      this.$ajax.get(
        this,
        this.$api.GET_REPAIR_LIST,
        params,
        res => {
          this.resultList = this.$com.confirm(res, 'data.content', []);
          this.total = res.data.totalRows;
        }
      )
    },
    handleReset() {
      this.pageNo = 1;
      this.searchModel = {};
      this.getList();
    },
    handleSuccess() {
      this.showModal = false;
      this.$Message.success('登记成功');
      setTimeout(() => {
        this.getList();
      }, 0);
    },
    handleSearch() {
      this.pageNo = 1;
      this.getList();
    },
    changePage(page) {
      this.pageNo = page;
      this.getList();
    },
    handleClose(val) {
      this.showModal = val;
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

