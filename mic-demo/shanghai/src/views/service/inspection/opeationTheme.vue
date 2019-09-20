<template>
	<Card :bordered="false" dis-hover>
		<Row type="flex" justify="center" slot="title">
			<Col>
			<p>{{$route.query.id?'修改检查主题':'新增检查主题'}}</p>
			</Col>
		</Row>
		<Form ref="formTheme" :model="formData" :rules="formRule" :label-width="90">
			<Row>
				<Col span="14">
				<FormItem prop="name" label="主题名称">
					<Input type="text" v-model="formData.name" placeholder="主题名称"></Input>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="7">
				<FormItem prop="obj" label="检查对象">
					<Select v-model="formData.obj" placeholder="检查对象" transfer clearable>
						<Option v-for="item in objLists" :value="item.value" :key="item.value">{{ item.name }}</Option>
					</Select>
				</FormItem>
				</Col>
				<Col span="7">
				<FormItem prop="operatorType" label="检查人类型">
					<Select v-model="formData.operatorType" placeholder="广告牌形式" transfer clearable>
						<Option v-for="item in operatorTypeLists" :value="item.value" :key="item.value">{{ item.name }}</Option>
					</Select>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="14">
				<FormItem label="主题备注" prop="node">
					<Input type="textarea" v-model="formData.node" placeholder="主题备注"></Input>
				</FormItem>
				</Col>
			</Row>
		</Form>
		<Divider dashed />
		<div  id="mao">
			<Row type="flex">
				<Col>
				<Button type="primary" ghost @click='enterOfAddItems=!enterOfAddItems'>展开收起检查内容创建表单</Button>
				</Col>
			</Row>
			<div style="margin-top: 20px;" v-show='enterOfAddItems'>
				<Form ref="formData" :model="createformData" :rules="createformDataRule" :label-width="100">
					<Row>
						<Col span="14">
						<FormItem prop="name" label="检查项名称">
							<Input type="text" v-model="createformData.name" placeholder="检查项名称"></Input>
						</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span="7">
						<FormItem prop="priority" label="显示顺序">
							<Input type="text" v-model="createformData.priority" placeholder="显示顺序"></Input>
						</FormItem>
						</Col>
					</Row>
					<Row type="flex" justify="start" :gutter="100">
						<Col>
						<FormItem prop="isImgMust" label="现场图片要求">
							<RadioGroup v-model="createformData.isImgMust">
								<Radio label="true">必填</Radio>
								<Radio label="false">非必填</Radio>
							</RadioGroup>
						</FormItem>
						</Col>
						<Col>
						<FormItem prop="imgNum" label="现场图片上传数量" :label-width="120">
							<Input type="text" v-model="createformData.imgNum" placeholder="现场图片上传数量"></Input>
						</FormItem>
						</Col>
						<Col>
						<FormItem prop="isTextMust" label="现场情况描述">
							<RadioGroup v-model="createformData.isTextMust">
								<Radio label="true">必填</Radio>
								<Radio label="false">非必填</Radio>
							</RadioGroup>
						</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span="14">
						<FormItem prop="component" label="检查项结果选项展现方式" :label-width="160">
							<RadioGroup v-model="createformData.component">
								<Radio label="0">开关</Radio>
								<Radio label="1">弹窗选择</Radio>
								<Radio label="2">平铺单选</Radio>
							</RadioGroup>
						</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span="8">
						<FormItem prop="resultSet" label="检查项结果选项" :label-width="110">
							<Button type="primary" ghost @click="showCheckItemModal">添加</Button>
						</FormItem>
						</Col>
					</Row>
					<Row type="flex" justify="start" class="checkListsContainer">
						<Col span="3" v-for="(item,index) in  createformData.resultSet" :key="index" class-name="checkResultLists">
						<Row>
							<Col class-name="checkResultLists-title">
							<Row type="flex" justify="start" align="middle">
								<Col span="21" class-name="checkResultLists-name">{{item.name}}</Col>
								<Col span="2"><img src="../../../assets/icons/noIm.svg" alt=""></Col>
							</Row>
							</Col>
							<Col class-name="checkResultLists-opeation">
							<Row type="flex" justify="space-between">
								<Col class-name="opeation-item"><span @click="showItemDetail=true;modalData=JSON.parse(JSON.stringify(createformData.resultSet[index]));">查看</span></Col>
								<Col class-name="opeation-item"><span @click="checkItem=true;modalData=JSON.parse(JSON.stringify(createformData.resultSet[index]));editFlag=index">修改</span></Col>
								<Col class-name="opeation-item"><span @click="createformData.resultSet.splice(index,1)">删除</span></Col>
							</Row>
							</Col>
						</Row>
						</Col>
					</Row>
					<Row type="flex" justify="start">
						<Col>
						<Button type="primary" ghost @click="saveCheckItem('formData')">{{editForm!==''?'修改检查项':'添加检查项'}}</Button>
						<Button type="primary" ghost @click="resetCheckItem('formData')">重置检查项</Button>
						</Col>
					</Row>
				</Form>
			</div>
		</div>
		<Divider dashed />
		<Row>
			<Col span="7" class-name="checkItemForm" v-for="(item,index) in checkItemLists" :key="index">
			<Row>
				<Col span="20" class-name="checkItemDatas">
				<Row>
					<Col class-name="checkItem-title">{{item.name}}</Col>
					<Col class-name="checkItem-result">
					<Row type="flex" justify="start" align="middle">
						<div class="result-item" span="8" v-for="(items,it) in item.resultSet" :key="it">
							{{items.name}}
							<span class="isImportant" v-show="items.isCreateRectify=='true'">重点</span>
							<img v-show="items.isCreateRectify=='true'" src="../../../assets/icons/important.svg" alt="">
							<img v-show="item.component=='0'" src="../../../assets/icons/radio.png" alt="">
							<img v-show="item.component=='1'" src="../../../assets/icons/alert.png" alt="">
							<img v-show="item.component=='2'" src="../../../assets/icons/repeat.png" alt="">
						</div>
					</Row>
					</Col>
					<Col class-name="checkItem-desc">现场图片<span>必填</span><span class="imgCount">{{item.imgNum}}</span>&nbsp;&nbsp;&nbsp;
					现场描述<span>非必填</span></Col>
				</Row>
				</Col>
				<Col span="4">
				<Row type="flex" justify="center" class-name="checkItem-opeation">
					<Col span="24" class-name="checkItem-opeation-edit"><a @click="createformData=JSON.parse(JSON.stringify(checkItemLists[index]));editForm=index" href="#mao">修改</a></Col>
					<Col span="24" class-name="checkItem-opeation-delete"><span @click="checkItemLists.splice(index,1)">删除</span>
					</Col>
				</Row>
				</Col>
			</Row>
			</Col>
		</Row>
		<Row type="flex" justify="center">
			<Col>
			<Button type="primary" ghost @click="$router.push({ name: 'service/patrol'})">返回</Button>
			<Button type="primary" @click="handleSaveTopic">保存</Button>
			</Col>
		</Row>
		<Modal v-model="checkItem" title="维护检查项结果选项" :mask-closable="false">
			<Form ref="modalData" :model="modalData" :rules="modalDataRule" :label-width="100">
				<Row>
					<Col span="22">
					<FormItem prop="name" label="检查项结果选项名称" :label-width="134">
						<Input v-model="modalData.name" type="text" placeholder="检查项结果选项名称"></Input>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="22">
					<FormItem prop="isCreateRectify" label="需重点关注结果否" :label-width="123">
						<RadioGroup v-model="modalData.isCreateRectify">
							<Radio label="true">是</Radio>
							<Radio label="false">否</Radio>
						</RadioGroup>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="24">
					<FormItem label="现场图片上传" prop="picLists" :class="createformData.isImgMust=='true'?'ivu-form-item-required':''">
						<imageUpload :url="$api.FILE_UPLOAD_POST" :uploadButton="'upload'" :defaultList="modalData.picLists" @on-complete="uploadComplete"
						 @on-remove="uploadRemove" :isPhone="true" :code="figure" @showUploadImg="startRunFun"></imageUpload>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="22">
					<FormItem label="现场情况描述" prop="node" :class="createformData.isTextMust=='true'?'ivu-form-item-required':''">
						<Input type="textarea" v-model="modalData.node" :rows="4" placeholder="现场情况描述"></Input>
					</FormItem>
					</Col>
				</Row>
				<Row style="margin-bottom: 10px;">
					<Col span='24'>
					<Button type="primary" :disabled="modalData.isCreateRectify=='false'" @click="modalData.rectifySet.push({$isEdit:true,$confirm:true,oldName:'',oldNode:''})">
						+添加整改方案</Button>
					</Col>
				</Row>
				<Row>
					<Col span='24'>
					<Table border :columns="col" :data="modalData.rectifySet"></Table>
					</Col>
				</Row>
			</Form>
			<div slot="footer">
				<Button type="default" @click="cancelCheckItemResult('modalData')">取消</Button>
				<Button type="primary" @click="addCheckItemResult('modalData')">确认</Button>
			</div>
		</Modal>
		<Modal v-model="showItemDetail" title="维护检查项结果选项" :mask-closable="false">
			<Row type="flex" class-name="detail">
				<Col span="7">检查项结果选项名称：</Col>
				<Col span="17">{{modalData.name}} </Col>
			</Row>
			<Row type="flex" :gutter="10" class-name="detail">
				<Col span="6">需重点关注结果否：</Col>
				<Col span="17">{{modalData.isCreateRectify=='true'?'是':'否'}}</Col>
			</Row>
			<Row type="flex" :gutter="10" class-name="detail">
				<Col span="5">现场情况描述：</Col>
				<Col span="17">{{modalData.node||"暂无"}}</Col>
			</Row>
			<Row type="flex" :gutter="10" class-name="detail">
				<Col span="5">现场图片上传：</Col>
				<Col span="17"><img style="width:70px:height:70px" v-for="(item,index) in modalData.picLists" :key="index" :src="item.picPath"
				 alt=""></Col>
			</Row>
			<Divider dashed />
			<Row type="flex" :gutter="10" class-name="detail">
				<Col span="3">
				<h4>整改方案</h4>
				</Col>
			</Row>
			<Row type="flex" :gutter="10" class-name="detail">
				<Table border :columns="colDetail" :data="modalData.rectifySet"></Table>
			</Row>
			<div slot="footer">
				<Button type="primary" @click="showItemDetail=false">确认</Button>
			</div>
		</Modal>
	</Card>
