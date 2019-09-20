<template>
	<Card dis-hover :bordered="false">
		<Row :gutter="16">
			<Col span="5">
			<Row>
				<Col>
				<h1>组织架构</h1>
				</Col>
				<Col>
				<p class="desc">修改房源分店可在列表中使用“设置分店”功能进行批量操作。</p>
				</Col>
				<Col>
				<Alert>
					<Timeline>
						<TimelineItem v-for="(item,index) in storeLists" :key="index" class="timeDom" v-if="item.status==1">
							<p class="time" @click="changeStore(index)" :class="{active:highLighIndex==index}">{{item.storeName}}</p>
						</TimelineItem>
					</Timeline>
				</Alert>
				</Col>
			</Row>
			</Col>
			<Col span="19">
			<Row>
				<Form :model="formSearch" :label-width="80" :rule="formSearchRules">
					<Row>
						<Col span="8">
						<FormItem label="房源类型">
							<Select v-model="formSearch.buildType">
								<Option value="0">分散式</Option>
								<Option value="1">集中式</Option>
							</Select>
						</FormItem>
						</Col>
						<Col span="8">
						<FormItem label="所属区域">
							<Select v-model="formSearch.countyName" filterable>
								<Option v-for="(item,index) in areaLists" :key="index" :value="item.id">{{item.provinceName}}{{item.cityName}}{{item.areaName}}</Option>
							</Select>
						</FormItem>
						</Col>
						<Col span="8">
						<FormItem label="小区/公寓">
							<Select v-model="formSearch.communityId" filterable>
								<Option v-for="(item,index) in communityList" :value="item.id" :key="index">{{ item.name }}</Option>
							</Select>
						</FormItem>
						</Col>
					</Row>
					<Row>
						<Col>
						<Col span="8">
						<FormItem label="负责员工">
							<Select v-model="formSearch.staffName">
								<Option :value="item.name" v-for="(item,index) in clerkLists" :key="index">{{item.name}}</Option>
							</Select>
						</FormItem>
						</Col>
						<Col span="8">
						<FormItem label="门牌号">
							<Input v-model="formSearch.roomNo" placeholder="门牌号"></Input>
						</FormItem>
						</Col>
						</Col>
					</Row>
					<Row type="flex" justify="end">
						<Col>
						<Button @click="reset">清空</Button>
						<Button type="primary" @click="search">查询</Button>
						</Col>
					</Row>
				</Form>
			</Row>
			<Row>
				<Col>
				<Button @click="setStoreFun('store')">设置所属分店</Button>
				<Button @click="setStoreFun('clerk')">设置负责员工</Button>
				</Col>
				<Col>
				<Table @on-selection-change="tableSelect" style="margin-top:10px" border ref="selection" :columns="listColumns"
				 :data="listDatas"></Table>
				</Col>
			</Row>
			<Row type="flex" justify="center">
				<Col>
				<Page :total="totalRows" show-sizer show-total @on-change="pageChange" @on-page-size-change="pageSizeChange" style="margin-top:10px"></Page>
				</Col>
			</Row>
			</Col>
		</Row>
		<Modal v-model="setBranch" title="设置分店">
			<Row type="flex" justify="start" align="middle">
				<Col span="7">将已选择房源分配至</Col>
				<Col span="17">
				<Select v-model="modalBuildType">
					<Option v-for="(item,index) in storeLists" :key="index" :value="item.id">{{item.storeName}}</Option>
				</Select>
				</Col>
			</Row>
			<Row style="margin:10px 0">
				<Col span="7">
				<h3>已选择房源</h3>
				</Col>
			</Row>
			<Row>
				<Col span="24">
				<div class="selectionContainer">
					<div v-for="(item,index) in sectionLists" :key="index">{{item.buildingCode+ "栋" + item.unitNo+ "单元" +item.roomNo}}</div>
				</div>
				</Col>
			</Row>
			<div slot="footer">
				<Button type="default" @click="setBranchCancel">取消</Button>
				<Button type="primary" @click="setBranchSave">确认</Button>
			</div>
		</Modal>
		<Modal v-model="setClerk" title="设置负责员工">
			<Row type="flex" justify="start" align="middle">
				<Col span="7">设置负责员工</Col>
				<Col span="17">
				<Select v-model="modalStaffName">
					<Option :value="item.name" v-for="(item,index) in clerkLists" :key="index">{{item.name}}</Option>
				</Select>
				</Col>
			</Row>
			<Row style="margin:10px 0">
				<Col span="7">
				<h3>已选择房源</h3>
				</Col>
			</Row>
			<Row>
				<Col span="24">
				<div class="selectionContainer">
					<div v-for="(item,index) in sectionLists" :key="index">{{item.buildingCode+ "栋" + item.unitNo+ "单元" +item.roomNo}}</div>
				</div>
				</Col>
			</Row>
			<div slot="footer">
				<Button type="default" @click="setClerkCancel">取消</Button>
				<Button type="primary" @click="setClerkSave">确认</Button>
			</div>
		</Modal>
	</Card>
