<template>
	<Card class="advertising-detail">
		<Row class="editTitle">
			广告位
		</Row>
		<Row :gutter="20">
			<Col span="3" class="col-left">广告位地址：</Col>
			<Col span="20">
			{{formData.billboardAddress}}
			</Col>
		</Row>
		<Row :gutter="20">
			<Col span="3" class="col-left">广告位编号：</Col>
			<Col span="20">
			{{formData.advertNumber}}
			</Col>
		</Row>
		<Row :gutter="20">
			<Col span="3" class="col-left">广告位类型：</Col>
			<Col span="6">
			{{showBillboardType(formData.billboardType)}}
			</Col>
			<Col span="3" class="col-left">广告位形式：</Col>
			<Col span="6">
			<!-- {{formData.billboardForm}} -->
			{{showBillboardForm(formData.billboardForm)}}
			</Col>
		</Row>
		<Row :gutter="20">
			<Col span="3" class="col-left">预测面积：</Col>
			<Col span="6">
			{{formData.predictedArea}}㎡
			</Col>
			<Col span="3" class="col-left">实用面积：</Col>
			<Col span="6">
			{{formData.usableArea}}㎡
			</Col>
		</Row>
		<Row :gutter="20">
			<Col span="3" class="col-left">长宽高(cm)：</Col>
			<Col span="6">
			{{formData.billboardLength}}*{{formData.billboardWide}}*{{formData.billboardHigh}}
			</Col>
			<Col span="3" class="col-left">用途：</Col>
			<Col span="6">
			{{showUse(formData.assetUse)}}
			</Col>
		</Row>
		<Row :gutter="20">
			<Col span="3" class="col-left">楼栋：</Col>
			<Col span="6">
			{{formData.storiedBuilding||'暂无'}}
			</Col>
			<Col span="3" class="col-left">所在楼层：</Col>
			<Col span="6">
			{{formData.floor||'暂无'}}
			</Col>
		</Row>
		</Row>
			<Row :gutter="20">
			<Col span="3" class="col-left">出资人：</Col>
			<Col span="6">
			{{formData.contributor || '暂无'}}
			</Col>
		</Row>
		<Divider dashed />
		<Row :gutter="20">
			<Col span="3" class="col-left">每平方米单价：</Col>
			<Col span="6">
			{{formData.unitRent}}元/㎡
			</Col>
			<Col span="3" class="col-left">月租金：</Col>
			<Col span="6">
			{{formData.rent}}元
			</Col>
		</Row>
		<Row :gutter="20">
			<Col span="3" class="col-left">付款方式：</Col>
			<Col span="6">
			付{{formData.payNum}}押{{formData.custodyNum=="0"?"自定义":formData.custodyNum}}
			</Col>
			<Col span="3" class="col-left">押金：</Col>
			<Col span="6">
			{{formData.deposit}}元
			</Col>
		</Row>
		<Row :gutter="20" v-if="formData._rentType">
			<Col span="3" class="col-left">收租日：</Col>
			<Col span="6">
			{{formData._rentType}}
			</Col>
		</Row>
		<Row class="editTitle">
			审批结果
		</Row>
		<Table border :data="result" class="table" :columns="col"></Table>
		<Row type="flex" justify="center" :gutter="10" style="margin-top: 10px;">
			<Col>
			<Button type="primary" :to="{name:'asset/audit',params:{tabs:'advertising'}}" ghost>返回</Button>
			</Col>
			<Col v-if="formData.operationStatus=='待审批'">
			<Button type="primary" @click="approBtn">审核</Button>
			</Col>
		</Row>
		<Modal v-model="approShow" title="审批" :mask-closable="false" @on-cancel="cancelAppro">
			<Form ref="approData" :model="approData" :rules="approRule" :label-width="120">
				<FormItem prop="type" label="审批结果：">
					<RadioGroup v-model="approData.type">
						<Radio label="5">审批通过</Radio>
						<Radio label="7">审批驳回</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem prop="reason" label="审批原因：">
					<Input v-model="approData.reason" type="textarea" :rows="4" placeholder="请输入" />
				</FormItem>
			</Form>
			<div slot="footer">
				<Button type="primary" @click="cancelAppro" ghost>取消</Button>
				<Button type="primary" @click="saveAppro">提交</Button>
			</div>
		</Modal>
	</Card>
