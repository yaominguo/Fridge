<template>
	<div>
		<Card dis-hover :bordered="false">
			<ActiveForm
				labelPosition="right"
				:labelWidth="90"
				:header="header"
				:layout="searchLayout"
				:model="renewal"
			/>
			<div class="btn-box">
				<Button type="primary" @click="handleSearch">查询</Button>
				<Button @click="handleReset">重置</Button>
			</div> 
			<ActiveTable 
				:showTitle="true"
				:columns="columns1"
				:data="list"
				:pageSize="params.pageSize"
				:current="params.pageNo"
				:total="totalRows"
				@on-page-change="pageChange"
			/>
			<!-- <Table :columns="columns1" :data="list" class="table" style="margin-top: 10px;"></Table>
			<div class="page">
				<Page :total="totalRows" show-sizer show-total @on-change="pageChange" @on-page-size-change="pageSizeChange" />
			</div> -->
		</Card>
	</div>
</template>
<script>
import ActiveForm from "@/components/Helper/Form/ActiveForm.vue";
import ActiveTable from '@/components/Helper/Table/ActiveTable';
	export default {
		components: {
			ActiveTable,
			ActiveForm
		},
		data() {
			return {
				header: {
					title: "续约申请列表"
				},
				renewal: {
                    applyType:'1',
                    applyStatus:'$all'
				},
				searchLayout:[
					{
						creatorId_l: {
							label: "姓名",
							type: "input",
							width: 6
						},
						mobile_l: {
							label: "联系电话",
							type: "input",
							width: 6
						},
						certNo_l: {
							label: "证件号",
							type: "input",
							width: 6
						},
						houseAddress_l: {
							label: "房屋地址",
							type: "input",
							width: 6
						}
					},
					{
						applyStatus: {
							label: "状态",
							type: "select",
							width: 6,
							options:[
								{
									text:'全部',value:'$all'
								},
								{
									text:'申请中',value:'0'
								},
								{
									text:'已处理',value:'1'
								}
							]
						}
					}
				],
				renewalRule: {

				},
				params: {
					pageNo: 1,
                    pageSize: 10,
				},
				list: [],
				totalRows: 0,
				// roomNameLists: [],
				columns1: [{
						title: '承租人',
						key: 'creatorId',
						// render: (h, params) => {
						// 	let name = params.row.name;
						// 	let isType = params.row.isLessee == "1" ? "承租人" : "入住人";
						// 	let color = params.row.isLessee == "1" ? "#2d8cf0" : "#ff9900";
						// 	return h('div', [
						// 		h('span', {}, name),
						// 		h('span', {
						// 			style: {
						// 				"display": "inline-block",
						// 				"width": "50px",
						// 				"height": "18px",
						// 				"border": "1px solid #2d8cf0",
						// 				"border-color": color,
						// 				"color": color,
						// 				"fontSize": "12px",
						// 				"text-align": "center",
						// 				"borderRadius": "5px",
						// 				"marginLeft": "5px",

						// 			}
						// 		}, isType)
						// 	]);
						// }
					},
					{
						title: '性别',
						key: 'sex',
						render: (h, params) => {
							let sex = params.row.sex == 0 ? "男" : "女"
							return h('span', {}, sex);
						}
					},
					{
						title: '联系电话',
						key: 'mobile',
						minWidth:80,
						// minWidth: 100,
					},
					{
						title: '证件',
						minWidth:80,
						key: 'certType',
						render: (h, params) => {
							let certType = "";
							let type = params.row.certType;
							if (type == "0") {
								certType = "身份证"
							} else if (type == "1") {
								certType = "护照"
							} else if (type == "2") {
								certType = "台胞证"
							} else if (type == "3") {
								certType = "港澳通行证"
							}
							return [
                                h('div', {}, params.row.certNo),
                                h('div', {}, certType)
                            ]
						}
					},
					{
						title: '房源地址',
						key: 'residentStatus',
						width: 200,
						render: (h, params) => {
							// let certType = "";
							// let type = params.row.residentStatus;
							// if (type == "0") {
							// 	certType = "在住"
							// } else if (type == "1") {
							// 	certType = "搬离"
							// } else if (type == "2") {
							// 	certType = "删除"
							// }
							return h('span', {}, params.row.houseAddress);
						}

					},
					{
						title: '租约起止日期',
						// key: 'checkinTime',
						minWidth:60,
						render:(h,params)=>{
							return [
								h('div','起期：'+this.$com.strTime(params.row.wishStartTime)),
								h('div','止期：'+this.$com.strTime(params.row.wishEndTime))
							]
						}
					},
					{
						title: '申请续约日期',
						minWidth:60,
						// key: 'retreatTime'
                        render:(h,params)=>{
                            return h('div',this.$com.strTime(params.row.retreatTime))
                        }
					},
					{
						title:'状态',
						render:(h,params)=>{
							let _status=params.row.applyStatus=='0'?'申请中':'已完成';
							return h('div',_status)
						}
					},
					{
						title: '操作',
						render: (h, params) => {
							let str = {
								leaseId: params.row.contractId,
								roomId: params.row.roomId,
								fromAccount: '0'
							}
							return h('div', [
								h('Button', {
									props:{
										size:'small'
									},
									style: {
										"display": "inline-block",
										"marginRight": "6px"
									},
									on: {
										click: (e) => {
											this.$router.push({
												name: 'contract-detail',
												params: str
											})
										}
									}
								}, "查看租约")
							]);
						}
					}
				],
			}
		},
		mounted() {
			//租客列表
			this.handleSearch();
			//小区/公寓/门牌号列表
			// this.getList();
		},
		methods: {
            // 查询小区公寓
			// getList() {
			// 	this.$ajax.get(
			// 		this,
			// 		this.$api.GET_TEANANT_HOUSE_ADDRESS, {},
			// 		(res) => {
			// 			this.roomNameLists = res.data.content;
			// 		}
			// 	);
            // },
            // 查询列表
			handleSearch() {
                let str = "?pageNo=" + this.params.pageNo + "&pageSize=" + this.params.pageSize
                let params=JSON.parse(JSON.stringify(this.renewal));
				for (let i in this.params) {
					if (params[i] == "") {
						delete params[i];
                    }
                    if(params.applyStatus == '$all'){
                        delete params.applyStatus;
                    }
				}
				this.$ajax.get(this, this.$api.APPLYINFO_LIST + str, params,
					res => {
						this.totalRows = res.data.totalRows;
						this.list = res.data.content;
					});
            },
            // 重置
			handleReset() {
				this.renewal={};
                this.renewal.applyType='1';
                this.renewal.applyStatus='$all'
                this.params.pageNo=1;
                this.params.pageSize=10;
				this.handleSearch();
            },
            // 切换页码
			pageChange(val) {
				this.params.pageNo = val;
				this.handleSearch();
            },
            // 切换页数
			pageSizeChange(val) {
				this.params.pageSize = val;
				this.handleSearch();
			},
		}
	}
</script>
<style scoped>
	.btn-box {
		display: flex;
		justify-content: flex-end;
	}
	.btn-box>button {
		margin-left: 10px;
		min-width: 86px;
	}
</style>
