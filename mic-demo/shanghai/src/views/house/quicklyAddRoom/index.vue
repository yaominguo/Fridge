<template>
	<div>
		<Card class="card" dis-hover>
			<!-- 步骤条 -->
			<div id="steps">
				<Row type="flex" justify="center">
					<Col span="18" :offset="3">
					<Steps :current="current">
						<Step title="小区楼栋"></Step>
						<Step title="房源信息"></Step>
						<Step title="价格配置"></Step>
					</Steps>
					</Col>
				</Row>
			</div>
			<Form v-if="current==0" ref="formInline" :model="createHouse" :rules="ruleCreateHouse" :label-width="100" class="createForm">
				<!-- 公寓名称 -->
				<div class="containerFlow">
					<Row>
						<Col span="18">
						<FormItem label="小区名称" prop="communityId">
							<Row type="flex" justify="space-between">
								<Col span="18">
								<Select v-model="createHouse.communityId" filterable clearable placeholder="请选择" @on-change="communityChange"
								 label-in-value>
									<Option v-for="(item,index) in communityList" :value="item.id" :key="index">{{ item.name }}</Option>
								</Select>
								</Col>
								<Col span="5">
								<Button type="primary" @click="addCommuity">添加小区</Button>
								</Col>
							</Row>
						</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span="12">
						<FormItem label="楼栋" prop="buildingId">
							<Select v-model="createHouse.buildingId" clearable placeholder="楼栋" @on-change="buildingChange" :disabled="current=='1'"
							 transfer>
								<Option v-for="item in buildingLists" :value="String(item.id)" :key="item.id">{{ item.buildingCode }}</Option>
							</Select>
						</FormItem>
						</Col>
						<Col span="2" style="text-align:right">
						<Button type="primary" ghost @click="addFloor=true">新增楼栋</Button>
						</Col>
					</Row>
					<Row>
						<Col span="7">
						<FormItem label="电梯房" prop="isElevator">
							<Select v-model="createHouse.isElevator" clearable placeholder="请选择" :disabled="disableEle">
								<Option v-for="(item,index) in isElevatorList" :value="item.value" :key="index">{{ item.name }}</Option>
							</Select>
						</FormItem>
						</Col>
						<Col span="7">
						<FormItem label="楼层总高" prop="floorCount">
							<Select v-model="createHouse.floorCount" clearable placeholder="请选择" :disabled="disableFloorCount">
								<Option v-for="count in 99" :value="String(count)" :key="count">{{ count }}</Option>
							</Select>
						</FormItem>
						</Col>
					</Row>
					<Row type="flex">
						<Col span="7">
						<FormItem label="持有方式" prop="ownedWhole">
							<Select v-model="createHouse.ownedWhole" :disabled="disableOwnedWhole" filterable placeholder="请选择">
								<Option value="0">分散持有</Option>
								<Option value="1">整栋持有</Option>
							</Select>
						</FormItem>
						</Col>
					</Row>
					<Row type="flex" justify="center">
						<Col>
						<Button type="primary" @click="handleCreateHouse">下一步</Button>
						</Col>
					</Row>
				</div>
			</Form>
			<!-- 新增小区模态框 -->
			<addCommunityModal @handleCancle="handleCancle" :leaseType="1" @handleOk="addCompelete" :showModal="addCommuityModal"></addCommunityModal>
			<centeral v-if="current==1&&createHouse.ownedWhole=='1'" :transferData="createHouse" :quickAdd="1" @returnData="getCenteralData"
			 @returnCentralSteps="returnCentralSteps"></centeral>
			<distributed v-if="current!=0&&createHouse.ownedWhole=='0'" :quickAdd="1" :transferData="createHouse" @changeCurrent="changeCurrent"></distributed>
			<centeralDetail v-if="current==2&&createHouse.ownedWhole=='1'" :originData="transferData" @returnCentralSteps="returnCentralSteps"></centeralDetail>
			<Modal v-model="addFloor" title="新增楼栋">
				<Form ref="addFloorData" :model="addFloorData" :rules="ruleCreateHouse" :label-width="100" class="createForm">
					<!-- 公寓名称 -->
					<div class="containerFlow">
						<Row>
							<Col span="24">
							<FormItem label="小区名称" prop="communityId">
								<Row type="flex" justify="space-between">
									<Col span="24">
									<Select v-model="addFloorData.communityId" filterable placeholder="请选择" @on-change="addFloorDataCommunityChange"
									 label-in-value>
										<Option v-for="(item,index) in communityList" :value="item.id" :key="index">{{ item.name }}</Option>
									</Select>
									</Col>
								</Row>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span="12">
							<FormItem label="楼栋号" prop="buildingCode">
								<Input v-model="addFloorData.buildingCode" placeholder="楼栋号" />
							</FormItem>
							</Col>
							<Col span="12">
							<FormItem label="单元号" prop="houseUnit">
								<Input v-model="addFloorData.houseUnit" placeholder="单元号" />
							</FormItem>
							</Col>
							<Col span="12">
							<FormItem label="电梯房" prop="isElevator">
								<Select v-model="addFloorData.isElevator" clearable placeholder="请选择">
									<Option v-for="(item,index) in isElevatorList" :value="item.value" :key="index">{{ item.name }}</Option>
								</Select>
							</FormItem>
							</Col>
							<Col span="12">
							<FormItem label="楼层总高" prop="floorCount">
								<Select v-model="addFloorData.floorCount" clearable placeholder="请选择">
									<Option v-for="count in 99" :value="String(count)" :key="count">{{ count }}</Option>
								</Select>
							</FormItem>
							</Col>

							<Col span="12">
							<FormItem label="持有方式" prop="ownedWhole">
								<Select v-model="addFloorData.ownedWhole" filterable placeholder="请选择">
									<Option value="0">分散持有</Option>
									<Option value="1">整栋持有</Option>
								</Select>
							</FormItem>
							</Col>
						</Row>
					</div>
				</Form>
				<div slot="footer">
					<Button type="default" @click="cancel">取消</Button>
					<Button type="primary" @click="ok">确认</Button>
				</div>
			</Modal>
		</Card>
	</div>
