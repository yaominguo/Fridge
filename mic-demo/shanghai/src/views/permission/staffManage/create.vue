<template>
	<Card dis-hover :bordered="false" class="staffCreate">
		<p slot="title">
			新建员工账号
		</p>
		<Form :model="formSearch" :label-width="80" ref="formSearch" :rules="formSearchRules">
			<Row>
				<Col span="8">
				<FormItem label="姓名" prop="name">
					<Input v-model="formSearch.name" placeholder="姓名"></Input>
				</FormItem>
				</Col>
				<Col span="8">
				<FormItem label="电话" prop="phone">
					<Input v-model="formSearch.phone" placeholder="电话"></Input>
				</FormItem>
				</Col>
				<Col span="8">
				<FormItem>
					<Checkbox v-model="formSearch.isCorporationUser" @on-change="checkChange">是否是管理层</Checkbox>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="16">
				<FormItem label="所属店面" prop="storeId">
					<Select v-model="formSearch.storeId" filterable multiple :disabled="$route.params.data?true:false" clearable>
						<Option v-for="(item,index) in storeLists" :key="index" :value="item.id">{{item.storeName}}</Option>
					</Select>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="24">
				<FormItem label="选择员工的职能范围" :label-width="150">
					<Row class="contract-wrapper" :gutter="20" type="flex" justify="start">
						<Col span="12" v-if="formSearch.funScope != 2">
						<div :class="formSearch.funScope == 0 ? 'contract-box on': 'contract-box'" @click="formSearch.funScope=0">
							<div class="leftIcon">
								<div class="square"></div>
							</div>
							<div class="right">
								<Icon type="ios-checkmark" class="check-icon" />
								<h2>单店管理职能</h2>
								<p>为员工选择此职能，他即拥有单独管理总店所有房源相应业务的权限；（具体功能可据实际情况配置下方的角色）</p>
							</div>
						</div>
						</Col>
						<Col span="12" v-if="formSearch.funScope != 2">
						<div :class="formSearch.funScope == 1 ? 'contract-box on': 'contract-box'" @click="formSearch.funScope=1">
							<div class="leftIcon">
								<img src="../../../assets/images/func.png" alt="">
							</div>
							<div class="right">
								<Icon type="ios-checkmark" class="check-icon" />
								<h2>部分房源负责职能</h2>
								<p>为员工选择此职能，他即拥有单独管理分配给自己的房源相应业务的权限；（选择此职能后必须给账号分配房源，同时相同职能的员工相互无法看到对方的房源）</p>
							</div>
						</div>
						</Col>
						<Col span="12" v-if="formSearch.funScope == 2">
						<div :class="formSearch.funScope == 2 ? 'contract-box on': 'contract-box'" @click="formSearch.funScope=2">
							<div class="left">
								<img src="../../../assets/images/funAll.png" alt="">
							</div>
							<div class="right">
								<Icon type="ios-checkmark" class="check-icon" />
								<h2>全店管理职能</h2>
								<p>为员工选择此职能，他即拥有单独管理公司所有房源相应业务的权限；（选择此职能后必须给账号分配房源，同时相同职能的员工相互无法看到对方的房源）</p>
							</div>
						</div>
						</Col>
					</Row>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="24">
				<FormItem label="选择员工角色权限" :label-width="150">
					<Row type="flex" justify="start">
						<Col span="3">
						<Button type="primary" @click="addPosition">+ 添加职位</Button>
						</Col>
						<Col span="19">
						<span class="characterItems" v-for="(item,index) in rolesLists" :key="index" :class="{activeRole:roleIndex==index}"
						 @click="getRolesInfo(index,item.roleName,item.id)">{{item.roleName}}</span>
						<span class="characterItems example">示例：分店长</span>
						</Col>
						<Col span="2">
						<Button type="primary" @click="editPosition=true">编辑职位</Button>
						</Col>
					</Row>
				</FormItem>
				</Col>

			</Row>
			<Row>
				<Col offset="3">
				<div class="characterLists">
					<Row type="flex" justify="space-between">
						<Col><Button type="default" @click="checkAll" style="margin-right:10px">全选</Button><Button type="default" @click="checkNone">清空</Button></Col>
						<Col><Button type="primary" @click="editPermIds">保存勾选</Button></Col>
					</Row>
					<Tree :data="treeDatas" :multiple="true" :show-checkbox="true" @on-check-change="checkItem" :children-key="'childList'"></Tree>
				</div>
				</Col>
			</Row>
			<Row style="margin-top:10px" type="flex" justify="center">
				<Col>
				<Button type="primary" @click="savaStaff('formSearch')">保存提交</Button>
				</Col>
			</Row>
		</Form>
		<!--添加职位 -->
		<Modal v-model="showAddPosition" title="添加职位">
			<Row style="margin-bottom:10px">请输入职位名称（10字以内）</Row>
			<Row style="margin-bottom:10px"><Input v-model="modalPosition" placeholder="职位名称"></Input></Row>
			<div slot="footer">
				<Button type="default" @click="cancelAddPosition">取消</Button>
				<Button type="primary" @click="confirmAddPosition">确认</Button>
			</div>
		</Modal>
		<!-- 编辑职位 -->
		<Modal v-model="editPosition" title="编辑职位">
			<div class="dataContainer">
				<Form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: 300px">
					<FormItem v-for="(item, index) in formDynamic.items" :key="index" :label="'名称 ' + (index+1)">
						<Row>
							<Col span="18">
							<Input type="text" v-model="item.roleName" placeholder="职位"></Input>
							</Col>
							<Col span="4" offset="1">
							<Button @click="handleRemove(item,index)" type="error">删除</Button>
							</Col>
						</Row>
					</FormItem>
					<FormItem>
						<Row>
							<Col span="12">
							<Button type="dashed" long @click="handleAdd" icon="md-add" v-show="formDynamic.items.length<=9">添加职位</Button>
							</Col>
						</Row>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="primary" @click="handleSubmit('formDynamic')">确认</Button>
				<Button @click="handleReset('formDynamic')" style="margin-left: 8px">取消</Button>
			</div>
			</div>
		</Modal>
	</Card>
