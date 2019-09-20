<template>
<Card class="card" dis-hover>
    <div class="parking-edit">
        <Form
            ref="formData"
            :model="formData"
            :rules="formRule"
            :label-width="140"
        >
            <Row class="editTitle">
                {{formData._address}}-{{formData._subarea}}-{{formData._parkNum}}
            </Row>
            <Row :gutter="20">
                <Col span="10">
                    <FormItem label="停车位编号" class="ivu-form-item-required">
                        <Row type="flex" justify="center" align="middle">
                            <Col span="8">
                                <FormItem  prop="subarea">
                                    <Input placeholder="区号" v-model="formData.subarea"></Input>
                                </FormItem>
                            </Col>
                            <Col span="2" style="text-align:center">
                                <span>-</span>
                            </Col>
                            <Col span="14">
                                <FormItem prop="parkNum">
                                    <Input placeholder="数字编号" v-model="formData.parkNum"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                    </FormItem>
                </Col>
                <Col span="10">
                    <FormItem label="停车位类型" prop="parkType">
                        <Select placeholder="请选择" v-model="formData.parkType">
                            <Option v-for="item in parkTypeList" :key="item.id" :value="item.id" :label="item.typeName"></Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="20">
                <Col span="10">
                    <FormItem label="车位面积(m²)" prop="parkArea">
                        <Input  placeholder="请输入" v-model="formData.parkArea"></Input>
                    </FormItem>
                </Col>
                <!-- <Col span="10">
                    <FormItem label="预测面积（m²）">
                        <Input  placeholder="请输入"></Input>
                    </FormItem>
                </Col>
                <Col span="10">
                    <FormItem label="实用面积（m²）">
                        <Input  placeholder="请输入"></Input>
                    </FormItem>
                </Col> -->
            </Row>
            <Row :gutter="20">
                <Col span="5">
                    <FormItem label="取得方式">
                        <Select placeholder="请选择" v-model="formData.acquireWay">
                            <Option v-for="item in acquireWayList" :key="item.id" :value="item.id" :label="item.name"></Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="5">
                    <FormItem label="出资人">
                        <Select placeholder="请选择" v-model="formData.contributor">
                            <Option v-for="item in contributorList" :key="item.id" :value="item.id" :label="item.name"></Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="5">
                    <FormItem label="用途" prop="purpose">
                        <Select placeholder="请选择" v-model="formData.purpose">
                            <Option v-for="item in purposeList" :key="item.value" :value="item.value" :label="item.label"></Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Divider dashed />
            <Row :gutter="20">
                <Col span="10">
                    <FormItem class="ivu-form-item-required" label="每小时单价（元）" prop="hourRent">
                        <Input placeholder="请输入"  v-model="formData.hourRent"></Input>
                    </FormItem>
                </Col>
                <Col span="10">
                    <FormItem class="ivu-form-item-required" label="月租金（元）" prop="monthRent">
                        <Input  @on-blur="cChange" placeholder="请输入" v-model="formData.monthRent"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="20">
                <Col span="10">
                    <FormItem label="付款方式" prop="payNum">
                        <Row>
                            <Col span="4">
                                <span class="required-span">付</span>
                            </Col>
                            <Col span="8">
                                <Select placeholder="请选择" v-model="formData.payNum">
                                    <Option v-for="(item,index) in payNumList" :key="index" :label="item.name" :value="item.value"></Option>
                                </Select>
                            </Col>
                            <Col span="4">
                                <span class="required-span">押</span>
                            </Col>
                            <Col span="8">
                                <Select placeholder="请选择" @on-change="cChange" v-model="formData.custodyNum">
                                    <Option v-for="(item,index) in custodyNumList" :key="index" :label="item.name" :value="item.value"></Option>
                                </Select>
                            </Col>
                        </Row>
                    </FormItem>
                </Col>
                <Col span="10">
                    <FormItem class="ivu-form-item-required" label="押金（元）" prop="deposit">
                        <Input :disabled="formData.custodyNum!='0'"  placeholder="请输入" v-model="formData.deposit"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="20">
                <Col span="10">
                    <FormItem class="item-input" label="默认收租日" prop="rentType">
                        <RadioGroup @on-change="radioChange" v-model="formData.rentType" vertical>
                            <FormItem class="item-input">
                                <Radio label="1">
                                    提前&nbsp;<Input v-model="number1" @on-blur="numberChange" :disabled="formData.rentType != '1'"></Input>&nbsp;天收租
                                </Radio>
                            </FormItem>
                            <FormItem class="item-input">
                                <Radio label="2">
                                    固定&nbsp;<Input v-model="number2" @on-blur="numberChange" :disabled="formData.rentType != '2'"></Input>&nbsp;日收租（每期的第一个月）
                                </Radio>
                            </FormItem>
                            <FormItem class="item-input">
                                <Radio label="3">
                                    固定&nbsp;<Input v-model="number3" @on-blur="numberChange" :disabled="formData.rentType != '3'"></Input>&nbsp;日收租（每期提前一个月）
                                </Radio>
                            </FormItem>
                        </RadioGroup>
                    </FormItem>
                    
                </Col>
            </Row>
            <Row class="align-center marginTop20">
                <Button type="primary" :to="{name:'asset/parking'}" ghost>返回</Button>
                <Button type="primary" v-if="this.formData.dataStatus =='0'" @click="save('formData')">保存</Button>
                <Button type="primary" v-if="this.formData.dataStatus =='1'" @click="save('formData')">保存并提交修改审批</Button>
            </Row>
        </Form>
         <!-- 新增小区模态框 -->
        <addCommunityModal @handleCancle="cancle" :leaseType="1" @handleOk="addCompelete" :showModal="addCommuityModal"></addCommunityModal>
    </div>
