<template>
	<div>
		<Form class="commuity-Form" ref="commuityForm" :model="commuityForm">
            <!-- 小区 -->
            <Row>
                <Col span="10">
                    <FormItem label="公寓名称" prop="villageId">
                        <Row type="flex" justify="space-between">
                            <Col span="18">
                            	<Input disabled v-model="commuityForm.villageName"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                </Col>
            </Row>
            <Divider dashed />
        </Form>
        <!-- 新增小区模态框 -->
		<div>
			<Row class="marginMiddle10">点击
				"<Icon type="md-settings" color="#2d8cf0"></Icon>"可批量修改
			</Row>
			<div class="formList">
				<Row class-name="header parking-row" :gutter="20" type="flex" align="middle">
					<Col span="2">
						<!-- <Input type="text" style="width:30px;" v-model="houseCount"></Input>
							<span>套</span>
							<Icon type="md-add-circle" size="18" color="#2d8cf0" @click="handleAddHouse(houseCount)"></Icon>
							<span style="font-size:12px">
								(已录入
							<span style="color:red">{{priceList.length}}</span>套)
						</span> -->
					</Col>
					<Col span="2">
						停车位编号
					</Col>
					<Col span="2">
						<span>车位类型</span>
					</Col>
					<Col span="3">
						<span class="required">*</span>
						<span>每小时单价（元）</span>
						<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('input','每小时单价（元）','hourRent')"></Icon>
					</Col>
					<Col span="3">
						<span class="required">*</span>
						<span>月租金（元）</span>
						<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('input','月租金（元）','monthRent')"></Icon>
					</Col>
					<Col span="5">
						<span class="required">*</span>
						<span>付款方式</span>
						<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('select','付款方式')"></Icon>
					</Col>
					<Col span="3">
                        <span class="required">*</span>
						<span>押金</span>
						<Icon type="md-settings" size="18" color="#2d8cf0" @click="showModal('input','押金','deposit')"></Icon>
					</Col>
				</Row>

				<Form v-for="(item, index) in priceList" 
					:key="index" 
					ref="formDynamic" 
					:model="item" 
					:rules="formDynamicRules"
					class="parking-form"
					>
					<Row type="flex" class="parking-row" align="middle" :gutter="20">
						<Col span="2" class="after-col">
							<FormItem class="align-center">
								<Icon type="ios-trash" @click="handleRemove(index)" color="#2d8cf0" size="23" />
							</FormItem>
							<!-- <Icon type="ios-trash" @click="handleRemove(index)" color="#2d8cf0" size="23" /> -->
						</Col>
						<Col span="2">
							{{item.subarea}}一{{item.parkNum}}
						</Col>
						<Col span="2">
							{{item.parkTypeName}}
						</Col>
						<Col span="3">
                            <FormItem prop="hourRent">
                                <Input type="text" v-model="item.hourRent"  placeholder="每小时单价（元）"></Input>
                            </FormItem>
						</Col>
						<Col span="3">
							<FormItem prop="monthRent">
                                <Input type="text" @on-blur="cChange(index)" v-model="item.monthRent"  placeholder="月租金"></Input>
                            </FormItem>
						</Col>
						<Col span="5">
						<FormItem>
							<Row :gutter="2">
								<Col span="4">
									<span class="required-span">付</span>
								</Col>
								<Col span="8">
									<FormItem prop="payNum">
										<Select clearable placeholder="请选择" v-model="item.payNum">
											<Option v-for="(item,index) in payNumList" :key="index" :label="item.name" :value="item.value"></Option>
										</Select>
									</FormItem>
								</Col>
								<Col span="4">
									<span class="required-span">押</span>
								</Col>
								<Col span="8">
									<FormItem prop="custodyNum">
										<Select @on-change="cChange(index)" clearable placeholder="请选择" v-model="item.custodyNum">
											<Option v-for="(item,index) in custodyNumList" :key="index" :label="item.name" :value="item.value"></Option>
										</Select>
									</FormItem>
								</Col>
							</Row>
							</FormItem>
						</Col>
						<Col span="3">
							<FormItem prop="deposit">
								<Input type="text" :disabled="item.custodyNum != '0'" v-model="item.deposit"  placeholder="押金"></Input>
							</FormItem>
						</Col>
					</Row>
							
				</Form>
				<Row type="flex" justify="center">
					
					<Col>
						<Button type="primary" @click="last" ghost>上一步</Button>
						<Button type="primary" @click="save">保存</Button>
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
			<Row type="flex" justify="center" align="middle" :gutter="10">
				<Col span="10">
					将列表中的
					<span class="warging-test">{{wargingText}}</span>
					统一设置为：
				</Col>
				<Col span="7">
					<Select v-model="settingSelect1" placeholder="付">
						<Option v-for="(item,index) in payNumList" :key="index" :label="item.name" :value="item.value"></Option>
					</Select>
				</Col>
				<Col span="7">
					<Select v-model="settingSelect2" placeholder="押">
						<Option v-for="(item,index) in custodyNumList" :key="index" :label="item.name" :value="item.value"></Option>
					</Select>
				</Col>
			</Row>
			<div slot="footer">
				<Button type="primary" @click="cancelSelect" ghost>取消</Button>
				<Button type="primary" @click="saveSelect">保存</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
