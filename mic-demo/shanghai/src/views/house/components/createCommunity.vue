<template>
	<div>
		<!-- 百度modal -->
		<Modal :mask-closable="false" v-model="show" title='添加小区' :width="870" :closable="false">
			<Form v-if="show" ref="modal" :label-width="80" :model="modal" :rules="rules">
				<Row type="flex" justify="center">
					<Col span="8">
					<FormItem label="小区名称" class="ivu-form-item-required" prop="name">
						<Input v-model="modal.name" placeholder="请输入小区名称" />
					</FormItem>
					</Col>
					<Col span="6">
					<FormItem label="所属项目" prop="projectId">
						<Select v-model="modal.projectId">
							<Option v-for="item in projectList" :key="item.id" :value="item.id">{{item.name}}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="1">
					<Icon style="display:inline-block;margin: 7px 0 0 5px;" type="md-add-circle" size="18" color="#2d8cf0" @click="handleAddProject(null)"></Icon>
					</Col>
					<Col span="8">
					<FormItem label="定位">
						<Input placeholder="请输入小区地址用于地图定位" @on-focus="searchFocus" v-model="position" />
						<div class="searchList" v-show="positionList.length > 0 && seachShow">
							<div v-for="(item,index) in positionList" :key="index" @click="handleDrop(item)">{{item.address}}{{item.title}}</div>
						</div>
					</FormItem>
					</Col>
				</Row>
				<div style="margin-bottom:20px">
					<BMapComponent :height="250" :width="830" :keyWords="position" :position="positionXY" @on-result="gainSearchList"
					 @on-change="getNewAddress" />
				</div>
				<FormItem label="小区地址" class="ivu-form-item-required" style="width:480px" prop="address">
					<Input v-model="modal.address" type="text" />
					<span>小区地址会根据定位地址及定位自动匹配，若地址有误可手动修改。</span>
				</FormItem>
				<Row>
					<Col span="12">
					<FormItem label="水费缴费机构" prop="waterBusiCode" :label-width="110">
						<Select v-model="modal.waterBusiCode">
							<Option v-for="item in waterBusiLists" :value="item.code" :key="item.code">{{ item.name }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="电费缴费机构" prop="elecBusiCode" :label-width="110">
						<Select v-model="modal.elecBusiCode">
							<Option v-for="item in eleBusiLists" :value="item.code" :key="item.code">{{ item.name }}</Option>
						</Select>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="12">
					<FormItem label="煤气费缴费机构" prop="gasBusiCode" :label-width="110">
						<Select v-model="modal.gasBusiCode">
							<Option v-for="item in gasBusiLists" :value="item.code" :key="item.code">{{ item.name }}</Option>
						</Select>
					</FormItem>
					</Col>
				</Row>
			</Form>
			<div slot="footer">
				<Button type="primary" ghost @click="cancel">取消</Button>
				<Button @click="ok" type="primary">确定</Button>
			</div>
		</Modal>
		<!-- 新建项目modal -->
		<Modal v-model="showProjectModal" title="项目信息" :width="500">
			<Form v-if="showProjectModal" ref="dataForm" :rules="projectRules" :model="dataModel" :label-width="80">
				<FormItem label="项目名称" prop="projectName">
					<Input v-model="dataModel.projectName" />
				</FormItem>
				<FormItem label="省市区" prop="provId">
					<Row type="flex" justify="space-between">
						<Col :span="7">
						<FormItem prop="provId">
							<Select v-model="dataModel.provId" placeholder="请选择省份" filterable clearable>
								<Option v-for="item in options.provId" :key="item.value" :value="item.value">{{item.text}}</Option>
							</Select>
						</FormItem>
						</Col>
						<Col :span="7">
						<FormItem prop="cityId">
							<Select v-model="dataModel.cityId" placeholder="请选择城市" filterable clearable>
								<Option v-for="item in options.cityId" :key="item.value" :value="item.value">{{item.text}}</Option>
							</Select>
						</FormItem>
						</Col>
						<Col :span="7">
						<FormItem prop="countyId">
							<Select v-model="dataModel.countyId" placeholder="请选择区域" filterable clearable>
								<Option v-for="item in options.countyId" :key="item.value" :value="item.value">{{item.text}}</Option>
							</Select>
						</FormItem>
						</Col>
					</Row>
				</FormItem>
				<FormItem label="负责人" prop="blamer">
					<div style="display: flex;">
						<Select v-model="dataModel.blamer" filterable clearable>
							<Option v-for="item in options.blamer" :key="item.value" :value="item.value">{{item.text}}</Option>
						</Select>
						<Button style="marginLeft: 10px;" type="primary" ghost @click="showAddStaff=true">添加负责人</Button>
					</div>
				</FormItem>
				<FormItem label="备注">
					<Input v-model="dataModel.remark" type="textarea" />
				</FormItem>
			</Form>
			<div slot="footer">
				<Button @click="handleSubmit" type="primary">保存</Button>
			</div>
		</Modal>
		<Modal v-model="showAddStaff" width="90%" footer-hide :mask-closable="false">
			<StaffManageCreate :isFromProjectAdd="true" @submitSuccess="addManagerSuccess" v-if="showAddStaff" />
		</Modal>
	</div>
</template>
<script>
	import BMapComponent from "../../../components/BaiduMap/BMapComponent.vue";
	import StaffManageCreate from "../../permission/staffManage/create.vue"; //新增员工
	export default {
		components: {
			BMapComponent,
			StaffManageCreate
		},
		data() {
			const validateName = (rule, value, callback) => {
				if (this.modal.name === undefined || this.modal.name == '') {
					callback(new Error('小区名称不能为空'))
				} else {
					callback();
				}
			}
			const validateAddress = (rule, value, callback) => {
				if (this.modal.address === undefined || this.modal.address == '') {
					callback(new Error('小区地址不能为空'))
				} else {
					callback();
				}
			}
			const checkName = (rule, value, callback) => {
				if (!value) {
					callback(new Error('请输入项目名称'));
				} else if (!this.$com.checkContent(value)) {
					callback(new Error('项目名称只能由中、英文或数字组成'));
				} else {
					callback();
				}
			};
			return {
				seachShow: false,
				showProjectModal: false,
				showAddStaff: false,
				modal: {},
				dataModel: {},
				rules: {
					name: [{
						validator: validateName,
						trigger: 'change'
					}],
					address: [{
						validator: validateAddress,
						trigger: 'change'
					}],
					projectId: {
						required: true,
						message: '请选择所属项目',
					}
				},
				projectRules: {
					projectName: {
						required: true,
						validator: checkName,
					},
					blamer: {
						required: true,
						message: '请选择负责人',
					},
					provId: {
						required: true,
						message: '请选择省份',
					},
					cityId: {
						required: true,
						message: '请选择城市',
					},
					countyId: {
						required: true,
						message: '请选择区域',
					}
				},
				projectList: [],
				show: false,
				 pageNo: 1,
				pageSize: 10000,
				searchLists: [],
				showDropLists: false, //是否显示下拉的内容
				position: '',
				positionList: [],
				keyWords: "", //搜索关键字
				positionXY: {},
				waterBusiLists: [],
				eleBusiLists: [],
				gasBusiLists: [],
				addProjectModal: false,
				options: {
					blamer: [],
					provId: [],
					cityId: [],
					countyId: [],
				}
			};
		},
		props: ["showModal", "leaseType"],
		watch: {
			showModal() {
				this.show = this.showModal;
			},
			'dataModel.provId': {
				handler(cur, old) {
					if (cur != old) {
						this.$delete(this.dataModel, 'cityId');
						this.$delete(this.dataModel, 'countyId');
						this.getOptions();
					}
				}
			},
			'dataModel.cityId': {
				handler(cur, old) {
					if (cur != old) {
						this.$delete(this.dataModel, 'countyId');
						this.getOptions();
					}
				}
			},
		},
		mounted() {
			this.$ajax.all(
				this.getProjcetList(),
				this.requestSelectOptions(this.$api.GET_PROVINCE_LIST, 'provId'),
				this.getBlamers(),
				this.getArea()
			)
		},
		methods: {
			getArea(name) {
				this.$ajax.post(
					this,
					this.$api.SEARCH_ZONE, {
						pageNo: this.pageNo,
						pageSize: this.pageSize
					},
					(res) => {
						this.areas = res.data.content;
						this.getData(name);
					},
					true,
				)
			},
			    getData(name) {
			  if (name) {
			    this.$ajax.post(
			      this,
			      this.$api.SEARCH_PROJECT,
			      {
			        pageNo: this.pageNo,
			        pageSize: this.pageSize,
			        name_l: name,
			      },
			      (res) => {
			        const data = res.data.content;
			        if (!data || data.length <= 0) {
			          this.list = [];
			          this.noData = true;
			          return;
			        }
			        const list = [...this.areas];
			        data.forEach(item => {
			          list.forEach(area => {
			            if (area.city == item.cityName && area.county == item.areaName) {
			              if (!area.list) {
			                area.list = [];
			              }
			              area.list.push(item);
			            }
			          })
			        })
			        this.noData = false;
			        this.list = list.filter(item => this.$com.confirm(item, 'list.length', 0) > 0);
			        this.$nextTick(()=> {
			          this.areaIds=this.list.map(item => item.id)
			        }, 0)
			      }
			    )
			    return;
			  }
			  this.$ajax.get(
			    this,
			    this.$api.ASSET_PROJECT,
			    null,
			    (res) => {
			      const data = res.data.content;
			      const list = [...this.areas];
			      data.forEach(item => {
			        list.forEach(area => {
			          if (area.city == item.cityName && area.county == item.areaName) {
			            if (!area.list) {
			              area.list = [];
			            }
			            area.list.push(item);
			          }
			        })
			      })
			      if (list.length <= 0) {
			        this.noData = true;
			      } else {
			        this.noData = false;
			      }
			      this.list = list;
			      this.$nextTick(()=> {
			        this.areaIds=this.list.map(item => item.id)
			      }, 0)
			    },
			  );
			},
			addManagerSuccess() {
				this.$Message.success('添加成功');
				this.showAddStaff = false;
				this.getBlamers();
			},
			getBlamers() {
				this.$ajax.get(
					this,
					this.$api.GET_ALL_STAFF_LISTS, {
						pageNo: 1,
						pageSize: 100000
					},
					(res) => {
						const data = this.$com.confirm(res, 'data.content');
						if (!data) return;
						this.options.blamer = data.map(item => {
							return {
								text: `${(item.isAllPerm ? '主账号' : item.name)} / ${item.phone}`,
								value: item.id,
							}
						})
					}
				);
			},
			handleAddProject() {
				this.showProjectModal = true;
			},
			getOptions() {
				const {
					provId,
					cityId
				} = this.dataModel;
				if (provId) {
					this.requestSelectOptions(this.$api.GET_CITY_LIST + provId.split('#')[0], 'cityId');
				} else {
					this.options.cityId = [];
				}
				if (cityId) {
					this.requestSelectOptions(this.$api.GET_COUNTY_LIST + cityId.split('#')[0], 'countyId');
				} else {
					this.options.countyId = [];
				}
			},
			requestSelectOptions(requestUrl, selectItem) {
				return this.$ajax.get(
					this,
					requestUrl, {},
					(res) => {
						const data = res.data.content;
						const options = data.map(item => {
							return {
								text: item.name,
								value: item.id + '#' + item.name,
								width: '42%'
							};
						});
						this.options[selectItem] = options;
					},
					true,
				)
			},
			handleSubmit() {
				this.$refs.dataForm.validate(valid => {
					if (!valid) return;
					const {
						id,
						projectName,
						province,
						provId,
						city,
						cityId,
						county,
						countyId,
						blamer,
						remark
					} = this.dataModel;
					let params = null;
					const blamerName = (this.options.blamer.filter(item => item.value == blamer))[0].text;
					if (provId && cityId && countyId) {
						params = {
							areaName: countyId.split('#')[1],
							blamer,
							blamerName,
							cityName: cityId.split('#')[1],
							name: projectName,
							provinceName: provId.split('#')[1],
							remark,
						};
					} else {
						params = {
							areaName: county,
							blamer,
							blamerName,
							cityName: city,
							name: projectName,
							provinceName: province,
							remark,
						};
					}
					this.$ajax.post(
						this,
						this.$api.ASSET_PROJECT,
						params,
						() => {
							this.$Message.success('新增成功');
							this.showProjectModal = false;
							this.getProjcetList();
						}
					)
				});
			},
			getProjcetList() {
				return this.$ajax.get(
					this,
					this.$api.ASSET_PROJECT, {},
					(res) => {
						this.projectList = res.data.content;
					},
				)
			},
			searchFocus() {
				this.seachShow = true;
			},
			handleDrop(val) {
				this.seachShow = false;
				this.positionXY = val;
				const data = {
					lat: this.positionXY.point.lat,
					lng: this.positionXY.point.lng,
					address: val.address,
					name: val.title,
				};
				this.modal = Object.assign(this.modal, data);
				this.position = val.address + val.title;
				this.dropFlag = true;
			},
			gainSearchList(val) {
				this.positionList = val.Ar;
			},
			cancel() {
				this.$emit("handleCancle")
			},
			ok() {
				this.$refs['modal'].validate(valid => {
					if (!valid) return;
					const project = this.projectList.filter((item) => {
						return item.id === this.modal.projectId;
					});
					const params = Object.assign(this.modal, {
						projectName: project[0].name
					});
					this.$ajax.post(
						this,
						this.$api.ASSET_COMMUNITY,
						params,
						(res) => {
							this.$Message.success('新增成功');
							this.$emit("handleOk")
						}
					)
				})
			},
			//拖拽或点击获取新的地址
			getNewAddress(data, addressTemp) {
				let address = addressTemp;
				let province = '',
					city = '',
					district = '';
				if (data.province) {
					province = data.province;
				}
				if (data.city) {
					city = data.city;
				}
				if (data.district) {
					district = data.district;
				}
				if (province == city) {
					if (address.indexOf(province) != -1) {

					} else {
						if (district != '') {
							address = district + address;
						}
						if (province != '') {
							address = province + address;
						}
					}
				} else {
					if (address.indexOf(district) != -1) {
						if (district != '') {
							address = district + address;
						}
					}

					if (address.indexOf(city) != -1) {

					} else {
						if (city != '') {
							address = city + address;
						}
					}

					if (address.indexOf(province) != -1) {

					} else {
						if (province != '') {
							address = province + address;
						}
					}
				}
				this.$set(this.modal, 'address', address);
				this.$set(this.modal, 'provName', data.province);
				this.$set(this.modal, 'cityName', data.city);
				this.$set(this.modal, 'countyName', data.district);
				if (data.city) {
					this.getProvinceCode(data.city);
				} else {
					this.$Message.error("地址最少精确到市区");
				}
			},
			getProvinceCode(query) {
				if (query == '') return;
				this.$ajax.get(
					this,
					this.$api.GET_CITYCODE +
					"?cityName=" +
					query, {},
					res => {
						this.cityCode = res.data.content.unionCityNo;
						this.getWaterBusiLists();
						this.getEleBusiLists();
						this.getGasBusiLists();
					}
				);
			},
			getWaterBusiLists() {
				this.$ajax.get(
					this,
					this.$api.GET_FEE_OF_WATERELE
					.replace("{city}", this.cityCode)
					.replace("{type}", 1), {},
					res => {
						this.waterBusiLists = res.data.content;
					}
				);
			},
			getEleBusiLists() {
				this.$ajax.get(
					this,
					this.$api.GET_FEE_OF_WATERELE
					.replace("{city}", this.cityCode)
					.replace("{type}", 2), {},
					res => {
						this.eleBusiLists = res.data.content;
					}
				);
			},
			getGasBusiLists() {
				this.$ajax.get(
					this,
					this.$api.GET_FEE_OF_WATERELE
					.replace("{city}", this.cityCode)
					.replace("{type}", 3), {},
					res => {
						this.gasBusiLists = res.data.content;
					}
				);
			},
		}
	};
</script>
<style scoped>
	.searchList {
		width: 300px;
		border: 1px solid #dcdee2;
		border-radius: 5px;
		position: absolute;
		z-index: 100;
		background: white;
		top: 40px;
	}

	.searchList div {
		border-bottom: 1px solid #dcdee2;
		padding-left: 6px;
	}

	.searchList div:last-of-type {
		border: none;
	}

	.searchList div:hover {
		cursor: pointer;
	}
</style>