</template>
<script>
	export default {
		data() {
			return {
				formData: {},
				col: [{
						title: '审批结果',
						width: 150,
						key: 'operationStatus'
					},
					{
						title: '审批内容',
						key: 'auditReason'
					},
					{
						title: '审批时间',
						width: 150,
						render: (h, params) => {
							return h('div', {}, this.$com.strTime(params.row.operationTime))
						}
					}
				],
				result: [],
				approShow: false,
				approData: {},
				approRule: {
					type: [{
						required: true,
						message: '请选择',
						trigger: 'change'
					}, ],
					reason: [{
						required: true,
						message: '请输入',
						trigger: 'blur'
					}, ]
				},
				billboardTypeLists: [],
				billboardFormLists: []
			}
		},
		methods: {
			getDetail() {
				this.$ajax.get(
					this,
					this.$api.GET_ADVERTISE_APPROVAL_DETAIL.replace("{id}", this.$route.query.id), {},
					(res) => {
						let data = res.data.content == null ? [] : res.data.content;
						if (data.rentType) {
							if (data.rentType == '1') {
								data._rentType = '提前' + data.rentDay + '天收租'
							} else if (data.rentType == '2') {
								data._rentType = '固定' + data.rentDay + '日收租（每期的第一个月）'
							} else if (data.rentType == '3') {
								data._rentType = '固定' + data.rentDay + '日收租（每期提前一个月）'
							}
						}
						this.formData = data;
						this.result = [data]
					}
				)
			},
			getAdvertiseType() {
				this.$ajax.get(
					this,
					this.$api.GET_ADVERTISE_TYPE, {},
					res => {
						this.billboardTypeLists = res.data.content;
					}
				);
				this.$ajax.get(
					this,
					this.$api.GET_ADVERTISE_FORM, {},
					res => {
						this.billboardFormLists = res.data.content;
					}
				);
			},
			showBillboardType(query) {
				let msg = "";
				this.billboardTypeLists.forEach(ele => {
					if (ele.id == query) {
						msg = ele.typeName;
					}
				})
				return msg;
			},
			showBillboardForm(query) {
				let msg = "";
				this.billboardFormLists.forEach(ele => {
					if (ele.id == query) {
						msg = ele.typeName;
					}
				})
				return msg;
			},
			approBtn() {
				this.approShow = true;
				this.approData.id = this.$route.query.id;
			},
			cancelAppro() {
				this.approShow = false;
				this.$refs['approData'].resetFields();
			},
			showUse(query) {
				let assetUseMsg = "";
				switch (query) {
					case "0":
						assetUseMsg = "自用"
						break;
					case "1":
						assetUseMsg = "出租"
						break;
					case "2":
						assetUseMsg = "出售"
						break;
					default:
						break;
				}
				return assetUseMsg;
			},
			saveAppro() {
				this.$refs['approData'].validate((valid) => {
					if (!valid) return;
					this.$ajax.put(
						this,
						this.$api.AUDITS_PARK_AUDIT.replace('{type}', '2').replace('{id}', this.approData.id) +
						'?status=' + this.approData.type + '&reason=' + this.approData.reason, {},
						(res) => {
							this.$Message.success('提交成功');
							this.cancelAppro();
							this.$router.push({
								name: 'asset/audit',
								params: {
									tabs: 'advertising'
								}
							})
						}
					)
				})
			},
		},
		mounted() {
			this.getDetail();
			this.getAdvertiseType();
		}
	}
</script>
<style scoped>
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

	.col-left {
		text-align: right;
	}

	.advertising-detail .ivu-row {
		margin: 10px 0px;
	}
</style>
