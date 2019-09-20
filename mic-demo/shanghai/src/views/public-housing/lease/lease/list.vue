<template>
  <Card dis-hover>
    <Tabs v-model="tabName" @on-click="changeTab" :animated="false">
      <TabPane
        v-for="tab in tabList"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name">
        <div>
          <ActiveForm
          :ref="'search'"
          :labelPosition="'right'"
          :labelWidth="100"
          :header="null"
          :layout="searchLayout"
          :model="searchModel" >
            <div class="inner-box">
              <div>
                <FormItem v-if="tab.name === 'all' || tab.name === 'CONRIM'" label="租约状态" style="fontWeight: bold">
                  <CheckboxGroup v-model="leaseStatusModel" style="fontWeight: normal">
                    <Checkbox v-for="status in getStatus(tab.name)"
                      :key="status.value"
                      :label="status.value">
                      {{status.label}}
                    </Checkbox>
                  </CheckboxGroup>
                </FormItem>
              </div>
              <div class="btn-box">
                <Button type="primary" @click="handleSearch">查询</Button>
                <Button @click="handleReset">重置</Button>
              </div>
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
      </TabPane>
      <div class="actions" slot="extra">
        <Button type="primary" icon="md-add" @click="routerToRegister('putong')">普通租客登记</Button>
        <!-- <Button type="primary" icon="md-add" @click="routerToRegister('zhengfu')">政府房屋租客登记</Button> -->
      </div>
    </Tabs>
  </Card>
</template>

<script>
import ActiveForm from '@/components/Helper/Form/ActiveForm';
import ActiveTable from '@/components/Helper/Table/ActiveTable';

