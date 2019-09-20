<template>
	<div>
		<Form class="commuity-Form" ref="commuityForm" :model="commuityForm" :rules="commuityRule">
			<!-- 小区 -->
			<Row type="flex" justify="start" :gutter="10">
				<Col span="10">
				<FormItem label="公寓名称" prop="villageId" :label-width="100">
					<Select @on-change="communityChange" :disabled="showCurrent==1" v-model="commuityForm.villageId" filterable
					 placeholder="请输入小区名" label-in-value>
						<Option v-for="(item,index) in communityList" :value="item.id" :key="index">{{ item.name }}</Option>
					</Select>
				</FormItem>
				</Col>
				<Col>
				<Button type="primary" @click="addCommuity">添加小区</Button>
				</Col>
			</Row>
			<Divider />
		</Form>
		<!-- 新增小区模态框 -->
		<addCommunityModal @handleCancle="cancle" :leaseType="1" @handleOk="addCompelete" :showModal="addCommuityModal"></addCommunityModal>
		<div v-if="showCurrent == 0" class="list">
			<div class="tableContainer addDetail">
				<div class="allGain">
					<div class="tips">点击
						<Icon type="md-settings" color="#2d8cf0"></Icon>"可批量修改
					</div>
					<div class="formList">
						<Row class-name="header" type="flex" justify="space-between" :gutter="8">
							<Col span="4">
							<Input type="text" style="width:30px;" v-model="houseCount"></Input>
							<span>套</span>
							<Icon type="md-add-circle" size="18" color="#2d8cf0" @click="handleAddHouse(houseCount)"></Icon>
							<span style="font-size:12px">
								(已录入
								<span style="color:red">{{advList.length}}</span>套)
							</span>
							</Col>
							<Col span="2">
							<span class="required">*</span>
							广告位编号
							</Col>
							<Col span="3">
							<span class="required">*</span>
							<span>面积（m²）</span>
							<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('space','面积')"></Icon>
							</Col>
							<Col span="3">
							<span class="required">*</span>
							<span>长宽高（cm）</span>
							<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('billboardLength','长宽高')"></Icon>
							</Col>
							<Col span="2">
							<span class="required">*</span>
							<span>广告牌类型</span>
							<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('billboardType','广告牌类型')"></Icon>
							</Col>
							<Col span="2">
							<span class="required">*</span>
							<span>广告牌形式</span>
							<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('billboardForm','广告牌形式')"></Icon>
							</Col>
							<Col span="2">
							<span>楼栋</span>
							<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('storiedBuildingId','楼栋')"></Icon>
							</Col>
							<Col span="2">
							<span>楼层</span>
							</Col>
							<Col span="2">
							<span class="required">*</span>
							<span>用途</span>
							<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('assetUse','用途')"></Icon>
							</Col>
							<Col span="2">
							<span>出资人</span>
							<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('contributor','出资人')"></Icon>
							</Col>
						</Row>
						<Row>
							<Col>
							<Form v-for="(item, index) in advList" :key="index" ref="formDynamic" :model="item" :rules="formDynamicRules">
								<Row type="flex" justify="space-between" align="middle" :gutter="8" class-name="formData">
									<Col span="4">
									<FormItem>
										<Icon type="ios-trash" @click="handleRemove(index)" color="#2d8cf0" size="23" />
									</FormItem>
									</Col>
									<Col span="2">
									<FormItem prop="advertNumber">
										<Input type="text" v-model="item.advertNumber" placeholder="广告位编号"></Input>
									</FormItem>
									</Col>
									<Col span="3">
									<Row :gutter="8">
										<Col span="12">
										<FormItem prop="predictedArea">
											<Input type="text" v-model="item.predictedArea" placeholder="预测"></Input>
										</FormItem>
										</Col>
										<Col span="12">
										<FormItem prop="usableArea">
											<Input type="text" v-model="item.usableArea" placeholder="实用"></Input>
										</FormItem>
										</Col>
									</Row>
									</Col>
									<Col span="3">
									<Row :gutter="8">
										<Col span="8">
										<FormItem prop="billboardLength">
											<Input type="text" v-model="item.billboardLength" placeholder="长"></Input>
										</FormItem>
										</Col>
										<Col span="8">
										<FormItem prop="billboardWide">
											<Input type="text" v-model="item.billboardWide" placeholder="宽"></Input>
										</FormItem>
										</Col>
										<Col span="8">
										<FormItem prop="billboardHigh">
											<Input type="text" v-model="item.billboardHigh" placeholder="高"></Input>
										</FormItem>
										</Col>
									</Row>
									</Col>
									<Col span="2">
									<FormItem prop="billboardType">
										<Select v-model="item.billboardType" placeholder="广告牌类型" transfer>
											<Option v-for="item in billboardTypeLists" :value="item.id" :key="item.id">{{ item.typeName }}</Option>
										</Select>
									</FormItem>
									</Col>
									<Col span="2">
									<FormItem prop="billboardForm">
										<Select v-model="item.billboardForm" placeholder="广告牌形式" transfer>
											<Option v-for="item in billboardFormLists" :value="item.id" :key="item.id">{{ item.typeName }}</Option>
										</Select>
									</FormItem>
									</Col>
									<Col span="2">
									<FormItem prop="storiedBuildingId">
										<Select v-model="item.storiedBuildingId" placeholder="楼栋 " transfer>
											<Option v-for="item in buildingLists" :value="item.id" :key="item.id">{{ item.buildingCode}}</Option>
										</Select>
									</FormItem>
									</Col>
									<Col span="2">
									<FormItem prop="floor">
										<Select v-model="item.floor" placeholder="楼层" transfer>
											<Option v-for="item in showFloor(item.storiedBuildingId)" :value="item" :key="item">{{item}}</Option>
										</Select>
									</FormItem>
									</Col>
									<Col span="2">
									<FormItem prop="assetUse">
										<Select v-model="item.assetUse" placeholder="用途" transfer>
											<Option v-for="(item,index) in assetUseLists" :value="item.value" :key="index">{{ item.name}}</Option>
										</Select>
									</FormItem>
									</Col>
									<Col span="2">
									<FormItem prop="contributor">
										<Select v-model="item.contributor" placeholder="出资人" transfer>
											<Option v-for="(item,index) in contributorList" :value="item.id" :key="index">{{ item.name}}</Option>
										</Select>
									</FormItem>
									</Col>
								</Row>
							</Form>
							</Col>
						</Row>
					</div>
				</div>
			</div>
			<Row type="flex" justify="center">
				<Col>
				<Button type="default" @click="returnListPage">上一步</Button>
				<Button type="primary" @click="handleSave">下一步</Button>
				</Col>
			</Row>
		</div>
		<div v-if="showCurrent == 1" class="listOther">
			<div class="tableContainer addDetail ">
				<div class="allGain">
					<div class="tips">点击
						<Icon type="md-settings" color="#2d8cf0"></Icon>"可批量修改
					</div>
					<div class="formList">
						<Row class-name="header" type="flex" justify="start" :gutter="8">
							<Col span="4">
							<div></div>
							</Col>
							<Col span="4">
							<span class="required">*</span>
							 广告位编号
							</Col>
							<Col span="3">
							<span class="required">*</span>
							<span>每平方米单价(元/㎡)</span>
							<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('unitRent','每平方米单价')"></Icon>
							</Col>

							<Col span="4">
							<span class="required">*</span>
							<span>付费方式</span>
							<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('methods','付费方式')"></Icon>
							</Col>
							<Col span="3">
							<span class="required">*</span>
							<span>月租金(元)</span>
							<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('rent','月租金')"></Icon>
							</Col>
							<Col span="3">
							<span class="required">*</span>
							<span>押金</span>
							<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('deposit','押金')"></Icon>
							</Col>
						</Row>
						<Row>
							<Col>
							<Form v-for="(item, index) in advList" :key="index" ref="formDynamicSeconds" :model="item" :rules="formDynamicSecondsRules">
								<Row type="flex" justify="start" align="middle" :gutter="8" class-name="formData gutter">
									<Col span="4">
									<FormItem>
										<Icon type="ios-trash" @click="handleRemove(index)" color="#2d8cf0" size="23" />
									</FormItem>
									</Col>
									<Col span="4">
									<FormItem prop="advertNumber">
										{{item.advertNumber}}
									</FormItem>
									</Col>
									<Col span="3">
									<FormItem prop="unitRent">
										<Input type="text" v-model="item.unitRent" placeholder=" 每平方米单价(元/㎡)"></Input>
									</FormItem>
									</Col>
									<Col span="4">
									<Row :gutter="8">
										<Col span="12">
										<FormItem :prop="'payNum'">
											<Select v-model="item.payNum" transfer clearable placeholder="付">
												<Option v-for="count in 12" :value="String(count)" :key="count">{{ count }}</Option>
											</Select>
										</FormItem>
										</Col>
										<Col span="12">
										<FormItem :prop="'custodyNum'">
											<Select v-model="item.custodyNum" clearable placeholder="押" transfer @on-change="rentChange(index)">
												<Option value="0">自定义</Option>
												<Option v-for="count in 12" :value="String(count)" :key="count">{{ count }}</Option>
											</Select>
										</FormItem>
										</Col>
									</Row>
									</Col>
									<Col span="3">
									<FormItem prop="rent">
										<Input type="text" v-model="item.rent" placeholder="月租金" @on-blur="rentChange(index)"></Input>
									</FormItem>
									</Col>
									<Col span="3">
									<FormItem prop="deposit">
										<Input type="text" v-model="item.deposit" :disabled="item.isDisabled" placeholder="押金"></Input>
									</FormItem>
									</Col>
								</Row>
							</Form>
							</Col>
						</Row>
					</div>
				</div>
			</div>
			<Row type="flex" justify="center">
				<Col>
				<Button type="default" @click="handleReturn">上一步</Button>
				<Button type="primary" @click="handleSubmit">提交</Button>
				</Col>
			</Row>
		</div>
		<!-- 批量modal -->
		<Modal title="设置" v-model="massEdit" @on-cancel="cancelMassEdit" :mask-closable="false">
			<Row type="flex" justify="center" align="middle" :gutter="8">
				<Col span="10">
				将列表中的
				<span class="warging-test">{{typeText}}</span>
				统一设置为：
				</Col>
				<Col span="14" v-if="modalType=='space'">
				<Row type="flex" justify="start" :gutter="8">
					<Col span="12"><Input v-model="unite.predictedArea" placeholder="预测面积"></Input></Col>
					<Col span="12"><Input v-model="unite.usableArea" placeholder="实用面积"></Input></Col>
				</Row>
				</Col>
				<Col span="14" v-if="modalType=='billboardLength'">
				<Row type="flex" justify="start" :gutter="8">
					<Col span="8"><Input v-model="unite.billboardLength" placeholder="长"></Input></Col>
					<Col span="8"><Input v-model="unite.billboardWide" placeholder="宽"></Input></Col>
					<Col span="8"><Input v-model="unite.billboardHigh" placeholder="高"></Input></Col>
				</Row>
				</Col>
				<Col span="14" v-if="modalType=='billboardType'">
				<Select v-model="unite.billboardType" placeholder="广告牌类型" transfer>
					<Option v-for="item in billboardTypeLists" :value="item.id" :key="item.id">{{ item.typeName }}</Option>
				</Select>
				</Col>
				<Col span="14" v-if="modalType=='billboardForm'">
				<Select v-model="unite.billboardForm" placeholder="广告牌形式" transfer>
					<Option v-for="item in billboardFormLists" :value="item.id" :key="item.id">{{ item.typeName }}</Option>
				</Select>
				</Col>
				<Col span="14" v-if="modalType=='storiedBuildingId'">
				<Select v-model="unite.storiedBuildingId" placeholder="楼栋 " transfer>
					<Option v-for="item in buildingLists" :value="item.id" :key="item.id">{{ item.buildingCode}}</Option>
				</Select>
				</Col>
				<Col span="14" v-if="modalType=='assetUse'">
				<Select v-model="unite.assetUse" placeholder="用途" transfer>
					<Option v-for="(item,index) in assetUseLists" :value="item.value" :key="index">{{ item.name}}</Option>
				</Select>
				</Col>
				<Col span="14" v-if="modalType=='unitRent'">
				<Input v-model="unite.unitRent" placeholder="每平方米单价((元/㎡)"></Input>
				</Col>
				<Col span="14" v-if="modalType=='methods'">
				<Row type="flex" justify="start" :gutter="8">
					<Col span="12">
					<Select v-model="unite.payNum" transfer clearable placeholder="付">
						<Option v-for="count in 12" :value="String(count)" :key="count">{{ count }}</Option>
					</Select>
					</Col>
					<Col span="12">
					<Select v-model="unite.custodyNum" clearable placeholder="押" transfer>
						<Option value="0">自定义</Option>
						<Option v-for="count in 12" :value="String(count)" :key="count">{{ count }}</Option>
					</Select>
					</Col>
				</Row>
				</Col>
				<Col span="14" v-if="modalType=='rent'">
				<Input v-model="unite.rent" placeholder="月租金(元) "></Input>
				</Col>
				<Col span="14" v-if="modalType=='deposit'">
				<Input v-model="unite.deposit" placeholder="押金"></Input>
				</Col>
			</Row>
			<div slot="footer">
				<Button type="primary" @click="cancelMassEdit" ghost>取消</Button>
				<Button type="primary" @click="saveEdit">保存</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import addCommunityModal from "../components/createCommunity.vue";
	export default {
		components: {
			addCommunityModal
		},
		props: ["current"],
		data() {
			const checkNumber = (rule, value, callback) => {
				if (value === undefined || value === "") {
					callback();
				} else {
					if (isNaN(value)) {
						callback(new Error("请输入数字"));
					} else {
						if (value <= 0) {
							callback(new Error("数字必须大于0"));
						} else {
							callback();
						}
					}
				}
			};
			const checkNum = (rule, value, callback) => {
				if (value === "" || value === undefined) {
					callback(new Error("广告牌编号"));
				} else {
					if (!/^[a-zA-Z0-9][\w-_（）()]{1,149}$/g.test(value)) {
						callback(new Error("只能输入数字字母-_（）()"));
					} else {
						callback();
					}
				}
			};
			return {
				// 小区
				communityList: [],
				addCommuityModal: false,
				commuityForm: {},
				commuityRule: {
					villageId: [{
						required: true,
						message: "请选择小区",
						trigger: "change"
					}]
				},
				buildingLists: [],
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
				houseCount: "1",
				advList: [{}],
				contributorList: [],
				formDynamicRules: {
					assetUse: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}],
					billboardType: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}],
					billboardForm: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}],
					advertNumber: [{
						required: true,
						trigger: "blur",
						validator: checkNum
					}],
					predictedArea: [{
							required: true,
							message: "预测面积",
							trigger: "blur"
						},
						{
							required: true,
							validator: checkNumber
						}
					],
					usableArea: [{
							required: true,
							message: "实用面积",
							trigger: "blur"
						},
						{
							required: true,
							validator: checkNumber
						}
					],
					billboardLength: [{
							required: true,
							message: "长",
							trigger: "blur"
						},
						{
							validator: checkNumber,
							trigger: "blur"
						}
					],
					billboardWide: [{
							required: true,
							message: "宽",
							trigger: "blur"
						},
						{
							validator: checkNumber,
							trigger: "blur"
						}
					],
					billboardHigh: [{
							required: true,
							message: "高",
							trigger: "blur"
						},
						{
							validator: checkNumber,
							trigger: "blur"
						}
					]
				},
				formDynamicSecondsRules: {
					payNum: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}],
					custodyNum: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}],
					deposit: [{
							required: true,
							message: "输入押金",
							trigger: "change"
						},
						{
							validator: checkNumber,
							trigger: "change"
						}
					],
					rent: [{
							required: true,
							message: "输入租金",
							trigger: "change"
						},
						{
							required: true,
							validator: checkNumber
						}
					],
					unitRent: [{
							required: true,
							message: "输入每平方米单价",
							trigger: "change"
						},
						{
							required: true,
							validator: checkNumber
						}
					]
				},
				massEdit: false,
				modalType: "",
				typeText: "",
				unite: {}
			};
		},
		methods: {
			communityChange() {
				this.commuityForm.villageName = arguments[0].label;
				this.commuityForm.villageId = arguments[0].value;
				this.getFloorLists();
			},
			getFloorLists() {
				this.$ajax.post(
					this,
					this.$api.SEARCH_FLOOR, {
						pageNo: 1,
						pageSize: 1000,
						communityId:this.commuityForm.villageId,
						delete: "0"
					},
					res => {
						this.buildingLists = res.data.content;
					}
				);
			},
			rentChange(index) {
				this.$forceUpdate();
				if (this.advList[index].custodyNum === "0") {
					this.advList[index].isDisabled = false;
					this.advList[index].deposit = "";
				} else {
					this.advList[index].isDisabled = true;
					if (
						this.advList[index].custodyNum != "" &&
						this.advList[index].rent != ""
					) {
						this.advList[index].deposit = String(
							Number(this.advList[index].custodyNum) *
							Number(this.advList[index].rent)
						);
					}
				}
			},
			handleRemove(query) {
				if (this.advList.length > 1) {
					this.advList.splice(query, index);
				} else {
					this.$Message.error("请至少保留一条数据！");
				}
			},
			handleAddHouse(index) {
				for (var i = 0; i < index; i++) {
					this.advList.push({});
				}
			},
			showFloor(query) {
				let count = "";
				this.buildingLists.forEach(ele => {
					if (query == ele.id) {
						count = Number(ele.floorCount);
					}
				});
				let array = [];
				for (var i = 1; i <= count; i++) {
					array.push(i);
				}
				return array;
			},
			//添加小区
			addCommuity() {
				this.addCommuityModal = true;
			},
			//弹框取消
			cancle() {
				this.addCommuityModal = false;
			},
			addCompelete() {
				this.addCommuityModal = false;
				this.getCommunity();
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
			handleSave() {
				let flag = true;
				this.$refs["commuityForm"].validate(valid => {
					if (!valid) {
						flag = false;
					}
				});
				this.$refs["formDynamic"].forEach(ele => {
					ele.validate(valid => {
						if (!valid) {
							flag = false;
						}
					});
				});
				if (flag) {
					this.$emit("show-next-step");
					this.advList.forEach(ele => {
						ele.isDisabled = true;
						ele.payNum = this.payNum;
						ele.custodyNum = this.custodyNum;
					});
				}
			},
			handleReturn() {
				this.$emit("return-step");
			},
			returnListPage() {
				this.$router.push({
					name: "asset/advertising"
				});
			},
			handleSubmit() {
				let flag = true;
				this.$refs["formDynamicSeconds"].forEach(ele => {
					ele.validate(valid => {
						if (!valid) {
							flag = false;
						}
					});
				});
				if (flag) {
					this.advList.forEach(ele => {
						ele.villageName = this.commuityForm.villageName;
						ele.villageId = this.commuityForm.villageId;
						this.buildingLists.forEach(item => {
							if (ele.storiedBuildingId == item.id) {
								ele.storiedBuilding = item.buildingCode;
							}
						});
						this.communityList.forEach(item => {
							if (ele.villageId == item.id) {
								ele.address = item.address;
							}
						});
						ele.billboardAddress = ele.address + '-'+ele.advertNumber;
					});
					this.$ajax.post(
						this,
						this.$api.POST_ADD_MASS_ADVERTISE,
						this.advList,
						res => {
							if (res.code == "200") {
								this.$Message.success("新增成功！");
								this.$router.push({
									name: "asset/advertising"
								});
							} else {
								this.$Message.error(res.msg);
							}
						}
					);
				}
			},
			mortgageNumChange() {},
			// 获取出资人
			getContributorList() {
				this.$ajax.get(this, this.$api.ASSET_INVESTOR, {}, res => {
					this.contributorList = res.data.content;
				});
			},
			cancelMassEdit() {
				this.massEdit = false;
				this.unite = {};
			},
			saveEdit() {
				//批量修改数据
				let message = "";
				let validText =
					this.showCurrent == "0" ? "formDynamic" : "formDynamicSeconds";
				switch (this.modalType) {
					case "space":
						message = "predictedArea-usableArea";
						break;
					case "billboardLength":
						message = "billboardLength-billboardWide-billboardHigh";
						break;
					case "methods":
						message = "payNum-custodyNum";
						break;
					default:
						message = this.modalType;
						break;
				}
				this.advList.forEach(ele => {
					if (message.indexOf("-") != -1) {
						let array = message.split("-");
						array.forEach(item => {
							ele[item] = this.unite[item];
							if (item == "custodyNum") {
								if (this.unite[item] == "0") {
									ele.isDisabled = false;
									ele.deposit = "";
								} else {
									ele.isDisabled = true;
									ele.deposit =
										ele.rent != "" ?
										String(Number(ele.custodyNum) * Number(ele.rent)) :
										"";
								}
							}
						});
					} else {
						if (message == "rent") {
							if (this.unite.rent == "") {
								ele.deposit = "";
							} else {
								ele.deposit =
									ele.custodyNum != "" ?
									String(Number(ele.custodyNum) * Number(ele.rent)) :
									"";
							}
						}
						ele[this.modalType] = this.unite[this.modalType];
					}
				});
				this.$refs[validText].forEach(ele => {
					if (message.indexOf("-") != -1) {
						let array = message.split("-");
						array.forEach(item => {
							ele.validateField(item);
						});
					} else {
						ele.validateField(this.modalType);
					}
				});
				this.massEdit = false;
			},
			showModal(modalItem, text) {
				this.typeText = text;
				this.massEdit = true;
				this.modalType = modalItem;
			},
			getRent() {
				this.$ajax.get(this, this.$api.RENT_RELATED, {}, res => {
					let data =
						res.data != null && res.data.content ? res.data.content : null;
					this.custodyNum = data.deposit != null ? data.deposit : "";
					this.payNum = data.rent != null ? data.rent : "";
				});
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
			}
		},
		mounted() {
			this.getCommunity();
			this.getContributorList(); //出资人
			this.getRent(); //默认付押收租日设置
			this.getAdvertiseType();
		},
		computed: {
			showCurrent() {
				return this.current;
			}
		}
	};
</script>
<style scoped>
	.formList .header {
		background: rgb(249, 248, 248);
		height: 50px;
		line-height: 50px;
		margin: 0 0 15px 0;
		border: 1px solid #e8eaec;
	}

	#form {
		width: 1189px;
	}

	.formData {
		height: 50px;
		line-height: 50px;
		background: white;
		margin-bottom: 15px;
		border: 1px solid #e8eaec;
		padding-top: 6px;
	}

	.header>div,
	.formData>div {
		text-align: center;
	}

	.gutter div {
		padding: 0 2px;
	}

	.formList .header .large,
	.formList .header .middle,
	.formList .header .small,
	.formList .header .supSmall {
		padding: 0px;
		margin: 0px;
	}

	.formList {
		width: 1180px;
		font-size: 12px;
		padding: 10px 0;
	}

	.tableContainer {
		overflow: auto;
	}

	.required {
		color: red;
	}

	.commuity-Form {
		padding: 20px 20px 0 20px;
	}

	.addDetail {
		padding: 10px 20px 0 20px;
	}

	.warging-test {
		color: red;
	}
</style>
