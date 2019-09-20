<template>
	<Card dis-hover>
		<Form :model="formData" :rules="formDataRule" ref="formData" label-position="right" :label-width="110">
			<Row class="row-title">配租信息</Row>
			<Row class="padding-row">
				<Col span="8">
				<div class="item">
					<label>配租人姓名</label>
					<div class="item-content">
						<span>{{formData.rentUserName}}</span>
					</div>
				</div>
				</Col>
				<Col span="8">
				<div class="item">
					<label>身份证</label>
					<div class="item-content">
						<span>{{formData.idCard}}</span>
					</div>
				</div>
				</Col>
				<Col span="8">
				<div class="item">
					<label>联系电话</label>
					<div class="item-content">
						<span>{{formData.phone}}</span>
					</div>
				</div>
				</Col>
			</Row>
			<Row class="padding-row">
				<Col span="8">
				<div class="item">
					<label>家庭类型</label>
					<div class="item-content">
						<span>{{formData.famailType}}</span>
					</div>
				</div>
				</Col>
			</Row>
			<Row class="row-title">配租房屋信息</Row>
			<Row class="padding-row">
				<Col span="8">
				<div class="item">
					<label>所属区域</label>
					<div class="item-content">
						<span>{{formData.county}}</span>
					</div>
				</div>
				</Col>
				<Col span="8">
				<div class="item">
					<label>配租项目</label>
					<div class="item-content">
						<span>{{formData.rentHouseProject}}</span>
					</div>
				</div>
				</Col>
				<Col span="8">
				<div class="item">
					<label>配租房号</label>
					<div class="item-content">
						<span>{{formData.houseNo}}</span>
					</div>
				</div>
				</Col>
				<Col span="8">
				<div class="item">
					<label>配租房型</label>
					<div class="item-content">
						<span>{{formData.housingStructureName}}</span>
					</div>
				</div>
				</Col>
			</Row>
			<Row class="padding-row">
				<Col span="8">
				<div class="item">
					<label>入住有效期</label>
					<div class="item-content">
						<span>{{formData.effectiveDate}}~{{formData.expiredDate}}</span>
					</div>
				</div>
				</Col>
				<Col span="8">
				<div class="item">
					<label>配租状态</label>
					<div class="item-content">
						<span>{{formData._status}}</span>
					</div>
				</div>
				</Col>
			</Row>
			<Row class="row-title">入住信息</Row>
			<Row class="padding-row">
				<Col span="8">
				<FormItem label="办理入住日" class="ov-form-item ivu-form-item-required" prop="checkinDate">
					<DatePicker :disabled="formData.status == '1'" v-model="checkinDate" type="date" :options="options" placeholder="请选择办理入住日"
					 style="width: 200px"></DatePicker>
				</FormItem>
				</Col>
			</Row>
			<Row class="padding-row">
				<Col span="24" v-if="formData.status=='0'">
				<FormItem label="身份证证明" class="ov-form-item ivu-form-item-required" prop="img">
					<imageUpload :uploadButton="'upload'" :maxUploads="4" :url="$api.FILE_UPLOAD_POST" :defaultList="defaultList"
					 @on-complete="uploadComplete" @on-remove="uploadRemove" :isPhone="true" :code="figure" @showUploadImg="startRunFun"></imageUpload>
				</FormItem>

				</Col>
				<Col span="24" v-else>
				<div class="item">
					<label>身份证证明</label>
					<div class="item-content">
						<img :src="item.picPath" style="width:60px;height:60px;" alt="" v-for="(item,index) in defaultList" :key="index">
					</div>
				</div>
				</Col>
			</Row>
			<Row class="padding-row">
				<Col span="24">
				<div class="item">
					<Row class="marginBT10">
						<span>入住人清单</span>
						<Button style="float:right" @click="addOwnBtn" type="primary" ghost>添加入住人</Button>
					</Row>
					<div>
						<Table border :data="list" :columns="columns"></Table>
					</div>
				</div>
				</Col>
			</Row>
		</Form>
		<Row class="bottom-row">
			<Button type="primary" @click="save">保存</Button>
			<Button type="primary" :to="{name:'publicHousing/billingList'}">返回</Button>
		</Row>
		<Modal :mask-closable="false" title="登记入住人" v-model="addOwnShow" @on-cancel="cancel">
			<Form :model="addData" ref="addData" :rules="addDataRule" label-position="right" :label-width="110">
				<Row>
					<Col span="12">
					<FormItem label="入住人姓名" class="ov-form-item" prop="tenantName">
						<Input v-model="addData.tenantName"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="证件号码" class="ov-form-item" prop="idCard">
						<Input v-model="addData.idCard"></Input>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="12">
					<FormItem label="联系方式" class="ov-form-item" prop="phone">
						<Input v-model="addData.phone"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="与配租人关系" class="ov-form-item" prop="relationWithAllocation">
						<Select v-model="addData.relationWithAllocation">
							<Option v-for="(item,index) in relationWithAllocationList" :key="index" :value="item.value" :label="item.name"></Option>
						</Select>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="24">
					<FormItem label="身份证证明" class="ov-form-item ivu-form-item-required" prop="img">
						<imageUpload :uploadButton="'uploadAdd'" :maxUploads="4" :url="$api.FILE_UPLOAD_POST" :defaultList="defaultListAdd"
						 @on-complete="uploadCompleteAdd" @on-remove="uploadRemoveAdd" :isPhone="true" :code="addData.figure"
						 @showUploadImg="startRunFunModal"></imageUpload>
					</FormItem>
					</Col>
				</Row>
			</Form>
			<div slot="footer">
				<Button type="primary" ghost @click="cancel">取消</Button>
				<Button type="primary" @click="addOwn">保存</Button>
			</div>
		</Modal>
	</Card>
