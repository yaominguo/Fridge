<template>
	<Card dis-hover>
		<!-- 头部 -->
		<Row style="padding: 0 0 20px 0">
			<Col span="17" style="font-size: 16px;">
        交易流水
      </Col>
			<!-- <Col span="4">
			              <Select v-model="searchData.storeId" placeholder="选择分店" >
			              	<Option v-for="item in storeList" :value="item.id" :key="
			                    item.id">{{item.storeName}}</Option>
			              </Select>
			</Col> -->
			<Col offset="4" span="3">
				<!-- <Button>导出</Button> -->
			</Col>
		</Row>
		<!-- search 表单 -->
		<Form ref="searchForm" label-position="right" :model="searchData" :label-width="80" >
      <Row>
        <Col span="5">
          <FormItem   label="房源地址" >
             <Input v-model="searchData.roomName_l"  placeholder="请输入"></Input>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem   label="承租人/业主" >
             <Input v-model="searchData.roomRelationPeople_l"  placeholder="姓名"></Input>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem   label="承租人/业主" >
             <Input v-model="searchData.phone_l"  placeholder="手机号"></Input>
          </FormItem>
        </Col>
        <Col span="9">
          <FormItem   label="交易日期" >
             <DatePicker v-model="searchData.tradeTimeRange" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="交易起止日期" style="width: 200px;"></DatePicker>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="5">
          <FormItem   label="交易方式" >
          	<Select v-model="searchData.paymentChannel" placeholder="请选择" >
        		<Option v-for="item in payList" :value="item.id" :key="
                item.id">{{item.name}}</Option>
        	</Select>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem   label=交易状态 >
              <Select v-model="searchData.isChecked" placeholder="请选择" >
        		<Option v-for="item in checkedList" :value="item.value" :key="
                item.value">{{item.label}}</Option>
        	</Select>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem label="交易项目" class="selcts-padding"  >
            <Select placeholder="请选择" v-model="searchData.peeType">
                <Option v-for="item in feetypeList" :value="item.value" :key="
                item.value">{{item.label}}</Option>
            </Select>
              <!-- <Row>
                        <Col span="8">
                          <Select placeholder="全部" label-in-value @on-change="buildChangeSearch" v-model="searchData.sectId">
                              <Option v-for="item in communityList" :value="item.id" :key="
                              item.id">{{item.name}}</Option>
                          </Select>
                        </Col>
                        <Col span="8">
                          <Select placeholder="全部" label-in-value  @on-change="houseChangeSearch"  v-model="searchData.houseId">
                            <Option v-for="item in houseList" :value="item.id" :key="
                              item.id">{{item.name}}</Option>
                          </Select>
                        </Col>
                        <Col span="8">
                          <Select placeholder="全部" label-in-value @on-change="roomChangeSearch" v-model="searchData.roomId">
                           <Option v-for="item in roomList" :value="item.id" :key="
                              item.id">{{item.alias}}</Option>
                          </Select>
                        </Col>
                      </Row> -->
            </FormItem>
        </Col>
        <Col span="5">
          <FormItem   label="编号" >
             <Input v-model="searchData.flowNo_l"  placeholder="请输入"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="5">
          <FormItem   label="收款方" >
             <Input v-model="searchData.companyName_l"  placeholder="请输入"></Input>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem   label="核销人" >
             <Input v-model="searchData.address"  placeholder="请输入核销人(暂未对接)"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem   label="核销日期" >
             <DatePicker v-model="searchData.checkedTimeRange" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="交易起止日期" style="width: 200px;"></DatePicker>
          </FormItem>
        </Col>
        <Col span="2" offset="1">
             <Button size="large" @click="restSearch">重置</Button>
        </Col>
        <Col span="3">
             <Button size="large" @click="handleSearch"  type="primary">查询</Button>
        </Col>
      </Row>
    </Form>
    <!-- 总计 -->
    <Row class="total-top">
    	<Col span="6" class="red-dot"> 进出账合计<span class="num">{{topTotal.inAndOutCost}}</span>元（{{topTotal.inAndOutCount}} 笔，待核销 {{topTotal.inAndOutChecked}} 笔）</Col>
    	<Col span="6" class="red-dot"> 进账合计<span class="num">{{topTotal.inCost}}</span>元（{{topTotal.inCount}} 笔，待核销 {{topTotal.inChecked}} 笔）</Col>
    	<Col span="6" class="red-dot">出账合计<span class="num">{{topTotal.outCost}}</span>元（{{topTotal.outCount}} 笔，待核销 {{topTotal.outChecked}} 笔）</Col>
    </Row>
    <!-- 切换汇总和明细 -->
    <Row>
    	<RadioGroup v-model="sumOrdetail" size="large" style="margin:10px 0" @on-change="summaryOrDetail">
          <Radio label="summary">
          	 <b>汇总</b>
          	  <span>流水以原始进出账形式进行显示</span>
          </Radio>
          <Radio label="detail" style="margin-left: 100px;">
          	<b>明细</b>
          	<span>流水以账单对应关系进行分项显示</span>
          </Radio>
      </RadioGroup>
    </Row>
          <!-- 表格 -->
    <Table :data="listData" :columns="columns" border @on-selection-change="onSelectionChange" ></Table>
 	  <Row class="total-bottom">
	  	<Col span="6" class="blue-dot"> 本页合计 <span class="bottom-num">{{bottomTotal.money}}</span>元（{{bottomTotal.total}} 笔，待核销 {{bottomTotal.unCheck}} 笔）</Col>
	  	<Col span="6" class="blue-dot"> 选中合计 <span class="bottom-num">{{selectTotal.money}}</span>元 （{{selectTotal.total}} 笔，待核销 {{selectTotal.unCheck}} 笔）</Col>
	  </Row>
	  <!-- 批量核销按钮 和 分页 -->·
	  <div class="bottom" style="text-align: center;overflow:hidden;">
	  	<Button style="float: left;" v-if="batchShow" @click="batchCheckClick" >批量核销</Button>
	  	<Page @on-change="changePage" :current="searchData.pageNo" :page-size="searchData.pageSize" :total="searchData.total" show-total />
	  </div>
	  <detailModal :modal="singleModal" :payWayList="payList" :detail="detail" @check="check" @cancel="cancel"></detailModal>
    <batchCheckModal :modal="batchModal" :data="unCheckArray" @check="check" @cancel="cancel" @delItem="delItem" ></batchCheckModal>
	</Card>
