<template>
<div>
  <ActiveTable
    :showTitle="showTitle"
    :columns="columns"
    :data="data"
    :pageSize="pageSize"
    :current="pageNo"
    :total="total"
    @on-page-change="changePage"
  />
  <Modal
    v-model="discardModal"
    title="作废资产">
    <Form v-if="discardModal" ref="deleteForm" :label-width="120" :rules="rules" :model="deleteInfo">
      <FormItem label="作废原因" prop="deleteReason">
        <Select v-model="deleteInfo.deleteReason">
          <Option value="信息填写错误">信息填写错误</Option>
          <Option value="划转">划转</Option>
          <Option value="出售">出售</Option>
          <Option value="拆除">拆除</Option>
        </Select>
      </FormItem>
      <FormItem label="备注说明">
        <Input v-model="deleteInfo.deleteRemark" type="textarea" />
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="discardOk" type="primary">确定</Button>
    </div>
  </Modal>
</div>
</template>

<script>
import ActiveTable from '@/components/Helper/Table/ActiveTable';
export default {
  name: 'RoomTable',
  components: {
    ActiveTable,
  },
  data() {
    return {
      discardModal: false,
      deleteInfo: {},
      columns: [
        {
          title: '地址',
          key: 'address',
          fixed: 'left',
          minWidth: 200,
          render: (h, params) => {
            const { address, houseNo, houseUnit, roomNo} = params.row;
            return h('div', address + houseNo + houseUnit + roomNo);
          }
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
          title: '面积',
          key: 'area',
          minWidth: 180,
          render: (h, params) => {
            const {rightArea, predictedArea, realArea, rightInsideArea} = params.row,
              predicted = (predictedArea && predictedArea != 0) ? `预测(建筑)面积：${predictedArea}㎡` : '',
              real = (realArea && realArea != 0) ? `套内面积：${realArea}㎡` : '',
              right = (rightArea && rightArea != 0) ? `产证面积：${rightArea}㎡` : '',
              inside = (rightInsideArea && rightInsideArea != 0) ? `产证实用面积：${rightInsideArea}㎡` : '';
            return h('div', [
              h('p', predicted),
              h('p', real),
              h('p', right),
              h('p', inside),
            ]);
          }
        },
        {
          title: '资产类型及用途',
          key: 'use',
          minWidth: 150,
          render: (h, params) => {
            return h('div', [
              h('p', params.row.useAndClassName),
              h('p', params.row.assetUseName),
            ])
          }
        },
        {
          title: '定价',
          key: 'price',
          minWidth: 210,
          render: (h, params) => {
            const list = (params.row.roomCostList || []).map(item => {
              if (item.cost) {
                return h('p', `${item.parName || '未知'} - ${item.name || '未知'}：${item.cost}元`);
              }
            })
            return h('div', [
              h('p', `每平方米价格：${params.row.squareMeterMonthlyRent}元`),
              h('p', `月租金：${params.row.rent}元`),
              h('p', `付款方式：付${params.row.payNum}押${(!params.row.mortgageNum || params.row.mortgageNum == 'auto') ? (params.row.deposit + '元') : params.row.mortgageNum}`),
              ...list,
            ])
          }
        },
        {
          title: '房型及结构',
          key: 'house',
          minWidth: 120,
          render: (h, params) => {
            const {roomNum, parlourNum, toiletNum} = params.row;
            const txt = params.row.apartmentTypeName || `${roomNum}室${parlourNum}厅${toiletNum}卫`;
            return h('div', [
              h('p', txt),
              h('p', params.row.housingStructureName),
            ])
          }
        },
        {
          title: '运营状态',
          key: 'operation',
          minWidth: 150,
          render: (h, params) => {
            const status = () => {
              switch (params.row.leaseStatus) {
                case '0':
                  return [h('p', '未运营')];
                case '1':
                  return [h('p', '运营中/未租')];
                case '2':
                  return [
                    h('p', '运营中/已租'),
                    h('p', `租客：${params.row.leaseTenantName}`),
                    h('p', `租约起始：${params.row.leaseStart}`),
                    h('p', `租约截止：${params.row.leaseEnd}`),
                  ];
                default:
                  return [];
              }
            }
            return h('div', [...status()])
          }
        },
        {
          title: '产权',
          key: 'hasRight',
          minWidth: 80,
          align: 'center',
          render: (h, params) => {
            const txt = params.row.rightNo ? '有' : '无';
            return h('div', txt);
          },
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
            let items = this.operateBtns(h, params), btns = [...items];
            if (items.length >=3) {
              const arr = items.map(item => {
                return h('DropdownItem', [item]);
              })
              btns = h('Dropdown',
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
            }
            return h('div', [
              btns,
            ])
          }
        },
      ],
      rules: {
        deleteReason: [{
          required: true,
          message: "请选择作废原因",
        }],
      },
      curId: '',
    }
  },
  props: {
    showTitle: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: [],
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageNo: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    discardOk() {
      this.$refs.deleteForm.validate(valid => {
        if (!valid) return;
        this.discardModal = false;
        this.$Modal.confirm({
          title: '确认作废分户信息？',
          content: '<p>资产作废需由专人审批后方可生效。生效后，不可撤回。</p>',
          onOk: () => {
            this.$ajax.delete(
              this,
              this.$api.DELETE_ROOM.replace('{id}', this.curId).replace('{status}', '1'),
              {...this.deleteInfo, status: '3'},
              () => {
                this.$Message.success('作废成功');
                this.deleteInfo = {};
                this.handleReset();
              },
            )
          }
        })
      })
    },
    changePage(page) {
      this.$emit('changePage', page);
    },
    handleReset() {
      this.$emit('success');
    },
    operateBtns(h, params) {
      const o = {
        style: {
          display: 'inline-block',
          width: '100%',
        },
      };
      const b = {
        props: {
          size: 'small',
          type: 'primary',
        },
        style: {
          marginLeft: '5px',
        },
      };
      const events = (status) => {
        return {
          on: {
            click: (e) => {
              e.stopPropagation();
              this.$Modal.confirm({
                title: '是否确认撤回审批',
                content: '<p>审批撤回后，原修改内容将失效。</p>',
                onOk: () => {
                  this.$ajax.put(
                    this,
                    this.$api.POST_BACK_VERIFY.replace('{id}', params.row.id) + '?status=' + status,
                    null,
                    () => {
                      this.$Message.success('撤回成功');
                      this.handleReset();
                    }
                  )
                }
              })
            }
          },
        }
      }
      const draftBtns = [
        h('a', {
          ...o,
          on: {
            click: (e) => {
              e.stopPropagation();
              this.$router.push({
                name: 'add-single-room',
                query: {
                  id: params.row.id,
                  isEdit: '1',
                },
              })
            }
          }
        }, '修改'),
        h('a', {
          ...o,
          on: {
            click: (e) => {
              e.stopPropagation();
              this.$Modal.confirm({
                title: '确认新增分户信息？',
                content: '<p>资产新增需由专人审批后方可生效。生效后，不可撤回。</p>',
                onOk: () => {
                  this.$ajax.post(
                    this,
                    this.$api.POST_ADD_VERIFY.replace('{id}', params.row.id),
                    null,
                    () => {
                      this.$Message.success('提交成功');
                      this.handleReset();
                    }
                  )
                },
              });
            }
          },
        }, '提交新增审批'),
        h('a', {
          ...o,
          props: {
            type: 'error',
            size: 'small',
          },
          on: {
            click: (e) => {
              e.stopPropagation();
              this.$Modal.confirm({
                title: '确认删除分户信息？',
                content: '<p>删除后，数据将无法恢复或找回。</p>',
                onOk: () => {
                  this.$ajax.delete(
                    this,
                    this.$api.ASSET_HOUSE + params.row.id,
                    null,
                    () => {
                      this.$Message.success('删除成功');
                      this.handleReset();
                    }
                  )
                },
              });
            }
          },
        }, '删除'),
      ];
      const passBtns = [
        h('Button', {
          ...b,
          on: {
            click: (e) => {
              e.stopPropagation();
              this.$router.push({
                name: 'add-single-room',
                query: {
                  id: params.row.id,
                  isEdit: '1',
                },
              })
            }
          }
          }, '修改'),
        h('Button', {
          ...b,
          props: {
            type: 'error',
            size: 'small',
          },
          on: {
            click: (e) => {
              e.stopPropagation();
              this.curId = params.row.id;
              this.deleteInfo = {};
              this.discardModal = true;
            }
          },
        }, '作废')
      ];
      switch (params.row.checkStatus) {
        case '0':
          return draftBtns;
        case '1':
          return [h('Button', {...b, ...events('0')}, '撤回新增审批')];
        case '2':
          return [h('Button', {...b, ...events('5')}, '撤回修改审批')];
        case '3':
          return [h('Button', {...b, ...events('5')}, '撤回作废审批')];
        case '5':
          return passBtns;
        case '7':
          if (params.row.dataStatus == '0') {
            return draftBtns;
          } else if (params.row.dataStatus == '1') {
            return passBtns;
          } else {
            return [];
          }
        default:
          return [];
      }
    },
  },
}
</script>

<style>

</style>
