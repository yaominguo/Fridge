<template>
  <Card dis-hover>
    <div class="title">
      <h5>欠款：{{debtTotal}}元</h5>
    </div>
    <div class="content">
      <Table :columns="debt" :data="debtData"/>
    </div>
    <Divider style="margin: 16px 0;"/>
    <div class="title">
      <h5>退还：{{backTotal}}元</h5>
      <Button @click="addNewRow('backData')" type="primary" size="small">新增退还</Button>
    </div>
    <div class="content">
      <Table :columns="back" :data="backData"/>
    </div>
    <Divider style="margin: 16px 0;"/>
    <div class="title">
      <h5>扣款：{{deductionTotal}}元</h5>
      <Button @click="addNewRow('deductionData')" type="primary" size="small">新增扣款</Button>
    </div>
    <div class="content">
      <Table :columns="deduction" :data="deductionData"/>
    </div>
    <Divider style="margin: 16px 0;"/>
    <h3>{{resultNum >= 0 ? '应收' : '应付'}}：<span style="color: red;">{{$com.toMoney(Math.abs(resultNum))}}</span>元</h3>
    备注：<Input v-model="remark" style="width: 50%; marginTop: 16px;" type="textarea" />
    <Divider style="margin: 16px 0;"/>
    <div style="textAlign: center;">
      <Button @click="handleSubmit" type="primary">提交</Button>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'CheckOut',
  data() {
    return {
      debt: [
        {
          title: '项目',
          key: 'name',
          align: 'center',
        },
        {
          title: '金额',
          key: 'count',
          align: 'center',
        },
        {
          title: '是否优惠减免',
          key: 'canDiscount',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Checkbox', {
                on: {
                  'on-change': (val) => {
                    this.debtData[params.index].checked = val;
                    const obj = this.debtData[params.index];
                    obj.discount = 0;
                    this.debtData.splice(params.index, 1, obj);
                  }
                },
                props: {
                  value: this.debtData[params.index].checked,
                },
              })
            ])
          }
        },
        {
          title: '减免金额',
          key: 'discount',
          align: 'center',
          render: (h, params) => {
            const editModel = [
              h('InputNumber', {
                props: {
                  disabled: this.debtData[params.index].checked ? false : true,
                  min: 0,
                  max: this.$com.toFloat(params.row.count),
                  value: params.row.discount || 0.00,
                },
                on: {
                  'on-change': (val) => {
                    params.row.discount = val;
                  }
                }
              }),
              h('Button', {
                props: {
                  size: 'small',
                  type: 'primary',
                  disabled: this.debtData[params.index].checked ? false : true,
                },
                style: {
                  marginLeft: '5px',
                },
                on: {
                  'click': () => {
                    const obj = Object.assign(this.debtData[params.index], {isEdit: false, discount: params.row.discount});
                    this.debtData.splice(params.index, 1, obj);
                  }
                }
              }, '确定')
            ];
            const notEditModel = [
              h('span', params.row.discount),
              h('Button', {
                props: {
                  size: 'small',
                  type: 'warning',
                  disabled: this.debtData[params.index].checked ? false : true,
                },
                style: {
                  marginLeft: '10px',
                },
                on: {
                  'click': () => {
                    this.editRow('debtData', params.index);
                  }
                }
              }, '修改')
            ];
            return h('div', params.row.isEdit ? editModel : notEditModel);
          }
        },
      ],
      debtData: [],
      back: [
        {
          title: '项目',
          key: 'name',
          align: 'center',
          render: (h, params) => {
            if (params.row.isEdit) {
              return h('div', [
                h('Input', {
                  props: {
                    placeholder: '请输入项目名称',
                    value: params.row.name || '',
                  },
                  on: {
                    'on-blur': (e) => {
                      this.backData[params.index].name = e.target.value;
                    }
                  }
                }),
              ])
            }
            return h('div', params.row.name);
          },
        },
        {
          title: '退还金额',
          key: 'count',
          align: 'center',
          render: (h, params) => {
            if (params.row.isEdit) {
              return h('div', [
                h('InputNumber', {
                  props: {
                    value: this.$com.toFloat(params.row.count),
                    min: 0,
                  },
                  on: {
                    'on-change': (val) => {
                      params.row.count = val;
                    }
                  }
                }),
              ])
            }
            return h('div', this.$com.toMoney(params.row.count));
          },
        },
        {
          title: '操作',
          key: 'operate',
          align: 'center',
          render: (h, params) => {
            const whichBtn = params.row.isEdit
              ? h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                },
                on: {
                  click: () => {
                    this.saveRow('backData', params.row, params.index);
                  },
                }
              }, '确定')
              : h('Button', {
                props: {
                  type: 'warning',
                  size: 'small',
                },
                on: {
                  click: () => {
                    this.editRow('backData', params.index);
                  },
                }
              }, '修改');
            return h('div', [
              whichBtn,
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginLeft: '5px',
                },
                on: {
                  click: () => {
                    this.deleteRow('backData', params.index);
                  }
                }
              }, '删除'),
            ])
          }
        },
      ],
      backData: [],
      deduction: [
        {
          title: '项目',
          key: 'name',
          align: 'center',
          render: (h, params) => {
            if (params.row.isEdit) {
              return h('div', [
                h('Input', {
                  props: {
                    placeholder: '请输入项目名称',
                    value: params.row.name || '',
                  },
                  on: {
                    'on-blur': (e) => {
                      this.deductionData[params.index].name = e.target.value;
                    }
                  }
                }),
              ])
            }
            return h('div', params.row.name);
          },
        },
        {
          title: '扣款金额',
          key: 'count',
          align: 'center',
          render: (h, params) => {
            if (params.row.isEdit) {
              return h('div', [
                h('InputNumber', {
                  props: {
                    value: params.row.count || 0.00,
                    min: 0,
                  },
                  on: {
                    'on-change': (val) => {
                      params.row.count = val;
                    },
                  }
                }),
              ])
            }
            return h('div', this.$com.toMoney(params.row.count));
          },
        },
        {
          title: '操作',
          key: 'operate',
          align: 'center',
          render: (h, params) => {
            const whichBtn = params.row.isEdit
              ? h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                },
                on: {
                  click: () => {
                    this.saveRow('deductionData',params.row, params.index);
                  },
                }
              }, '确定')
              : h('Button', {
                props: {
                  type: 'warning',
                  size: 'small',
                },
                on: {
                  click: () => {
                    this.editRow('deductionData', params.index);
                  },
                }
              }, '修改');
            return h('div', [
              whichBtn,
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginLeft: '5px',
                },
                on: {
                  click: () => {
                    this.deleteRow('deductionData', params.index);
                  }
                }
              }, '删除'),
            ])
          }
        },
      ],
      deductionData: [],
      remark: '',
    };
  },
  mounted() {
    const { leaseId, date } = this.$route.params;
    if(leaseId && date) {
      this.getData(leaseId, date);
    }
  },
  methods: {
    getData(id, date) {
      this.$ajax.get(
        this,
        `${this.$api.GET_CHECHOUT_RECORD}/${id}/${date}`,
        null,
        (res) => {
          const data = res.data.content;
          const confirmData = this.$com.confirm_currying(data);
          if (confirmData('debt.length') > 0) {
            this.debtData = data.debt.map(item => {
              return {
                name: item.acct_name,
                count: item.received || 0,
                checked: item.isResuce || false,
                discount: item.reduceSum || 0,
                isEdit: false,
              };
            })
          }
          // if (confirmData('reback.length') > 0) {
          //   this.backData = data.reback.map(item => {
          //     return {
          //       name: item[0],
          //       count: item[1],
          //     };
          //   })
          // }
        }
      )
    },
    deleteRow(dataName, index) {
      this[dataName].splice(index, 1);
    },
    editRow(dataName, index) {
      const data = Object.assign(this[dataName][index], { isEdit: true, });
      this[dataName].splice(index, 1, data);
    },
    saveRow(dataName, data, index) {
      if (!this[dataName][index].name) {
        this.$Message.error('请输入项目名称');
        return;
      }
      if (!data.count) {
        this.$Message.error('请输入金额');
        return;
      }
      const newData = Object.assign(this[dataName][index], { isEdit: false, count: data.count });
      this[dataName].splice(index, 1, newData);
    },
    addNewRow(dataName) {
      this[dataName].unshift({
        isEdit: true,
      })
    },
    handleSubmit() {
      const debtData = this.transformData(this.debtData, 0);
      const backData = this.transformData(this.backData, 1);
      const deductionData = this.transformData(this.deductionData, 2);
      const params = {
        amount: this.resultNum,
        endDate: this.$route.params.date,
        leaseId: this.$route.params.leaseId,
        remark: this.remark,
        roomCostDetailsList: [...debtData, ...backData, ...deductionData],
      };
      this.$ajax.put(
        this,
        this.$api.PUT_CHECHOUT_RECORD + params.leaseId,
        params,
        (res) => {
          this.$Message.success('退房成功');
          this.$router.back();
        }
      )
    },
    transformData(data, type) {
      return data.map(item => {
        return {
          amount: this.$com.toFloat(item.count),
          disAmount: item.checked ? item.discount : 0,
          name: item.name,
          type,
        };
      });
    },
  },
  computed: {
    debtTotal() {
      let result = 0;
      this.debtData.forEach(item => {
        result += this.$com.toFloat(item.count) - this.$com.toFloat(item.discount);
      })
      return this.$com.toMoney(result);
    },
    backTotal() {
      let result = 0;
      this.backData.forEach(item => {
        result += this.$com.toFloat(item.count);
      })
      return result;
    },
    deductionTotal() {
      let result = 0;
      this.deductionData.forEach(item => {
        result += this.$com.toFloat(item.count);
      })
      return result;
    },
    resultNum() {
      const { debtTotal, backTotal, deductionTotal } = this;
      return this.$com.toFloat(debtTotal) + this.$com.toFloat(deductionTotal) - this.$com.toFloat(backTotal);
    },
  }
}
</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.content {
  margin-bottom: 16px;
}
</style>

