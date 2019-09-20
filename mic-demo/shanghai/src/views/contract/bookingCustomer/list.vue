<template>
	<div>
		<Card dis-hover :bordered="true">
			<Form ref="bookingHouse" :model="bookingHouse" :rules="bookingHouseRule" :label-width="80">
				<Row :gutter="30" type="flex" justify="start">
					<Col span="6">
					<FormItem label="意向客户" prop="name">
						<Select v-model="bookingHouse.name" @on-change="houseChange" filterable remote :remote-method="remoteMethodCustomer"
						 :loading="loading">
							<Option v-for="(option, index) in customerLists" :value="option.label" :key="index">{{option.label}}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="6">
					<FormItem prop="checkDate" label="客户证件号">
						<Input type="text" v-model="bookingHouse.certNo_l" placeholder="客户证件号">
						</Input>
					</FormItem>
					</Col>
					<Col span="6">
					<FormItem prop="mobile" label="手机号">
						<Input type="text" v-model="bookingHouse.phone_l" placeholder="手机号">
						</Input>
					</FormItem>
					</Col>
				</Row>
			</Form>
			<Row type="flex" justify="end">
				<Col>
				<Button type="primary" @click="handleSearch('bookingHouse')">查询</Button>
				<Button type="default" @click="handleReset('bookingHouse')">重置</Button>
				<Button type="primary" @click="showAddModal">+添加意向客户</Button>
				</Col>
			</Row>
			<ActiveTable :showTitle="true" :columns="listColumn" :data="listData" :pageSize="params.pageSize" :current="params.pageNo"
			 :total="totalRows" @on-page-change="pageChange" />
			<!-- <Table :columns="listColumn" :data="listData" border></Table>
			<div class="page">
				<Page :total="totalRows" show-sizer show-total @on-change="pageChange" @on-page-size-change="pageSizeChange" />
			</div> -->
			<Modal v-model="addBooking" title="新增意向客户 " @on-cancel="cancel">
				<Form ref="addBookingData" :model="addBookingData" :rules="ruleCreateHouse" :label-width="100" class="createForm">
					<!-- 公寓名称 -->
					<div class="containerFlow">
						<Row>
							<Col span="12">
							<FormItem label="客户姓名" prop="name">
								<Input v-model="addBookingData.name" placeholder="客户姓名" />
							</FormItem>
							</Col>
							<Col span="12">
							<FormItem label="客户手机号" prop="phone">
								<Input v-model="addBookingData.phone" placeholder="客户手机号" />
							</FormItem>
							</Col>
							<Col span="12">
							<FormItem label="性别" prop="sex" class="ivu-form-item-required">
								<RadioGroup v-model="addBookingData.sex">
									<Radio label="0">
										<span>男</span>
									</Radio>
									<Radio label="1">
										<span>女</span>
									</Radio>
								</RadioGroup>
							</FormItem>
							</Col>
							<Col span="12">
							<FormItem prop="certNo" label="身份证号码">
								<Input type="text" v-model="addBookingData.certNo" placeholder="证件编号">
								</Input>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span="24">
							<FormItem label="身份证正面" class="ivu-form-item-required">
								<imageUpload :url="$api.FILE_UPLOAD_POST" :uploadButton="'upload1'" :maxUploads="1" :defaultList="defaultList0"
								 @on-complete="uploadComplete0" @on-remove="uploadRemove0" :isPhone="true" :code="figure[0]" @showUploadImg="startRunFun('0')"></imageUpload>
							</FormItem>
							</Col>
							<Col span="24">
							<FormItem label="身份证背面" class="ivu-form-item-required">
								<imageUpload :url="$api.FILE_UPLOAD_POST" :uploadButton="'upload2'" :maxUploads="1" :defaultList="defaultList1"
								 @on-complete="uploadComplete1" @on-remove="uploadRemove1" :isPhone="true" :code="figure[1]" @showUploadImg="startRunFun('1')"></imageUpload>
							</FormItem>
							</Col>
							<Col span="24">
							<FormItem label="手持半身" class="ivu-form-item-required">
								<imageUpload :url="$api.FILE_UPLOAD_POST" :uploadButton="'upload3'" :maxUploads="1" :defaultList="defaultList2"
								 @on-complete="uploadComplete2" @on-remove="uploadRemove2" :isPhone="true" :code="figure[2]" @showUploadImg="startRunFun('2')"></imageUpload>
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
			<Modal v-model="modalResult" title="登记跟进" @on-cancel="cancelSeeHouseResult('resultData')">
				<Form ref="resultData" :model="resultData" :rules="resultDataRule" :label-width="80">
					<Row>
						<Col span="14">
						<FormItem prop="eventType" label="事件类型">
							<Select v-model="resultData.eventType" placeholder="事件类型" clearable disabled>
								<Option :value="item.value" v-for="(item,index) in eventTypeLists" :key="index">{{item.name}}</Option>
							</Select>
						</FormItem>
						</Col>
						<Col span="14">
						<FormItem prop="eventTime" label="事件时间">
							<DatePicker type="date" :options="optionsTime" v-model="resultData.eventTime" format="yyyy-MM-dd" placeholder="事件时间"></DatePicker>
						</FormItem>
						</Col>
						<Col span="14">
						<FormItem prop="roomAddress" label="地址">
							<Input v-model="resultData.roomAddress" type="input" placeholder="地址"></Input>
						</FormItem>
						</Col>
						<Col span="24">
						<FormItem prop="seeHouseStatusResult" label="跟进结果">
							<Input v-model="resultData.seeHouseStatusResult" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="跟进结果"></Input>
						</FormItem>
						</Col>
					</Row>
				</Form>
				<div slot="footer">
					<Button type="default" @click="cancelSeeHouseResult('resultData')">取消</Button>
					<Button type="primary" @click="addSeeHouseResult('resultData')">确认</Button>
				</div>
			</Modal>
		</Card>
	</div>