</template>
<script>
	import moment from 'moment';
	import detailModal from './detail-modal';
  import batchCheckModal from './batch-check-modal';

	export default{
		components: {
		    detailModal,
        batchCheckModal
		 },
		data(){
			return {
        payList:[],
        batchModal:false,
        //当前页未核销的数组
        unCheckArray:[],
				detail:{},
				singleModal:false,
				//批量核销
				batchShow:true,
				bottomTotal:{
					total:0,
					unCheck:0,
					money:0
				},
				topTotal:{
					inAndOutCheckedoutCost:0,
					outChecked:0,
					inChecked:0,
					inCost:0,
					inAndOutCount:0,
					inCount:0,
					outCount:0,
					inAndOutCost:0
				},
				selectTotal:{
					total:0,
					unCheck:0,
					money:0
				},
        feetypeList:[
          {
            label:'租约流水',
            value:'0'
          },
          {
            label:'记账本流水',
            value:'1'
          }
        ],
        checkedList:[
          {
            label:'待核销',
            value:'false'
          },
          {
            label:'已核销',
            value:'true'
          }
        ],
				storeList:[
					{
						id:'1',
						storeName:'总店'
					},
					{
						id:'2',
						storeName:'一分店'
					}
				],
				columns:[
					{
                        type: 'selection',
                        width: 60,
                        fixed: 'left',
                        align: 'center'
                    },
                    {
                        title: '进出账',
                        key: 'inOrOut',
                        align: 'center',
                        width:100,
                        filters: [
                            {
                            	label:'进账',
                            	value:1,
                            },
                            {
                                label: '出账',
                                value: 2
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.inOrOut === 'in';
                            } else if(value === 2){
                            	return row.inOrOut === 'out';
                            }
                        },
                        render:(h,params)=>{
                        	return h('div',this.$com.inOroutText(params.row.inOrOut))
                        },
                    },
                    {
                    	title:'房源 / 承租人(业主)',
                    	//key:'roomName',
                    	align:'center',
                    	minWidth:120,
                    	render:(h,params)=>{
                    		return h('div',this.$com.roomAndPerson(params.row))
                    	}

                    },
                    {
                    	title:'类型',
                    	key:'peeType',
                    	align:'center',
                    	minWidth:100,
                    	render:(h,params)=>{
                    		return h('div',this.$com.feeText(params.row.peeType))
                    	}
                    },

                    {
                    	title:'项目',
                    	key:'acctType',
                    	align:'center',
                    	minWidth:100,
                    },
                    {
                    	title:'金额',
                    	key:'pee',
                    	sortable: true,
                    	align:'center',
                    	minWidth:100,
                    },
                    {
                    	title:'方式',
                    	align:'center',
                    	minWidth:100,
                    	render:(h,params)=>{
                       /* let str = this.$com.matchArray(params.row.paymentChannel,this.payList,'id','name');
                        return h('div',str + (params.row.lineType == '1' ?' (线上)':' (线下)') )*/
                    		//return h('div',this.$com.paywayTex(params.row.paymentChannel,this.payList))
                        return h('div',params.row.paymentChannelName + (params.row.lineType == '0'?' (线上)':' (线下)') )
                    	}
                    },
                    {
                    	title:'收支日期',
                    	key:'tradeTime',
                    	sortable:true,
                    	align:'center',
                    	width:120,
                    	render:(h,params)=>{
                    		return h('div',this.$com.changeDate(params.row.tradeTime))
                    	}

                    },
                    {
                    	title:'收款方',
                    	key:'companyName',
                    	align:'center',
                    	minWidth:100,
                    },
                    {
                    	title:'所属分店',
                    	key:'storeName',
                    	width:90,
                    	align:'center'
                    },
                    {
                    	title:'状态',
                    	key:'status',
                    	width:80,
                    	align:'center',
                    	render:(h,params)=>{
                    		return h('div',this.$com.statusTex(params.row.isChecked ))
                    	}
                    },
                    {
                    	title:'编号',
                    	key:'flowNo',
                    	align:'center',
                    	width:130,
                    },
                    {
                    	title:'操作',
                    	key:'action',
                    	align:'center',
                    	fixed: 'right',
                    	width:130,
                    	render:(h,params)=>{
                    		let view = h(
                                        'Button',
                                        {
                                            props: {
                                                size: 'small'
                                            },
                                            on:{
                                                'click': () =>{
                                                  this.singleModal = true;
                                                  //调用详情接口，回调打开模态框
                                                  this.getDetail(params.row.id)
                                                },

                                            },
                                            style: {
                                                margin: '3px'
                                            }
                                        },
                                        '详情'
                                    );
                    		let detail = h(
                                        'Button',
                                        {
                                            props: {
                                                size: 'small'
                                            },
                                            on:{
                                                'click': () =>{
                                                  this.$router.push({
                                                        name:'contract-detail',
                                                        //query:{ac_id:params.row.ac_id,}
                                                    })
                                                }
                                            },
                                            style: {
                                                margin: '3px'
                                            }
                                        },
                                        '查看'
                                    );
                    		return h('div',[view,detail])
                    	}
                    }
				],
				listData:[

				],
        sumOrdetail:'summary',
				searchData:{
					storeId:'',
				}
			}
		},
		mounted(){
			//列表
			this.getList();
			//门店列表
   			//this.getStoreList();
        //支付方式列表
      this.getPayWayList();
		},
		methods:{
    //记账方式列表
    getPayWayList(){
      this.$ajax.get(
        this,
        this.$api.GET_PAY_METHODS,
        {},
        (res) =>{
          const list = res.data.content;
          this.payList = list;
        }
      )
    },
      delItem(val){
        //this.unCheckArray.splice(val.index,1)
        //console.log('val',val)
      },
      check(obj){
        this.cancel();
        if(obj.type == 'single'){
          this.singleCheck(obj.singleObj);
        }else if(obj.type =='batch'){
          this.batchCheck(obj.batchArray);

        }else{
          alert('关闭')
        }
      },
      singleCheck(singleObj){
        this.$Modal.confirm({
          onOk:()=>{
                this.$ajax.put(
                  this,
                  this.$api.PUT_CHECKD_SINGLE,
                  singleObj,
                  (res) => {
                    if(res.code== '200'){
                      this.$Message.info('核销成功');
                      this.getList();
                    }
                  },
                )
            },
            onCancel(){
              this.$Message.info('取消核销');
            },
            title:'请确认',
            render: (h) => {
              return h('div',{style:{fontSize:'14px',fontWeight:'bold',margin:'10px 0'}},'确认核销吗')
            }
        })
      },
      batchCheck(arr){
        this.$Modal.confirm({
            onOk:()=>{
                this.$ajax.put(
                  this,
                  this.$api.PUT_CHECKD_BATCH,
                  arr,
                  (res) => {
                    if(res.code== '200'){
                      this.$Message.info('批量核销成功');
                      this.getList();
                    }
                  },
                )
            },
            onCancel(){
              this.$Message.info('取消批量核销');
            },
            title:'请确认',
            render: (h) => {
                 return h('div',{style:{fontSize:'14px',fontWeight:'bold',margin:'10px 0'}},'确认要核销选中的流水吗')
            }
          })
      },
      //批量核销
      batchCheckClick(){
         this.batchModal = true;
      },
      //两个模态框点取消
			cancel()	{
        this.batchModal =false;
				this.singleModal = false;
			},
			//明细或汇总
			summaryOrDetail(val){
				if(val == 'detail'){
					////todo
					//请求接口传参？
					//隐藏批量核销按钮
					this.batchShow = false;
				}else{
					this.batchShow = true;
					//汇总
				}
			},
			//选中项改变
			onSelectionChange(selection){
				if(selection.length >=1){
							//选中多少项
					this.selectTotal.total = selection.length;
					//多少钱 待核销多少项
					for(let i in selection){
						//多少钱 待核销多少笔
			          	let money = 0;
			          	let unCheck = 0;
			          	for(let i in selection){
			          		if(this.listData[i].inOrOut == 'in'){
			          			money+=Number(this.listData[i].pee);
			          		}else{
			          			money-=Number(this.listData[i].pee);
			          		}

			          		if(!this.listData[i].isChecked){
			          			unCheck+=1;
			          		}
			          	}
			          	this.selectTotal.money = money;
			          	this.selectTotal.unCheck = unCheck;
					};
					//选中项可以核销的数组
					this.unCheckArray = selection.filter(function(i){
						return !(i.isChecked)
					});
				}else{
          this.unCheckArray = [];
					this.selectTotal.money = 0;
					this.selectTotal.unCheck = 0;
					this.selectTotal.total = 0;
				}

			},
			//详情
      getDetail(id){
        this.$ajax.get(
          this,
          this.$api.GET_TRANSACTION_DETAIL.replace('{id}',id),
          {},
          (res)=>{
            this.detail = res.data.content;
            this.singleModal = true;
          }
        )
      },

			//交易流水列表
		    getList(params={}){
		      this.$ajax.get(
		          this,
		          this.$api.GET_TRANSACTION_LIST,
		          params,
		          (res) => {
		          	let resData = res.data.content;

		          	this.listData = resData.content;
		          	//分页
	          		this.searchData.total = resData.totalRows;
	          		this.searchData.pageSize = resData.pageSize;
	          		this.searchData.pageNo = resData.page;
		          	//本页合计
		          	this.bottomTotal.total = this.listData.length;
		          	let money = 0;
		          	let unCheck = 0;
		          	for(let i in this.listData){
		          		if(this.listData[i].inOrOut == 'in'){
		          			money+=Number(this.listData[i].pee);
		          		}else{
		          			money-=Number(this.listData[i].pee);
		          		}

		          		if(!this.listData[i].isChecked){
		          			unCheck+=1;
		          		}
		          	}
		          	this.bottomTotal.money = money;
		          	this.bottomTotal.unCheck = unCheck;
		          	//数据合计 接口返回
		          	this.topTotal.inAndOutChecked = resData.inAndOutChecked;////进出账未核销笔数
		          	this.topTotal.outCost = resData.outCost;////出账合计费用
		          	this.topTotal.outChecked = resData.outChecked;////出账未核销笔数
		          	this.topTotal.inChecked = resData.inChecked;////进账未核销笔数
		          	this.topTotal.inCost = resData.inCost;////进账合计费用
		          	this.topTotal.inAndOutCount = resData.inAndOutCount;////进出账笔数
		          	this.topTotal.inCount = resData.inCount;////进账笔数
		          	this.topTotal.outCount = resData.outCount;////出账笔数
		          	this.topTotal.inAndOutCost = resData.inAndOutCost;////进出账合计费用


		          }
		      )
		    },
			changePage(page) {
		      this.searchData.pageNo = page;
		      this.getList(this.searchData);
		    },

			restSearch(){
			  this.searchData ={};
			  this.getList();
			},
			// 处理搜索的参数
			handleSearch() {
        const { checkedTimeRange,tradeTimeRange } = this.searchData;
        if(checkedTimeRange) {
          this.searchData.checkedTime_gte = checkedTimeRange[0];
          this.searchData.checkedTime_lte = checkedTimeRange[1];
        }
        if(tradeTimeRange) {
          this.searchData.tradeTime_gte = tradeTimeRange[0];
          this.searchData.tradeTime_lte = tradeTimeRange[1];
        }
        //delete this.searchData.checkedTimeRange;
        //delete this.searchData.tradeTimeRange;

			  this.searchData.pageNo = 1;
			  this.getList(this.searchData);
			},
			getStoreList(){
				this.$ajax.get(
			    	this,
			    	this.$api.GET_USER_STORE,
			    	{},
				    (res)=>{
				      const list =res.data.content;
				      this.storeList = list;
				    }
			    )
			},
		}
	}
</script>
<style scoped>
  .num{
    font-size: 18px;
    color: #507bea;
    font-weight: 700;
    margin: 0 5px;
  }
  .bottom-num{
    color: #ff4e31;
    font-size: 14px;
  }
	.selcts-padding .ivu-select {
		padding-left: 5px;
	}

	.total-bottom{
		margin:15px 0;
		padding: 5px 10px 10px;
	}
	.total-top{
		margin: 15px 0;
	    padding: 5px 10px 10px;
	    background: #fffdf5;
	    border: 1px solid #fff7e5;
	}
	.red-dot::before{
	    content: " ";
	    width: 6px;
	    height: 6px;
	    border-radius: 100%;
	    display: inline-block;
	    margin-top: -2px;
	    vertical-align: middle;
	    background: red;
	    margin-right: 8px;
  	}
  	.blue-dot::before{
  		content: " ";
	    width: 6px;
	    height: 6px;
	    border-radius: 100%;
	    display: inline-block;
	    margin-top: -2px;
	    vertical-align: middle;
	    background: blue;
	    margin-right: 8px;
  	}

</style>
