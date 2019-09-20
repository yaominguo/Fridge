<template>
	<Card dis-hover :border="true">
		<Row type="flex" slot="title" justify="start" align="middle" class="header">
			<Col span="4" class="info-title">{{this.$route.name!='contract-detail'?"查询结果":"入住人基本信息"}}</Col>
			<Col span="4" offset="13" style="text-align: right;padding-right:10px" v-show="isAdd">当前入住{{total}}人</Col>
			<Col span="3"><Button type="primary" @click="handleAdd()" v-show="isAdd">添加入住人</Button></Col>
			<!-- <Col span="4" style="text-align:right;" offset="13"><Button type="primary" @click="merge" v-show="!isAdd">租客合并</Button></Col> -->
		</Row>
		<Table v-if="isPage" @on-selection-change="selectChange" :columns="columns1" :data="data1" class="table"></Table>
		<Table v-else :columns="columns2" :data="data1" class="table"></Table>
		<div class="page">
			<Page v-show="isPage" :total="totalRows" show-sizer show-total @on-change="pageChange" @on-page-size-change="pageSizeChange" />
		</div>
		<!-- 添加的模态框 -->
		<Modal v-model="addTenant" title="添加入住人">
			<Form ref="tenantInfoAdd" :model="tenantInfoAdd" :rules="tenantInfoAddRule" :label-width="100" class="formColor">
				<Row :gutter="10">
					<Col span="12">
					<FormItem prop="name" label="入住人姓名">
						<Input type="text" v-model="tenantInfoAdd.name" placeholder="入住人姓名">
						</Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem prop="sex" label="性别">
						<RadioGroup v-model="tenantInfoAdd.sex">
							<Radio label="0">男</Radio>
							<Radio label="1">女</Radio>
						</RadioGroup>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="10">
					<FormItem prop="certType" label="证件类型">
						<Select v-model="tenantInfoAdd.certType" placeholder="请选择" clearable>
							<Option :value="item.code" v-for="(item,index) in certTypeLists" :key="index">{{item.name}}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem prop="certNo" class="certNo">
						<Input type="text" style="margin:0" v-model="tenantInfoAdd.certNo" placeholder="证件编号">
						</Input>
					</FormItem>
					</Col>
				</Row>
				<Row :gutter="10">
					<Col span="15">
					<FormItem prop="date" label="证件有效期">
						<DatePicker type="datetimerange" split-panels v-model="tenantInfoAdd.date" format="yyyy-MM-dd" placeholder="证件有效期"></DatePicker>
					</FormItem>
					</Col>
					<Col span="9">
					<!-- <Button disabled style="display: inline-block;margin-right: 10px;">自动读取身份证</Button> -->
					<!-- <Icon type="ios-help-circle-outline" :size="20" /> -->
					</Col>
				</Row>
				<Row>
					<Col span="12">
					<FormItem prop="phone" label="手机号">
						<Input type="text" v-model="tenantInfoAdd.phone" placeholder="手机号">
						</Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem prop="checkinTime" label="入住时间">
						<DatePicker type="date" v-model="tenantInfoAdd.checkinTime" format="yyyy-MM-dd" placeholder="入住时间"></DatePicker>
					</FormItem>
					</Col>
				</Row>
			</Form>
			<div slot="footer">
				<Button type="primary" @click="handleSaveTeanant('tenantInfoAdd')">确定</Button>
				<Button type="default" @click="cancelTenant('tenantInfoAdd')">取消</Button>
			</div>
		</Modal>
		<!-- 租约列表 -->
		<Modal
		v-model="leaseListShow"
		title="租约列表"
		width="900"
		>	
			<Table :data="leaseList" :columns="leaseCol"></Table>
		</Modal>
		<!-- 租客合并 -->
		<Modal v-model="mergeShow" title="租客合并">
			<Form ref="mergeData" :model="mergeData" :rules="mergeRule" :label-width="200">
				<FormItem prop="accordingId" label="以此租客为根据进行合并：">
					<Select v-model="mergeData.accordingId" placeholder="请选择">
						<Option v-for="(item,index) in mergeList" :key="index"
						:label="item.name+'-'+item.certNo" :value="item.id"></Option>
					</Select>
				</FormItem>
				<Row class="alert-col">
					<Icon type="md-alert" class="alert-icon" size="16" color="#f90" /><span  class="alert-span">* 提交后无法撤销，请保证选择正确后进行提交</span>
				</Row>
			</Form>
			<div slot="footer">
				<Button type="primary" ghost @click="cancleMerge">取消</Button>
				<Button type="primary" @click="saveMerge">提交</Button>
			</div>
		</Modal>
	</Card>
