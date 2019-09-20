<template>
	<div>
		<Card dis-hover :bordered="false">
			<Form ref="bookingHouse" :model="bookingHouse" :rules="bookingHouseRule" :label-width="80">
				<Row :gutter="30">
					<Col span="6">
					<FormItem label="意向客户" prop="name">
						<Select v-model="bookingHouse.name" @on-change="houseChange" filterable remote :remote-method="remoteMethodCustomer"
						 :loading="loading">
							<Option v-for="(option, index) in customerLists" :value="option.label" :key="index">{{option.label}}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="6">
					<FormItem prop="checkDate" label="看房时间">
						<DatePicker type="date" v-model="bookingHouse.checkDate" format="yyyy-MM-dd" placeholder="看房时间" @on-change="getCheckDate"></DatePicker>
					</FormItem>
					</Col>
					<Col span="6">
					<FormItem prop="roomAddress_l" label="房源地址">
						<Input type="text" v-model="bookingHouse.roomAddress_l" placeholder="房源地址">
						</Input>
					</FormItem>
					</Col>
					<Col span="6">
					<FormItem prop="seeHouseStatus" label="看房状态">
						<Select v-model="bookingHouse.seeHouseStatus" placeholder="看房状态" clearable>
							<Option :value="item.value" v-for="(item,index) in seeHouseStatusLists" :key="index">{{item.name}}</Option>
						</Select>
					</FormItem>
					</Col>
				</Row>
				<Row type="flex" justify="end">
					<Col>
					<Button type="primary" @click="handleSearch('bookingHouse')">查询</Button>
					<Button type="default" @click="handleReset('bookingHouse')">重置</Button>
					<Button type="primary" @click="addBooking=true">+新增预约</Button>
					</Col>
				</Row>
			</Form>
			<ActiveTable :showTitle="true" :columns="listColumn" :data="listData" :pageSize="params.pageSize" :current="params.pageNo"
			 :total="totalRows" @on-page-change="changePage" />
			<Modal v-model="addBooking" title="新增预约" @on-cancel="cancel">
				<Form ref="addBookingData" :model="addBookingData" :rules="ruleCreateHouse" :label-width="90" class="createForm">
					<!-- 公寓名称 -->
					<div class="containerFlow">
						<Row>
							<Col span="24">
							<FormItem label="预约房源" prop="roomId">
								<Select v-model="addBookingData.roomId" @on-change="houseChange" filterable remote :remote-method="remoteMethod1"
								 :loading="loading" clearable>
									<Option v-for="(option, index) in houseAddressList" :value="option.value" :key="index">{{option.label}}</Option>
								</Select>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span="12">
							<FormItem label="看房时间" prop="checkDate">
								<DatePicker type="date" :options="optionsTime" v-model="addBookingData.checkDate" format="yyyy-MM-dd"
								 placeholder="看房时间"></DatePicker>
							</FormItem>
							</Col>
							<Col span="12">
							<FormItem label="看房时间段" prop="checkTime">
								<TimePicker type="timerange" placeholder="看房时间段" v-model="addBookingData.checkTime"></TimePicker>
							</FormItem>
							</Col>
							<Col span="12">
							<FormItem label="预约人姓名" prop="name">
								<Input v-model="addBookingData.name" placeholder="预约人姓名" />
							</FormItem>
							</Col>
							<Col span="12">
							<FormItem label="预约人手机号" prop="mobile" :label-width="100">
								<Input v-model="addBookingData.mobile" placeholder="预约人手机号" />
							</FormItem>
							</Col>
							<Col span="12">
							<FormItem prop="certType" label="证件类型">
								<Select v-model="addBookingData.certType" placeholder="请选择" clearable>
									<Option :value="item.code" v-for="(item,index) in certTypeLists" :key="index">{{item.name}}</Option>
								</Select>
							</FormItem>
							</Col>
							<Col span="12">
							<FormItem prop="certNo" class="certNo">
								<Input type="text" v-model="addBookingData.certNo" placeholder="证件编号">
								</Input>
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
			<Modal v-model="modalResult" title="看房结果登记" @on-cancel="cancelSeeHouseResult('resultData')">
				<Form ref="resultData" :model="resultData" :rules="resultDataRule" :label-width="80">
					<Row>
						<Col span="13">
						<FormItem prop="seeHouseStatus" label="看房状态">
							<Select v-model="resultData.seeHouseStatus" placeholder="看房状态" clearable>
								<Option :value="item.value" v-for="(item,index) in seeHouseStatusLists" :key="index">{{item.name}}</Option>
							</Select>
						</FormItem>
						</Col>
						<Col span="24">
						<FormItem prop="seeHouseStatusResult" label="看房结果">
							<Input v-model="resultData.seeHouseStatusResult" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="看房结果"></Input>
						</FormItem>
						</Col>
					</Row>
				</Form>
				<div slot="footer">
					<Button type="default" @click="cancelSeeHouseResult('resultData')">取消</Button>
					<Button type="primary" @click="addSeeHouseResult('resultData')">确认</Button>
				</div>
			</Modal>
			<Modal v-model="showDetail" title="登记看房结果">
				<Row type="flex" :gutter="10" class-name="detail">
					<Col span="4">预约房源地址</Col>
					<Col span="20">{{detailData.roomAddress}}</Col>
				</Row>
				<Row type="flex" :gutter="10" class-name="detail">
					<Col span="4">看房时间</Col>
					<Col span="20">{{detailData.checkDate}} {{detailData.checkTime}} </Col>
				</Row>
				<Row type="flex" :gutter="10" class-name="detail">
					<Col span="4">预约人</Col>
					<Col span="20">{{detailData.name}} {{detailData.mobile}}</Col>
				</Row>
				<Row type="flex" :gutter="10" class-name="detail">
					<Col span="4">预约人证件</Col>
					<Col span="20">{{detailData.certNo}} （{{detailData.certType=="0"?"身份证":detailData.certType=="1"?"护照":detailData.certType=="2"?"台胞证":detailData.certType=="3"?"港澳通行证":"暂无类型"}}）</Col>
				</Row>
				<Divider dashed />
				<Row type="flex" :gutter="10" class-name="detail">
					<Col span="4">看房状态</Col>
					<Col span="20">{{detailData.seeHouseStatus=="0"?"未看房":"已看房"}}</Col>
				</Row>
				<Row type="flex" :gutter="10" class-name="detail">
					<Col span="4">看房服务人</Col>
					<Col span="20">{{detailData.operator||"暂无"}}{{detailData.operatorPhone?'/'+detailData.operatorPhone:detailData.operatorPhone}}</Col>
				</Row>
				<Row type="flex" :gutter="10" class-name="detail">
					<Col span="4">看房结果</Col>
					<Col span="20">{{detailData.seeHouseStatusResult || "暂无"}}</Col>
				</Row>
				<div slot="footer">
					<Button type="primary" @click="showDetail=false">确认</Button>
				</div>
			</Modal>
		</Card>
	</div>
