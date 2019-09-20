<template>
  <div v-if="detail">
    <h2 class="house-name">{{detail.roomName}}</h2>
    <div class="box">
      <div class="row">
        <p><span>承租人：</span><span>{{detail.name}}</span></p>
        <p><span>承租人手机：</span><span>{{detail.phone}}</span></p>
      </div>
      <div class="row">
        <p>第1次签约</p>
        <p><span>租金：</span><span>{{$com.toMoney(detail.rent)}}元/月</span></p>
        <p><span>租期：</span><span>{{detail.date}}</span></p>
        <p><span>付款方式：</span><span>{{detail.method}}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoBar',
  computed: {
    info() {
      return this.$store.state.leaseDetail;
    },
    detail() {
      const data = this.info;
      if(!data) return;
      const { lease, tenant } = data;
      const confirmLease = this.$com.confirm_currying(lease), confirmTenant = this.$com.confirm_currying(tenant);
      const date = `${this.transformTime(confirmLease('startTime'))} 至 ${this.transformTime(confirmLease('endTime'))}`;
      const method = `付${confirmLease('payNum', ' ')}${confirmLease('mortgageNum') ? ' 押 ' + (confirmLease('mortgageNum') == '0'?'自定义' : confirmLease('mortgageNum')): ''}`;
      return {
        roomName: confirmLease('roomName'),
        name: confirmTenant('name'),
        phone: confirmTenant('phone'),
        rent: confirmLease('rent'),
        date: data.lease ? date : '',
        method:data.lease ? method : '',
      };
    }
  },
  methods: {
    transformTime(time) {
      return time ? time.split(' ')[0] : '';
    }
  },
}
</script>

<style scoped>
.house-name {
  padding: 0 30px 10px;
  border-bottom: 1px solid #e4e4e4;
}
.box {
  border: 1px solid #f6e3b8;
  background: #fffcf6;
  margin: 16px 0;
}
.box > .row {
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
}
.box > .row + .row {
  border-top: 1px dashed #e5e5e5;
}
.box > .row:first-child {
  justify-content: flex-start;
}
.box > .row:first-child > p {
  width: 22%;
}
</style>

