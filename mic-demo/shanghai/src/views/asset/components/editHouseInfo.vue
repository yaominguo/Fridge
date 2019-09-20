<template>
	<Card>
		<div class="editTitle">
			{{detail.showName}}
			<!-- <Icon type="md-create" color @click="showModal" v-show="pageType!='disperseSingleRoom'&&pageType!='editSingleRoomListings'" /> -->
		</div>
		<div>
			<!-- 111 -->
			<Form ref="editRoommatesEntire" :model="editRoommatesEntire" :label-width="80" :rules="editRoommatesEntireRules"
			 v-if="pageType=='editRoommatesEntire'">
				<Row>
					<Col span="8">
					<FormItem label="总楼层数" prop="floorCount">
						<Select v-model="editRoommatesEntire.floorCount" disabled clearable placeholder="请选择">
							<Option v-for="count in 99" :value="String(count)" :key="count">{{ count }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="8" offset="1">
					<FormItem label="是否电梯房" prop="elevator" :label-width="90">
						<Select v-model="editRoommatesEntire.elevator" disabled clearable placeholder="请选择">
							<Option v-for="(item,index) in isElevatorList" :value="item.value" :key="index">{{ item.name }}</Option>
						</Select>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="9">
					<Row type="flex" justify="start">
						<Col span="1" style="width:80px">
						<FormItem label="实际户型"></FormItem>
						</Col>
						<Col span="18">
						<FormItem label="房" prop="roomNum" :label-width="40" class="itemWidthInline">
							<Select transfer v-model="editRoommatesEntire.roomNum" clearable placeholder="房" class="itemWidthActualType">
								<Option v-for="(count,index) in 26" :value="String(count)" :key="index">{{count }}</Option>
							</Select>
						</FormItem>
						<FormItem label="厅" prop="parlourNum" :label-width="40" class="itemWidthInline">
							<Select v-model="editRoommatesEntire.parlourNum" clearable placeholder="厅" class="itemWidthActualType" transfer>
								<Option v-for="(count,index) in 11" :value="String(count - 1 )" :key="index">{{count-1}}</Option>
							</Select>
						</FormItem>
						<FormItem label="卫" prop="toiletNum" :label-width="40" class="itemWidthInline">
							<Select v-model="editRoommatesEntire.toiletNum" clearable placeholder="卫" transfer class="itemWidthActualType">
								<Option v-for="(count,index) in 11" :value="String(count - 1)" :key="index">{{ count -1}}</Option>
							</Select>
						</FormItem>
						</Col>
					</Row>
					</Col>
					<Col span="8">
					<FormItem label="所在楼层" prop="floor">
						<Select v-model="editRoommatesEntire.floor" transfer clearable placeholder="请选择">
							<Option v-for="count in handleFloor(editRoommatesEntire.floorCount)" :value="String(count)" :key="count">{{ count}}</Option>
						</Select>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="8">
					<FormItem label="户型面积(m²)" prop="houseSpace" :label-width="100">
						<Input v-model="editRoommatesEntire.houseSpace" placeholder="户型面积" />
					</FormItem>
					</Col>
					<Col span="8" offset="1">
					<FormItem label="平方米月租金(元)" prop="squareMeterMonthlyRent" :label-width="110">
						<Input v-model="editRoommatesEntire.squareMeterMonthlyRent" placeholder="平方米月租金" />
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="1" style="width:80px">
					<FormItem label="水电煤户号"></FormItem>
					</Col>
					<Col span="18">
					<FormItem label="水" prop="waterNum" :label-width="40" class="itemWidthInline">
						<Input v-model="editRoommatesEntire.waterNum" placeholder="水" style="width:75px" />
					</FormItem>
					<FormItem label="电" prop="elecNum" :label-width="40" class="itemWidthInline">
						<Input v-model="editRoommatesEntire.elecNum" placeholder="电" style="width:75px" />
					</FormItem>
					<FormItem label="煤" prop="gasNum" :label-width="40" class="itemWidthInline">
						<Input v-model="editRoommatesEntire.gasNum" placeholder="煤" style="width:75px" />
					</FormItem>
					</Col>
				</Row>
				<Divider dashed />
				<Row>
					<Col span="24">
					<FormItem label="公共区域照片" :label-width="90">
						<imageUpload :uploadButton="'uploadsPublic'" :isPhone="true" :code="publicFigure" :maxUploads="20" :url="$api.FILE_UPLOAD_POST"
						 :defaultList="publicSetsPicLists" @on-complete="uploadComplete" @on-remove="uploadRemove" @showUploadImg="startRunFun"></imageUpload>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col>
					<FormItem label="公共区域配置" :label-width="90">
						<CheckboxGroup v-model="publicSets">
							<Row type="flex" justify="start">
								<Col span="12">
								<Checkbox v-for="(item,index) in  defaultConfigLists" :key="index" :label="item"></Checkbox>
								</Col>
							</Row>
						</CheckboxGroup>
					</FormItem>
					</Col>
				</Row>
			</Form>
			<!-- 22222222222222222222222222 -->
			<Form ref="editSingleRoomListings" :model="editSingleRoomListings" :label-width="80" :rules="editSingleRoomListingsRules"
			 v-if="pageType=='editSingleRoomListings'">
				<Row>
					<Col span="8">
					<FormItem label="房间号" prop="roomNo">
						<Input type="text" v-model="editSingleRoomListings.roomNo" :maxlength="6" clearable placeholder="房间号"></Input>
					</FormItem>
					</Col>
					<Col span="4" offset="1">
					<FormItem label="出租状态" prop="rentalStatus">
						<Radio v-model="rentStatus">{{editSingleRoomListings.leaseStatusName}}</Radio>
					</FormItem>
					</Col>

				</Row>
				<Row>
					<Col span="8">
					<FormItem label="所在楼层" prop="floor">
						<Select v-model="editSingleRoomListings.floor" transfer clearable placeholder="请选择">
							<Option v-for="count in handleFloor(editSingleRoomListings.floorCount)" :value="String(count)" :key="count">{{ count}}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="8" offset="1">
					<FormItem label="用途">
						<Radio v-model="usage">出租</Radio>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Row type="flex" justify="start">
						<Col span="1" style="width:80px">
						<FormItem label="实际户型"></FormItem>
						</Col>
						<Col span="18">

						<FormItem label="房" prop="roomNum" :label-width="40" class="itemWidthInline">
							<Select transfer v-model="editSingleRoomListings.roomNum" clearable placeholder="房" class="itemWidth">
								<Option v-for="(count,index) in 26" :value="String(count)" :key="index">{{count }}</Option>
							</Select>
						</FormItem>
						<FormItem label="厅" prop="parlourNum" :label-width="40" class="itemWidthInline">
							<Select v-model="editSingleRoomListings.parlourNum" clearable placeholder="厅" class="itemWidth" transfer>
								<Option v-for="(count,index) in 11" :value="String(count - 1)" :key="index">{{count-1}}</Option>
							</Select>
						</FormItem>
						<FormItem label="卫" prop="toiletNum" :label-width="40" class="itemWidthInline">
							<Select v-model="editSingleRoomListings.toiletNum" clearable placeholder="卫" transfer class="itemWidth">
								<Option v-for="(count,index) in 11" :value="String(count - 1)" :key="index">{{ count -1}}</Option>
							</Select>
						</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span="1" style="width:80px">
						<FormItem label="水电煤户号">

						</FormItem>
						</Col>
						<Col span="18">
						<FormItem label="水" prop="waterNum" :label-width="40" class="itemWidthInline">
							<Input v-model="editSingleRoomListings.waterNumBig!=null?editSingleRoomListings.waterNumBig:editSingleRoomListings.waterNum"
							 :disabled="disWaterNumBig" placeholder="水" style="width:75px" />
						</FormItem>
						<FormItem label="电" prop="elecNum" :label-width="40" class="itemWidthInline">
							<Input v-model="editSingleRoomListings.elecNumBig!=null?editSingleRoomListings.elecNumBig:editSingleRoomListings.elecNum"
							 :disabled="disElecNumBig" placeholder="电" style="width:75px" />
						</FormItem>
						<FormItem label="煤" prop="gasNum" :label-width="40" class="itemWidthInline">
							<Input v-model="editSingleRoomListings.gasNumBig!=null?editSingleRoomListings.gasNumBig:editSingleRoomListings.gasNum"
							 :disabled="disGasNumBig" placeholder="煤" style="width:75px" />
						</FormItem>
						</Col>
					</Row>
				</Row>
				<Divider dashed />
				<Row>
					<Col span="8">
					<FormItem label="房间面积(m²)" prop="roomSpace" :label-width="100">
						<Input v-model="editSingleRoomListings.roomSpace" @on-change="calculatingRent()" placeholder="房间面积" />
					</FormItem>
					</Col>
					<Col span="8" offset="1">
					<FormItem label="平方米月租金(元)" prop="squareMeterMonthlyRent" :label-width="110">
						<Input v-model="editSingleRoomListings.squareMeterMonthlyRent" @on-change="calculatingRent()" placeholder="平方米月租金" />
					</FormItem>
					</Col>
				</Row>
				<Row type="flex" justify="start">
					<Col span="1" style="width:80px">
					<FormItem label="付款方式"></FormItem>
					</Col>
					<Col span="7">
					<FormItem label="付" prop="payNum" :label-width="40" class="itemWidthInline">
						<Select transfer v-model="editSingleRoomListings.payNum" clearable placeholder="付" style="width:125px">
							<Option v-for="(count,index) in 12" :value="String(count)" :key="index">{{ count }}</Option>
						</Select>
					</FormItem>
					<FormItem label="押" prop="mortgageNum" :label-width="40" class="itemWidthInline">
						<Select transfer v-model="editSingleRoomListings.mortgageNum" @on-change="depositChange()" clearable placeholder="押"
						 style="width:125px">
							<Option value="auto">自定义</Option>
							<Option v-for="(count,index)  in 12" :value="String(count)" :key="index">{{ count }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col>
					<FormItem prop="rent" label="租金(元/月)" class="itemWidthInline" :label-width="90">
						<Input type="text" clearable v-model="editSingleRoomListings.rent" placeholder="租金" @on-change="depositChange()"></Input>
					</FormItem>
					<FormItem prop="deposit" label="押金(元)" class="itemWidthInline">
						<Input type="text" v-model="editSingleRoomListings.deposit" placeholder="押金" :disabled="isDisabled"></Input>
					</FormItem>
					</Col>
				</Row>

				<Row v-for="(item,index) in roomCostList" :key="index" style="margin-bottom:10px" :gutter="20" type="flex" justify="start"
				 align="middle">
					<Col style="padding-left:0">
					<FormItem :label="index=='0'?'其他费用':''" style="margin-bottom:0;padding:0"></FormItem>
					</Col>
					<Col style="padding-left:0">
					<Select placeholder="请选择" transfer :label-in-value="true" v-model="item.nameFirst" @on-change="gainfeeChildrenList(item,index)"
					 style="width:104px">
						<Option v-for="(item, index) in item.firstLists" :key="index" :value="String(item.id)">{{item.name}}</Option>
					</Select>
					</Col>
					<Col>
					<Select placeholder="请选择" transfer v-model="item.name" :label-in-value="true" @on-change="bindSign(item,index)"
					 style="width:104px" :disabled="item.selectDisabled">
						<Option v-for="(item, index) in item.secondsLists" :key="index" :value="String(item.name)">{{item.name}}</Option>
					</Select>
					</Col>
					<Col>
					<Input type="text" :disabled="item.textDisabled" style="width:104px" v-model="item.cost" placeholder="费用(单位:元)"
					 @on-blur="formatFee(item.cost,index)"></Input>
					</Col>
					<Col>
					<Icon type="ios-remove-circle-outline" @click="deleteFee(index)" :size="20" :color="'#2d8cf0'" v-show="deleteFeeFlag" />
					</Col>
				</Row>
				<!-- 操作 -->
				<Row>
					<FormItem>
						<Col span="3">
						<Button @click="addFee">增加其他费用</Button>
						</Col>
					</FormItem>
				</Row>
				<!-- 收租日设置 -->
				<Row>
					<FormItem label="收租日设置">
						<RadioGroup v-model="rentType" vertical @on-change="rentTypeChange">
							<Radio label="1" style="margin-bottom:10px">
								<span>提前</span>
								<Input type="text" v-model="dayAdvance" :disabled="rentTypeDisabled!=1" class="itemWidth" @on-blur="formatDay(dayAdvance,'dayAdvance')"></Input>
								<span>天收租</span>
							</Radio>
							<Radio label="2" style="margin-bottom:10px">
								<span>固定</span>
								<Input type="text" v-model="dayStable" :disabled="rentTypeDisabled!=2" class="itemWidth" @on-blur="formatDay(dayStable,'dayStable')"></Input>
								<span>日收租 (每期的第一个月)</span>
							</Radio>
							<Radio label="3">
								<span>固定</span>
								<Input type="text" v-model="dayReStable" :disabled="rentTypeDisabled!=3" class="itemWidth" @on-blur="formatDay(dayReStable,'dayReStable')"></Input>
								<span>日收租 (每期提前一个月)</span>
							</Radio>
						</RadioGroup>
					</FormItem>
				</Row>
				<Divider dashed />
				<!-- 房间模板照片 -->
				<Row>
					<FormItem label="房间照片" :label-width="90">
						<imageUpload :uploadButton="'uploadsPublics'" :isPhone="true" :code="publicFigure" :maxUploads="20" :url="$api.FILE_UPLOAD_POST"
						 :defaultList="publicSetsPicLists" @on-complete="uploadComplete" @on-remove="uploadRemove" @showUploadImg="startRunFun"></imageUpload>
					</FormItem>
				</Row>
				<Row>
					<FormItem label="房间配置">
						<CheckboxGroup v-model="roomConfigList">
							<Row type="flex" justify="start">
								<Col span="12">
								<Checkbox v-for="(item,index) in  defaultConfigLists" :key="index" :label="item"></Checkbox>
								</Col>
							</Row>
						</CheckboxGroup>
					</FormItem>
				</Row>
				<Row>
				</Row>
			</Form>
			<!-- 3333 -->
			<Form ref="disperseSingleRoom" :model="disperseSingleRoom" :label-width="80" :rules="disperseSingleRoomRules" v-if="pageType=='disperseSingleRoom'">
				<Row>
					<Col span="8">
					<FormItem label="房间名称" prop="alias">
						<Input type="text" v-model="disperseSingleRoom.alias" :maxlength="6" clearable placeholder="房间号"></Input>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="8">
					<FormItem label="房间朝向" prop="direction">
						<Select v-model="disperseSingleRoom.direction" transfer placeholder="朝向">
							<Option v-for="(item,index) in directionList" :key="index" :value="String(item.name)">{{item.name}}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="8" offset="1">
					<FormItem label="出租状态">
						<Radio v-model="rentStatus">{{disperseSingleRoom.leaseStatusName}}</Radio>
					</FormItem>
					</Col>
				</Row>

				<Row>
					<Col span="8">
					<FormItem label="房间面积(m²)" prop="roomSpace" :label-width="100">
						<Input v-model="disperseSingleRoom.roomSpace" placeholder="房间面积" @on-change="calculatingRent()" />
					</FormItem>
					</Col>
					<Col span="8" offset="1">
					<FormItem label="平方米月租金(元)" prop="squareMeterMonthlyRent" :label-width="110">
						<Input v-model="disperseSingleRoom.squareMeterMonthlyRent" @on-change="calculatingRent()" placeholder="平方米月租金" />
					</FormItem>
					</Col>
				</Row>
				<Row type="flex" justify="start">
					<Col span="1" style="width:80px">
					<FormItem label="付款方式">

					</FormItem>
					</Col>
					<Col span="7">
					<FormItem label="付" prop="payNum" :label-width="40" class="itemWidthInline">
						<Select transfer v-model="disperseSingleRoom.payNum" clearable placeholder="付" style="width:125px">
							<Option v-for="(count,index) in 12" :value="String(count)" :key="index">{{ count }}</Option>
						</Select>
					</FormItem>
					<FormItem label="押" prop="mortgageNum" :label-width="40" class="itemWidthInline">
						<Select transfer v-model="disperseSingleRoom.mortgageNum" @on-change="depositChange()" clearable placeholder="押"
						 style="width:125px">
							<Option value="auto">自定义</Option>
							<Option v-for="(count,index)  in 12" :value="String(count)" :key="index">{{ count }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col>
					<FormItem prop="rent" label="租金(元/月)" class="itemWidthInline" :label-width="90">
						<Input type="text" clearable v-model="disperseSingleRoom.rent" placeholder="租金" @on-change="depositChange()"></Input>
					</FormItem>
					<FormItem prop="deposit" label="押金(元)" class="itemWidthInline">
						<Input type="text" v-model="disperseSingleRoom.deposit" placeholder="押金" :disabled="isDisabled"></Input>
					</FormItem>
					</Col>
				</Row>
				<Divider dashed />
				<Row v-for="(item,index) in roomCostList" :key="index" style="margin-bottom:10px" :gutter="20" type="flex" justify="start"
				 align="middle">
					<Col style="padding-left:0">
					<FormItem :label="index=='0'?'其他费用':''" style="margin-bottom:0;padding:0"></FormItem>
					</Col>
					<Col style="padding-left:0">
					<Select placeholder="请选择" transfer :label-in-value="true" v-model="item.nameFirst" @on-change="gainfeeChildrenList(item,index)"
					 style="width:104px">
						<Option v-for="(item, index) in item.firstLists" :key="index" :value="String(item.id)">{{item.name}}</Option>
					</Select>
					</Col>
					<Col>
					<Select placeholder="请选择" transfer v-model="item.name" :label-in-value="true" @on-change="bindSign(item,index)"
					 style="width:104px" :disabled="item.selectDisabled">
						<Option v-for="(item, index) in item.secondsLists" :key="index" :value="String(item.name)">{{item.name}}</Option>
					</Select>
					</Col>
					<Col>
					<Input type="text" :disabled="item.textDisabled" style="width:104px" v-model="item.cost" placeholder="费用(单位:元)"
					 @on-blur="formatFee(item.cost,index)"></Input>
					</Col>
					<Col>
					<Icon type="ios-remove-circle-outline" @click="deleteFee(index)" :size="20" :color="'#2d8cf0'" v-show="deleteFeeFlag" />
					</Col>
				</Row>
				<!-- 操作 -->
				<Row>
					<FormItem>
						<Col span="3">
						<Button @click="addFee">增加其他费用</Button>
						</Col>
					</FormItem>
				</Row>
				<!-- 收租日设置 -->
				<Row>
					<FormItem label="收租日设置">
						<RadioGroup v-model="rentType" vertical @on-change="rentTypeChange">
							<Radio label="1" style="margin-bottom:10px">
								<span>提前</span>
								<Input type="text" v-model="dayAdvance" :disabled="rentTypeDisabled!=1" class="itemWidth" @on-blur="formatDay(dayAdvance,'dayAdvance')"></Input>
								<span>天收租</span>
							</Radio>
							<Radio label="2" style="margin-bottom:10px">
								<span>固定</span>
								<Input type="text" v-model="dayStable" :disabled="rentTypeDisabled!=2" class="itemWidth" @on-blur="formatDay(dayStable,'dayStable')"></Input>
								<span>日收租 (每期的第一个月)</span>
							</Radio>
							<Radio label="3">
								<span>固定</span>
								<Input type="text" v-model="dayReStable" :disabled="rentTypeDisabled!=3" class="itemWidth" @on-blur="formatDay(dayReStable,'dayReStable')"></Input>
								<span>日收租 (每期提前一个月)</span>
							</Radio>
						</RadioGroup>
					</FormItem>
				</Row>
				<Divider dashed />
				<!-- 房间模板照片 -->
				<Row>
					<FormItem label="房间照片" :label-width="90">
						<imageUpload :uploadButton="'uploadsPublic'" :maxUploads="20" :code="publicFigure" :isPhone="true" :url="$api.FILE_UPLOAD_POST"
						 :defaultList="publicSetsPicLists" @on-complete="uploadComplete" @on-remove="uploadRemove" @showUploadImg="startRunFun"></imageUpload>
					</FormItem>
				</Row>
				<Row>
					<FormItem label="房间配置">
						<CheckboxGroup v-model="unite.roomConfigList">
							<Row type="flex" justify="start">
								<Col span="12">
								<Checkbox v-for="(item,index) in  defaultConfigLists" :key="index" :label="item"></Checkbox>
								</Col>
							</Row>
						</CheckboxGroup>
					</FormItem>
				</Row>
			</Form>
			<!-- 44444 -->
			<Form ref="editDisperseEntire" :model="editDisperseEntire" :label-width="80" :rules="editDisperseEntireRules" v-if="pageType=='editDisperseEntire'">
				<Row>
					<Col span="8">
					<FormItem label="总楼层数" prop="floorCount">
						<Select v-model="editDisperseEntire.floorCount" disabled clearable placeholder="请选择">
							<Option v-for="count in 99" :value="String(count)" :key="count">{{ count }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="8" offset="1">
					<FormItem label="出租状态">
						<Radio v-model="rentStatus">{{editDisperseEntire.leaseStatusName}}</Radio>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="8">
					<FormItem label="是否电梯房" prop="elevator" :label-width="90">
						<Select v-model="editDisperseEntire.elevator" disabled clearable placeholder="请选择">
							<Option v-for="(item,index) in isElevatorList" :value="item.value" :key="index">{{ item.name }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="8" offset="1">
					<FormItem label="所在楼层" prop="floor">
						<Select v-model="editDisperseEntire.floor" transfer clearable placeholder="请选择">
							<Option v-for="count in handleFloor(editDisperseEntire.floorCount)" :value="String(count)" :key="count">{{ count}}</Option>
						</Select>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="11">
					<Row type="flex" justify="start">
						<Col span="1" style="width:80px">
						<FormItem label="实际户型"></FormItem>
						</Col>
						<Col span="18">
						<FormItem label="房" prop="roomNum" :label-width="40" class="itemWidthInline">
							<Select transfer v-model="editDisperseEntire.roomNum" clearable placeholder="房" class="itemWidth">
								<Option v-for="(count,index) in 26" :value="String(count)" :key="index">{{count }}</Option>
							</Select>
						</FormItem>
						<FormItem label="厅" prop="parlourNum" :label-width="40" class="itemWidthInline">
							<Select v-model="editDisperseEntire.parlourNum" clearable placeholder="厅" class="itemWidth" transfer>
								<Option v-for="(count,index) in 11" :value="String(count - 1)" :key="index">{{count-1}}</Option>
							</Select>
						</FormItem>
						<FormItem label="卫" prop="toiletNum" :label-width="40" class="itemWidthInline">
							<Select v-model="editDisperseEntire.toiletNum" clearable placeholder="卫" transfer class="itemWidth">
								<Option v-for="(count,index) in 11" :value="String(count - 1)" :key="index">{{ count -1}}</Option>
							</Select>
						</FormItem>
						</Col>
					</Row>
					</Col>
				</Row>
				<Row>
					<Col span="8">
					<FormItem label="户型面积(m²)" prop="roomSpace" :label-width="100">
						<Input v-model="editDisperseEntire.roomSpace" placeholder="户型面积" @on-change="calculatingRent()" />
					</FormItem>
					</Col>
					<Col span="8" offset="1">
					<FormItem label="平方米月租金(元)" prop="squareMeterMonthlyRent" :label-width="110">
						<Input v-model="editDisperseEntire.squareMeterMonthlyRent" @on-change="calculatingRent()" placeholder="平方米月租金" />
					</FormItem>
					</Col>
				</Row>
				<Row type="flex" justify="start">
					<Col span="1" style="width:80px">
					<FormItem label="付款方式"></FormItem>
					</Col>
					<Col span="7">
					<FormItem label="付" prop="payNum" :label-width="40" class="itemWidthInline">
						<Select transfer v-model="editDisperseEntire.payNum" clearable placeholder="付" style="width:125px">
							<Option v-for="(count,index) in 12" :value="String(count)" :key="index">{{ count }}</Option>
						</Select>
					</FormItem>
					<FormItem label="押" prop="mortgageNum" :label-width="40" class="itemWidthInline">
						<Select transfer v-model="editDisperseEntire.mortgageNum" @on-change="depositChange()" clearable placeholder="押"
						 style="width:125px">
							<Option value="auto">自定义</Option>
							<Option v-for="(count,index)  in 12" :value="String(count)" :key="index">{{ count }}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col>
					<FormItem prop="rent" label="租金（元/月）" class="itemWidthInline" :label-width="100">
						<Input type="text" clearable v-model="editDisperseEntire.rent" placeholder="租金" @on-change="depositChange()"></Input>
					</FormItem>
					<FormItem prop="deposit" label="押金（元）" class="itemWidthInline" :label-width="100">
						<Input type="text" v-model="editDisperseEntire.deposit" placeholder="押金" :disabled="isDisabled"></Input>
					</FormItem>
					</Col>
				</Row>
				<Divider dashed />
				<Row>
					<Col span="1" style="width:80px">
					<FormItem label="水电煤户号"></FormItem>
					</Col>
					<Col span="18">
					<FormItem label="水" prop="waterNum" :label-width="40" class="itemWidthInline">
						<Input v-model="editDisperseEntire.waterNum" placeholder="水" style="width:75px" />
					</FormItem>
					<FormItem label="电" prop="elecNum" :label-width="40" class="itemWidthInline">
						<Input v-model="editDisperseEntire.elecNum" placeholder="电" style="width:75px" />
					</FormItem>
					<FormItem label="煤" prop="gasNum" :label-width="40" class="itemWidthInline">
						<Input v-model="editDisperseEntire.gasNum" placeholder="煤" style="width:75px" />
					</FormItem>
					</Col>
				</Row>
				<Row v-for="(item,index) in roomCostList" :key="index" style="margin-bottom:10px" :gutter="20" type="flex" justify="start"
				 align="middle">
					<Col style="padding-left:0">
					<FormItem :label="index=='0'?'其他费用':''" style="margin-bottom:0;padding:0"></FormItem>
					</Col>
					<Col style="padding-left:0">
					<Select placeholder="请选择" transfer :label-in-value="true" v-model="item.nameFirst" @on-change="gainfeeChildrenList(item,index)"
					 style="width:104px">
						<Option v-for="(item, index) in item.firstLists" :key="index" :value="String(item.id)">{{item.name}}</Option>
					</Select>
					</Col>
					<Col>
					<Select placeholder="请选择" transfer v-model="item.name" :label-in-value="true" @on-change="bindSign(item,index)"
					 style="width:104px" :disabled="item.selectDisabled">
						<Option v-for="(item, index) in item.secondsLists" :key="index" :value="String(item.name)">{{item.name}}</Option>
					</Select>
					</Col>
					<Col>
					<Input type="text" :disabled="item.textDisabled" style="width:104px" v-model="item.cost" placeholder="费用(单位:元)"
					 @on-blur="formatFee(item.cost,index)"></Input>
					</Col>
					<Col>
					<Icon type="ios-remove-circle-outline" @click="deleteFee(index)" :size="20" :color="'#2d8cf0'" v-show="deleteFeeFlag" />
					</Col>
				</Row>
				<!-- 操作 -->
				<Row>
					<FormItem>
						<Col span="3">
						<Button @click="addFee">增加其他费用</Button>
						</Col>
					</FormItem>
				</Row>
				<!-- 收租日设置 -->
				<Row>
					<FormItem label="收租日设置">
						<RadioGroup v-model="rentType" vertical @on-change="rentTypeChange">
							<Radio label="1" style="margin-bottom:10px">
								<span>提前</span>
								<Input type="text" v-model="dayAdvance" :disabled="rentTypeDisabled!=1" class="itemWidth" @on-blur="formatDay(dayAdvance,'dayAdvance')"></Input>
								<span>天收租</span>
							</Radio>
							<Radio label="2" style="margin-bottom:10px">
								<span>固定</span>
								<Input type="text" v-model="dayStable" :disabled="rentTypeDisabled!=2" class="itemWidth" @on-blur="formatDay(dayStable,'dayStable')"></Input>
								<span>日收租 (每期的第一个月)</span>
							</Radio>
							<Radio label="3">
								<span>固定</span>
								<Input type="text" v-model="dayReStable" :disabled="rentTypeDisabled!=3" class="itemWidth" @on-blur="formatDay(dayReStable,'dayReStable')"></Input>
								<span>日收租 (每期提前一个月)</span>
							</Radio>
						</RadioGroup>
					</FormItem>
				</Row>
				<Divider dashed />
				<Row>
					<Col span="24">
					<FormItem label="房间照片" :label-width="90">
						<imageUpload :uploadButton="'uploadsPublic'" :maxUploads="20" :url="$api.FILE_UPLOAD_POST" :defaultList="publicSetsPicLists"
						 @on-complete="uploadComplete" @on-remove="uploadRemove" :isPhone="true" :code="publicFigure" @showUploadImg="startRunFun"></imageUpload>
					</FormItem>
					</Col>
				</Row>
				<FormItem label="房间配置">
					<CheckboxGroup v-model="roomConfigList">
						<Row type="flex" justify="start">
							<Col span="12">
							<Checkbox v-for="(item,index) in  defaultConfigLists" :key="index" :label="item"></Checkbox>
							</Col>
						</Row>
					</CheckboxGroup>
				</FormItem>
				</Row>
			</Form>
			<Row>
				<Col offset="2">
				<Button type="primary" @click="handleSave">提交</Button>
				</Col>
			</Row>
		</div>
		<Modal v-model="editNumber" title="编辑门牌号">
			<Form ref="editRoomCode" :model="editRoomCode" v-if="editNumber" :label-width="80" :rules="editRoomCodeRules">
				<FormItem label="楼栋" prop="buildingCode">
					<Select v-model="editRoomCode.buildingCode" clearable placeholder="楼栋" transfer>
						<Option v-for="item in buildingLists" :value="item.buildingCode" :key="item.id">{{ item.buildingCode }}</Option>
					</Select>
				</FormItem>
				<FormItem label="室/房间号" prop="roomNo">
					<Input v-model="editRoomCode.roomNo" placeholder="室/房间号" />
				</FormItem>
			</Form>
			<div slot="footer">
				<Button type="primary" @click="ok('editRoomCode')">保存</Button>
				<Button type="default" @click="cancel()">取消</Button>
			</div>
		</Modal>
	</Card>
</template>

<script>
	import imageUpload from "../../../components/Helper/Form/image-upload.vue";
	export default {
		components: {
			imageUpload
		},
		props: ["pageType", "searchId"],
		data() {
			const checkHouseSpace = (rule, value, callback) => {
				if (value == "" || value == undefined) {
					callback(new Error("请填写面积"));
				} else if (!this.$com.checkNumber(value)) {
					callback(new Error("面积为整字或两位小数"));
				} else if (Number(value) > 500 || Number(value) < 5) {
					callback(new Error("面积范围5~500"));
				} else {
					callback();
				}
			};
			const checkRent = (rule, value, callback) => {
				if (value == "" || value == undefined) {
					callback(new Error("请填写租金"));
				} else {
					if (this.$com.checkNumber(value)) {
						if (Number(value) > 999999 || Number(value) < 100) {
							callback(new Error("租金输入100~999999的数字"));
						} else {
							callback();
						}
					} else {
						callback("租金输入数字");
					}
				}
			};
			const checkDeposit = (rule, value, callback) => {
				if (value == "" || value == undefined) {
					callback(new Error("请填写押金"));
				} else {
					if (this.$com.checkNumber(value)) {
						if (Number(value) < 999999 && Number(value) > 100) {
							callback();
						} else {
							callback(new Error("押金输入100~999999的数字"));
						}
					} else {
						callback("押金输入数字");
					}
				}
			};
			const checkSquareMeterMonthlyRent = (rule, value, callback) => {
				if (value == "" || value == undefined) {
					callback();
				} else {
					if (this.$com.checkNumber(value)) {
						callback();
					} else {
						callback("平方月租金输入数字");
					}
				}
			};
			return {
				provinceCommunity: "",
				showName: "",
				buildingCode: "",
				buildingId: "",
				roomNo: "",
				alias: "",
				isUpdateHouse: "",
				publicFigure: "",
				editRoommatesEntire: {
					floorCount: ""
				},
				editDisperseEntire: {
					floorCount: ""
				},
				editRoomCode: {},
				editNumber: false,
				publicSetSingle: false,
				publicSets: [],
				isDisabled: true,
				isElevatorList: [{
						name: "是",
						value: "1"
					},
					{
						name: "否",
						value: "0"
					}
				],
				editRoommatesEntireRules: {
					floorCount: [{
						required: true,
						message: "总楼层数!"
					}],
					actualType: [{
						required: true
					}],
					floor: [{
						required: true,
						message: "楼层不能为空!"
					}],
					elevator: [{
						required: true,
						message: "是否电梯房!"
					}],
					houseSpace: [{
						required: true,
						trigger: "change",
						validator: checkHouseSpace
					}],
					roomNum: [{
						required: true,
						message: "房",
						trigger: "change"
					}],
					parlourNum: [{
						required: true,
						message: "厅",
						trigger: "change"
					}],
					toiletNum: [{
						required: true,
						message: "卫",
						trigger: "change"
					}]
				},
				editDisperseEntireRules: {
					floorCount: [{
						required: true,
						message: "总楼层数!"
					}],
					floor: [{
						required: true,
						message: "楼层不能为空!"
					}],
					elevator: [{
						required: true,
						message: "是否电梯房!"
					}],
					roomSpace: [{
						required: true,
						trigger: "change",
						validator: checkHouseSpace
					}],
					rentalStatus: [{
						required: true,
						message: "出租状态",
						trigger: "blur"
					}],
					roomNum: [{
						required: true,
						message: "房",
						trigger: "change"
					}],
					parlourNum: [{
						required: true,
						message: "厅",
						trigger: "change"
					}],
					toiletNum: [{
						required: true,
						message: "卫",
						trigger: "change"
					}],
					payNum: [{
						required: true,
						message: "付",
						trigger: "change"
					}],
					mortgageNum: [{
						required: true,
						message: "押",
						trigger: "change"
					}],
					rent: [{
						required: true,
						trigger: "change",
						validator: checkRent
					}],
					deposit: [{
						required: true,
						trigger: "change",
						validator: checkDeposit
					}],
					squareMeterMonthlyRent: [{
						validator: checkSquareMeterMonthlyRent,
						trigger: "change"
					}]
				},
				editRoomCodeRules: {
					buildingCode: [{
						required: true,
						message: "栋/楼号!"
					}],
					roomNo: [{
						required: true,
						message: "室/房间号!"
					}]
				},
				publicSetsPicLists: [],
				roomTemplatePicList: [],
				feeParentsList: [{}],
				feeChildrenList: [{}],
				editSingleRoomListings: {
					roomCostList: []
				},
				editSingleRoomListingsRules: {
					roomNo: [{
						required: true,
						message: "房间号"
					}],
					floor: [{
						required: true,
						message: "所在楼层"
					}],
					roomSpace: [{
						required: true,
						trigger: "change",
						validator: checkHouseSpace
					}],
					paymentMethod: [{
						required: true
					}],
					rent: [{
						required: true,
						trigger: "change",
						validator: checkRent
					}],
					deposit: [{
						required: true,
						trigger: "change",
						validator: checkDeposit
					}],
					payNum: [{
						required: true,
						message: "付",
						trigger: "change"
					}],
					mortgageNum: [{
						required: true,
						message: "押",
						trigger: "change"
					}],
					roomNum: [{
						required: true,
						message: "房",
						trigger: "change"
					}],
					parlourNum: [{
						required: true,
						message: "厅",
						trigger: "change"
					}],
					toiletNum: [{
						required: true,
						message: "卫",
						trigger: "change"
					}],
					squareMeterMonthlyRent: [{
						validator: checkSquareMeterMonthlyRent,
						trigger: "change"
					}]
				},
				rentType: "1",
				dayAdvance: "0",
				dayStable: "1",
				dayReStable: "1",
				deleteFeeFlag: true, //其他费用是否显示按钮
				rentTypeDisabled: "", //收租日是否禁用
				disperseSingleRoom: {},
				disperseSingleRoomRules: {
					direction: [{
						required: true,
						message: "房间朝向！"
					}],
					rent: [{
						required: true,
						trigger: "change",
						validator: checkRent
					}],
					deposit: [{
						required: true,
						trigger: "change",
						validator: checkDeposit
					}],
					roomSpace: [{
						required: true,
						trigger: "change",
						validator: checkHouseSpace
					}],
					payNum: [{
						required: true,
						message: "付",
						trigger: "change"
					}],
					mortgageNum: [{
						required: true,
						message: "押",
						trigger: "change"
					}],
					squareMeterMonthlyRent: [{
						validator: checkSquareMeterMonthlyRent,
						trigger: "change"
					}]
				},
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
				unite: {
					houseSetSingle: "",
					roomConfigList: []
				},
				roomCostList: [{
					selectDisabled: true,
					textDisabled: true
				}],
				roomConfigList: [],
				rentStatus: true,
				buildingLists: [],
				usage: true,
				detail: {},
				defaultConfigLists: ['WIFI', '空调', '热水器', '洗衣机', '冰箱', '电视', '微波炉', '燃气灶', '抽油烟机', '电磁炉', '床', '书桌', '衣柜', '沙发',
					'阳台'
				]
			};
		},
		mounted() {
			this.getHomeInfo();
			this.getCode();
		},
		computed: {
			disWaterNumBig() {
				if (this.editSingleRoomListings.waterNumBig != null) {
					return true;
				} else {
					return false;
				}
			},
			disElecNumBig() {
				if (this.editSingleRoomListings.elecNumBig != null) {
					return true;
				} else {
					return false;
				}
			},
			disGasNumBig() {
				if (this.editSingleRoomListings.gasNumBig != null) {
					return true;
				} else {
					return false;
				}
			}
		},
		methods: {
			getHomeInfo() {
				let url = "";
				let buildType = this.pageType == "editSingleRoomListings" ? "1" : "0";
				let buildId = "";
				if (this.pageType != "editRoommatesEntire") {
					//根据房间id得到房间信息
					url = this.$api.GET_ROOM_DETAIL.replace("id", this.$route.params.id);
				} else {
					//根据houseId得到相关信息
					url = this.$api.GET_ROOM_DETAIL.replace("id", this.$route.params.id);
				}
				this.$ajax.get(this, url, {}, res => {
					buildId = res.data.content.communityId;
					this.editRoomCode.buildingCode = res.data.content.buildingCode;
					this.classifyData(res);
					this.getBuildLists(buildType, buildId);
				});
			},
			getBuildLists(buildType, buildId) {
				this.$ajax.get(
					this,
					this.$api.GET_COMMUNITY_LIST + "?pageSize=1000&pageNo=1&buildType=" + buildType, {},
					res => {
						let communityList = res.data.content;
						if (communityList.length > 0) {
							communityList.forEach(item => {
								if (item.id == buildId) {
									this.buildingLists = item.buildingList;
								}
							})
						}
					}
				);
			},
			classifyData(res) {
				let type = this.pageType;
				let datas = res.data.content;
				this.detail = datas;
				let datasets = {};
				//配置
				let array = [];
				let arrayHouse = [];
				this.roomNo = datas.roomNo;
				this.isUpdateHouse = datas.isUpdateHouse;
				if (datas.roomConfigList.length > 0) {
					datas.roomConfigList.forEach(element => {
						array.push(element.name);
					});
				}
				if (datas.houseConfigList.length > 0) {
					datas.houseConfigList.forEach(element => {
						arrayHouse.push(element.name);
					});
				}
				if (datas.roomPicList.length > 0) {
					datas.roomPicList.forEach((element, index) => {
						let obj = {};
						obj.picId = element.picId;
						obj.picPath = element.picPath;
						datas.roomPicList[index] = JSON.parse(JSON.stringify(obj));
					});
				}
				if (this.pageType == "editSingleRoomListings") {
					datasets = {
						roomNo: datas["roomNo"],
						leaseStatus: datas["leaseStatus"],
						floor: datas["floor"],
						floorCount: datas["floorCount"],
						roomSpace: datas["roomSpace"],
						payNum: datas["payNum"],
						mortgageNum: datas["mortgageNum"] == "0" ? "auto" : datas["mortgageNum"],
						rent: datas["rent"],
						deposit: datas["deposit"],
						rentType: datas["rentType"] ? datas["rentType"] : this.rentType,
						rentDay: datas["rentDay"],
						roomPicList: datas["roomPicList"],
						roomCostList: datas["roomCostList"],
						roomConfigList: datas["roomConfigList"],
						leaseStatusName: datas["leaseStatusName"],
						waterNum: datas["waterNum"],
						waterNumBig: datas["waterNumBig"],
						elecNum: datas["elecNum"],
						elecNumBig: datas["elecNumBig"],
						gasNum: datas["gasNum"],
						gasNumBig: datas["gasNumBig"],
						roomNum: datas["roomNum"],
						parlourNum: datas["parlourNum"],
						toiletNum: datas["toiletNum"],
						squareMeterMonthlyRent: datas["squareMeterMonthlyRent"]
					};
					this.editSingleRoomListings = datasets;
					this.roomConfigList = array;
				} else if (this.pageType == "disperseSingleRoom") {
					this.unite.roomConfigList = array;
					datasets = {
						alias: datas["alias"],
						direction: datas["direction"],
						leaseStatus: datas["leaseStatus"],
						leaseStatusName: datas["leaseStatusName"],
						roomSpace: datas["roomSpace"],
						payNum: datas["payNum"],
						mortgageNum: datas["mortgageNum"] == "0" ? "auto" : datas["mortgageNum"],
						rent: datas["rent"],
						deposit: datas["deposit"],
						rentType: datas["rentType"] ? datas["rentType"] : this.rentType,
						rentDay: datas["rentDay"],
						roomConfigList: this.unite.roomConfigList,
						roomCostList: datas["roomCostList"],
						roomPicList: datas["roomPicList"],
						squareMeterMonthlyRent: datas["squareMeterMonthlyRent"]
					};
					this.disperseSingleRoom = datasets;
				} else if (this.pageType == "editRoommatesEntire") {
					datasets = {
						floorCount: datas["floorCount"],
						roomNum: datas["roomNum"],
						parlourNum: datas["parlourNum"],
						toiletNum: datas["toiletNum"],
						elevator: datas["isElevator"] == true ? "1" : "0",
						houseSpace: datas["houseSpace"],
						floor: datas["floor"],
						housePicList: datas["housePicList"],
						houseConfigList: arrayHouse,
						waterNum: datas["waterNum"],
						elecNum: datas["elecNum"],
						gasNum: datas["gasNum"],
						squareMeterMonthlyRent: datas["squareMeterMonthlyRent"]
					};
					this.editRoommatesEntire = datasets;
					this.publicSets = arrayHouse;
				} else if (this.pageType == "editDisperseEntire") {
					datasets = {
						floorCount: datas["floorCount"],
						floor: datas["floor"],
						leaseStatus: datas["leaseStatus"],
						leaseStatusName: datas["leaseStatusName"],
						elevator: datas["isElevator"] == true ? "1" : "0",
						roomNum: datas["roomNum"],
						parlourNum: datas["parlourNum"],
						toiletNum: datas["toiletNum"],
						roomSpace: datas["roomSpace"],
						payNum: datas["payNum"],
						mortgageNum: datas["mortgageNum"] == "0" ? "auto" : datas["mortgageNum"],
						rent: datas["rent"],
						deposit: datas["deposit"],
						rentType: datas["rentType"] ? datas["rentType"] : this.rentType,
						rentDay: datas["rentDay"],
						roomConfigList: datas["roomConfigList"],
						roomCostList: datas["roomCostList"],
						roomPicList: datas["roomPicList"],
						leaseStatusName: datas["leaseStatusName"],
						waterNum: datas["waterNum"],
						elecNum: datas["elecNum"],
						gasNum: datas["gasNum"],
						squareMeterMonthlyRent: datas["squareMeterMonthlyRent"]
					};
					this.editDisperseEntire = datasets;
					this.roomConfigList = array;
				}
				let rentType = datasets.rentType;
				let renDay = datasets.rentDay;
				this.rentType = rentType;
				this.rentTypeDisabled = rentType;
				switch (rentType) {
					case "1":
						this.dayAdvance = renDay != null ? renDay : '0';
						break;
					case "2":
						this.dayStable = renDay != null ? renDay : '1';
						break;
					case "3":
						this.dayReStable = renDay != null ? renDay : '1';
						break;
					default:
						break;
				}
				this.publicSetsPicLists = datasets.roomPicList;
				if (this.pageType != "editRoommatesEntire") {
					datasets.roomCostList.forEach((element, index) => {
						delete element["createTime"];
						delete element["resourceId"];
					});
					this.roomCostList =
						datasets.roomCostList.length > 0 ?
						datasets.roomCostList :
						this.roomCostList;
					this.gainfeeChildrenList("1", 0, "sign");
				} else {
					this.publicSetsPicLists = datasets.housePicList;
				}
				this.isDisabled = datasets.mortgageNum == 'auto' ? false : true;
			},
			getCode() {
				this.$ajax.get(this, this.$api.GET_FILE_UPLOAD_CODE_GET, {}, res => {
					this.publicFigure = res.data.content.code;
				});
			},
			//上传成功
			uploadComplete(response, filename) {
				let data = response.data.content;
				this.publicSetsPicLists.push({
					picId: data.id,
					picPath: data.path,
					type: "room"
				});
			},
			//删除一张图片
			uploadRemove(item) {
				this.publicSetsPicLists.forEach((ele, index) => {
					if (ele.picPath == item.picPath) {
						this.publicSetsPicLists.splice(index, 1);
					}
				});
				this.$ajax.delete(this, this.$api.DELETE_FILE_UPLOAD_POST.replace("{code}", this.publicFigure).replace("{id}",
					item.picId), {}, res => {});
			},
			//上传成功模板照片
			uploadCompleteTemplate(response, filename) {
				let data = response.data.content;
				this.uploadComplete.push({
					picId: data.id,
					picPath: data.path,
					type: "room"
				});
			},
			//删除一张图片模板照片
			uploadRemoveTemplate(item) {
				this.uploadComplete.forEach((ele, index) => {
					if (ele.picPath == item.picPath) {
						this.roomTemplatePicList.splice(index, 1);
					}
				});
			},
			startRunFun() {
				let count = "";
				this.$ajax.get(
					this,
					this.$api.GET_FILE_UPLOAD_POST.replace("{code}", this.publicFigure), {},
					res => {
						count = res.data.content.length;
						if (count > 0) {
							let data = res.data.content;
							data.forEach(element => {
								element.picPath = element.path;
								element.picId = element.id;
							});
							if (this.publicSetsPicLists.length == 0) {
								this.publicSetsPicLists = data;
							} else {
								var str = "";
								this.publicSetsPicLists.forEach(element => {
									str += element.picId;
								});
								data.forEach(element => {
									if (str.indexOf(element.picId) == -1) {
										this.publicSetsPicLists.push(element);
									}
								});
							}
						}
					}
				);
			},
			showModal() {
				if (this.isUpdateHouse == true) {
					this.editNumber = true;
					this.editRoomCode.roomNo = this.roomNo;
				} else {
					this.$Message.error("此房源部分房间已出租或已预定，不可修改门牌号！");
				}
			},
			//确定修改门牌号
			ok(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						this.buildingCode = this.editRoomCode.buildingCode;
						this.buildingLists.forEach(ele => {
							if (ele.buildingCode == this.buildingCode) {
								this.buildingId = ele.id;
							}
						})
						this.roomNo = this.editRoomCode.roomNo;
						this.editNumber = false;
					} else {
						this.$Message.fail("fail");
					}
				});
			},
			//取消修改
			cancel() {
				this.editNumber = false;
			},
			//押金自动计算
			depositChange(query) {
				let mortgageNumIsAuto = this[this.pageType].mortgageNum;
				let rent = this[this.pageType].rent;
				if (mortgageNumIsAuto == "auto") {
					this.isDisabled = false;
				} else {
					this.isDisabled = true;
					if (
						!this.$com.isBlank(rent) &&
						!this.$com.isBlank(mortgageNumIsAuto) &&
						mortgageNumIsAuto != "auto" &&
						this.$com.checkNumber(rent)
					) {
						this[this.pageType].deposit = String(
							(Number(mortgageNumIsAuto) * Number(rent)).toFixed("2")
						);
					} else {
						this[this.pageType].deposit = "";
					}
				}
			},
			//租金计算
			calculatingRent() {
				let roomSpace = this[this.pageType].roomSpace;
				let unitPrice = this[this.pageType].squareMeterMonthlyRent;
				if (!this.$com.isBlank(roomSpace) && !this.$com.isBlank(unitPrice) && this.$com.checkNumber(unitPrice) && this.$com
					.checkNumber(roomSpace)) {
					this[this.pageType].rent = String(
						(Number(roomSpace) * Number(unitPrice)).toFixed("2")
					);
					if (this[this.pageType].mortgageNum != 'auto') {
						this.depositChange();
					}
				} else {
					this[this.pageType].rent = "";
				}
			},
			//收租日发生变化
			rentTypeChange(value) {
				this.rentTypeDisabled = value;
				if (value == 1) {
					this.dayStable = "1";
					this.dayReStable = "1";
				} else if (value == 2) {
					this.dayAdvance = "0";
					this.dayReStable = "1";
				} else {
					this.dayAdvance = "0";
					this.dayStable = "1";
				}
			},
			//增加费用列表
			addFee() {
				let flag = true;
				this.roomCostList.forEach(item => {
					if (
						item.parName == undefined ||
						item.name == undefined ||
						item.cost == undefined
					) {
						flag = false;
					}
				});
				if (!flag) {
					this.$Message.error("请先将上一条其他费用补充完整");
				} else {
					let obj = {
						selectDisabled: true,
						textDisabled: true,
						firstLists: this.feeParentsList
					};
					this.roomCostList.push(obj);
				}
				if (this.roomCostList.length > 1) {
					this.deleteFeeFlag = true;
				}
			},
			//费用以及目录
			gainfeeChildrenList(query, index, sign) {
				let ids = "";
				if (query != "1") {
					if (!sign) {
						ids = query.nameFirst;
						if (query.firstLists && query.firstLists.length > 0) {
							query.firstLists.forEach(item => {
								if (item.id == ids) {
									this.roomCostList[index].parName = item.name;
								}
							});
						}
					} else {
						if (query.nameFirst) {
							ids = query.nameFirst;
						} else {
							return;
						}
					}
				} else {
					ids = query.constructor != String ? query.id : query;
				}
				if (!sign) {
					if (index != undefined) {
						this.roomCostList[index].selectDisabled = false;
					}
				}
				this.$ajax.get(
					this,
					this.$api.GET_FEE_LISTS.replace("{ids}", ids), {},
					res => {
						if (query == 1) {
							this.feeParentsList = res.data.content;
							this.roomCostList.forEach((element, index) => {
								this.$forceUpdate();
								if (res.data.content.length > 0) {
									res.data.content.forEach(items => {
										if (items.name == element.parName) {
											element.nameFirst = items.id;
										}
									});
								}
								element.firstLists = res.data.content;
								this.gainfeeChildrenList(element, index, "sign");
							});
						} else {
							this.$forceUpdate();
							// 							let names=[];	
							// 							let parNames=[];
							// 							this.roomCostList.forEach(ele=>{
							// 								names.push(ele.name);
							// 								parNames.push(ele.parName);
							// 							})
							let data = res.data.content;
							// 							data.forEach((ele,index)=>{
							// 								if(names.indexOf(ele.name)!=-1&&parNames.indexOf(ele.name)!=-1){
							// 									data.splice(index,1);
							// 								}
							// 							})
							this.roomCostList[index].secondsLists = data;
						}
					}
				);
			},
			//费用绑定标志
			bindSign(value, index) {
				let sign = "";
				let id = "";
				if (
					this.roomCostList[index].secondsLists &&
					this.roomCostList[index].secondsLists.length > 0
				) {
					this.roomCostList[index].secondsLists.forEach(item => {
						if (item.name == value.name) {
							sign = item.sign;
							id = item.id;
						}
					});
				}
				this.roomCostList[index].sign = sign;
				this.roomCostList[index].costNo = id;
				this.roomCostList[index].textDisabled = false;
			},
			formatFee(query, index) {
				if (/^[1-9]\d*(\.\d+)?$/.test(query.replace(/(^\s*)|(\s*$)/g, ""))) {
					if (!Number.isInteger(query)) {
						this.roomCostList[index].cost = Number(query).toFixed(2);
					} else {
						this.roomCostList[index].cost = query + "00";
					}
				} else {
					this.roomCostList[index].cost = "";
				}
			},
			//删除费用列表
			deleteFee(index) {
				this.$forceUpdate();
				if (this.roomCostList.length > 1) {
					this.roomCostList.splice(index, 1);
				} else {
					delete this.roomCostList[0].parName;
					delete this.roomCostList[0].nameFirst;
					delete this.roomCostList[0].name;
					delete this.roomCostList[0].cost;
					delete this.roomCostList[0].sign;
					delete this.roomCostList[0].costNo;
					delete this.roomCostList[0].id;
					this.roomCostList[0].selectDisabled = true;
					this.roomCostList[0].textDisabled = true;
					this.deleteFeeFlag = false;
				}
			},
			//提交保存
			handleSave() {
				let url = "";
				let formName = "";
				let data = "";
				if (this.pageType == "editSingleRoomListings") {
					formName = "editSingleRoomListings";
					url = this.$api.PUT_EDIT_SINGLEROOM_LIST.replace(
						"{id}",
						this.$route.params.id
					);
					data = this.editSingleRoomListings;
				} else if (this.pageType == "disperseSingleRoom") {
					formName = "disperseSingleRoom";
					url = this.$api.PUT_EDIT_DISPERSESINGLE_ROOM.replace(
						"{id}",
						this.$route.params.id
					);
					data = this.disperseSingleRoom;
				} else if (this.pageType == "editRoommatesEntire") {
					formName = "editRoommatesEntire";
					url = this.$api.PUT_EDIT_ROOMMATESENTIRE.replace(
						"{id}",
						this.$route.params.houseId
					);
					data = this.editRoommatesEntire;
				} else if (this.pageType == "editDisperseEntire") {
					formName = "editDisperseEntire";
					url = this.$api.PUT_EDIT_DISPERSEENTIRE.replace(
						"{id}",
						this.$route.params.id
					);
					data = this.editDisperseEntire;
				}
				let costflag = this.roomCostList.length > 0 && this.roomCostList[0].name != undefined ? true : false;
				if (this.pageType == "disperseSingleRoom") {
					//编辑单间
					data.roomConfigList = JSON.parse(JSON.stringify(this.unite.roomConfigList));
					data.roomConfigList.forEach((ele, index) => {
						if (data.roomConfigList[index].constructor == String) {
							data.roomConfigList[index] = {
								name: ele
							};
						}
					});
					data.roomCostList = costflag == true ? JSON.parse(JSON.stringify(this.roomCostList)) : [];
					if (data.roomCostList.length > 0) {
						data.roomCostList.forEach(ele => {
							delete ele.firstLists;
							delete ele.secondsLists;
							delete ele.selectDisabled;
							delete ele.textDisabled;
						});
					}
					data.roomPicList = JSON.parse(JSON.stringify(this.publicSetsPicLists));
					data.roomPicList.forEach((ele, index) => {
						data.roomPicList[index] = {
							picPath: ele.picPath,
							picId: ele.picId
						}
					});
					let day = "";
					if (this.dayStable != "") {
						day = this.dayStable;
					}
					if (this.dayReStable != "") {
						day = this.dayReStable;
					}
					if (this.dayAdvance != "") {
						day = this.dayAdvance;
					}
					data.rentDay = day ? day : "";
					data.rentType = this.rentType;
				} else if (this.pageType == "editDisperseEntire") {
					data.roomConfigList = JSON.parse(JSON.stringify(this.roomConfigList));
					if (data.roomConfigList.length > 0) {
						data.roomConfigList.forEach((ele, index) => {
							if (data.roomConfigList[index].constructor == String) {
								data.roomConfigList[index] = {
									name: ele
								};
							}
						});
					}
					data.roomPicList = JSON.parse(JSON.stringify(this.publicSetsPicLists));
					data.roomPicList.forEach((ele, index) => {
						data.roomPicList[index] = {
							picPath: ele.picPath,
							picId: ele.picId
						}
					});
					data.roomCostList = costflag == true ? JSON.parse(JSON.stringify(this.roomCostList)) : [];
					if (data.roomCostList.length > 0) {
						data.roomCostList.forEach(ele => {
							delete ele.firstLists;
							delete ele.secondsLists;
							delete ele.selectDisabled;
							delete ele.textDisabled;
						});
					}
					let day = "";
					if (this.dayStable != "") {
						day = this.dayStable;
					}
					if (this.dayReStable != "") {
						day = this.dayReStable;
					}
					if (this.dayAdvance != "") {
						day = this.dayAdvance;
					}
					data.rentDay = day ? day : "";
					data.rentType = this.rentType;
				} else if (this.pageType == "editSingleRoomListings") {
					let day = "";
					if (this.dayStable != "") {
						day = this.dayStable;
					}
					if (this.dayReStable != "") {
						day = this.dayReStable;
					}
					if (this.dayAdvance != "") {
						day = this.dayAdvance;
					}
					data.rentDay = day ? day : "";
					data.rentType = this.rentType;
					data.roomConfigList = JSON.parse(JSON.stringify(this.roomConfigList));
					if (data.roomConfigList.length > 0) {
						data.roomConfigList.forEach((ele, index) => {
							if (data.roomConfigList[index].constructor == String) {
								data.roomConfigList[index] = {
									name: ele
								};
							}
						});
					}
					data.roomPicList = JSON.parse(JSON.stringify(this.publicSetsPicLists));
					data.roomPicList.forEach((ele, index) => {
						data.roomPicList[index] = {
							picPath: ele.picPath,
							picId: ele.picId
						}
					});
					data.roomCostList = costflag == true ? JSON.parse(JSON.stringify(this.roomCostList)) : [];
					if (data.roomCostList.length > 0) {
						data.roomCostList.forEach(ele => {
							delete ele.firstLists;
							delete ele.secondsLists;
							delete ele.selectDisabled;
							delete ele.textDisabled;
						});
					}
				} else {
					//图片
					data.housePicList = JSON.parse(JSON.stringify(this.publicSetsPicLists));
					data.housePicList.forEach((ele, index) => {
						data.housePicList[index] = {
							picPath: ele.picPath,
							picId: ele.picId
						}
					});
					//公共配置
					data.houseConfigList = JSON.parse(JSON.stringify(this.publicSets));
					data.houseConfigList.forEach((ele, index) => {
						if (data.houseConfigList[index].constructor == String) {
							data.houseConfigList[index] = {
								name: ele
							};
						}
					});
				}
				let transData = {};
				if (
					this.pageType == "editSingleRoomListings"
				) {
					transData.floor = data.floor;
					transData.roomNo = data.roomNo;
					transData.elevator = data.elevator == "1" ? true : false;
					transData.roomNum = data.roomNum;
					transData.parlourNum = data.parlourNum;
					transData.toiletNum = data.toiletNum;
					let dataObj = JSON.parse(JSON.stringify(data));
					dataObj.mortgageNum = dataObj.mortgageNum == 'auto' ? "0" : dataObj.mortgageNum;
					delete dataObj.elevator;
					transData.roomList = [dataObj];
					transData.waterNum = data.waterNum;
					transData.elecNum = data.elecNum;
					transData.gasNum = data.gasNum;
					transData.squareMeterMonthlyRent = dataObj.squareMeterMonthlyRent;
				}
				if (this.pageType == "editDisperseEntire") {
					transData.floor = data.floor;
					transData.elevator = data.elevator == "1" ? true : false;
					let dataObj = JSON.parse(JSON.stringify(data));
					dataObj.mortgageNum = dataObj.mortgageNum == 'auto' ? "0" : dataObj.mortgageNum;
					delete dataObj.elevator;
					transData.roomList = [dataObj];
					transData.floorCount = data.floorCount;
					transData.roomNum = data.roomNum;
					transData.parlourNum = data.parlourNum;
					transData.toiletNum = data.toiletNum;
					transData.buildingCode = this.buildingCode;
					if (this.buildingId != "") {
						transData.buildingId = this.buildingId;
					}
					transData.roomNo = this.roomNo;
					transData.waterNum = data.waterNum;
					transData.elecNum = data.elecNum;
					transData.gasNum = data.gasNum;
					transData.squareMeterMonthlyRent = dataObj.squareMeterMonthlyRent;
				}
				if (
					this.pageType == "disperseSingleRoom"
				) {
					transData = JSON.parse(JSON.stringify(data));
					if (transData.mortgageNum != undefined && transData.mortgageNum != null) {
						transData.mortgageNum = transData.mortgageNum == 'auto' ? "0" : transData.mortgageNum;
					}
					transData.elevator = transData.elevator == "1" ? true : false;
					transData.roomNo = this.roomNo;
				}
				if (this.pageType == "editRoommatesEntire") {
					transData = JSON.parse(JSON.stringify(data));
					transData.elevator = transData.elevator == "1" ? true : false;
					transData.buildingCode = this.buildingCode;
					if (this.buildingId != "") {
						transData.buildingId = this.buildingId;
					}
					if (transData.mortgageNum != null && transData.mortgageNum != undefined) {
						transData.mortgageNum = transData.mortgageNum == 'auto' ? "0" : transData.mortgageNum;
					}
					transData.roomNo = this.roomNo;
				}
				this.$refs[formName].validate(valid => {
					if (valid) {
						this.$ajax.put(this, url, transData, res => {
							if (res.code == "200") {
								this.$Message.success("修改成功！");
								this.handleMassDelPics();
								this.$router.go(-1);
							} else {
								this.$Message.error(res.msg);
							}
						});
					} else {
						this.$Message.error("填写必填项");
					}
				});
			},
			handleMassDelPics() {
				this.$ajax.delete(this, this.$api.DELETE_FILE_UPLOAD_BY_CODE + "?codes=" + this.publicFigure, null, res => {});
			},
			formatDay(query, value) {
				if (/^[0-9]*[1-9][0-9]*$/.test(query.replace(/(^\s*)|(\s*$)/g, ""))) {
					if (value == "dayAdvance") {
						if (Number(this[value]) > 99) {
							this.$Message.error('日期小于99');
							this[value] = "";
						}
					} else if (value == "dayStable") {
						if (Number(this[value]) > 31) {
							this.$Message.error('日期小于31');
							this[value] = "";
						}
					} else {
						if (Number(this[value]) > 31) {
							this.$Message.error('日期小于31');
							this[value] = "";
						}
					}
				} else {
					if (value == "dayAdvance") {
						this[value] = "0";
					} else if (value == "dayStable") {
						this[value] = "1";
					} else {
						this[value] = "1";
					}

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
			}
		},
		watch: {
			publicSetSingle() {
				if (this.publicSetSingle) {
					this.publicSets = [
						"WIFI",
						"热水器",
						"洗衣机",
						"冰箱",
						"微波炉",
						"燃气灶",
						"抽油烟机",
						"沙发"
					];
				}
			},
			publicSets() {
				let str = "WIFI,热水器,洗衣机,冰箱,微波炉,燃气灶,抽油烟机,沙发";
				let str2 = this.publicSets.join(",");
				if (str != str2) {
					this.publicSetSingle = false;
				} else {
					this.publicSetSingle = true;
				}
			},
			// 			"unite.houseSetSingle"() {
			// 				if (this.unite.houseSetSingle == "1") {
			// 					this.unite.roomConfigList = [
			// 						"空调",
			// 						"床",
			// 						"书桌",
			// 						"衣柜",
			// 						"阳台",
			// 						"独卫"
			// 					];
			// 				} else if (this.unite.houseSetSingle == "2") {
			// 					this.unite.roomConfigList = ["空调", "床", "书桌", "衣柜"];
			// 				}
			// 			},
			// 			"unite.roomConfigList"() {
			// 				let str = "空调,床,书桌,衣柜,阳台,独卫";
			// 				let str3 = "空调,床,书桌,衣柜";
			// 				let str2 = this.unite.roomConfigList.join(",");
			// 				if (str == str2) {
			// 					this.unite.houseSetSingle = "1";
			// 				} else if (str3 == str2) {
			// 					this.unite.houseSetSingle = "2";
			// 				} else {
			// 					this.unite.houseSetSingle = "";
			// 				}
			// 			}
		}
	};
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

	.itemWidth {
		width: 74px;
	}

	.itemWidthActualType {
		width: 64px;
	}

	.itemWidthInline {
		display: inline-block;
	}
</style>