export default {
	props: {
		priceList: {
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
	},
	data(){
		const checkMoneyhourRent = (rule,value,callback) =>{
            if(value === '' || value === undefined){
                callback(new Error('请输入金额'))
            }else{
                if(isNaN(value)){
                    callback(new Error('请输入正确的数字'))
                }else{
                    if(value<0 ){
                        callback(new Error('请输入正确的数字'))
                    }else{
                        callback()
                    }
                }
            }
        };
        const checkMoneymonthRent = (rule,value,callback) =>{
            if(value === '' || value === undefined){
                callback(new Error('请输入金额'))
            }else{
                if(isNaN(value)){
                    callback(new Error('请输入正确的数字'))
                }else{
                    if(value<0 ){
                        callback(new Error('请输入正确的数字'))
                    }else{
                        callback()
                    }
                }
            }
        };
        const checkMoneydeposit= (rule,value,callback) =>{
            if(value === '' || value === undefined){
                callback(new Error('请输入金额'))
            }else{
                if(isNaN(value )){
                    callback(new Error('请输入正确的数字'))
                }else{
                    if(value<0 ){
                        callback(new Error('请输入正确的数字'))
                    }else{
                        callback()
                    }
                }
            }
		};
		const VpayNum=(rule,value,callback)=>{
            if(value == '' || value === undefined){
                callback(new Error('请选择'));
            }else{
                callback();
            }
		}
		const VcustodyNum=(rule,value,callback)=>{
            if(value == '' || value === undefined){
                callback(new Error('请选择'));
            }else{
                callback();
            }
		}
		return{
			payNumList:[
                {name:'一',value:'1'},
                {name:'二',value:'2'},
                {name:'三', value:'3'},
                {name:'四',value:'4'},
                {name:'五',value:'5'},
                {name:'六', value:'6'},
                {name:'七', value:'7'},
                {name:'八',value:'8'},
                {name:'九',value:'9'},
                {name:'十',value:'10'},
                {name:'十一',value:'11'},
                {name:'十二', value:'12'},
            ],
            custodyNumList:[
				{name:'自定义',value:'0'},
                {name:'一',value:'1'},
                {name:'二',value:'2'},
                {name:'三', value:'3'},
                {name:'四',value:'4'},
                {name:'五',value:'5'},
                {name:'六', value:'6'},
                {name:'七', value:'7'},
                {name:'八',value:'8'},
                {name:'九',value:'9'},
                {name:'十',value:'10'},
                {name:'十一',value:'11'},
                {name:'十二', value:'12'},
            ],
			formDynamicRules:{
				hourRent:[
                    { validator: checkMoneyhourRent, trigger: 'blur' }
                ],
                monthRent:[
                    { validator: checkMoneymonthRent, trigger: 'blur' }
                ],
                deposit:[
                    { validator: checkMoneydeposit, trigger: 'change' }
				],
				payNum:[
					// {validator:VpayNum,trigger:'change'},
					{required: true,message:'请选择',trigger:'change'}
				],
				custodyNum:[
					// {validator:VcustodyNum,trigger:'change'},
					{required: true,message:'请选择',trigger:'change'}
				]
            },
            // modal
			inputShow:false,
			selectShow:false,
			settingInput:'',
			settingSelect1:'',
			settingSelect2:'',
			wargingText:'',
		}
	},
	methods:{
		cChange(index){
            if(this.priceList[index].custodyNum != '0' && this.priceList[index].custodyNum != '' && this.priceList[index].custodyNum !== undefined){
                let money=this.priceList[index].monthRent===undefined || isNaN(this.priceList[index].monthRent) || this.priceList[index].monthRent == ''?'0':this.priceList[index].monthRent
                let num=
				this.priceList[index].deposit=Number(money)*Number(this.priceList[index].custodyNum);
            }
        },
        showModal(type,text,key){
			this.wargingText=text;
			if(type === 'input'){
				this.key=key;
				this.inputShow=true;
			}else if(type === 'select'){
				this.selectShow=true;
			}
		},
		saveSelect(){
			if(this.settingSelect1 == '' && this.settingSelect2 == ''){
				return;
			}else{
				if(this.settingSelect1 != ''){
					this.priceList.forEach((e)=>{
						e.payNum=JSON.parse(JSON.stringify(this.settingSelect1));
					})
					this.$refs.formDynamic.forEach((item)=>{
						item.validateField("payNum");
						item.validateField("custodyNum");
					})
				}
				if(this.settingSelect2 != ''){
					if(this.settingSelect2 != '0'){
						this.priceList.forEach((e)=>{
							e.custodyNum=JSON.parse(JSON.stringify(this.settingSelect2));
							if(e.monthRent != ''){
								e.deposit=Number(e.monthRent) * Number(e.custodyNum)
							}
						})
						this.$refs.formDynamic.forEach((item)=>{
							item.validateField("payNum");
							item.validateField("custodyNum");
						})
					}else{
						this.priceList.forEach((e)=>{
							e.custodyNum=JSON.parse(JSON.stringify(this.settingSelect2));
						})
						this.$refs.formDynamic.forEach((item)=>{
							item.validateField("payNum");
							item.validateField("custodyNum");
						})
					}
				}
			}
			this.cancelSelect();
		},
		cancelSelect(){
			this.selectShow=false;
			this.settingSelect1='';
			this.settingSelect2='';
		},
		saveInput(){
			if(this.settingInput == ''){
				this.cancelInput();
			}else{
				if(this.key == 'monthRent'){
					this.priceList.forEach((e)=>{
						e[this.key]=JSON.parse(JSON.stringify(this.settingInput));
						if(e.custodyNum != '0' && e.custodyNum != ''){
							e.deposit=Number(e.monthRent) * Number(e.custodyNum)
						}
					})
					this.$refs.formDynamic.forEach((item)=>{
						item.validateField("monthRent");
					})
				}else if(this.key == 'deposit'){
					this.priceList.forEach((e)=>{
						if(e.custodyNum == '0'){
							e.deposit=JSON.parse(JSON.stringify(this.settingInput));
						}
					})
					this.$refs.formDynamic.forEach((item)=>{
						item.validateField("deposit");
					})
				}else{
					this.priceList.forEach((e)=>{
						e[this.key]=JSON.parse(JSON.stringify(this.settingInput));
					})
					this.$refs.formDynamic.forEach((item)=>{
						item.validateField(this.key);
					})
				}
				this.cancelInput();
			}
		},
		cancelInput(){
			this.inputShow=false;
			this.settingInput='';
		},
		// 删除
		handleRemove(index){
			this.priceList.splice(index,1);
		},
		save(){
			this.$refs.commuityForm.validate((valid)=>{
				if(!valid) return;
				if(this.priceList.length === 0){
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
						let params=JSON.parse(JSON.stringify(this.priceList));
						let paramsForm=JSON.parse(JSON.stringify(this.commuityForm));
						
						this.$emit('save',params,paramsForm);
					}
				}
			})
        },
        last(){
            this.$emit('last',this.priceList,this.commuityForm);
        }
	},
	mounted(){
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
	.required-span{
		display: inline-block;
		width: 100%;
		text-align: center;
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


	