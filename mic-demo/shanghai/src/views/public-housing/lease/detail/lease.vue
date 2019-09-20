<template>
<Row :gutter="16">
  <Col :span="16">
    <Card dis-hover title="基本信息">
      <div class="basic-info">
        <p><span>租约编号：</span><span>{{detail.leaseId}}</span></p>
        <p><span>租约状态：</span><span><Tag :color="$com.confirm(detail,'status.color')">{{$com.confirm(detail, 'status.txt')}}</Tag></span></p>
        <p><span>合同类型：</span><span>{{detail.type}}</span></p>
        <p><span>房源：</span><span>{{detail.roomName}}</span></p>
        <p><span>房东姓名：</span><span>{{detail.landlordName}}</span></p>
        <p><span>房东手机：</span><span>{{detail.landlordPhone}}</span></p>
        <p><span>承租人姓名：</span><span>{{detail.name}}{{transformSex(detail.sex)}}</span></p>
        <p><span>承租人手机：</span><span>{{detail.phone}}</span></p>
        <p><span>证件类型：</span><span>身份证</span></p>
        <p><span>证件号码：</span><span>{{detail.certNo}}</span></p>
        <p><span>租约起止：</span><span>{{detail.date}}</span></p>
        <p><span>押金总额：</span><span>{{$com.toMoney(detail.deposit)}}元</span></p>
      </div>
    </Card>
    <!-- <Divider dashed /> -->
    <!-- <Card dis-hover title="入住人基本信息">
      <div style="marginBottom: 16px;">
        <span>当前在住0人</span>
        <Button size="small">添加入住人</Button>
      </div>
      <Table border :columns="columns" :data="tenantList" />
    </Card> -->
    <Divider dashed />
    <Card dis-hover title="签约信息">
      <div>
        <div class="header">
          <span>第一次签约</span>
          <span>租期起止：{{detail.date}}</span>
        </div>
        <div class="basic-info">
          <p><span>付款方式：</span><span>{{detail.method}}</span></p>
          <p><span>合同类型：</span><span>{{detail.type}}</span></p>
          <p><span>房屋租金：</span><span>{{$com.toMoney(detail.rent)}}元/月</span></p>
          <p><span>签约时间：</span><span>{{detail.startTime}}</span></p>
          <p><span>押金：</span><span>{{$com.toMoney(detail.deposit)}}元</span></p>
          <!-- <span><span>一次性费用：</span><span></span></span>
          <p><span>周期费用：</span><span></span></p> -->
          <!-- <p><span>原合同编号：</span><span></span></p> -->
          <!-- <span><span>收租日：</span><span></span></span> -->
          <p><span>开始收租日：</span><span>{{detail.startTime}}</span></p>
          <p><span>备注：</span><span>{{detail.extra}}</span></p>
        </div>
      </div>
    </Card>
    <Divider dashed />
    <TenantTable :isAdd="isAdd" @addLists="tenantListsChange" :leaseId="detail.leaseId" :isPage="false" :lists="teantLists" ></TenantTable>
	</Col>
  <Col :span="8" v-for="(item,index) in roomInfo" style="margin-bottom:20px;" :key="index">
    <Card dis-hover :bordered="false" :padding="0">
      <Carousel v-if="item.roomPicList && item.roomPicList.length > 0" autoplay :autoplay-speed="5000" loop>
        <CarouselItem v-for="item in item.roomPicList" :key="item.picPath">
            <img :src="item.picPath" class="carousel-item" />
        </CarouselItem>
      </Carousel>
      <div v-else class="carousel-item no-image">暂无房图</div>
      <div class="house-info">
        <p><span>房源编号：</span><span>{{item.id}}</span></p>
        <p><span>房源地址：</span><span>{{item.showName || '暂无'}}</span></p>
        <!-- <p><span>房源概况：</span><span>概况的话</span></p> -->
        <p><span>房源面积：</span><span>{{item.roomSpace}}㎡</span></p>
        <!-- <p><span>房源类型：</span><span>{{roomInfo.houseKindName || '暂无'}}</span></p> -->
        <p><span>房型：</span><span>{{`${item.roomNum}室${item.parlourNum}厅${item.toiletNum}卫` }}</span></p>
        <p><span>房源标价：</span><span>{{$com.toMoney(item.rent)}}元/月</span></p>
      </div>
    </Card>
  </Col>
