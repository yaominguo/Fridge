<template>
	<Card dis-hover :bordered="false" class="staffManage">
		<Row :gutter="16">
			<Col span="5">
			<Row>
				<Col>
				<h1>组织架构</h1>
				</Col>
				<Col>
				<Alert>
					<Timeline>
						<TimelineItem v-for="(item,index) in storeLists" :key="index" class="timeDom" v-if="item.status==1">
							<p class="time" @click="changeStore(index)" :class="{active:highLighIndex==index}">{{item.storeName}}({{item.staffNumber}})</p>
						</TimelineItem>
					</Timeline>
				</Alert>
				</Col>
			</Row>
			</Col>
			<Col span="19">
			<Row type="flex" justify="end">
				<Col><Button type="default" to="/staffManage/allStaff">查看所有员工</Button>
				<Button type="primary" :to="'/staffManage/create/'+storeId">+ 新建员工账号</Button></Col>
			</Row>
			<Divider />
			<Row>
				<Form :model="formSearch" :label-width="80" :rule="formSearchRules">
					<Row>
						<Col span="8">
						<FormItem label="员工姓名">
							<Input v-model="formSearch.name" placeholder="员工姓名"></Input>
						</FormItem>
						</Col>
						<Col span="8">
						<FormItem label="员工电话">
							<Input v-model="formSearch.phone" placeholder="员工电话"></Input>
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
				<Row>
					<Col>
					<Button @click="setStoreFun('store')">设置所属分店</Button>
					<Button @click="setStoreFun('clerk')">批量更改角色</Button>
					</Col>
				</Row>
				</Col>
				<Col>
				<Table @on-selection-change="tableSelect" style="margin-top:10px" border ref="selection" :columns="listColumns"
				 :data="listDatas"></Table>
				</Col>
			</Row>
			<Row type="flex" justify="center">
				<Col>
				<Page :total="totalRows" show-sizer show-total @on-change="pageChange" @on-page-size-change="pageSizeChange" style="margin-top:10px"></Page>
				</Col>
			</Row>
			</Col>
		</Row>
		<Modal v-model="setBranch" title="批量更改分店" :height="700" :styles="{top: '20px'}">
			<Row type="flex" justify="center" align="middle">
				<Col span="10">
				<div class="frame">
					<div class="selectItem" v-for="(item,index) in sectionLists" :key="index">
						<p>
							<Icon v-show="sectionLists.length>1" size="20" type="md-close-circle" color="red" @click="deleteSectionLists(item.id)" />{{item.name}}</p>
						<p>当前组织:{{item.storeName}}</p>
					</div>
				</div>
				</Col>
				<Col span="4" style="text-align:center">复制到
				<Icon type="md-arrow-round-forward" />
				</Col>
				<Col span="10">
				<div class="frame">
					<CheckboxGroup v-model="modalStoreIds">
						<p v-for="(item,index) in storeLists" :key="index">
							<Checkbox :label="item.id">{{item.storeName}}</Checkbox>
						</p>
					</CheckboxGroup>
				</div>
				</Col>
			</Row>
			<Row type="flex" justify="start" style="margin-top:20px">
				<Checkbox v-model="modalIsRemove">同时从原分店移除</Checkbox>
			</Row>
			<div slot="footer">
				<Button type="default" @click="setBranchCancel">取消</Button>
				<Button type="primary" @click="setBranchSave">确认</Button>
			</div>
		</Modal>
		<Modal v-model="setClerk" title="批量更改角色" :width="700" :height="500" :styles="{top: '20px'}">
			<Row style="margin-bottom:10px">温馨提示：批量修改角色，会为所有已选账号增加右侧所选的角色，不会清除原有角色。</Row>
			<Row style="margin-bottom:10px" :gutter="80" type="flex" justify="space-between">
				<Col span="10">
				<h3>已选子账号</h3>
				</Col>
				<Col span="14">
				<h3>选择组织分店</h3>
				</Col>
			</Row>
			<Row type="flex" justify="center">
				<Col span="10">
				<div class="frame childAccount">
					<div class="selectItem" v-for="(item,index) in sectionLists" :key="index">
						<p>
							<Icon v-show="sectionLists.length>1" size="20" type="md-close-circle" color="red" @click="deleteSectionLists(item.id)" />{{item.name}}</p>
						<p>当前组织{{item.storeName}}</p>
					</div>
				</div>
				</Col>
				<Col span="1" style="text-align:center">
				</Col>
				<Col span="13">
				<div class="character">
					<Row>
						<Col>
						<p class="characterTitle">可增加角色</p>
						</Col>
						<Col>
						<Row class="storeLists">
							<Col>
							<span class="characterItems" v-for="(item,index) in rolesLists" :key="index" :class="{activeRole:roleIndexs.indexOf(index)!=-1}"
							 @click="getRolesInfo(index,item.roleName,item.id)">{{item.roleName}}</span>
							<span class="characterItems example">示例：分店长</span>
							</Col>
						</Row>
						</Col>
					</Row>
				</div>
				<div class="storeLists">
					<Tree :data="treeDatas" :multiple="true" :show-checkbox="true" :children-key="'childList'"></Tree>
				</div>
				</Col>
			</Row>
			<div slot="footer">
				<Button type="default" @click="setClerkCancel">取消</Button>
				<Button type="primary" @click="massChangeRoles">确认</Button>
			</div>
		</Modal>
		<!-- --- -->
		<Modal v-model="editStore" title="修改店面">
			<Row style="margin-bottom:10px">姓名： {{editInfo.name}}</Row>
			<Row style="margin-bottom:10px">当前店面： {{editInfo.storeName}}</Row>
			<Row style="margin-bottom:10px">
				将它：
				<RadioGroup v-model="editStoreType">
					<Radio label="0">移动到它店</Radio>
					<Radio label="1">复制到它店</Radio>
					<Radio label="2">仅移出当前店面</Radio>
				</RadioGroup>
			</Row>
			<Row style="margin-bottom:10px">
				<p style="color:#2d8cf0">选择店面</p>
				<div class="editStoreNameLists">
					<CheckboxGroup v-model="editStoreName">
						<Checkbox v-for="(item,index) in storeLists" :key="index" :label="item.id">
							{{item.storeName}}
						</Checkbox>
					</CheckboxGroup>
				</div>

			</Row>
			<div slot="footer">
				<Button type="default" @click="editStoreCancel">取消</Button>
				<Button type="primary" @click="editStoreSave">确认</Button>
			</div>
		</Modal>
	</Card>
