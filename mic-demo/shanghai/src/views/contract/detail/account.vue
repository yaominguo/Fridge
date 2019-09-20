<template>
  <div>
    <InforBar />
    <div style="fontSize: 0" v-show="leaseStatus == '4' || leaseStatus == '5'">
      <p class="table-label"><Icon color="#2589f3" type="ios-podium" />结账清单</p>
      <div class="table-wrapper">
        <Table :columns="checkoutColumns" :data="checkoutList" />
      </div>
      <div class="table-wrapper">
        <Table style="borderLeft: none;" :columns="columns" :data="sumList" />
      </div>
    </div>
    <!-- 租约账单 -->
    <div class="lease-detail-table">
      <p class="table-label"><Icon color="#2589f3" type="ios-podium"/>租约账单</p>
      <Button v-if="(this.showStatus == '2' || this.showStatus == '10') && checkTimeBtn==true" @click="addLease" type="primary" class="add-lease">添加账单</Button>
      <Tabs :animated="false" type="card">
        <TabPane label="房租" name="rent">
          <Table :columns="rentColumns" :data="rentList" />
        </TabPane>
        <TabPane label="水电煤费用" name="costs">
          <Table :columns="rentColumns" :data="costList" />
        </TabPane>
        <TabPane label="其他费用" name="oth-cost">
          <Table :columns="rentColumns" :data="othList" />
        </TabPane>
      </Tabs>
    </div>
    <!-- 其他记账 -->
    <div class="lease-detail-table">
      <p class="table-label"><Icon color="#2589f3" type="ios-podium"/>其他记账</p>
      <Button v-if="this.showStatus == '2' || this.showStatus == '10'" @click="addNote" type="primary" class="add-note">记一笔账</Button>
      <Table :columns="noteColumns" :data="manualAccts"/>
    </div>
    <Modal
      v-model="openModal"
      title="确认收款"
      :width="400"
      :footer-hide="true">
      <Form v-if="openModal" ref="receiveForm" :label-width="80" label-position="right" :rules="rules" :model="receiveModel">
        <FormItem label="收款方式" prop="receivedChannel">
          <Select v-model="receiveModel.receivedChannel" placeholder="请选择收款方式">
            <Option value="现金">现金</Option>
            <Option value="支付宝">支付宝</Option>
          </Select>
        </FormItem>
        <FormItem label="收款金额" prop="received">
          <Input disabled v-model="receiveModel.received" placeholder="请输入收款金额"/>
        </FormItem>
        <FormItem label="收款日期" prop="receivedTime">
          <DatePicker v-model="receiveModel.receivedTime" placeholder="请选择收款日期"/>
        </FormItem>
        <FormItem label="凭证编号">
          <Input v-model="receiveModel.code" />
        </FormItem>
        <FormItem label="收款备注">
          <Input v-model="receiveModel.note" type="textarea" />
        </FormItem>
        <div style="textAlign: center;">
          <Button type="primary" @click="receiveMoney">提交</Button>
        </div>
      </Form>
    </Modal>
    <addLeaseModal ref="addLeaseRef" @esc="esc" @submitLease="submitLease" :rentList="rentList"  :model="addLeaseModel"></addLeaseModal>
    <addNoteModal ref="addNoteRef" @esc="esc" :base_info="base_info" @submitNote="submitNote" :model="addNoteModel"></addNoteModal>
    <InAndOutModal @close="handleModalClose" :info="rowInfo" :type="modalType" :showModal="show"/>
  </div>
</template>

<script>
import InforBar from './info';
import addLeaseModal from './add-lease';
import addNoteModal from './add-note'
import InAndOutModal from '@/views/accounting/components/in-and-out.vue';

// import RowExpand from './expand';

