<template>
	<Card dis-hover>
		<Row type="flex" justify="end">
			<Col>
			<Button type="primary" @click="importExcel">配租单批量导入</Button>
			<Button type="primary" ghost @click="downloadExcel">下载配租单导入模板</Button>
			</Col>
		</Row>
		<Row class="padding-row">
			<Form ref="form" :v-model="searchData" label-position="right" :label-width="80">
				<Row :gutter="16" class="ov-row">
					<Col span="6">
					<FormItem label="配租人姓名" class="ov-form-item">
						<Input v-model="searchData.rentUserName_l" placeholder="请输入配租人姓名"></Input>
					</FormItem>
					</Col>
					<Col span="6">
					<FormItem label="身份证" class="ov-form-item">
						<Input v-model="searchData.idCard_l" placeholder="请输入身份证"></Input>
					</FormItem>
					</Col>
					<Col span="6">
					<FormItem label="联系电话" class="ov-form-item">
						<Input v-model="searchData.storeName" placeholder="请输入联系电话"></Input>
					</FormItem>
					</Col>

					<Col span="6">
					<FormItem label="所属城区" class="ov-form-item">
						<Select filterable transfer clearable v-model="searchData.county_l" placeholder="请选择所属区域">
							<Option v-for="(item,index) in countyList" :key="index" :label="item.county" :value="item.county"></Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="6">
					<FormItem label="配租项目" class="ov-form-item">
						<Select filterable transfer clearable v-model="searchData.rentHouseProject_l" placeholder="请选择配租项目">
							<Option v-for="(item,index) in rentHouseProjectList" :key="index" :label="item.name" :value="item.name"></Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="18">
					<Row type="flex" justify="end">
						<Col>
						<Button type="primary" @click="getList">查询</Button>
						<Button type="primary" ghost @click="reset">重置</Button>
						</Col>
					</Row>
					</Col>
				</Row>

			</Form>
			<h3 class="ov-form-header">
				<span class="ov-form-header-title">
					查询结果
				</span>
			</h3>
			<Table border :data="data" :columns="columns"></Table>
		</Row>
		<Row class="pager">
			<Page @on-change="changePage" :current="searchData.pageNo" :page-size="searchData.pageSize" :total="searchData.total"
			 show-total />
		</Row>
		<Modal v-model="showModal" title="配租单导入">
			<Row>
				<Col span="10" class="label-col">请上传填写完成的配租单</Col>
				<Col span="8" class="file-col">
				<fileUpload :uploadButton="'upload'" :url="$api.BILING_IMPORT" :defaultList="defaultList" @on-complete="uploadComplete"
				 @on-error="uploadError" :allowExt="allow" :icon="'md-cloud-upload'" :customerBtn="true" :btnTxt="'上传配租单'"></fileUpload>
				</Col>
			</Row>
			<div slot="footer"></div>
		</Modal>
	</Card>
