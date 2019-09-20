<template>
<Card class="card" dis-hover>
    <div>
        <Form
            ref="formData"
            :model="formData"
            :rules="formRule"
            :label-width="140"
        >
            <Row>
                <h4 class="align-center align-title">新增停车位</h4>
            </Row>
            <Divider dashed />
            <Row :gutter="20">
                <Col span="10">
                    <FormItem label="小区/公寓" prop="villageId">
                        <Row type="flex" justify="space-between">
                            <Col span="18">
                            <Select @on-change="villageIdChange" v-model="formData.villageId" filterable placeholder="请输入小区名" label-in-value>
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
                            <Option v-for="item in parkTypeList" v-if="item.isChecked == '1'" :key="item.id" :value="item.id" :label="item.typeName"></Option>
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
                        <Input @on-blur="cChange" placeholder="请输入" v-model="formData.monthRent"></Input>
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
                        <Input :disabled="formData.custodyNum!='0'" placeholder="请输入" v-model="formData.deposit"></Input>
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
                <Button type="primary" @click="save('formData')">保存</Button>
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
                                    parkNum:this.formData.parkNum
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
                                    parkNum:this.formData.parkNum
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


        const VpayNum=(rule,value,callback)=>{
            if(this.formData.payNum === undefined || this.formData.payNum == ''){
                callback(new Error('请选择'));
            }else if(this.formData.custodyNum === undefined || this.formData.custodyNum == ''){
                callback(new Error('请选择'));
            }else{
                callback();
            }
        }
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
        // 车位面积
        const checkMoneyparkArea=(rule,value,callback) =>{
            if(this.formData.parkArea == '' || this.formData.parkArea === undefined){
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
                {name:'十二', value:'12'}
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
                    { validator: checkMoneydeposit, trigger: 'change' }
                ],
                payNum:[
                    {validator:VpayNum,trigger:'change'}
                ]
            },
            number1:'10',
            number2:'1',
            number3:'1',
        }
    },
    methods:{
        villageIdChange(){
            if(this.formData.subarea != '' && this.formData.subarea !== undefined){
                this.$refs.formData.validateField("parkNum");
            }
        },
        cChange(){
            if(this.formData.custodyNum != '0' && this.formData.custodyNum != '' && this.formData.custodyNum !== undefined){
                let money=this.formData.monthRent===undefined || isNaN(this.formData.monthRent) || this.formData.monthRent == ''?'0':this.formData.monthRent
                // this.formData.deposit=Number(money)*Number(this.formData.custodyNum);
                this.$set(this.formData,'deposit',Number(money)*Number(this.formData.custodyNum))
            }
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
                let arr=[];
                arr.push(
                    this.formData
                )
                this.$ajax.post(
                    this,
                    this.$api.PARKING_BATCH_POST,
                    arr,
                    (res)=>{
                        this.$Message.success('新增成功');
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
            this.number1='10';
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
        },
        getRent(){
            this.$ajax.get(
                this,
                this.$api.RENT_RELATED,
                {},
                (res)=>{
                    let data;
                    if(res.data != null && res.data.content){
                        data=res.data.content;
                    }else{
                        data=null;
                    }
                    if(data == null || data == ''){
                        this.formData.rentType='1';
                        this.number1='10';
                    }else{
                        if(data.type){
                            this.formData.rentType=data.type;
                        }else{
                            
                        }
                        if(data.type == '1'){
                            this.number1=data.date;
                        }else if(data.type == '2'){
                            this.number2=data.date;
                        }else if(data.type == '3'){
                            this.number3=data.date;
                        }
                        if(data.deposit != null){
                            this.$set(this.formData,'custodyNum',data.deposit);
                            this.$set(this.formData,'payNum',data.rent);
                        }
                    }
                }
            )
        }
    },
    mounted(){
        this.getCommunity();
        this.getAcquireWayList();//取得方式
        this.getContributorList();//出资人
        this.getParkTypeList();//车位类型
        this.getRent();//查询默认收租日
    }
}
</script>
<style scoped>
    .align-center{
        text-align: center;
    }
    .align-title{
        font-size: 24px;
        padding:20px 0px;
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
</style>