export default {
  // props:{
  //     canOption:Boolean,
  //   },
  props:{
    showStatus:String,
    showType:String,
  },
  name: 'AccountDetail',
  components: {
    InforBar,
    addLeaseModal,
    addNoteModal,
    InAndOutModal,
  },
  data() {
    return {
      checkTimeBtn:true,
      addLeaseModel:false,
      addNoteModel:false,
      openModal: false,
      modalType: '',
      show: false,
      rowInfo: {},
      receiveModel: {},
      rules: {
        receivedChannel: [
          {
          required: true,
          message: '请选择收款方式',
          trigger: 'change',
          },
        ],
        received: [
          {
          required: true,
          type: 'number',
          message: '请输入金额',
          trigger: 'blur',
          },
        ],
        receivedTime: [
          {
          required: true,
          message: '请选择日期',
          },
        ],
      },
      columns: [
        {
          title: ' ',
          key: 'sum',
          className: 'no-border-bottom',
          render: (h,params) => {
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
                  const data = this.$store.state.leaseDetail;
                  this.modalType = 'detail';
                  this.show = true;
                  this.rowInfo = data.account;
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
                  const data = this.$store.state.leaseDetail;
                  this.modalType = 'register';
                  this.show = true;
                  this.rowInfo = data.account;
                }
              }
            }, '收支登记');
            let btns;
            if (this.showStatus == '5') {
              btns = [detailBtn];
            }else{
              btns=[detailBtn, incomeBtn];
            }
            if (params.index == 0) {
              return h('div', [
                h('span', {
                  style: {
                    'marginRight': '20px',
                  }
                }, params.row.sum),
                ...btns,
              ])
            }
            return h('div', params.row.sum);
          }
        },
      ],
      noteColumns:[
       {
         title:'记账科目',
         render:(h,params)=>{
           return h('div', this.showTypeTex(params.row.type));
         },
       },
       // {
       //   title:'房源',
       //   align:'center',
       //   render:(h,params)=>{
       //     return h('div',{},this.showAddressTex(params.row))
       //   }
       // },
       {
         title:'记账项目',
         render:(h,params)=>{
           return h('div',{},params.row.acctName+'-'+params.row.acctDetailName)
         }
       },
       {
         title:'账期',
         width:180,
         render:(h,params)=>{
           return h('div',{},this.$com.changeDate(params.row.startTime)+'至'+this.$com.changeDate(params.row.endTime))
         }
       },
       {
         title:'应收/付金额（￥）',
         key:'money'
       },
       {
         title:'实收/付金额（￥）',
         //status 0未付 1已付
         render:(h,params)=>{
           if(params.row.status == '0'){
             return h('div',{},'-')
           }else{
             return h('div',{},params.row.money)
           }
         }

       },
       {
         title:'实收/付日期（￥）',
         render:(h,params)=>{
           if(params.row.status == '0'){
             return h('div',{},'-')
           }else{
             return h('div',{},this.$com.changeDate(params.row.realDate))
           }
         }
       },
      ],
      checkoutColumns: [
        {
          title: '退扣',
          key: 'type',
          align: 'center',
          render: (h, params) => {
            const whichType = (type) => {
              switch (type) {
                case '0':
                  return '欠款';
                case '1':
                  return '退还';
                case '2':
                  return '扣款';
                default:
                  return '=';
              }
            }
            return h('div', whichType(params.row.type));
          }
        },
        {
          title: '项目',
          key: 'name',
          align: 'center',
        },
        {
          title: '金额(元)',
          key: 'amount',
          align: 'center',
          render: (h, params) => {
            return h('div', this.$com.toMoney(params.row.amount));
          }
        },
        {
          title: '优惠减免金额(元)',
          key: 'disAmount',
          align: 'center',
          render: (h, params) => {
            return h('div', this.$com.toMoney(params.row.disAmount));
          }
        },
      ],
      rentColumns: [
        {
          title: '项目',
          key: 'object',
          width: 250,
          render: (h, params) => {
            const item = params.row;
            if (item.acctSign == 'deposit' || item.acctSign == 'other') {
              return h('div', item.acctName);
            } else if (item.startTime && item.endTime) {
              return h('div', `${item.acctName}（${item.startTime.split(' ')[0]} 至 ${item.endTime.split(' ')[0]}）`)
            } else {
              return h('div');
            }
          }
        },
        {
          title: '应收金额(元)',
          key: 'receivable',
          align: 'center',
          render: (h, params) => {
            let _receivable=Number(params.row.receivable)-Number(params.row.policyDeduc)-Number(params.row.tempDeduc);
            return h('div', this.$com.toMoney(_receivable));
          }
        },
        {
          title: '应收款日',
          key: 'receivableTime',
          align: 'center',
          render: (h, params) => {
            const { receivableTime } = params.row;
            return h('div', receivableTime && receivableTime.split(' ')[0]);
          }
        },
        {
          title: '已收金额(元)',
          key: 'received',
          align: 'center',
          render: (h, params) => {
            return h('div', this.$com.toMoney(params.row.received));
          }
        },
        {
          title: '收款日期',
          key: 'receivedTime',
          align: 'center',
          render: (h, params) => {
            const { receivedTime } = params.row;
            return h('div', receivedTime && receivedTime.split(' ')[0]);
          }
        },
        {
          title: '状态',
          key: 'status',
          width:130,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Tag', {
                props: {
                  color: this.$com.transformCheckinStatus(params.row.status).color,
                },
              }, this.$com.transformCheckinStatus(params.row.status).txt)
            ])
          }
        },
        {
          title: '收款方式',
          key: 'receivedChannelName',
          align: 'center',
        },
        {
          title: '备注',
          key: 'note',
          align: 'center',
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width:200,
          render: (h, params) => {
            let _receivable=Number(params.row.receivable)-Number(params.row.policyDeduc)-Number(params.row.tempDeduc);
            let arr=[];
            let vm=this;
            let view=h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      ghost: true
                    },
                    style:{
                      margin:'0px 5px'
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          name:'billing-detail',
                          query:{
                            id:params.row.id,
                            showStatus:vm.showStatus
                          }
                        })
                      }
                    }
                  }, '明细');
            let money=
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  ghost: true
                },
                style:{
                  margin:'0px 5px'
                },
                on: {
                  click: () => {
                    // this.showModal(params.row);
                    this.$router.push({
                      name:'billing-detail',
                      query:{
                        tollShow:true,
                        id:params.row.id,
                        showStatus:vm.showStatus
                      }
                    })
                  }
                }
              }, '收款');
            let checkMoney=h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      ghost: true
                    },
                    style:{
                      margin:'0px 5px'
                    },
                    on: {
                      click: () => {
                        // this.showModal(params.row);
                        this.$router.push({
                          name:'billing-detail',
                          query:{
                            reliefShow:true,
                            id:params.row.id,
                            showStatus:vm.showStatus
                          }
                        })
                      }
                    }
                  }, '减免')
            if(vm.showStatus=='2' || vm.showStatus == '10'){
              if(params.row.status == '0' || params.row.status == '3'){
                arr.push(view,money,checkMoney)
              }else if(params.row.status == '2'){
                if(_receivable != params.row.received){
                  arr.push(view,money,checkMoney)
                }else{
                  arr.push(view);
                }
              }else{
                arr.push(view);
              }
            }else{
              arr.push(view);
            }
            return arr;
          }
        }
      ],
    }
  },
  methods: {
    //记账类型
    showTypeTex(type){
      switch (type) {
        case '0':
          return '已收款（预收）';
        case '1':
          return '应收款';
        case '2':
          return '已付款（预付）';
        case '3':
          return '应付款';
        default:
          return '';
      }
    },
    showAddressTex(obj){
      let  {isRoomRelation,sectName,houseName,roomName} = obj;
      if(isRoomRelation == 'false'){
        return '无房源'
      }else{
        return sectName+'-'+houseName+'-'+roomName
      }
    },
    submitNote(val){
      const baseData = this.$store.state.leaseDetail.rent[0];
      val.leaseId = baseData.leaseId;
      val.resourcePics = val.picList;
      val.acctSignId = val.acctName+'-'+val.acctDetailName;
      delete val.picList;
      this.$ajax.post(
          this,
          this.$api.POST_ADD_MANUAL,
          val,
          (res) => {
            this.esc();
            //console.log(this.$refs.noteForm)
            this.$Message.info('新增成功');
            this.$refs.addNoteRef.getCode();
            this.$emit('receive');
          }
      )
    },
    submitLease(val){
      val.receivedDay = this.$com.changeDate(val.receivedTime);
      if(val.acctName == '水费'){
        val.acctSign = 'water'
      }else if(val.acctName =='电费'){
        val.acctSign = 'elec'
      }else if(val.acctName =='燃气费'){
        val.acctSign = 'gas'
      }else{
        val.acctSign = 'other'
      }
      
      val.acctSignId = '一次性费用-'+val.acctName

      delete val.receivedTime;
      this.$ajax.post(
        this,
        this.$api.HAND_ADD_BILL,
        val,
        (res)=>{
          this.esc();
          this.$Message.info('新增成功');
          this.$refs.addLeaseRef.getCode();
          this.$emit('receive');

        }
      )
    },
    esc(){
      this.addLeaseModel = false;
      this.addNoteModel = false;
    },
    addLease(){
      this.$refs.addLeaseRef.getCode();
      this.addLeaseModel = true;
    },
    addNote(){
      this.$refs.addNoteRef.getCode();
      this.addNoteModel = true;
    },
    showModal(data) {
      this.receiveModel = {
        id: data.id,
        received: data.receivable.toString().split(',').join(''),
      };
      this.openModal = true;
    },
    receiveMoney() { // 收付款
      this.receiveModel.received = Number(this.receiveModel.received);
      this.$refs.receiveForm.validate(valid => {
        if (!valid) return;
        this.$ajax.put(
          this,
          this.$api.PUT_RECEIVE_MONEY,
          this.receiveModel,
          (res) => {
            this.openModal = false;
            this.$Message.success('收款成功');
            this.receiveModel = {};
            this.$emit('receive');
          },
        )
      })
    },
    handleModalClose(val) {
      this.show = val;
    },
    checkTime(startTime){
      let curTime = new Date();
      if(startTime.indexOf(' ')){
        startTime=startTime.split(' ')[0]
      }
      //把字符串格式转化为日期类
      let starttime = new Date(Date.parse(startTime));

      var seperator1 = "-";
      var year = curTime.getFullYear();
      var month = curTime.getMonth() + 1;
      var strDate = curTime.getDate();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      let currentdate = year + seperator1 + month + seperator1 + strDate;

      let nowtime = new Date(Date.parse(currentdate));
      if(nowtime<starttime){
        this.checkTimeBtn=false;
      }else{
        this.checkTimeBtn=true;
      }
    },
  },
  computed: {
    base_info(){
      const  data = this.$store.state.leaseDetail;
      if(data && data.lease){
        return data.lease;
      }else{
        return {};
      }
    },
    manualAccts(){
      const data = this.$store.state.leaseDetail;
      if(this.$com.confirm(data, 'manualAccts.length') > 0) {
        return data.manualAccts;
      } else {
        return [];
      }
    },
    rentList() {
      const data = this.$store.state.leaseDetail;
      if(data && data.lease && data.lease.startTime){
        this.checkTime(data.lease.startTime)
      }
      if(this.$com.confirm(data, 'rent.length') > 0) {
        data.rent.forEach(item=>{
          item.startToEnd = item.startTime.split(' ')[0] +' 至 '+ item.endTime.split(' ')[0];
        })
        return data.rent;
      } else {
        return [];
      }
    },
    costList() {
      const data = this.$store.state.leaseDetail;
      if(this.$com.confirm(data, 'gas.length') > 0) {
        return data.gas;
      } else {
        return [];
      }
    },
    othList() {
      const data = this.$store.state.leaseDetail;
      if(this.$com.confirm(data, 'others.length') > 0) {
        return data.others;
      } else {
        return [];
      }
    },
    checkoutList() {
      const data = this.$store.state.leaseDetail;
      if(this.$com.confirm(data, 'account.roomCostDetailsList.length') > 0) {
        let list = [...data.account.roomCostDetailsList];
        list.push({
          name: '总计',
          amount: data.account.amount,
        });
        return list;
      } else {
        return [];
      }
    },
    sumList() {
      const len = this.checkoutList.length;
      const data = this.$store.state.leaseDetail;
      let list = [];
      if (data && data.account && len > 0) {
        for(let i=0; i<len; i++) {
          if (i == 0) {
            list.push({sum: `账务终止时间：${data.account.endDate}`});
          } else if (i == 1) {
            list.push({sum: `退款途径：${data.account.refundMethod || '无'}`});
          } else if (i == 2) {
            list.push({sum: `退款备注：${data.account.remark || '无'}`});
          } else if (i == 3) {
            list.push({btn: null});
          } else {
            list.push({});
          }
        }
      }
      return list;
    },
    leaseStatus() {
      const data = this.$store.state.leaseDetail;
      if (this.$com.confirm(data, 'lease.status')) {
        return data.lease.status;
      } else {
        return '';
      }
    },
  }
}
</script>

<style scoped>
.lease-detail-table{
  position: relative;
}
.add-lease{
  position: absolute;
  right: 10px;
  top: 10px;
}
.add-note{
  position: absolute;
  right: 10px;
  top: -2px;

}
.table-label {
  display: flex;
  align-items: center;
  margin: 20px 0;
  font-size: 16px;
  font-weight: bold;
}
.table-label i {
  margin-right: 5px;
}
.table-wrapper {
  display: inline-block;
  width: 60%;
}
.table-wrapper:last-child{
  width: 40%;
}
</style>
