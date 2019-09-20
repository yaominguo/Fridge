<template>
	<div>
		<div class="tableContainer centeralDetail">
			<div class="allGain">
				<div class="tips">点击
					<Icon type="md-settings" color="#2d8cf0"></Icon>"可批量修改
				</div>
				<div class="formList">
					<Row class-name="header" type="flex" justify="space-between">
						<Col span="2">
						室号
						</Col>
						<Col span="1">
						<span class="required">*</span>
						<span>房</span>
						<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('house')"></Icon>
						</Col>
						<Col span="1">
						<span class="required">*</span>
						<span>厅</span>
						<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('hall')"></Icon>
						</Col>
						<Col span="1">
						<span class="required">*</span>
						<span>卫</span>
						<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('guard')"></Icon>
						</Col>
						<Col span="2">
						<span class="required">*</span>
						<span>出租状态</span>
						<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('leaseStatus')"></Icon>
						</Col>
						<Col span="2">
						<span class="required">*</span>
						<span>房屋面积</span>
						</Col>
						<Col span="3">
						<span class="required">*</span>
						<span>付款方式</span>
						<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('methods')"></Icon>
						</Col>
						<Col span="2">
						<span class="required">*</span>
						<span>租金</span>
						<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('rent')"></Icon>
						</Col>
						<Col span="2">
						<span class="required">*</span>
						<span>房屋押金</span>
						<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('deposit')"></Icon>
						</Col>
						<Col span="1">
						房屋图片
						</Col>
						<Col span="2">
						<span>房屋配置</span>
						<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('roomConfigList')"></Icon>
						</Col>
					</Row>
					<div v-for="(its,is) in originData.floorsList" :key="is">
						<Row>
							<Col span="24">
							<Form v-for="(item, index) in its.roomsList" :key="index" ref="formDynamic" :model="item" id="form" :rules="formDynamicRules">
								<Row type="flex" justify="space-between" align="middle" class-name="formData">
									<Col span="2">
									{{item.roomNo}}
									</Col>
									<Col span="1">
									<FormItem :prop="'roomNum'">
										<Select v-model="item.roomNum" transfer clearable placeholder="房">
											<Option v-for="count in 26" :value="String(count)" :key="count">{{count }}</Option>
										</Select>
									</FormItem>
									</Col>
									<Col span="1">
									<FormItem :prop="'parlourNum'">
										<Select v-model="item.parlourNum" transfer clearable placeholder="厅">
											<Option v-for="count in 11" :value="String(count - 1)" :key="count">{{count-1}}</Option>
										</Select>
									</FormItem>
									</Col>
									<Col span="1">
									<FormItem :prop="'toiletNum'">
										<Select v-model="item.toiletNum" transfer clearable placeholder="卫">
											<Option v-for="count in 11" :value="String(count -1)" :key="count">{{ count -1}}</Option>
										</Select>
									</FormItem>
									</Col>
									<Col span="2">
									<FormItem :prop="'leaseStatus'">
										<Select v-model="item.leaseStatus" transfer clearable placeholder="请选择">
											<Option v-for="(item,index) in rentalStatus" :value="item.leaseStatus" :key="index">{{ item.name }}</Option>
										</Select>
									</FormItem>
									</Col>
									<Col span="2">
									<FormItem :prop="'roomSpace'">
										<Input type="text" v-model="item.roomSpace" placeholder="房屋面积" @on-change="calculatingRent(is,index)"></Input>
									</FormItem>
									</Col>
									<Col span="3">
									<FormItem :prop="'payNum'" style="display:inline-block;margin-top:8px">
										<Select v-model="item.payNum"  style="width:70px" placeholder="付" transfer>
											<Option v-for="count in 12" :value="String(count)" :key="count">{{ count }}</Option>
										</Select>
									</FormItem>
									<FormItem :prop="'mortgageNum'" style="display:inline-block;margin-top:8px">
										<Select v-model="item.mortgageNum"  style="width:70px" placeholder="押" transfer @on-change="mortgageNumChange(item.mortgageNum,is,index,'')">
											<Option value="auto">自定义</Option>
											<Option v-for="count in 12" :value="String(count)" :key="count">{{ count }}</Option>
										</Select>
									</FormItem>
									</Col>
									<Col span="2">
									<FormItem :prop="'rent'">
										<Input type="text" clearable v-model="item.rent" @on-change="rentChange(is,index)" placeholder="租金"></Input>
									</FormItem>
									</Col>
									<Col span="2">
									<FormItem :prop="'deposit'">
										<Input type="text" :disabled="item.isDisabled" v-model="item.deposit" placeholder="押金"></Input>
									</FormItem>
									</Col>
									<Col span="1">
									<span class="row-high-light" v-if="item.roomPicList&&item.roomPicList.length!=0" @click="showModal('roomPicList',is,index)">点击查看</span>
									<Icon class="row-high-light" v-else type="md-add-circle" size="18" color="#2d8cf0" @click="showModal('roomPicList',is,index)"></Icon>
									</Col>
									<Col span="2">
									<div class="row-high-light" @click="showModal('roomConfigList',is,index)" v-if="item.roomConfigList!=undefined&&item.roomConfigList.length>0">点击查看
									</div>
									<Icon class="row-high-light" v-else type="md-add-circle" size="18" color="#2d8cf0" @click="showModal('roomConfigList',is,index)"></Icon>
									</Col>
								</Row>
							</Form>
							</Col>
						</Row>
					</div>

				</div>
			</div>
		</div>
		<Row type="flex" justify="center">
			<Col>
			<Button @click="returnSteps">上一步</Button>
			<Button type="primary" @click="handleSave">提交</Button>
			</Col>
		</Row>
		<Modal v-model="modal" title="设置" @on-ok="ok" @on-cancel="cancel" width="500">
			<!-- 房|厅|卫 -->
			<Row type="flex" justify="center" align="middle" v-if="modalType=='house'||modalType=='hall'||modalType=='guard'||modalType=='floorAll'">
				<Col span="9">
				将列表中
				<span class="required" v-if="modalType=='house'">房间数</span>
				<span class="required" v-if="modalType=='hall'">客厅数</span>
				<span class="required" v-if="modalType=='guard'">卫生间数</span>
				<span class="required" v-if="modalType=='floorAll'">总楼层数</span>
				统一设置为:
				</Col>
				<Col span="12">
				<Select v-model="unite.roomCount" transfer placeholder="请选择">
					<Option v-if="modalType=='house'" v-for="count in 26" :key="count" :value="String(count)">{{count}}</Option>
					<Option v-if="modalType=='hall'||modalType=='guard'" v-for="count in 11" :key="count" :value="count - 1">{{count-1}}</Option>
					<Option v-if="modalType=='floorAll'" v-for="count in 99" :key="count" :value="count">{{count}}</Option>
				</Select>
				</Col>
			</Row>
			<!-- 建筑面积 -->
			<Row type="flex" justify="center" align="middle" v-if="modalType=='area'">
				<Col span="8">
				将列表中
				<span class="required">建筑面积</span>统一设置为:
				</Col>
				<Col span="12">
				<Input type="text" v-model="unite.houseSpace" placeholder="建筑面积"></Input>
				</Col>
			</Row>
			<!-- 朝向 -->
			<Row type="flex" justify="center" align="middle" v-if="modalType=='direction'">
				<Col span="9">
				将列表中
				<span class="required">朝向</span>统一设置为:
				</Col>
				<Col span="12">
				<Select v-model="unite.direction" transfer placeholder="朝向">
					<Option v-for="(item,index) in directionList" :key="index" :value="String(item.name)">{{item.name}}</Option>
				</Select>
				</Col>
			</Row>
			<!-- 出租状态 -->
			<Row type="flex" justify="center" align="middle" v-if="modalType=='leaseStatus'">
				<Col span="9">
				将列表中
				<span class="required">出租状态</span>统一设置为:
				</Col>
				<Col span="12">
				<Select v-model="unite.leaseStatus" transfer clearable placeholder="请选择">
					<Option v-for="(item,index) in rentalStatus" :value="String(item.leaseStatus)" :key="index">{{ item.name }}</Option>
				</Select>
				</Col>
			</Row>
			<!-- 租金 -->
			<Row type="flex" justify="center" align="middle" v-if="modalType=='rent'">
				<Col span="9">
				将列表中
				<span class="required">租金</span>统一设置为:
				</Col>
				<Col span="12">
				<Input type="text" v-model="unite.rent" placeholder="租金"></Input>
				</Col>
			</Row>
			<!-- 押金 -->
			<Row type="flex" justify="center" align="middle" v-if="modalType=='deposit'">
				<Col span="9">
				将列表中
				<span class="required">押金</span>统一设置为:
				</Col>
				<Col span="12">
				<Input type="text" v-model="unite.deposit" placeholder="押金"></Input>
				</Col>
			</Row>
			<!-- 房屋配置 -->
			<Row type="flex" justify="center" align="middle" v-if="modalType=='roomConfigList'">
				<Col span="9">房屋配置</Col>
				<Col span="12">
				<CheckboxGroup v-model="unite.roomConfigList">
					<Row type="flex" justify="space-between">
						<Col span="8" v-for="(item,index) in  defaultConfigLists" :key="index">
						<Checkbox :label="item.name"></Checkbox>
						</Col>
					</Row>
				</CheckboxGroup>
				</Col>
			</Row>
			<!-- 付款方式 -->
			<Row type="flex" justify="center" align="middle" v-if="modalType=='methods'">
				<Col span="9">
				将列表中
				<span class="required">付款方式</span>统一设置为:
				</Col>
				<Col span="12">
				<Select v-model="unite.payNum" transfer style="width:60px" placeholder="付">
					<Option v-for="count in 12" :value="String(count)" :key="count">{{ count }}</Option>
				</Select>
				<!--  -->
				<Select v-model="unite.mortgageNum" transfer style="width:60px" placeholder="押" @on-change="mortgageNumChange(unite.mortgageNum,'','','public')">
					<Option value="auto">自定义</Option>
					<Option v-for="count in 12" :value="String(count)" :key="count">{{ count }}</Option>
				</Select>
				</Col>
			</Row>
			<!-- 图片上传公共 -->
			<Row type="flex" justify="start" align="middle" v-if="modalType=='roomPicList'">
				<Col span="4">
				<span>图片上传</span>
				</Col>
				<Col span="20">
				<imageUpload :url="$api.FILE_UPLOAD_POST" :uploadButton="'upload'" :maxUploads="20" :defaultList="unite.roomPicList"
				 @on-complete="uploadComplete" @on-remove="uploadRemove" :isPhone="true" :code="figure" @showUploadImg="startRunFun"></imageUpload>
				</Col>
			</Row>
		</Modal>
	</div>
