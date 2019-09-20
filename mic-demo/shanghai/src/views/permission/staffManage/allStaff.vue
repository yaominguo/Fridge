<template>
	<Card dis-hover :bordered="false" class="staffManage">
		<Row>
			<Col span="24">
			<Row type="flex" justify="space-between" :gutter="20">
				<Col>共有<span style="font-size:22px;color:red">{{totalRows}}</span>名员工</Col>
				<Col><Button type="primary" to="/staffManage/list">返回员工管理</Button></Col>
			</Row>
			<Divider />
			<Row>
				<Form :model="formSearch" :label-width="80" :rule="formSearchRules">
					<Row>
						<Col span="8">
						<FormItem label="姓名">
							<Input v-model="formSearch.name_l" clearable placeholder="姓名"></Input>
						</FormItem>
						</Col>
						<Col span="8">
						<FormItem label="电话">
							<Input v-model="formSearch.phone_l" clearable placeholder="电话"></Input>
						</FormItem>
						</Col>
						<Col span="8">
						<FormItem label="所属店面">
							<Select v-model="formSearch.storeIds_l" clearable>
								<Option v-for="(item,index) in storeLists" :key="index" :value="item.id">{{item.storeName}}</Option>
							</Select>
						</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span="8">
						<FormItem label="权限">
							<Select v-model="formSearch.roleIds" clearable>
								<Option v-for="(item,index) in roleLists" :key="index" :value="item.id">{{item.permName}}</Option>
							</Select>
						</FormItem>
						</Col>
						<Col span="8">
						<FormItem label="账号状态">
							<CheckboxGroup v-model="formSearch.status">
								<Checkbox label="1">有效</Checkbox>
								<Checkbox label="0">禁用</Checkbox>
							</CheckboxGroup>
						</FormItem>
						</Col>
					</Row>
					<Row type="flex" justify="end">
						<Col>
						<Button @click="reset">清空</Button>
						<Button type="primary" @click="search">查询</Button>
						</Col>
					</Row>
				</Form>
			</Row>
			<Row>
				<Col>
				<Table style="margin-top:10px" border ref="selection" :columns="listColumns" :data="listDatas"></Table>
				</Col>
			</Row>
			<Row type="flex" justify="center">
				<Col>
				<Page :total="totalRows" show-sizer show-total @on-change="pageChange" @on-page-size-change="pageSizeChange" style="margin-top:10px"></Page>
				</Col>
			</Row>
			</Col>
		</Row>
		<Modal v-model="showHistory" title="历史">
			<Row>
				<Col span="12">
				姓名：{{tableRow.name}}
				</Col>
				<Col span="12">
				手机号码：{{tableRow.phone}}
				</Col>
			</Row>
			<Row style="margin-top:10px">
				<Col span="12">
				入职时间：{{tableRow.createTime}}
				</Col>
				<Col span="12">
				最近登录时间：{{historyDatas&&historyDatas.length>0?historyDatas[0].createTime:""}}
				</Col>
			</Row>
			<Row style="margin-top:10px">
				<Col span="16">
				筛选登录日期： <DatePicker type="daterange" confirm placeholder="筛选登录日期" v-model="loginDate" style="width: 150px"></DatePicker>
				</Col>
				<Col span="2">
				<Button type="primary" @click="searchHistory">查询</Button>
				</Col>
			</Row>
			<Table style="margin-top:10px" border ref="selection" :columns="historyColumns" :data="historyDatas"></Table>
			<Row type="flex" justify="center">
				<Col>
				<Page :total="historyTotal" show-sizer show-total @on-change="historyPageChange" @on-page-size-change="historyPageSizeChange"
				 style="margin-top:10px"></Page>
				</Col>
			</Row>
		</Modal>
	</Card>
