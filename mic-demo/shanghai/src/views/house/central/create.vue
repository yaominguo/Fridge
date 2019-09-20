<template>
	<div>
		<Card class="card" dis-hover :bordered="false">
			<Form ref="formInline" :model="createHouse" :rules="ruleCreateHouse" :label-width="100" class="createForm">
				<!-- 公寓名称 -->
				<div class="containerFlow">
					<FormItem label="公寓名称">
						<Row>
							<Col span="13">
							<Input v-model="quickAdd&&quickAdd=='1'?transferData.name:$route.query.name" disabled/>
							</Col>
						</Row>
					</FormItem>
					<!-- 是否电梯和楼层总高 -->
					<Row>
						<Col span="7" style="margin-right:35px">
						<FormItem label="是否电梯房" prop="elevator">
							<Select v-model="createHouse.elevator" :disabled="isDisabledEle" clearable placeholder="请选择">
								<Option v-for="(item,index) in isElevatorList" :value="item.value" :key="index">{{ item.name }}</Option>
							</Select>
						</FormItem>
						</Col>
						<Col span="6">
						<FormItem label="总楼层" prop="floorCount">
							<Select v-model="createHouse.floorCount" disabled @on-change="floorCountChange" clearable placeholder="请选择">
								<Option v-for="count in 99" :value="String(count)" :key="count">{{ count }}</Option>
							</Select>
						</FormItem>
						</Col>
					</Row>
					<Row>
						<FormItem label="公共事业设备" prop="publicEquipment">
							<CheckboxGroup v-model="createHouse.publicEquipment">
								<Row type="flex" justify="start">
									<Col span="7">
									<Row>
										<Col span="7">
										<Checkbox label="0">整栋大水表</Checkbox>
										</Col>
										<Col span="11">
										<Input v-model="createHouse.waterNumBig" :disabled="!roomObj.waterNumDis" placeholder="整栋大水表户号" />
										</Col>
									</Row>
									</Col>
									<Col span="8">
									<Row>
										<Col span="6">
										<Checkbox label="1">整栋大电表</Checkbox>
										</Col>
										<Col span="11">
										<Input v-model="createHouse.elecNumBig" :disabled="!roomObj.elecNumDis" placeholder="整栋大电表户号" />
										</Col>
									</Row>
									</Col>
									<Col span="7">
									<Row>
										<Col span="8">
										<Checkbox label="2">整栋大煤气表</Checkbox>
										</Col>
										<Col span="11">
										<Input v-model="createHouse.gasNumBig" :disabled="!roomObj.gasNumDis" placeholder="整栋大煤气表户号" />
										</Col>
									</Row>
									</Col>
								</Row>
							</CheckboxGroup>
						</FormItem>
						<!-- </Col> -->
					</Row>
				</div>
				<div class="split"></div>
				<div class="containerFlow">
					<!-- 个性化设置 -->
					<FormItem label="个性化设置" prop="personalizedDesign">
						<Row type="flex" :gutter="20" justify="start" align="middle">
							<Col>
							<CheckboxGroup v-model="createHouse.personalizedDesign">
								<Checkbox disabled label="自动生成房间号"></Checkbox>
								<Checkbox :disabled="personalSet" label="房间号去”4”"></Checkbox>
								<Checkbox :disabled="personalSet" label="房间号至少4位"></Checkbox>
								<Checkbox :disabled="personalSet" label="房间号前缀"></Checkbox>
							</CheckboxGroup>
							</Col>
							<Col>
							<FormItem prop="houseQianValue">
								<Input v-model="createHouse.houseQianValue" :disabled="personalSet" placeholder="房间号前缀,请输入1位数字/字母" :maxlength="1" />
							</FormItem>
							</Col>
							<Col>
							<Button @click="showPersonalSet">{{this.personalSet==true?'编辑':'保存'}}</Button>
							</Col>
						</Row>
					</FormItem>
					<!-- 操作 -->
					<FormItem label="操作">
						<Row type="flex" :gutter="20" justify="start" align="middle">
							<Col>
							<Button @click="addFloor">增加楼层</Button>
							</Col>
							<Col>将房间出租状态批量改为</Col>
							<Col>
							<RadioGroup v-model="createHouse.status" @on-change="massLeaseType()" type="button">
								<Radio label="1">已租</Radio>
								<Radio label="2">未租</Radio>
							</RadioGroup>
							</Col>
						</Row>
					</FormItem>
					<!-- 所在楼层 -->
					<Row v-for="(item,index) in createHouse.floorsList" :key="index">
						<Form ref="floorInline" :model="item" :rules="ruleFloorInline" :label-width="100" class="createForm" style="overflow: hidden;padding:0;padding-top:8px;">
							<Col span="4">
							<FormItem label="所在楼层" prop="floor">
								<Select transfer v-model="item.floor" clearable placeholder="请选择" @on-change="personalSetRoomCode(index,item.floor)">
									<Option v-for="count in Number(createHouse.floorCount)" :value="String(count)" :key="count">{{ count }}</Option>
								</Select>
							</FormItem>
							</Col>
							<Col span="1" style="margin:5px 0 0 20px">
							<Icon type="ios-trash" color="#2d8cf0" size="23" @click="deleteFloor(index)" />
							</Col>
							<Col span="3">
							<FormItem label="房间数量" prop="roomNums" :label-width="70">
								<Input v-model="item.roomNums" placeholder="房间数量" @on-blur="roomCountChange(item.roomNums,index)" />
							</FormItem>
							</Col>
							<Col span="13">
							<FormItem label="房间号" prop="roomNo" :label-width="60" style="margin-bottom:10px">
								<Row type="flex" align="middle">
									<Col v-for="(item,it) in item.roomsList" :key="it">
									<Form ref="formInlineHouse" :model="item" :rules="ruleHouse">
										<div class="independentItem">
											<Icon type="ios-close-circle" v-model="item.roomNo" @click="deleteHouse(index,it)" size="20" />
											<Row type="flex" justify="start" :gutter="5">
												<Col span="12">
												<FormItem prop="roomNo">
													<Input v-model="item.roomNo" placeholder="房间号" />
												</FormItem>
												</Col>
												<Col span="12">
												<FormItem prop="leaseStatus">
													<Select transfer v-model="item.leaseStatus" clearable placeholder="出租状态">
														<Option v-for="(item,index) in rentalStatus" :value="item.leaseStatus" :key="index">{{ item.name }}</Option>
													</Select>
												</FormItem>
												</Col>
											</Row>
											<Row type="flex" justify="start" :gutter="5">
												<Col span="12">
												<FormItem prop="waterNum">
													<Input v-model="item.waterNum" :disabled="roomObj.waterNumDis" placeholder="水表户号" />
												</FormItem>
												</Col>
												<Col span="12">
												<FormItem prop="gasNum">
													<Input v-model="item.gasNum" :disabled="roomObj.gasNumDis" placeholder="煤气表户号" />
												</FormItem>
												</Col>
											</Row>
											<Row type="flex" justify="start" :gutter="5">
												<Col span="12">
												<FormItem prop="elecNum">
													<Input v-model="item.elecNum" :disabled="roomObj.elecNumDis" placeholder="电表户号" />
												</FormItem>
												</Col>
											</Row>
										</div>
									</Form>
									</Col>
									<Col span="6" class="addButton">
									<Icon type="ios-add-circle" size="20" @click="addHouse(index)" />
									</Col>
								</Row>
							</FormItem>
							</Col>
						</Form>
					</Row>
				</div>
			</Form>
			<!-- 操作按钮 -->
			<div class="buttonOpeation">
				<Button type="default" v-if="quickAdd&&quickAdd=='1'" @click="returnSteps">上一步</Button>
				<Button @click="handleSave" type="primary">{{quickAdd&&quickAdd=="1"?"下一步":"保存"}}</Button>
			</div>
		</Card>
	</div>