</Row>
</template>

<script>
import TenantTable from "../tenantList/components/tenantTable.vue"
export default {
  name: 'LeaseDetail',
	components:{
		TenantTable
	},
  data() {
    return {
      columns: [
        {
          title: '入住人姓名',
          key: 'name',
          minWidth: 150,
        },
        {
          title: '性别',
          key: 'sex',
          minWidth: 100,
        },
        {
          title: '手机号码',
          key: 'phone',
          minWidth: 150,
        },
        {
          title: '证件类型',
          key: 'type',
          minWidth: 100,
        },
        {
          title: '证件号码',
          key: 'number',
          minWidth: 150,
        },
        {
          title: '居住状态',
          key: 'status',
          minWidth: 100,
        },
        {
          title: '入住时间',
          key: 'in',
          minWidth: 100,
        },
        {
          title: '搬离时间',
          key: 'out',
          minWidth: 100,
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 100,
          fixed: 'right',
        },
      ],
      isAdd:false,
    };
  },
  props: {
    roomInfo: {
      type: Array,
    },
		teantLists:{
			type:Array
    },
    showStatus:String,
    showType:String,
  },
  methods: {
    transformSex(sex) {
      if (!sex) return '';
      return sex == '0' ? '(男)' : '(女)';
    },
    transformTime(time) {
      return time ? time.split(' ')[0] : '';
    },
		tenantListsChange(){
      window.location.reload();
    },
    checkAdd(){
      if(this.showStatus == '1' || this.showStatus == '2' || this.showStatus == '10'){
        this.isAdd=true;
      }else{
        this.isAdd=false;
      }
    },
  },
  watch:{
    'showStatus':function(){
      this.checkAdd();
    }
  },
  mounted(){
    this.checkAdd()
  },
  computed: {
    dataSource() {
      return this.$store.state.leaseDetail;
    },
    detail() {
      const data = this.dataSource;
      if(!data) return {};
      const { lease, tenant } = data;
      const { transformLeaseStatus, confirm_currying } = this.$com;
      const leaseData = confirm_currying(lease), tenantData = confirm_currying(tenant); // 获取深层数据结构的柯里化函数
      return {
        leaseId: leaseData('id'),
        roomId: leaseData('roomId'),
        roomAddress: leaseData('roomAddress'),
        status: transformLeaseStatus(leaseData('status')),
        type: leaseData('type') == '0' ? '电子合同' : '纸质合同',
        roomName: leaseData('roomName'),
        emgcPes: tenantData('emgcPes'),
        emgcPesPhone: tenantData('emgcPesPhone'),
        landlordName: tenantData('landlordname'),
        landlordPhone: tenantData('landlordPhone'),
        name: tenantData('name'),
        sex: tenantData('sex'),
        phone: tenantData('phone'),
        certNo: tenantData('certNo'),
        date: `${this.transformTime(leaseData('startTime'))} 至 ${this.transformTime(leaseData('endTime'))}`,
        method: `付${leaseData('payNum')}${leaseData('mortgageNum') ? ' 押 '+ (leaseData('mortgageNum')=='0'?'自定义':leaseData('mortgageNum') ) : ''}`,
        rent: leaseData('rent'),
        startTime: this.transformTime(leaseData('startTime')),
        deposit: leaseData('deposit'),
        extra: leaseData('extra')
      };
    },
  }
}
</script>

<style scoped>
.basic-info {
  display: flex;
  flex-wrap: wrap;
}
.basic-info > p {
  width: 50%;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}
.basic-info > p > span {
  padding-left: 10px;
}
.basic-info > p > span:first-child {
  display: inline-block;
  width: 100px;
  text-align: right;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 10px;
  color: #668ced;
  background: #f4f9ff;
  border: 1px solid #ebf4ff;
}
.carousel-item {
  width: 100%;
  height: 200px;
  background: #fff;
  text-align: center;
  line-height: 200px;
  font-weight: bold;
}
.carousel-item.no-image {
  border: 1px solid #e8eaec;
}
.house-info > p {
  margin-top: 10px;
}
.house-info > p > span:first-child {
  display: inline-block;
  width: 70px;
}
</style>