</template>
<script>
	import imageUpload from "../../../components/Helper/Form/image-upload";
	import ActiveTable from '@/components/Helper/Table/ActiveTable';
	export default {
		components: {
			ActiveTable,
			imageUpload
		},
		data() {
			const validatePhone = (rule, value, callback) => {
				if (value != "" && value != undefined) {
					if (!(/^1[34578]\d{9}$/.test(value))) {
						callback(new Error('客户手机号格式有误!'));
					} else {
						callback();
					}
				} else {
					callback(new Error("请输入客户手机号"));
				}
			};
			const validateIdCard = (rule, value, callback) => {
				if (value != "" && value != undefined) {
					if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
						callback(new Error('身份证号码不合法'));
					} else {
						callback();
					}
				} else {
					callback(new Error('请输入身份证号码'));
				}
			};
			return {
				bookingHouse: {

				},
				bookingHouseRule: {

				},
				optionsTime: {
					disabledDate(time) {
						return time.getTime() > new Date(new Date().toLocaleDateString()).getTime();
					}
				},
				eventTypeLists: [{
					name: "随访",
					value: "1"
				}],
				params: {
					pageNo: 1,
					pageSize: 10,
				},
				lists: [],
				figure: [],
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
				detailData: {},
				listColumn: [{
						title: '意向客户',
						width: 220,
						key: 'name',
					},
					{
						title: '性别',
						key: 'sex',
						width: 220,
						render: (h, params) => {
							let msg = params.row.sex == '0' ? "男" : "女";
							return h('div', {}, msg)
						}
					},
					{
						title: '手机号',
						width: 220,
						key: 'phone'
					},
					{
						title: '证件信息',
						key: 'certNo'
					},
					{
						title: '操作',
						width: 180,
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										size: 'small'
									},
									on: {
										click: () => {
											this.$router.push({
												name: 'bookingCustomer/detail',
												query: {
													id: params.row.id
												}
											})
										}
									}
								}, '查看'),
								h('Button', {
									props: {
										type: 'primary',
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
								}, '登记跟进记录')
							]);
						}
					}
				],
				listData: [],
				addBooking: false,
				houseAddressList: [],
				addBookingData: {
					sex: "0"
				},
				ruleCreateHouse: {
					name: [{
						required: true,
						message: "输入姓名",
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						validator: validatePhone,
						trigger: 'blur'
					}],
					certNo: [{
						required: true,
						validator: validateIdCard,
						trigger: 'change'
					}]
				},
				customerLists: [],
				loading: false,
				resultData: {
					eventType: "1"
				},
				resultDataRule: {
					eventType: [{
						required: true,
						message: "请选择事件类型",
						trigger: 'change'
					}],
					eventTime: [{
						required: true,
						type: 'date',
						message: "请选择事件时间",
						trigger: 'change'
					}],
					seeHouseStatusResult: [{
						required: true,
						message: "请输入看房结果",
						trigger: 'change'
					}],
					roomAddress: [{
						// required: true,
						message: "请输入地址",
						trigger: 'change'
					}]
				},
				defaultList0: [],
				defaultList1: [],
				defaultList2: []

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
						"?showName_l=" + query, {}, (res) => {
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
			showAddModal() {
				this.addBooking = true;
				this.$ajax.get(
					this,
					this.$api.GET_FILE_UPLOAD_CODE_GET + "?number=3", {},
					res => {
						let codeStrings = res.data.content.code;
						let codeArray = codeStrings.split(",");
						this.figure = codeArray;
					}
				);
			},
			//上传成功
			uploadComplete0(response, filename) {
				let data = response.data.content;
				this.defaultList0.push({
					picId: data.id,
					picPath: data.path,
					type: "1"
				});
			},
			uploadComplete1(response, filename) {
				let data = response.data.content;
				this.defaultList1.push({
					picId: data.id,
					picPath: data.path,
					type: "0"
				});
			},
			uploadComplete2(response, filename) {
				let data = response.data.content;
				this.defaultList2.push({
					picId: data.id,
					picPath: data.path,
					type: "2"
				});
			},
			uploadRemove0(item) {
				this.defaultList0.forEach((ele, index) => {
					if (ele.picPath == item.picPath) {
						this.defaultList0.splice(index, 1);
					}
					this.$ajax.delete(this, this.$api.DELETE_FILE_UPLOAD_POST.replace("{code}", this.figure[0]).replace("{id}",
						item.picId), {}, res => {});
				});
			},
			uploadRemove1(item) {
				this.defaultList1.forEach((ele, index) => {
					if (ele.picPath == item.picPath) {
						this.defaultList1.splice(index, 1);
					}
					this.$ajax.delete(this, this.$api.DELETE_FILE_UPLOAD_POST.replace("{code}", this.figure[1]).replace("{id}",
						item.picId), {}, res => {});
				});
			},
			uploadRemove2(item) {
				this.defaultList2.forEach((ele, index) => {
					if (ele.picPath == item.picPath) {
						this.defaultList2.splice(index, 1);
					}
					this.$ajax.delete(this, this.$api.DELETE_FILE_UPLOAD_POST.replace("{code}", this.figure[2]).replace("{id}",
						item.picId), {}, res => {});
				});
			},
			startRunFun(query) {
				let count = "";
				this.$ajax.get(
					this,
					this.$api.GET_FILE_UPLOAD_POST.replace("{code}", this.figure[query]), {},
					res => {
						count = res.data.content.length;
						if (count > 0) {
							let data = res.data.content;
							data.forEach(element => {
								element.picPath = element.path;
								element.picId = element.id;
							});
							if (this['defaultList' + query].length == 0) {
								this['defaultList' + query] = data;
							} else {
								var str = "";
								this['defaultList' + query].forEach(element => {
									str += element.picId;
								});
								data.forEach(element => {
									if (str.indexOf(element.picId) == -1) {
										this['defaultList' + query].push(element);
									}
								});
							}
						}
					}
				);
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
				this.$ajax.get(this, this.$api.GET_INTENTION_CUSTOMERS_LIST + str, null,
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
			concatArray() {
				let newArr = Array.prototype.concat.apply([], arguments) //没有去重复的新数组
				return Array.from(new Set(newArr))
			},
			ok() {
				this.$refs["addBookingData"].validate(valid => {
					if (valid) {
						let formDatas = JSON.parse(JSON.stringify(this.addBookingData));
						formDatas.resourcePicList = this.concatArray(this.defaultList0, this.defaultList1, this.defaultList2);
						if (formDatas.resourcePicList.length == 3) {
							this.$ajax.post(this, this.$api.POST_ADD_INTENTION_CUSTOMER, formDatas, res => {
								if (res.code == "200") {
									this.$Message.success("新增成功");
									this.$refs["addBookingData"].resetFields();
									this.addBooking = false;
									this.handleSearch();
									this.handleMassDelPics();
								} else {
									this.$Message.error(res.msg);
								}
							});
						} else {
							this.$Message.error("请上传图片");
						}
					}
				});
			},
			addSeeHouseResult(name) {
				this.$refs[name].validate(valid => {
					if (valid) {
						let data = JSON.parse(JSON.stringify(this.resultData));
						data.eventTime = this.formateDate(this.resultData.eventTime);
						data.customerId = this.resultData.id;
						this.$ajax.post(this, this.$api.POST_REGISTRATION_FOLLOW_UP, data,
							res => {
								if (res.code == "200") {
									this.$Message.success("登记跟进成功");
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
				this.handleMassDelPics();
			},
			handleMassDelPics() {
				let query = this.figure.join(",");
				this.$ajax.delete(this, this.$api.DELETE_FILE_UPLOAD_BY_CODE + "?codes=" + query, null, res => {});
			}
		}
	}
</script>
<style scoped>
	.detail {
		margin-bottom: 5px;
	}

	.detail div:first-of-type {
		text-align: right;
	}
</style>