</template>

<script>
	export default {
		data() {
			const checkStore = (rule, value, callback) => {
				if (value.length == 0) {
					callback(new Error("请选择所属分店"));
				} else {
					callback();
				}
			};
			const checkPhone = (rule, value, callback) => {
				if (!value || !this.$com.checkPhone(value)) {
					callback(new Error('请输入11位手机号，用于登录及接收业务短信'));
				} else {
					this.$ajax.get(this, this.$api.GET_STAFF_ISEXIST + "?phone=" + value, {}, res => {
						if (res.data.content == true) {
							callback(new Error('该手机号已存在！'));
						} else {
							callback();
						}
					});
				}
			};
			return {
				formSearch: {
					funScope: 0,
					roles: [],
					permIds: [],
					name: "",
					phone: "",
					storeId: []
				},
				formSearchRules: {
					name: [{
						required: true,
						message: "请输入账号使用者姓名，用于管理及操作日志追踪",
						trigger: "blur"
					}],
					phone: [{
						required: true,
						validator: checkPhone,
						trigger: "blur"
					}],
					storeId: [{
						required: true,
						validator: checkStore,
						trigger: "blur"
					}]
				},
				storeLists: [],
				rolesLists: [],
				showAddPosition: false,
				editPosition: false,
				modalPosition: "",
				storeId: "",
				roleIndex: -1,
				treeDatas: [],
				formDynamic: {
					items: [{

					}]
				},
				modalId: "",
				deletePositionIds: [],
				companyId: ""
			};
		},
		props: {
			isFromProjectAdd: {
				type: Boolean,
				default: false,
			}
		},
		mounted() {
			this.storeId = this.$route.params.id;
			this.getStoreLists();
			this.getTree();
			if (this.$route.params.data) {
				this.formSearch = this.$route.params.data ? JSON.parse(this.$route.params.data) : {
					funScope: 0
				};
				this.formSearch.isCorporationUser = this.formSearch.funScope == 2 ? true : false;
				this.formSearch.storeId = this.formSearch.storeId.length > 1 ? this.formSearch.storeId.split(",") : [this.formSearch
					.storeId
				];
			}
		},
		methods: {
			getStoreLists() {
				this.$ajax.get(this, this.$api.GET_USER_STORE_HAO, {}, res => {
					this.storeLists = res.data.content;
					this.companyId = this.storeLists[0].corporationId;
					this.getRolesLists();
				});
			},
			getRolesLists() {
				this.$ajax.get(
					this,
					this.$api.GET_ALL_CHARACTER_LISTS.replace("{storeId}", this.companyId), {},
					res => {
						this.rolesLists = res.data.content;
						this.formDynamic.items = JSON.parse(JSON.stringify(res.data.content));
					}
				);
			},
			checkItem(selectedArr, selectedItem) {
				this.formSearch.permIds = [];
				selectedArr.forEach(ele => {
					this.formSearch.permIds.push(ele.id);
				})
			},
			getTree() {
				this.$ajax.get(this, this.$api.GET_ALL_ROLE + "?isTree=true", {}, res => {
					this.treeDatas = res.data.content;
					this.treeDatas.forEach(ele => {
						ele.title = ele.permName;
						if (ele.childList.length > 0) {
							ele.childList.forEach(item => {
								item.title = item.permName;
							})
						}
					})
					if (this.$route.params.data) {
						// this.getRolesInfo(null, null, this.formSearch.roleIds.substr(0, this.formSearch.roleIds.length - 1));
					}
				});
			},
			cancelAddPosition() {
				this.showAddPosition = false;
			},
			addPosition() {
				if (this.rolesLists.length >= 10) {
					this.$Message.error("最多添加10个职位！");
				} else {
					this.showAddPosition = true;
				}
			},
			confirmAddPosition() {
				if (this.modalPosition != "") {
					let data = {};
					data.roleName = this.modalPosition;
					data.orgId = this.companyId;
					this.$ajax.post(
						this,
						this.$api.POST_ADD_CHARACTER, data,
						res => {
							if (res.code == "200") {
								this.showAddPosition = false;
								this.getRolesLists();
							} else {
								this.$Message.error(res.msg);
							}
						}
					);
				} else {
					this.$Message.error("填写职位名称")
				}
			},
			checkAll() {
				this.treeDatas.forEach(ele => {
					this.$set(ele, "checked", true);
					ele.childList.forEach(item => {
						this.$set(item, "checked", true);
					})
				})
			},
			checkNone() {
				this.treeDatas.forEach(ele => {
					this.$set(ele, "checked", false);
					ele.childList.forEach(item => {
						this.$set(item, "checked", false);
					})
				})
			},
			editPermIds() {
				if (this.modalId != "") {
					let data = {};
					data.roleName = this.modalPosition;
					data.orgId = this.modalId;
					if (this.formSearch.permIds == undefined) {
						this.$Message.error("先勾选权限在保存")
						return;
					}
					data.newPerms = this.formSearch.permIds.length > 1 ? this.formSearch.permIds.join(",") : this.formSearch.permIds[0];
					this.$ajax.put(
						this,
						this.$api.PUT_CHARACTER.replace("{id}", this.modalId), data,
						res => {
							if (res.code == "200") {
								this.$Message.success("保存成功");
								this.showAddPosition = false;
								this.getRolesLists();
							} else {
								this.$Message.error(res.msg);
							}
						}
					);
				} else {
					this.$Message.error("请选择职位!")
				}
			},
			savaStaff(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						let data = this.formSearch;
						if (this.$route.params.data) {
							data.storeId = this.storeId;
							return;
							this.$ajax.put(
								this,
								this.$api.POST_ADD_STAFF, data,
								res => {
									if (this.isFromProjectAdd) { // 如果是在项目管理中弹窗打开此页面的话
										this.$emit('submitSuccess');
										return;
									}
									if (res.code == "200") {
										this.showAddPosition = false;
										this.$Message.success("修改成功！");
										this.$router.push({
											path: "/staffManage/list"
										})
									} else {
										this.$Message.error(res.msg);
									}
								}
							);
						} else {
							data.storeId = data.storeId.length > 0 ? data.storeId.join(",") : "";
							this.$ajax.post(
								this,
								this.$api.POST_ADD_STAFF, data,
								res => {
									if (this.isFromProjectAdd) { 
										this.$emit('submitSuccess');
										return;
									}
									if (res.code == "200") {
										this.showAddPosition = false;
										this.$Message.success("新增成功！");
										this.$router.push({
											path: "/staffManage/list"
										})
									} else {
										this.$Message.error(res.msg);
									}
								}
							);
						}
					}
				})
			},
			getRolesInfo(index, name, id) {
				this.roleIndex = index;
				this.modalPosition = name;
				this.modalId = id;
				this.formSearch.roles = [id];
				this.$ajax.get(
					this,
					this.$api.GET_CHARACTER_DETAIL.replace("{id}", id), {},
					res => {
						let ids = [];
						let datas = res.data.content;
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
			handleSubmit(name) {
				let array = [];
				this.formDynamic.items.forEach(ele => {
					array.push({
						roleName: ele.roleName,
						id: ele.id ? ele.id : "",
						storeId: this.companyId
					})
				})
				let flag = true;
				array.forEach(ele => {
					if (ele.roleName != '' && ele.roleName != undefined && ele.roleName) {
						flag = true;
					} else {
						flag = false;
					}
				})
				if (flag == true) {
					this.$ajax.put(
						this,
						this.$api.PUT_MASS_CHARACTER, array,
						res => {
							if (res.code == "200") {
								this.editPosition = false;
								this.getRolesLists();
							} else {
								this.$Message.error(res.msg);
							}
						}
					);
				} else {
					this.$Message.error("职位名称不能为空");
				}
			},
			handleReset(name) {
				this.editPosition = false;
				this.$refs[name].resetFields();
			},
			handleAdd() {
				this.index++;
				this.$forceUpdate();
				this.formDynamic.items.push({
					value: '',
					index: this.index,
					status: 1
				});
			},
			handleRemove(query, index) {
				this.$ajax.delete(
					this,
					this.$api.DELETE_CHARACTER.replace("{id}", query.id), {},
					res => {
						if (res.code == "200") {
							this.$Message.success("删除成功！");
							this.getRolesLists();
						} else {
							this.$Message.error(res.msg);
						}
					}
				);
			},
			checkChange() {
				this.formSearch.isCorporationUser == true ? this.formSearch.funScope = '2' : this.formSearch.funScope = '0';
			}
		}
	};
</script>

<style scoped>
	.staffCreate {
		padding: 5px 0 10px 10px;
	}

	.contract-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.contract-box {
		height: 130px;
		margin: 0 0 16px;
		border: 2px solid #efefef;
		position: relative;
		padding: 16px;
		cursor: pointer;
		overflow: hidden;
	}

	.leftIcon {
		width: 50px;
		float: left;
		height: 100%;
		padding-top: 25px;
	}
	.contract-box p {
		height: 60px;
		line-height: 21px;
	}
	.contract-box.on {
		border: 2px solid #2d8cf0;

	}
	.contract-box .check-icon {
		position: absolute;
		top: 0;
		right: 0;
		font-size: 30px;
		color: #fff;
		z-index: 1;
		display: none;
	}

	.contract-box .check-icon::after {
		content: '';
		display: block;
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		right: 0;
		border: 25px solid transparent;
		border-top-color: #2d8cf0;
		border-right-color: #2d8cf0;
		z-index: -1;
	}

	.contract-box.on .check-icon {
		display: block;
	}

	.btn-box {
		margin: 16px 0;
		text-align: center;
	}

	.square {
		width: 36px;
		height: 36px;
		border-radius: 5px;
		background-color: #507bea;
	}

	.characterLists {
		width: 100%;
		height: 100%;
		border: 1px solid #e8eaec;
		padding: 10px;
		border-radius: 5px;
	}

	.characterItems {
		padding: 9px 10px;
		border-radius: 5px;
		background: #8492a6;
		color: white;
		margin-right: 5px;
	}

	.characterItems:hover {
		cursor: pointer;
	}

	.example {
		background: #eee;
		color: black;
	}

	.activeRole {
		background: #2d8cf0;
	}
</style>
<style>
	.staffCreate .ivu-tree {
		overflow: hidden !important;
	}

	.staffCreate .ivu-tree ul {
		width: 200px !important;
		float: left !important;
	}

	.dataContainer {
		height: 400px;
		overflow: auto;
	}
</style>