</template>
<script>
	export default {
		data() {
			return {
				formSearch: {},
				formSearchRules: {},
				listColumns: [{
						type: "selection",
						width: 60,
						align: "center"
					},
					{
						title: "姓名",
						minWidth: 100,
						key: "name",
						render: (h, params) => {
							let message = params.row.isAllPerm && params.row.isAllPerm == true ? "主账号" : params.row.name;
							return h("div", {}, message);
						}
					},
					{
						title: "电话",
						key: "phone",
						minWidth: 120
					},
					{
						title: "角色权限",
						minWidth: 100,
						key: "roles",
						render: (h, params) => {
							let message = params.row.isAllPerm && params.row.isAllPerm == true ? "全部" : params.row.roles;
							return h("div", {}, message);
						}
					},
					{
						title: "角色",
						minWidth: 100,
						key: "roleNames",
						render: (h, params) => {
							let message = params.row.isAllPerm && params.row.isAllPerm == true ? "全部" : params.row.roleNames;
							return h("div", {}, message);
						}
					},
					{
						title: "职能范围",
						minWidth: 90,
						key: "funScope",
						render: (h, params) => {
							let str = params.row.isAllPerm && params.row.isAllPerm == true ? "3" : params.row.funScope;
							let message = "";
							switch (str) {
								case "0":
									message = "部分";
									break;
								case "1":
									message = "单店";
									break;
								case "2":
									message = "全店";
									break;
								case "3":
									message = "全部";
									break;
								default:
									break;
							}
							return h("div", {}, message);
						}
					},
					{
						title: "负责房源",
						minWidth: 110,
						render: (h, params) => {
							let str = params.row.isAllPerm && params.row.isAllPerm == true ? "3" : params.row.funScope;
							let message = "";
							switch (str) {
								case "0":
									message = "单店管理职能";
									break;
								case "1":
									message = "全店管理职能";
									break;
								case "2":
									message = "全店管理职能";
									break;
								case "3":
									message = "全部";
									break;
								default:
									break;
							}
							return h("div", {}, message);
						}
					},
					{
						title: "开通时间",
						key: "createTime",
						minWidth: 100
					},
					{
						title: "账号状态",
						key: "status",
						minWidth: 100,
						render: (h, params) => {
							let message = "";
							let flag = params.row.status;
							if (flag != "" && flag != null) {
								message = flag == "0" ? "禁用" : "有效"
							}
							return h("div", {}, message);
						}
					},
					{
						title: "操作",
						width: 185,
						fixed: 'right',
						render: (h, params) => {
							let message = params.row.status == "0" ? "启用账号" : "禁用账号";
							let vm = this;
							let data = {
								name: params.row.name,
								phone: params.row.phone,
								funScope: params.row.funScope,
								storeId: this.storeId,
								id: params.row.id,
								roleIds: params.row.roleIds
							};
							if (params.row.isAllPerm && params.row.isAllPerm == true) {
								return [
									h(
										"Button", {},
										"暂无"
									)
								];
							} else {
								return [
									h(
										"Button", {
											on: {
												click: () => {
													this.$router.push({
														path: '/staffManage/edit/' + vm.storeId + '/' + JSON.stringify(data)
													});
												}
											}
										},
										"修改信息"
									),
									h("Dropdown",{
										props:{
											transfer:true
										}
									}, [
										h(
											"Button", {
												attrs: {
													type: "primary"
												},
												style: {
													marginLeft: "10px"
												}
											},
											"更多"
										),
										h(
											"DropdownMenu", {
												slot: "list"
											},
											[
												h(
													"DropdownItem", {
														nativeOn: {
															click: name => {
																this.opeations(params.row, "修改店面");
															}
														}
													},
													"修改店面"
												),
												h(
													"DropdownItem", {
														nativeOn: {
															click: name => {
																this.opeations(params.row.id, "重置密码");
															}
														}
													},
													"重置密码"
												),
												h(
													"DropdownItem", {
														nativeOn: {
															click: name => {
																this.opeations(
																	params.row.id,
																	"账号",
																	params.row.status
																);
															}
														}
													},
													message
												),
												h(
													"DropdownItem", {
														nativeOn: {
															click: name => {
																this.opeations(params.row.id, "注销");
															}
														}
													},
													"注销"
												)
											]
										)
									])
								];
							}

						}
					}
				],
				listDatas: [],
				setBranch: false,
				setClerk: false,
				storeLists: [],
				highLighIndex: 0,
				totalRows: 0,
				pageSize: 10,
				pageNo: 1,
				storeId: "",
				sectionLists: [],
				modalStaffName: "",
				modalStoreIds: [],
				modalIsRemove: false,
				treeDatas: [],
				rolesLists: [],
				editStore: false,
				editStoreType: 0,
				editStoreName: [],
				editInfo: {},
				roleIndexs: [],
				modalIds: [],
				companyId: ""
			};
		},
		mounted() {
			//店铺列表
			this.getStore();
			//权限树
			this.getTree();
		},
		methods: {
			getTree() {
				this.$ajax.get(this, this.$api.GET_ALL_ROLE + "?isTree=true", {}, res => {
					this.treeDatas = res.data.content != null ? res.data.content : [];
					if (this.treeDatas.length == 0) {
						return;
					}
					this.treeDatas.forEach(ele => {
						ele.title = ele.permName;
						ele.expand = true;
						this.$set(ele, "disabled", true);
						if (ele.childList.length > 0) {
							ele.childList.forEach(item => {
								item.title = item.permName;
								this.$set(item, "disabled", true);
							})
						}
					})
				});
			},
			getRolesInfo(index, name, id) {
				let str = this.modalIds.join(",");
				if (str.indexOf(id) != -1) {
					this.modalIds.forEach((item, index) => {
						this.$forceUpdate();
						if (item == id) {
							this.modalIds.splice(index, 1);
							this.roleIndexs.splice(index, 1);
						}
					})
				} else {
					this.roleIndexs.push(index);
					this.modalIds.push(id);
				}
				if (this.modalIds.length == 0) {
					this.treeDatas.forEach(ele => {
						this.$set(ele, "checked", false);
						ele.childList.forEach(item => {
							this.$set(item, "checked", false);
						})
					})
					return;
				}
				this.$ajax.get(
					this,
					this.$api.GET_CHARACTER_DETAIL.replace("{id}", this.modalIds.join(',')), {},
					res => {
						let ids = [];
						let datas = res.data.content != null ? res.data.content : [];
						let transDatas = JSON.parse(JSON.stringify(this.treeDatas));
						if (datas.length > 0) {
							datas.forEach(item => {
								ids.push(item.id);
							})
							transDatas.forEach(ele => {
								this.$set(ele, "checked", false);
								if (ids.indexOf(ele.id) != -1) {
									this.$set(ele, "checked", true);
								} else {
									this.$set(ele, "checked", false);
								}
								ele.childList.forEach(item => {
									this.$set(item, "checked", false);
									if (ids.indexOf(item.id) != -1) {
										this.$set(item, "checked", true);
									} else {
										this.$set(item, "checked", false);
									}
								})
							})
						} else {
							transDatas.forEach(ele => {
								this.$set(ele, "checked", false);
								ele.childList.forEach(item => {
									this.$set(item, "checked", false);
								})
							})

						}
						this.treeDatas = JSON.parse(JSON.stringify(transDatas));
					}
				);

			},
			getStore() {
				this.$ajax.get(this, this.$api.GET_USER_STORE_HAO, {}, res => {
					this.storeLists = res.data.content != null ? res.data.content : [];
					if (this.storeLists.length > 0) {
						this.storeId = this.storeLists[0].id;
						this.companyId = this.storeLists[0].corporationId;
						this.getStaffInfo();
						this.getRolesLists();
					}
				});
			},
			//角色列表
			getRolesLists() {
				this.$ajax.get(
					this,
					this.$api.GET_ALL_CHARACTER_LISTS.replace("{storeId}", this.companyId), {},
					res => {
						this.rolesLists = res.data.content != null ? res.data.content : [];
					}
				);
			},
			getStaffInfo() {
				let str = "";
				for (let i in this.formSearch) {
					if (this.formSearch[i] == "") {
						delete this.formSearch[i];
					} else {
						str += "&" + i + "=" + this.formSearch[i];
					}
				}
				this.$ajax.get(
					this,
					this.$api.GET_CLERK_LISTS.replace("{id}", this.storeId) +
					"?pageSize=" +
					this.pageSize +
					"&pageNo=" +
					this.pageNo +
					str, {},
					res => {
						this.listDatas = res.data.content != null ? res.data.content : [];
						this.totalRows = res.data.totalRows;
					}
				);
			},
			changeStore(query) {
				this.highLighIndex = query;
				this.storeId = this.storeLists[query].id;
				this.getStaffInfo();
				this.getRolesLists();
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
			tableSelect(selection) {
				this.sectionLists = selection;
			},
			setStoreFun(query, data) {
				if (!data) {
					if (this.sectionLists.length == 0) {
						this.$Message.error("请先勾选员工数据!");
					} else {
						if (query == "store") {
							this.setBranch = true;
						} else {
							this.setClerk = true;
						}
					}
				} else {
					if (query == "store") {
						this.setBranch = true;
						this.sectionLists = [data];
					} else {
						this.setClerk = true;
						this.sectionLists = [data];
					}
				}
			},
			setBranchCancel() {
				this.setBranch = false;
			},
			setClerkCancel() {
				this.setClerk = false;
			},
			//保存设置分店
			setBranchSave() {
				let staffIds = "";
				let staArray = [];
				this.sectionLists.forEach(ele => {
					staArray.push(ele.id);
				});
				if (this.modalStoreIds.length == 0) {
					this.$Message.error("选择店铺后移动！");
					return;
				}
				staffIds = staArray.join(",");
				let storeIds = this.modalStoreIds.join(",");
				let isRemove = this.modalIsRemove;
				this.$ajax.put(
					this,
					this.$api.PUT_COPY_STAFF_TO_STORE.replace("{staffIds}", staffIds)
					.replace("{storeIds}", storeIds)
					.replace("{isRemove}", isRemove)
					.replace("{presentStore}", this.storeId), {},
					res => {
						this.$Message.success("操作成功");
						this.setBranch = false;
						this.modalStoreIds = [];
						this.getStaffInfo();
					}
				);
			},
			//批量更改角色
			massChangeRoles() {
				let data = [];
				let staffs = [];
				this.sectionLists.forEach(ele => {
					staffs.push(ele.id);
				});
				this.$ajax.put(this, this.$api.PUT_CHARACTER_TO_STAFF.replace("{staffIds}", staffs.join(",")).replace("{roleIds}",
					this.modalIds), {}, res => {
					this.$Message.success("新增成功！");
					this.setClerk = false;
					this.modalIds = [];
					this.getStaffInfo();
				});
			},
			editStoreCancel() {
				this.editStore = false;
			},
			editStoreSave() {
				let url = "";
				let editStoreName = "";
				if (this.editStoreName.length > 1) {
					editStoreName = this.editStoreName.join(",");
				} else {
					if (this.editStoreName.length == 1) {
						editStoreName = this.editStoreName[0];
					}
				}
				let staffIds = this.editInfo.id;
				if (this.editStoreType == 0) {
					url = this.$api.PUT_COPY_STAFF_TO_STORE.replace("{staffIds}", staffIds)
						.replace("{storeIds}", editStoreName)
						.replace("{isRemove}", true)
						.replace("{presentStore}", this.storeId);
				} else if (this.editStoreType == 1) {
					url = this.$api.PUT_COPY_STAFF_TO_STORE.replace("{staffIds}", staffIds)
						.replace("{storeIds}", editStoreName)
						.replace("{isRemove}", false)
						.replace("{presentStore}", this.storeId);
				} else {
					url = this.$api.PUT_DELETE_STORE_PERSENT.replace(
						"{staffIds}",
						staffIds
					).replace("{storeId}", this.storeId);
				}
				this.$ajax.put(this, url, {}, res => {
					this.editStore = false;
					this.$Message.error("操作成功！");
					this.getStaffInfo();
				});
			},
			deleteSectionLists(query) {
				this.sectionLists.forEach((ele, index) => {
					if (ele.id == query) {
						this.sectionLists.splice(index, 1);
					}
				});
			},
			opeations(query, sign, status) {
				if (sign == "修改店面") {
					this.editStore = true;
					this.editInfo = query;
				} else if (sign == "重置密码") {
					this.$Modal.confirm({
						title: "提示",
						content: "确定重置密码吗？重置员工密码后，系统将会把新密码发送短信至他的手机号，员工收到密码后登录系统即可使用。",
						okText: "确定",
						cancelText: "取消",
						onOk: () => {
							this.$ajax.put(this, this.$api.PUT_RESET_STAFF_PASSWORD.replace("{userId}", query), {}, res => {
								this.$Message.success("重置密码成功！");
							});
						}
					});
				} else if (sign == "账号") {
					if (status == 0) {
						this.$Modal.confirm({
							title: "提示",
							content: "员工账号将被重新启用，可对他进行角色设置。",
							okText: "确定",
							cancelText: "取消",
							onOk: () => {
								this.$ajax.put(this, this.$api.PUT_OPEN_STAFF.replace("{staffIds}", query), {}, res => {
									this.$Message.success("启用账号成功！");
									this.getStaffInfo();
								});
							}
						})
					} else {
						this.$Modal.confirm({
							title: "提示",
							content: "禁用后员工账号将被冻结，他将无法登录系统。</br>员工在此分店负责房源，禁用后不会影响房源的归属，可手动修改负责人。",
							okText: "确定",
							cancelText: "取消",
							onOk: () => {
								this.$ajax.put(
									this,
									this.$api.PUT_CLOSE_STAFF.replace("{staffIds}", query), {},
									res => {
										this.$Message.success("禁用账号成功！");
										this.getStaffInfo();
									}
								);
							}
						});
					}
				} else if (sign == "注销") {
					this.$Modal.confirm({
						title: "提示",
						content: "此员工离职，账号将被注销，历史操作会保留在操作记录中。",
						okText: "确定",
						cancelText: "取消",
						onOk: () => {
							this.$ajax.put(
								this,
								this.$api.PUT_DEL_STAFF.replace("{staffIds}", query), {},
								res => {
									this.$Message.success("注销账号成功！");
								}
							);
						}
					});
				}
			}
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

	.frame,
	.characterLists,
	.storeLists {
		width: 200px;
		height: 350px;
		border: 1px solid #e8eaec;
		padding: 10px;
		overflow-y: auto;
	}

	.selectItem,
	.characterLists,
	.characterTitle,
	.storeLists {
		margin-bottom: 10px;

	}

	.storeLists {
		height: 150px;
		width: 350px;

	}

	.childAccount {
		width: 250px;
		height: 340px;
	}

	.characterItems {
		padding: 6px 10px;
		display: inline-block;
		border-radius: 5px;
		background: #8492a6;
		color: white;
		margin: 0 5px 10px 0;
	}

	.example {
		background: #eee;
		color: black;
	}

	.activeRole {
		background: #2d8cf0;
	}

	.editStoreNameLists {
		margin-top: 20px;
		height: 150px;
		padding: 10px 30px;
		background-color: #f5f5f5;
		border: 1px solid #e0dfdf;
		border-radius: 10px;
	}
</style>