</template>

<script>
	import addCommunityModal from "../components/createCommunity.vue";
	import imageUpload from "../../../components/Helper/Form/image-upload.vue";
	import centeral from "../central/create.vue";
	import distributed from "./distributed.vue";
	import centeralDetail from "./centeralDetail.vue";
	export default {
		components: { 
			addCommunityModal,
			imageUpload,
			centeral,
			centeralDetail,
			distributed
		},
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
			return {
				current: 0,
				addFloor: false,
				createHouse: {

				},
				ruleCreateHouse: {
					communityId: [{
						required: true,
						trigger: 'change',
						message: "请选择小区"
					}],
					buildingId: [{
						required: true,
						trigger: 'blur',
						message: "请选择楼栋"
					}],
					buildingCode: [{
						required: true,
						trigger: 'change',
						message: "请输入楼栋"
					}],
					isElevator: [{
						required: true,
						trigger: 'change',
						message: "请选择是否是电梯"
					}],
					floorCount: [{
						required: true,
						trigger: 'change',
						message: "请输入总楼层数"
					}],
					ownedWhole: [{
						required: true,
						trigger: 'change',
						message: "请选择持有方式"
					}],
				},
				isElevatorList: [{
						name: "是",
						value: "true"
					},
					{
						name: "否",
						value: "false"
					}
				],
				communityList: [],
				transferData: {},
				addCommuityModal: false, //添加小区模态框
				buildingLists: [],
				disableEle: false,
				disableFloorCount: false,
				disableHouseUnit: false,
				disableOwnedWhole: false,
				addFloorData: {}
			};
		},
		mounted() {
			//小区列表
			this.getCommunity();
			this.$cookie.set('houseKind', '3');
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
			getFloorLists() {
				this.$ajax.get(
					this,
					this.$api.GET_COMMUNITY_LIST + "?pageSize=1000&pageNo=1", {},
					res => {
						let data = res.data.content;
						let flag = false;
						data.forEach(ele => {
							if (this.createHouse.communityId == ele.id) {
								flag = true
								this.buildingLists = ele.buildingList;
							}
						})
						if (!flag) {
							this.buildingLists = [];
						}
					}
				);
			},
			communityChange() {
				delete this.createHouse.buildingId;
				if (arguments[0].label && arguments[0].value) {
					this.createHouse.communityName = arguments[0].label;
					this.createHouse.communityId = arguments[0].value;
					this.getFloorLists();
				} else {
					this.buildingLists = [];
				}
			},
			addFloorDataCommunityChange() {
				if (arguments[0] && arguments[0] && arguments[0].label && arguments[0].value) {
					this.addFloorData.communityName = arguments[0].label;
					this.addFloorData.communityId = arguments[0].value;
				}
			},
			buildingChange() {
				this.buildingLists.forEach(ele => {
					if (ele.id == this.createHouse.buildingId) {
						this.createHouse.isElevator = ele.isElevator != null ? String(ele.isElevator) : "";
						this.createHouse.floorCount = ele.floorCount;
						this.createHouse.houseUnit = ele.houseUnit;
						this.createHouse.ownedWhole = ele.buildingType;
						this.createHouse.buildingName = ele.buildingCode;
						this.disableEle = ele.isElevator != undefined && ele.isElevator != null ? true : false;
						this.disableFloorCount = ele.floorCount != undefined && ele.floorCount != null ? true : false;
						this.disableHouseUnit = ele.houseUnit != undefined && ele.houseUnit != null ? true : false;
						this.disableOwnedWhole = ele.buildingType != undefined && ele.buildingType != null ? true : false;
					}
				})
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
			handleCreateHouse() {
				this.$refs["formInline"].validate(valid => {
					if (valid) {
						this.createHouse.isElevator = String(this.createHouse.isElevator);
						this.current += 1;
					}
				});
			},
			ok() {
				this.$refs["addFloorData"].validate(valid => {
					if (valid) {
						let formDatas = JSON.parse(JSON.stringify(this.addFloorData));
						formDatas.isElevator = Boolean(formDatas.isElevator);
						formDatas.buildingType = formDatas.ownedWhole == "1" ? "1" : "0";
						formDatas.houseKind = "3";
						formDatas.isOperatingType = "1";
						this.$ajax.post(this, this.$api.POST_ADD_BUILDING, formDatas, res => {
							if (res.code == "200") {
								this.$Message.success("新增成功");
								this.$refs["addFloorData"].resetFields();
								this.addFloor = false;
								if (this.createHouse.communityId) {
									this.getFloorLists();
								} else {
									this.getCommunity();
								}
							} else {
								this.$Message.error(res.msg);
							}
						});
					}
				});
			},
			cancel() {
				this.$refs["addFloorData"].resetFields();
				this.addFloor = false;
			},
			getCenteralData(data) {
				this.current += 1;
				this.transferData = data;
			},
			changeCurrent(data) {
				if (data) {
					if (data == "+1") {
						this.current += 1;
					} else {
						this.current -= 1;
					}
				} else {
					this.current = 0;
				}
			},
			returnCentralSteps() {
				this.current -= 1;
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
		margin: 50px 0 40px 0;
	}

	.buttonOpeation {
		text-align: center;
		margin-top: 20px;
	}

	.independentItem {
		width: 195px;
		height: 40px;
		padding: 3px 0 3px 0;
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
</style>
