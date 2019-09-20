<template>
	<Card class="card" dis-hover>
		<div class=" addSingle" v-if="!isAdd">
			新增广告位
		</div>
		<div class="editTitle" v-if="isAdd">
			{{formData.billboardAddress}}
		</div>
		<div>
			<Form ref="formData" :model="formData" :rules="formRule" :label-width="130">
				<Row :gutter="10">
					<Col span="15">
					<FormItem label="小区/公寓" prop="villageId">
						<Row type="flex" justify="start" :gutter="5">
							<Col span="18">
							<Select v-model="formData.villageId" @on-change="communityChange"  filterable placeholder="请输入小区名"
							 label-in-value clearable>
								<Option v-for="(item,index) in communityList" :value="item.id" :key="index">{{ item.name }}</Option>
							</Select>
							</Col>
							<Col><Button type="primary" @click="addCommuity" v-if="!isAdd">新增小区</Button></Col>
						</Row>
					</FormItem>
					</Col>
				</Row>
				<Row :gutter="10">
					<Col span="10">
					<FormItem prop="advertNumber" label="广告位编号">
						<Input type="text" v-model="formData.advertNumber" :disabled="isAdd" placeholder="广告位编号"></Input>
					</FormItem>
					</Col>
					<Col span="10">
					<FormItem prop="billboardType" label="广告牌类型">
						<Select v-model="formData.billboardType" placeholder="广告牌类型" transfer clearable>
							<Option v-for="item in billboardTypeLists" :value="item.id" :key="item.value">{{ item.typeName }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="10">
					<FormItem prop="billboardForm" label="广告牌形式">
						<Select v-model="formData.billboardForm" placeholder="广告牌形式" transfer clearable>
							<Option v-for="item in billboardFormLists" :value="item.id" :key="item.value">{{ item.typeName }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="10">
					<FormItem label="用途" prop="assetUse">
						<Select placeholder="请选择" v-model="formData.assetUse" clearable>
							<Option v-for="item in purposeList" :key="item.value" :value="item.value" :label="item.label"></Option>
						</Select>
					</FormItem>
					</Col>
				</Row>
				<Row :gutter="10">
					<Col span="10">
					<FormItem label="预测面积(㎡)" prop="predictedArea">
						<Input placeholder="预测面积" v-model="formData.predictedArea" clearable></Input>
					</FormItem>
					</Col>
					<Col span="10">
					<FormItem label="实用面积(㎡)" prop="usableArea">
						<Input placeholder="实用面积" v-model="formData.usableArea" clearable></Input>
					</FormItem>
					</Col>
				</Row>
				<Row :gutter="10" style="margin-left: 80px;">
					<Col span="3">
					<FormItem label="长(cm)" :label-width="50" prop="billboardLength">
						<Input placeholder="长" clearable v-model="formData.billboardLength"></Input>
					</FormItem>
					</Col>
					<Col span="3">
					<FormItem label="宽(cm)" :label-width="50" prop="billboardWide">
						<Input placeholder="宽" clearable v-model="formData.billboardWide"></Input>
					</FormItem>
					</Col>
					<Col span="3">
					<FormItem label="高(cm)" :label-width="50" prop="billboardHigh">
						<Input placeholder="高" clearable v-model="formData.billboardHigh"></Input>
					</FormItem>
					</Col>
				</Row>
				</Col>
				</Row>
				<Row :gutter="10">
					<Col span="10">
					<FormItem label="楼栋" prop="storiedBuildingId">
						<Select placeholder="请选择" v-model="formData.storiedBuildingId" clearable>
							<Option v-for="item in buildingLists" :value="item.id" :key="item.id">{{ item.buildingCode}}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="10">
					<FormItem label="所在楼层" prop="floor">
						<Select v-model="formData.floor" placeholder="楼层" transfer>
							<Option v-for="item in showFloor(formData.storiedBuildingId)" :value="item" :key="item">{{item}}</Option>
						</Select>
					</FormItem>
					</Col>
				</Row>
				<Divider dashed />
				<Row :gutter="10">
					<Col span="10">
					<FormItem label="每平方米单价(元/㎡)" prop="unitRent">
						<Input placeholder="每平方米单价(元/㎡)" v-model="formData.unitRent" clearable></Input>
					</FormItem>
					</Col>
					<Col span="10">
					<FormItem label="月租金(元)" prop="rent">
						<Input placeholder="月租金(元)" v-model="formData.rent" @on-change="rentChange()" clearable></Input>
					</FormItem>
					</Col>
				</Row>
				<Row :gutter="10">
					<Col span="10">
					<FormItem label="付款方式" class="ivu-form-item-required">
						<Row type="flex" justify="start" :gutter="10">
							<Col span="12">
							<FormItem :label-width="50" prop="payNum">
								<Select placeholder="付" v-model="formData.payNum" clearable>
									<Option v-for="(item,index) in payNumList" :key="index" :label="item.name" :value="item.value"></Option>
								</Select>
							</FormItem>
							</Col>
							<Col span="12">
							<FormItem :label-width="50" prop="custodyNum" clearable>
								<Select placeholder="押" v-model="formData.custodyNum" @on-change="rentChange()">
									<Option v-for="(item,index) in custodyNumList" :key="index" :label="item.name" :value="item.value"></Option>
								</Select>
							</FormItem>
							</Col>
						</Row>
					</FormItem>
					</Col>
					<Col span="10">
					<FormItem class="ivu-form-item-required" label="押金（元）" prop="deposit">
						<Input placeholder="押金" v-model="formData.deposit" :disabled="isDisabled"></Input>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="10">
					<FormItem class="item-input" label="收租日设置" prop="rentType">
						<RadioGroup @on-change="radioChange" v-model="formData.rentType" vertical>
							<FormItem class="item-input">
								<Radio label="1">
									提前&nbsp;<Input v-model="number1" @on-blur="numberChange" :disabled="formData.rentType != '1'"></Input>&nbsp;天收租
								</Radio>
							</FormItem>
							<FormItem class="item-input">
								<Radio label="2">
									固定&nbsp;<Input v-model="number2" @on-blur="numberChange" :disabled="formData.rentType != '2'"></Input>&nbsp;日收租（每期的第一个月）
								</Radio>
							</FormItem>
							<FormItem class="item-input">
								<Radio label="3">
									固定&nbsp;<Input v-model="number3" @on-blur="numberChange" :disabled="formData.rentType != '3'"></Input>&nbsp;日收租（每期提前一个月）
								</Radio>
							</FormItem>
						</RadioGroup>
					</FormItem>

					</Col>
				</Row>

				<Row class="align-center marginTop20">
					<Button type="primary" :to="{name:'asset/advertising'}" ghost>返回</Button>
					<Button type="primary" @click="save('formData')">{{isAdd?formData.dataStatus=='0'?'保存':'保存并提交审批':'保存'}}</Button>
				</Row>
			</Form>
		</div>
		<!-- 新增小区模态框 -->
		<addCommunityModal @handleCancle="handleCancle" :leaseType="1" @handleOk="addCompelete" :showModal="addCommuityModal"></addCommunityModal>
	</Card>
</template>
<script>
	import addCommunityModal from "../../house/components/createCommunity.vue";
	export default {
		components: {
			addCommunityModal
		},
		data() {
			const checkMoney = (rule, value, callback) => {
				if (value === "" || value === undefined) {
					callback(new Error("请输入金额"));
				} else {
					if (isNaN(value)) {
						callback(new Error("请输入数字"));
					} else {
						if (value < 0) {
							callback(new Error("金额大于0"));
						} else {
							callback();
						}
					}
				}
			};
			const checkFigure = (rule, value, callback) => {
				if (value === "" || value === undefined) {
					callback();
				} else {
					if (isNaN(value)) {
						callback(new Error("请输入数字"));
					} else {
						callback();
					}
				}
			};
			const checkNum = (rule, value, callback) => {
				if (value === "" || value === undefined) {
					callback(new Error("请输入广告牌编号"));
				} else {
					if (!/^[a-zA-Z0-9][\w-_（）()]{1,149}$/g.test(value)) {
						callback(new Error("只能输入数字字母-_（）()"));
					} else {
						let links = this.$route.query.id ?
							"?id=" +
							this.$route.query.id +
							"&villageId=" +
							this.formData.villageId +
							"&advertisingNum=" +
							this.formData.advertNumber :
							"?villageId=" +
							this.formData.villageId +
							"&advertisingNum=" +
							this.formData.advertNumber;
						this.$ajax.get(this, this.$api.PUT_CHECK_NUM + links, {}, res => {
							if (res.data.content == false) {
								callback();
							} else {
								callback(new Error("该广告牌编号已存在！"));
							}
						});
					}
				}
			};
			return {
				communityList: [],
				acquireWayList: [],
				contributorList: [],
				purposeList: [{
						label: "自用",
						value: "0"
					},
					{
						label: "出租",
						value: "1"
					},
					{
						label: "出售",
						value: "2"
					}
				],
				billboardTypeLists: [
				],
				billboardFormLists: [
				],
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
				payNumList: [{
						name: "一",
						value: "1"
					},
					{
						name: "二",
						value: "2"
					},
					{
						name: "三",
						value: "3"
					},
					{
						name: "四",
						value: "4"
					},
					{
						name: "五",
						value: "5"
					},
					{
						name: "六",
						value: "6"
					},
					{
						name: "七",
						value: "7"
					},
					{
						name: "八",
						value: "8"
					},
					{
						name: "九",
						value: "9"
					},
					{
						name: "十",
						value: "10"
					},
					{
						name: "十一",
						value: "11"
					},
					{
						name: "十二",
						value: "12"
					}
				],
				custodyNumList: [{
						name: "自定义",
						value: "0"
					},
					{
						name: "一",
						value: "1"
					},
					{
						name: "二",
						value: "2"
					},
					{
						name: "三",
						value: "3"
					},
					{
						name: "四",
						value: "4"
					},
					{
						name: "五",
						value: "5"
					},
					{
						name: "六",
						value: "6"
					},
					{
						name: "七",
						value: "7"
					},
					{
						name: "八",
						value: "8"
					},
					{
						name: "九",
						value: "9"
					},
					{
						name: "十",
						value: "10"
					},
					{
						name: "十一",
						value: "11"
					},
					{
						name: "十二",
						value: "12"
					}
				],
				parkTypeList: [],
				formData: {
					rentType: "1"
				},
				formRule: {
					villageId: [{
						required: true,
						message: "请选择小区",
						trigger: "change"
					}],
					billboardType: [{
						required: true,
						message: "请选择广告牌类型",
						trigger: "change"
					}],
					billboardForm: [{
						required: true,
						message: "请选择广告牌形式",
						trigger: "change"
					}],
					advertNumber: [{
						required: true,
						trigger: "blur",
						validator: checkNum
					}],
					predictedArea: [{
							required: true,
							message: "请输入预测面积",
							trigger: "blur"
						},
						{
							validator: checkFigure,
							trigger: "blur"
						}
					],
					assetUse: [{
						required: true,
						message: "请选择用途",
						trigger: "change"
					}],
					usableArea: [{
							required: true,
							message: "请输入实用面积",
							trigger: "blur"
						},
						{
							validator: checkFigure,
							trigger: "blur"
						}
					],
					rent: [{
						required: true,
						validator: checkMoney,
						trigger: "blur"
					}],
					unitRent: [{
						required: true,
						validator: checkMoney,
						trigger: "blur"
					}],
					billboardLength: [{
						validator: checkFigure,
						trigger: "blur"
					}],
					billboardWide: [{
						validator: checkFigure,
						trigger: "blur"
					}],
					billboardHigh: [{
						validator: checkFigure,
						trigger: "blur"
					}],
					deposit: [{
						required: true,
						validator: checkMoney,
						trigger: "blur"
					}],
					payNum: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}],
					custodyNum: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}]
				},
				buildingLists: [],
				number1: "0",
				number2: "1",
				number3: "1",
				isDisabled: true,
				isAdd: false,
				addCommuityModal: false
			};
		},
		methods: {
			communityChange() {
				if (
					this.formData.advertNumber != "" &&
					this.formData.advertNumber != undefined
				) {
					this.$refs.formData.validateField("advertNumber");
				}
				this.getFloorLists();
			},
			rentChange() {
				this.$forceUpdate();
				if (
					!this.$com.isBlank(this.formData.rent) &&
					!this.$com.isBlank(this.formData.custodyNum) &&
					this.formData.custodyNum != "0" &&
					this.$com.checkNumber(this.formData.rent)
				) {
					this.isDisabled = true;
					this.formData.deposit = String(
						(
							Number(this.formData.custodyNum) * Number(this.formData.rent)
						).toFixed("2")
					);
				} else {
					this.isDisabled = false;
					this.formData.deposit = "";
				}
			},
			getFloorLists() {
				this.$ajax.post(
					this,
					this.$api.SEARCH_FLOOR, {
						pageNo: 1,
						pageSize: 1000,
						communityId: this.formData.villageId,
						delete: "0"
					},
					res => {
						this.buildingLists = res.data.content;
					}
				);
			},
			showFloor(query) {
				let count = "";
				this.buildingLists.forEach(ele => {
					if (query == ele.id) {
						count = Number(ele.floorCount);
						this.formData.storiedBuilding = ele.buildingCode;
					}
				});
				let array = [];
				for (var i = 1; i <= count; i++) {
					array.push(i);
				}
				return array;
			},
			save(name) {
				this.$refs[name].validate(valid => {
					if (!valid) return;
					if (this.formData.rentType == "1") {
						this.formData.rentDay = this.number1;
					} else if (this.formData.rentType == "2") {
						this.formData.rentDay = this.number2;
					} else if (this.formData.rentType == "3") {
						this.formData.rentDay = this.number3;
					}
					this.communityList.forEach(e => {
						if (e.id == this.formData.villageId) {
							this.formData.villageName = e.name;
							this.formData.address = e.address;
						}
					});
					this.formData.billboardAddress = this.formData.address +"-"+this.formData.advertNumber;
					this.formData.rentCollectionDateSetting = this.formData.rentType;
					let arr = this.$route.query.id ? this.formData : [this.formData];
					if (this.$route.query.id) {
						this.$ajax.put(
							this,
							this.$api.PUT_ADVERTISE_DETAIL.replace(
								"{id}",
								this.$route.query.id
							),
							arr,
							res => {
								this.$Message.success("修改成功");
								this.$router.push({
									name: "asset/advertising"
								});
							}
						);
					} else {
						this.$ajax.post(this, this.$api.POST_ADD_MASS_ADVERTISE, arr, res => {
							this.$Message.success("新增成功");
							this.$router.push({
								name: "asset/advertising"
							});
						});
					}
				});
			},
			//小区列表
			getCommunity() {
				this.$ajax.get(this, this.$api.SEARCH_COMMUNITY + "?name=", {}, res => {
					this.communityList = res.data.content;
				});
			},
			//添加小区
			addCommuity() {
				this.addCommuityModal = true;
			},
			//弹框取消
			handleCancle() {
				this.addCommuityModal = false;
			},
			addCompelete() {
				this.addCommuityModal = false;
				this.getCommunity();
			},
			radioChange(value) {
				this.number1 = "0";
				this.number2 = "1";
				this.number3 = "1";
			},
			getDefaultRent() {
				this.$ajax.get(this, this.$api.RENT_RELATED, {}, res => {
					this.formData.payNum =
						res.data != null && res.data.content.rent ?
						res.data.content.rent :
						"";
					this.formData.custodyNum =
						res.data != null && res.data.content.deposit ?
						res.data.content.deposit :
						"";
				});
			},
			getDetail() {
				this.$ajax.get(
					this,
					this.$api.GET_ADVERTISE_DETAIL.replace("{id}", this.$route.query.id), {},
					res => {
						this.formData = res.data.content;
						this.formData.rentType = this.formData.rentCollectionDateSetting;
						this.formData.predictedArea = String(this.formData.predictedArea);
						this.formData.usableArea = String(this.formData.usableArea);
						this.formData.floor = Number(this.formData.floor);
						this.getFloorLists();
					}
				);
			},
			getRent() {
				this.$ajax.get(this, this.$api.RENT_RELATED, {}, res => {
					let data =
						res.data != null && res.data.content ? res.data.content : null;
					if (data == null || data == "") {
						this.formData.rentType = "1";
						this.number1 = "10";
					} else {
						this.formData.rentType = data.type ? data.type : "1";
						let str = data.type ? "number" + data.type : "number1";
						this[str] = data.date ? data.date : "10";
						this.formData.custodyNum = data.deposit != null ? data.deposit : "";
						this.formData.payNum = data.rent != null ? data.rent : "";
					}
				});
			},
				getAdvertiseType(){
			    this.$ajax.get(
					this,
					this.$api.GET_ADVERTISE_TYPE , {},
					res => {
						this.billboardTypeLists = res.data.content;
					}
				);
				this.$ajax.get(
					this,
					this.$api.GET_ADVERTISE_FORM , {},
					res => {
						this.billboardFormLists = res.data.content;
					}
				);
			},
			numberChange() {
				let pattern = /^([0-9]{1,})$/;
				if (this.formData.rentType == "") {} else {
					if (this.formData.rentType == "1") {
						if (isNaN(this.number1)) {
							this.$Message.error("只可输入数字");
							this.number1 = "0";
						} else {
							if (!pattern.test(this.number1)) {
								this.$Message.error("只可输入数字");
								this.number1 = "0";
							} else {
								if (this.number1 > 99) {
									this.$Message.error("请输入0~99天数");
									this.number1 = "0";
								}
							}
						}
					} else if (this.formData.rentType == "2") {
						if (isNaN(this.number2)) {
							this.$Message.error("只可输入数字");
							this.number2 = "1";
						} else {
							if (!pattern.test(this.number2)) {
								this.$Message.error("只可输入数字");
								this.number2 = "1";
							} else {
								if (this.number2 > 31 || this.number2 == 0) {
									this.$Message.error("请输入1~31天数");
									this.number2 = "1";
								}
							}
						}
					} else if (this.formData.rentType == "3") {
						if (isNaN(this.number3)) {
							this.$Message.error("只可输入数字");
							this.number3 = "1";
						} else {
							if (!pattern.test(this.number3)) {
								this.$Message.error("只可输入数字");
								this.number3 = "1";
							} else {
								if (this.number3 > 31 || this.number3 == 0) {
									this.$Message.error("请输入1~31天数");
									this.number3 = "1";
								}
							}
						}
					}
				}
			}
		},
		mounted() {
			this.getCommunity();
			this.getRent(); //默认付押收租日设置
			this.getAdvertiseType();
			if (this.$route.query.id && this.$route.query.id != "") {
				this.getDetail();
				this.isAdd = true;
			}
		}
	};
</script>
<style scoped>
	.align-center {
		text-align: center;
	}

	.required-span {
		display: inline-block;
		text-align: center;
		width: 100%;
	}

	.required-span::before {
		content: "*";
		color: #ed4014;
		font-size: 12px;
		font-family: SimSun;
		line-height: 1;
		margin-right: 4px;
	}

	.marginTop20 {
		margin-top: 20px;
	}

	.item-input {
		margin-bottom: 10px;
	}

	.item-input .ivu-input-type {
		width: 100px;
	}

	.editTitle {
		font-size: 16px;
		padding: 7px 8px;
		border-bottom: 1px dashed #e9e9e9;
		margin-bottom: 21px;
		position: relative;
	}
    .addSingle{
		font-size: 16px;
		padding: 7px 8px;
		border-bottom: 1px solid #e9e9e9;
		margin-bottom: 21px;
		position: relative;
		text-align: center;
	}
	.editTitle:before {
		content: " ";
		display: block;
		position: absolute;
		width: 4px;
		height: 20px;
		background: #e9e9e9;
		left: 0;
		top: 8px;
	}
</style>
