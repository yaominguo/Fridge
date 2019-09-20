<template>
	<div>
		<!-- 取得方式 -->
		<p class="title-color">1、取得方式（若更新勾选项，请保存）<Button type="primary" class="leftM20" @click="add('新增取得方式','请输入取得方式名称','getWayList')" icon="md-add" ghost>添加</Button></p>
       	<Row >
	        <template v-for="(item,getWayListIndex) in getWayList">
        		<Checkbox :disabled="item.type=='1'" :key="getWayListIndex" class="ml20" true-value='1' false-value='0' large v-model="item.status">
        	    {{item.name}}
        		</Checkbox>
        		<Icon class="cursorP" v-if="item.id === undefined" :key="getWayListIndex+'icon'" @click="deleteRow(item,'getWayList','ASSET_METHOD','queryGetWay',getWayListIndex)" color="#507bea" size="24" type="ios-trash-outline" />
	        </template>
       	</Row>
       <Row class="row-center">
           <Button type="primary" @click="save('getWayList','GET_WAY_SAVE','queryGetWay')">保存</Button>
       </Row>

       <!-- 资产类型
       <p class="title-color">2、资产类型（若更新勾选项，请保存）<Button type="primary" class="leftM20" @click="addType" icon="md-add" ghost>添加子类型</Button></p>
	    <Row  class="height-row">
	        <div class="item">
	            <label class="item-label">公租房</label>
	            <Row class="item-content">
	                <Col span="4" class="bottomM20" v-for="(item,index) in typeList" v-if="item.type == '0'" :key="index">
	                    <Checkbox true-value='1' false-value='0' large v-model="item.status">
	                        {{item.name}}
	                    </Checkbox>
	                    <Icon class="cursorP" v-if="item.id === undefined" @click="deleteRow(item,'typeList','ASSET_CLASS','queryTypeList',index)" color="#507bea" size="24" type="ios-trash-outline" />
	                </Col>
	            </Row>
	        </div>
	    </Row>
		<Row  class="height-row">
	        <div class="item">
	            <label class="item-label">非居</label>
	            <Row class="item-content">
	                <Col span="4" class="bottomM20" v-for="(item,index) in typeList" v-if="item.type == '1'" :key="index">
	                    <Checkbox true-value='1' false-value='0' large v-model="item.status">
	                        {{item.name}}
	                    </Checkbox>
	                    <Icon class="cursorP" v-if="item.id === undefined" @click="deleteRow(item,'typeList','ASSET_CLASS','queryTypeList',index)" color="#507bea" size="24" type="ios-trash-outline" />
	                </Col>
	            </Row>
	        </div>
	    </Row>
		<Row  class="height-row">
	        <div class="item">
	            <label class="item-label">住宅</label>
	            <Row class="item-content">
	                <Col span="4" class="bottomM20" v-for="(item,index) in typeList" v-if="item.type == '2'" :key="index">
	                    <Checkbox true-value='1' false-value='0' large v-model="item.status">
	                        {{item.name}}
	                    </Checkbox>
	                    <Icon class="cursorP" v-if="item.id === undefined" @click="deleteRow(item,'typeList','ASSET_CLASS','queryTypeList',index)" color="#507bea" size="24" type="ios-trash-outline" />
	                </Col>
	            </Row>
	        </div>
	    </Row>
	    <Row class="row-center">
	        <Button type="primary" @click="save('typeList','GET_TYPE_BATCH','queryTypeList')">保存</Button>
	    </Row> -->

	    <!-- 房屋 -->
	    <p class="title-color">2、房屋（若更新勾选项，请保存）</p>
       	<Row class="mb20" >
       		<p>房型管理 <Button type="primary" class="leftM20" @click="addHouseType" icon="md-add" ghost>添加</Button></p>
       		<br>
	        <template v-for="(item,houseStyleListIndex) in houseStyleList"  >
        		<Checkbox :key="houseStyleListIndex" class="ml20" true-value='1' false-value='0' large v-model="item.status">
        	    <!-- <span v-if="item.id != ''">{{item.name}}</span> -->
				<span class="min-span">
					<span v-if="item.room != '' && item.room != null">{{item.room}}室</span>
					<span v-if="item.parlour != '' && item.parlour != null">{{item.parlour}}厅</span>
					<span v-if="item.toilet != '' && item.toilet != null">{{item.toilet}}卫</span>
				</span>
        		</Checkbox>
        		<Icon v-if="item.id === undefined || item.id == ''" :key="houseStyleListIndex+'icon'" class="cursorP"  @click="deleteRow(item,'houseStyleList','ASSET_STYLE','queryHouseStyleList',houseStyleListIndex)" color="#507bea" size="24" type="ios-trash-outline" />
	        </template>
       	</Row>
       	<Row >
       		<p>房屋结构 <Button type="primary" class="leftM20" @click="add('新增房屋结构','请输入房屋结构名称','houseStructureList','queryHouseStructureList')"  icon="md-add" ghost>添加</Button></p>
       		<br>
	        <template v-for="(item,houseStructureListIndex) in houseStructureList"  >
        		<Checkbox :key="houseStructureListIndex" class="ml20" true-value='1' false-value='0' large v-model="item.status">
        	    {{item.name}}
        		</Checkbox>
        		<Icon v-if="item.id === undefined" :key="houseStructureListIndex+'icon'" class="cursorP"  @click="deleteRow(item,'houseStructureList','ASSET_STRUCTION','queryHouseStructureList',houseStructureListIndex)" color="#507bea" size="24" type="ios-trash-outline" />
	        </template>
       	</Row>
       <Row class="row-center">
           <Button type="primary" @click="saveHouse">保存</Button>
       </Row>

       <!-- 资产用途 -->
       <!-- <p class="title-color">3、资产用途 -->
		   <!-- <Button type="primary" class="leftM20" @click="add('新增资产用途','请输入用途名称','useList','queryUseList')" icon="md-add" ghost>添加</Button> -->
		<!-- </p> -->
       	<!-- <Row class="mb20"> -->
	        <!-- <template v-for="(item,index) in useList"> -->
        		<!-- <Checkbox :key="index" class="ml20" true-value='1' false-value='0' large v-model="item.status"> -->
					<!-- <span class="ml20" :key="index">{{item.name}}</span> -->

        		<!-- </Checkbox> -->
        		<!-- <Icon :key="index+'icon'" class="cursorP" v-if="item.id === undefined"  @click="deleteRow(item,'useList','ASSET_USE','queryUseList',index)" color="#507bea" size="24" type="ios-trash-outline" /> -->
	        <!-- </template> -->
       	<!-- </Row> -->
       <!-- <Row class="row-center">
           <Button type="primary" @click="save('useList','ASSET_USE_BATCH','queryUseList')">保存</Button>
       </Row> -->

		<!-- 新增 -->
		<Modal :mask-closable="false" v-model="addShow" :title="addMessage.title" @on-cancel="close">
			<Form ref="addData" :model="addData" :rules="addRule" :label-width="80">
				<FormItem label="名称" prop="name" class="ivu-form-item-required">
					<Input v-model="addData.name" :placeholder="addMessage.placeholder"></Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button type="primary" ghost @click="close">取消</Button>
				<Button @click="okAdd" type="primary">保存</Button>
			</div>
		</Modal>
		<!-- 新增房型 -->
		<Modal :mask-closable="false" width="500" v-model="houseTypeShow" title="新增房型" @on-cancel="closeHouseType">
			<Form ref="houseTypeData" :model="houseTypeData"  :label-width="0" inline :rules="houseTypeRule">

				<Row>
					<Col span="8">
						<FormItem prop="room" class="row-line-height">
							<Row>
								<Col span="18">
									<Input placeholder="请输入室" v-model="houseTypeData.room"></Input>
								</Col>
								<Col span="6">
									室
								</Col>
							</Row>
						</FormItem>
					</Col>
					<Col span="8">
						<FormItem prop="parlour" class="row-line-height">
							<Row>
								<Col span="18">
									<Input placeholder="请输入厅" v-model="houseTypeData.parlour"></Input>
								</Col>
								<Col span="6">
									厅
								</Col>
							</Row>
						</FormItem>
					</Col>
					<Col span="8">
						<FormItem prop="toilet" class="row-line-height">
							<Row>
								<Col span="18">
									<Input placeholder="请输入卫" v-model="houseTypeData.toilet"></Input>
								</Col>
								<Col span="6">
									卫
								</Col>
							</Row>
						</FormItem>
					</Col>
				</Row>


			</Form>
			<div slot="footer">
				<Button type="primary" ghost @click="closeHouseType">取消</Button>
				<Button @click="okAddHouseType" type="primary">保存</Button>
			</div>
		</Modal>
		<!-- 新增资产类型 -->
		<Modal :mask-closable="false" v-model="addTypeShow" title="新增资产类型" @on-cancel="closeType">
			<Form ref="addTypeData" :model="addTypeData" :rules="addTypeRule" :label-width="80">
				<FormItem label="父类型" prop="type" class="ivu-form-item-required">
					<Select v-model="addTypeData.type" placeholder="请选择父类型">
						<Option value="0">公租房</Option>
						<Option value="1">非居</Option>
						<Option value="2">住宅</Option>
					</Select>
				</FormItem>
				<FormItem label="名称" prop="name" class="ivu-form-item-required">
					<Input v-model="addTypeData.name" placeholder="请输入资产类型"></Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button type="primary" ghost @click="closeType">取消</Button>
				<Button @click="okAddType" type="primary">保存</Button>
			</div>
		</Modal>
	</div>