</Card>
</template>
<script>
import addCommunityModal from "../components/createCommunity.vue";
export default {
    components: {
        addCommunityModal,
    },
    data(){
        const Vsubarea=(rule,value,callback)=>{
            if(this.formData.subarea === undefined || this.formData.subarea == ''){
                callback(new Error('请输入区号'));
            }else{
                if(this.$com.checkSubarea(this.formData.subarea)){
                    if(
                        this.formData.villageId !== undefined && this.formData.villageId != ''
                        && this.formData.subarea !== undefined && this.formData.subarea != ''
                        && this.formData.parkNum !== undefined && this.formData.parkNum != ''
                        ){
                            this.$ajax.get(
                                this,
                                this.$api.CHECK_PARKNUM,
                                {
                                    villageId:this.formData.villageId,
                                    subarea:this.formData.subarea,
                                    parkNum:this.formData.parkNum,
                                    id:this.$route.query.id
                                },
                                (res)=>{
                                    if(res.data.content){
                                        callback(new Error('该车位编号已存在'))
                                    }else{
                                        callback();
                                    }
                                }
                            )
                        }else{
                            callback();
                        }
				}else{
					callback(new Error('区号只能输入英文字母、数字'));
				}
            }
        }
        const VparkNum=(rule,value,callback)=>{
            if(this.formData.parkNum === undefined || this.formData.parkNum == ''){
                callback(new Error('请输入数字编号'));
            }else{
                if(!isNaN(this.formData.parkNum)){
                    if(
                        this.formData.villageId !== undefined && this.formData.villageId != ''
                        && this.formData.subarea !== undefined && this.formData.subarea != ''
                        && this.formData.parkNum !== undefined && this.formData.parkNum != ''
                        ){
                            this.$ajax.get(
                                this,
                                this.$api.CHECK_PARKNUM,
                                {
                                    villageId:this.formData.villageId,
                                    subarea:this.formData.subarea,
                                    parkNum:this.formData.parkNum,
                                    id:this.$route.query.id
                                },
                                (res)=>{
                                    if(res.data.content){
                                        callback(new Error('该车位编号已存在'))
                                    }else{
                                        callback();
                                    }
                                }
                            )
                        }else{
                            callback();
                        }
                }else{
                    callback(new Error('数字编号只能输入数字'));
                }
            }
        }
        // 车位面积
        const checkMoneyparkArea=(rule,value,callback) =>{
            if(this.formData.parkArea == '' || this.formData.parkArea === undefined || this.formData.parkArea === null){
                callback();
            }else{
                if(isNaN(this.formData.parkArea)){
                    callback(new Error('请输入正确的数字'));
                }else{
                    if(this.formData.parkArea<=0 ){
                        callback(new Error('请输入正确的数字'));
                    }else{
                        callback();
                    }
                }
            }
        };
        const checkMoneyhourRent = (rule,value,callback) =>{
            if(this.formData.hourRent === '' || this.formData.hourRent === undefined){
                callback(new Error('请输入金额'))
            }else{
                if(isNaN(this.formData.hourRent)){
                    callback(new Error('请输入正确的数字'))
                }else{
                    if(this.formData.hourRent<0 ){
                        callback(new Error('请输入正确的数字'))
                    }else{
                        callback()
                    }
                }
            }
        };
        const checkMoneymonthRent = (rule,value,callback) =>{
            if(this.formData.monthRent === '' || this.formData.monthRent === undefined){
                callback(new Error('请输入金额'))
            }else{
                if(isNaN(this.formData.monthRent)){
                    callback(new Error('请输入正确的数字'))
                }else{
                    if(this.formData.monthRent<0 ){
                        callback(new Error('请输入正确的数字'))
                    }else{
                        callback()
                    }
                }
            }
        };
        const VpayNum=(rule,value,callback)=>{
            if(this.formData.payNum === undefined || this.formData.payNum == ''){
                callback(new Error('请选择'));
            }else if(this.formData.custodyNum === undefined || this.formData.custodyNum == ''){
                callback(new Error('请选择'));
            }else{
                callback();
            }
        }
        const checkMoneydeposit= (rule,value,callback) =>{
            if(this.formData.deposit === '' || this.formData.deposit === undefined){
                callback(new Error('请输入金额'))
            }else{
                if(isNaN(this.formData.deposit )){
                    callback(new Error('请输入正确的数字'))
                }else{
                    if(this.formData.deposit<0 ){
                        callback(new Error('请输入正确的数字'))
                    }else{
                        callback()
                    }
                }
            }
        };
        return{
            communityList:[],
            acquireWayList:[],
            contributorList:[],
            purposeList:[
                {label: '自用', value: '0'},
                {label: '出租', value: '1'},
                {label: '出售', value: '2'},
            ],
            payNumList:[
                {name:'一',value:'1'},
                {name:'二',value:'2'},
                {name:'三', value:'3'},
                {name:'四',value:'4'},
                {name:'五',value:'1'},
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
                {name:'五',value:'1'},
                {name:'六', value:'6'},
                {name:'七', value:'7'},
                {name:'八',value:'8'},
                {name:'九',value:'9'},
                {name:'十',value:'10'},
                {name:'十一',value:'11'},
                {name:'十二', value:'12'},
            ],
            parkTypeList:[],
            addCommuityModal:false,
            formData:{
                rentType:'1'
            },
            formRule:{
                villageId:[
                    {required: true,message:'请选择小区',trigger:'change'}
                ],
                subarea:[
                    { validator: Vsubarea, trigger: 'blur' }
                ],
                parkNum:[
                    { validator: VparkNum, trigger: 'blur' }
                ],
                parkType:[
                    {required: true,message:'请选择停车位类型',trigger:'change'}
                ],
                purpose:[
                    {required: true,message:'请选择用途',trigger:'change'}
                ],
                parkArea:[
                    { validator: checkMoneyparkArea, trigger: 'blur' }
                ],
                hourRent:[
                    { validator: checkMoneyhourRent, trigger: 'blur' }
                ],
                monthRent:[
                    { validator: checkMoneymonthRent, trigger: 'blur' }
                ],
                deposit:[
                    { validator: checkMoneydeposit, trigger: 'blur' }
                ],
                payNum:[
                    {validator:VpayNum,trigger:'change'}
                ]
            },
            number1:'0',
            number2:'1',
            number3:'1',
        }
    },
    methods:{
        cChange(){
            if(this.formData.custodyNum != '0' && this.formData.custodyNum != '' && this.formData.custodyNum !== undefined){
                let money=this.formData.monthRent===undefined || isNaN(this.formData.monthRent) || this.formData.monthRent == ''?'0':this.formData.monthRent
                let num=
                this.formData.deposit=Number(money)*Number(this.formData.custodyNum);
            }
        },
        getDetail(){
            this.$ajax.get(
                this,
                this.$api.PARKING_BY_ID.replace('{id}',this.$route.query.id),
                {},
                (res)=>{
                    let data=res.data.content;
                    if(data.rentType != null){
                        if(data.rentType == '1'){
                            this.number1=data.rentDay;
                        }else if(data.rentType == '2'){
                            this.number2=data.rentDay;
                        }else if(data.rentType == '3'){
                            this.number3=data.rentType;
                        }
                    }
                    data._address=data.address;
                    data._subarea=data.subarea;
                    data._parkNum=data.parkNum;
                    this.formData=data;
                }
            )
        },
        save(name){
            this.$refs[name].validate((valid)=>{
                if(!valid) return;
                if(this.formData.rentType == '1'){
                    this.formData.rentDay=this.number1;
                }else if(this.formData.rentType == '2'){
                    this.formData.rentDay=this.number2;
                }else if(this.formData.rentType == '3'){
                    this.formData.rentDay=this.number3;
                }
                this.communityList.forEach((e)=>{
                    if(e.id == this.formData.villageId){
                        this.formData.villageName=e.name;
                        this.formData.address=e.address;
                    }
                })
                let params=JSON.parse(JSON.stringify(this.formData));
                delete params.createTime;
                this.$ajax.put(
                    this,
                    this.$api.PARKING_BY_ID.replace('{id}',params.id),
                    params,
                    (res)=>{
                        this.$Message.success('修改成功');
                        this.$router.push({
                            name:'asset/parking'
                        })
                    }
                )
            })
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
                    this.parkTypeList=res.data.content;
                }
            )
        },
        //添加小区
        addCommuity(){
            this.addCommuityModal = true;
        },
        //添加小区
        addCommuity() {
            this.addCommuityModal = true;
        },
        //弹框取消
        cancle() {
            this.addCommuityModal = false;
        },
        addCompelete() {
            this.addCommuityModal = false;
            this.getCommunity();
        },
        radioChange(value){
            this.number1='0';
            this.number2='1';
            this.number3='1';
        },
        numberChange(){
            let pattern=/^([0-9]{1,})$/;
            if(this.formData.rentType == ''){

            }else{
                if(this.formData.rentType == '1'){
                    if(isNaN(this.number1)){
                        this.$Message.error('只可输入数字')
                        this.number1='0'
                    }else{
                        if(! pattern.test(this.number1)){
                            this.$Message.error('只可输入数字')
                            this.number1='0'
                        }else{
                            if(this.number1 > 99){
                                this.$Message.error('请输入0~99天数')
                                this.number1='0'
                            }
                        }
                    }
                }else if(this.formData.rentType == '2'){
                    if(isNaN(this.number2)){
                        this.$Message.error('只可输入数字')
                        this.number2='1'
                    }else{
                        if(! pattern.test(this.number2)){
                            this.$Message.error('只可输入数字')
                            this.number2='1'
                        }else{
                            if(this.number2 > 31 || this.number2 == 0){
                                this.$Message.error('请输入1~31天数')
                                this.number2='1';
                            }
                        }
                    }
                }else if(this.formData.rentType == '3'){
                    if(isNaN(this.number3)){
                        this.$Message.error('只可输入数字')
                        this.number3='1'
                    }else{
                        if(! pattern.test(this.number3)){
                            this.$Message.error('只可输入数字')
                            this.number3='1'
                        }else{
                            if(this.number3 > 31 || this.number3 == 0){
                                this.$Message.error('请输入1~31天数')
                                this.number3='1';
                            }
                        }
                    }
                }
            }
        }
    },
    mounted(){
        Promise.all(
            [
                this.getCommunity(),
                this.getAcquireWayList(),//取得方式
                this.getContributorList(),//出资人
                this.getParkTypeList(),//车位类型
            ]
        ).then((result) => {
            this.getDetail()
        }).catch((error) => {
            console.log(error)
        })
    }
}
</script>
<style scoped>
    .align-center{
        text-align: center;
    }
    .required-span{
        display: inline-block;
        text-align: center;
        width:100%;
    }
    .required-span::before{
        content:'*';
        color:#ed4014;
        font-size: 12px;
        font-family:SimSun;
        line-height:1;
        margin-right: 4px;
    }
    .marginTop20{
        margin-top: 20px;
    }
    .item-input{
        margin-bottom:10px;
    }
    .item-input .ivu-input-type{
        width: 100px;
    }
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
</style>


