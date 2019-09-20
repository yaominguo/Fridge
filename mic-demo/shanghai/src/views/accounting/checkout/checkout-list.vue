<template>
  <Card dis-hover>
    <ActiveForm
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
      :columns="columns"
      :data="resultList"
      :pageSize="pageSize"
      :current="pageNo"
      :total="total"
      @on-page-change="changePage"
    />
    <InAndOutModal @success="getList" @close="handleModalClose" :info="rowInfo" :type="modalType" :showModal="showModal"/>
  </Card>
</template>

<script>
import ActiveForm from '@/components/Helper/Form/ActiveForm.vue';
import ActiveTable from '@/components/Helper/Table/ActiveTable.vue';
import InAndOutModal from '../components/in-and-out.vue';

export default {
  name: 'CheckoutList',
  components: {
    ActiveForm,
    ActiveTable,
    InAndOutModal,
  },
  data() {
    return {
      total: 0,
      pageNo: 1,
      pageSize: 10,
      searchLayout:[
        {
          department: {
            label: '小区/公寓',
            type: 'input',
            width: 6,
          },
          leaseUserName: {
            label: '承租人姓名',
            type: 'input',
            width: 6,
          },
          leaseUserPhone: {
            label: '承租人电话',
            type: 'input',
            width: 6,
          },
          contactType: {
            label: '合同类型',
            type: 'select',
            options: [
              {
                text: '电子合同',
                value: 0,
              },
              {
                text: '纸质合同',
                value: 1,
              },
            ],
            width: 6,
          },
          // rentStartRange: {
          //   label: '租约起始',
          //   type: 'date',
          //   dateType: 'daterange',
          //   width: 6,
          // },
          // rentEndRange: {
          //   label: '租约结束',
          //   type: 'date',
          //   dateType: 'daterange',
          //   width: 6,
          // },
          // realRebackRange: {
          //   label: '实际退房日期',
          //   type: 'date',
          //   dateType: 'daterange',
          //   width: 6,
          // },
          // rentCreateRange: {
          //   label: '租约创建日期',
          //   type: 'date',
          //   dateType: 'daterange',
          //   width: 6,
          // },
        },
      ],
      searchModel: {},
      showModal: false,
      modalType: '',
      rowInfo: {},
      columns: [
        {
          title: '房源',
          key: 'roomName',
          minWidth: 120,
        },
        {
          title: '承租人',
          key: 'tenant',
          // minWidth: 120,
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
              h('span', params.row.tenantName),
              params.row.tenantPhone ? tip : null,
            ]);
          }
        },
        // {
        //   title: '承租人电话',
        //   key: 'tenantPhone',
        //   // minWidth: 120,
        // },
        // {
        //   title: '租期始末',
        //   key: 'date',
        //   minWidth: 80,
        //   render: (h, params) => {
        //     const start = params.row.startTime, end = params.row.endTime;
        //     const date = `${(start && start.split(' ')[0]) || '暂无'} 至 ${(end && end.split(' ')[0]) || '暂无'}`;
        //     return h('div', date);
        //   }
        // },
        {
          title: '账务终止日期',
          key: 'date',
          render: (h, params) => {
            const date = params.row.endDate;
            return h('div', (date && date.split(' ')[0]) || '暂无');
          }
        },
        {
          title: '金额',
          minWidth: 20,
          key: 'count',
          render: (h, params) => {
            const money = (params.row.amount && Number(params.row.amount)) || null;
            let txt = '';
            if (money || money == '0') {
              txt = money >= 0 ? '应收' : '应退';
            }
            return h('div', `${(money && txt) && (txt + ' : ' + this.$com.toMoney(Math.abs(money)) + '元') || '暂无'}`)
          }
        },
        // {
        //   title: '月租金（￥）',
        //   key: 'rent',
        //   // minWidth: 150,
        //   render: (h, params) => {
        //     return h('div', this.$com.toMoney(params.row.rent));
        //   }
        // },
        {
          title: '合同类型',
          key: 'type',
          // minWidth: 120,
          render: (h, params) => {
            return h('div', this.transformContractType(params.row.type))
          },
        },
        {
          title: '租约状态',
          key: 'status',
          // minWidth: 30,
          render: (h, params) => {
            const status = this.$com.transformLeaseStatus(params.row.status);
            return h('div', [
              h('Tag', {
                props: {
                  color: status.color,
                },
              }, status.txt)
            ]);
          },
        },
        {
          title: '操作',
          key: 'actions',
          align: 'center',
          minWidth: 100,
          // fixed: 'right',
          render: (h, params) => {
            const detailBtn = h('Button', {
              props: {
                type: 'primary',
                size: 'small',
              },
              style: {
                'marginLeft': '5px',
              },
              on: {
                click: () => {
                  this.modalType = 'detail';
                  this.showModal = true;
                  this.rowInfo = params.row;
                }
              }
            }, '明细');
            const incomeBtn = h('Button', {
              props: {
                type: 'success',
                size: 'small',
              },
              style: {
                'marginLeft': '5px',
              },
              on: {
                click: () => {
                  this.modalType = 'register';
                  this.showModal = true;
                  this.rowInfo = params.row;
                }
              }
            }, '收支登记');
            let btns = [detailBtn, incomeBtn];
            if (params.row.status == '5') {
              btns = [detailBtn];
            } else if (!params.row.leaseId) {
              btns = [];
            }
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  ghost: true,
                  size: 'small',
                },
                on: {
                  click: () => {
                    this.routerToDetail({
                      tab: 'account',
                      leaseId: params.row.leaseId,
                      roomId: params.row.roomId,
                    })
                  }
                },
              }, '查看'),
              ...btns,
            ]);
          }
        },
      ],
      resultList: [],
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      const query = {...this.searchModel};
      // this.$delete(query, 'realRebackRange');
      // this.$delete(query, 'rentCreateRange');
      // this.$delete(query, 'rentEndRange');
      // this.$delete(query, 'rentStartRange');

      const params = Object.assign(query, {pageNo: this.pageNo, pageSize: this.pageSize});
      this.$ajax.post(
        this,
        this.$api.POST_CHECKOUT_LIST,
        params,
        (res) => {
          this.resultList = this.$com.confirm(res, 'data.content', []).map(item => Object.assign(item.lease || {}, item.roomCost || {}));
          this.total = res.data.totalRows;
        }
      )
    },
    handleReset() {
      this.pageNo = 1;
      this.searchModel = {};
      this.getList();
    },
    handleSearch() {
      this.pageNo = 1;
      this.getList();
    },
    changePage(page) {
      this.pageNo = page;
      this.getList();
    },
    // 跳转账务信息详情页
    routerToDetail(params) {
      params.fromAccount = '0';
      this.$router.push({
        name: 'contract-detail',
        params,
      })
    },
    handleModalClose(val) {
      this.showModal = val;
    },
    transformContractType(type) {
      if (type == '0') {
        return '电子合同';
      } else if (type == '1') {
        return '纸质合同'
      } else {
        return '未知';
      }
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
