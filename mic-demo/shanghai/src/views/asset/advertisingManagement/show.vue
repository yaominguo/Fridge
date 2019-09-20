<template>
	<Card class="advertising-detail" dis-hover>
		<Row class="editTitle">
			广告位详情
		</Row>
		<Row :gutter="20">
			<Col span="3" class="col-left">广告位地址：</Col>
			<Col span="6">
			{{formData.billboardAddress}}
			</Col>
			<Col span="3" class="col-left">广告位编号：</Col>
			<Col span="6">
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
			{{formData.storiedBuilding || '暂无'}}
			</Col>
			<Col span="3" class="col-left">所在楼层：</Col>
			<Col span="6">
			{{formData.floor || '暂无'}}
			</Col>
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
		<Row type="flex" justify="center" style="margin-top:30px">
			<Col><Button type="primary" ghost @click="handleReturn">返回</Button></Col>
		</Row>
	</Card>
</template>
<script>
	export default {
		data() {
			return {
				formData: {},
				billboardTypeLists: [],
				billboardFormLists: []
			}
		},
		methods: {
			getDetail() {
				this.$ajax.get(
					this,
					this.$api.GET_ADVERTISE_DETAIL.replace("{id}", this.$route.query.id), {},
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
			handleReturn() {
				this.$router.push({
					name: 'asset/advertising'
				})
			},
			showUse(query){
				let assetUseMsg="";
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