</template>
<script>
	export default {
		data() {
			return {
				formSearch: {},
				formSearchRules: {},
				listColumns: [{
						type: "selection",
						width: 60,
						align: "center"
					},
					{
						title: "区域",
						key: "countyName"
					},
					{
						title: "房源类型",
						key: "buildType",
						render: (h, params) => {
							let str = params.row.buildType == "0" ? "分散式" : "集中式";
							return h("div", {}, str);
						}
					},
					{
						title: "小区/公寓",
						key: "communityName"
					},
					{
						title: "门牌号",
						key: "roomNo",
						render: (h, params) => {
							let str =
								params.row.buildingCode +
								"栋" +
								params.row.unitNo +
								"单元" +
								params.row.roomNo;
							return h("div", {}, str);
						}
					},
					{
						title: "负责员工",
						key: "staffName"
					},
					{
						title: "操作",
						width: 200,
						render: (h, params) => {
							return h("div", [
								h(
									"Button", {
										props: {
											type: "default",
											size: "small"
										},
										style: {
											marginRight: "5px"
										},
										on: {
											click: () => {
												this.setStoreFun("store", params.row);
											}
										}
									},
									"更改分店"
								),
								h(
									"Button", {
										props: {
											type: "default",
											size: "small"
										},
										on: {
											click: () => {
												this.setStoreFun("clerk", params.row);
											}
										}
									},
									"设置负责员工"
								)
							]);
						}
					}
				],
				listDatas: [],
				setBranch: false,
				setClerk: false,
				areaLists: [],
				communityList: [],
				storeLists: [],
				clerkLists: [],
				highLighIndex: 0,
				totalRows: 0,
				pageSize: 10,
				pageNo: 1,
				storeId: "",
				sectionLists: [],
				modalBuildType: "",
				modalStaffName: ""
			};
		},
		mounted() {
			//查询区域列表
			this.getAreaList();
			//小区列表
			this.getCommunity();
			//店铺列表
			this.getStore();
		},
		methods: {
			getAreaList() {
				this.$ajax.get(this, this.$api.GET_AREA_LIST, {}, res => {
					this.areaLists = res.data.content;
				});
			},
			getCommunity() {
				this.$ajax.get(
					this,
					this.$api.GET_COMMUNITY_LIST + "?pageSize=1000", {},
					res => {
						this.communityList = res.data.content;
					}
				);
			},
			getStore() {
				this.$ajax.get(this, this.$api.GET_USER_STORE, {}, res => {
					this.storeLists = res.data.content;
					if (this.storeLists.length > 0) {
						this.storeId = this.storeLists[0].id;
						this.getHouseLists();
						this.getClerk();
					}
				});
			},
			getHouseLists() {
				let str = "";
				for (let i in this.formSearch) {
					if (this.formSearch[i] == "") {
						delete this.formSearch[i];
					} else {
						str += "&" + i + "=" + this.formSearch[i];
					}
				}
				this.$ajax.get(
					this,
					this.$api.GET_HOUST_LISTS_BY_STORE +
					"?storeId=" +
					this.storeId +
					"&pageSize=" +
					this.pageSize +
					"&pageNo=" +
					this.pageNo +
					str, {},
					res => {
						this.listDatas = res.data.content;
						this.totalRows = res.data.totalRows;
					}
				);
			},
			getClerk(query) {
				this.$ajax.get(
					this,
					this.$api.GET_CLERK_LISTS.replace("{id}", this.storeId), {},
					res => {
						this.clerkLists = res.data.content;
					}
				);
			},
			changeStore(query) {
				this.highLighIndex = query;
				this.storeId = this.storeLists[query].id;
				this.getHouseLists();
				this.getClerk();
			},
			reset() {
				this.formSearch = {};
				this.getHouseLists();
			},
			search() {
				this.getHouseLists();
			},
			pageChange(val) {
				this.pageNo = val;
				this.getHouseLists();
			},
			pageSizeChange(val) {
				this.pageSize = val;
				this.getHouseLists();
			},
			tableSelect(selection) {
				this.sectionLists = selection;
			},
			setStoreFun(query, data) {
				if (!data) {
					if (this.sectionLists.length == 0) {
						this.$Message.error("请先勾选房源!");
					} else {
						if (query == "store") {
							this.setBranch = true;
						} else {
							this.setClerk = true;
						}
					}
				} else {
					if (query == "store") {
						this.setBranch = true;
						this.sectionLists = [data];
					} else {
						this.setClerk = true;
						this.sectionLists = [data];
					}
				}
			},
			setBranchCancel() {
				this.setBranch = false;
			},
			setClerkCancel() {
				this.setClerk = false;
			},
			//保存设置分店
			setBranchSave() {
				if (this.modalBuildType == "") {
					return;
				}
				let data = {};
				data.storeId = this.modalBuildType;
				let array = [];
				this.sectionLists.forEach(ele => {
					array.push(ele.id);
				});
				data.houseIds = array;
				this.$ajax.put(this, this.$api.PUT_HOUSE_DISTRIBUTION, data, res => {
					this.$Message.success("新增成功！");
					this.setBranch = false;
				});
			},
			//保存设置负责员工
			setClerkSave() {
				if (this.modalStaffName == "") {
					return;
				}
				let data = [];
				this.sectionLists.forEach(ele => {
					let obj = {};
					obj.staffId = this.modalStaffName;
					obj.houseId = ele.id;
					obj.houseName = ele.buildingCode + ele.unitNo + ele.roomNo;
					data.push(obj);
				});
				//console.log(data);
				this.$ajax.post(this, this.$api.PUT_CLERK_DISTRIBUTION, data, res => {
					this.$Message.success("新增成功！");
					this.setClerk = false;
				});
			}
		}
	};
</script>
<style scoped>
	h1 {
		font-size: 22px;
		line-height: 38px;
		font-weight: 500;
	}

	.desc {
		margin-bottom: 10px;
	}

	.selectionContainer {
		border: 1px solid #dcdee2;
	}

	.selectionContainer div {
		height: 40px;
		line-height: 40px;
		padding-left: 10px;
		border-bottom: 1px solid #dcdee2;
	}

	.selectionContainer div:last-of-type {
		border: none;
	}

	.active {
		color: #2d8cf0;
		font-weight: bold;
	}

	.timeDom:hover {
		cursor: pointer;
	}
</style>
