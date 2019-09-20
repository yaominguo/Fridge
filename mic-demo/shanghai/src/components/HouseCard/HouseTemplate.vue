<template>
	<div class="house-card-template">
		<h4 class="house-card-template-header">
			<span class="filter-header-title">房间模板（warm+公寓碧海栈）</span>
		</h4>
		<Row>
			<Col>
			<Button type="primary" long ghost @click="handleCreatTemplate" v-if="!isCreateTemplate">创建模板</Button>
			<Button type="primary" long ghost @click="handleCancelTemplate" v-else>取消模板创建</Button>
			</Col>
		</Row>
		<Row type="flex" justify="space-between" :gutter="5" align="middle" v-if="isCreateTemplate" style="margin-top:10px">
			<Col span="18">
			<Row type="flex" align="middle" :gutter="10">
				<Col span="14">
				<Input placeholder="请输入模板名称" v-model="createTemplateName" />
				</Col>
				<Col span="10">
				<div style="font-size:12px">
					已选{{selectHouse.length}}间房
				</div>
				</Col>
			</Row>
			</Col>
			<Col span="5">
			<Button type="primary" @click="handleAddTemplate">确定</Button>
			</Col>
		</Row>
		<Divider dashed />
		<Row class="house-card-filter-container">
			<Col>
			<Collapse v-model="value1" accordion v-if="templateLists.length>0">
				<Panel hide-arrow v-for="(item,index) in  templateLists" :key="index">
					<Row type="flex" justify="space-between" align="middle">
						<Col>{{item.name}}</Col>
						<Col>
						<Icon type="ios-trash-outline" :color="'red'" :size="18" @click="handleDelete(item.id)" />
						</Col>
					</Row>
					<div slot="content">
						<div class="houseCard" v-for="(item,it) in  item.roomMongoList" :key="it" @click="selectTemplate(index,it)"
						 :class="{'houseCardActive':index==showPanelIndex&&it==showHouseCardIndex}">
							<Row type="flex" justify="space-between" align="middle" class="houseCardTitle">
								<Col span="16">
								<span class="filter-header-title">{{item.roomNo}} <span v-if="selectHouse.length>0">（已选{{selectHouse.length}}间）</span>
								</span>
								</Col>
								<Col span="6">
								<div style="color:#2d8cf0;font-size:12px" @click="clearSelect()">
									清除已选
								</div>
								</Col>
							</Row>
							<Divider dashed style="margin:5px 0" />
							<Row style="padding:0 5px;font-size:10px">
								<Col>
								￥{{item.rent}}（付{{item.payNum}}押{{item.mortgageNum}}）{{item.roomNum}}室{{item.parlourNum}}厅{{item.toiletNum}}卫 ({{item.roomSpace}}㎡)
								</Col>
								<Col v-for="(cost,index) in item.roomCostList" :key="index">
								{{cost.parName}}：{{cost.name}}￥{{cost.cost}}
								</Col>
								<Col v-show="item.rentType!=null">
								{{item.rentType=="0"?"提前":"固定"}} {{item.rentDay}} 号收租({{item.rentType=="1"&&item.rentType!="0"?"每期的第一个月":"每期提前一个月"}})
								</Col>
								<Col>
								<span v-for="(config,index) in item.roomConfigList" :key="index">{{config.name}}、</span>
								</Col>
							</Row>

						</div>
						<Row type="flex" justify="center" style="margin: 10px 0 0px 0;">
							<Col span="4"> <Button type="primary" @click="handleUse">保存</Button></Col>
						</Row>
					</div>
				</Panel>
			</Collapse>
			<div v-else class="template_none">暂无可用的房间模板</div>
			</Col>
		</Row>
		<Divider dashed />
		<Button type="error" long ghost @click="returnHouseList">返回房态图列表</Button>
	</div>
</template>