</template>
<script>
	import fileUpload from "../../../../components/Helper/Form/image-upload";
	export default {
		components: {
			fileUpload
		},
		data() {
			return {
				allow: ['xls', 'cls', 'xlsx'],
				defaultList: [],
				showModal: false,
				searchData: {
					pageNo: 1,
					pageSize: 10,
					total: 0,
				},
				data: [],
				countyList: [],
				rentHouseProjectList: [],
				columns: [{
						title: '配租人姓名',
						key: 'rentUserName'
					},
					{
						title: '身份证号',
						key: 'idCard'
					},
					{
						title: '家庭类型',
						key: 'famailType'
					},
					{
						title: '所属城区',
						key: 'county'
					},
					{
						title: '配租项目',
						key: 'rentHouseProject'
					},
					{
						title: '配租房号',
						key: 'houseNo'
					},
					{
						title: '配租房型',
						key: 'housingStructureName'
					},
					{
						title: '状态',
						render: (h, params) => {
							let date = new Date();
							let year = date.getFullYear();
							let month = date.getMonth() + 1;
							let date2 = date.getDate();

							let now = year + '-' + month + '-' + date2;
							let m = new Date(now);
							let e = new Date(params.row.expiredDate);

							if (m.getTime() > e.getTime()) {
								return h('div', '已过期')
							} else {
								if (params.row.status == '0') {
									return h('div', '未入住')
								} else if (params.row.status == '1') {
									return h('div', '已入住')
								}
							}
						}
					},
					{
						title: '操作',
						width: 160,
						render: (h, params) => {
							let arr = [];
							arr.push(
								h('Button', {
									props: {
										type: 'primary'
									},
									style: {
										marginRight: '10px'
									},
									on: {
										click: () => {
											this.show(params.row)
										}
									}
								}, '查看'),
							)


							let date = new Date();
							let year = date.getFullYear();
							let month = date.getMonth() + 1;
							let date2 = date.getDate();

							let now = year + '-' + month + '-' + date2;
							let m = new Date(now);
							let s = new Date(params.row.effectiveDate);
							let e = new Date(params.row.expiredDate);

							if ((params.row.status == '0' || params.row.status == '1') && s.getTime() <= m.getTime() && e.getTime() >= m.getTime()) {
								arr.push(
									h('Button', {
										on: {
											click: () => {
												this.registration(params.row);
											}
										}
									}, '登记')
								)
							}
							return arr;
						}
					}
				]
			}
		},
		methods: {
			// 导入按钮
			importExcel() {
				this.showModal = true;
			},
			// 上传成功
			uploadComplete(res) {
				// this.showModal=false;
				// this.$Message.success('上传成功');
				// this.getList();
				this.showModal = false;
				this.$com.handleUploadResponse(res.data.content);
				this.getList();
			},
			uploadError(error, file, fileList) {
				this.showModal = false;
				if (file.code == '710') {
					this.$com.handleUploadResponse(file.msg);
				} else {
					this.$Message.error('导入失败');
				}
				this.getList();
			},
			// 下载模板
			downloadExcel() {
				window.open(this.$api.IMGURL + '/template/配租通知单.xlsx');
			},
			// 查询城区列表
			getCountyList() {
				this.$ajax.get(
					this,
					this.$api.ASSET_ZONE, {}, (res) => {
						this.countyList = res.data.content;
					}
				)
			},
			// 查询项目列表
			getRentHouseProjectList() {
				this.$ajax.get(
					this,
					this.$api.ASSET_PROJECT, {}, (res) => {
						this.rentHouseProjectList = res.data.content;
					}
				)
			},
			getList() {
				let params = JSON.parse(JSON.stringify(this.searchData));
				delete params.total;
				this.$ajax.post(
					this,
					this.$api.BILLING_LIST,
					params,
					(res) => {
						this.searchData.total = res.data.totalRows;
						this.data = res.data.content;
					}
				)
			},
			// 重置
			reset() {
				this.searchData = {
					pageNo: 1,
					pageSize: 10
				};
				this.getList();
			},
			// 页数改变
			changePage(page) {
				this.searchData.pageNo = page;
				this.getList();
			},
			// 查看
			show(params) {
				this.$router.push({
					name: 'publicHousing/lease/billingShow',
					query: {
						id: params.id
					}
				})
			},
			// 登记
			registration(params) {
				this.$router.push({
					name: 'publicHousing/lease/billingRegistration',
					query: {
						id: params.id
					}
				})
			}
		},
		mounted() {
			this.getList();
			this.getCountyList();
			this.getRentHouseProjectList();
		}
	}
</script>
<style scoped>
	.ov-row {
		border-bottom: 1px solid #e0e0e0;
		margin-bottom: 20px;
	}

	.pager {
		margin: 20px;
		text-align: center;
	}

	.padding-row {
		padding: 20px;
	}

	.ov-form-header-span {
		font-size: 12px;
	}

	.ov-form-header {
		text-align: left;
		font-size: 16px;
		padding-bottom: 8px;
		margin-bottom: 16px;
	}

	.label-col {
		height: 30px;
		line-height: 30px;
	}

	.file-col {
		margin-left: -60px;
	}
</style>
