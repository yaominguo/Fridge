<template>
<div>
  <Form v-show="tab === 'tenant' || tab ==='public'" :label-width="88">
    <Col span="6">
      <FormItem label="房源" class="item-label">
        <Input v-if="tab === 'tenant'" v-model="searchData.roomName"/>
        <Input v-else v-model="searchData.address"/>
      </FormItem>
    </Col>
    <Col span="6">
      
      <FormItem label="账单项目" class="item-label">
        <Select v-model="searchData.acctName">
          <template v-if="tab === 'tenant'">
            <Option v-for="item in typeList" :key="item" :value="item">{{item}}</Option>
          </template>
          <template v-else>
            <Option  key="水费" value="水费">水费</Option>
            <Option  key="电费" value="电费">电费</Option>
            <Option  key="燃气费" value="燃气费">燃气费</Option>
          </template>
        </Select>
      </FormItem>
    </Col>
    <Col span="6">
      <FormItem label="应收款日" class="item-label">
        <DatePicker :value="defaultDate" v-model="searchData.date" transfer type="daterange" split-panels />
      </FormItem>
    </Col>
    <Col span="6">
      <FormItem label="承租人" class="item-label">
        <Input v-model="searchData.leaseUserName"/>
      </FormItem>
    </Col>
    <template v-if="tab === 'tenant'">
      <Col v-show="status =='2' || status =='all'" span="6">
        <FormItem label="收款方式" class="item-label">
          <Select v-model="searchData.paymentChannel" clearable>
            <Option v-for="item in payWayList" :key="item.name" :value="item.name">{{item.name}}</Option>
            <!-- <Option value="现金">现金</Option>
            <Option value="支付宝">支付宝</Option> -->
          </Select>
        </FormItem>
      </Col>
    </template>
    
    <!-- <Col v-show="status=='2'" span="6">
      <FormItem label="结账日期" class="item-label">
        <DatePicker transfer type="daterange" split-panels/>
      </FormItem>
    </Col> -->
    <!-- <Col span="6">
      <FormItem label="账单状态" class="item-label">
        <RadioGroup style="fontWeight: normal; ">
          <Radio label="欠款账单"></Radio>
          <Radio label="在住账单"></Radio>
          <Radio label="退房账单"></Radio>
        </RadioGroup>
      </FormItem>
  </Col> -->
    <Col offset="12" span="12">
      <FormItem class="btn-wrapper">
        <Button v-show="isSelect" @click="showModal" type="primary" ghost>批量收款</Button>
        <Button @click="handleSearch" type="primary">查询</Button>
        <Button @click="handleReset">重置</Button>
      </FormItem>
    </Col>
  </Form>
  <Form v-show="tab === 'owner'" :label-width="88">
    <Col span="6">
      <FormItem label="房源" class="item-label">
        <Input v-model="searchData.roomName" />
      </FormItem>
    </Col>
    <Col span="6">
      <FormItem label="账单项目" class="item-label">
        <Select clearable v-model="searchData.acctName">
          <Option v-for="item in typeList" :key="item" :value="item">{{item}}</Option>
        </Select>
      </FormItem>
    </Col>
    <Col span="6">
      <FormItem label="应付款日" class="item-label">
        <DatePicker v-model="searchData.date" transfer type="daterange" split-panels />
      </FormItem>
    </Col>
    <Col span="6">
      <FormItem label="业主" class="item-label">
        <Input v-model="searchData.leaseUserName"/>
      </FormItem>
    </Col>
    <Col v-show="status =='2' || status =='all'" span="6">
      <FormItem label="付款方式" class="item-label">
        <Select v-model="searchData.paymentChannel" clearable>
          <Option v-for="item in payWayList" :key="item.name" :value="item.name">{{item.name}}</Option>
        </Select>
      </FormItem>
    </Col>
    <!-- <Col v-show="status =='2' || status =='all'" span="6">
      <FormItem label="实付日期" class="item-label">
        <DatePicker transfer type="daterange" split-panels />
      </FormItem>
    </Col> -->
    <!-- <Col span="6">
      <FormItem label="账单状态" class="item-label">
        <RadioGroup style="fontWeight: normal; ">
          <Radio label="欠款账单"></Radio>
          <Radio label="在住账单"></Radio>
          <Radio label="退房账单"></Radio>
        </RadioGroup>
      </FormItem>
    </Col> -->
    <Col offset="12" span="12">
      <FormItem class="btn-wrapper">
        <Button v-show="isSelect" @click="showModal" type="primary" ghost>批量付款</Button>
        <Button @click="handleSearch" type="primary">查询</Button>
        <Button @click="handleReset">重置</Button>
      </FormItem>
    </Col>
  </Form>
</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'SearchForm',
  props: {
    tab: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    isSelect: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      loading: false,
      houseList: [],
      searchData: {},
      typeList: [],
      payWayList:[],
    };
  },
  mounted() {
    ////new
    var promise = new Promise((resolve, reject)=>{
        this.getPayWay(resolve);
    });

    promise.then(
        ()=>{
            this.searchData.date = this.defaultDate;
            this.handleSearch();  
        },
        (err)=>{
            console.log(err);
        }
    )

    this.getTypes();
    
    
    
  },
  methods: {
    getPayWay(resolve){
      this.$ajax.get(
        this,
        this.$api.PAYMENT_LIST_GET,
        {},
        (res) => {
          this.payWayList = res.data.content;
          resolve();
        }
      )
    },
    getTypes() {
      this.$ajax.get(
        this,
        this.$api.GET_ACCOUNT_TYPE,
        {},
        (res) => {
          this.typeList = res.data.content;
        }
      )
    },
    showModal() {
      this.$emit('toReceive');
    },
    remoteMethod(query) {
      if(!query) {
        this.houseList = [];
        return;
      }
      this.loading = true;
      this.$ajax.get(
        this,
        this.$api.GET_HOUSE_ADDRESS,
        { name: query },
        (res) => {
          this.loading = false;
          const data = res.data.content;
          if(data && data.length > 0) {
            this.houseList = data.map(item => {
              return {
                id: item.id,
                label: item.showName,
              };
            });
          }
        },
        true,
      );
    },
    handleReset() {
      this.searchData = {};
      this.$emit('reset', {data:this.searchData,payWayList:this.payWayList});
    },
    handleSearch() {
      const { date } = this.searchData;
      if(date) {
        this.searchData.startTime = date[0];
        this.searchData.endTime = date[1];
      }
      if (this.status !='2' && this.status !='all') {
        this.searchData.paymentChannel = null;
      }
      //delete this.searchData.date;
      this.$emit('search', {data:this.searchData,payWayList:this.payWayList});
    },
  },
  computed: {
    defaultDate() { // 默认显示近90天的数据
      const start = new Date (moment().startOf('month').format('YYYY-MM-DD'));
      const end = new Date(moment().startOf('month').add(90, 'days').format('YYYY-MM-DD'));
      return [start, end];
    }
  },
  watch: {
    tab(cur, past) {
      if(cur != past) {
        this.searchData = {
          date: this.defaultDate,
        };
        this.handleSearch();
      };
    },
  },
}
</script>

<style scoped>
.item-label {
  /* font-weight: bold; */
}
.half-select {
  width: 49%;
}
.btn-wrapper {
  text-align: right;
}
.btn-wrapper button {
  padding: 5px 30px;
  margin-left: 10px;
}
</style>
