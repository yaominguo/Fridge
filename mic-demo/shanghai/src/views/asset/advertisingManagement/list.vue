<template>
	<Card dis-hover>
		<Row type="flex" justify="end" :gutter="16" class-name="addAdvertiseBtn">
			<Col>
			<Button icon="md-add" type="primary" @click="addAdvertising('mass')">批量新增广告位</Button>
			<Button icon="md-add" type="primary" @click="addAdvertising('single')">单条新增广告牌</Button>
			</Col>
		</Row>
		<Form ref="form" :model="searchData" label-position="right" :label-width="80">
			<Row :gutter="16">
				<Col span="6">
				<FormItem label="所属小区" class="ov-form-item">
					<Select placeholder="请选择" v-model="searchData.villageId">
						<Option v-for="(item,index) in communityList" :value="item.id" :key="index">{{ item.name }}</Option>
					</Select>
				</FormItem>
				</Col>
				<Col span="6">
				<FormItem label="地址" class="ov-form-item">
					<Input placeholder="请输入" v-model="searchData.billboardAddress_l"></Input>
				</FormItem>
				</Col>
				<Col span="6">
				<FormItem label="广告牌类型" class="ov-form-item">
					<Select placeholder="请选择" v-model="searchData.billboardType">
						<Option v-for="item in billboardTypeLists" :value="item.id" :key="item.id">{{ item.typeName }}</Option>
					</Select>
				</FormItem>
				</Col>
				<Col span="6">
				<FormItem label="广告牌形式" class="ov-form-item">
					<Select placeholder="请选择" v-model="searchData.billboardForm">
						<Option v-for="item in billboardFormLists" :value="item.id" :key="item.id">{{ item.typeName }}</Option>
					</Select>
				</FormItem>
				</Col>
			</Row>
			<Row :gutter="16">
				<Col span="6">
				<FormItem label="资产编号" class="ov-form-item">
					<Input placeholder="请输入" v-model="searchData.assetNumber_l"></Input>
				</FormItem>
				</Col>
				<Col span="6">
				<FormItem label="审批状态" class="ov-form-item">
					<Select placeholder="请选择" v-model="searchData.approvalStatus">
						<Option v-for="(item,index) in approvalStatusLists" :value="item.value" :key="index">{{ item.name}}</Option>
					</Select>
				</FormItem>
				</Col>
				<Col span="6">
				<FormItem label="运营状态" class="ov-form-item">
					<Select placeholder="请选择" v-model="searchData.operationdStatus">
						<Option v-for="(item,index) in operationdStatusLists" :value="item.value" :key="index">{{ item.name}}</Option>
					</Select>
				</FormItem>
				</Col>
				<Col span="6">
				<FormItem label="资产用途" class="ov-form-item">
					<Select placeholder="请选择" v-model="searchData.assetUse">
						<Option v-for="(item,index) in assetUseLists" :value="item.value" :key="index">{{ item.name}}</Option>
					</Select>
				</FormItem>
				</Col>
			</Row>
			<Row type="flex" justify="space-between" :gutter="16">
				<Col>
				<Button type="primary" @click="approval('opeation')">批量运营审批</Button>
				<Button type="primary" @click="approval('add')">批量新增审批</Button>
				</Col>
				<Col>
				<Button type="primary" @click="handleSearch">查询</Button>
				<Button @click="handleReset">重置</Button>
				</Col>
			</Row>
			<ActiveTable :showTitle="true" :columns="col" :data="listData" :pageSize="params.pageSize" :current="params.pageNo"
			 :total="totalRows" @on-page-change="pageChange" @on-select-change="multipleSelection" />
			<Modal title="作废" v-model="obsoleteShow" :mask-closable="false" @on-cancel="cancelobsolete">
				<Form ref="obsoleteData" :model="obsoleteData" :rules="obsoleteRule" :label-width="120">
					<FormItem label="作废原因" prop="reason">
						<Select v-model="obsoleteData.reason">
							<Option value="信息填写错误">信息填写错误</Option>
							<Option value="划转">划转</Option>
							<Option value="出售">出售</Option>
							<Option value="拆除">拆除</Option>
						</Select>
					</FormItem>
					<FormItem label="备注" prop="marks">
						<Input type="textarea" v-model="obsoleteData.marks"></Input>
					</FormItem>
				</Form>
				<div slot="footer">
					<Button type="primary" ghost @click="cancelobsolete">取消</Button>
					<Button type="primary" @click="saveObsolete">提交</Button>
				</div>
			</Modal>
		</Form>
	</Card>
