<template>
	<div>
		<Card title="客户信息" :bordered="false" dis-hover>
			<Row class-name="item">
				<Col span="7">
				<div class="title">客户：</div>{{customertInfo.name}}</Col>
				<Col span="7">
				<div class="title">手机号：</div>{{customertInfo.phone}}</Col>
				<Col span="7">
				<div class="title">身份证号：</div>{{customertInfo.certNo}}</Col>
			</Row>
			<Row class-name="item" type="flex" align="middle">
				<Col span="7" v-for="(item,index ) in customertInfo.resourcePicList" :key="index" v-if="item.type==1">
				<div class="title">身份证正面：</div><img :src="item.picPath" alt=""></Col>
				<Col span="7" v-for="(item,index ) in customertInfo.resourcePicList" :key="index" v-if="item.type==0">
				<div class="title">身份证反面：</div><img :src="item.picPath" alt=""></Col>
				<Col span="7" v-for="(item,index ) in customertInfo.resourcePicList" :key="index" v-if="item.type==2">
				<div class="title">手持半身照：</div><img :src="item.picPath" alt=""></Col>
			</Row>
		</Card>
		<Card :bordered="false" dis-hover style="margin-top: 10px;">
			<Row type="flex" justify="space-between" align="middle" slot="title">
				<Col><span class="addTit">跟进信息</span></Col>
				<Col><Button type="primary" @click="modalResult=true">登记跟进记录</Button></Col>
			</Row>
			<Table :columns="listColumn" :data="listData" border class="item"></Table>
			<Row  type="flex" justify="center" >
				<Col>
					<Button type="primary" ghost @click="$router.push({name:'customer/interested'})">返回</Button>
				</Col>
			</Row>
		</Card>
		<Modal v-model="modalResult" title="登记跟进" @on-cancel="cancelSeeHouseResult('resultData')">
			<Form ref="resultData" :model="resultData" :rules="resultDataRule"  :label-width="80">
				<Row>
					<Col span="14">
					<FormItem prop="eventType" label="事件类型">
						<Select v-model="resultData.eventType" placeholder="事件类型" clearable disabled>
							<Option :value="item.value" v-for="(item,index) in eventTypeLists" :key="index">{{item.name}}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="14">
					<FormItem prop="eventTime" label="事件时间">
						<DatePicker type="date" :options="optionsTime" v-model="resultData.eventTime" format="yyyy-MM-dd" placeholder="事件时间"></DatePicker>
					</FormItem>
					</Col>
					<Col span="14">
					<FormItem prop="roomAddress" label="地址">
						<Input v-model="resultData.roomAddress" type="input" placeholder="地址"></Input>
					</FormItem>
					</Col>
					<Col span="24">
					<FormItem prop="seeHouseStatusResult" label="跟进结果">
						<Input v-model="resultData.seeHouseStatusResult" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="跟进结果"></Input>
					</FormItem>
					</Col>
				</Row>
			</Form>
			<div slot="footer">
				<Button type="default" @click="cancelSeeHouseResult('resultData')">取消</Button>
				<Button type="primary" @click="addSeeHouseResult('resultData')">确认</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				modalResult: false,
				resultData: {
					eventType:"1"
				},
				eventTypeLists: [{
						name: "预约看房",
						value: "0"
					},
					{
						name: "随访",
						value: "1"
					}
				],
				optionsTime: {
					disabledDate(time) {
						return time.getTime() > new Date(new Date().toLocaleDateString()).getTime();
					}
				},
				resultDataRule: {
					eventType: [{
						required: true,
						message: "请选择事件类型",
						trigger: 'change'
					}],
					eventTime: [{
						required: true,
						type: 'date',
						message: "请选择事件时间",
						trigger: 'change'
					}],
					seeHouseStatusResult: [{
						required: true,
						message: "请输入看房结果",
						trigger: 'change'
					}]
				},
				customertInfo: {},
				listData: [],
				listColumn: [{
						title: '事件类型',
						key: 'eventType',
						width:120,
						render: (h, params) => {
							let msg = params.row.eventType == '0' ? "预约看房" : "随访";
							return h('div', {}, msg)
						}
					},
					{
						title: '地址',
						key: 'roomAddress'
					},
					{
						title: '事件时间',
						width:120,
						key: 'eventTime'
					},
					{
						title: '登记时间',
						width:150,
						key: 'createTime'
					},
					{
						title: '跟进结果',
						key: 'seeHouseStatusResult'
					}
				]
			}
		},
		mounted() {
			this.getCustomertInfo();
		},
		methods: {
			getCustomertInfo() {
				this.$ajax.get(this, this.$api.GET_INTENTION_DETAIL.replace("{id}", this.$route.query.id), {}, (res) => {
					this.customertInfo = res.data.content;
					this.listData = res.data.content.moreRecordList;
				});
			},
			formateDate(d) {
				let month = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
				let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
				const newDate = d.getFullYear() + '-' + month + '-' + day;
				return newDate;
			},
			cancelSeeHouseResult(name) {
				this.$refs[name].resetFields();
				this.modalResult = false;
			},
			addSeeHouseResult(name) {
				this.$refs[name].validate(valid => {
					if (valid) {
						let data = JSON.parse(JSON.stringify(this.resultData));
						data.eventTime = this.formateDate(this.resultData.eventTime);
						data.customerId = this.$route.query.id;
						this.$ajax.post(this, this.$api.POST_REGISTRATION_FOLLOW_UP, data,
							res => {
								if (res.code == "200") {
									this.$Message.success("登记跟进成功");
									this.$refs[name].resetFields();
									this.modalResult = false;
									this.getCustomertInfo();
								} else {
									this.$Message.error(res.msg);
								}
							});
					}
				});
			},
		}
	}
</script>

<style scoped>
	.item {
		margin-bottom: 15px;
	}

	.item img {
		width: 70px;
		height: 70px;
		vertical-align: middle;
	}

	.title {
		display: inline-block;
		width: 100px;
		text-align: right;
	}

	.addTit {
		display: inline-block;
		width: 100%;
		height: 20px;
		line-height: 20px;
		font-size: 14px;
		color: #17233d;
		font-weight: 700;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
