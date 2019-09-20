<template>
	<div>
		<Card class="card" dis-hover>
			<!-- 步骤条 -->
			<div id="steps">
				<Row type="flex" justify="center">
					<Col span="12" offset="3">
					<Steps :current="current">
						<Step title="门牌户型信息"></Step>
						<Step title="价格配置信息"></Step>
					</Steps>
					</Col>
				</Row>
			</div>
			<!--步骤1  -->
			<div class="containerFlow">
				<Form ref="formInline" :model="createHouse" :rules="ruleCreateHouse" :label-width="80" id="createForm">
					<FormItem label="出租方式" prop="leaseType">
						<RadioGroup v-model="createHouse.leaseType">
							<Radio label="1" v-show="current==0||(createHouse.leaseType=='1'&&current=='1')">合租</Radio>
							<Radio label="2" v-show="current==0||(createHouse.leaseType=='2'&&current=='1')">整租</Radio>
						</RadioGroup>
					</FormItem>
					<Row type="flex" :gutter="16">
						<Col span="8">
						<FormItem label="小区名称" prop="communityId">
							<Select v-model="createHouse.communityId" disabled placeholder="请输入小区名" transfer>
								<Option v-for="item in communityList" :value="String(item.id)" :key="item.id">{{ item.name }}</Option>
							</Select>
						</FormItem>
						</Col>
						<Col span="10" v-if="current==0" style="margin-top:7px;font-size:12px">
						您可以批量录入同一小区的房源（最多25套）
						</Col>
						<Col span="10" v-else style="margin-top:7px;font-size:12px">
						<div>
							您本次录入
							<span class="required">{{formDynamic.items.length}}</span>套房源.
							<span v-if="this.createHouse.leaseType==1">
								共
								<span class="required">{{roomCount}}</span>个房间。
							</span>
						</div>
						</Col>
					</Row>
					<Row type="flex" justify="start" :gutter="16">
						<Col span="8">
						<FormItem label="楼栋" prop="buildingId">
							<Select v-model="createHouse.buildingId" clearable placeholder="请输入小区名" @on-change="buildingChange" :disabled="current=='1'"
							 transfer>
								<Option v-for="item in buildingLists" :value="String(item.id)" :key="item.id">{{ item.buildingCode }}</Option>
							</Select>
						</FormItem>
						</Col>
						<Col span="8">
						<FormItem label="是否电梯房" prop="elevator" :label-width="120">
							<Select v-model="createHouse.elevator" :disabled="disableIsEve" transfer clearable placeholder="请选择">
								<Option v-for="item in isElevatorList" :value="item.value" :key="item.elevator">{{ item.name }}</Option>
							</Select>
						</FormItem>
						</Col>
						<Col span="8">
						<FormItem prop="floorCount" label="总楼层数">
							<Select v-model="createHouse.floorCount" disabled transfer clearable placeholder="请选择">
								<Option v-for="count in 99" :value="String(count)" :key="count">{{ count }}</Option>
							</Select>
						</FormItem>
						</Col>
					</Row>
				</Form>
				<div class="tips" v-if="this.createHouse.leaseType==1||current==0">点击"
					<Icon type="md-settings" color="#2d8cf0"></Icon>"可批量修改
				</div>
				<!-- 11111 -->
				<div class="tableContainer" v-if="current==0">
					<div class="formList formList_l">
						<div class="header">
							<div class="large">
								<div>
									<Input type="text" style="width:30px;" v-model="houseCount"></Input>
									<span>套</span>
									<Icon type="md-add-circle" size="18" color="#2d8cf0" @click="handleAddHouse(houseCount)"></Icon>
									<span style="font-size:12px">
										(已录入
										<span style="color:red" v-if="formDynamic">{{formDynamic.items.length}}</span>套)
									</span>
								</div>
							</div>
							<div class="middle">
								<div>
									<span class="required">*</span>
									<span>室(房间号)</span>
								</div>
							</div>
							<div class="small">
								<div>
									<span>水表户号</span>
								</div>
							</div>
							<div class="small">
								<div>
									<span>电表户号</span>
								</div>
							</div>
							<div class="small">
								<div>
									<span>煤气表户号</span>
								</div>
							</div>
							<div class="middle">
								<div>
									<span class="required">*</span>
									<span>房</span>
									<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('house')"></Icon>
								</div>
							</div>
							<div class="middle">
								<div>
									<span class="required">*</span>
									<span>厅</span>
									<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('hall')"></Icon>
								</div>
							</div>
							<div class="middle">
								<div>
									<span class="required">*</span>
									<span>卫</span>
									<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('guard')"></Icon>
								</div>
							</div>
							<div class="middle">
								<div>
									<span class="required">*</span>
									<span>建筑面积</span>
									<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('area')"></Icon>
								</div>
							</div>
							<div class="middle">
								<div>
									<span class="required">*</span>
									<span>平方米月租金</span>
								</div>
							</div>
							<div class="small">
								<div>
									<span class="required">*</span>
									<span>所在层数</span>
								</div>
							</div>
						</div>
						<Form v-for="(item, index) in formDynamic.items" :key="index" ref="formDynamic" inline :model="item" id="form"
						 class="form1" :rules="formDynamicRules">
							<div class="large noAfter">
								<Icon type="ios-trash" @click="handleRemove(index)" color="#2d8cf0" size="23" />
							</div>
							<div class="middle">
								<FormItem :prop="'roomNo'">
									<Input type="text" v-model="item.roomNo" :maxlength="6" clearable placeholder="房间号"></Input>
								</FormItem>
							</div>
							<div class="small">
								<FormItem :prop="'waterNum'">
									<Input type="text" v-model="item.waterNum" :maxlength="6" clearable placeholder="水表户号"></Input>
								</FormItem>
							</div>
							<div class="small">
								<FormItem :prop="'elecNum'">
									<Input type="text" v-model="item.elecNum" :maxlength="6" clearable placeholder="电表户号"></Input>
								</FormItem>
							</div>
							<div class="small">
								<FormItem :prop="'gasNum'">
									<Input type="text" v-model="item.gasNum" :maxlength="6" clearable placeholder="煤气表户号"></Input>
								</FormItem>
							</div>
							<div class="middle">
								<FormItem :prop="'roomNum'">
									<Select v-model="item.roomNum" transfer clearable placeholder="请选择">
										<Option v-for="count in 26" :value="String(count)" :key="count">{{count }}</Option>
									</Select>
								</FormItem>
							</div>
							<div class="middle">
								<FormItem :prop="'parlourNum'">
									<Select v-model="item.parlourNum" transfer clearable placeholder="请选择">
										<Option v-for="count in 11" :value="String(count - 1)" :key="count">{{count-1}}</Option>
									</Select>
								</FormItem>
							</div>
							<div class="middle">
								<FormItem :prop="'toiletNum'">
									<Select v-model="item.toiletNum" transfer clearable placeholder="请选择">
										<Option v-for="count in 11" :value="String(count -1)" :key="count">{{ count -1}}</Option>
									</Select>
								</FormItem>
							</div>
							<div class="middle">
								<FormItem :prop="'houseSpace'">
									<Input type="text" v-model="item.houseSpace" clearable placeholder="建筑面积"></Input>
								</FormItem>
							</div>
							<div class="middle">
								<FormItem :prop="'squareMeterMonthlyRent'">
									<Input type="text" v-model="item.squareMeterMonthlyRent" clearable placeholder="平方米月租金"></Input>
								</FormItem>
							</div>
							<div class="small">
								<FormItem :prop="'floor'">
									<Select v-model="item.floor" transfer clearable placeholder="请选择">
										<Option v-for="count in  handleFloor(createHouse.floorCount)" :value="String(count)" :key="count">{{ count }}</Option>
									</Select>
								</FormItem>
							</div>

						</Form>
					</div>
				</div>
				<!-- 222222-->
				<div class="tableContainer step2" v-if="current==1&&createHouse.leaseType==1">
					<div class="formList">
						<div class="header">
							<div class="middle">
								<div>
									<span>门牌号</span>
								</div>
							</div>
							<div class="middle">
								<div>
									<span>房间名称</span>
									<Icon type="md-add-circle" color="#2d8cf0" size="18" @click="addHouse"></Icon>
								</div>
							</div>

							<div class="middle">
								<div>
									<span class="required">*</span>
									<span>朝向</span>
									<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('direction')"></Icon>
								</div>
							</div>
							<div class="middle">
								<div>
									<span class="required">*</span>
									<span>出租状态</span>
									<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('leaseStatus')"></Icon>
								</div>
							</div>
							<div class="middle">
								<div>
									<span class="required">*</span>
									<span>房间面积</span>
								</div>
							</div>
							<div class="middle">
								<div>
									<!-- <span class="required">*</span> -->
									<span>平方米月租金</span>
								</div>
							</div>
							<div class="large">
								<div>
									<span class="required">*</span>
									<span>付款方式</span>
									<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('methods')"></Icon>
								</div>
							</div>
							<div class="middle">
								<div>
									<span class="required">*</span>
									<span>租金</span>
									<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('rent')"></Icon>
								</div>
							</div>
							<div class="middle">
								<div>
									<span class="required">*</span>
									<span>房屋押金</span>
									<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('deposit')"></Icon>
								</div>
							</div>
							<div class="small">
								<div>
									<span>房间图片</span>
								</div>
							</div>
							<div class="small">
								<div>
									<span>房间配置</span>
									<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('roomConfigList')"></Icon>
								</div>
							</div>
							<div class="small">
								<div class="flod">
									<div>公共区域照片</div>
									<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('housePicList')"></Icon>
								</div>
							</div>
							<div class="middle noBor">
								<div>
									<span>公共配置</span>
									<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('publicSet')"></Icon>
								</div>
							</div>
						</div>
						<div v-for="(count,it) in formDynamicSecond" :key="it" @click="changeActiveItems('1',it)" v-if="showTable" class="opeationForm">
							<Row class="houseBlock" :class="{'houseBlockActive':houseActiveIndex==it}" type="flex" align="middle">
								<Col style="width:90px;text-align:center;padding:0 3px">
								<div>{{buildingName}}-{{formDynamic.items[Number(it.replace('item',''))].roomNo}}</div>
								</Col>
								<Col>
								<Form v-for="(item,index) in count" :key="index" ref="formDynamicSecond" inline :model="item" id="form" class="form2"
								 v-if="count.length>0" :rules="formDynamicSecondRules">
									<div class="middle">
										<FormItem :prop="'alias'">
											<Icon type="ios-trash" color="#2d8cf0" size="18" @click="deleteHouse(it,index)" />
											<Input type="text" style="width:43px" clearable v-model="item.alias" placeholder="房间名称"></Input>
										</FormItem>
									</div>

									<div class="middle">
										<FormItem :prop="'direction'">
											<Select v-model="item.direction" transfer clearable placeholder="请选择">
												<Option v-for="(item,index) in directionList" :value="item.name" :key="index">{{ item.name }}</Option>
											</Select>
										</FormItem>
									</div>
									<div class="middle">
										<FormItem :prop="'leaseStatus'">
											<Select v-model="item.leaseStatus" transfer clearable placeholder="请选择">
												<Option v-for="(item,index) in rentalStatus" :value="item.leaseStatus" :key="index">{{ item.name }}</Option>
											</Select>
										</FormItem>
									</div>
									<div class="middle">
										<FormItem :prop="'roomSpace'">
											<Input type="text" v-model="item.roomSpace" placeholder="房间面积" @on-change="calculatingRent(it,index)"></Input>
										</FormItem>
									</div>
									<div class="middle">
										<FormItem :prop="'squareMeterMonthlyRent'">
											<Input type="text" v-model="item.squareMeterMonthlyRent" disabled @on-change="calculatingRent(it,index)"
											 clearable placeholder="平方米月租金"></Input>
										</FormItem>
									</div>
									<div class="large" style="padding: 8px 0 0 8px!important;">
										<FormItem :prop="'payNum'" style="display:inline-block;margin-right:5px">
											<Select v-model="item.payNum" transfer clearable style="width:65px" placeholder="付">
												<Option v-for="count in 12" :value="String(count)" :key="count">{{ count }}</Option>
											</Select>
										</FormItem>
										<FormItem :prop="'mortgageNum'" style="display:inline-block;margin:0">
											<Select v-model="item.mortgageNum" clearable style="width:65px" placeholder="押" transfer @on-change="mortgageNumChange(item.mortgageNum,it,index)">
												<Option value="auto">自定义</Option>
												<Option v-for="count in 12" :value="String(count)" :key="count">{{ count }}</Option>
											</Select>
										</FormItem>
									</div>
									<div class="middle">
										<FormItem :prop="'rent'">
											<Input type="text" clearable v-model="item.rent" @on-change="rentChange(it,index)" placeholder="租金"></Input>
										</FormItem>
									</div>
									<div class="middle">
										<FormItem :prop="'deposit'">
											<Input type="text" :disabled="item.isDisabled" v-model="item.deposit" placeholder="押金"></Input>
										</FormItem>
									</div>
									<!-- 房间照片-->
									<div class="small">
										<p class="row-high-light">
											<Icon v-if="item.roomPicList.length==0" type="md-add-circle" size="18" color="#2d8cf0" @click="showModal('roomPicList',it,index)"></Icon>
											<span v-else @click="showModal('roomPicList',it,index)">点击查看</span>
										</p>
									</div>
									<!-- 房间配置 -->
									<div class="small noBor">
										<p class="row-high-light" style="line-height:18px">
											<span v-if="item.houseSetSingle!=undefined" @click="showModal('roomConfigList',it,index)">{{returnConfigsName(item.houseSetSingle)}}<br />点击查看</span>
											<Icon type="md-add-circle" v-else size="18" color="#2d8cf0" @click="showModal('roomConfigList',it,index)"></Icon>
										</p>
									</div>
								</Form>
								</Col>
								<Col>
								<!-- 公共区域照片 -->
								<div class="small noPad">
									<p class="row-high-light">
										<span v-if="housePicList[it].length!=0" @click="showModal('housePicList',it)">点击查看</span>
										<Icon v-else type="md-add-circle" size="18" @click="showModal('housePicList',it)" color="#2d8cf0" style="padding:8px 0 0"></Icon>
									</p>
								</div>
								</Col>
								<Col>
								<!-- 公共配置 -->
								<div class="middle">
									<p class="row-high-light" style="padding-right: 10px;">
										<span v-if="houseSetSingleAll!==''" @click="singlePublicSet('publicSet',it)">配置<br />点击查看</span>
										<Icon v-else type="md-add-circle" size="18" @click="singlePublicSet('publicSet',it)" color="#2d8cf0" style="padding:8px 0 0"></Icon>
									</p>
								</div>
								</Col>
							</Row>
						</div>
					</div>
				</div>

				<!-- 33333 -->
				<!-- table步骤2 整租-->
				<div class="tableContainer step2" v-if="current==1&&createHouse.leaseType==2">
					<div class="allGain">
						<div class="tips" v-if="this.createHouse.leaseType==2&&current==1">点击"
							<Icon type="md-settings" color="#2d8cf0"></Icon>"可批量修改
						</div>
						<div class="formList">
							<div class="header">
								<div class="large">
									<div>
										<span>门牌号</span>
									</div>
								</div>
								<div class="middle"></div>
								<div class="middle">
									<div>
										<span class="required">*</span>
										<span>出租状态</span>
										<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('leaseStatus')"></Icon>
									</div>
								</div>
								<div class="middle">
									<div>
										<span class="required">*</span>
										<span>房间面积</span>
									</div>
								</div>
								<div class="middle">
									<div>
										<span>平方米月租金</span>
									</div>
								</div>
								<div class="large">
									<div>
										<span class="required">*</span>
										<span>付款方式</span>
										<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('methods')"></Icon>
									</div>
								</div>
								<div class="middle">
									<div>
										<span class="required">*</span>
										<span>租金</span>
										<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('rent')"></Icon>
									</div>
								</div>
								<div class="middle">
									<div>
										<span class="required">*</span>
										<span>房屋押金</span>
										<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('deposit')"></Icon>
									</div>
								</div>
								<div class="small">
									<div>
										<span>房间图片</span>
									</div>
								</div>
								<div class="middle">
									<div>
										<span>房间配置</span>
										<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('roomConfigList')"></Icon>
									</div>
								</div>
							</div>
							<div v-if="showTable">
								<Row class="houseBlock" type="flex" align="middle" style="border:none">
									<Col style="width:100%">
									<Form v-for="(item, index) in formDynamic.items" :key="index" ref="formDynamicSecond" inline :model="item" id="form"
									 :rules="formDynamicSecondRules">
										<div style="width:100%;border:1px solid #e8eaec;margin-bottom:10px" @click="changeActiveItems('2',index)"
										 :class="{'houseBlockActive':houseAllActiveIndex==index}">
											<div class="large" style="padding:12px 0 0 0;text-align:center">
												<div style="width:100%">{{buildingName}}-{{item.roomNo}}</div>
											</div>
											<div class="middle">
												<FormItem>
													<Icon type="ios-trash" color="#2d8cf0" size="18" @click="handleRemove(index)" />
												</FormItem>
											</div>
											<div class="middle">
												<FormItem :prop="'leaseStatus'">
													<Select v-model="item.leaseStatus" style="width:94px" transfer clearable placeholder="请选择">
														<Option v-for="(item,index) in rentalStatus" :value="item.leaseStatus" :key="index">{{ item.name }}</Option>
													</Select>
												</FormItem>
											</div>
											<div class="middle">
												<FormItem :prop="'houseSpace'">
													<Input disabled type="text" v-model="item.houseSpace" placeholder="房屋面积" @on-change="calculatingRent(index)"></Input>
												</FormItem>
											</div>
											<div class="middle">
												<FormItem :prop="'squareMeterMonthlyRent'">
													<Input type="text" v-model="item.squareMeterMonthlyRent" disabled clearable @on-change="calculatingRent(index)"
													 placeholder="平方米月租金"></Input>
												</FormItem>
											</div>
											<div class="large" style="padding: 8px 0 0 12px!important;">
												<FormItem :prop="'payNum'" style="display:inline-block;margin-right:5px">
													<Select v-model="item.payNum" clearable style="width:60px" placeholder="付" transfer>
														<Option v-for="count in 12" :value="String(count)" :key="count">{{ count }}</Option>
													</Select>
												</FormItem>
												<FormItem :prop="'mortgageNum'" style="display:inline-block;margin:0">
													<Select v-model="item.mortgageNum" clearable style="width:60px" placeholder="押" transfer @on-change="mortgageNumChange(item.mortgageNum,index,'')">
														<Option value="auto">自定义</Option>
														<Option v-for="count in 12" :value="String(count)" :key="count">{{ count }}</Option>
													</Select>
												</FormItem>
											</div>
											<div class="middle">
												<FormItem :prop="'rent'">
													<Input type="text" clearable v-model="item.rent" @on-change="rentChange(index)" placeholder="租金"></Input>
												</FormItem>
											</div>
											<div class="middle">
												<FormItem :prop="'deposit'">
													<Input type="text" :disabled="item.isDisabled" v-model="item.deposit" placeholder="押金"></Input>
												</FormItem>
											</div>
											<!-- 房间照片-->
											<div class="small">
												<p class="row-high-light">
													<span v-if="item.roomPicList&&item.roomPicList.length!=0" @click="showModal('roomPicList',index)">点击查看</span>
													<Icon v-else type="md-add-circle" size="18" color="#2d8cf0" @click="showModal('roomPicList',index)"></Icon>
												</p>
											</div>
											<!-- 房间配置 -->
											<div class="middle noBor">
												<p class="row-high-light" style="line-height:18px">
													<span @click="showModal('roomConfigList',index)" v-if="item.houseSetSingle!=undefined">{{returnConfigsName(item.houseSetSingle)}}<br />点击查看
													</span>
													<Icon v-else type="md-add-circle" size="18" color="#2d8cf0" @click="showModal('roomConfigList',index)"></Icon>
												</p>
											</div>
										</div>
									</Form>
									</Col>
								</Row>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 下一步 -->
			<div class="stepNext" v-if="current==0">
				<Button type="primary" @click="showNextOpeation('formDynamic')">下一步</Button>
			</div>
			<!-- 上一步  提交-->
			<div class="stepNext" v-if="current==1">
				<Button type="primary" @click="returnSteps()">上一步</Button>
				<Button type="primary" @click="handleSave('formDynamicSecond')">提交</Button>
			</div>
			<!-- modal1  444444-->
			<Modal v-model="modal" title="设置" @on-ok="ok" @on-cancel="cancel" width="500">
				<!-- 房|厅|卫 -->
				<Row type="flex" justify="center" align="middle" v-if="modalType=='house'||modalType=='hall'||modalType=='guard'||modalType=='floorAll'">
					<Col span="9">
					将列表中
					<span class="required" v-if="modalType=='house'">房间数</span>
					<span class="required" v-if="modalType=='hall'">客厅数</span>
					<span class="required" v-if="modalType=='guard'">卫生间数</span>
					<span class="required" v-if="modalType=='floorAll'">总楼层数</span>
					统一设置为:
					</Col>
					<Col span="12">
					<Select v-model="unite.roomCount" transfer placeholder="请选择">
						<Option v-if="modalType=='house'" v-for="count in 26" :key="count" :value="String(count)">{{count}}</Option>
						<Option v-if="modalType=='hall'||modalType=='guard'" v-for="count in 11" :key="count" :value="count - 1">{{count-1}}</Option>
						<Option v-if="modalType=='floorAll'" v-for="count in 99" :key="count" :value="count">{{count}}</Option>
					</Select>
					</Col>
				</Row>
				<!-- 建筑面积 -->
				<Row type="flex" justify="center" align="middle" v-if="modalType=='area'">
					<Col span="8">
					将列表中
					<span class="required">建筑面积</span>统一设置为:
					</Col>
					<Col span="12">
					<Input type="text" v-model="unite.houseSpace" placeholder="建筑面积"></Input>
					</Col>
				</Row>
				<!-- 朝向 -->
				<Row type="flex" justify="center" align="middle" v-if="modalType=='direction'">
					<Col span="9">
					将列表中
					<span class="required">朝向</span>统一设置为:
					</Col>
					<Col span="12">
					<Select v-model="unite.direction" transfer placeholder="朝向">
						<Option v-for="(item,index) in directionList" :key="index" :value="String(item.name)">{{item.name}}</Option>
					</Select>
					</Col>
				</Row>
				<!-- 出租状态 -->
				<Row type="flex" justify="center" align="middle" v-if="modalType=='leaseStatus'">
					<Col span="9">
					将列表中
					<span class="required">出租状态</span>统一设置为:
					</Col>
					<Col span="12">
					<Select v-model="unite.leaseStatus" transfer clearable placeholder="请选择">
						<Option v-for="(item,index) in rentalStatus" :value="String(item.leaseStatus)" :key="index">{{ item.name }}</Option>
					</Select>
					</Col>
				</Row>
				<!-- 定金 -->
				<Row type="flex" justify="center" align="middle" v-if="modalType=='earnest'">
					<Col span="9">
					将列表中
					<span class="required">定金</span>统一设置为:
					</Col>
					<Col span="12">
					<Input type="text" v-model="unite.earnest" placeholder="定金"></Input>
					</Col>
				</Row>
				<!-- 租金 -->
				<Row type="flex" justify="center" align="middle" v-if="modalType=='rent'">
					<Col span="9">
					将列表中
					<span class="required">租金</span>统一设置为:
					</Col>
					<Col span="12">
					<Input type="text" v-model="unite.rent" placeholder="租金"></Input>
					</Col>
				</Row>
				<!-- 押金 -->
				<Row type="flex" justify="center" align="middle" v-if="modalType=='deposit'">
					<Col span="9">
					将列表中
					<span class="required">押金</span>统一设置为:
					</Col>
					<Col span="12">
					<Input type="text" v-model="unite.deposit" placeholder="押金"></Input>
					</Col>
				</Row>
				<!-- 公共配置 -->
				<Row type="flex" justify="center" align="middle" v-if="modalType=='publicSet'">
					<Col span="9">选择模板（公共配置）</Col>
					<Col span="12" v-if="configLists.length!='0'">
					<CheckboxGroup v-model="publicSets">
						<Row type="flex" justify="space-between" v-for="(item,index) in  configLists" :key="index" v-show="index==0">
							<Col span="8" v-for="(item,index) in  item.configResources" :key="index">
							<Checkbox :label="item.name"></Checkbox>
							</Col>
						</Row>
					</CheckboxGroup>
					</Col>
					<Col span="12" v-else>
					<CheckboxGroup v-model="publicSets">
						<Row type="flex" justify="space-between">
							<Col span="8" v-for="(item,index) in  defaultConfigLists" :key="index" v-show="index==0">
							<Checkbox :label="item.name"></Checkbox>
							</Col>
						</Row>
					</CheckboxGroup>
					</Col>
				</Row>
				<!-- 房间配置 -->
				<Row type="flex" justify="center" align="middle" v-if="modalType=='roomConfigList'">
					<Col span="9">选择模板（房间配置）</Col>
					<Col span="12" v-if="configLists.length!='0'">
					<RadioGroup v-model="unite.houseSetSingle" style="margin-bottom:10px">
						<Radio v-for="(item,index) in  configLists" :key="index" :label="index">{{item.configName}}</Radio>
					</RadioGroup>
					<CheckboxGroup v-model="unite.roomConfigList">
						<Row type="flex" justify="space-between" v-for="(item,index) in  configLists" :key="index" v-show="index==unite.houseSetSingle">
							<Col span="8" v-for="(item,index) in  item.configResources" :key="index">
							<Checkbox :label="item.name"></Checkbox>
							</Col>
						</Row>
					</CheckboxGroup>
					</Col>
					<Col span="12" v-else>
					<CheckboxGroup v-model="unite.roomConfigList">
						<Row type="flex" justify="space-between">
							<Col span="8" v-for="(item,index) in  defaultConfigLists" :key="index">
							<Checkbox :label="item.name"></Checkbox>
							</Col>
						</Row>
					</CheckboxGroup>
					</Col>
				</Row>
				<!-- 付款方式 -->
				<Row type="flex" justify="center" align="middle" v-if="modalType=='methods'">
					<Col span="9">
					将列表中
					<span class="required">押金</span>统一设置为:
					</Col>
					<Col span="12">
					<Select v-model="unite.payNum" transfer style="width:60px" placeholder="付">
						<Option v-for="count in 12" :value="String(count)" :key="count">{{ count }}</Option>
					</Select>
					<!--  -->
					<Select v-model="unite.mortgageNum" transfer style="width:60px" placeholder="押" @on-change="mortgageNumChange(unite.mortgageNum,'','','public')">
						<Option value="auto">自定义</Option>
						<Option v-for="count in 12" :value="String(count)" :key="count">{{ count }}</Option>
					</Select>
					</Col>
				</Row>
				<!-- 图片上传公共 -->
				<Row type="flex" justify="start" align="middle" v-if="modalType=='roomPicList' || modalType=='housePicList'">
					<Col span="4">
					<span>图片上传</span>
					</Col>
					<Col span="20">
					<imageUpload :url="$api.FILE_UPLOAD_POST" :uploadButton="'upload'" :maxUploads="20" :defaultList="unite.roomPicList"
					 @on-complete="uploadComplete" @on-remove="uploadRemove" :isPhone="true" :code="unite.figure" @showUploadImg="startRunFun"></imageUpload>
					</Col>
				</Row>
			</Modal>
		</Card>
	</div>