</template>
<script>
	export default {
		data() {
			return {
				formSearch: {},
				formSearchRules: {},
				historyColumns: [{
						title: "日期",
						align: "center",
						key: "createTime"
					},
					{
						title: "登录时间",
						align: "center",
						key: "createTime"
					},
					{
						title: "登录终端",
						align: "center",
						key: "source"
					}
				],
				listColumns: [{
						title: "序号",
						type: "index",
						minWidth: 60,
						align: "center"
					},
					{
						title: "姓名",
						key: "name"
					},
					{
						title: "电话",
						key: "phone"
					},
					{
						title: "所属店面",
						key: "storeName"
					},
					{
						title: "角色权限",
						key: "roles"
					},
					{
						title: "职能范围",
						key: "funScope",
						render: (h, params) => {
							let str = params.row.funScope;
							let message = "";
							switch (str) {
								case "0":
									message = "部分管理职能";
									break;
								case "1":
									message = "单店管理职能";
									break;
								case "2":
									message = "全店管理职能";
									break;
								default:
									break;
							}
							return h("div", {}, message);
						}
					},
					{
						title: "负责房源",
						key: "defaultStoreId"
					},
					{
						title: "开通时间",
						key: "createTime",
						minWidth: 150,
						render: (h, params) => {
							return h("div", [
								h("p", {}, params.row.createTime),
								h("a", {
									on: {
										click: () => {
											this.history(params.row);
										}
									}
								}, '查看登录记录'),
							]);
						}
					},
					{
						title: "账号状态",
						key: "status",
						render: (h, params) => {
							let message = "";
							let flag = params.row.status;
							if (flag != "" && flag != null) {
								message = flag == "0" ? "禁用" : "有效"
							}
							return h("div", {}, message);
						}
					}
				],
				listDatas: [],
				historyDatas: [],
				roleLists: [],
				storeLists: [],
				totalRows: 0,
				pageSize: 10,
				pageNo: 1,
				historyTotal: 0,
				pageNoHistory: 1,
				pageSizeHistory: 10,
				sectionLists: [],
				showHistory: false,
				tableRow: {},
				loginDate: []

			};
		},
		mounted() {
			//权限列表
			this.getRole();
			//店员
			this.getStaffInfo();
			//店铺列表
			this.getStore();
		},
		methods: {
			getRole() {
				this.$ajax.get(this, this.$api.GET_ALL_ROLE + "?isTree=true", {}, res => {
					this.roleLists = res.data.content;
				});
			},
			getStore() {
				this.$ajax.get(this, this.$api.GET_USER_STORE, {}, res => {
					this.storeLists = res.data.content;
				});
			},
			getStaffInfo() {
				let str = "";
				for (let i in this.formSearch) {
					if (this.formSearch[i] == "" || this.formSearch[i] == undefined) {
						delete this.formSearch[i];
					} else {

						str += "&" + i + "=" + this.formSearch[i];
					}
				}
				this.$ajax.get(
					this,
					this.$api.GET_ALL_STAFF_LISTS +
					"?pageSize=" +
					this.pageSize +
					"&pageNo=" +
					this.pageNo +
					str, {},
					res => {
						this.listDatas = res.data.content;
						this.totalRows = res.data.totalRows;
					}
				);
			},
			reset() {
				this.formSearch = {};
				this.getStaffInfo();
			},
			search() {
				this.getStaffInfo();
			},
			pageChange(val) {
				this.pageNo = val;
				this.getStaffInfo();
			},
			pageSizeChange(val) {
				this.pageSize = val;
				this.getStaffInfo();
			},
			historyPageChange(val) {
				this.pageNoHistory = val;
				this.history(this.tableRow);
			},
			historyPageSizeChange(val) {
				this.pageSizeHistory = val;
				this.history(this.tableRow);
			},
			history(query, s, e) {
				this.showHistory = true;
				this.tableRow = query;
				let str = s && e ? "&startTime=" + s + "&endTime" + e + "" : "";
				this.$ajax.get(
					this,
					this.$api.GET_LOGIN_HISTORY.replace("{id}", query.id) + "?pageNo=" + this.pageNoHistory + "&pageSize=" + this.pageSizeHistory +
					str, {},
					res => {
						this.historyDatas = res.data.content;
						this.historyTotal = res.data.totalRows;
					}
				);
			},
			searchHistory() {
				let startTime = this.loginDate[0] != "" ? this.formateDate(this.loginDate[0]) : "";
				let endTime = this.loginDate[1] != "" ? this.formateDate(this.loginDate[1]) : "";
				if (startTime != "" && endTime != "") {
					this.history(this.tableRow, startTime, endTime);
				} else {
					this.history(this.tableRow);
				}
			},
			formateDate(d) {
				let month = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
				let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
				let hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
				let minute = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
				let seconds = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
				const newDate = d.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + seconds;
				return newDate;
			},
		}
	};
</script>
<style>
	.staffManage .ivu-divider-horizontal {
		margin: 12px 0 24px 0;
	}
</style>

<style scoped>
	h1 {
		font-size: 22px;
		line-height: 38px;
		font-weight: 500;
		margin: 7px 0;
	}

	.selectionContainer {
		border: 1px solid #dcdee2;
	}

	.selectionContainer div {
		height: 40px;
		line-height: 40px;
		padding-left: 10px;
		border-bottom: 1px solid #dcdee2;
	}

	.selectionContainer div:last-of-type {
		border: none;
	}

	.active {
		color: #2d8cf0;
		font-weight: bold;
	}

	.timeDom:hover {
		cursor: pointer;
	}
</style>
