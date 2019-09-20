<template>
    <Card dis-hover>
        <ActiveForm
            labelPosition="right"
            :labelWidth="90"
            :header="header"
            :layout="searchLayout"
            :model="searchModel"
        />
        <div class="btn-box">
            <Button type="primary" @click="handleSearch">查询</Button>
            <Button @click="handleReset">重置</Button>
        </div>
        <ActiveTable
            :showTitle="true"
            :columns="columns"
            :data="resultList"
            :pageSize="pageSize"
            :current="pageNo"
            :total="total"
            @on-page-change="changePage"
        />
    </Card>
</template>
<script>
import ActiveForm from "@/components/Helper/Form/ActiveForm.vue";
import ActiveTable from "@/components/Helper/Table/ActiveTable.vue";
export default {
  name: "refund",
  components: { ActiveForm, ActiveTable },
  data() {
    return {
      header: {
        title: "信用退款申请列表"
      },
      total: 0,
      pageNo: 1,
      pageSize: 10,
      searchLayout: [
        {
          tenantName_l: {
            label: "姓名",
            type: "input",
            width: 6
          },
          mobile_l: {
            label: "联系电话",
            type: "input",
            width: 6
          },
          certNo_l: {
            label: "证件号",
            type: "input",
            width: 6
          },
          houseAddress_l: {
            label: "房屋地址",
            type: "input",
            width: 6
          }
        },
        // {
        //   applyStatus:{
        //     label:'状态',
        //     type:'select',
        //     width:6,
        //     options:[
        //       {text:'全部',value:'$all'},
        //       {text:'申请中',value:'0'},
        //       {text:'已处理',value:'1'},
        //       {text:'撤回',value:'2'},
        //     ]
        //   }
        // }
      ],
      searchModel: {
        applyStatus:'$all'
      },
      resultList: [],
      columns: [
        {
          title: "承租人",
          key:'tenantName'
        },
        {
          title: "性别",
          render:(h,params)=>{
            let sexName=params.row.sex === '0'?'男':'女';
            return h('div',sexName)
          }
        },
        {
          title: "联系电话",
          minWidth:40,
          key:'mobile'
        },
        {
          title: "证件",
          minWidth:80,
          render:(h,params)=>{
            let certName;
            if(params.row.certType == '0'){
              certName='身份证'
            }else if(params.row.certType == '1'){
              certName='护照'
            }else if(params.row.certType == '2'){
              certName='台胞证'
            }else if(params.row.certType == '3'){
              certName='港澳通行证'
            }
            return [
              h('p',params.row.certNo),
              h('p',certName)
            ]
          }
        },
        {
          title: "房源地址",
          minWidth:200,
          key:'houseAddress'
        },
        {
          title: "预约起止日期",
          minWidth:60,
          render:(h,params)=>{
            return [
              h('div',
              '起期：'+this.$com.strTime(params.row.wishStartTime)
              ),
              h('div',
              '止期：'+this.$com.strTime(params.row.wishEndTime)
              )
            ]
          }
        },
        {
          title: "状态",
          minWidth:85,
          render:(h,params)=>{
            let statusName=params.row.expiringDate==null?'有效':'失效';
            if(statusName == '有效'){
              return h('p','有效')
            }else{
              return [
                h('p',{
                  style:{
                    borderBottom:'1px solid #e0e0e0'
                  }
                },'失效'),
                h('p','失效日期：'+this.$com.strTime(params.row.expiringDate))
              ]
            }
          }
        },
        {
          title: "操作",
          minWidth:80,
          render: (h, params) => {
            let str = {
              leaseId: params.row.contractId,
              roomId: params.row.roomId,
              fromAccount: '0'
            }
            let btns = [];
            let statusName=params.row.expiringDate==null?'有效':'失效';
            let showBtn = h(
              "Button",
              {
                props: {
                  size: "small",
                },
                on:{
                  click:()=>{
                    this.$router.push({
                      name: 'contract-detail',
                      params: str
                    })
                  }
                }
              },
              "查看租约"
            );
            let renfundBtn = h(
              "Button",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                style: {
                  marginLeft: "5px"
                },
                on:{
                  click:()=>{
                    this.refund(params.row)
                  }
                }
              },
              "退款"
            );
            if(statusName == '有效'){
              btns=[showBtn,renfundBtn]
            }else{
              btns=[showBtn]
            }
            return btns;
          }
        }
      ]
    };
  },
  methods: {
    // 退款按钮
    refund(row){
      if(row.id){
        this.$Modal.confirm({
					title: "提示",
					content: "确认退款？",
					okText: "确认",
					cancelText: "取消",
					onOk: () => {
						this.$ajax.post(
							this,
							this.$api.REFUND_INITIATE_POST.replace("{id}", row.id), {},
							(res) => {
								this.$Message.success("退款成功！");
								this.getList();
							}
						)
					}
				})
      }
    },
    // 查询按钮
    handleSearch() {
      this.pageNo = 1;
      this.getList();
    },
    // 重置
    handleReset() {
      this.pageNo = 1;
      this.searchModel = {};
      this.searchModel.applyStatus='$all';
      this.getList();
    },
    changePage() {
      this.pageNo = page;
      this.getList();
    },
    getList() {
      const query = { ...this.searchModel };
      if(query.applyStatus == '$all') delete query.applyStatus;
      const params = Object.assign(query, {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      });
      this.$ajax.get(this, this.$api.REFUNDS_LIST_GET, params, res => {
        this.resultList = res.data.content == null?[]:res.data.content;
        this.total = res.data.totalRows;
      });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>
<style scoped>
.btn-box {
  display: flex;
  justify-content: flex-end;
}
.btn-box > button {
  margin-left: 10px;
  min-width: 86px;
}
</style>