</template>

<script>
	import imageUpload from "../../../components/Helper/Form/image-upload.vue";
	export default {
		components: {
			imageUpload
		},
		data() {
			const checkResultSet = (rule, value, callback) => {
				console.log("opopop", this.createformData.resultSet.length)
				if (this.createformData.resultSet.length > 0) {
					callback();
				} else {
					callback(new Error("添加检查项结果选项"));
				}
			};
			const checkNode = (rule, value, callback) => {
				if (this.createformData.isTextMust == "true") {
					if (value == "" || value == undefined) {
						callback(new Error("现场情况描述不能为空"));
					} else {
						callback();
					}
				} else {
					callback();
				}
			};
			const checkPiclists = (rule, value, callback) => {
				if (this.createformData.isImgMust == "true") {
					if (
						this.modalData.picLists.length == "0" ||
						this.modalData.picLists.length < Number(this.createformData.imgNum)
					) {
						let count =
							this.createformData.imgNum != undefined ?
							this.createformData.imgNum :
							"1";
						callback(new Error("现场图片不能为空且至少上传" + count + "张"));
					} else {
						callback();
					}
				} else {
					callback();
				}
			};
			return {
				enterOfAddItems: false,
				checkItem: false,
				showItemDetail: false,
				formData: {},
				formRule: {
					name: [{
						required: true,
						message: "请输入主题名称",
						trigger: "blur"
					}],
					obj: [{
						required: true,
						message: "请选择检查对象",
						trigger: "change"
					}],
					operatorType: [{
						required: true,
						message: "请选择检查人类型",
						trigger: "change"
					}]
				},
				objLists: [{
						name: "小区",
						value: "0"
					},
					{
						name: "楼栋",
						value: "1"
					},
					{
						name: "停车位",
						value: "2"
					},
					{
						name: "广告位",
						value: "3"
					},
					{
						name: "分户",
						value: "4"
					}
				],
				operatorTypeLists: [{
						name: "内部",
						value: "in"
					},
					{
						name: "外部",
						value: "out"
					}
				],
				createformData: {
					isImgMust: "true",
					isTextMust: "true",
					component: "0",
					imgNum: '1',
					resultSet: []
				},
				createformDataRule: {
					name: [{
						required: true,
						message: "请输入检查项名称",
						trigger: "blur"
					}],
					isImgMust: [{
						required: true,
						message: "请选择现场图片要求",
						trigger: "change"
					}],
					imgNum: [{
						required: true,
						message: "请输入现场图片上传数量",
						trigger: "change"
					}],
					isTextMust: [{
						required: true,
						message: "请选择现场情况描述",
						trigger: "change"
					}],
					component: [{
						required: true,
						message: "检查项结果选项展现方式",
						trigger: "change"
					}],
					resultSet: [{
						required: true,
						validator: checkResultSet,
						trigger: "change"
					}]
				},
				modalData: {
					isCreateRectify: "true",
					picLists: [],
					rectifySet: []
				},
				modalDataRule: {
					name: [{
						required: true,
						message: "请输入检查项结果选项名称",
						trigger: "blur"
					}],
					isCreateRectify: [{
						required: true,
						message: "请选择需重点关注结果否",
						trigger: "change"
					}],
					picLists: [{
						validator: checkPiclists,
						trigger: "change"
					}],
					node: [{
						validator: checkNode,
						trigger: "blur"
					}]
				},
				colDetail: [{
						title: "整改方案名",
						key: "name",
						width: 120
					},
					{
						title: "整改方案描述",
						key: "node"
					}
				],
				col: [{
						title: "整改方案名",
						key: "name",
						width: 120,
						render: (h, params) => {
							let vm = this;
							let old = params.row.oldName ? params.row.oldName : "";
							let msg = params.row.$confirm == true ? params.row.name : old;
							if (params.row.$isEdit) {
								return h("Input", {
									props: {
										type: "text",
										value: params.row.name
									},
									on: {
										"on-blur"(event) {
											vm.modalData.rectifySet[params.index].name =
												event.target.value;
										}
									}
								});
							} else {
								return h("div", msg);
							}
						}
					},
					{
						title: "整改方案描述",
						key: "node",
						render: (h, params) => {
							let vm = this;
							let old = params.row.oldNode ? params.row.oldNode : "";
							let msg = params.row.$confirm == true ? params.row.node : old;
							if (params.row.$isEdit) {
								return h("Input", {
									props: {
										type: "text",
										value: params.row.node
									},
									on: {
										"on-blur"(event) {
											vm.modalData.rectifySet[params.index].node =
												event.target.value;
										}
									}
								});
							} else {
								return h("div", msg);
							}
						}
					},
					{
						title: "操作",
						width: 130,
						render: (h, params) => {
							let vm = this;
							let edit = h("Icon", {
								props: {
									type: "ios-create",
									size: "20",
									color: "#2d8cf0"
								},
								style: {
									marginLeft: "10px"
								},
								on: {
									click: function() {
										vm.modalData.rectifySet[params.index].$isEdit = true;
										vm.modalData.rectifySet[params.index].$confirm = false;
									}
								}
							});
							let del = h("Icon", {
								props: {
									type: "ios-trash",
									size: "20",
									color: "red"
								},
								style: {
									marginLeft: "10px"
								},
								on: {
									click: function() {
										vm.modalData.rectifySet.splice(params.index, 1);
									}
								}
							});
							let save = h("Icon", {
								props: {
									type: "ios-checkmark-circle",
									size: "20",
									color: "#2d8cf0"
								},
								style: {
									marginLeft: "10px"
								},
								on: {
									click: function() {
										vm.modalData.rectifySet[params.index].oldName =
											vm.modalData.rectifySet[params.index].name;
										vm.modalData.rectifySet[params.index].oldNode =
											vm.modalData.rectifySet[params.index].node;
										vm.modalData.rectifySet[params.index].$isEdit = false;
									}
								}
							});
							let cancel = h("Icon", {
								props: {
									type: "md-refresh",
									size: "20",
									color: "#2d8cf0"
								},
								style: {
									marginLeft: "10px"
								},
								on: {
									click: function() {
										vm.modalData.rectifySet[params.index].name =
											vm.modalData.rectifySet[params.index].oldName;
										vm.modalData.rectifySet[params.index].node =
											vm.modalData.rectifySet[params.index].oldNode;
										vm.modalData.rectifySet[params.index].$isEdit = false;
										vm.modalData.rectifySet[params.index].$confirm = false;
									}
								}
							});
							let opeations = [];
							if (params.row.$isEdit) {
								opeations = [save, cancel, del];
							} else {
								opeations = [edit, del];
							}
							return h("div", opeations);
						}
					}
				],
				checkItemLists: [],
				figure: "",
				editFlag: '',
				editForm: ''
			};
		},
		mounted() {
			if (this.$route.query.id) {
				this.getDetail();
			}
		},
		methods: {
			getDetail() {
				this.$ajax.get(
					this,
					this.$api.GET_TOPIC_DETAIL.replace("{id}", this.$route.query.id),
					null,
					res => {
						this.formData = res.data.content;
						this.checkItemLists = res.data.content.normSet;
						this.checkItemLists.forEach(ele=>{
							ele.isImgMust=String(ele.isImgMust);
							ele.isTextMust=String(ele.isTextMust);
							ele.imgNum=String(ele.imgNum);
							ele.resultSet.forEach(item=>{
								item.isCreateRectify=String(ele.isCreateRectify);
							})
						})
					}
				);
			},
			showCheckItemModal() {
				this.checkItem = true;
				this.$ajax.get(this, this.$api.GET_FILE_UPLOAD_CODE_GET, {}, res => {
					this.figure = res.data.content.code;
				});
			},
			cancelCheckItemResult(name) {
				this.$refs[name].resetFields();
				this.checkItem = false;
				this.modalData.rectifySet = [];
				this.modalData.picLists = [];
				this.modalData.node = "";
				this.handleMassDelPics();
			},
			addCheckItemResult(name) {
				this.$refs[name].validate(valid => {
					if (valid) {
						const options = {
							...this.modalData
						};
						if (this.editFlag !== "") {
							//编辑
							this.createformData.resultSet.splice(this.editFlag, 1, options);
						} else {
							//新增
							this.createformData.resultSet.push(options);
						}
						this.editFlag = "";
						this.$refs['formData'].validateField('resultSet');
						this.cancelCheckItemResult(name);
					}
				});
			},
			saveCheckItem(name) {
				this.$refs[name].validate(valid => {
					if (valid) {
						const options = {
							...this.createformData
						};
						if (this.editForm !== '') {
							//编辑
							this.checkItemLists.splice(this.editForm,1,options);
						} else {
							//新增
							this.checkItemLists.push(options);
						}
						this.editForm='';
						this.sortByKey(this.checkItemLists, 'priority', 'down');
						this.resetCheckItem(name);
					}
				});
			},
			sortByKey(array, key, updown) { //数组对象中有数字大小的对象排序
				return array.sort(function(a, b) {
					var x = a[key];
					var y = b[key];
					if (updown == "up") {
						return (x < y) ? -1 : ((x > y) ? 1 : 0);
					}
					if (updown == "down") {
						return (x < y) ? 1 : ((x > y) ? -1 : 0);
					}
				})
			},
			resetCheckItem(name) {
				this.$refs[name].resetFields();
				this.createformData = {
					isImgMust: "true",
					isTextMust: "true",
					component: "0",
					imgNum:'1',
					resultSet: []
				};
			},
			handleSaveTopic() {
				this.$refs["formTheme"].validate(valid => {
					if (valid) {
						const options = {
							...this.formData
						};
						this.checkItemLists.forEach(ele => {
							ele.isImg = true;
							ele.isText = true;
							if (this.$route.query.id) {
								delete ele.createTime;
								ele.resultSet.forEach(item => {
									delete item.createTime;
									item.rectifySet.forEach(items => {
										delete items.createTime;
									});
								});
							}
						});
						const params = Object.assign(options, {
							normSet: this.checkItemLists
						});
						if (this.$route.query.id) {
							delete params.createTime;
							this.$ajax.put(
								this,
								this.$api.PUT_TOPIC_DETAIL.replace("{id}", this.$route.query.id),
								params,
								res => {
									if (res.code == "200") {
										this.$Message.success("修改成功！");
										this.$router.push({
											name: "service/patrol"
										});
									} else {
										this.$Message.error(res.msg);
									}
								}
							);
						} else {
							this.$ajax.post(
								this,
								this.$api.POST_ADD_TOPIC_LISTS,
								params,
								res => {
									if (res.code == "200") {
										this.$Message.success("新增成功！");
										this.$router.push({
											name: "service/patrol"
										});
									} else {
										this.$Message.error(res.msg);
									}
								}
							);
						}
					}
				});
			},
			//上传成功
			uploadComplete(response, filename) {
				let data = response.data.content;
				this.modalData.picLists.push({
					picId: data.id,
					picPath: data.path
				});
				this.$refs['modalData'].validateField('picLists');
			},
			//删除一张图片
			uploadRemove(item) {
				this.modalData.picLists.forEach((ele, index) => {
					if (ele.picPath == item.picPath) {
						this.modalData.picLists.splice(index, 1);
					}
					this.$ajax.delete(
						this,
						this.$api.DELETE_FILE_UPLOAD_POST.replace(
							"{code}",
							this.figure
						).replace("{id}", item.picId), {},
						res => {}
					);
				});
			},
			handleMassDelPics() {
				this.$ajax.delete(
					this,
					this.$api.DELETE_FILE_UPLOAD_BY_CODE + "?codes=" + this.figure,
					null,
					res => {}
				);
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
							if (this.modalData.picLists.length == 0) {
								this.modalData.picLists = data;
							} else {
								var str = "";
								this.modalData.picLists.forEach(element => {
									str += element.picId;
								});
								data.forEach(element => {
									if (str.indexOf(element.picId) == -1) {
										this.modalData.picLists.push(element);
									}
								});
							}
						}
					}
				);
			}
		}
	};
