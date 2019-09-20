<template>
	<div>
		<Alert show-icon>
			<Row>
				<Col>1、开启后，租约中公共事业费用可在填写完房屋相关信息后，每月定时自动获取</Col>
				<Col>2、调整后，对所有满足条件的租约即时起效</Col>
			</Row>
		</Alert>
		<Row type="flex" justify="start" align="middle">
			<Col>
			<Checkbox v-model="isAuto">银联直连公共事业收费单位，自动获取每户水电煤账单</Checkbox>
			</Col>
			<Col>
			<Button type="primary" ghost>保存</Button>
			</Col>
		</Row>
		<Divider />
		<Alert show-icon>
			<Row>
				<Col>1、开启后，可为公共事业用度（水、电、煤）设置每月用量的阶梯单价。签订租约时，公共事业费用账单可选择“自定义规则方式”，
				通过录入实际抄表数后自动生产。
				</Col>
				<Col>2、调整后，即时对后续抄表生成的公共事业（水、电、煤）账单生效，不影响已有账单</Col>
			</Row>
		</Alert>
		<Row type="flex" justify="start" align="middle">
			<Col>
			<Checkbox v-model="isPublic">开启自定义公共事业用度（水、电、煤）每月用量阶梯单价设置</Checkbox>
			</Col>
			<Col>
			<Button type="primary" ghost>保存</Button>
			</Col>
		</Row>
		<div v-if="isPublic">
			<Divider />
			<Row type="flex" justify="end">
				<Col class-name="addFeeSchedule"><Button type="primary" ghost @click="addFeeSchedule=true">新增阶梯单价</Button></Col>
			</Row>
			<Table :columns="feeSchedule" :data="feeScheduleDatas"></Table>
		</div>
		<Modal :mask-closable="false" @on-cancel="cancel" v-model="addFeeSchedule" title="添加公共事业用度阶梯单价" width="600">
			<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100">
				<FormItem label="公共事业类型" prop="type">
					<RadioGroup v-model="formCustom.type">
						<Radio label="0">水</Radio>
						<Radio label="1">电</Radio>
						<Radio label="2">煤</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="用度区间" prop="range">
					<Row type="flex" justify="start" align="middle">
						<Col span="4">
						<Input type="text"  number disabled placeholder="输入内容"></Input>
						</Col>
						<Col span="1" class-name="center">-</Col>
						<Col span="4">
						<Input type="text" v-model="formCustom.range"  number placeholder="输入内容" :disabled="formCustom.type==='2'||(formCustom.type==='0'&&isEdit==true)?false:true"></Input>
						</Col>
					</Row>
				</FormItem>
				<Alert show-icon>
					如无法设置，请检查该类型公共事业用度的其他阶梯单价配置的用度区间是否完整
				</Alert>
				<FormItem label="单价" prop="price">
					<Row type="flex" justify="start" align="middle">
						<Col span="4">
						<Input type="text" clearable v-model="formCustom.price" placeholder="输入内容" number></Input>
						</Col>
						<Col span="2" class-name="center">元</Col>
					</Row>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button type="primary" @click="ok">保存</Button>
				<Button @click="cancel">取消</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isAuto: false,
				isPublic: false,
				addFeeSchedule: false,
				isEdit: false,
				feeSchedule: [{
						title: '类型',
						key: 'type'
					},
					{
						title: '用量范围',
						key: 'range'
					},
					{
						title: '单价',
						key: 'price'
					},
					{
						title: '操作',
						key: 'address',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props:{
										"type":"primary"
									},
									style:{
										"marginRight":"10px"
									},
									on: {
										click: (e) => {
											this.addFeeSchedule=true;
											let data={
												price:Number(params.row.type),
												range:Number(params.row.range),
												type:params.row.type
											}
											this.formCustom=data;
											this.isEdit=true;
										}
									}
								}, "修改"),
								h('Button', {
									props:{
										"type":"error"
									},
									on: {
										click: (e) => {
											this.delete(params.row.id);
										}
									}
								}, "删除"),
							]);
						}
					}
				],
				feeScheduleDatas: [{
					type: "0",
					range: "09090",
					price: "500"
				}],
				formCustom: {
					type: "0",
					range: "",
					price: ""
				},
				ruleCustom: {
					price: [{
						required: true,
						trigger: "blur",
						message: '请输入单价',
						type: 'number'
					}],
					range: [{
						required: true,
						trigger: "blur",
						message: '用量范围',
						type: 'number'
					}],
					type: [{
						required: true,
						trigger: "blur"
					}]
				}
			}
		},
		methods: {
			ok() {
				this.$refs['formCustom'].validate((valid) => {
					if (valid) {
						this.$Message.success('Success!');
						this.addFeeSchedule = false;
					} else {
						this.$Message.error('Fail!');
					}
				})
			},
			cancel() {
				this.addFeeSchedule=false;
			},
			delete(query){
				
			}
		}
	}
</script>

<style scoped>
	.addFeeSchedule {
		height: 40px;
	}

	.center {
		text-align: center;
	}
</style>