</template>
<script>
	import imageUpload from "../../../../components/Helper/Form/image-upload";
	export default {
		components: {
			imageUpload
		},
		data() {
			const validateDate = (rule, value, callback) => {
				if (this.checkinDate == '') {
					callback(new Error('请选择办理入住日'))
				} else {
					callback();
				}
			}
			const validateImg = (rule, value, callback) => {
				if (this.defaultList.length == 0) {
					callback(new Error('请上传身份证明'))
				} else {
					callback();
				}
			}
			const validateAddImg = (rule, value, callback) => {
				if (this.defaultListAdd.length == 0) {
					callback(new Error('请上传身份证明'))
				} else {
					callback();
				}
			}
			const validateTel = (rule, value, callback) => {
				if (value != undefined && value != "") {
					if (this.$com.checkPhone(value) || this.$com.checkTel(value)) {
						let flag = false;
						this.list.forEach((ele, index) => {
							if (this.type == null) { //zeng 
								if (ele.phone == value) {
									flag = true;
								}
							} else { //bian
								if (ele.phone == value) {
									flag = index != this.type ? true : false;
								}
							}
						})
						if (flag) {
							callback(new Error('已经存在该手机号'));
						} else {
							callback();
						}
					} else {
						callback(new Error('请输入正确号码'));
					}
				} else {
					callback(new Error('请输入联系方式'));
				}
			}
			const validateCard = (rule, value, callback) => {
				if (value != undefined && value != "") {
					if (this.$com.checkID(value)) {
						let flag = false;
						this.list.forEach((ele, index) => {
							if (this.type == null) { //zeng 
								if (ele.idCard == value) {
									flag = true;
								}
							} else { //bian
								if (ele.idCard == value) {
									flag = index != this.type ? true : false;
								}
							}
						})	
						if (flag) {
							callback(new Error('已经存在该身份证号'));
						} else {
							callback();
						}
					} else {
						callback(new Error('请输入正确身份证号'));
					}
				} else {
					callback(new Error('请输入身份证号'));
				}
			}
			return {
				checkinDate: '',
				figure: "",
				options: {
					disabledDate(date) {
						return date && date.valueOf() < Date.now() - 86400000;
					}
				},
				formDataRule: {
					checkinDate: [{
						validator: validateDate,
						trigger: 'change'
					}],
					img: [{
						validator: validateImg,
						trigger: 'change'
					}]
				},
				relationWithAllocationList: [{
						name: '父母',
						value: '父母'
					},
					{
						name: '兄妹',
						value: '兄妹'
					},
					{
						name: '配偶',
						value: '配偶'
					},
					{
						name: '子女',
						value: '子女'
					},
					{
						name: '其他',
						value: '其他'
					}
				],
				defaultList: [],
				formData: {},
				list: [],
				columns: [{
						title: '入住人姓名',
						key: 'tenantName'
					},
					{
						title: '身份证号',
						key: 'idCard'
					},
					{
						title: '联系电话',
						key: 'phone'
					},
					{
						title: '与配租人关系',
						key: 'relationWithAllocation'
					},
					{
						title: '身份证明',
						render: (h, params) => {
							let arr = [];
							params.row.resourcePics.forEach((e) => {
								arr.push(
									h('img', {
										attrs: {
											src: e.picPath
										},
										style: {
											width: '40px',
											height: '40px'
										}
									})
								)
							})
							return arr;
						}
					},
					{
						title: '操作',
						render: (h, params) => {
							return [
								h('Button', {
									props: {
										type: 'primary'
									},
									style: {
										marginRight: '10px'
									},
									on: {
										click: () => {
											this.editRow(params);
										}
									}
								}, '编辑'),
								h('Button', {
									on: {
										click: () => {
											this.deleteRow(params)
										}
									}
								}, '删除')
							]
						}
					}
				],
				addOwnShow: false,
				addData: {
					resourcePics: []
				},
				addDataRule: {
					tenantName: [{
						required: true,
						message: '请输入入住人姓名',
						trigger: 'blur'
					}],
					idCard: [{
						required: true,
						trigger: 'blur',
						validator: validateCard
					}],
					phone: [{
						required: true,
						validator: validateTel,
						trigger: 'blur'
					}],
					relationWithAllocation: [{
						required: true,
						message: '请选择与配租人关系',
						trigger: 'change'
					}],
					img: [{
						validator: validateAddImg,
						trigger: 'change'
					}]
				},
				defaultListAdd: [],
				type: null,
			}
		},
		methods: {
			// 上传成功
			uploadComplete(response, filename) {
				let data = response.data.content;
				this.defaultList.push({
					picId: data.id,
					picPath: data.path,
					return: 'pc'
				})
				this.$refs.formData.validateField("img");
			},
			//得到微信上传的图片
			startRunFun() {
				let count = "";
				this.$ajax.get(
					this,
					this.$api.GET_FILE_UPLOAD_POST.replace("{code}", this.figure), {},
					res => {

						if (res.data.content.length > 0) {
							let data = res.data.content;
							if (this.defaultList.length == 0) {
								data.forEach((d) => {
									this.defaultList.push({
										picId: d.id,
										picPath: d.path,
										return: 'phone'
									})
								})
							} else {
								data.forEach((d) => {
									let flag = true;
									this.defaultList.forEach((e) => {
										if (d.id == e.picId) {
											flag = false;
										}
									})
									if (flag) {
										this.defaultList.push({
											picId: d.id,
											picPath: d.path,
											return: 'phone'
										})
									}
								})
							}
						}


						this.$refs.formData.validateField("img");
					}
				);
			},
			//得到微信上传的图片
			startRunFunModal() {
				let count = "";
				this.$ajax.get(
					this,
					this.$api.GET_FILE_UPLOAD_POST.replace("{code}", this.addData.figure), {},
					res => {

						if (res.data.content.length > 0) {
							let data = res.data.content;
							if (this.defaultListAdd.length == 0) {
								data.forEach((d) => {
									this.defaultListAdd.push({
										picId: d.id,
										picPath: d.path,
										return: 'phone'
									})
								})
							} else {
								data.forEach((d) => {
									let flag = true;
									this.defaultListAdd.forEach((e) => {
										if (d.id == e.picId) {
											flag = false;
										}
									})
									if (flag) {
										this.defaultListAdd.push({
											picId: d.id,
											picPath: d.path,
											return: 'phone'
										})
									}
								})
							}
						}


						this.$refs.addData.validateField("img");
					}
				);
			},
			// 图片删除
			uploadRemove(item, index) {
				this.defaultList.splice(index, 1);
				this.$refs.formData.validateField("img");
				if (item.return == 'phone') {
					this.$ajax.delete(this, this.$api.DELETE_FILE_UPLOAD_POST.replace("{code}", this.figure).replace("{id}",
						item.picId), {}, res => {});
				}
			},
			// 添加入住人按钮
			addOwnBtn() {
				this.$ajax.get(this, this.$api.GET_FILE_UPLOAD_CODE_GET, {}, res => {
					this.addData.figure = res.data.content.code;
					this.addOwnShow = true;
				});
			},
			// 上传成功
			uploadCompleteAdd(response, filename) {
				let data = response.data.content;
				this.defaultListAdd.push({
					picId: data.id,
					picPath: data.path,
					return: 'pc'
				})
				this.$refs.addData.validateField("img");
			},
			// 图片删除
			uploadRemoveAdd(item, index) {
				this.defaultListAdd.splice(index, 1);
				this.$refs.addData.validateField("img");
				if (item.return == 'phone') {
					this.$ajax.delete(this, this.$api.DELETE_FILE_UPLOAD_POST.replace("{code}", this.addData.figure).replace("{id}",
						item.picId), {}, res => {});
				}
			},
			// 保存入住人
			addOwn() {
				this.$refs['addData'].validate((valid) => {
					if (!valid) return;
					let data = JSON.parse(JSON.stringify(this.addData));
					data.resourcePics = [];
					data.resourcePics = JSON.parse(JSON.stringify(this.defaultListAdd));
					if (this.type != null) {
						this.$set(this.list, this.type, data);
					} else {
						this.list.push(data);
					}
					this.addOwnShow = false;
					this.$refs['addData'].resetFields();
					this.addData = {};
					this.addData.resourcePics = [];
					this.defaultListAdd = [];
					this.type = null;
				})
			},
			// 取消
			cancel() {
				this.addOwnShow = false;
				if (!this.addData.allocationOfRentId) {
					this.handleMassDelPics(this.addData.figure);
				}
				this.$refs['addData'].resetFields();
				this.addData = {};
				this.addData.resourcePics = [];
				this.defaultListAdd = [];
				this.type = null;
			},
			// 查询详情
			getDetail() {
				this.$ajax.get(
					this,
					this.$api.BILLING_DETAIL.replace('{id}', this.$route.query.id), {}, (res) => {
						let data = res.data.content.allocationOfRent;

						let date = new Date();
						let year = date.getFullYear();
						let month = date.getMonth() + 1;
						let date2 = date.getDate();

						let now = year + '-' + month + '-' + date2;
						let m = new Date(now);
						let e = new Date(data.expiredDate);

						if (m.getTime() > e.getTime()) {
							data._status = '已过期'
						} else {
							if (data.status == '0') {
								data._status = '未入住'

							} else if (data.status == '1') {
								data._status = '已入住'
							}
						}
						this.formData = data;
						let allData = res.data.content;
						this.defaultList = allData.resourcePics == null ? [] : allData.resourcePics;
						let listLength = allData.list != null ? allData.list.length : 0;
						if (listLength > 0) {
							this.$ajax.get(this, this.$api.GET_FILE_UPLOAD_CODE_GET + "?number=" + listLength, {}, res => {
								let codeStrings = "";
								codeStrings = res.data.content.code;
								let codeArray = listLength == '1' ? [codeStrings] : codeStrings.split(",");
								for (let i = 0; i < listLength; i++) {
									allData.list[i].figure = codeArray[i];
								}
								this.list = allData.list;
							});
						} else {
							this.list = [];
						}
						this.checkinDate = allData.checkinDate;
					}
				)
			},
			// 删除入住人
			deleteRow(params) {
				this.list.splice(params.index, 1);
				this.handleMassDelPics(params.row.figure);
			},
			// 编辑入住人
			editRow(params) {
				this.type = params.index;
				this.addData = JSON.parse(JSON.stringify(params.row));
				this.defaultListAdd = JSON.parse(JSON.stringify(params.row.resourcePics));
				this.addOwnShow = true;
			},
			formateDate(d) {
				let month = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
				let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
				const newDate = d.getFullYear() + '-' + month + '-' + day;
				return newDate;
			},
			// 保存
			save() {
				this.$refs['formData'].validate((valid) => {
					if (!valid) return;
					let params = {};
					params.allocationOfRentId = this.formData.id;
					params.relationWithAllocation = 'self';
					this.defaultList.forEach(ele => {
						delete ele['createTime'];
					})
					params.resourcePics = this.defaultList;
					params.checkinDate = this.formateDate(this.checkinDate);
					params.list = [];
					params.list = JSON.parse(JSON.stringify(this.list));
					params.list.forEach(ele => {
						ele.resourcePics.forEach(item => {
							delete item['createTime'];
						})
					})
					this.$ajax.post(
						this,
						this.$api.BILLING_SAVE,
						params, (res) => {
							this.$Message.success('保存成功');
							this.handleMassDelPics(this.figure);
							params.list.forEach(ele => {
								this.handleMassDelPics(ele.figure);
							})
							this.$router.push({
								name: 'publicHousing/billingList'
							})
						}
					)
				})

			},
			handleMassDelPics(query) {
				this.$ajax.delete(this, this.$api.DELETE_FILE_UPLOAD_BY_CODE + "?codes=" + query, null, res => {});
			},
			getFigure() {
				this.$ajax.get(this, this.$api.GET_FILE_UPLOAD_CODE_GET, {}, res => {
					this.figure = res.data.content.code;
				});
			}
		},
		mounted() {
			this.getDetail();
			this.getFigure();
		}
	}
</script>
<style scoped>
	.marginBT10 {
		margin: 10px 0px;
	}

	.padding-row {
		padding: 0px 10px;
	}

	.row-title {
		border-bottom: 1px solid #e0e0e0;
		height: 37px;
		padding-left: 16px;
		line-height: 37px;
		font-weight: bold;
		margin-bottom: 20px;
	}

	.item {
		font-weight: bold;
		font-size: 14px;
		text-align: left;
		margin-bottom: 20px;
		vertical-align: top;
		zoom: 1
	}

	.item:before {
		content: '';
		display: table;
	}

	.item:after {
		content: '';
		display: block;
		clear: both;
	}

	.item label {
		text-align: right;
		vertical-align: middle;
		float: left;
		font-size: 12px;
		color: #495060;
		line-height: 1;
		padding: 10px 12px 10px 0;
		box-sizing: border-box;
		width: 110px;
	}

	.item .item-content {
		position: relative;
		line-height: 32px;
		font-size: 12px;
		margin-left: 130px;
		word-break: break-all;
	}

	.ov-form-item {
		font-weight: bold;
		font-size: 14px;
		text-align: left;
	}

	.bottom-row {
		text-align: center;
		padding: 20px 0px;
	}
</style>