</template>

<script>
	import imageUpload from "../../../../components/Helper/Form/image-upload.vue";
	export default {
		components: {
			imageUpload
		},
		data() {
			const checkHouseSpace = (rule, value, callback) => {
				if (value == "" || value == undefined) {
					callback(new Error("建筑面积"));
				} else if (!this.$com.checkNumber(value)) {
					callback(new Error("数字或两位小数"));
				} else if (Number(value) > 500 || Number(value) < 5) {
					callback(new Error("范围5~500"));
				} else {
					callback();
				}
			};
			const checkBuildingCode = (rule, value, callback) => {
				if (value == "" || value == undefined) {
					callback(new Error("栋不为空"));
				} else if (!/^[0-9a-zA-Z]+$/.test(value)) {
					callback(new Error("数字、字母或数字和字母组合"));
				} else {
					callback();
				}
			};
			const checkUnitNo = (rule, value, callback) => {
				if (value == "" || value == undefined) {
					callback();
				} else {
					if (!/^[0-9a-zA-Z]+$/.test(value)) {
						callback(new Error("数字、字母或数字和字母组合"));
					} else {
						callback();
					}
				}
			};
			const checkRoomNumber = (rule, value, callback) => {
				if (value == "" || value == undefined) {
					callback(new Error("房间号"));
				} else {
					if (!/^[0-9a-zA-Z]+$/.test(value)) {
						callback(new Error("数字、字母或数字和字母组合"));
					} else {
						callback();
					}
				}
			};
			const checkRent = (rule, value, callback) => {
				if (value == "" || value == undefined) {
					callback(new Error("租金"));
				} else {
					if (this.$com.checkNumber(value)) {
						if (Number(value) > 999999 || Number(value) < 100) {
							callback(new Error("100~999999"));
						} else {
							callback();
						}
					} else {
						callback("输入数字");
					}
				}
			};
			const checkDeposit = (rule, value, callback) => {
				if (value == "" || value == undefined) {
					callback(new Error("押金"));
				} else {
					if (this.$com.checkNumber(value)) {
						if (Number(value) < 999999 && Number(value) > 100) {
							callback();
						} else {
							callback(new Error("数字1到999999"));
						}
					} else {
						callback("输入数字");
					}
				}
			};
			const checkRoomSpace = (rule, value, callback) => {
				if (value == "" || value == undefined) {
					callback(new Error("面积"));
				} else if (!this.$com.checkNumber(value)) {
					callback(new Error("整数或两位小数"));
				} else if (Number(value) > 500 || Number(value) < 5) {
					callback(new Error("范围5~500"));
				} else if (
					Number(value) /
					this.formDynamic.items[
						Number(this.houseActiveIndex.replace("item", 0))
					].houseSpace >
					0.4
				) {
					this.$Message.error("需小于总面积的40%!");
					callback(new Error(" "));
				} else {
					callback();
				}
			};
			const checkSquareMeterMonthlyRent = (rule, value, callback) => {
				if (value == "" || value == undefined) {
					callback(new Error("平方米月租金"));
				} else {
					if (this.$com.checkNumber(value)) {
						callback();
					} else {
						callback("输入数字");
					}
				}
			};
			return {
				houseCount: 1, //添加房屋数量
				roomCount: 0, //房间数量
				current: 0, //当前步骤数
				popShow: true,
				createHouse: {
					leaseType: "1",
					communityId: ""
				},
				ruleCreateHouse: {
					leaseType: [{
						required: true,
						message: "选择出租方式",
						trigger: "change"
					}],
					communityId: [{
						required: true,
						message: "选择小区名称",
						trigger: "change"
					}],
					buildingId: [{
						required: true,
						message: "选择楼栋",
						trigger: "change"
					}],
					elevator: [{
						required: true,
						message: "是否电梯房",
						trigger: "change"
					}],
					floorCount: [{
						required: true,
						message: "总楼层数",
						trigger: "change"
					}]
				},
				communityList: [],
				formDynamic: {
					items: [{}]
				},
				formDynamicRules: {
					roomNo: [{
						validator: checkRoomNumber,
						trigger: "blur"
					}],
					roomNum: [{
						required: true,
						message: "请选择房",
						trigger: "change"
					}],
					parlourNum: [{
						required: true,
						message: "请选择厅",
						trigger: "change"
					}],
					toiletNum: [{
						required: true,
						message: "请选择卫",
						trigger: "change"
					}],
					houseSpace: [{
						trigger: "blur",
						validator: checkHouseSpace
					}],
					floor: [{
						required: true,
						message: "所在层数",
						trigger: "change"
					}],
					squareMeterMonthlyRent: [{
						trigger: "blur",
						validator: checkSquareMeterMonthlyRent
					}]
				},
				defaultConfigLists: [{
						name: 'WIFI',
						isChecked: '00',
						isDelete: '0',
						sort: '1'
					},
					{
						name: '空调',
						isChecked: '00',
						isDelete: '0',
						sort: '2'
					},
					{
						name: '热水器',
						isChecked: '00',
						isDelete: '0',
						sort: '3'
					},
					{
						name: '洗衣机',
						isChecked: '00',
						isDelete: '0',
						sort: '4'
					},
					{
						name: '冰箱',
						isChecked: '00',
						isDelete: '0',
						sort: '4'
					},
					{
						name: '电视',
						isChecked: '00',
						isDelete: '0',
						sort: '5'
					},
					{
						name: '微波炉',
						isChecked: '00',
						isDelete: '0',
						sort: '6'
					},
					{
						name: '燃气灶',
						isChecked: '00',
						isDelete: '0',
						sort: '7'
					},
					{
						name: '抽油烟机',
						isChecked: '00',
						isDelete: '0',
						sort: '8'
					},
					{
						name: '电磁炉',
						isChecked: '00',
						isDelete: '0',
						sort: '9'
					},
					{
						name: '床',
						isChecked: '00',
						isDelete: '0',
						sort: '10'
					},
					{
						name: '书桌',
						isChecked: '00',
						isDelete: '0',
						sort: '11'
					},
					{
						name: '衣柜',
						isChecked: '00',
						isDelete: '0',
						sort: '12'
					},
					{
						name: '沙发',
						isChecked: '00',
						isDelete: '0',
						sort: '13'
					},
					{
						name: '阳台',
						isChecked: '00',
						isDelete: '0',
						sort: '14'
					}
				],
				formDynamicSecond: {},
				formDynamicSecondRules: {
					alias: [{
						trigger: "blur",
						max: 5,
						message: "五个字符"
					}],
					roomSpace: [{
						required: true,
						validator: checkRoomSpace
					}],
					direction: [{
						required: true,
						message: "朝向",
						trigger: "change"
					}],
					leaseStatus: [{
						required: true,
						message: "出租状态",
						trigger: "change"
					}],
					payNum: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}],
					mortgageNum: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}],
					rent: [{
						validator: checkRent,
						trigger: "blur"
					}],
					deposit: [{
						validator: checkDeposit,
						trigger: "change"
					}],
					squareMeterMonthlyRent: [{
						trigger: "blur",
						validator: checkSquareMeterMonthlyRent
					}]
				},
				modal: false,
				unite: {
					houseType: "", //统一房源类型
					roomCount: "", //统一房间数、客厅数、卫生间数、总楼层数根据type改变值
					houseSpace: "", //统一建筑面积
					isElevator: "", //是否电梯
					direction: "", //方向
					leaseStatus: "", //出租状态
					earnest: "", //定金
					rent: "", //租金
					deposit: "", //押金
					description: "", //房间描述
					roomConfigList: [], //房间配置信息
					slogan: "", //广告
					houseSetSingle: "0", //主卧次卧标志
					roomPicList: [], //图片列表
					figure: "", //上传图片的标志（房间）
					payNum: "",
					mortgageNum: ""
				},
				depositDisabled: true, //押金禁用
				modalType: "",
				modalParentIndex: "",
				modalChildrenIndex: "",
				isElevatorList: [{
						name: "是",
						value: "true"
					},
					{
						name: "否",
						value: "false"
					}
				],
				rentalStatus: [{
						name: "未租",
						leaseStatus: "0"
					},
					{
						name: "已租",
						leaseStatus: "2"
					}
				], //出租状态
				houseActiveIndex: "",
				houseAllActiveIndex: "0",
				letterTable: [
					"A",
					"B",
					"C",
					"D",
					"E",
					"F",
					"G",
					"H",
					"I",
					"J",
					"K",
					"L",
					"M",
					"N",
					"O",
					"P",
					"Q",
					"I",
					"S",
					"T",
					"U",
					"V",
					"W",
					"X",
					"Y",
					"Z"
				],
				//朝向列表
				directionList: [{
						name: "东",
						directionId: "0"
					},
					{
						name: "南",
						directionId: "1"
					},
					{
						name: "西",
						directionId: "2"
					},
					{
						name: "北",
						directionId: "3"
					},
					{
						name: "东南",
						directionId: "4"
					},
					{
						name: "东北",
						directionId: "5"
					},
					{
						name: "西南",
						directionId: "6"
					},
					{
						name: "西北",
						directionId: "7"
					}
				],
				// publicSetSingle: false, //公告配置按钮
				publicSets: [], //公共设置列表
				publicEuipment: [], //公共设置列表暂存
				showTable: false,
				housePicList: [],
				housePicListFigure: [],
				allowUploadType: ["jpg", "jpeg", "png"], //上传文件允许文件的类型
				buildingLists: [],
				buildingName: "",
				codeArray: "",
				configLists: [],
				payNumDefault: "",
				mortgageNumDefault: "",
				disableIsEve: true,
				houseSetSingleAll: ""

			};
		},
		mounted() {
			this.getCommunity();
			this.getDefaultRent();
			this.getDefaultConfigs();
		},
		methods: {
			//小区列表
			getCommunity() {
				this.$ajax.get(
					this,
					this.$api.GET_COMMUNITY_LIST + "?pageSize=1000&pageNo=1&buildType=0", {},
					res => {
						this.communityList = res.data.content;
						if (this.communityList.length > 0) {
							this.communityList.forEach(item => {
								if (item.id == this.$route.params.id) {
									this.buildingLists = item.buildingList;
									this.createHouse.communityId = this.$route.params.id;
								}
							})
						}
					}
				);
			},
			getDefaultConfigs() {
				this.$ajax.get(
					this,
					this.$api.HOUSE_CONFIG, {}, (res) => {
						let data = res.data.content;
						data.forEach((e, index) => {
							let source = [];
							source = JSON.parse(e.resourceConfig);
							delete e.resourceConfig
							e.configResources = source;
							e.configResources.sort(function(a, b) {
								let value1 = a['sort'];
								let value2 = b['sort'];
								return value1 - value2;
							})
						})
						this.configLists = data;
						data.forEach((e, index) => {
							if (e.isDefault == "01") {
								this.houseSetSingleAll = index;
							}
						});
					}
				)
			},
			// 查询租金相关
			getDefaultRent() {
				this.$ajax.get(
					this,
					this.$api.RENT_RELATED, {},
					(res) => {
						this.payNumDefault = res.data != null && res.data.content.rent ? res.data.content.rent : "3";
						this.mortgageNumDefault = res.data != null && res.data.content.deposit ? res.data.content.deposit : "1";
					}
				)
			},
			buildingChange() {
				this.buildingLists.forEach(item => {
					if (item.id == this.createHouse.buildingId) {
						this.createHouse.floorCount = item.floorCount;
						this.createHouse.elevator = String(item.isElevator);
						this.showIsDisabled();
					}
				})
			},
			showIsDisabled() {
				let str = String(this.createHouse.elevator);
				if (str === "true" || str === "false") {
					this.disableIsEve = true;
				} else {
					this.disableIsEve = false;
				}
			},
			//上传成功
			uploadComplete(response, filename) {
				let data = response.data.content;
				this.unite.roomPicList =
					this.unite.roomPicList == undefined || this.unite.roomPicList == "" ? [] :
					this.unite.roomPicList;
				this.unite.roomPicList.push({
					picId: data.id,
					picPath: data.path,
					type: "room"
				});
			},
			//删除一张图片
			uploadRemove(item) {
				this.unite.roomPicList.forEach((ele, index) => {
					if (ele.picPath == item.picPath) {
						this.unite.roomPicList.splice(index, 1);
					}
					this.$ajax.delete(this, this.$api.DELETE_FILE_UPLOAD_POST.replace("{code}", this.unite.figure).replace("{id}",
						item.picId), {}, res => {});
				});
			},
			mortgageNumChange(query, count, indexs, isPublic) {
				if (!isPublic) {
					if (query == "auto") {
						if (this.createHouse.leaseType == 1) {
							this.$forceUpdate();
							for (var key in this.formDynamicSecond) {
								if (key == count) {
									this.formDynamicSecond[key].forEach((ele, it) => {
										if (it == indexs) {
											ele.isDisabled = false;
											ele.deposit = "";
										}
									});
								}
							}
						} else {
							this.$forceUpdate();
							this.formDynamic.items[count].isDisabled = false;
							this.formDynamic.items[count].deposit = "";
						}
					} else {
						if (this.createHouse.leaseType == 1) {
							this.$forceUpdate();
							for (var key in this.formDynamicSecond) {
								if (key == count) {
									this.formDynamicSecond[key].forEach((ele, it) => {
										if (it == indexs) {
											ele.isDisabled = true;
											if (ele.rent != "" && ele.mortgageNum != "auto" && this.$com.checkNumber(ele.rent)) {
												ele.deposit = String(
													(Number(ele.mortgageNum) * Number(ele.rent)).toFixed('2')
												);
											} else {
												ele.deposit = "";
											}
										}
									})
								}
							}
						} else {
							this.$forceUpdate();
							this.formDynamic.items[count].isDisabled = true;
							if (
								this.formDynamic.items[count].rent != "" &&
								this.formDynamic.items[count].rent != undefined &&
								this.formDynamic.items[count].mortgageNum != "auto" &&
								this.$com.checkNumber(this.formDynamic.items[count].rent)
							) {
								this.formDynamic.items[count].deposit = String(
									(Number(this.formDynamic.items[count].mortgageNum) *
										Number(this.formDynamic.items[count].rent)).toFixed('2')
								);
							} else {
								this.formDynamic.items[count].deposit = "";
							}
						}
					}

				} else {
					if (this.createHouse.leaseType == 1) {
						//合租
						if (query == "auto") {
							this.$forceUpdate();
							for (var key in this.formDynamicSecond) {
								this.formDynamicSecond[key].forEach((ele, index) => {
									ele.isDisabled = false;
									ele.deposit = "";
								});
							}
						} else {
							this.$forceUpdate();
							for (var key in this.formDynamicSecond) {
								this.formDynamicSecond[key].forEach((ele, index) => {
									ele.isDisabled = true;
									if (!this.$com.isBlank(ele.rent) && query != "auto" && this.$com.checkNumber(query)) {
										ele.deposit = String((Number(query) * Number(ele.rent)).toFixed('2'));
									} else {
										ele.deposit = "";
									}
								});
							}
						}
					} else {
						//整租
						if (query == "auto") {
							this.formDynamic.items.forEach((ele, index) => {
								ele.isDisabled = false;
							});
						} else {
							this.formDynamic.items.forEach((ele, index) => {
								ele.isDisabled = true;
								if (
									ele.rent != "" &&
									ele.rent != undefined &&
									this.$com.checkNumber(ele.rent)
								) {
									ele.deposit = String(
										(Number(query) * Number(ele.rent)).toFixed('2')
									);
								} else {
									ele.deposit = "";
								}
							});
						}
					}
				}
			},
			rentChange(it, index) {
				if (this.createHouse.leaseType == 1) {
					this.$forceUpdate();
					for (var key in this.formDynamicSecond) {
						if (key == it) {
							this.formDynamicSecond[key].forEach((ele, it) => {
								if (it == index) {

									if (
										!this.$com.isBlank(ele.rent) &&
										!this.$com.isBlank(ele.mortgageNum) &&
										ele.mortgageNum != "auto" &&
										this.$com.checkNumber(ele.rent)
									) {
										ele.deposit = String((Number(ele.mortgageNum) * Number(ele.rent)).toFixed("2"));
									} else {
										ele.deposit = "";
									}
								}
							});
						}
					}
				} else {
					this.$forceUpdate();
					this.formDynamic.items.forEach((ele, index) => {
						if (it == index) {
							if (
								!this.$com.isBlank(ele.rent) &&
								!this.$com.isBlank(ele.mortgageNum) &&
								ele.mortgageNum != "auto" &&
								this.$com.checkNumber(ele.rent)
							) {
								ele.deposit = String((Number(ele.mortgageNum) * Number(ele.rent)).toFixed("2"));
							} else {
								ele.deposit = "";
							}
						}
					});
				}
			},
			calculatingRent(it, index) {
				let index1 = it;
				let index2 = index;
				if (this.createHouse.leaseType == 1) {
					this.$forceUpdate();
					for (var key in this.formDynamicSecond) {
						if (key == it) {
							this.formDynamicSecond[key].forEach((ele, it) => {
								if (it == index) {
									if (
										!this.$com.isBlank(ele.roomSpace) &&
										!this.$com.isBlank(ele.squareMeterMonthlyRent) &&
										this.$com.checkNumber(ele.squareMeterMonthlyRent) &&
										this.$com.checkNumber(ele.roomSpace)
									) {
										ele.rent = String((Number(ele.roomSpace) * Number(ele.squareMeterMonthlyRent)).toFixed("2"));
										if (ele.mortgageNum != 'auto') {
											this.rentChange(index1, index2);
										}
									} else {
										ele.rent = "";
									}
								}
							});
						}
					}
				} else {
					this.$forceUpdate();
					this.formDynamic.items.forEach((ele, index) => {
						if (it == index) {
							if (
								!this.$com.isBlank(ele.roomSpace) &&
								!this.$com.isBlank(ele.squareMeterMonthlyRent) &&
								this.$com.checkNumber(ele.squareMeterMonthlyRent) &&
								this.$com.checkNumber(ele.roomSpace)
							) {
								ele.rent = String((Number(ele.roomSpace) * Number(ele.squareMeterMonthlyRent)).toFixed("2"));
								if (ele.mortgageNum != 'auto') {
									this.rentChange(index1, index2);
								}
							} else {
								ele.deposit = "";
							}
						}
					});
				}
			},
			handleFloor(it) {
				let params = it != undefined ? it : [];
				let array = [];
				for (var i = 1; i <= params; i++) {
					array.push(i);
				}
				array = array.reverse();
				array.push.apply(array, [-5, -4, -3, -2, -1]);
				return array;
			},
			closePoptip() {
				this.popShow = false;
			},
			showNextOpeation(name) {
				this.roomCount = 0;
				this.formDynamicSecond = {};
				let flag = true;
				this.$refs[name].forEach(item => {
					item.validate(valid => {
						if (valid) {
							this.formDynamic.items.forEach(item => {
								if (item.roomNum == "1" && this.createHouse.leaseType == "1") {
									this.$Message.error("仅有一间房请选择出租方式为整租!");
									flag = false;
								}
							});
						} else {
							flag = false;
						}
					});
				});
				this.$refs["formInline"].validate(valid => {
					if (!valid) {
						flag = false;
					}
				});
				if (flag) {
					if (this.createHouse.leaseType == 1) {
						this.codeArray = "";
						//合租
						this.formDynamic.items.forEach((item, index) => {
							this.roomCount += Number(item.roomNum);
							this.formDynamicSecond["item" + index] = [];
							this.publicEuipment["item" + index] = [];
							this.housePicList["item" + index] = [];
							this.$ajax.get(this, this.$api.GET_FILE_UPLOAD_CODE_GET, {}, res => {
								this.housePicListFigure[index] = res.data.content.code;
								this.codeArray += res.data.content.code + ",";
							});
							this.$ajax.get(
								this,
								this.$api.GET_FILE_UPLOAD_CODE_GET + "?number=" + item.roomNum, {},
								res => {
									let codeStrings = res.data.content.code;
									let codeArray = codeStrings.split(",");
									this.codeArray += codeStrings;
									for (let i = 0; i < item.roomNum; i++) {
										let obj = {
											alias: this.letterTable[i],
											leaseStatus: "",
											houseSpace: "",
											payNum: this.payNumDefault ? this.payNumDefault : "3",
											mortgageNum: this.mortgageNumDefault ? this.mortgageNumDefault : "1",
											rent: "",
											deposit: "",
											earnest: "",
											description: "",
											slogan: "",
											direction: "",
											roomConfigList: [],
											isDisabled: true,
											roomPicList: [],
											figure: codeArray[i],
											squareMeterMonthlyRent: item.squareMeterMonthlyRent
										};
										if (this.houseSetSingleAll !== "") {
											obj.houseSetSingle = this.houseSetSingleAll;
										}
										this.$forceUpdate();
										this.formDynamicSecond["item" + index].push(obj);
									}
								}
							);
						});
					} else {
						this.codeArray = "";
						this.formDynamic.items.forEach((item, index) => {
							item.payNum = this.payNumDefault ? this.payNumDefault : "3";
							item.mortgageNum = this.mortgageNumDefault ? this.mortgageNumDefault : "1";
							item.roomSpace = item.houseSpace;
							item.rent = String((Number(item.roomSpace) * Number(item.squareMeterMonthlyRent)).toFixed('2'));
							item.deposit = String((Number(item.rent) * Number(item.mortgageNum)).toFixed('2'));
							item.isDisabled = true;
							if (this.houseSetSingleAll !== "") {
								item.houseSetSingle = this.houseSetSingleAll;
							}
							this.$ajax.get(this, this.$api.GET_FILE_UPLOAD_CODE_GET, {}, res => {
								this.codeArray += res.data.content.code + ",";
								item.figure = res.data.content.code;
							});
						});
					}
					this.current = 1;
					this.showTable = true;
				} else {
					this.$Message.error("请填写必要信息!");
				}
			},
			handleAddHouse(index) {
				if (Number(this.formDynamic.items.length) + Number(index) <= 25) {
					for (var i = 0; i < index; i++) {
						this.formDynamic.items.push({});
					}
				} else {
					this.$Message.warning("房源数量不可超过25");
				}
			},
			handleRemove(index) {
				this.formDynamic.items.splice(index, 1);
			},
			ok() {
				if (this.modalType == "houseType") {
					this.saveModalValueToData("houseType", "houseType");
				} else if (this.modalType == "house") {
					this.saveModalValueToData("roomCount", "roomNum");
				} else if (this.modalType == "hall") {
					this.formDynamic.items.forEach(item => {
						item.parlourNum = String(this.unite.roomCount);
					});
					this.unite.roomCount = "";
				} else if (this.modalType == "guard") {
					this.formDynamic.items.forEach(item => {
						item.toiletNum = String(this.unite.roomCount);
					});
					this.unite.roomCount = "";
				} else if (this.modalType == "floorAll") {
					this.formDynamic.items.forEach(item => {
						item.floorCount = String(this.unite.roomCount);
					});
					this.unite.roomCount = "";
				} else if (this.modalType == "area") {
					this.saveModalValueToData("houseSpace", "houseSpace");
				} else if (this.modalType == "elevator") {
					this.saveModalValueToData("isElevator", "elevator");
				} else if (this.modalType == "direction") {
					this.saveModalValueToData("direction", "direction");
				} else if (this.modalType == "leaseStatus") {
					this.saveModalValueToData("leaseStatus", "leaseStatus");
				} else if (this.modalType == "rent") {
					if (this.createHouse.leaseType == 1) {
						for (var items in this.formDynamicSecond) {
							this.formDynamicSecond[items].forEach(item => {
								item.rent = this.unite.rent;
							});
						}
						for (var items in this.formDynamicSecond) {
							this.formDynamicSecond[items].forEach(item => {
								if (
									item.mortgageNum != undefined &&
									item.mortgageNum != "auto" &&
									item.mortgageNum != "" &&
									this.unite.rent != "" &&
									this.unite.rent != undefined &&
									/^\d+$/.test(this.unite.rent)
								) {
									item.deposit = String(this.unite.rent * item.mortgageNum);
								} else {
									item.deposit = "";
								}
							});
						}
					} else {
						this.formDynamic.items.forEach(item => {
							item.rent = this.unite.rent;
						});
						this.formDynamic.items.forEach(item => {
							if (
								item.mortgageNum != undefined &&
								item.mortgageNum != "auto" &&
								item.mortgageNum != "" &&
								this.unite.rent != "" &&
								this.unite.rent != undefined &&
								/^\d+$/.test(this.unite.rent)
							) {
								item.deposit = String(this.unite.rent * item.mortgageNum);
							} else {
								item.deposit = "";
							}
						});
					}
					this.unite.rent = "";
				} else if (this.modalType == "deposit") {
					this.depositDisabled = false;
					this.saveModalValueToData("deposit", "deposit");
				} else if (this.modalType == "methods") {
					if (this.createHouse.leaseType == 1) {
						//整租
						for (var items in this.formDynamicSecond) {
							this.$forceUpdate();
							this.formDynamicSecond[items].forEach(item => {
								item.payNum = this.unite.payNum;
							});
						}
						for (var items in this.formDynamicSecond) {
							this.$forceUpdate();
							this.formDynamicSecond[items].forEach(item => {
								if (this.unite.mortgageNum == "auto") {
									item.mortgageNum = this.unite.mortgageNum;
									item.isDisabled = false;
								} else {
									item.mortgageNum = this.unite.mortgageNum;
									item.isDisabled = true;
								}
							});
						}
					} else {
						//合租
						this.formDynamic.items.forEach(item => {
							item.payNum = this.unite.payNum;
						});
						this.formDynamic.items.forEach(item => {
							if (this.unite.mortgageNum == "auto") {
								item.mortgageNum = this.unite.mortgageNum;
								item.isDisabled = false;
							} else {
								item.mortgageNum = this.unite.mortgageNum;
								item.isDisabled = true;
							}
						});
					}
				} else if (this.modalType == "publicSet") {
					if (this.createHouse.leaseType == 1) {
						if (this.modalParentIndex != undefined) {
							this.publicEuipment[this.modalParentIndex] = this.publicSets;
						} else {
							for (var items in this.publicEuipment) {
								this.publicEuipment[items] = this.publicSets;
							}
						}
					}
				} else if (this.modalType == "roomConfigList") {
					if (this.createHouse.leaseType == 1) {
						if (
							this.modalParentIndex != undefined &&
							this.modalChildrenIndex != undefined
						) {
							for (var items in this.formDynamicSecond) {
								if (items == this.modalParentIndex) {
									this.formDynamicSecond[items].forEach((item, index) => {
										if (index == this.modalChildrenIndex) {
											item.roomConfigList = this.unite.roomConfigList;
											item.houseSetSingle = this.unite.houseSetSingle;
										}
									});
								}
							}
						} else {
							for (var items in this.formDynamicSecond) {
								this.formDynamicSecond[items].forEach(item => {
									item.roomConfigList = this.unite.roomConfigList;
									item.houseSetSingle = this.unite.houseSetSingle;
								});
							}
						}
					} else {
						if (this.modalParentIndex != undefined) {
							this.formDynamic.items.forEach((item, index) => {
								if (index == this.modalParentIndex) {
									item.roomConfigList = this.unite.roomConfigList;
									item.houseSetSingle = this.unite.houseSetSingle;

								}
							});
						} else {
							this.formDynamic.items.forEach((item, index) => {
								item.houseSetSingle = this.unite.houseSetSingle;
								item.roomConfigList = this.unite.roomConfigList;
							});
						}
					}
				} else if (this.modalType == "roomPicList") {
					this.saveModalValueToData("roomPicList", "roomPicList");
				} else if (this.modalType == "housePicList") {
					if (this.modalParentIndex != undefined) {
						this.housePicList[this.modalParentIndex] = this.unite.roomPicList;
					} else {
						for (var items in this.housePicList) {
							this.housePicList[items] = this.unite.roomPicList;
						}
					}
					this.unite.housePicList = [];
				}
			},
			saveModalValueToData(ModalData, ItemData) {
				if (this.current == "0") {
					this.formDynamic.items.forEach((item, index) => {
						item[ItemData] = this.unite[ModalData];
					});
				} else {
					if (this.createHouse.leaseType == 1) {
						if (
							this.modalParentIndex != undefined &&
							this.modalChildrenIndex != undefined
						) {
							for (var items in this.formDynamicSecond) {
								if (items == this.modalParentIndex) {
									this.formDynamicSecond[items].forEach((item, index) => {
										if (index == this.modalChildrenIndex) {
											item[ItemData] = this.unite[ModalData];
										}
									});
								}
							}
						} else {
							for (var items in this.formDynamicSecond) {
								this.formDynamicSecond[items].forEach(item => {
									item[ItemData] = this.unite[ModalData];
								});
							}
						}
					} else {
						if (this.modalParentIndex != undefined) {
							this.formDynamic.items.forEach((item, index) => {
								if (index == this.modalParentIndex) {
									item[ItemData] = this.unite[ModalData];
								}
							});
						} else {
							this.formDynamic.items.forEach((item, index) => {
								item[ItemData] = this.unite[ModalData];
							});
						}
					}
				}
				if (ItemData == "roomPicList" || ItemData == "housePicList") {
					this.unite[ModalData] = [];
				} else {
					this.unite[ModalData] = "";
				}
			},
			handleMassDelPics(query) {
				this.$ajax.delete(this, this.$api.DELETE_FILE_UPLOAD_BY_CODE + "?codes=" + query, null, res => {});
			},
			cancel() {
				this.modal = false;
				this.unite.slogan = "";
				this.unite.description = "";
				this.unite.roomConfigList = [];
				this.unite.houseSetSingle = "";
				this.handleMassDelPics(this.unite.figure);
			},
			showModal(name, it, index) {
				this.modalType = name;
				this.modal = true;
				this.modalParentIndex = it;
				this.modalChildrenIndex = index;
				if (name == "publicSet") {
					//公共设置
					if (this.modalParentIndex != undefined) {
						this.publicSets = this.publicEuipment[this.modalParentIndex];
					}
				} else if (name == "roomConfigList") {
					this.unite.roomConfigList = [];
					if (this.createHouse.leaseType == 1) {
						//房间设置
						if (
							this.modalParentIndex != undefined &&
							this.modalChildrenIndex != undefined
						) {
							this.formDynamicSecond[this.modalParentIndex].forEach(
								(item, is) => {
									if (is == this.modalChildrenIndex) {
										this.unite.roomConfigList = item.roomConfigList;
										this.unite.houseSetSingle = item.houseSetSingle !== "" && item.houseSetSingle != undefined ? item.houseSetSingle :
											this.unite.houseSetSingle;
									}
								}
							);
						}
					} else {
						if (this.modalParentIndex != undefined) {
							this.formDynamic.items.forEach((item, is) => {
								if (is == this.modalParentIndex) {
									this.unite.roomConfigList = item.roomConfigList;
									this.unite.houseSetSingle = item.houseSetSingle !== "" && item.houseSetSingle != undefined ? item.houseSetSingle :
										this.unite.houseSetSingle;
								}
							});
						}
					}
				} else if (name == "roomPicList") {
					this.openModalDatas("roomPicList", "roomPicList");
				} else if ((name = "housePicList")) {
					//公共设置
					if (this.modalParentIndex != undefined) {
						this.unite.roomPicList = JSON.parse(
							JSON.stringify(this.housePicList[this.modalParentIndex])
						);
						this.unite.figure = this.housePicListFigure[
							this.modalParentIndex.replace("item", "")
						];
					} else {
						this.unite.roomPicList = [];
					}
				}
			},
			openModalDatas(ModalData, ItemData) {
				if (this.createHouse.leaseType == 1) {
					if (
						this.modalParentIndex != undefined &&
						this.modalChildrenIndex != undefined
					) {
						this.formDynamicSecond[this.modalParentIndex].forEach((item, is) => {
							if (is == this.modalChildrenIndex) {
								this.unite[ModalData] = item[ItemData];
								if (ItemData == "roomPicList" || ItemData == "housePicList") {
									this.unite.figure = item.figure;
								}
							}
						});
					} else {
						this.unite[ModalData] = "";
					}
				} else {
					if (this.modalParentIndex != undefined) {
						this.formDynamic.items.forEach((item, is) => {
							if (is == this.modalParentIndex) {
								this.unite[ModalData] =
									item[ItemData] == undefined ? [] : item[ItemData];
								if (ItemData == "roomPicList" || ItemData == "housePicList") {
									this.unite.figure = item.figure;
								}
							}
						});
					} else {
						if (ItemData == "roomPicList" || ItemData == "housePicList") {
							this.unite[ModalData] = [];
						} else {
							this.unite[ModalData] = "";
						}
					}
				}
			},
			singlePublicSet(name, it) {
				this.showModal(name, it);
			},
			//房源的选择
			changeActiveItems(query, it) {
				if (query == 1) {
					this.houseActiveIndex = it;
				} else {
					this.houseAllActiveIndex = it;
				}
			},
			//删除一个房间
			deleteHouse(it, index) {
				this.$forceUpdate();
				if (this.formDynamicSecond[it].length > 1) {
					this.$delete(this.formDynamicSecond[it], index);
				} else {
					this.$Message.error("至少保存一间房!");
				}
				if (this.formDynamicSecond[it].length == 0) {
					delete this.formDynamicSecond[it];
					this.houseActiveIndex = "";
				}
			},
			addHouse() {
				if (JSON.stringify(this.formDynamicSecond) == "{}") {
					this.$Message.error("请选择其中一条数据!");
					return;
				}
				if (this.houseActiveIndex != "") {
					for (var key in this.formDynamicSecond) {
						if (key == this.houseActiveIndex) {
							let index = Number(this.houseActiveIndex.replace("item", ""));
							if (
								Number(this.formDynamicSecond[key].length) <
								Number(this.formDynamic.items[index].roomNum)
							) {
								this.$forceUpdate();
								let obj = {
									alias: "",
									leaseStatus: "",
									payNum: "3",
									mortgageNum: "1",
									rent: "",
									deposit: "",
									direction: "",
									roomConfigList: [],
									isDisabled: true,
									roomPicList: []
								};
								this.formDynamicSecond[this.houseActiveIndex].push(obj);
							} else {
								this.$Message.error("房间数不可超过第一步房间数!");
							}
						}
					}
				} else {
					this.$Message.error("请选择其中一条数据!");
				}
			},
			//返回上一步
			returnSteps() {
				this.formDynamicSecond = {};
				this.showTable = false;
				this.current = 0;
			},
			//房源新增
			handleSave(name) {
				let flag = true;
				//表单校验
				this.$refs[name].forEach(item => {
					item.validate(valid => {
						if (!valid) {
							flag = false;
						}
					});
				});
				if (flag) {
					let formDatas = JSON.parse(JSON.stringify(this.createHouse));
					formDatas.communityId = this.createHouse.communityId; //小区id
					this.formDynamic.items.forEach(element => {
						element.buildType = 0;
						element.leaseType = this.createHouse.leaseType == "1" ? 0 : 1;
					});
					formDatas.houseList = JSON.parse(
						JSON.stringify(this.formDynamic.items)
					);
					if (this.createHouse.leaseType == "1") {
						if (this.formDynamic.items.length > 0) {
							let dataSecond = JSON.parse(JSON.stringify(this.formDynamicSecond));
							formDatas.houseList.forEach((element, index) => {
								formDatas.houseList[index].roomList = dataSecond["item" + index];
								formDatas.houseList[index].houseConfigList = this.publicSets;
							});
						}
						//房屋公共设置
						formDatas.houseList.forEach((ele, index) => {
							ele.houseKind = this.$cookie.get('houseKind');
							if (ele.houseConfigList && ele.houseConfigList.length > 0) {
								if (ele.houseConfigList[index].constructor == String) {
									ele.houseConfigList.forEach((item, index) => {
										ele.houseConfigList[index] = {
											name: item
										};
									});
								}
							} else {
								return;
							}
						});
						formDatas.houseList.forEach((ele, index) => {
							//公共图片
							for (var key in this.housePicList) {
								this.housePicList[key].forEach(ele => {
									ele.type = "house";
								});
								ele.housePicList = this.housePicList[key];
							}
						});
					} else {
						//整租整理
						formDatas.houseList.forEach(item => {
							item.houseKind = this.$cookie.get('houseKind');
							item.roomList = [];
							item.roomList.push({
								leaseStatus: item.leaseStatus,
								payNum: item.payNum,
								mortgageNum: item.mortgageNum,
								rent: item.rent,
								deposit: item.deposit,
								roomConfigList: item.roomConfigList,
								roomPicList: item.roomPicList
							});
						});
						delete formDatas.houseList[0].roomPicList;
					}
					//房间设置
					formDatas.houseList.forEach(ele => {
						if (ele.mortgageNum == "auto") {
							ele.mortgageNum = "0";
						}
						if (ele.roomList && ele.roomList.length > 0) {
							ele.roomList.forEach((item, index) => {
								if (item.mortgageNum == "auto") {
									item.mortgageNum = "0";
								}
								if (item.roomConfigList && item.roomConfigList.length > 0) {
									item.roomConfigList.forEach((items, index) => {
										if (item.roomConfigList[index].constructor == String) {
											item.roomConfigList[index] = {
												name: items
											};
										}
									});
								}
							});
						}
					});
					if (this.createHouse.leaseType == "2") {
						formDatas.houseList.forEach(ele => {
							delete ele.roomConfigList;
						});
					}
					this.$ajax.post(this, this.$api.POST_ADD_HOUSE, formDatas, res => {
						if (res.code == "200") {
							this.$Message.success("新增成功！");
							this.handleMassDelPics(this.codeArray);
							this.$router.push({
								name: 'lease/state-housing-distributed'
							})
						} else {
							this.$Message.error(res.msg);
						}
					});
				} else {
					//失败
					this.$Message.error("请检查必填项和所填数据是否合法!");
				}
			},
			//得到微信上传的图片
			startRunFun() {
				let count = "";
				this.$ajax.get(
					this,
					this.$api.GET_FILE_UPLOAD_POST.replace("{code}", this.unite.figure), {},
					res => {
						count = res.data.content.length;
						if (count > 0) {
							let data = res.data.content;
							data.forEach(element => {
								element.picPath = element.path;
								element.picId = element.id;
							});
							if (this.unite.roomPicList.length == 0) {
								this.unite.roomPicList = data;
							} else {
								var str = "";
								this.unite.roomPicList.forEach(element => {
									str += element.picId;
								});
								data.forEach(element => {
									if (str.indexOf(element.picId) == -1) {
										this.unite.roomPicList.push(element);
									}
								});
							}
						}
					}
				);
			},
			defaultConfigs() {
				if (this.unite.houseSetSingle !== "" && this.unite.houseSetSingle != undefined && this.configLists.length > 0) {
					this.unite.roomConfigList = [];
					if (this.configLists && this.configLists.length > 0) {
						this.configLists[this.unite.houseSetSingle].configResources.forEach(ele => {
							if (ele.isChecked == '01') {
								this.unite.roomConfigList.push(ele.name);
							}
						})
					}
				}
			},
			returnConfigsName(query) {
				let flag = true;
				let msg = "";
				if (query !== "" && query != undefined) {
					this.configLists.forEach((ele, index) => {
						if (index == query) {
							flag = true;
							msg = ele.configName;
						}
					})
				} else {
					return "配置";
				}
				if (flag) {
					return msg;
				} else {
					return "配置";
				}
			}
		},
		watch: {
			"unite.houseSetSingle"() {
				this.defaultConfigs();
			},
			"unite.roomConfigList"() {
				if (this.unite.houseSetSingle !== "" && this.unite.houseSetSingle != undefined && this.configLists.length > 0) {
					let str = this.unite.roomConfigList.length > 0 ? this.unite.roomConfigList.join(",") : '';
					let array = [];
					let str2 = "";
					this.configLists[this.unite.houseSetSingle].configResources.forEach(ele => {
						if (ele.isChecked == '01') {
							array.push(ele.name);
						}
					})
					str2 = array.join(",");
					if (str != str2) {
						this.unite.houseSetSingle = "";
					}
				}

			},
			"createHouse.buildingId"() {
				this.buildingLists.forEach(item => {
					if (item.id == this.createHouse.buildingId) {
						this.buildingName = item.buildingCode;
					}
				})
			}
		}
	};