</template>

<script>
	import imageUpload from "../../../components/Helper/Form/image-upload"
	export default {
		components: {
			imageUpload
		},
		data() {
			const checkRoomSpace = (rule, value, callback) => {
				if (value == "" || value == undefined) {
					callback(new Error("房屋面积"));
				} else if (!this.$com.checkNumber(value)) {
					callback(new Error("整数或两位小数"));
				} else if (Number(value) > 500 || Number(value) < 5) {
					callback(new Error("范围5~500"));
				} else {
					callback();
				}
			};
			const checkRent = (rule, value, callback) => {
				if (value == "" || value == undefined) {
					callback(new Error("租金"));
				} else {
					if (this.$com.checkNumber(value)) {
						if (Number(value) > 999999 || Number(value) < 100) {
							callback(new Error("100~999999"));
						} else {
							callback();
						}
					} else {
						callback("输入数字");
					}
				}
			};
			const checkDeposit = (rule, value, callback) => {
				if (value == "" || value == undefined) {
					callback(new Error("押金"));
				} else {
					if (this.$com.checkNumber(value)) {
						if (Number(value) < 999999 && Number(value) > 100) {
							callback();
						} else {
							callback(new Error("数字1到999999"));
						}
					} else {
						callback("输入数字");
					}
				}
			};
			return {
				formDynamicRules: {
					roomSpace: [{
						required: true,
						validator: checkRoomSpace
					}],
					leaseStatus: [{
						required: true,
						message: "出租状态",
						trigger: "change"
					}],
					roomNum: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}],
					parlourNum: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}],
					toiletNum: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}],
					payNum: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}],
					mortgageNum: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}],
					rent: [{
						validator: checkRent,
						trigger: "change"
					}],
					deposit: [{
						validator: checkDeposit,
						trigger: "change"
					}]
				},
				rentalStatus: [{
						name: "未租",
						leaseStatus: "0"
					},
					{
						name: "已租",
						leaseStatus: "2"
					}
				], //出租状态
				payNumDefault: "",
				mortgageNumDefault: "",
				modal: false,
				modalType: "",
				unite: {
					houseSetSingle: "0",
					roomConfigList: [],
					roomPicList: []
				},
				configLists: [],
				defaultConfigLists: [{
						name: 'WIFI'
					},
					{
						name: '空调'
					},
					{
						name: '热水器'
					},
					{
						name: '洗衣机'
					},
					{
						name: '冰箱'
					},
					{
						name: '电视'
					},
					{
						name: '微波炉'
					},
					{
						name: '燃气灶'
					},
					{
						name: '抽油烟机'
					},
					{
						name: '电磁炉'
					},
					{
						name: '床'
					},
					{
						name: '书桌'
					},
					{
						name: '衣柜'
					},
					{
						name: '沙发'
					},
					{
						name: '阳台'
					}
				],
				figure: ""
			}
		},
		props: ["originData"],
		mounted() {
			this.getDefaultRent();
			this.getDefaultConfigs();
		},
		watch: {
			"unite.houseSetSingle"() {
				this.defaultConfigs();
			}
		},
		methods: {
			getDefaultConfigs() {
				this.$ajax.get(
					this,
					this.$api.HOUSE_CONFIG, {}, (res) => {
						let data = res.data.content;
						data.forEach((e, index) => {
							let source = [];
							source = JSON.parse(e.resourceConfig);
							delete e.resourceConfig
							e.configResources = source;
							e.configResources.sort(function(a, b) {
								let value1 = a['sort'];
								let value2 = b['sort'];
								return value1 - value2;
							})
						})
						this.configLists = data;
						this.$forceUpdate();
						data.forEach((item, index) => {
							if (item.isDefault == "01") {
								this.originData.floorsList.forEach(ele => {
									let array = [];
									data[index].configResources.forEach(ele => {
										if (ele.isChecked == '01') {
											array.push(ele.name);
										}
									})
									ele.roomsList.forEach(ele => {
										ele.houseSetSingle = index;
										ele.roomConfigList = array;
									})
								})
							}
						})

					}
				)
			},
			returnSteps() {
				this.$emit("returnCentralSteps")
			},
			handleMassDelPics() {
				this.$ajax.delete(this, this.$api.DELETE_FILE_UPLOAD_BY_CODE + "?codes=" + this.figure, null, res => {});
			},
			defaultConfigs() {
				if (this.unite.houseSetSingle !== "" && this.unite.houseSetSingle != undefined && this.configLists.length > 0) {
					this.unite.roomConfigList = [];
					if (this.configLists && this.configLists.length > 0) {
						this.configLists[this.unite.houseSetSingle].configResources.forEach(ele => {
							if (ele.isChecked == '01') {
								this.unite.roomConfigList.push(ele.name);
							}
						})
					}
				}
			},
			returnConfigsName(query) {
				let flag = true;
				let msg = "";
				if (query !== "" && query != undefined) {
					this.configLists.forEach((ele, index) => {
						if (index == query) {
							flag = true;
							msg = ele.configName;
						}
					})
				} else {
					return "配置";
				}
				if (flag) {
					return msg;
				} else {
					return "配置";
				}
			},
			handleSave() {
				//表单校验
				let flag = true;
				this.$refs['formDynamic'].forEach(item => {
					item.validate(valid => {
						if (!valid) {
							flag = false;
						}
					});
				});
				this.originData.floorsList.forEach(ele => {
					ele.roomsList.forEach(ele => {
						if (ele.roomConfigList&&ele.roomConfigList.length > 0) {
							ele.roomConfigList.forEach((item, index) => {
								if (ele.roomConfigList[index].constructor == String) {
									ele.roomConfigList[index] = {
										name: item
									};
								}
							})
						}
					})
				})
				if (flag) {
					console.log(this.originData);
					this.$ajax.post(
						this,
						this.$api.POST_QUICK_ADD_HOUSE_CENTRAL,
						this.originData,
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
			},
			deleteHouse() {

			},
			uploadComplete(response, filename) {
				let data = response.data.content;
				this.unite.roomPicList =
					this.unite.roomPicList == undefined || this.unite.roomPicList == "" ? [] :
					this.unite.roomPicList;
				this.unite.roomPicList.push({
					picId: data.id,
					picPath: data.path,
					type: "room"
				});
			},
			//得到微信上传的图片
			startRunFun() {
				let count = "";
				this.$ajax.get(
					this,
					this.$api.GET_FILE_UPLOAD_POST.replace("{code}", this.figure), {},
					res => {
						count = res.data.content.length;
						if (count > 0) {
							let data = res.data.content;
							data.forEach(element => {
								element.picPath = element.path;
								element.picId = element.id;
							});
							if (this.unite.roomPicList == undefined || this.unite.roomPicList.length == 0) {
								this.unite.roomPicList = data;
							} else {
								var str = "";
								this.unite.roomPicList.forEach(element => {
									str += element.picId;
								});
								data.forEach(element => {
									if (str.indexOf(element.picId) == -1) {
										this.unite.roomPicList.push(element);
									}
								});
							}
						}
					}
				);
			},
			//删除一张图片
			uploadRemove(item) {
				this.unite.roomPicList.forEach((ele, index) => {
					if (ele.picPath == item.picPath) {
						this.unite.roomPicList.splice(index, 1);
					}
					this.$ajax.delete(this, this.$api.DELETE_FILE_UPLOAD_POST.replace("{code}", this.unite.figure).replace("{id}",
						item.picId), {}, res => {});
				});
			},
			// 查询租金相关
			getDefaultRent() {
				this.$ajax.get(
					this,
					this.$api.RENT_RELATED, {},
					(res) => {
						this.payNumDefault = res.data != null && res.data.content.rent ? res.data.content.rent : "";
						this.mortgageNumDefault = res.data != null && res.data.content.deposit ? res.data.content.deposit : "";
						this.$forceUpdate();
						this.originData.floorsList.forEach(ele => {
							ele.roomsList.forEach(ele => {
								ele.payNum = this.payNumDefault != "" ? String(this.payNumDefault) : "3";
								ele.mortgageNum = this.mortgageNumDefault != "" ? String(this.mortgageNumDefault) : "1";
								ele.isDisabled = true;
							})
						})
						console.log("==-=-=-=-",this.originData,this.payNumDefault,this.mortgageNumDefault)
					}
				)
			},
			calculatingRent(count, index) {
				this.$forceUpdate();
				this.originData.floorsList.forEach((item, is) => {
					if (count == is) {
						item.roomsList.forEach((ele, it) => {
							if (it == index) {
								if (
									!this.$com.isBlank(ele.roomSpace) &&
									!this.$com.isBlank(ele.squareMeterMonthlyRent) &&
									this.$com.checkNumber(ele.squareMeterMonthlyRent) &&
									this.$com.checkNumber(ele.roomSpace)
								) {
									ele.rent = String((Number(ele.roomSpace) * Number(ele.squareMeterMonthlyRent)).toFixed("2"));
									if (ele.mortgageNum != 'auto') {
										this.rentChange(count, index);
									}
								} else {
									ele.rent = "";
								}
							}
						})
					}
				});
			},
			rentChange(count, index) {
				this.$forceUpdate();
				this.originData.floorsList.forEach((item, is) => {
					if (count == is) {
						item.roomsList.forEach((ele, it) => {
							if (it == index) {
								if (
									!this.$com.isBlank(ele.rent) &&
									!this.$com.isBlank(ele.mortgageNum) &&
									ele.mortgageNum != "auto" &&
									this.$com.checkNumber(ele.rent)
								) {
									ele.deposit = String((Number(ele.mortgageNum) * Number(ele.rent)).toFixed("2"));
								} else {
									ele.deposit = "";
								}
							}
						})
					}
				});

			},
			mortgageNumChange(query, count, index, isPublic) {
				this.$forceUpdate();
				if (!isPublic) {
					if (query == "auto") {
						this.originData.floorsList.forEach((item, is) => {
							if (count == is) {
								item.roomsList.forEach((ele, it) => {
									if (it == index) {
										ele.isDisabled = false;
										ele.deposit = "";
									}
								})
							}
						});
					} else {
						this.originData.floorsList.forEach((item, is) => {
							if (count == is) {
								item.roomsList.forEach((ele, it) => {
									if (it == index) {
										if (ele.rent != "" && ele.mortgageNum != "auto" && this.$com.checkNumber(ele.rent)) {
											ele.deposit = String(
												(Number(ele.mortgageNum) * Number(ele.rent)).toFixed('2')
											);
										} else {
											ele.deposit = "";
										}
									}
								})
							}
						});
					}
				} else {
					if (query == "auto") {
						this.originData.floorsList.forEach((item, is) => {
							item.roomsList.forEach((ele, index) => {
								ele.isDisabled = false;
								ele.deposit = "";
							})
						});
					} else {
						console.log(this.originData.floorsList);
						this.originData.floorsList.forEach((item, is) => {
							item.roomsList.forEach((ele, index) => {
								ele.isDisabled = true;
								if (!this.$com.isBlank(ele.rent) && query != "auto" && this.$com.checkNumber(query)) {
									ele.deposit = String((Number(query) * Number(ele.rent)).toFixed('2'));
								} else {
									ele.deposit = "";
								}
							})
						});
					}
				}
			},
			ok() {
				if (this.modalType == "house") {
					this.saveModalValueToData("roomCount", "roomNum");
				} else if (this.modalType == "hall") {
					this.originData.floorsList.forEach((item, is) => {
						item.roomsList.forEach((ele, index) => {
							ele.parlourNum = String(this.unite.roomCount);
						})
					});
					this.unite.roomCount = "";
				} else if (this.modalType == "guard") {
					this.originData.floorsList.forEach((item, is) => {
						item.roomsList.forEach((ele, index) => {
							ele.toiletNum = String(this.unite.roomCount);
						})
					});
					this.unite.roomCount = "";
				} else if (this.modalType == "elevator") {
					this.saveModalValueToData("isElevator", "elevator");
				} else if (this.modalType == "direction") {
					this.saveModalValueToData("direction", "direction");
				} else if (this.modalType == "leaseStatus") {
					this.saveModalValueToData("leaseStatus", "leaseStatus");
				} else if (this.modalType == "rent") {
					this.originData.floorsList.forEach((item, is) => {
						item.roomsList.forEach((item, index) => {
							item.rent = this.unite.rent;
							if (
								item.mortgageNum != undefined &&
								item.mortgageNum != "auto" &&
								item.mortgageNum != "" &&
								this.unite.rent != "" &&
								this.unite.rent != undefined &&
								/^\d+$/.test(this.unite.rent)
							) {
								item.deposit = String(this.unite.rent * item.mortgageNum);
							} else {
								item.deposit = "";
							}
						})
					});
					this.unite.rent = "";
				} else if (this.modalType == "deposit") {
					this.depositDisabled = false;
					this.saveModalValueToData("deposit", "deposit");
				} else if (this.modalType == "methods") {
					this.originData.floorsList.forEach((item, is) => {
						item.roomsList.forEach((item, index) => {
							item.payNum = this.unite.payNum;
							item.mortgageNum = this.unite.mortgageNum;
							item.isDisabled = this.unite.mortgageNum == "auto" ? false : true;
						})
					});
				} else if (this.modalType == "roomConfigList") {
					if (this.modalParentIndex != undefined) {
						this.originData.floorsList.forEach((item, is) => {
							if (is == this.modalParentIndex) {
								item.roomsList.forEach((ele, index) => {
									if (index == this.modalChildrenIndex) {
										ele.roomConfigList = this.unite.roomConfigList;
									}
								})
							}
						});
					} else {
						this.originData.floorsList.forEach((item, is) => {
							item.roomsList.forEach((ele, index) => {
								ele.roomConfigList = this.unite.roomConfigList;
							})
						});
					}
				} else if (this.modalType == "roomPicList") {
					this.saveModalValueToData("roomPicList", "roomPicList");
					this.handleMassDelPics();
				} else if (this.modalType == "housePicList") {
					if (this.modalParentIndex != undefined) {
						this.originData.floorsList.forEach((item, is) => {
							if (is == this.modalParentIndex) {
								item.roomsList.forEach((item, index) => {
									if (index == this.modalChildrenIndex) {
										item.housePicList = this.unite.roomPicList;
									}
								})
							}
						});
					} else {
						this.originData.floorsList.forEach((item, is) => {
							item.roomsList.forEach((item, index) => {
								this.housePicList[items] = this.unite.roomPicList;
							})
						});
					}
					this.unite.housePicList = [];
				}
			},
			saveModalValueToData(ModalData, ItemData) {
				if (this.modalParentIndex != undefined) {
					this.originData.floorsList.forEach((item, is) => {
						if (is == this.modalParentIndex) {
							item.roomsList.forEach((item, index) => {
								if (index == this.modalChildrenIndex) {
									item[ItemData] = this.unite[ModalData];
								}
							})
						}
					});
				} else {
					this.originData.floorsList.forEach((item, is) => {
						item.roomsList.forEach((item, index) => {
							item[ItemData] = this.unite[ModalData];
						})
					});
					console.log(this.originData, ItemData, this.unite[ModalData])
				}
				if (ItemData == "roomPicList" || ItemData == "housePicList") {
					this.unite[ModalData] = [];
				} else {
					this.unite[ModalData] = "";
				}
			},
			cancel() {
				this.modal = false;
				this.handleMassDelPics();
			},
			showModal(name, it, index) {
				this.modalType = name;
				this.modal = true;
				this.modalParentIndex = it;
				this.modalChildrenIndex = index;
				if (name == "roomConfigList") {
					this.unite.roomConfigList = [];
					if (this.modalParentIndex != undefined && this.modalChildrenIndex != undefined) {
						this.originData.floorsList.forEach((item, is) => {
							if (is == this.modalParentIndex) {
								item.roomsList.forEach((item, index) => {
									if (index == this.modalChildrenIndex) {
										this.unite.roomConfigList = item.roomConfigList;
									}
								})
							}
						});
					}
				} else if (name == "roomPicList") {
					this.$ajax.get(this, this.$api.GET_FILE_UPLOAD_CODE_GET, {}, res => {
						this.figure = res.data.content.code;
					});
					if (this.modalParentIndex != undefined && this.modalChildrenIndex != undefined) {
						this.originData.floorsList.forEach((item, is) => {
							if (is == this.modalParentIndex) {
								item.roomsList.forEach((item, index) => {
									if (index == this.modalChildrenIndex) {
										this.unite.roomPicList = item.roomPicList;
									}
								})
							}
						});
					}
				}
			}
		}
	}
</script>
<style>
	.centeralDetail .ivu-form-item {
		margin: 0;
	}
</style>
<style scoped>
	.centeralDetail {
		overflow: auto;
	}

	.formList .header {
		background: rgb(249, 248, 248);
		height: 50px;
		line-height: 50px;
		margin-bottom: 15px;
		border: 1px solid #e8eaec;
		padding: 0 5px;
	}

	.formData {
		background: white;
		height: 50px;
		line-height: 50px;
		margin-bottom: 15px;
		border: 1px solid #e8eaec;
		padding: 0 5px;
	}

	.header>div,
	.formData>div {
		text-align: center;
	}

	.formList .header .large,
	.formList .header .middle,
	.formList .header .small,
	.formList .header .supSmall {
		padding: 0px;
		margin: 0px;
	}

	.formList {
		margin-bottom: 10px;
		width: 1205px;
		font-size: 12px;
		padding: 10px 0 0 0;
	}

	.required {
		color: red;
	}

	.row-high-light {
		text-align: center;
		color: #2d8cf0;
		cursor: pointer;
	}
</style>