export default {
  name: 'LeaseList',
  components: {
    ActiveForm,
    ActiveTable,
  },
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tabName: 'all',
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
        },
        {
          rentStartRange: {
            label: '租约起始',
            type: 'date',
            dateType: 'daterange',
            width: 6,
          },
          rentEndRange: {
            label: '租约结束',
            type: 'date',
            dateType: 'daterange',
            width: 6,
          },
          realRebackRange: {
            label: '实际退房日期',
            type: 'date',
            dateType: 'daterange',
            width: 6,
          },
          rentCreateRange: {
            label: '租约创建日期',
            type: 'date',
            dateType: 'daterange',
            width: 6,
          },
        },
      ],
      searchModel: {},
      leaseStatusModel: [],
      statusList: [
        {
          label: '租约待确认',
          value: '1',
        },
        {
          label: '签约成功',
          value: '2',
        },
        {
          label: '租约作废',
          value: '3',
        },
        {
          label: '退房未结清',
          value: '4',
        },
        {
          label: '退房已结清',
          value: '5',
        },
        {
          label: '拒签',
          value: '9',
        },
        {
          label: '租约逾期',
          value: '10',
        },
      ],
      statusList2: [
        {
          label: '租约待确认',
          value: '1',
        },
        {
          label: '续租待确认',
          value: '5',
        },
      ],
      tabList: [
        {
          label: '全部',
          name: 'all',
        },
        {
          label: '待租客确认',
          name: 'CONRIM',
        },
        {
          label: '合同快到期',
          name: 'EXPIRE_SOON',
        },
        {
          label: '合同已到期',
          name: 'HAVE_EXPIRE',
        },
        {
          label: '需要退房',
          name: 'REBACK',
        },
      ],
      columns: [
        {
          title: '房源',
          key: 'roomName',
          minWidth: 200,
        },
        {
          title: '承租人',
          key: 'name',
          minWidth: 120,
        },
        {
          title: '承租人电话',
          key: 'phone',
          minWidth: 120,
        },
        {
          title: '租期始末',
          key: 'date',
          minWidth: 200,
        },
        {
          title: '月租金（￥）',
          key: 'rent',
          minWidth: 150,
          render: (h, params) => {
            return h('div', this.$com.toMoney(params.row.rent));
          }
        },
        {
          title: '下期收租日',
          key: 'nextDate',
          minWidth: 100,
        },
        {
          title: '当前合同类型',
          key: 'type',
          minWidth: 120,
          render: (h, params) => {
            return h('div', this.transformContractType(params.row.type))
          },
        },
        {
          title: '租约状态',
          key: 'status',
          minWidth: 120,
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
          minWidth: 150,
          fixed: 'right',
          render: (h, params) => {
            const items = this.renderWhichButton(h, params.row, params.row.status);
            if (items.length > 2) {
              const viewBtn = items.splice(0,1);
              const arr = items.map(item => {
                return h('DropdownItem', [item]);
              })
              return h('div', [
                ...viewBtn,
                h('Dropdown',
                {
                  props: {
                    transfer: true,
                  }
                },
                [
                  h('Button', {
                    props: {
                      size: 'small',
                    },
                    style: {
                      marginRight: '5px',
                    },
                  }, '更多'),
                  h('DropdownMenu',{
                    slot: 'list',
                    style: {
                      textAlign: 'center',
                    },
                  }, arr)
                ])
              ])
            }
            return h('div', items);
          }
        },
      ],
      resultList: [],
    }
  },
  mounted() {
    const { status } = this.$route.params;
    if(status) {
      this.tabName = status;
    }
    this.getLeaseList();
  },
  methods: {
    getStatus(name) {
      if(name === 'all') {
        return this.statusList;
      } else if (name === 'CONRIM') {
        return this.statusList2;
      }
    },
    changePage(page) {
      this.pageNo = page;
      this.getLeaseList();
    },
    changeTab() {
      this.leaseStatusModel = [];
      this.getLeaseList();
    },
    // 请求租约列表
    getLeaseList(params = {}) {
      params = Object.assign(params, {pageNo: this.pageNo, pageSize: this.pageSize}, {type: this.tabName === 'all' ? '' : this.tabName});
      // params.houseKind=JSON.parse(this.$cookie.get('houseKind'))[0].key;
      this.$ajax.get(
        this,
        this.$api.GET_LEASE_LIST,
        params,
        (res) => {
          this.total = res.data.totalRows;
          const data = res.data.content;
          this.resultList = data.map((item) => {
            return {
              houseKind:item.lease.houseKind,
              roomId:item.lease.roomId,
              leaseId: item.lease.id,
              name: item.tenant && item.tenant.name,
              address: item.lease.roomAddress,
              roomName: item.lease.roomName,
              date: this.transformDate(item.lease.startTime, item.lease.endTime),
              phone: item.tenant && item.tenant.phone,
              rent: item.lease.rent,
              nextDate: (item.lease.nextDate).split(' ')[0],
              type: item.lease.type,
              status: item.lease.status,
              sales: '物业',
              haveRenew:item.lease.haveRenew
            };
          });
        }
      );
    },
    // 处理搜索的参数
    handleSearch() {
      const { rentStartRange, rentEndRange, realRebackRange, rentCreateRange } = this.searchModel;
      const params = Object.assign(this.searchModel, {
        rentStartBegin: rentStartRange[0] || null,
        rentStartEnd: rentStartRange[1] || null,
        rentEndStart: rentEndRange[0] || null,
        rentEndEnd: rentEndRange[1] || null,
        realRebackStart: realRebackRange[0] || null,
        realRebackEnd: realRebackRange[1] || null,
        rentCreateStartStart: rentCreateRange[0] || null,
        rentCreateStartEnd: rentCreateRange[1] || null,
        rentStatus: null,
        confirm: null,
      });
      params[`${this.tabName === 'all' ? 'rentStatus' : 'confirm'}`] = this.leaseStatusModel.join(',');
      this.pageNo = 1;
      this.getLeaseList(params);
    },
    handleReset() {
      this.searchModel = {
        rentStartRange: [],
        rentEndRange: [],
        realRebackRange: [],
        rentCreateRange: [],
      };
      this.leaseStatusModel = [];
      this.getLeaseList();
    },
    transformDate(start, end) {
      if (!start || !end) {
        return '';
      }
      const startArr = start.split(' '),
            endArr = end.split(' ');
      return `${startArr[0]} 至 ${endArr[0]}`
    },
    transformContractType(type) {
      return type == '0' ? '电子合同' : '纸质合同';
    },
    renderWhichButton(h, data, status) {
      //公租房
      if(data.houseKind == '0' || data.houseKind == '1'){
          const view = h('Button', {
            props: {
              size: 'small',
              type: 'primary',
              ghost: true,
            },
            style: {
              marginRight: '5px',
            },
            on: {
              click: (e) => {
                e.stopPropagation();
                this.routerToDetail({
                  leaseId: data.leaseId,
                  roomId: data.roomId,
                });
              }
            }
          }, '查看');
          // 修改
          const needToConfirm =
            h('Button', {
              props: {
                size: 'small',
                // type:'text'
              },
              style: {
                marginRight: '5px',
              },
              on: {
                click: (e) => {
                  e.stopPropagation();
                  this.$router.push({
                    name: 'public-housing/contract/tenant-register-edit',
                    query: {
                      type:'edit',
                      roomId: data.roomId,
                      leaseId: data.leaseId,
                    },
                  });

                }
              }
            }, '修改');
          // 作废
          const deleted=
            h('Button', {
              props: {
                size: 'small',
                // type:'text'
              },
              style: {
                marginRight: '5px',
              },
              on: {
                click: (e) => {
                  e.stopPropagation();
                  const sureToDelete = () => {
                    // 根据id修改租约状态(0:未租,1租约待确认,2签约成功,3已删除,4退房未结清,5退房已结清,6续约待确认,7续约成功,8第三方租约)
                    this.$ajax.put(
                      this,
                      this.$api.PUT_CHANGE_STATUS + `${data.leaseId}/3`,
                      {},
                      (res) => {
                        this.$Message.success('作废成功！');
                        this.getLeaseList();
                      },
                    );
                  };
                  this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确定要作废该租约吗？</p>',
                    onOk: () => {
                      sureToDelete();
                    },
                  });
                }
              }
            }, '作废');
          // 续租
          const goOn=h('Button', {
              props: {
                size: 'small',
                // type:'text'
              },
              style: {
                marginRight: '5px',
              },
              on: {
                click: (e) => {
                  e.stopPropagation();
                  // 携带租约id跳转租客登记页面
                  this.$router.push({
                    name: 'public-housing/contract/tenant-register-relet',
                    query: {
                      roomId: data.roomId,
                      leaseId: data.leaseId,
                      type:'relet'
                    },
                  });
                }
              }
            }, '续租');
            // 退租
          const noDel =
            h('Button', {
              props: {
                // type:'text',
                size: 'small',
              },
              style: {
                marginRight: '5px',
              },
              on: {
                click: (e) => {
                  e.stopPropagation();
                  this.routerToDetail({
                    tab: 'account',
                    leaseId: data.leaseId,
                    roomId: data.roomId,
                    type: '退房',
                  });
                },
              }
            }, '退房');
          // 已续约过一次的合同，不能继续续约
          if (status == '2' && data.type=='1') { // 纸质合同-签约成功
            if(data.haveRenew == '0'){
              return [view,needToConfirm,deleted,goOn,noDel];
            }else{
              return [view,needToConfirm,deleted,noDel];
            }
          } else if (status == '1' && data.type=='0') { // 电子合同-租约待签署
            return [view, deleted];
          } else if (data.type=='0' && status == '2') { // 电子合同-签约成功
            if(data.haveRenew == '0'){
              return [view,goOn,noDel];
            }else{
              return [view,noDel];
            }
          } else if (status == '10') { // 纸质合同、电子合同-租约逾期
            if(data.haveRenew == '0'){
              return [view, goOn,noDel];
            }else{
              return [view,noDel];
            }
          }  else {
            return [view];
          }
      }else{
        const view = h('Button', {
          props: {
            size: 'small',
            type: 'primary',
            ghost: true,
          },
          style: {
            marginRight: '5px',
          },
          on: {
            click: (e) => {
              e.stopPropagation();
              this.routerToDetail({
                leaseId: data.leaseId,
                roomId: data.roomId,
              });
            }
          }
        }, '查看');
        // 修改
        const needToConfirm =
          h('Button', {
            props: {
              size: 'small',
              // type:'text'
            },
            style: {
              marginRight: '5px',
            },
            on: {
              click: (e) => {
                e.stopPropagation();
                this.$router.push({
                  name: 'contract/tenant-register-edit',
                  query: {
                    type:'edit',
                    roomId: data.roomId,
                    leaseId: data.leaseId,
                  },
                });

              }
            }
          }, '修改');
        // 作废
        const deleted=
          h('Button', {
            props: {
              size: 'small',
              // type:'text'
            },
            style: {
              marginRight: '5px',
            },
            on: {
              click: (e) => {
                e.stopPropagation();
                const sureToDelete = () => {
                  // 根据id修改租约状态(0:未租,1租约待确认,2签约成功,3已删除,4退房未结清,5退房已结清,6续约待确认,7续约成功,8第三方租约)
                  this.$ajax.put(
                    this,
                    this.$api.PUT_CHANGE_STATUS + `${data.leaseId}/3`,
                    {},
                    (res) => {
                      this.$Message.success('作废成功！');
                      this.getLeaseList();
                    },
                  );
                };
                this.$Modal.confirm({
                  title: '提示',
                  content: '<p>确定要作废该租约吗？</p>',
                  onOk: () => {
                    sureToDelete();
                  },
                });

              }
            }
          }, '作废');
        // 续租
        const goOn=h('Button', {
            props: {
              size: 'small',
              // type:'text'
            },
            style: {
              marginRight: '5px',
            },
            on: {
              click: (e) => {
                e.stopPropagation();
                // 携带租约id跳转租客登记页面
                this.$router.push({
                  name: 'contract/tenant-register-relet',
                  query: {
                    roomId: data.roomId,
                    leaseId: data.leaseId,
                    type:'relet'
                  },
                });
              }
            }
          }, '续租');
          // 退租
        const noDel = h('Button', {
            props: {
              // type:'text',
              size: 'small',
            },
            style: {
              marginRight: '5px',
            },
            on: {
              click: (e) => {
                e.stopPropagation();
                this.routerToDetail({
                  tab: 'account',
                  leaseId: data.leaseId,
                  roomId: data.roomId,
                  type: '退房',
                });
              }
            }
          }, '退房');
        // 已续约过一次的合同，不能继续续约
        if (status == '2' && data.type=='1') { // 纸质合同-签约成功
          if(data.haveRenew == '0'){
            return [view,needToConfirm,deleted,goOn,noDel];
          }else{
            return [view,needToConfirm,deleted,noDel];
          }
        } else if (status == '1' && data.type=='0') { // 电子合同-租约待签署
          return [view, deleted];
        } else if (data.type=='0' && status == '2') { // 电子合同-签约成功
          if(data.haveRenew == '0'){
            return [view,goOn,noDel];
          }else{
            return [view,noDel];
          }
        } else if (status == '10') { // 纸质合同、电子合同-租约逾期
          if(data.haveRenew == '0'){
            return [view, goOn,noDel];
          }else{
            return [view,noDel];
          }
        }  else {
          return [view];
        }
      }

    },
    // 跳转账务信息详情页
    routerToDetail(params) {
      params.fromAccount = '0';
      this.$router.push({
        name: 'public-housing-contract-detail',
        params,
      })
    },
    // 跳转租客登记页
    routerToRegister(val) {
      if(val == 'putong'){
        // this.$router.push({
        //   name: 'contract/tenant-register',
        //   query:{
        //     checkList:'moreCheck'
        //   }
        // });
        this.$router.push({
          name: 'contract/tenant-register-more',
        });
      }else{
        this.$router.push({
          name: 'public-housing/contract/tenant-register',
        });
      }

    },
  },
}
</script>

<style scoped>
.inner-box {
  display: flex;
  justify-content: space-between;
  height: 32px;
}
.btn-box>button {
  padding: 5px 30px;
  margin-left: 10px;
}

</style>
