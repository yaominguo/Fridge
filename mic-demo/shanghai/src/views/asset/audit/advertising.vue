<template>
	<div>
		<Form ref="searchData" :model="searchData" label-position="right" :label-width="100">
			<Row :gutter="16">
				<FormItem label="审批状态" class="ov-form-item" prop="operationStatus_in">
					<RadioGroup v-model="searchData.operationStatus_in" type="button">
						<Radio v-for="(item,index) in operationStatusList" :key="index" :label="item.value">
							{{item.label}}
						</Radio>
					</RadioGroup>
				</FormItem>
			</Row>
			<Row :gutter="16">
				<Col span="6">
				<FormItem label="所属小区" class="ov-form-item" prop="villageId">
					<Select clearable placeholder="请选择" v-model="searchData.villageId">
						<Option v-for="item in communityList" :key="item.id" :value="item.id">{{item.name}}</Option>
					</Select>
				</FormItem>
				</Col>
				<Col span="6">
				<FormItem label="地址" class="ov-form-item">
					<Input placeholder="请输入" v-model="searchData.billboardAddress_l" clearable></Input>
				</FormItem>
				</Col>
				<Col span="6">
				<FormItem label="广告牌类型" class="ov-form-item">
					<Select placeholder="请选择" v-model="searchData.billboardType" clearable>
						<Option v-for="item in billboardTypeLists" :value="item.id" :key="item.id">{{ item.typeName }}</Option>
					</Select>
				</FormItem>
				</Col>
				<Col span="6">
				<FormItem label="广告牌形式" class="ov-form-item">
					<Select placeholder="请选择" v-model="searchData.billboardForm" clearable>
						<Option v-for="item in billboardFormLists" :value="item.id" :key="item.id">{{ item.typeName }}</Option>
					</Select>
				</FormItem>
				</Col>
			</Row>
			<Row :gutter="16">
				<Col span="6">
				<FormItem label="资产编号" class="ov-form-item">
					<Input placeholder="请输入" v-model="searchData.assetNumber_l" clearable></Input>
				</FormItem>
				</Col>
				<Col span="6">
				<FormItem label="资产用途" class="ov-form-item">
					<Select placeholder="请选择" v-model="searchData.assetUse" clearable>
						<Option v-for="(item,index) in assetUseLists" :value="item.value" :key="index">{{ item.name}}</Option>
					</Select>
				</FormItem>
				</Col>
				<Col span="6">
				<FormItem label="审批类型" class="ov-form-item">
					<Select placeholder="请选择" v-model="searchData.approvalStatus">
						<Option v-for="(item,index) in approvalStatusLists" :value="item.value" :key="index">{{ item.label}}</Option>
					</Select>
				</FormItem>
				</Col>
				<Col class="algin-right" span="6">
				<Button type="primary" @click="getList">查询</Button>
				<Button type="primary" ghost @click="reset">重置</Button>
				</Col>
			</Row>
			<ActiveTable :showTitle="true" :columns="col" :data="data" :pageSize="searchData.pageSize" :current="searchData.pageNo"
			 :total="total" @on-page-change="changePage" />
		</Form>
		<Modal v-model="approShow" title="审批" :mask-closable="false" @on-cancel="cancelAppro">
			<Form ref="approData" :model="approData" :rules="approRule" :label-width="120">
				<FormItem prop="type" label="审批结果：">
					<RadioGroup v-model="approData.type">
						<Radio label="5">审批通过</Radio>
						<Radio label="7">审批驳回</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem prop="reason" label="审批原因：">
					<Input v-model="approData.reason" type="textarea" :rows="4" placeholder="请输入" />
				</FormItem>
			</Form>
			<div slot="footer">
				<Button type="primary" @click="cancelAppro" ghost>取消</Button>
				<Button type="primary" @click="saveAppro">提交</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
	import ActiveTable from '@/components/Helper/Table/ActiveTable';
	export default {
		components: {
			ActiveTable,
		},
		data() {
			return {
				statusList: [{
						label: '新增审批',
						value: '1'
					},
					{
						label: '修改审批',
						value: '2'
					},
					{
						label: '作废审批',
						value: '3'
					},
					{
						label: '运营审批',
						value: '4'
					},
				],
				approShow: false,
				approData: {},
				approRule: {
					type: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}, ],
					reason: [{
						required: true,
						message: '请输入',
						trigger: 'blur'
					}, ]
				},
				billboardTypeLists: [],
				billboardFormLists: [],
				assetUseLists: [{
						name: "自用",
						value: "0"
					},
					{
						name: "出租",
						value: "1"
					},
					{
						name: "出售",
						value: "2"
					}
				],
				approvalStatusLists: [{
						label: '新增审批',
						value: '1'
					},
					{
						label: '修改审批',
						value: '2'
					},
					{
						label: '作废审批',
						value: '3'
					},
					{
						label: '提交运营审批',
						value: '4'
					},
					{
						label: '撤回运营审批',
						value: '8'
					}
				],
				projectList: [],
				communityList: [],
				searchData: {
					pageNo: 1,
					pageSize: 10,
					operationStatus_in: '待审批'
				},
				total: 0,
				data: [],
				parkTypeList: [],
				isOperateList: [{
						label: '是',
						value: '1'
					},
					{
						label: '否',
						value: '0'
					}
				],
				acquireWayList: [],
				contributorList: [],
				operationStatusList: [{
						label: '全部',
						value: "待审批,审核通过,审核拒绝"
					},
					{
						label: '待审批',
						value: '待审批'
					},
					{
						label: '审批通过',
						value: '审核通过'
					},
					{
						label: '审批拒绝',
						value: '审核拒绝'
					}
				],
				col: [{
						title: '地址',
						width: 220,
						key: 'billboardAddress'
					},
					{
						title: '资产信息',
						key: 'billboardAddress',
						width: 210,
						render: (h, params) => {
							let contributor = params.row.contributor != null ? params.row.contributor : "暂无";
							let propertyRight = params.row.propertyRight != null && params.row.propertyRight == '0' ? "无产证" : "有产证";
							return h('div', [
								h('div', {}, "编号:" + params.row.advertNumber),
								h('div', {}, "出资人:" + contributor)
							])
						}
					},
					{
						title: '小区/公寓',
						width: 120,
						key: 'villageName'
					},
					{
						title: '类型/形式/用途',
						width: 130,
						render: (h, params) => {
							let assetUse = params.row.assetUse;
							let assetUseMsg = ""
							switch (assetUse) {
								case "0":
									assetUseMsg = "自用"
									break;
								case "1":
									assetUseMsg = "出租"
									break;
								case "2":
									assetUseMsg = "出售"
									break;
								default:
									break;
							}
							return h('div', [
								h('div', {}, "类型:" +this.showBillboardType(params.row.billboardType)),
								h('div', {}, "形式:" + this.showBillboardForm(params.row.billboardForm)),
								h('div', {}, "用途:" + assetUseMsg)
							])
						}
					},
					{
						title: '面积及尺寸',
						width: 150,
						render: (h, params) => {
							return h('div', [
								h('div', {}, "预测面积:" + params.row.predictedArea),
								h('div', {}, "实用面积:" + params.row.usableArea),
								h('div', {}, "长宽高:" + params.row.billboardLength + "、" + params.row.billboardWide + "、" + params.row
									.billboardHigh)
							])
						}
					},
					{
						title: '价格',
						width: 180,
						render: (h, params) => {
							let custodyNum = params.row.custodyNum == '0' ? '押自定义' : "押" + params.row.custodyNum;
							return h('div', {
								style: {
									"padding": "10px 0"
								}
							}, [
								h('div', {}, "每平方单位租金:" + params.row.unitRent + "元/月"),
								h('div', {}, "月租金:" + params.row.rent + "元"),
								h('div', {}, "支付方式:" + "付" + params.row.payNum + custodyNum),
								h('div', {}, "押金:" + params.row.deposit + "元")
							])
						}
					},
					{
						title: '时间',
						minWidth: 160,
						fixed: 'right',
						render: (h, params) => {
							let operationStatus = params.row.operationStatus;
							if (operationStatus == '待审批') {
								return h('div', '提交时间：' + this.$com.strTime(params.row.operationTime))
							} else {
								return [
									h('div', '提交时间：' + this.$com.strTime(params.row.operationTime)),
									h('div', '审批时间：' + this.$com.strTime(params.row.checkTime))
								]
							}
						}
					},
					{
						title: '审批状态/审批类型',
						width: 150,
						render: (h, params) => {
							let operationStatus = params.row.operationStatus;
							let type = params.row.approvalStatus;
							let msg = '';
							switch (type) {
								case '1':
									msg = '/新增审批'
									break;
								case '2':
									msg = '/修改审批'
									break;
								case '3':
									msg = '/作废审批'
									break;
								case '4':
									msg = '/提交运营审批'
									break;
								case '8':
									msg = '/撤回运营审批'
									break;
								default:
									break;
							}
							return [
								h('div', {}, operationStatus + msg)
							]
						}
					},
					{
						title: '操作',
						width: 180,
						fixed: 'right',
						align: "center",
						render: (h, params) => {
							let show = h('Button', {
								style: {
									"marginLeft": "10px"
								},
								props: {
									type: 'primary',
									size: 'small',
									ghost: true
								},
								on: {
									click: () => {
										this.$router.push({
											name: 'audit/advertisingDetail',
											query: {
												id: params.row.id
											}
										})
									}
								}
							}, "查看");
							let approval = h('Button', {
								style: {
									"marginLeft": "10px"
								},
								props: {
									type: 'primary',
									size: 'small'
								},
								on: {
									click: () => {
										this.approBtn(params.row);
									}
								}
							}, "审核");
							let opeationsArray = [];
							if (params.row.operationStatus == '待审批') {
								opeationsArray = [approval, show];
							} else {
								opeationsArray = [show];
							}
							return opeationsArray;
						}
					}
				],
			}
		},
		methods: {
			approBtn(row) {
				this.approShow = true;
				this.approData.id = row.id;
			},
			saveAppro() {
				this.$refs['approData'].validate((valid) => {
					if (!valid) return;
					this.$ajax.put(
						this,
						this.$api.AUDITS_PARK_AUDIT.replace('{type}', '2').replace('{id}', this.approData.id) +
						'?status=' + this.approData.type + '&reason=' + this.approData.reason, {},
						(res) => {
							this.$Message.success('审批成功');
							this.cancelAppro();
							this.reset();
						}
					)
				})
			},
			cancelAppro() {
				this.approShow = false;
				this.$refs['approData'].resetFields();
			},
			getList() {
				let params = JSON.parse(JSON.stringify(this.searchData));
				for (let i in params) {
					if (params[i] == '') {
						delete params[i]
					}
					if (params[i] == '全部') {
						delete params[i]
					}
				}
				this.$ajax.get(
					this,
					this.$api.GET_ADVERTISE_APPROVAL_LIST,
					params,
					(res) => {
						this.total = res.data.totalRows;
						this.data = res.data.content == null ? [] : res.data.content;
					}
				)
			},
			changePage(page) {
				this.searchData.pageNo = page;
				this.getList();
			},
			reset() {
				this.$refs['searchData'].resetFields();
				this.communityList = [];
				this.searchData.pageNo = 1;
				this.searchData.pageSize = 10;
				this.searchData.operationStatus_in = '待审批,审批通过,审批拒绝';
				this.getList();
			},
			//小区列表
			getCommunity() {
				this.$ajax.get(
					this,
					this.$api.SEARCH_COMMUNITY + "?name=", {},
					res => {
						this.communityList = res.data.content;
					}
				);
			},
			showBillboardType(query) {
				let msg = "";
				this.billboardTypeLists.forEach(ele => {
					if (ele.id == query) {
						msg = ele.typeName;
					}
				})
				return msg;
			},
			showBillboardForm(query) {
				let msg = "";
				this.billboardFormLists.forEach(ele => {
					if (ele.id == query) {
						msg = ele.typeName;
					}
				})
				return msg;
			},
			getAdvertiseType() {
				this.$ajax.get(
					this,
					this.$api.GET_ADVERTISE_TYPE, {},
					res => {
						this.billboardTypeLists = res.data.content;
					}
				);
				this.$ajax.get(
					this,
					this.$api.GET_ADVERTISE_FORM, {},
					res => {
						this.billboardFormLists = res.data.content;
					}
				);
			},
		},
		mounted() {
			this.getCommunity();
			this.getList();
			this.getAdvertiseType();
		}
	}
</script>
<style scoped>
	.ov-form-item {
		font-weight: bold;
		font-size: 14px;
		text-align: left;
	}

	.ov-form-header {
		text-align: left;
		font-size: 16px;
		padding-bottom: 8px;
		margin-bottom: 16px;
	}

	.ov-form-header-icon,
	.ov-form-header-title {
		vertical-align: middle;
	}

	.algin-right {
		text-align: right;
	}
</style>