</script>

<style scoped>
	.checkListsContainer {
		margin: 0 0 10px 0;
	}

	.checkItemForm,
	.checkResultLists {
		border: 1px solid #e8eaec;
		font-size: 12px;
		border-radius: 5px;
		padding: 0 0 0 10px;
		margin: 0 5px 5px 0;
	}

	.checkResultLists {
		padding: 0px 8px;
		margin: 0 5px 5px 0;
	}

	.checkItemForm .checkItem-title {
		min-height: 35px;
		line-height: 35px;
		border-bottom: 1px solid #e8eaec;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.checkItemForm .checkItem-opeation {
		text-align: center;
		padding-top: 10px;
		cursor: pointer;
	}

	.checkItem-opeation-edit {
		color: #2d8cf0;
	}

	.checkItem-opeation-delete {
		color: red;
	}

	.result-item {
		margin-right: 10px;
		height: 30px;
		padding-top: 5px;
	}

	.result-item img,
	.checkResultLists img {
		width: 18px;
		vertical-align: middle;
	}

	.result-item .isImportant {
		display: inline-block;
		width: 30px;
		height: 20px;
		text-align: center;
		border: 1px solid red;
		color: red;
		border-radius: 3px;
	}

	.checkItem-result .result-item:after {
		content: "";
		display: inline-block;
		width: 1px;
		height: 15px;
		background: rgba(153, 153, 153, 1);
		position: relative;
		top: 5px;
		right: -5px;
	}

	.checkItem-result .result-item:last-of-type:after {
		width: 0px;
	}

	.checkItem-result .result-item:last-of-type {
		margin: 0px;
	}

	.checkItemDatas {
		border-right: 1px solid #e8eaec;
	}

	.checkItem-desc {
		padding: 5px 0 8px 0;
	}

	.checkItem-desc span {
		color: #2d8cf0;
		font-size: 10px;
	}

	.checkResultLists .checkResultLists-title {
		height: 30px;
		line-height: 30px;
		border-bottom: 1px solid #e8eaec;
	}

	.checkResultLists-name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.checkResultLists .checkResultLists-opeation {
		height: 30px;
		line-height: 30px;
	}

	.opeation-item {
		color: #2d8cf0;
		cursor: pointer;
	}

	.opeation-item:last-of-type {
		color: red;
	}

	.imgCount {
		width: 16px;
		display: inline-block;
		height: 16px;
		border-radius: 50%;
		border: 1px solid rgba(42, 130, 228, 1);
		border-color: rgba(42, 130, 228, 1);
		color: rgba(42, 130, 228, 1);
		line-height: 16px;
		text-align: center;
		margin-left: 2px;
	}

	.detail {
		margin-bottom: 10px;
	}

	.detail img {
		width: 70px;
		height: 70px;
	}

	.detail div:first-of-type {
		/* text-align: right; */
	}
</style>
