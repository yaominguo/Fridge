<template>
	<div>
		<Form class="commuity-Form" ref="commuityForm" :model="commuityForm" :rules="commuityRule">
            <!-- 小区 -->
            <Row>
                <Col span="10">
                    <FormItem label="公寓名称" prop="villageId">
                        <Row type="flex" justify="space-between">
                            <Col span="18">
                            <Select v-model="commuityForm.villageId" @on-change="villageIdChange" filterable placeholder="请选择小区" label-in-value>
                                <Option v-for="(item,index) in communityList" :value="item.id" :key="index">{{ item.name }}</Option>
                            </Select>
                            </Col>
                            <Col span="5">
                            <Button type="primary" @click="addCommuity">添加小区</Button>
                            </Col>
                        </Row>
                    </FormItem>
                </Col>
            </Row>
            <Divider dashed />
        </Form>
        <!-- 新增小区模态框 -->
        <addCommunityModal @handleCancle="cancel" :leaseType="1" @handleOk="addCompelete" :showModal="addCommuityModal"></addCommunityModal>
		<div>
			<Row class="marginMiddle10">点击
				"<Icon type="md-settings" color="#2d8cf0"></Icon>"可批量修改
			</Row>
			<div class="formList">
				<Row class-name="header parking-row" :gutter="20" type="flex" align="middle">
					<Col span="4">
						<Col span="4"><Input type="text" v-model="parkingCount"></Input></Col>
						<Col span="20">
							<span>个</span>
							<Icon type="md-add-circle" size="18" color="#2d8cf0" @click="handleAddForm"></Icon>
							<span style="font-size:12px">
								(已录入
								<span style="color:red">{{parkingList.length}}</span>个)
							</span>
						</Col>
					</Col>
					<Col span="3">
						<span class="required">*</span>
						车位编号
					</Col>
					<Col span="3">
						<span class="required">*</span>
						<span>车位类型</span>
						<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('select','车位类型','parkType','parkTypeList')"></Icon>
					</Col>
					<Col span="3">
						<!-- <span class="required">*</span> -->
						<span>车位面积(m²)</span>
						<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('input','车位面积（m²）','parkArea')"></Icon>
					</Col>
					<Col span="3">
						<span class="required">*</span>
						<span>用途</span>
						<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('select','用途','purpose','purposeList')"></Icon>
					</Col>
					<Col span="3">
						<!-- <span class="required">*</span> -->
						<span>取得方式</span>
						<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('select','取得方式','acquireWay','acquireWayList')"></Icon>
					</Col>
					<Col span="3">
						<span>出资人</span>
						<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('select','出资人','contributor','contributorList')"></Icon>
					</Col>
				</Row>

				<Form v-for="(item, index) in parkingList" 
					:key="index" 
					ref="formDynamic" 
					:model="item" 
					:rules="formDynamicRules"
					class="parking-form"
					>
					<Row class="parking-row" type="flex" :gutter="20">
						<Col span="3" class="after-col">
							<FormItem class="align-center">
								<Icon type="ios-trash" @click="handleRemove(index)" color="#2d8cf0" size="23" />
							</FormItem>
							<!-- <Icon type="ios-trash" @click="handleRemove(index)" color="#2d8cf0" size="23" /> -->
						</Col>
						<Col span="1">&nbsp;</Col>
						<Col span="3">
							<Row :gutter="2">
								<Col span="9">
									<FormItem prop="subarea">
										<Input type="text" v-model="item.subarea" placeholder="区号"></Input>
									</FormItem>
								</Col>
								<Col span="2">
									<FormItem style="text-align:center">
										<span>一</span>
									</FormItem>
								</Col>
								<Col span="13">
									<FormItem prop="parkNum">
										<Input type="text" v-model="item.parkNum" placeholder="数字编号"></Input>
									</FormItem>
								</Col>
							</Row>
						</Col>
						<Col span="3">
							<FormItem prop="parkType">
								<Select clearable placeholder="请选择" v-model="item.parkType">
									<Option v-for="item in parkTypeList" :key="item.id" :value="item.id" :label="item.typeName"></Option>
								</Select>
							</FormItem>
						</Col>
						<Col span="3">
							<FormItem prop="parkArea">
								<Input type="text" v-model="item.parkArea" placeholder="请输入"></Input>
							</FormItem>
						</Col>
						<Col span="3">
							<FormItem prop="purpose">
								<Select clearable placeholder="请选择" v-model="item.purpose">
									<Option v-for="item in purposeList" :key="item.value" :value="item.value" :label="item.label"></Option>
								</Select>
							</FormItem>
						</Col>
						<Col span="3">
							<FormItem prop="acquireWay">
								<Select clearable placeholder="请选择" v-model="item.acquireWay">
									<Option v-for="item in acquireWayList" :key="item.id" :value="item.id" :label="item.name"></Option>
								</Select>
							</FormItem>
						</Col>
						<Col span="3">
							<FormItem prop="contributor">
								<Select placeholder="请选择" v-model="item.contributor">
									<Option v-for="item in contributorList" :key="item.id" :value="item.id" :label="item.name"></Option>
								</Select>
							</FormItem>
						</Col>
					</Row>
				</Form>
				<Row type="flex" justify="center">
					
					<Col>
						<Button type="primary" :to="{name:'asset/parking'}" ghost>取消</Button>
						<Button type="primary" @click="next">下一步</Button>
					</Col>
				</Row>
			</div>
		</div>
		<!-- 输入 -->
		<Modal title="设置" v-model="inputShow" @on-cancel="cancelSelect" :mask-closable="false">
			<Row type="flex" justify="center" align="middle">
				<Col span="12">
					将列表中的
					<span class="warging-test">{{wargingText}}</span>
					统一设置为：
				</Col>
				<Col span="12">
					<Input v-model="settingInput" placeholder="请输入"></Input>
				</Col>
			</Row>
			<div slot="footer">
				<Button type="primary" @click="cancelInput" ghost>取消</Button>
				<Button type="primary" @click="saveInput">保存</Button>
			</div>
		</Modal>
		<!-- 选择 -->
		<Modal title="设置" v-model="selectShow" @on-cancel="cancelSelect" :mask-closable="false">
			<Row type="flex" justify="center" align="middle">
				<Col span="12">
					将列表中的
					<span class="warging-test">{{wargingText}}</span>
					统一设置为：
				</Col>
				<Col span="12">
					<Select v-model="settingSelect" placeholder="请选择">
						<Option v-for="(item,index) in selectOption" :key="index" :value="item[optionValue]" :label="item[optionName]"></Option>
					</Select>
				</Col>
			</Row>
			<div slot="footer">
				<Button type="primary" @click="cancelSelect" ghost>取消</Button>
				<Button type="primary" @click="saveSelect">保存</Button>
			</div>
		</Modal>
		<!-- 面积 -->
		<Modal title="设置" v-model="otherShow" @on-cancel="cancelOther" :mask-closable="false">
			<Row type="flex" justify="center" align="middle" :gutter="12">
				<Col span="12">
					将列表中的
					<span class="warging-test">{{wargingText}}</span>
					统一设置为：
				</Col>
				<Col span="6">
					<Input v-model="settingOther" placeholder="预测"></Input>
				</Col>
				<Col span="6">
					<Input v-model="settingOther2" placeholder="实用"></Input>
				</Col>
			</Row>
			<div slot="footer">
				<Button type="primary" @click="cancelOther" ghost>取消</Button>
				<Button type="primary" @click="saveOther">保存</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
