<template>
  <div class="house-info">
    <table class="house-info-table">
      <tr>
        <td class="house-info-header">{{header}}{{detail.building}}{{detail.roomNo}}室{{detail.room}}</td>
        <td class="house-info-header house-info-operation">操作</td>
      </tr>
      <tr>
        <td class="house-info-section">
          <div class="house-info-section-header">房源信息</div>
          <div class="house-info-section-content">房源编号：{{detail.id}}</div>
          <div class="house-info-section-content">实际户型：{{detail.roomNum}}房{{detail.parlourNum}}厅{{detail.toiletNum}}卫</div>
          <div class="house-info-section-content" v-if="!isPublic">房间朝向：{{detail.direction}}</div>
          <div class="house-info-section-content">房间面积：{{detail.roomSpace}} ㎡</div>
          <div class="house-info-section-content">出租状态：{{detail.leaseStatusName}}</div>
          <div class="house-info-section-content">对外标价：{{$com.toMoney(detail.rent)}}元/月,付{{detail.payNum}}押{{detail.mortgageNum == '0' ? '自定义' : detail.mortgageNum}}</div>
        </td>
        <td class="house-info-section house-info-operation">
          <div class="house-info-section-operation" v-show="buildType==0&&detail.leaseType==0&&detail.isUpdateHouse==true">
            <router-link :to="'/house/editRoommatesEntire/flatsId/'+detail.houseId+'/'+detail.id">编辑整套房源</router-link>
          </div>
          <div class="house-info-section-operation">
            <router-link v-show="buildType==0&&!leaseId" :to="detail.leaseType==0?'/house/disperseSingleRoom/'+detail.id:'/house/editDisperseEntire/'+detail.id">编辑房间</router-link>
            <router-link v-show="buildType==1&&!leaseId"  :to="'/house/editSingleRoomListings/'+detail.id">编辑房间</router-link>
          </div>
        </td>
      </tr>
      <tr>
        <td class="house-info-section">
          <div class="house-info-section-header">租约信息</div>
          <div class="house-info-section-content">租约编号：{{lease.lease && lease.lease.id | pipe}}</div>
          <div class="house-info-section-content">租约状态：{{($com.transformLeaseStatus(lease.lease&&lease.lease.status!=undefined?lease.lease.status:"0")).txt}}</div>
          <div class="house-info-section-content">承租人姓名：{{lease.lease && lease.lease.tenantName | pipe}}</div>
          <div class="house-info-section-content">承租人电话：{{lease.lease && lease.lease.tenantPhone | pipe}}</div>
          <div class="house-info-section-content">租约起始：{{leaseDate}}</div>
          <div class="house-info-section-content">付款方式：{{payMethod}}</div>
        </td>
        <!-- <td class="house-info-section house-info-operation">
          <div class="house-info-section-operation">
            <a @click="routerTo({tab: 'lease'})">租约详情</a>
          </div>
          <div v-show="!canOperate" class="house-info-section-operation">
            <a @click="routerTo({tab: 'lease', type: '退房'})">退房操作</a>
          </div>
          <div class="house-info-section-operation">
            <a @click="routerTo({tab: 'contract'})">合同预览</a>
          </div>
          <div v-show="!canOperate" class="house-info-section-operation">
            <a @click="routerTo({tab: 'lease'})">修改租约</a>
          </div>
          <div v-show="!canOperate" class="house-info-section-operation">
            <a @click="routerTo({tab: 'lease'})">删除租约</a>
          </div>
          <div v-show="!leaseId" class="house-info-section-operation">
            <a @click="toRegister()">租客登记</a>
          </div>
        </td> -->
        <td class="house-info-section house-info-operation">
          <template v-if="leaseId&&detail.template">
            <div class="house-info-section-operation">
              <a @click="routerTo({tab: 'lease'})">租约详情</a>
            </div>
            <div  class="house-info-section-operation" v-if="leaseStatus=='2'||leaseStatus=='10'">
              <a @click="routerTo({tab: 'lease', type: '退房'})">退房操作</a>
            </div>
            <div class="house-info-section-operation">
              <a @click="routerTo({tab: 'contract'})">合同预览</a>
            </div>
            <div  class="house-info-section-operation" v-if="contractStatus=='1'&&leaseStatus=='2'">
              <a @click="routerTo({tab: 'lease'})">修改租约</a>
            </div>
            <div  class="house-info-section-operation"  v-if="(contractStatus=='1'&&leaseStatus=='2')||(contractStatus=='0'&&leaseStatus=='1')">
              <a @click="routerTo({tab: 'lease'})">租约作废</a>
            </div>
          </template>
          <div v-show="!leaseId&&detail.template" class="house-info-section-operation">
            <a @click="toRegister()">租客登记</a>
          </div>
        </td>
      </tr>
      <tr v-show="leaseId&&detail.template">
        <td class="house-info-section">
          <div class="house-info-section-header">账单信息</div>
          <div class="house-info-section-content red" >当前租金欠款(总)：{{$com.toMoney(lease.depositArrears)}}</div>
          <div class="house-info-section-content red" >当前水电煤等欠费：{{$com.toMoney(lease.arrears)}}</div>
          <div class="house-info-section-content">租金下期付款日：{{lease.nextDate && lease.nextDate.split(' ')[0] | pipe}}</div>
        </td>
        <td class="house-info-section house-info-operation" >
          <div class="house-info-section-operation" v-if="detail.template">
            <a @click="routerTo({tab: 'account'})">查看全部账单</a>
          </div>
          <div class="house-info-section-operation"  v-if="leaseStatus=='2'||leaseStatus=='10'">
            <a @click="routerTo({tab: 'account'})">添加账单</a>
          </div>
        </td>
      </tr>
      <tr v-show="leaseId&&detail.template">
        <td class="house-info-section last-section">
          <div class="house-info-section-header">续租信息</div>
          <div class="house-info-section-content">{{haveRenew==null||haveRenew=='0'?"未":"已"}}发起续租</div>
        </td>
        <td class="house-info-section house-info-operation last-section" >
          <div class="house-info-section-operation"  v-if="(leaseStatus=='2'||leaseStatus=='10')">
            <a @click="routerTo({tab: 'lease', type: '续租'})">发起续租</a>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    detail: {
      type: Object,
      required: true,
    },
    lease: {
      type: Object,
      default: {},
    },
    buildType: {
      type: Number,
      required: true,
    },
		header:{
			type:String
		}
  },
  methods: {
    toRegister() {
      this.$router.push({
        name: this.isPublic?'public-housing/contract/tenant-register':'contract/tenant-register',
        params: {
          data: this.detail,
        },
        query: {
          roomId: this.detail.id,
          type:'room'
        },
      })
    },
    routerTo(params) {
      if(!this.leaseId) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>此房源暂无租约</p>',
          onOk: () => {},
        });
        return;
      }
      const { tab, type } = params;
			let leaseId=this.leaseId;
			if(this.haveRenew=="1"&&type=="续租"){
				leaseId=this.lease.renew[0].id;
      }
      this.$router.push({
        name: this.isPublic?'public-housing-contract-detail':'contract-detail',
        params: {
          tab: tab || null,
          leaseId: leaseId,
          roomId: this.detail.id,
          type: type || null,
          fromAccount: '0',
        },
      })
    },
  },
  computed: {
    isPublic(){
      if(this.$cookie.get('houseKind') === '0'){
        return true;
      }else{
        return false;
      }
    },
    leaseId() {
      return this.lease && this.lease.lease && this.lease.lease.id;
    },
		haveRenew(){
			return this.lease && this.lease.lease&&this.lease.lease.haveRenew;
		},
    leaseDate() {
      if (!this.lease.lease) {
        return '暂无';
      }
      const { startTime, endTime } = this.lease.lease;
      if (!startTime || !endTime) {
        return '暂无';
      }
      const start = startTime.split(' ')[0],
              end = endTime.split(' ')[0];
      return `${start} 至 ${end}`;
    },
    payMethod() {
      if(!this.lease.lease) {
        return '暂无';
      }
      const { payNum, mortgageNum } = this.lease.lease;
      if (!payNum || !mortgageNum) {
        return '暂无';
      }
      return `付${payNum}押${mortgageNum}`;
    },
    canOperate() {
      const status = this.detail && this.detail.leaseStatus ;
      return status == '0' || status == '1' || status == '2';
    },
		leaseStatus(){
			return this.lease && this.lease.lease && this.lease.lease.status;
		},
		contractStatus(){
			return this.lease.lease.type;
		}
  },
  filters: {
    pipe(val) {
      if (val == 0) {
        return val;
      }
      return val || '暂无';
    },
  }
};
</script>


<style scoped>
.red{
  color: red;
}
.house-info {
  width: 100%;
  height: 100%;
}
.house-info-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 4px;
}
.house-info-table td {
  padding: 4px 8px 4px 16px;
}
.house-info-header {
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  height: 32px;
  line-height: 32px;
  font-weight: bold;
}
.house-info-section {
  border-bottom: 1px dashed #ccc;
  height: 24px;
  line-height: 24px;
}
.house-info-section.last-section {
  border-bottom: none;
}
.house-info-operation {
  width: 30%;
  border-left: 1px dashed #efefef;
}
.house-info-section.house-info-operation {
  vertical-align: text-top;
}
.house-info-section-header {
  font-size: 14px;
  font-weight: bold;
}
</style>