<script>
	export default {
		name: 'houseTemplate',
		components: {

		},
		props: ["selectHouse", "selectHouseTemplate","buildingId"],
		data() {
			return {
				isCreateTemplate: false,
				value1: '0',
				createTemplateName: '',
				templateLists: [{
					lists: [{}, {}]
				}, {
					lists: [{}]
				}],
				showPanelIndex: 0,
				showHouseCardIndex: 0

			};
		},
		mounted() {
			this.getTemplateLists();
		},
		methods: {
			getTemplateLists() {
				this.$ajax.get(
					this,
					this.$api.ADD_TEMPLATE_GET+"?houseKind="+ this.$cookie.get('houseKind')+"&buildingId="+this.buildingId,
					null,
					(res) => {
						this.templateLists = res.data.content;
					}
				)
			},
			handleCreatTemplate() {
				this.isCreateTemplate = true;
			},
			handleCancelTemplate() {
				this.isCreateTemplate = false;
			},
			handleDelete(id) {
				this.$Modal.confirm({
					title: "提示",
					content: "确认删除该模板？",
					okText: "确认",
					cancelText: "取消",
					onOk: () => {
						this.$ajax.delete(
							this,
							this.$api.ADD_TEMPLATE_DELETE.replace("{id}", id), {},
							(res) => {
								this.$Message.success("删除模板成功！");
								this.getTemplateLists();
							}
						)
					}
				})

			},
			clearSelect() {
				this.$emit("on-clear");
			},
			returnHouseList() {
				// let name = this.$cookie.get('houseKind') == '0' ?
				// 	"lease/public-housing-central" : "lease/normal-housing-central";
				// this.$router.push({
				// 	name: name
        // })
        this.$router.back();
			},
			handleUse() {
				let templateId = this.templateLists[this.showPanelIndex].id;
				let roomId = this.templateLists[this.showPanelIndex].roomMongoList[this.showHouseCardIndex].id;
				let flag = true;
				this.selectHouseTemplate.forEach(ele => {
					if (ele.template == true) {
						flag = false;
					}
				})
				if (!flag) {
					this.$Message.error("信息完整的房间不能应用模板！");
					return;
				}
				let params = {
					id: templateId,
					templateRoomList: [{
						roomId: roomId,
						roomsList: this.selectHouse,
					}]
				}
				this.$ajax.post(
					this,
					this.$api.USE_TEMPLATE_TO_HOME_POST,
					params,
					(res) => {
						if (res.code == "200") {
							this.$Message.success("应用模板成功！");
							this.getTemplateLists();
							this.$emit('getLists');
						} else {
							this.$Message.error(res.msg);
						}

					}
				)
			},
			handleAddTemplate() {
				if (this.createTemplateName != "" && this.selectHouse.length > 0) {
					let flag = true;
					this.selectHouseTemplate.forEach(ele => {
						if (ele.template == false) {
							flag = false;
						}
					})
					if (!flag) {
						this.$Message.error("所选择的房间列表包含信息不完整的房间！");
						return;
					}
					let params = {
						name: this.createTemplateName,
						roomList: this.selectHouse,
						houseKind:this.$cookie.get('houseKind'),
						buildingId:this.buildingId
					}
					this.$ajax.post(
						this,
						this.$api.ADD_TEMPLATE_POST,
						params,
						(res) => {
							if (res.code == "200") {
								this.$Message.success("新增模板成功！");
								this.isCreateTemplate = false;
								this.getTemplateLists();
							} else {
								this.$Message.error(res.msg);
							}
							this.selectHouseArray = [];
							this.selectHouseTemplate=[];
							this.createTemplateName = "";
						}
					)
				} else {
					this.$Message.error("请选择房间并输入模板名称！")
				}
			},
			selectTemplate(index, it) {
				this.showPanelIndex = index;
				this.showHouseCardIndex = it;
			}
		},
		computed: {

		}
	};
</script>
<style>
	.house-card-template .ivu-collapse>.ivu-collapse-item.ivu-collapse-item-active>.ivu-collapse-header {
		padding: 0 15px;
	}

	.house-card-template .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header {
		padding: 0 15px;
	}
</style>
<style scoped>
	.house-card-template-header {
		margin-bottom: 16px;
		border-bottom: 1px solid #dcdee2;
		padding-bottom: 8px;
		display: flex;
		justify-content: space-between;
		align-items: center;

	}

	.templateItems {
		height: 35px;
		border: 1px solid #dcdee2;
		margin: 0 0 5px 0;
		border-radius: 5px;
		padding: 0 5px;
	}

	.houseCard {
		width: 100%;
		border: 1px solid #dcdee2;
		margin-bottom: 8px;
		padding: 5px 0;
		min-height: 170px;
	}

	.houseCard:hover {
		cursor: pointer;
	}

	.houseCardActive {
		border: 1px solid #2d8cf0;
	}

	.houseCardTitle {
		padding: 3px 5px 0 5px;
	}

	.template_none {
		width: 100%;
		height: 30px;
		line-height: 30px;
		text-align: center;
	}
</style>
