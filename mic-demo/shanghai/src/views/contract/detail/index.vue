<template>
<Card dis-hover>
    <Tabs v-model="currentTab" :animated="false" class="tab-container">
      <TabPane label="电子租约详情" name="lease">
        <LeaseDetail :showStatus="showStatus" :showType="showType" :roomInfo="roomInfo"  :teantLists="teantLists" v-if="currentTab == 'lease'" />
      </TabPane>
      <TabPane label="账务信息" name="account">
        <AccountDetail @receive="receiveMoney" :showStatus="showStatus" :showType="showType"/>
      </TabPane>
      <TabPane label="合同信息" name="contract">
        <ContractDetail :lease="leaseInfo" :renew="renew" />
      </TabPane>
      <!-- <TabPane label="操作记录" name="operate">
        <OperateDetail />
      </TabPane> -->
      <div slot="extra">
        <Button v-if="showStatus=='2' && showType =='1'" @click="routeTo('edit')" type="primary" ghost>修改</Button>
        <Button v-if="((showStatus=='2' && showType =='1') || (showStatus=='1' && showType=='0')) && this.haveBilling == '0'" @click="handleDelete" type="primary" ghost>作废</Button>
        <Button v-if="(showStatus=='2' || showStatus=='10') && haveRenew == '0'" @click="routeTo('relet')" type="primary" ghost>续租</Button>
        <!-- <Button type="primary" ghost>换房</Button> -->
        <Button v-if="showStatus=='2' || showStatus=='10'" @click="checkoutModal = true" type="primary" ghost>退房</Button>
        <!-- <Button @click="accountModal = true" type="primary" ghost>结账</Button> -->
      </div>
    </Tabs>
    <Modal
      v-model="checkoutModal"
      title="退房操作"
      :width="400"
      :footer-hide="true">
      <Form v-if="checkoutModal" ref="checkoutForm" :label-width="100" label-position="right" :rules="rules" :model="model">
        <FormItem label="结算日期" prop="checkOutDate">
          <DatePicker format="yyyy-MM-dd" :options="validator" :start-date="startDate"  @on-change="changeDate" v-model="model.checkOutDate"/>
        </FormItem>
        <Alert type="warning" show-icon>
          温馨提示
          <template slot="desc">
            <p>1. 退房后不可撤销</p>
            <p>2. 与承租人沟通后，请及时结算账务</p>
          </template>
        </Alert>
        <div class="btn-box">
          <!-- v-show="canOption" -->
          <Button @click="toCheckout" type="primary">退房结算</Button>
        </div>
      </Form>
    </Modal>
  </Card>
</template>

<script>
import LeaseDetail from './lease';
import AccountDetail from './account';
import ContractDetail from './contract';
import OperateDetail from './operate';

export default {
  name: 'DetailData',
  components: {
    LeaseDetail,
    AccountDetail,
    ContractDetail,
    OperateDetail,
  },
  computed:{
    // canOption(){
    //   let status = this.leaseInfo.status;
    //   if(status != '3' && status != '4' && status != '5' && status != '9' && status != '10'){
    //     return true;
    //   }else{
    //     return false
    //   }
    // }
  },
  data() {
    return {
      accountModal: false,
      checkoutModal: false,
      fromAccount: '0',
      currentTab: 'lease',
      deleteId: '',
      leaseId: '',
      leaseInfo: {},
      roomId: '',
      roomInfo: {},
      model: {},
      rules: {
        checkOutDate: [
          {
            required: true,
            message: '请选择结算日期',
          }
        ],
      },
      teantLists:[],
      renew:[],
      showStatus:null,
      showType:null,
      haveBilling:'0',
      haveRenew:'0',
      validator: {},
    }
  },
  created() {
    const { tab, leaseId, roomId, type, fromAccount } = this.$route.params;
    let info = this.$cookie.get('currentContract');
    if (info) {
      info = JSON.parse(info);
    }
    this.currentTab = tab || 'lease';
    this.leaseId = leaseId || info.leaseId || '';
    this.roomId = roomId || info.roomId || '';
    this.fromAccount = fromAccount || info.fromAccount;
    this.$store.dispatch('setLeaseDetailInfo', null);
    if(leaseId && roomId) {
      const data = {
        leaseId,
        roomId,
        fromAccount,
      };
      this.$cookie.set('currentContract', JSON.stringify(data));
    }
    this.$ajax.all(this.getRoomDetail(), this.getDetaiInfo()).then(() => {
      this.checkoutModal = (type == '退房');
    });
  },
  methods: {
    receiveMoney() {
      this.$ajax.all(this.getRoomDetail(), this.getDetaiInfo());
    },
    changeDate(val) {
      this.model.checkOutDate = val;
    },
    getRoomDetail() {
      return this.$ajax.get(
        this,
        this.$api.GET_ROOM_DETAIL.replace('id', this.roomId),
        {},
        (res) => {
          this.roomInfo = res.data.content;
        },
        true,
      )
    },
    getDetaiInfo() {
      const url = this.fromAccount == '1' ? (this.$api.GET_LEASE_ACCOUNT + this.leaseId) : (this.$api.GET_LEASE + this.leaseId);
      return this.$ajax.get(
        this,
        url,
        {},
        (res) => {
          const data = {
            lease: res.data.content.lease,
            tenant: res.data.content.tenant,
            tenants: res.data.content.tenants,
            rent: res.data.content.rent,
            others: res.data.content.others,
            manualAccts:res.data.content.manualAccts,
            gas: res.data.content.gas,
            account: res.data.content.roomCostDto,
            haveBilling:res.data.content.haveBilling,
            haveRenew:res.data.content.lease.haveRenew
          };
          this.leaseInfo = data.lease;
          this.deleteId = data.lease.id;
          this.teantLists=data.tenants;
          this.renew=res.data.content.renew;
          this.showStatus=this.leaseInfo.status;
          this.haveBilling=data.haveBilling;
          this.showType=this.leaseInfo.type;
          this.haveRenew=data.haveRenew;
          this.$store.dispatch('setLeaseDetailInfo', data);
          this.validator = {
            disabledDate (date) {
              return date && date.valueOf() <= new Date(data.lease.startTime) - 86400000;
            }
          };
        },
        true,
      );
    },
    routeTo(type) {
       this.$router.push({
          name: 'contract/tenant-register-'+type,
          query: {
            type: type,
            roomId: this.roomId,
            leaseId: this.leaseId,
          },
        })
    },
    toCheckout() {
      this.$refs.checkoutForm.validate(valid => {
        if(!valid) return;
        this.$router.push({
          name: 'check-out',
          params: {
            leaseId: this.leaseId,
            date: this.model.checkOutDate,
          }
        })
      })
    },
    handleDelete() {
      const sureToDelete = () => {
        // 根据id修改租约状态(0:未租,1租约待确认,2签约成功,3已作废,4已退房,5续约待确认,6已删除)
        this.$ajax.put(
          this,
          this.$api.PUT_CHANGE_STATUS + `${this.deleteId}/6`,
          {},
          (res) => {
            this.$Message.success('作废成功！');
            this.getDetaiInfo();
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
    },
  },
  computed: {
    startDate() {
      if (!this.leaseInfo.startTime) {
        return new Date();
      }
      return new Date(this.leaseInfo.startTime.split(' ')[0]);
    }
  },
}
</script>

<style scoped>
.btn-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
}
.red {
  color: red;
}
.tab-content {
  width: 100%;
  height: 150px;
}
.tab-content > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 14px;
}
</style>