import addCommunityModal from "../components/createCommunity.vue";
export default {
	props: {
		parkingList: {
			type: Array,
			default: function() {
				return [];
			}
		},
        commuityForm:{
			type: Object,
			default: function() {
				return {};
			}
		},
		custodyNum:String,
		payNum:String
	},
	components: {
        addCommunityModal,
    },
	data(){
		const checkMoneyparkArea= (rule,value,callback) =>{
			if(isNaN(value)){
				callback(new Error('请输入正确的数字'))
			}else{
				if(value<=0 ){
					callback(new Error('请输入正确的数字'))
				}else{
					callback()
				}
			}
        };
		const checkNumber=(rule,value,callback)=>{
			if(value === undefined || value === ''){
				callback(new Error('请输入'))
			}else{
				if(isNaN(value)){
					callback(new Error('请输入数字'));
				}else{
					if(value <= 0){
						callback(new Error('数字必须大于0'));
					}else{
						callback();
					}
				}
			}
		}
		const Vsubarea=(rule,value,callback)=>{
            if(value === undefined || value == ''){
                callback(new Error('请输入区号'));
            }else{
				if(this.$com.checkSubarea(value)){
					callback();
				}else{
					callback(new Error('英文字母、数字'));
				}
            }
		}
		const VparkNum=(rule,value,callback)=>{
            if(value === undefined || value == ''){
                callback(new Error('请输入数字编号'));
            }else{
                if(!isNaN(value)){
					callback();
				}else{
					callback(new Error('只能输入数字'));
				}
            }
		}
		return{
			// 小区
			communityList:[],
			acquireWayList:[],
			contributorList:[],
			parkTypeList:[],
            purposeList:[
                {label: '自用', value: '0'},
                {label: '出租', value: '1'},
                {label: '出售', value: '2'},
            ],
            addCommuityModal:false,
			commuityRule:{
				villageId:[
					{ required: true, message: '请选择小区', trigger: 'change' }
				]
			},
			// table
			parkingCount:'1',
			formDynamicRules:{
				subarea:[
                    { validator: Vsubarea, trigger: 'blur' }
				],
				parkNum:[
					{ validator: VparkNum, trigger: 'blur' }
				],
				parkArea:[
					{validator:checkMoneyparkArea,trigger:'blur'}
				],
                parkType:[
                    {required: true,message:'请选择停车位类型',trigger:'change'}
				],
				purpose:[
					{required: true,message:'请选择资产用途',trigger:'change'}
				]
			},
			// modal
			inputShow:false,
			selectShow:false,
			otherShow:false,
			settingInput:'',
			settingSelect:'',
			settingOther:'',
			settingOther2:'',
			wargingText:'',
			selectOption:[],
			key:'',
			optionName:'',
			optionValue:''
		}
	},
	methods:{
		//添加小区
        addCommuity() {
            this.addCommuityModal = true;
        },
        //弹框取消
        cancel() {
            this.addCommuityModal = false;
        },
        addCompelete() {
            this.addCommuityModal = false;
            this.getCommunity();
        },
        //小区列表
        getCommunity() {
            this.$ajax.get(
                this,
                this.$api.SEARCH_COMMUNITY + "?name=", {},
                res => {
                    this.communityList = res.data.content;
                }
            );
		},
		// 获取取得方式
        getAcquireWayList(){
            this.$ajax.get(
                this,
                this.$api.ASSET_METHOD,
                {},
                (res)=>{
                    this.acquireWayList=res.data.content;
                }
            )
        },
        // ASSET_INVESTOR
        // 获取出资人
        getContributorList(){
            this.$ajax.get(
                this,
                this.$api.ASSET_INVESTOR,
                {},
                (res)=>{
                    this.contributorList=res.data.content;
                }
            )
        },
        // 获取车位类型
        getParkTypeList(){
            this.$ajax.get(
                this,
                this.$api.PARK_TYPES_GET,
                {},
                (res)=>{
					let data=res.data.content;
					data.forEach((e)=>{
						if(e.isChecked == '1'){
							this.parkTypeList.push(e)
						}
					})
                }
            )
        },
		// 小区改变
		villageIdChange(type){
			if(type.value){
				this.commuityForm.villageId=type.value;
				this.commuityForm.villageName=type.label;
			}
		},
		// 新增
		handleAddForm(){
			if(this.parkingCount === '' || !/^[0-9]+$/.test(this.parkingCount) || this.parkingCount ==='0'){
				this.$Message.error('请输入大于0的正整数')
			}else{
				for(let i=0;i<Number(this.parkingCount);i++){
					this.parkingList.push({
						parkType:'',
						purpose:'',
						acquireWay:'',
						contributor:'',
						parkArea:'',
						deposit:'',
						hourRent:'',
						monthRent:'',
						payNum:this.payNum,
						custodyNum:this.custodyNum,				
					})
				}
			}
		},
		// 删除
		handleRemove(index){
			this.parkingList.splice(index,1);
		},
		showModal(type,text,key,options){
			this.wargingText=text;
			if(type === 'input'){
				this.key=key;
				this.inputShow=true;
			}else if(type === 'select'){
				this.key=key;
				this.selectOption=this[options];
				if(key=='parkType'){
					this.optionName='typeName';
					this.optionValue='id';
				}else if(key == 'purpose'){
					this.optionName='label';
					this.optionValue='value';
				}else if(key == 'acquireWay'){
					this.optionName='name';
					this.optionValue='id';
				}else if(key == 'contributor'){
					this.optionName='name';
					this.optionValue='id';
				}
				this.selectShow=true;
			}
		},
		saveSelect(){
			if(this.settingSelect == '' || this.settingSelect === undefined){
				this.cancelSelect();
			}else{
				this.parkingList.forEach((e)=>{
					e[this.key]=JSON.parse(JSON.stringify(this.settingSelect));
				})
				this.$refs.formDynamic.forEach((item)=>{
					item.validateField(this.key);
				})
				this.cancelSelect();
			}
		},
		cancelSelect(){
			this.selectShow=false;
			this.settingSelect='';
			this.selectOption=[];
		},
		saveInput(){
			if(this.settingInput == ''){
				this.cancelInput();
			}else{
				this.parkingList.forEach((e)=>{
					e[this.key]=JSON.parse(JSON.stringify(this.settingInput));
				})
				this.$refs.formDynamic.forEach((item)=>{
					item.validateField(this.key);
				})
				this.cancelInput();
			}
		},
		cancelInput(){
			this.inputShow=false;
			this.settingInput='';
		},
		saveOther(){},
		cancelOther(){
			this.otherShow=false;
			this.settingOther='';
			this.settingOther2='';
		},
		next(){
			this.$refs.commuityForm.validate((valid)=>{
				if(!valid) return;
				if(this.parkingList.length === 0){
					this.$Message.error('请至少添加一条数据');
				}else{
					let flag=true;
					this.$refs['formDynamic'].forEach(item => {
						item.validate(valid => {
							if (!valid) {
								flag = false;
							}
						});
					});
					if(flag){
						let params=JSON.parse(JSON.stringify(this.parkingList));
						let paramsForm=JSON.parse(JSON.stringify(this.commuityForm));
						params.forEach((e)=>{
							this.parkTypeList.forEach((c)=>{
								if(e.parkType == c.id){
									e.parkTypeName=c.typeName
								}
							})
						})
						this.communityList.forEach((e)=>{
							if(e.id == paramsForm.villageId){
								// this.paramsForm.villageName=e.name;
								paramsForm.address=e.address;
							}
						})
						this.$emit('next',params,paramsForm);
					}
				}
			})
			
		}
	},
	mounted(){
		this.getCommunity();
		this.getAcquireWayList();//取得方式
        this.getContributorList();//出资人
        this.getParkTypeList();//车位类型
    }
}
</script>
<style scoped>
	.formList .header {
		background: rgb(249, 248, 248);
		height: 50px;
		line-height: 50px;
		margin-bottom: 15px;
		border: 1px solid #e8eaec;
		padding: 0 5px;
		font-size: 12px;
	}
	.align-center{
		text-align: center;
	}
	.after-col{
		position: relative;
	}
	.after-col:after{
		content:'';
		height:100%;
		/* width:1px; */
		border:1px solid #e0e0e0;
		position: absolute;
		right:10px;
		top: 0px;
	}
	.commuity-Form{
		margin-top: 20px;
	}
	.marginMiddle10{
		margin:10px 0px;
	}
	.warging-test{
		color:red;
	}
	.required{
		color: #ed4014;
	}
</style>
<style>
	.parking-form .ivu-form-item{
		vertical-align:middle;
		margin-bottom:0px;
	}
	.parking-form .ivu-row-flex {
		border:1px solid #e8eaec;
		padding:15px 10px;
		margin:10px 0px;
	}
	.parking-row{
		margin-left:0px !important;
		margin-right:0px !important;
		font-size:12px;
	}
</style>


	