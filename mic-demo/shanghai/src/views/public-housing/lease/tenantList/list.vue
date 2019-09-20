<template>
	<div>
		<Card dis-hover :bordered="false">
			<Form ref="tenantInfo" :model="tenantInfo" :rules="tenantInfoRule" :label-width="80" class="formColor">
				<Row :gutter="30">
					<Col span="6">
					<FormItem prop="roomName" label="小区/公寓/门牌号" :label-width="110" clearable>
						<!-- <Select filterable v-model="tenantInfo.roomName" placeholder="请选择">
							<Option :value="item.shouName" v-for="(item,index) in roomNameLists" :key="index">{{item.shouName}}</Option>
						</Select> -->

						<Input type="text" v-model="tenantInfo.roomName" placeholder="小区/公寓/门牌号">
						</Input>
					</FormItem>
					</Col>
					<Col span="6">
					<FormItem prop="name" label="入住人姓名">
						<Input type="text" v-model="tenantInfo.name" placeholder="入住人姓名">
						</Input>
					</FormItem>
					</Col>
					<Col span="6">
					<FormItem prop="phone" label="入住人电话">
						<Input type="text" v-model="tenantInfo.phone" placeholder="入住人电话">
						</Input>
					</FormItem>
					</Col>
					<Col span="6">
					<FormItem prop="date" label="入住时间">
						<DatePicker type="daterange" v-model="tenantInfo.date" format="yyyy-MM-dd" placeholder="入住时间"></DatePicker>
					</FormItem>
					</Col>
				</Row>
				<Row :gutter="10" type="flex" justify="end">
					<Col>
					<Button type="primary" @click="handleSearch('tenantInfo')">查询</Button>
					</Col>
					<Col>
					<Button type="default" @click="handleReset('tenantInfo')">重置</Button>
					</Col>
				</Row>
			</Form>
			<searchResult style="margin-top: 20px;" :isAdd="false" @addLists="addList" @pageChange="pageChange" @pageSizeChange="sizeChange"
			 :lists="lists" :totalRows="totalRows" :pageNo="params.pageNo" :pageSize="params.pageSize" :isPage="true"></searchResult>
		</Card>
	</div>
</template>
<script>
	import searchResult from "./components/tenantTable"
	export default {
		components: {
			searchResult
		},
		data() {
			return {
				tenantInfo: {

				},
				tenantInfoRule: {

				},
				params: {
					pageNo: '1',
					pageSize: "10"
				},
				lists: [],
				totalRows: 0,
				current: 10,
				// roomNameLists: []
			}
		},
		mounted() {
			//租客列表
			this.handleSearch();
			//小区/公寓/门牌号列表
			// this.getList();
		},
		methods: {
			formateDate(d) {
				let month = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
				let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
				const newDate = d.getFullYear() + '-' + month + '-' + day ;
				return newDate;
			},
			// getList() {
			// 	this.$ajax.get(
			// 		this,
			// 		this.$api.GET_TEANANT_HOUSE_ADDRESS, {},
			// 		(res) => {
			// 			this.roomNameLists = res.data.content;
			// 		}
			// 	);
			// },
			handleSearch() {
				let str = "?pageNo=" + this.params.pageNo + "&pageSize=" + this.params.pageSize
				for (let i in this.tenantInfo) {
					if (this.tenantInfo[i] == "") {
						delete this.tenantInfo[i];
					}
					if (i == "date") {
						if (this.tenantInfo[i].length > 0 && this.tenantInfo[i][0] != "" && this.tenantInfo[i][1] != "") {
							this.tenantInfo.checkinTime = this.formateDate(this.tenantInfo[i][0]) + "~" + this.formateDate(this.tenantInfo[i]
								[1]);
							// delete this.tenantInfo["date"];
						} else {
							// delete this.tenantInfo["date"];
						}
					}
				}
				this.$ajax.post(this, this.$api.TEANANT_LIST_POST + str, this.tenantInfo,
					res => {
						this.totalRows = res.data.totalRows;
						this.lists = res.data.content;
					});
			},
			handleReset() {
				this.tenantInfo = {};
				this.handleSearch();
			},
			pageChange(val) {
				this.params.pageNo = val;
				this.handleSearch();
			},
			sizeChange(val) {
				this.params.pageSize = val;
				this.handleSearch();
			},
			addList() {
				this.handleSearch();
			}
		}
	}
</script>
<style scoped>
	.formColor {
		/* background: #fbfbfb; */
		padding: 20px;
		/* border: 1px solid #e0e0e0; */
		margin-top: 10px;
	}
</style>