</template>

<script>
	export default {
		props: ['quickAdd', 'transferData'],
		data() {
			const checkRent = (rule, value, callback) => {
				if (value == "" || value == undefined) {
					callback(new Error("租金"));
				} else {
					if (
						/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(
							value.replace(/(^\s*)|(\s*$)/g, "")
						)
					) {
						let flag = true;
						if (Number(value) > 999999 || Number(value) < 100) {
							callback(new Error("100~999999"));
							flag = false;
						} else {
							flag = true;
						}
						if (
							!/^(([1-9]{1}\d*)|(0{1}))(\.\d{2})$/.test(
								value.replace(/(^\s*)|(\s*$)/g, "")
							)
						) {
							if (/^[1-9]{1,}[\d]*$/.test(value.replace(/(^\s*)|(\s*$)/g, ""))) {
								flag = true;
							} else {
								callback(new Error("保留小数点两位"));
								flag = false;
							}
						} else {
							flag = true;
						}
						if (flag == true) {
							callback();
						}
					} else {
						callback(new Error("输入数字"));
					}
				}
			};
			const checkDeposit = (rule, value, callback) => {
				if (value == "" || value == undefined) {
					callback(new Error("押金"));
				} else {
					if (
						/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(
							value.replace(/(^\s*)|(\s*$)/g, "")
						)
					) {
						if (Number(value) < 999999 && Number(value) > 1) {
							callback();
						} else {
							callback(new Error("1到999999"));
						}
					} else {
						callback(new Error("输入数字"));
					}
				}
			};
			const checkSpace = (rule, value, callback) => {
				if (value == "" || value == undefined) {
					callback(new Error("房间面积"));
				} else {
					if (
						/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(
							value.replace(/(^\s*)|(\s*$)/g, "")
						)
					) {
						if (Number(value) < 500 && Number(value) > 5) {
							callback();
						} else {
							callback(new Error("面积为5~500"));
						}
					} else {
						callback(new Error("输入数字"));
					}
				}
			};
			const checkhouseQian = (rule, value, callback) => {
				if (value != "" && value != undefined) {
					if (!/^[0-9a-zA-Z]+$/.test(value.replace(/(^\s*)|(\s*$)/g, ""))) {
						callback(new Error("输入一位数字或字母"));
					} else {
						callback();
					}
				} else {
					callback();
				}
			};
			return {
				current: 0,
				createHouse: {
					floorsList: [{
						roomNums: "1",
						roomsList: [{}]
					}],
					communityId: "",
					houseQianValue: "",
					elevator: "",
					floorCount: "",
					personalizedDesign: ["自动生成房间号"],
					status: "",
					publicEquipment: []
				},
				ruleCreateHouse: {
					communityId: [{
						required: true,
						message: "选择公寓",
						triggle: "change"
					}],
					elevator: [{
						required: true,
						message: "选择是否电梯房",
						triggle: "change"
					}],
					floorCount: [{
						required: true,
						message: "选择楼层总高",
						triggle: "change"
					}],
					floor: [{
						required: true,
						message: "所在楼层",
						triggle: "change"
					}],
					houseQianValue: [{
						validator: checkhouseQian,
						trigger: "blur"
					}]
				},
				ruleFloorInline: {
					roomNums: [{
						required: true,
						message: "房间数量",
						triggle: "change"
					}],
					floor: [{
						required: true,
						message: "所在楼层",
						triggle: "change"
					}]
				},
				ruleHouse: {
					roomNo: [{
						required: true,
						message: "房间号",
						triggle: "change"
					}],
					leaseStatus: [{
						required: true,
						message: "出租状态",
						triggle: "change"
					}],
					houseNum: [{
						message: "户号",
						triggle: "change"
					}]
				},
				isElevatorList: [{
						name: "是",
						value: "1"
					},
					{
						name: "否",
						value: "0"
					}
				],
				rentalStatus: [{
						name: "未租",
						leaseStatus: "0"
					},
					{
						name: "已租",
						leaseStatus: "2"
					}
				], //出租状态
				priceEquipment: {
					name: "",
					space: "",
					roomNum: "",
					parlourNum: "",
					toiletNum: "",
					payNum: "",
					mortgageNum: "",
					rent: "",
					deposit: "",
					rentType: "",
					roomCostList: [{
						selectDisabled: true,
						textDisabled: true
					}],
					rentType: "0",
					actualType: "2",
					paymentMethod: "1"
				},
				priceEquipmentRules: {
					paymentMethod: [{
						required: true
					}],
					name: [{
						required: true,
						trigger: "blur",
						message: "输入模版名称"
					}],
					space: [{
						required: true,
						validator: checkSpace,
						trigger: "blur"
					}],
					roomNum: [{
						required: true,
						trigger: "change",
						message: "请选择"
					}],
					parlourNum: [{
						required: true,
						trigger: "change",
						message: "请选择"
					}],
					toiletNum: [{
						required: true,
						trigger: "change",
						message: "请选择"
					}],
					actualType: [{
						required: true
					}],
					paymentMethod: [{
						required: true
					}],
					payNum: [{
						required: true,
						trigger: "change",
						message: "请选择"
					}],
					mortgageNum: [{
						required: true,
						trigger: "change",
						message: "请选择"
					}],
					rent: [{
						required: true,
						validator: checkRent,
						trigger: "change"
					}],
					deposit: [{
						required: true,
						validator: checkDeposit,
						trigger: "change"
					}]
				},
				eventuallyFormRule: {
					rent: [{
						required: true,
						validator: checkRent,
						trigger: "change"
					}]
				},
				feeParentsList: [{}],
				feeChildrenList: [{}],
				communityList: [],
				showOther: false,
				showOtherFlag: false,
				personalSet: true,
				houseQian: true,
				addCommuityModal: false, //添加小区模态框
				isDisabled: true,
				selectRoomIndex: "",
				rentTypeDisabled: "0", //收租日是否禁用
				reInput: false,
				roomTemplatePicList: [], //房源新增图片
				indeterminate: true,
				checkAll: false,
				floorCheckAllFlag: false,

			};
		},
		mounted() {
			//小区列表
			this.getCommunity();
			console.log(this.$route.query)
		},
		computed: {
			isDisabledEle() {
				let isEve = this.quickAdd != "1" ? this.$route.query.isElevator : this.transferData.isElevator;
				if (isEve == undefined || isEve == null || isEve == '') {
					return false;
				} else {
					this.createHouse.elevator = isEve == "true" ? "1" : "0";
					return true;
				}
			},
			roomObj() {
				let obj = {};
				if (this.createHouse.publicEquipment.indexOf("0") != -1) {
					obj.waterNumDis = true;
				} else {
					obj.waterNumDis = false;
				}
				if (this.createHouse.publicEquipment.indexOf("1") != -1) {
					obj.elecNumDis = true;
				} else {
					obj.elecNumDis = false;
				}
				if (this.createHouse.publicEquipment.indexOf("2") != -1) {
					obj.gasNumDis = true;
				} else {
					obj.gasNumDis = false;
				}
				return obj;
			}
		},
		methods: {
			getCommunity() {
				this.$ajax.get(
					this,
					this.$api.GET_COMMUNITY_LIST + "?pageSize=1000&pageNo=1&buildType=1", {},
					res => {
						this.communityList = res.data.content;
					}
				);
				if (!this.quickAdd || this.quickAdd != "1") {
					this.createHouse.floorCount = this.$route.query.floorCount;
					this.createHouse.buildingId = this.$route.query.id;
					this.createHouse.communityId = this.$route.query.communityId;
				} else {
					this.createHouse.floorCount = this.transferData.floorCount;
					this.createHouse.buildingId = this.transferData.id;
					this.createHouse.communityId = this.transferData.communityId;
					this.transferData.name = this.transferData.communityName
				}
			},
			returnSteps(){
				this.$emit("returnCentralSteps")
			},
			//费用绑定标志
			bindSign(value, index) {
				let sign = "";
				let id = "";
				this.priceEquipment.roomCostList[index].secondsDatas.forEach(item => {
					if (item.name == value.name) {
						sign = item.sign;
						id = item.id;
					}
				});
				this.priceEquipment.roomCostList[index].sign = sign;
				this.priceEquipment.roomCostList[index].costNo = id;
				this.priceEquipment.roomCostList[index].textDisabled = false;
			},
			//添加小区
			addCommuity() {
				this.addCommuityModal = true;
			},
			//自定义设置楼层变化
			personalSetRoomCode(index, value) {
				let hasCount = 0;
				if (this.createHouse.floorsList.length > 0) {
					this.createHouse.floorsList.forEach(ele => {
						if (ele.floor == value) {
							hasCount += 1;
							if (hasCount >= 2) {
								ele.floor = "";
								this.$Message.error("楼层号不能重复！");
							}
						}
					});
				}
				let strs = this.createHouse.personalizedDesign.join(",");
				let isFourLast = false;
				let isRemoveFour = false;
				let addPrefix = false;
				if (strs.indexOf("房间号至少4位") != -1) {
					isFourLast = true;
				}
				if (strs.indexOf("房间号前缀") != -1) {
					addPrefix = true;
				}
				if (strs.indexOf("房间号去") != -1) {
					isRemoveFour = true;
				}
				if (value != "" && value != undefined) {
					this.autoChangeHouseCoude(
						index,
						isRemoveFour,
						isFourLast,
						addPrefix,
						value
					);
				}
			},
			//自动改变楼层code
			autoChangeHouseCoude(index, isRemoveFour, isFourLast, addPrefix, value) {
				let total = Number(this.createHouse.floorsList[index].roomNums) + 20;
				let middle = ";";
				let figureDatas = [];
				if (isRemoveFour) {
					let array = [];
					for (let i = 1; i < total; i++) {
						let length = String(i).length;
						if (length == 1 && i == "4") {} else if (length > 1) {
							var a = parseInt(i % 10);
							if (!(a == "4")) {
								array.push(i);
							}
						} else {
							array.push(i);
						}
					}
					figureDatas = array;
				}
				this.createHouse.floorsList[index].roomsList.forEach((element, it) => {
					let figure = "";
					if (isRemoveFour) {
						figure = figureDatas[it];
					} else {
						figure = Number(it) + 1;
					}
					if (isFourLast == true) {
						if (addPrefix) {
							middle = figure >= 10 ? figure : "0" + figure;
						} else {
							if (figure >= 10 && figure <= 99) {
								middle = "0" + figure;
							} else if (figure >= 100) {
								middle = figure;
							} else {
								middle = "00" + figure;
							}
						}
					} else {
						middle = figure >= 10 ? figure : "0" + figure;
					}
					if (addPrefix == true) {
						element.roomNo = this.createHouse.houseQianValue + value + middle;
					} else {
						element.roomNo = value + middle;
					}
				});
			},
			//自定义的保存和编辑
			showPersonalSet() {
				if (this.personalSet) {
					this.personalSet = false;
				} else {
					this.personalSet = true;
				}
			},
			//保存并下一步
			handleSave() {
				let flag = true;
				this.$refs["formInline"].validate(valid => {
					if (!valid) {
						flag = false;
					}
				});
				this.$refs["floorInline"].forEach(item => {
					item.validate(valid => {
						if (!valid) {
							flag = false;
						}
					});
				});
				this.$refs["formInlineHouse"].forEach(item => {
					item.validate(valid => {
						if (!valid) {
							flag = false;
						}
					});
				});
				if (flag == true) {
					let data = JSON.parse(JSON.stringify(this.createHouse));
					data.elevator = this.createHouse.elevator == "1" ? true : false;
					data.floorsList = this.createHouse.floorsList;
					data.floorsList.forEach(ele => {
						if (ele.roomsList.length > 0) {
							ele.roomsList.forEach(item => {
								item.houseKind = this.$cookie.get('houseKind')
							})
						}
					})
					if (this.quickAdd && this.quickAdd == "1") {
						data.buildingId=this.transferData.buildingId;
						this.$emit("returnData", data)
					} else {
						this.$ajax.post(
							this,
							this.$api.POST_ADD_HOUSE_CENTRAL,
							data,
							res => {
								if (res.code == "200") {
									this.$Message.success("新增成功！");
									this.$router.push({
										name: 'lease/normal-housing-central'
									})
								} else {
									this.$Message.error(res.msg);
								}
							}
						);
					}

				} else {
					this.$Message.error(" 请填写必要信息!");
				}
			},
			//删除房间
			deleteHouse(index, it) {
				if (this.createHouse.floorsList[index].roomsList.length > 1) {
					this.createHouse.floorsList[index].roomsList.splice(it, 1);
					this.createHouse.floorsList[index].roomNums = String(
						this.createHouse.floorsList[index].roomsList.length
					);
				} else {
					this.$Message.error("每层楼至少保留一间房间!");
				}
			},
			//增加房间
			addHouse(index) {
				this.createHouse.floorsList[index].roomsList.push({});
				this.createHouse.floorsList[index].roomNums = String(
					this.createHouse.floorsList[index].roomsList.length
				);
				if (
					this.createHouse.floorsList[index].floor != "" &&
					this.createHouse.floorsList[index].floor != undefined
				) {
					this.personalSetRoomCode(
						index,
						this.createHouse.floorsList[index].floor
					);
				}
				if (this.createHouse.status != "") {
					this.massLeaseType();
				}
			},
			//房间数量变化
			roomCountChange(value, index) {
				if (Number(value) > 350) {
					this.$Message.error("最多可添加350间房！");
				} else {
					let length = this.createHouse.floorsList[index].roomsList.length;
					if (Number(value) > Number(length)) {
						let count = Number(value) - Number(length);
						for (var i = 0; i < count; i++) {
							this.createHouse.floorsList[index].roomsList.push({});
						}
					} else {
						this.createHouse.floorsList[index].roomsList.splice(value, length);
					}
					if (
						this.createHouse.floorsList[index].floor != "" &&
						this.createHouse.floorsList[index].floor != undefined
					) {
						this.personalSetRoomCode(
							index,
							this.createHouse.floorsList[index].floor
						);
					}
					if (this.createHouse.status != "") {
						this.massLeaseType();
					}
				}
			},
			//新增楼层
			addFloor() {
				if (this.createHouse.floorCount > this.createHouse.floorsList.length) {
					this.createHouse.floorsList.push({
						roomsList: [{}],
						roomNums: "1"
					});
				} else {
					this.$Message.error("楼层数量不可超过楼层总数!");
				}
			},
			//删除楼层
			deleteFloor(index) {
				this.createHouse.floorsList.splice(index, 1);
			},
			//批量已租未租
			massLeaseType() {
				if (this.createHouse.status == 1) {
					//已租
					this.createHouse.floorsList.forEach(element => {
						element.roomsList.forEach(item => {
							item.leaseStatus = "2";
						});
					});
				} else {
					//未租
					this.createHouse.floorsList.forEach(element => {
						element.roomsList.forEach(item => {
							item.leaseStatus = "0";
						});
					});
				}
				this.$refs["formInlineHouse"].forEach(item => {
					item.validateField("leaseStatus");
				});
			},
			floorCountChange() {
				if (
					this.createHouse.floorCount != "" &&
					this.createHouse.floorCount != undefined
				) {
					this.showOther = true;
					if (this.createHouse.floorsList.length == 0) {
						let obj = {
							roomNums: "1",
							roomsList: [{}]
						};
						this.createHouse.floorsList = [obj];
					}
				} else {
					this.showOther = false;
				}
			},
		},
		watch: {
			"createHouse.personalizedDesign"() {
				let flag = false;
				let isExist = false;
				this.createHouse.personalizedDesign.forEach(element => {
					if (element == "房间号前缀") {
						flag = true;
					}
					if (element == "自动生成房间号") {
						isExist = true;
					}
				});
				if (flag == true) {
					this.houseQian = false;
				}
				if (isExist == false) {
					this.personalSet = true;
				}
			},
			personalSet() {
				if (this.personalSet == true) {
					this.createHouse.floorsList.forEach((ele, index) => {
						this.personalSetRoomCode(index, ele.floor);
					});
				}
			},
			"createHouse.publicEquipment"() {
				this.createHouse.floorsList.forEach(item => {
					item.roomsList.forEach(ele => {
						if (this.createHouse.publicEquipment.indexOf("0") != -1) {
							ele.waterNumDis = true;
						} else {
							ele.waterNumDis = false;
						}
						if (this.createHouse.publicEquipment.indexOf("1") != -1) {
							ele.elecNumDis = true;
						} else {
							ele.elecNumDis = false;
						}
						if (this.createHouse.publicEquipment.indexOf("2") != -1) {
							ele.gasNumDis = true;
						} else {
							ele.gasNumDis = false;
						}
					})
				})
			}
		}
	};