</template>
<script>
	import ActiveTable from '@/components/Helper/Table/ActiveTable';
	export default {
		components: {
			ActiveTable,
		},
		data() {
			const validatePhone = (rule, value, callback) => {
				if (value != "" && value != undefined) {
					if (!(/^1[34578]\d{9}$/.test(value))) {
						callback(new Error('预约人手机号格式有误!'));
					} else {
						callback();
					}
				} else {
					callback(new Error("请输入预约人手机号"));
				}
			};
			const validateIdCard = (rule, value, callback) => {
				if (this.addBookingData.certType != "" && this.addBookingData.certType != undefined) {
					let certType = this.addBookingData.certType;
					let partern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
					let message = "";
					switch (certType) {
						case "0":
							partern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
							message = "身份证号格式有误！";
							break;
						case "1":
							partern = /^([a-zA-z]|[0-9]){5,17}$/;
							message = "护照格式有误！";
							break;
						case "2":
							partern = /^[a-zA-Z][0-9]{9}$/;
							message = "台胞证格式有误！";
							break;
						case "3":
							partern = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/;
							message = "港澳通行证格式有误！";
							break;
						default:
							break;
					}
					if (!partern.test(value)) {
						callback(new Error(message));
					} else {
						callback();
					}
				} else {
					callback(new Error("请选择证件类型"));
				}
			};

			return {
				optionsTime: {
					disabledDate(time) {
						return time.getTime() < new Date(new Date().toLocaleDateString()).getTime();
					}
				},
				bookingHouse: {

				},
				bookingHouseRule: {

				},
				seeHouseStatusLists: [{
						name: "未看房",
						value: "0"
					},
					{
						name: "已看房",
						value: "1"
					}
				],
				params: {
					pageNo: '1',
					pageSize: "10"
				},
				lists: [],
				certTypeLists: [{
						name: '身份证',
						code: "0"
					}, {
						name: "护照",
						code: "1"
					}, {
						name: "台胞证",
						code: "2"
					},
					{
						name: "港澳通行证",
						code: "3"
					}
				],
				totalRows: 0,
				modalResult: false,
				showDetail: false,
				detailData: {},
				listColumn: [{
						title: '预约房源地址',
						key: 'roomAddress',
					},
					{
						title: '看房人',
						width: 120,
						render: (h, params) => {
							return h('div', [
								h('div', {}, params.row.name),
								h('div', {}, params.row.mobile)
							])
						}
					},
					{
						title: '看房时间',
						width: 140,
						key: 'checkDate',
						render: (h, params) => {
							return h('div', [
								h('div', {}, params.row.checkDate),
								h('div', {}, params.row.checkTime)
							])
						}
					},
					{
						title: '看房状态',
						width: 120,
						render: (h, params) => {
							let status = params.row.seeHouseStatus == "0" ? '未看房' : "已看房";
							return h('div', {}, status)
						}
					},
					{
						title: '看房结果',
						key: 'seeHouseStatusResult'
					},
					{
						title: '操作',
						width: 180,
						render: (h, params) => {
							let show = h('Button', {
								props: {
									type: 'primary',
									size: 'small'
								},
								on: {
									click: () => {
										this.showDetail = true;
										this.detailData = params.row;
									}
								}
							}, '查看');
							let opeation = h('Button', {
								props: {
									size: 'small'
								},
								style: {
									marginLeft: '5px'
								},
								on: {
									click: () => {
										this.modalResult = true;
										this.resultData.id = params.row.id;
									}
								}
							}, '看房结果登记');
							let opeationArray = params.row.seeHouseStatusResult == null ? [show, opeation] : [show];
							return h('div', opeationArray);
						}
					}
				],
				listData: [],
				addBooking: false,
				houseAddressList: [],
				addBookingData: {

				},
				ruleCreateHouse: {
					roomId: [{
						required: true,
						message: "请选择预约房源",
						trigger: 'change'
					}],
					name: [{
						required: true,
						message: "输入预约人姓名",
						trigger: 'blur'
					}],
					mobile: [{
						required: true,
						validator: validatePhone,
						trigger: 'blur'
					}],
					checkDate: [{
						required: true,
						message: "请选择预约时间",
						trigger: 'change',
						type: 'date'
					}],
					checkTime: [{
						required: true,
						type: "array",
						fields: {
							0: {
								required: true,
								message: '选择预约开始时间',
								trigger: 'change'
							},
							1: {
								required: true,
								message: '选择预约结束时间',
								trigger: 'change'
							}
						}
					}],
					certType: [{
						required: true,
						message: "请选择证件类型",
						trigger: 'change'
					}],
					certNo: [{
						required: true,
						validator: validateIdCard,
						trigger: 'change'
					}],
				},
				customerLists: [],
				loading: false,
				resultData: {},
				resultDataRule: {
					seeHouseStatus: [{
						required: true,
						message: "请选择看房状态",
						trigger: 'change'
					}],
					seeHouseStatusResult: [{
						required: true,
						message: "请输入看房结果",
						trigger: 'change'
					}]
				}
			}
		},
		mounted() {
			//租客列表
			this.handleSearch();
		},
		methods: {
			remoteMethod1(query) {
				if (query !== '') {
					this.loading = true;
					this.$ajax.get(this, this.$api.GET_HOUSE_ADDRESS_LIKE_SEEHOUSE +
						"?houseKind_in=2,3,4&leaseStatus_in=0,1&showName_l=" + query, {}, (res) => {
							setTimeout(() => {
								this.loading = false;
								const houseAddressList = res.data.content.map(item => {
									return {
										value: item.id,
										label: item.showName,
										houseId: item.houseId
									};
								});
								this.houseAddressList = houseAddressList.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) >
									-1);
							}, 200);
						});

				} else {
					this.houseAddressList = [];
				}

			},
			remoteMethodCustomer(query) {
				if (query !== '') {
					this.loading = true;
					this.$ajax.get(this, this.$api.GET_INTENTION_CUSTOMERS +
						"?mark=" + query, {}, (res) => {
							setTimeout(() => {
								this.loading = false;
								const customerLists = res.data.content.map(item => {
									return {
										value: item.id,
										label: item.name
									};
								});
								this.customerLists = customerLists.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
							}, 200);
						});

				} else {
					this.customerLists = [];
				}
			},
			getCheckDate() {
				this.bookingHouse.checkDate = arguments[0];
			},
			houseChange() {
				this.houseAddressList.forEach(ele => {
					if (ele.id = this.addBookingData.roomId) {
						this.addBookingData.houseId = ele.houseId;
						this.addBookingData.roomAddress = ele.label;
					}
				})
			},
			handleSearch() {
				let str = "?pageNo=" + this.params.pageNo + "&pageSize=" + this.params.pageSize
				for (let i in this.bookingHouse) {
					if (this.bookingHouse[i] == "" || this.bookingHouse[i] == undefined) {
						delete this.bookingHouse[i];
					} else {
						str += "&" + i + "=" + this.bookingHouse[i];
					}
				}
				this.$ajax.get(this, this.$api.GET_BOOKING_LIST + str, null,
					res => {
						this.totalRows = res.data.totalRows;
						this.listData = res.data.content;
					});
			},
			handleReset() {
				this.bookingHouse = {};
				this.params.pageNo = 1;
				this.params.pageSize = 10;
				this.handleSearch();
			},
			pageChange(val) {
				this.params.pageNo = val;
				this.handleSearch();
			},
			pageSizeChange(val) {
				this.params.pageSize = val;
				this.handleSearch();
			},
			formateDate(d) {
				let month = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
				let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
				const newDate = d.getFullYear() + '-' + month + '-' + day;
				return newDate;
			},
			ok() {
				this.$refs["addBookingData"].validate(valid => {
					if (valid) {
						let formDatas = JSON.parse(JSON.stringify(this.addBookingData));
						formDatas.checkDate = this.formateDate(this.addBookingData.checkDate);
						formDatas.checkTime = this.addBookingData.checkTime[0] + "~" + this.addBookingData.checkTime[1];
						this.$ajax.post(this, this.$api.POST_BOOKING_ITEM, formDatas, res => {
							if (res.code == "200") {
								this.$Message.success("新增成功");
								this.$refs["addBookingData"].resetFields();
								this.addBooking = false;
								this.handleSearch();
							} else {
								this.$Message.error(res.msg);
							}
						});
					}
				});
			},
			addSeeHouseResult(name) {
				this.$refs[name].validate(valid => {
					if (valid) {
						this.$ajax.put(this, this.$api.PUT_BOOKING_ADD_RESULT.replace("{id}", this.resultData.id), this.resultData,
							res => {
								if (res.code == "200") {
									this.$Message.success("登记结果成功");
									this.$refs[name].resetFields();
									this.modalResult = false;
									this.handleSearch();
								} else {
									this.$Message.error(res.msg);
								}
							});
					}
				});
			},
			cancelSeeHouseResult(name) {
				this.$refs[name].resetFields();
				this.modalResult = false;
			},
			cancel() {
				this.$refs["addBookingData"].resetFields();
				this.addBooking = false;
			}
		}
	}
</script>
<style>
	.certNo .ivu-form-item-content {
		margin: 0 !important;
	}
</style>
<style scoped>
	.formColor {
		padding: 20px;
		margin: 10px 0;
	}

	.page {
		margin-top: 20px;
		text-align: center;
	}

	.detail {
		margin-bottom: 5px;
	}

	.detail div:first-of-type {
		text-align: right;
	}
</style>
