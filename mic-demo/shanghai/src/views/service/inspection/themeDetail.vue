<template>
	<Card>
		<Row class="editTitle">
			查看主题
		</Row>
		<Row class-name="detail_item">
			<Col span="6"><span class="label">检查对象：</span><span>{{detail.name}}</span></Col>
			<Col span="6"><span class="label">检查人类型：</span><span>{{detail.operatorType=='in'?'内部':'外部'}}</span></Col>
		</Row>
		<Row class-name="detail_item">
			<Col span="12"><span class="label">主题备注：</span><span>{{detail.node}}</span></Col>
		</Row>
		<Divider dashed />
		<ActiveTable :columns="columns" :data="tableData" :showPager='false'>
		</ActiveTable>
	</Card>
</template>

<script>
	import ActiveTable from "@/components/Helper/Table/ActiveTable.vue";
	export default {
		components: {
			ActiveTable
		},
		data() {
			return {
				detail: {},
				tableData: [],
				columns: [{
						title: "检查项名称",
						key: "name",
						width: 110
					},
					{
						title: "显示顺序",
						key: "priority",
						width: 120
					},
					{
						title: "现场图片要求",
						width: 120,
						render: (h, params) => {
							return h("div", params.row.isImgMust == true ? "必填" : "非必填");
						}
					},
					{
						title: "现场描述要求",
						width: 120,
						render: (h, params) => {
							return h("div", params.row.isTextMust == true ? "必填" : "非必填");
						}
					},
					{
						title: "检查结果选项展示方式",
						width: 180,
						key: "component",
						render: (h, params) => {
							let component = params.row.component;
							let msg = "";
							switch (component) {
								case "0":
									msg = "开关";
									break;
								case "1":
									msg = "弹窗选择";
									break;
								case "2":
									msg = "平铺单选";
									break;
								default:
									break;
							}
							return h("div", msg);
						}
					},
					{
						title: "检查结果选项",
						render: (h, params) => {
							// let btn=
							let array = [];
							params.row.resultSet.forEach(ele => {
								array.push(
									h(
										"Row", {
											prop: {
												type: 'flex',
												justify: 'start',
												align: 'middle'
											},
											style: {
												border: "1px solid rgba(204, 204, 204, 1)",
												borderRadius: "6px",
												height: "30px",
												width: '160px'
											}
										},
										[
											h(
												"Col", {},
												[
													h("Row", {
														props: {
															type: 'flex',
															justify: 'start',
															align: 'middle'
														}
													}, [
														h(
															"Col", {
																props: {
																	span: '8'
																},
																style: {
																	textAlign: 'center'
																}
															},
															[h(
																"span",
																ele.name
															)]
														),
														h(
															"Col", {},
															[h(
																"span", {
																	style: {
																		display: 'inline-block',
																		width: '30px',
																		height: '20px',
																		textAlign: 'center',
																		border: '1px solid red',
																		color: 'red',
																		borderRadius: '3px',
																		marginRight: '5px',
																		visiblity:ele.isCreateRectify=='true'?'visible':'hidden'
																	}
																},
																"重点"
															)]
														),
														h('Col', {}, [
															h("img", {
																style: {
																	width: "20px",
																	marginTop: "5px"
																},
																domProps: {
																	src: params.row.component=='0'?require("../../../assets/icons/important.svg"): params.row.component=='1'?require("../../../assets/icons/important.svg"):require("../../../assets/icons/important.svg")
																}
															})
														]),
														h('Col', {}, "|"),
														h('Col', {
															props: {
																span: '6'
															},
															style: {
																textAlign: 'center',
																color: '#2d8cf0'
															}
														}, "查看")
													])

												]
											),
											h("Col", {})
										]
									)
								)
							})
							return array;
						}
					}
				]
			};
		},
		mounted() {
			const {
				repairId
			} = this.$route.query;
			this.repairId = repairId;
			this.getList();
		},
		methods: {
			getList() {
				this.$ajax.get(
					this,
					this.$api.GET_TOPIC_DETAIL.replace("{id}", this.$route.query.id),
					null,
					res => {
						this.detail = res.data.content;
						this.tableData = this.detail.normSet;
					}
				);
			}
		}
	};
</script>

<style scoped>
	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 60px;
		border-top: none;
	}

	.detail_item {
		margin-bottom: 10px;
	}

	.label {
		width: 90px;
		display: inline-block;
		text-align: right;
	}

	.editTitle {
		font-size: 16px;
		padding: 7px 8px;
		border-bottom: 1px dashed #e9e9e9;
		margin-bottom: 21px;
		position: relative;
	}

	.editTitle:before {
		content: " ";
		display: block;
		position: absolute;
		width: 4px;
		height: 20px;
		background: #e9e9e9;
		left: 0;
		top: 8px;
	}
</style>