</template>
<script>
	export default{
		data(){
			const validateName=(rule,value,callback)=>{
				if(value == ''){
					callback(new Error(this.addMessage.placeholder))
				}else{
					let flag=false;
					this[this.addMessage.key].forEach((e)=>{
						if(e.name == value){
							flag=true;
						}
					})
					if(!flag){
						callback();
					}else{
						callback(new Error("名称已存在"))
					}
				}
			}
			const validateTypeName=(rule,value,callback)=>{
				if(this.addTypeData.name){
					let flag=false;
					this.typeList.forEach((e)=>{
						if(e.name == this.addTypeData.name){
							flag=true;
						}
					})
					if(!flag){
						callback();
					}else{
						callback(new Error("名称已存在"))
					}
				}else{
					callback();
				}
			}
			const validateroom=(rule,value,callback)=>{
				if(this.houseTypeData.room==''){
					callback(new Error("请输入室"))
				}else{
					if(isNaN(this.houseTypeData.room)){
						callback(new Error('请输入数字'))
					}else{
						if(Number(this.houseTypeData.room)<0){
							callback(new Error('不能为负数'))
						}else{
							let flag=false;
							this.houseStyleList.forEach((e)=>{
								if((e.room == this.houseTypeData.room) && (e.parlour == this.houseTypeData.parlour) && (e.toilet == this.houseTypeData.toilet)){
									flag=true;
								}
							})
							if(flag === true){
								callback(new Error('存在相同房型！'))
							}else{
								callback();
							}
						}
					}
				}
			}
			const validateparlour=(rule,value,callback)=>{
				if(this.houseTypeData.parlour==''){
					callback(new Error("请输入厅"))
				}else{
					if(isNaN(this.houseTypeData.parlour)){
						callback(new Error('请输入数字'))
					}else{
						if(Number(this.houseTypeData.parlour)<0){
							callback(new Error('不能为负数'))
						}else{
							let flag=false;
							this.houseStyleList.forEach((e)=>{
								if((e.room == this.houseTypeData.room) && (e.parlour == this.houseTypeData.parlour) && (e.toilet == this.houseTypeData.toilet)){
									flag=true;
								}
							})
							if(flag === true){
								callback(new Error('存在相同房型！'))
							}else{
								callback();
							}
						}
					}
				}
			}
			const validatetoilet=(rule,value,callback)=>{
				if(this.houseTypeData.toilet==''){
					callback(new Error("请输入卫"))
				}else{
					if(isNaN(this.houseTypeData.toilet)){
						callback(new Error('请输入数字'))
					}else{
						if(Number(this.houseTypeData.toilet)<0){
							callback(new Error('不能为负数'))
						}else{
							let flag=false;
							this.houseStyleList.forEach((e)=>{
								if((e.room == this.houseTypeData.room) && (e.parlour == this.houseTypeData.parlour) && (e.toilet == this.houseTypeData.toilet)){
									flag=true;
								}
							})
							if(flag === true){
								callback(new Error('存在相同房型！'))
							}else{
								callback();
							}
						}
					}
				}
			}
			return {
				getWayList:[],
				houseStyleList:[],//房型
				houseStructureList:[],//结构
				useList:[{name:'自用'},{name:'出租'},{name:'出售'}],//用途
				typeList:[],//资产类型
				addShow:false,
				addMessage:{
					title:'',
					placeholder:''
				},
				addData:{
					name:''
				},
				addRule:{
					name:[
						{ validator: validateName, trigger: 'blur' }
					]
				},
				// 资产类型
				addTypeShow:false,
				addTypeData:{},
				addTypeRule:{
					name:[
						{ required: true, message: '请输入资产类型名称', trigger: 'blur' },
						{ validator: validateTypeName, trigger: 'blur' }
					],
					type:[
						{ required: true, message: '请选择父类型', trigger: 'change' },
						// { validator: validateTypeName, trigger: 'change' }
					]
				},
				assetTypes:[],
				houseTypeData:{
					room:'',
					parlour:'',
					toilet:'',
				},
				houseTypeShow:false,
				houseTypeRule:{
					room:[{ validator: validateroom, trigger: 'blur' }],
					parlour:[{
						validator: validateparlour, trigger: 'blur'
					}],
					toilet:[{
						validator: validatetoilet, trigger: 'blur'
					}]
				}
			}
		},
		methods:{
			// 添加房屋结构
			addHouseType(){
				this.houseTypeShow=true;
			},
			closeHouseType(){
				this.houseTypeData.room='';
				this.houseTypeData.parlour='';
				this.houseTypeData.toilet='';
				this.$refs['houseTypeData'].resetFields();
				this.houseTypeShow=false;
			},
			okAddHouseType(){
				this.$refs['houseTypeData'].validate((valid)=>{
					if(!valid) return;
					if(this.houseStyleList==''){
						this.houseStyleList=[];
					}
					this.houseStyleList.push({
						id:'',
						room:this.houseTypeData.room,
						parlour:this.houseTypeData.parlour,
						toilet:this.houseTypeData.toilet,
						status:'0',
						type:'0',
						deletable:'1'
					})
					this.closeHouseType();
				})
			},
			add(title,placeholder,key){
				this.addMessage.title=title;
				this.addMessage.placeholder=placeholder;
				this.addMessage.key=key;
				this.addShow=true;
			},
			close(){
				this.addShow=false;
				this.$refs['addData'].resetFields();
				this.addMessage={};
				this.addData.name='';
			},
			okAdd(){
				this.$refs['addData'].validate((valid)=>{
					if(!valid) return;
					if(this[this.addMessage.key]==null){
						this[this.addMessage.key]=[];
					}
					this[this.addMessage.key].push({
						name:this.addData.name,
						status:'0',
						type:'0',
						deletable:'1'
					})
					this.close();
				})
			},
			// 删除配置
			deleteRow(item,list,url,method,index){
				if (item.id) {
					this.$Modal.confirm({
					title: '提示',
					content: '<p>确定删除此数据吗？</p>',
					onOk: () => {
						this.$ajax.delete(
						this,
						this.$api[url] + item.id,
						{},
						(res) => {
							this.$Message.success('删除成功');
							this[method]();
						}
						)
					},
					});
				} else {
					this[list].splice(index, 1);
				}
			},
			// 公用保存
			save(list,url,method){
				let params=JSON.parse(JSON.stringify(this[list]));
				params.forEach((e)=>{
					delete e.createTime
				})
				this.$ajax.post(
					this,
					this.$api[url],
					params,
					(res)=>{
						this.$Message.success('保存成功');
						this[method]();
					}
				)
			},
			// 房屋保存
			saveHouse(){
				let params={};
				params.houseSructures=JSON.parse(JSON.stringify(this.houseStructureList));
				params.houseTypes=JSON.parse(JSON.stringify(this.houseStyleList));
				params.houseSructures.forEach((e)=>{delete e.createTime});
				params.houseTypes.forEach((e)=>{delete e.createTime})
				this.$ajax.post(
					this,
					this.$api.HOUSTE_STYLE_BATCH,
					params,
					(res)=>{
						this.$Message.success('保存成功');
						this.queryHouseStyleList();
						this.queryHouseStructureList();
					}
				)
			},
			// 资产类型
			addType(){
				this.addTypeShow=true;
			},
			closeType(){
				this.addTypeShow=false;
				this.$refs['addTypeData'].resetFields();
				delete this.addTypeData.name;
				delete this.addTypeData.type;
			},
			// 资产类型
			okAddType(){
				this.$refs['addTypeData'].validate((valid)=>{
					if(!valid) return;
					this.typeList.push({
						name:this.addTypeData.name,
						type:this.addTypeData.type,
						status:'0',
						deletable:'1'
					})
					this.closeType();
				})
			},
			// 查询取得方式
			queryGetWay(){
				this.$ajax.get(
					this,
					this.$api.ASSET_METHOD,
					{}
					,(res=>{
						this.getWayList=res.data.content;
					})
				)
			},
			// 查询房型列表
			queryHouseStyleList(){
				this.$ajax.get(
					this,
					this.$api.ASSET_STYLE,
					{}
					,(res=>{
						this.houseStyleList=res.data.content;
					})
				)
			},
			// 查询房屋结构
			queryHouseStructureList(){
				this.$ajax.get(
					this,
					this.$api.ASSET_STRUCTION,
					{}
					,(res=>{
						this.houseStructureList=res.data.content;
					})
				)
			},
			// 查询资产用途
			// queryUseList(){
			// 	this.$ajax.get(
			// 		this,
			// 		this.$api.ASSET_USE,
			// 		{}
			// 		,(res=>{
			// 			this.useList=res.data.content;
			// 		})
			// 	)
			// },
			// // 资产类型
			// queryTypeList(){
			// 	this.$ajax.get(
			// 		this,
			// 		this.$api.ASSET_CLASS,
			// 		{}
			// 		,(res=>{
			// 			this.typeList=res.data.content;
			// 		})
			// 	)
			// }
		},
		mounted(){
			this.queryGetWay();
			this.queryHouseStyleList();
			this.queryHouseStructureList();
			// this.queryUseList();
			// this.queryTypeList();
		},
		watch:{
			'addData.name':function(){
				if(this.addData.name){
					setTimeout(()=>{
						this.addData.name=this.addData.name.replace(/(^\s*)/g, "");
					},100)
				}
			},
			'addTypeData.name':function(){
				if(this.addTypeData.name){
					setTimeout(()=>{
						this.addTypeData.name=this.addTypeData.name.replace(/(^\s*)/g, "");
					},100)
				}
			}
		}
	}

</script>

<style scoped>
	.title-color{
        color:#507bea;
        font-weight: 400;
        font-size: 16px;
        padding-bottom:20px;
        border-bottom: 1px solid #e6e8ef;
        margin-bottom:10px;
    }
    .ml20{
    	margin-left: 20px;
    	margin-right: 0;
    }
    .cursorP{
    	cursor: pointer;
    }
    .row-center{
        text-align: center;
        margin:20px;
    }
    .leftM20{
        margin-left: 20px;
    }
    .item-label{
        background-color:#f5f5f5;
        text-align:center;
        font-size:14px;
        color:#495060;
        line-height:1;
        padding-top:20px;
        box-sizing:border-box;
        width:8%;
        position: absolute;
        height: 100%;
    }
    .item-content{
        padding-top:20px;
        margin-left:10%;
        font-size:14px;
    }
	.height-row{
        min-height: 69px;border-bottom: 1px dashed #ccc;
    }
    .mb20{
    	margin-bottom: 20px;
    }
	.row-line-height{
		line-height: 37px;
		text-align: center;
	}
	.min-span{
		display: inline-block;
		min-width: 20px;
	}
</style>