</script>
<style>
	.editPriceBlock div div .ivu-input {
		font-size: 14px;
	}

	.editPriceBlock div div i {
		color: #979cbe;
		font-size: 12px;
	}

	.editPriceBlock .ivu-form-item-error-tip {
		display: none;
	}
</style>
<style scoped>
	.containerFlow {
		max-width: 1200px;
		margin: 0 auto;
	}

	.demo-breadcrumb-separator {
		color: #ff5500;
		padding: 0 5px;
	}

	#steps {
		margin-top: 10px;
		padding: 20px 0;
	}

	.buttonOpeation {
		text-align: center;
		margin-top: 20px;
	}

	.independentItem {
		width: 175px;
		height: 108px;
		padding: 3px 5px 3px 5px;
		text-align: center;
		border: 1px solid #dcdee2;
		position: relative;
		margin: 0 15px 10px 0;
	}

	.independentItem i {
		position: absolute;
		top: -10px;
		right: -10px;
	}

	.editPriceBlock {
		margin-right: 10px;
		position: relative;
	}

	.editPriceBlock,
	.editPriceBlock div {
		width: 180px;
		display: inline-block;
		border: 1px solid #dcdee2;
		border-radius: 5px;
		height: 40px !important;
		line-height: 40px !important;
	}

	.editPriceBlock div {
		border: none;
		overflow: hidden;
		padding: 0 5px 0 10px;
	}

	.editPriceBlock div span:first-of-type {
		float: left;
		width: 40px;
		text-align: center;
	}

	.editPriceBlock div span:last-of-type {
		float: left;
		color: #4ec096;
		margin-left: 5px;
	}

	.editPriceBlock div div {
		position: absolute;
		top: 0px;
		right: 0px;
	}

	.tableContainer {
		margin-top: 20px;
	}

	.tableContainer>.header {
		overflow: hidden;
		height: 57px;
		background: #fafafb;
		border: 1px solid #dcdcdc;
	}

	.tableContainer .normal {
		float: left;
		height: 57px;
		line-height: 57px;
		padding: 0 20px;
		width: 120px;
		text-align: center;
	}

	.tableContainer .hasSep {
		padding-left: 38px;
		text-align: left;
	}

	.allItems {
		width: 800px !important;
		overflow: hidden;
		text-align: left;
		padding: 0 20px;
	}

	.allItems .roomLists {
		width: 700px !important;
		margin-top: 10px;
	}

	.allItems>div {
		float: left;
		margin-top: 20px;
		display: inline-block;
	}

	.split {
		border-top: 1px solid #e8eaec;
		margin-bottom: 20px;
	}

	.itemWidth {
		width: 100px;
	}

	.addButton {
		height: 108px;
		line-height: 108px;
	}
</style>