</template>
<script>
	export default {
		props: ["lists", "pageNo", "pageSize", "isAdd", "isPage", "leaseId", "totalRows"],
		data() {
			const validatePhone = (rule, value, callback) => {
				if (value != "" && value != undefined) {
					if (!(/^1[34578]\d{9}$/.test(value))) {
						callback(new Error('手机号码格式有误!'));
					} else {
						callback();
					}
				} else {
					callback(new Error("手机号不能为空"));
				}
			};
			const validateIdCard = (rule, value, callback) => {
				if (this.tenantInfoAdd.certType != "" && this.tenantInfoAdd.certType != undefined) {
					let certType = this.tenantInfoAdd.certType;
					let partern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
					let message = "";
					switch (certType) {
						case "0":
							partern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
							message = "身份证号格式有误！";
							break;
						case "1":
							partern = /^([a-zA-z]|[0-9]){5,17}$/;
							message = "护照格式有误！";
							break;
						case "2":
							partern = /^[a-zA-Z][0-9]{9}$/;
							message = "台胞证格式有误！";
							break;
						case "3":
							partern = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/;
							message = "港澳通行证格式有误！";
							break;
						default:
							break;
					}
					if (!partern.test(value)) {
						callback(new Error(message));
					} else {
						callback();
					}
				} else {
					callback(new Error("选择证件类型"));
				}
			};
			return {
				checkSection:[],
				mergeShow:false,
				mergeData:{},
				mergeRule:{
					accordingId: [{
						required: true,
						message: "请选择",
						triggle: "change"
					}]
				},
				mergeList:[],
				leaseListShow:false,
				leaseList:[],
				leaseCol:[
					{
						title:'房源',
						key:'roomName',
						minWidth:120,
					},
					{
						title:'租期始末',
						key:'date',
						minWidth:100,
					},
					{
						title:'月租金（￥）',
						key: 'rent',
						render: (h, params) => {
							return h('div', this.$com.toMoney(params.row.rent));
						}
					},
					{
						title: '合同类型',
						key: 'type',
						render: (h, params) => {
							return h('div', this.transformContractType(params.row.type))
						},
					},
					{
						title: '租约状态',
						key: 'status',
						render: (h, params) => {
							const status = this.$com.transformLeaseStatus(params.row.status);
							return h('div', [
							h('Tag', {
								props: {
								color: status.color,
								},
							}, status.txt)
							]);
						},
					},
					{
						title:'操作',
						render:(h,params)=>{
							return h('Button',{
								on:{
									click:()=>{
										this.$router.push({
											name: 'contract-detail',
											params:{
												leaseId:params.row.id,
												roomId:params.row.roomId
											}
										})
									}
								}
							},'查看')
						}
					}
				],
				certTypeLists: [{
						name: '身份证',
						code: "0"
					}, {
						name: "护照",
						code: "1"
					}, {
						name: "台胞证",
						code: "2"
					},
					{
						name: "港澳通行证",
						code: "3"
					}
				],
				addTenant: false,
				tenantInfoAdd: {
					sex: '0'
				},
				tenantInfoAddRule: {
					name: [{
						required: true,
						message: "姓名",
						triggle: "blur"
					}],
					sex: [{
						required: true,
						message: "性别",
						triggle: "blur"
					}],
					phone: [{
						required: true,
						validator: validatePhone,
						triggle: "blur"
					}],
					certNo: [{
						validator: validateIdCard,
						triggle: "blur"
					}],
					certType: [{
						required: true,
						message: "选择类型",
						triggle: "change"
					}]
				},
				columns1: [
					{
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },{
						title: '入住人姓名',
						key: 'name',
						minWidth: 150,
						align: 'center',
						// render: (h, params) => {
						// 	let name = params.row.name;
						// 	let isType = params.row.isLessee == "1" ? "承租人" : "入住人";
						// 	let color = params.row.isLessee == "1" ? "#2d8cf0" : "#ff9900";
						// 	return h('div', [
						// 		h('span', {}, name),
						// 		h('span', {
						// 			style: {
						// 				"display": "inline-block",
						// 				"width": "50px",
						// 				"height": "18px",
						// 				"border": "1px solid #2d8cf0",
						// 				"border-color": color,
						// 				"color": color,
						// 				"fontSize": "12px",
						// 				"text-align": "center",
						// 				"borderRadius": "5px",
						// 				"marginLeft": "5px",

						// 			}
						// 		}, isType)
						// 	]);
						// }
					},
					{
						minWidth: 60,
						title: '性别',
						key: 'sex',
						render: (h, params) => {
							let sex = params.row.sex == 0 ? "男" : "女"
							return h('span', {}, sex);
						}
					},
					{
						title: '手机号',
						key: 'phone',
						minWidth: 120,
					},
					{
						title: '证件',
						minWidth: 200,
						key: 'certType',
						render: (h, params) => {
							let certType = "";
							let type = params.row.certType;
							if (type == "0") {
								certType = "身份证"
							} else if (type == "1") {
								certType = "护照"
							} else if (type == "2") {
								certType = "台胞证"
							} else if (type == "3") {
								certType = "港澳通行证"
							}
							return h('span', {}, certType + '-' + params.row.certNo);
						}
					},
					{
						title: '居住状态',
						key: 'residentStatus',
						minWidth: 110,
						render: (h, params) => {
							let certType = "";
							let type = params.row.residentStatus;
							if (type == "0") {
								certType = "在住"
							} else if (type == "1") {
								certType = "搬离"
							} else if (type == "2") {
								certType = "删除"
							}
							return h('span', {}, certType);
						}

					},
					// {
					// 	title: '入住日',
					// 	key: 'checkinTime',
					// 	minWidth: 110,
					// },
					// {
					// 	title: '房源地址',
					// 	key: 'roomName',
					// 	minWidth: 190,
					// },
					// {
					// 	title: '搬出时间',
					// 	key: 'leaveTime',
					// 	minWidth: 100,
					// },
					{
						title: '操作',
						width: 210,
						// fixed: 'right',
						render: (h, params) => {
							let str = {
								leaseId: params.row.leaseId,
								roomId: params.row.roomId,
								fromAccount: '0'
							}
							let str1 = {
								leaseId: params.row.leaseId,
								roomId: params.row.roomId,
								fromAccount: '0',
								tab: "account"
							}
							return h('div', [
								h('Button', {
									style: {
										"display": "inline-block",
										"marginRight": "6px"
									},
									on: {
										click: (e) => {
											// this.$router.push({
											// 	name: 'public-housing-contract-detail',
											// 	params: str
											// })
											this.searchLease(params.row);
										}
									}
								}, "查看租约"),
							]);
						}
					}
				],
				columns2: [{
						title: '入住人姓名',
						key: 'name',
						minWidth: 150,
						align: 'center',
						render: (h, params) => {
							let name = params.row.name;
							let isType = params.row.isLessee == "1" ? "承租人" : "入住人";
							let color = params.row.isLessee == "1" ? "#2d8cf0" : "#ff9900";
							return h('div', [
								h('span', {}, name),

								h('span', {
									style: {
										"display": "inline-block",
										"width": "50px",
										"height": "18px",
										"border": "1px solid #2d8cf0",
										"border-color":color,
										"color": color,
										"fontSize": "12px",
										"text-align": "center",
										"borderRadius": "5px",
										"marginLeft": "5px",
										
									}
								}, isType)
							]);
						}
					},
					{
						minWidth: 60,
						title: '性别',
						key: 'sex',
						render: (h, params) => {
							let sex = params.row.sex == 0 ? "男" : "女"
							return h('span', {}, sex);
						}
					},
					{
						title: '手机号',
						key: 'phone',
						minWidth: 120,
					},
					{
						title: '证件',
						minWidth:200,
						key: 'certType',
						render: (h, params) => {
							let certType = "";
							let type = params.row.certType;
							if (type == "0") {
								certType = "身份证"
							} else if (type == "1") {
								certType = "护照"
							} else if (type == "2") {
								certType = "台胞证"
							} else if (type == "3") {
								certType = "港澳通行证"
							}
							return h('span', {}, certType + '-' + params.row.certNo);
						}
					},
					{
						title: '居住状态',
						key: 'residentStatus',
						minWidth: 110,
						render: (h, params) => {
							let certType = "";
							let type = params.row.residentStatus;
							if (type == "0") {
								certType = "在住"
							} else if (type == "1") {
								certType = "搬离"
							} else if (type == "2") {
								certType = "删除"
							}
							return h('span', {}, certType);
						}

					},
					{
						title: '入住日',
						key: 'checkinTime',
						minWidth: 110,
					},
					// {
					// 	title: '房源地址',
					// 	key: 'roomName',
					// 	minWidth: 190,
					// },
					// {
					// 	title: '搬出时间',
					// 	key: 'leaveTime',
					// 	minWidth: 100,
					// },
				],
				data1: [],
				total: 0
			}
		},
		mounted() {
			this.data1 = this.lists;
			this.total = this.data1.length;
			if (this.$route.name == 'contract-detail') {
				this.columns1.splice(6, 3);
				this.border = true;
			}
		},
		watch: {
			"lists": function() {
				this.data1 = this.lists;
				this.total = this.data1.length;
			}
		},
		methods: {
			selectChange(params){
				this.checkSection=params;
			},
			// 合并按钮
			merge(){
				if(this.checkSection.length <= 1){
					this.$Message.error('请至少选择两名租客进行合并！')
				}else{
					this.mergeList=JSON.parse(JSON.stringify(this.checkSection));
					this.mergeShow=true;
				}
			},
			saveMerge(){
				this.$refs['mergeData'].validate((valid)=>{
					if(!valid) return;
					let list=[];
					this.checkSection.forEach((e)=>{
						list.push(e.id)
					})
					this.$ajax.post(
						this,
						this.$api.TEANANT_MERGE,
						{
							id:this.mergeData.accordingId,
							list:list
						},
						(res)=>{
							this.$Message.success('合并成功');
							this.$emit('addLists')
							this.cancleMerge();
						}
					)
				})
			},
			cancleMerge(){
				this.$refs['mergeData'].resetFields();
				this.mergeShow=false;
			},
			// 查看租约列表
			searchLease(params){
				this.leaseList=[];
				this.$ajax.get(
					this,
					this.$api.TEANANT_LEASE_GET.replace("{tenantId}",params.id),
					{},
					(res)=>{
						let data=res.data.content;
						data.forEach((e)=>{
							e.lease.date=this.transformDate(e.lease.startTime,e.lease.endTime);
							this.leaseList.push(
								e.lease
							)
						})
						this.leaseListShow=true;
					}
				)
			},
			transformDate(start, end) {
				if (!start || !end) {
					return '';
				}
				const startArr = start.split(' '),
						endArr = end.split(' ');
				return `${startArr[0]} 至 ${endArr[0]}`
			},
			transformContractType(type) {
				return type == '0' ? '电子合同' : '纸质合同';
			},
			handleAdd() {
				this.addTenant = true;
			},
			formateDate(d) {
				let month = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
				let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
				const newDate = d.getFullYear() + '-' + month + '-' + day;
				return newDate;
			},
			handleSaveTeanant(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.tenantInfoAdd.leaseId = this.leaseId;
						this.tenantInfoAdd.checkinTime = this.tenantInfoAdd.checkinTime != "" ? this.formateDate(this.tenantInfoAdd.checkinTime) :
							"";
						this.tenantInfoAdd.certPeriod = this.tenantInfoAdd.date[0] != "" ? this.formateDate(this.tenantInfoAdd.date[0]) +
							"~" + this.formateDate(this.tenantInfoAdd.date[1]) : "";
						delete this.tenantInfoAdd["date"];
						this.$ajax.post(this, this.$api.TEANANT_LIST_ADD_POST, this.tenantInfoAdd,
							res => {
								if (res.code == "200") {
									this.$Message.success('success');
									this.addTenant = false;
									this.$emit("addLists");
								} else {
									this.$Message.error(res.msg);
								}

							});
					} else {
						this.$Message.error('填写必填项!');
					}
				})

			},
			cancelTenant(name) {
				this.$refs[name].resetFields();
				this.addTenant = false;
			},
			pageChange(val) {
				this.$emit("pageChange", val);
			},
			pageSizeChange(val) {
				this.$emit("pageSizeChange", val);
			}
		}
	}
</script>
<style>
	.certNo .ivu-form-item-content {
		margin: 0px !important;
	}
</style>
<style scoped>
	.page {
		margin-top: 20px;
		text-align: center;
	}

	.info-title {
		font-size: 14px;
		color: #17233d;
		font-weight: 700;
	}
	.alert-col{
        position: relative;
		margin-bottom:20px;
		margin-left:200px;
    }
	.alert-icon{
        position: absolute;
        top: 6px;
    }
	.alert-span{
        position: absolute;
        top: 6px;
        left: 20px;
    }
</style>