</template>
<script>
	import ActiveTable from '@/components/Helper/Table/ActiveTable';
	export default {
		components: {
			ActiveTable,
		},
		data() {
			return {
				searchData: {
					dataStatus_in:'0,1'
				},
				listData: [],
				totalRows: 0,
				params: {
					pageSize: 10,
					pageNo: 1
				},
				obsoleteShow: false,
				obsoleteData: {
					marks: ''
				},
				obsoleteRule: {
					reason: [{
						required: true,
						message: "请选择作废原因",
					}]
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
				operationdStatusLists: [{
						name: "未运营",
						value: "0"
					},
					{
						name: "已运营/未租",
						value: "1"
					},
					{
						name: "已运营/已租",
						value: "2"
					}
				],
				approvalStatusLists: [{
						name: "草稿",
						value: "0"
					},
					{
						name: "新增待审核",
						value: "1"
					},
					{
						name: "修改待审核",
						value: "2"
					},
					{
						name: "作废待审核",
						value: "3"
					},
					{
						name: "运营待审核",
						value: "4"
					},
					{
						name: "审核通过",
						value: "5"
					},
					{
						name: "审核驳回",
						value: "7"
					},
					{
						name: "撤回运营审批中",
						value: "8"
					}
				],
				col: [{
						type: 'selection',
						width: 60,
						align: 'center'
					}, {
						title: '地址',
						width: 210,
						key: 'billboardAddress'
					},
					{
						title: '资产信息',
						key: 'billboardAddress',
						width: 150,
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
								h('div', {}, "类型:" + this.showBillboardType(params.row.billboardType)),
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
						title: '运营状态',
						width: 110,
						render: (h, params) => {
							let status = params.row.operationdStatus;
							let msg = "";
							switch (status) {
								case "0":
									msg = "未运营"
									break;
								case "1":
									msg = "已运营/未租 "
									break;
								case "2":
									msg = "已运营/已租"
									break;
								default:
									break;
							}
							if (status == 2) {
								return h('div', [
									h('div', {}, msg),
									h('div', {}, "租客:" + params.row.name),
									h('div', {}, "租约起期:" + params.row.leaseSartTime),
									h('div', {}, "租约止期:" + params.row.leaseEndTime)
								])
							} else {
								return h('div', {}, msg)
							}

						}
					},
					{
						title: '审批状态',
						width: 100,
						render: (h, params) => {
							let status = params.row.approvalStatus;
							let msg = "";
							switch (status) {
								case "0":
									msg = "草稿"
									break;
								case "1":
									msg = "新增审批中"
									break;
								case "2":
									msg = "修改审批中"
									break;
								case "3":
									msg = "作废审批中"
									break;
								case "4":
									msg = "提交运营审批中"
									break;
								case "5":
									msg = "审核通过"
									break;
								case "7":
									msg = "审核驳回"
									break;
								case "8":
									msg = "撤回运营审批中"
									break;
								default:
									break;
							}
							return h('div', [
								h('div', {}, msg),
							])
						}
					},
					{
						title: '操作',
						width: 180,
						fixed: 'right',
						align: "center",
						render: (h, params) => {
							let edit = h('div', {
								style: {
									"marginLeft": "10px",
									"color": "#2d8cf0"
								},
								on: {
									click: () => {
										//修改
										this.$router.push({
											name: 'advertising/editSingle',
											query: {
												id: params.row.id
											}
										})
									}
								}
							}, "修改");

							let del = h('div', {
								style: {
									"marginLeft": "10px",
									"color": "#2d8cf0"
								},
								on: {
									click: () => {
										this.$Modal.confirm({
											title: "提示",
											content: "确认删除广告位编号为" + params.row.advertNumber + '的广告位？',
											okText: "确认",
											cancelText: "取消",
											onOk: () => {
												this.$ajax.delete(
													this,
													this.$api.DELETE_ADVERTISE.replace("{id}", params.row.id), {},
													res => {
														if (res.code == '200') {
															this.$Message.success("删除成功！");
															this.handleSearch();
														} else {
															this.$Message.error(res.msg);
														}
													}
												);
											}
										})
									}
								}
							}, "删除");
							let obsolete = h('div', {
								style: {
									"marginLeft": "10px",
									"color": "#2d8cf0"
								},
								on: {
									click: () => {
										this.obsoleteShow = true;
										this.obsoleteData.id = params.row.id;
									}
								}
							}, "作废");
							let approval = h('div', {
								style: {
									"marginLeft": "10px",
									"color": "#2d8cf0"
								},
								on: {
									click: () => {
										this.addNewApproval(params.row.id);
									}
								}
							}, "提交新增审批");
							let withdrawal = h('div', {
								style: {
									"marginLeft": "10px",
									"color": "#2d8cf0"
								},
								on: {
									click: () => {
										this.cancelApproval(params.row.id, '撤回新增审批')
									}
								}
							}, "撤回新增审批");
							let submitOperation = h('div', {
								style: {
									"marginLeft": "10px",
									"color": "#2d8cf0"
								},
								on: {
									click: () => {
										this.submitOperation(params.row.id);
									}
								}
							}, "提交运营审批");
							let cancelOperation = h('div', {
								style: {
									"marginLeft": "10px",
									"color": "#2d8cf0"
								},
								on: {
									click: () => {
										this.$Modal.confirm({
											title: "提示",
											content: "确认对编号为" + params.row.advertNumber + '的广告位进行撤回运营操作？',
											okText: "确认",
											cancelText: "取消",
											onOk: () => {
												this.$ajax.put(
													this,
													this.$api.PUT_WITHDRAW_OPEATION.replace("{id}", params.row.id), {},
													res => {
														if (res.code == '200') {
															this.$Message.success("撤回运营成功！");
															this.handleSearch();
														} else {
															this.$Message.error(res.msg);
														}
													}
												);
											}
										})
									}
								}
							}, "撤回运营");
							let cancelOperationApproval = h('div', {
								style: {
									"marginLeft": "10px",
									"color": "#2d8cf0"
								},
								on: {
									click: () => {
										this.cancelApproval(params.row.id, '取消提交运营审批')
									}
								}
							}, "取消提交运营审批");
							let cancelWithdrawOperationApproval = h('div', {
								style: {
									"marginLeft": "10px",
									"color": "#2d8cf0"
								},
								on: {
									click: () => {
										this.cancelApproval(params.row.id, '取消撤回运营审批')
									}
								}
							}, "取消撤回运营审批");
							let cancelObsolete = h('div', {
								style: {
									"marginLeft": "10px",
									"color": "#2d8cf0"
								},
								on: {
									click: () => {
										this.cancelApproval(params.row.id, '撤回作废审批')
									}
								}
							}, "撤回作废审批");
							let cancelEdit = h('div', {
								style: {
									"marginLeft": "10px",
									"color": "#2d8cf0"
								},
								on: {
									click: () => {
										this.cancelApproval(params.row.id, '撤回修改审批')
									}
								}
							}, "撤回修改审批");
							let opeationsArray = [];
							let status = params.row.approvalStatus;
							let running = params.row.operationdStatus;
							let dataStatus = params.row.dataStatus;
							switch (status) {
								case "0":
									opeationsArray = [edit, approval, del]
									break;
								case "1":
									opeationsArray = [withdrawal]
									break;
								case "2":
									opeationsArray = [cancelEdit]
									break;
								case "3":
									opeationsArray = [cancelObsolete]
									break;
								case "4":
									opeationsArray = [cancelOperationApproval]
									break;
								case "5":
									opeationsArray = running == "0" ? [edit, obsolete, submitOperation] : [edit, cancelOperation]
									break;
								case "7":
									if (dataStatus == "0") {
										opeationsArray = [edit, approval, del];
									} else {
										opeationsArray = running == "0" ? [edit, obsolete, submitOperation] : [edit,cancelOperation];
									}
									break;
								case "8":
									opeationsArray = [cancelWithdrawOperationApproval];
									break;
								default:
									break;
							}
							const opeationsArrays = opeationsArray.map(item => {
								return h('DropdownItem', [item]);
							})
							return h('div', [
								h('Button', {
									props: {
										size: "small"
									},
									style: {
										"marginRight": "10px"
									},
									on: {
										click: () => {
											//修改
											this.$router.push({
												name: 'advertising/show',
												query: {
													id: params.row.id
												}
											})
										}
									}
								}, "查看"),
								h('Dropdown', {
										props: {
											transfer: true,
										}
									},
									[
										h('Button', {
											props: {
												size: 'small',
											},
											style: {
												marginRight: '5px',
											},
										}, '更多'),
										h('DropdownMenu', {
											slot: 'list',
											style: {
												textAlign: 'center',
											},
										}, opeationsArrays)
									])
							])
						}
					}
				],
				massHandleData: [],
				communityList: []
			}
		},
		mounted() {
			this.handleSearch();
			this.getCommunity();
			this.getAdvertiseType();

		},
		methods: {
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
			showBillboardType(query) {
				let msg="";
				this.billboardTypeLists.forEach(ele => {
					if (ele.id == query) {
						msg=ele.typeName;
					}
				})
				return msg;
			},
			showBillboardForm(query) {
				let msg="";
				this.billboardFormLists.forEach(ele => {
					if (ele.id == query) {
						msg=ele.typeName;
					}
				})
				return msg;
			},
			handleReset() {
				this.searchData = {
					dataStatus_in:'0,1'
				};
				this.params.pageNo = 1;
				this.params.pageSize = 10;
				this.handleSearch();
			},
			addAdvertising(query) {
				this.$router.push({
					name: query == 'mass' ? 'advertising/add' : 'advertising/addSingle'
				})
			},
			handleSearch() {
				let str = "?pageNo=" + this.params.pageNo + "&pageSize=" + this.params.pageSize
				for (let i in this.searchData) {
					if (this.searchData[i] == "" || this.searchData[i] == undefined) {
						delete this.searchData[i];
					} else {
						str += "&" + i + "=" + this.searchData[i];
					}
				}
				this.$ajax.get(this, this.$api.GET_ADVERTISE_LIST + str, null,
					res => {
						this.totalRows = res.data.totalRows;
						this.listData = res.data.content;
					});
			},
			pageChange(val) {
				this.params.pageNo = val;
				this.handleSearch();
			},
			pageSizeChange(val) {
				this.params.pageSize = val;
				this.handleSearch();
			},
			multipleSelection(selection) {
				this.massHandleData = selection;
			},
			approval(query) {
				if (this.massHandleData.length > 0) {
					if (query == 'add') {
						//批量新增审批
						let id = [];
						let warningMessage = "";
						let flag = false;
						this.massHandleData.forEach(ele => {
							id.push(ele.id);
							if (ele.approvalStatus != '0') {
								flag = true;
								warningMessage = ele.villageName + '-' + ele.advertNumber + '该广告位不能进行此项操作!';
							}
						})
						let querys = id.join(",");
						if (flag) {
							this.$Message.error(warningMessage);
						} else {
							this.addNewApproval(querys);
						}

					} else {
						//批量运营审批
						let id = [];
						let warningMessage = "";
						let flag = false;
						this.massHandleData.forEach(ele => {
							id.push(ele.id);
							if ((ele.approvalStatus != '5' && ele.approvalStatus != '7' && ele.approvalStatus != '8') || ele.operationdStatus !=
								'0' || ele.dataStatus == "0") {
								flag = true;
								warningMessage = ele.villageName + '-' + ele.advertNumber + '该广告位不能进行此项操作!';
							}
						})
						let querys = id.join(",");
						if (flag) {
							this.$Message.error(warningMessage);
						} else {
							this.submitOperation(querys);
						}
					}
				} else {
					this.$Message.error("至少选择一条数据！")
				}
			},
			//提交新增审批
			addNewApproval(query) {
				this.$ajax.put(
					this,
					this.$api.PUT_SUBMIT_ADD_APPROVAL.replace("{id}", query), {},
					res => {
						if (res.code == '200') {
							this.$Message.success("提交新增审批！");
							this.handleSearch();
						} else {
							this.$Message.error(res.msg);
						}
					}
				);
			},
			//提交运营f
			submitOperation(query) {
				this.$ajax.put(
					this,
					this.$api.PUT_SUBMIT_OPEATION.replace("{id}", query), {},
					res => {
						if (res.code == "200") {
							this.$Message.success("提交运营成功！");
							this.handleSearch();
						} else {
							this.$Message.error(res.msg);
						}
					}
				);
			},
			//撤回审批
			cancelApproval(query, msgTips) {
				this.$Modal.confirm({
					title: "提示",
					content: "确认" + msgTips + "吗？",
					okText: "确认",
					cancelText: "取消",
					onOk: () => {
						this.$ajax.put(
							this,
							this.$api.PUT_WITHDRAW_SUBMIT_ADD_APPROVAL.replace("{id}", query), {},
							res => {
								if (res.code == "200") {
									this.$Message.success(msgTips + '成功！');
									this.handleSearch();
								} else {
									this.$Message.error(res.msg);
								}
							}
						);
					}
				})
			},
			saveObsolete() {
				this.$refs['obsoleteData'].validate((valid) => {
					if (valid) {
						this.$ajax.put(
							this,
							this.$api.PUT_ADVERTISE_OBSOLETE_LIST.replace("{id}", this.obsoleteData.id) +
							'?reason=' + this.obsoleteData.reason + '&marks=' + this.obsoleteData.marks, {},
							(res) => {
								if (res.code == '200') {
									this.$Message.success("提交作废成功！");
									this.cancelobsolete();
									this.handleSearch();
								} else {
									this.$Message.error(res.msg);
								}
							}
						)
					}
				})

			},
			cancelobsolete() {
				this.obsoleteShow = false;
				this.$refs['obsoleteData'].resetFields();
			}
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

	.tableFrame {
		margin-top: 10px;
	}

	.algin-right {
		text-align: right;
	}

	.page {
		margin-top: 20px;
		text-align: center;
	}

	.addAdvertiseBtn {
		margin-bottom: 20px;
	}
</style>
