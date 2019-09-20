
<template>
<div>
  <!-- <div class="header-row">
    <span>{{ row.detail }}</span>
    <span>{{ row.money }}</span>
    <span>{{ row.date }}</span>
    <span>{{ row.received }}</span>
    <span>{{ row.receiveDate }}</span>
    <span>{{ row.status }}</span>
    <span><Button size="small">查看</Button></span>
    <span>{{ row.ps }}</span>
  </div> -->
  <div class="summary">
    <p><span>账单金额：2570</span></p>
    <p><span>收款金额：2570</span><span>(2017-10-24 支付宝 未核销)</span><a>详情</a></p>
    <p><span>账务结算：-2570</span><span>(2018-05-28 抵扣违约金)</span><a>详情</a></p>
  </div>
</div>
</template>
<script>
export default {
  name: 'RowExpand',
  props: {
    row: Object
  }
};
</script>

<style scoped>
.header-row {
  display: flex;
  margin-bottom: 16px;
  border-bottom: 1px dashed #e5e5e5;
}
.header-row > span {
  flex: 1;
  padding: 0 18px;
}
.header-row > span:first-child {
  margin-left: 50px;
  width: 250px;
}
.summary {
  padding-left: 100px;
}
.summary > p {
  margin-bottom: 10px;
}
.summary > p > span{
  display: inline-block;
  width: 20%;
}
</style>
