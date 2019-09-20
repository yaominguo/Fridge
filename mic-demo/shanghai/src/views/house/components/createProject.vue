<template>
	<div>
		<Modal v-model="showModal" title="项目信息" :width="500">
			<Form v-if="showModal" ref="dataForm" :rules="rules" :model="dataModel" :label-width="80">
				<FormItem label="项目名称" prop="projectName">
					<Input v-model="dataModel.projectName" />
				</FormItem>
				<FormItem v-if="isNew" label="省市区" prop="provId">
					<Row type="flex" justify="space-between">
						<Col :span="7">
						<FormItem prop="provId">
							<Select v-model="dataModel.provId" placeholder="请选择省份" filterable clearable>
								<Option v-for="item in options.provId" :key="item.value" :value="item.value">{{item.text}}</Option>
							</Select>
						</FormItem>
						</Col>
						<Col :span="7">
						<FormItem prop="cityId">
							<Select v-model="dataModel.cityId" placeholder="请选择城市" filterable clearable>
								<Option v-for="item in options.cityId" :key="item.value" :value="item.value">{{item.text}}</Option>
							</Select>
						</FormItem>
						</Col>
						<Col :span="7">
						<FormItem prop="countyId">
							<Select v-model="dataModel.countyId" placeholder="请选择区域" filterable clearable>
								<Option v-for="item in options.countyId" :key="item.value" :value="item.value">{{item.text}}</Option>
							</Select>
						</FormItem>
						</Col>
					</Row>
				</FormItem>
				<FormItem label="负责人" prop="blamer">
					<div style="display: flex;">
						<Select v-model="dataModel.blamer" filterable clearable>
							<Option v-for="item in options.blamer" :key="item.value" :value="item.value">{{item.text}}</Option>
						</Select>
						<!-- <Button style="marginLeft: 10px;" type="primary" ghost @click="$router.push({name:'StaffManageCreate'})">添加负责人</Button> -->
						<Button style="marginLeft: 10px;" type="primary" ghost @click="showAdd=true">添加负责人</Button>
					</div>
				</FormItem>
				<FormItem label="备注">
					<Input v-model="dataModel.remark" type="textarea" />
				</FormItem>
			</Form>
			<div slot="footer">
				<Button @click="handleSubmit" type="primary">保存</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
</script>

<style>
</style>