</script>

<style>
	.formList .middle .ivu-select,
	.formList .small .ivu-select {
		width: 70px;
	}

	.formList_l .middle .ivu-select,
	.formList_l .small .ivu-select {
		width: 93px;
	}

	#form .ivu-form-item-error-tip {
		top: 27px;
		text-align: left;
	}

	.form1 .ivu-form-item-error-tip {
		width: 80px;
	}

	.form2 .ivu-form-item-error-tip {
		width: 110px;
	}
</style>
<style scoped>
	.containerFlow {
		max-width: 1205px;
		margin: 0 auto;
	}

	#steps {
		border-bottom: 1px solid #e8eaec;
		margin-top: 10px;
		padding: 20px 0;
	}

	#createForm {
		padding: 20px 0;
	}

	.tableContainer {
		overflow: auto;
	}

	.tableContainer::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 4px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 4px;
	}

	.tableContainer::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 5px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
		background: #e8eaec;
	}

	.tableContainer::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0;
		background: white;
	}

	#form {
		border: 1px solid #e8eaec;
		margin-bottom: 10px;
	}

	.step2 #form {
		margin: 0;
		border: none;
		border-bottom: 1px solid #e8eaec;
	}

	.step2 .opeationForm #form:last-of-type {
		border-bottom: none;
	}

	#form div,
	.formList .header>div {
		float: left;
	}

	.formList .header {
		background: rgb(249, 248, 248);
		height: 50px;
		line-height: 50px;
		margin-bottom: 15px;
		border: 1px solid #e8eaec;
	}

	.formList .header .large,
	.formList .header .middle,
	.formList .header .small,
	.formList .header .supSmall {
		padding: 0px;
		margin: 0px;
	}

	.formList {
		margin-bottom: 10px;
		width: 1180px;
		box-sizing: border-box;
		font-size: 12px;
		padding: 10px 0;
	}

	.formList_l {
		width: 1180px;
	}

	.noBor {
		border: none !important;
	}

	.middle,
	.small,
	.supSmall,
	.large {
		width: 94px;
		height: 50px;
		text-align: center;
		box-sizing: border-box;
		padding-top: 8px;
		position: relative;
	}

	#form .middle:after,
	#form .small:after,
	#form .supSmall:after,
	#form .large:after {
		content: "";
		display: inline-block;
		position: absolute;
		width: 1px;
		height: 30px;
		top: 10px;
		left: 0px;
		background: #e8eaec;
	}

	.formList #form .noAfter:after {
		width: 0px;
		height: 0px;
	}

	.small {
		width: 78px;
		/* padding-left: 8px; */
	}

	.supSmall {
		width: 60px;
		padding-left: 5px;
		line-height: 100%;
		padding-top: 8px;
	}

	.header .supSmall div {
		height: 50px;
		line-height: 50px;
	}

	.large {
		width: 150px;
		height: 50px;
		text-align: center;
	}

	.required {
		color: red;
	}

	.middle {
		width: 88px;
		padding-left: 10px;
	}

	.formList_l .middle {
		width: 114px;
		padding-left: 10px;
	}

	.allGain .formList .middle {
		width: 114px;
		padding-left: 10px;
	}

	.stepNext {
		text-align: center;
		margin-top: 20px;
	}

	.tips {
		margin-bottom: 5px;
	}

	.houseBlock {
		border: 1px solid #e8eaec;
		margin-bottom: 10px;
	}

	.houseBlock:hover {
		cursor: pointer;
	}

	.houseBlockActive {
		border: 1px solid #507bea !important;
	}

	.houseBlock #form .middle:after,
	.houseBlock #form .small:after,
	.houseBlock #form .supSmall:after,
	.houseBlock #form .large:after {
		background: white;
	}

	#form:after,
	.houseBlock:after {
		content: "\0020";
		display: block;
		height: 0;
		clear: both;
	}

	#form {
		zoom: 1;
	}

	.flod {
		overflow: hidden;
		padding-left: 20px;
	}

	.flod div {
		float: left;
		width: 40px;
		line-height: 1.5;
		margin-top: 7px;
	}

	.flod i {
		position: relative;
		top: 0px;
		left: 0px;
	}

	.allGain,
	.allGain .formList {
		width: 1180px;
	}

	.allGain #form {
		border: none;
	}

	.row-high-light {
		width: 100%;
		text-align: center;
		color: #2d8cf0;
	}
</style>
