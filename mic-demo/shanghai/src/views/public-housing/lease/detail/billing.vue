<template>
    <div class="rootDetail">
        <Card dis-hover title="基本信息">
            <div class="basic-info">
                <p><span>项目</span><span>{{data.acctName}}</span></p>
                <p><span>应收金额(元) </span><span>{{Number(data._receivable).toFixed(2)}}<span v-if="data._deuc != 0">（已抵扣{{data._deuc}}元）</span></span></p>
                <p><span>应收款日</span><span>{{$com.strTime(data.receivableTime)}}</span></p>
                <p v-if="data.received != null && data.received != ''"><span>已收金额(元)</span><span>{{Number(data.received).toFixed(2)}}</span></p>
                <p v-if="data.receivedTime != null && data.receivedTime != ''"><span>收款日期</span><span>{{$com.strTime(data.receivedTime)}}</span></p>
                <p><span>状态</span><span>{{$com.transformCheckinStatus(data.status).txt}}</span></p>
                <p v-if="data.receivedChannelName != null && data.receivedChannelName != ''"><span>收款方式</span><span>{{data.receivedChannelName}}</span></p>
                <p v-if="data.note != null && data.note != ''"><span>备注</span><span>{{data.note}}</span></p>
            </div>
        </Card>
        <Divider dashed />
        <Card dis-hover>
            <div slot="title">
                <span>减免记录</span>
                <Button v-if="allShow"  type="primary" @click="reliefShow=true" size="small" class="title-button" ghost>添加减免</Button>
            </div>
            <Table :data="data.deductiblerRecordList" :columns="colRelief"></Table>
        </Card>
        <Divider dashed />


        <!-- <Card dis-hover v-if="data._receivable != data.received">
            <div slot="title">

            </div>
        </Card> -->
        <Row class="Mb16" v-if="allShow">
            <Button type="primary" @click="tollBtn" size="small" class="title-button" ghost>收款</Button>
        </Row>
        <Card dis-hover class="Mb16">
            <div slot="title">
                <span>预存款使用记录</span>
            </div>
            <Table :data="data.rechargeRecordList" :columns="colToll"></Table>
        </Card>
        <Card dis-hover>
            <div slot="title">实收流水记录</div>
            <Table :data="flowsList" :columns="colFlow"></Table>
        </Card>
        <!-- 减免Modal -->
        <Modal :mask-closable="false" v-model="reliefShow" title="添加减免" @on-cancel="cancleRelieData">
            <Form
                ref="reliefData"
                :model="reliefData"
                :rules="reliefRule"
                :label-width="110"
            >
            <FormItem label="减免类型" prop="deduType">
                <Select placeholder="请选择减免类型" v-model="reliefData.deduType" @on-change="reDeduTypeChange">
                    <!-- <Option value="0" v-if="this.houseKind[0] && (this.houseKind[0].key=='0' || this.houseKind[0].key=='1')">政策性减免</Option> -->
                    <Option value="0">政策性减免</Option>
                    <Option value="1">临时减免</Option>
                </Select>
            </FormItem>
            <FormItem label="减免金额" prop="deduAmount" class="ivu-form-item-required">
                <Row>
                    <Col span="16">
                        <Input placeholder="请输入减免金额" v-model="reliefData.deduAmount"></Input>
                    </Col>
                    <Col span="2">
                        &nbsp;
                    </Col>
                    <Col span="6" v-if="this.reliefData.deduType=='0'">
                        <span v-if="data.deductibleBalance != null && data.deductibleBalance != ''">剩余{{data.deductibleBalance}}元</span>
                        <span v-else>剩余0元</span>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="照片凭证" prop="pic" :class="setClass">
                <!-- :maxUploads="1"  -->
                <imageUpload
                    :uploadButton="'upload'"
                    :isPhone="true"
                    :url="$api.FILE_UPLOAD_POST"
                    :defaultList="defaultList"
                    @on-complete="uploadComplete"
                    @on-remove="uploadRemove"
                    @showUploadImg="getReturn"
                    :code="code"
                ></imageUpload>
            </FormItem>
            <FormItem label="备注" prop="remarks" :class="setClass">
                <Input type="textarea" placeholder="备注" v-model="reliefData.remarks"></Input>
            </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="cancleRelieData" ghost>取消</Button>
                <Button type="primary" @click="saveRelieData('reliefData')">保存</Button>
            </div>
        </Modal>
        <!-- 收款Modal -->
        <Modal :mask-closable="false" v-model="tollShow" title="收款" @on-cancel="cancleTollData">
            <Form
                ref="tollData"
                :model="tollData"
                :rules="tollRule"
                :label-width="110"
            >
            <FormItem label="收款方式" prop="deduType">
                <Select placeholder="请选择收款方式" v-model="tollData.deduType">
                    <Option v-for="(item,index) in paymentData" :key="index" :label="item.name" :value="item.name"></Option>
                </Select>
            </FormItem>
            <FormItem label="收款金额" prop="deduAmount" class="ivu-form-item-required">
                <Row>
                    <Col span="12">
                        <Input placeholder="请输入收款金额" v-model="tollData.deduAmount"></Input>
                    </Col>
                    <Col span="1">
                        &nbsp;
                    </Col>
                    <Col v-if="this.tollData.deduType=='预付款'" span="11">
                        <span v-if="data.rechargeBalance != null && data.rechargeBalance != ''">剩余余额：{{data.rechargeBalance}}元</span>
                        <span v-else>剩余余额:0元</span>
                    </Col>
                    <Col v-else span="11">
                        剩余收款：{{(Number(this.data._receivable)-Number(this.data.received)).toFixed(2)}}元
                    </Col>
                </Row>
            </FormItem>
            <!-- <FormItem label="照片凭证" prop="pic" class="ivu-form-item-required" v-if="this.tollData.deduType=='预付款'">
                <imageUpload
                    :uploadButton="'upload'"
                    :isPhone="true"
                    :url="$api.FILE_UPLOAD_POST"
                    :defaultList="defaultList2"
                    @on-complete="uploadComplete"
                    @on-remove="uploadRemove"
                    @showUploadImg="getReturn"
                    :code="code"
                ></imageUpload>
            </FormItem> -->
            <FormItem v-if="this.tollData.deduType!='预付款'" label="凭证编号" prop="code">
                <Input placeholder="请输入凭证编号" v-model="tollData.code"></Input>
            </FormItem>
            <!-- receivedTime -->
            <FormItem label="收款日期" prop="receivedTime">
                <DatePicker placeholder="请选择收款日期" :options="options" v-model="tollData.receivedTime" @on-change="tollData.receivedTime=$event" format="yyyy-MM-dd" />
            </FormItem>
            <FormItem label="备注" prop="remarks">
                <Input placeholder="备注" type="textarea" v-model="tollData.remarks"></Input>
            </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="cancleTollData" ghost>取消</Button>
                <Button type="primary" :loading="tollLoading" @click="saveTollData('tollData')">保存</Button>
            </div>
        </Modal>
        <!-- showColRelief -->
        <Modal v-model="show" width="800" title="减免信息">
            <div class="basic-info">
                <p><span>减免类型</span><span>{{showData._deduType}}</span></p>
                <p><span>减免金额</span><span>{{showData.deduAmount}}</span></p>
                <p><span>减免凭证</span><span>
                    <img class="pic-class" v-for="(item,index) in showData.picList"
                    :key="index"
                     :src="item.path">
                    </span></p>
                <p><span>操作时间</span><span>{{showData.createTime}}</span></p>
                <p><span>操作人</span><span>{{showData.userName}}</span></p>
                <p><span>备注</span><span>{{showData.remarks}}</span></p>
            </div>
        </Modal>
        <!-- showColToll -->
        <Modal v-model="showToll" width="800" title="收款信息">
            <div class="basic-info">
                <p><span>收款方式</span><span>{{showTollData._deduType}}</span></p>
                <p><span>收款金额</span><span>{{showTollData.deduAmount}}</span></p>
                <p><span>凭证编号</span><span>
                    {{showTollData.code}}
                    </span></p>
                    <!-- receivedTime -->
                <p><span>收款日期</span><span>{{showTollData.receivedTime}}</span></p>
                <p><span>操作人</span><span>{{showTollData.userName}}</span></p>
                <p><span>备注</span><span>{{showTollData.remarks}}</span></p>
            </div>
        </Modal>
    </div>
</template>
<script>
import imageUpload from "../../../../components/Helper/Form/image-upload";
import { setTimeout } from 'timers';
export default {
    components: {
        imageUpload
    },
    data(){
        const validateRemark=(rule,value,callback)=>{
            if(this.reliefData.deduType=='1'){
                if(this.reliefData.remarks=='' || this.reliefData.remarks === undefined){
                    callback(new Error('请输入备注'))
                }else{
                    callback();
                }
            }else{
                callback();
            }
        }
        const validatePic=(rule,value,callback)=>{
            if(this.reliefData.deduType=='1'){
                if(this.defaultList.length==0){
                    callback(new Error('请上传凭证'))
                }else{
                    callback();
                }
            }else{
                callback();
            }
        }
        // const validatePic2=(rule,value,callback)=>{
        //     if(this.tollData.deduType=='0'){
        //         if(this.defaultList2.length==0){
        //             callback(new Error('请上传凭证'))
        //         }else{
        //             callback();
        //         }
        //     }else{
        //         callback();
        //     }
        // }
        const validateNumber=(rule,value,callback)=>{
            if(this.reliefData.deduAmount == ''){
                callback(new Error('请输入减免金额'));
            }else{
                if(isNaN(this.reliefData.deduAmount)){
                    callback(new Error('请输入数字'));
                }else{
                    if(Number(this.reliefData.deduAmount)<=0){
                        callback(new Error('减免金额必须大于0'));
                    }else{
                        if(this.reliefData.deduType == '0'){
                            let money=this.data.deductibleBalance == null?0:this.data.deductibleBalance
                            if(Number(this.reliefData.deduAmount) > Number(money)){
                                callback(new Error('输入金额超过剩余额度'));
                            }else{
                                callback();
                            }
                        }else{
                            callback()
                        }
                    }
                }
            }
        }
        const VadeduAmount=(rule,value,callback)=>{
            if(this.tollData.deduAmount === ''){
                callback(new Error('请输入收款金额'));
            }else{
                if(isNaN(this.tollData.deduAmount)){
                    callback(new Error('请输入大于0的数字'));
                }else{
                    if(this.tollData.deduAmount<=0){
                        callback(new Error('请输入大于0的数字'));
                    }else{
                        setTimeout(()=>{
                            this.tollData.deduAmount=Number(this.tollData.deduAmount).toFixed(2);
                            if(Number(this.tollData.deduAmount)>Number((Number(this.data._receivable)-Number(this.data.received)).toFixed(2))){
                                callback(new Error('输入金额不能大于应收款金额'))
                            }else{
                                callback();
                            }
                        },200)
                    }
                }
            }
        }
        return{
            options: {
                disabledDate (date) {
                    return date && date.valueOf() > Date.now();
                }
            },
            data:{},
            // reliefLoading:false,
            tollLoading:false,
            colRelief:[
                {
                    title:'减免时间',
                    render:(h,params)=>{
                        return h('div',{},this.$com.strTime(params.row.createTime))
                    }
                },
                {
                    title:'减免类型',
                    render:(h,params)=>{
                        let type=params.row.deduType=='0'?'政策性减免':'临时减免';
                        return h('div',{},type)
                    }
                },
                {
                    title:'减免应收金额',
                    key:'deduAmount'
                },
                {
                    title:'操作人员',
                    key:'userName'
                },
                {
                    title:'备注',
                    key:'remarks'
                },
                {
                    title:'操作',
                    render:(h,params)=>{
                        if(params.row.deduType == '2'){
                            return h('Button',{
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                    ghost: true
                                },
                                on:{
                                    click:()=>{
                                        this.showColRelief(params.row);
                                    }
                                }
                            },'查看')
                        }
                    }
                }
            ],
            colToll:[
                {
                    title:'收费时间',
                    render:(h,params)=>{
                        return h('div',{},this.$com.strTime(params.row.receivedTime))
                    }
                },
                {
                    title:'收费方式',
                    render:(h,params)=>{
                        let type=params.row.deduType=='1'?'预付款':params.row.deduType;
                        return h('div',{},type)
                    }
                },
                {
                    title:'收费金额',
                    key:'deduAmount'
                },
                {
                    title:'操作人员',
                    key:'userName'
                },
                {
                    title:'备注',
                    key:'remarks'
                },
                {
                    title:'操作',
                    render:(h,params)=>{
                        if(params.row.deduType != '1'){
                            return h('Button',{
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                    ghost: true
                                },
                                on:{
                                    click:()=>{
                                        this.showColToll(params.row);
                                    }
                                }
                            },'查看')
                        }else{
							 return h('Button',{
							    props: {
							        type: 'default',
							        size: 'small'
							    }
							},'暂无')
						}
                    }
                }
            ],
            colFlow:[
                {
                    title:'进出帐',
                    render:(h,params)=>{
                        return h('div',this.$com.inOroutText(params.row.inOrOut))
                    },
                },
                {
                    title:'房源 / 承租人(业主)',
                    minWidth:120,
                    render:(h,params)=>{
                        return h('div',this.$com.roomAndPerson(params.row))
                    }
                },
                {
                    title:'类型',
                    render:(h,params)=>{
                        return h('div',this.$com.feeText(params.row.peeType))
                    }
                },
                {
                    title:'项目',
                    key:'acctType',
                },
                {
                    title:'金额',
                    key:'pee',
                },
                {
                    title:'方式',
                    render:(h,params)=>{
                        return h('div',params.row.paymentChannelName)
                    }
                },
                {
                    title:'收支日期',
                    render:(h,params)=>{
                        if(params.row.tradeTime==null || params.row.tradeTime==''){

                        }else{
                            return h('div',this.$com.changeDate(params.row.tradeTime))
                        }
                    }

                },
                {
                    title:'收款方',
                    key:'companyName',
                },
                {
                    title:'所属分店',
                    key:'storeName',
                },
                {
                    title:'状态',
                    align:'center',
                    render:(h,params)=>{
                        return h('div',this.$com.statusTex(params.row.isChecked ))
                    }
                },
                {
                    title:'编号',
                    key:'flowNo',
                    align:'center',
                },
            ],
            reliefShow:false,
            tollShow:false,

            reliefData:{
                deduType:'1'
            },
            reliefRule:{
                deduType:[
                    { required: true, message: '请选择减免类型', trigger: 'change' }
                ],
                deduAmount:[
                    // { required: true, message: '请输入减免金额', trigger: 'blur' },
                    { validator: validateNumber, trigger: 'blur' }
                ],
                pic:[
                    { validator: validatePic, trigger: 'change' }
                ],
                remarks:[
                    { validator: validateRemark, trigger: 'blur' }
                ]
            },
            tollData:{
                deduType:'0',
                deduAmount:''
            },
            tollRule:{
                deduType:[
                    { required: true, message: '请选择收款方式', trigger: 'change' }
                ],
                deduAmount:[
                    // { required: true, message: '请输入收款金额', trigger: 'blur' },
                    { validator: VadeduAmount, trigger: 'blur' }
                ],
                // pic:[
                //     { validator: validatePic2, trigger: 'change' }
                // ],
                receivedTime:[
                    { required: true, message: '请选择收款日期',},
                ]
                // remarks:[
                //     { validator: validateRemark, trigger: 'blur' }
                // ]
            },
            defaultList:[],//减免照片凭证
            defaultList2:[],//收款照片凭证
            code:'',
            code2:'',
            show:false,
            showData:{},
            showToll:false,
            showTollData:{},
            paymentData:[],
            houseKind:[],
            flowsList:[],
            allShow:false
        }
    },
    methods:{
        reDeduTypeChange(){
            if(this.reliefData.deduAmount != '' && this.reliefData.deduAmount !== undefined){
                this.$refs.reliefData.validateField("deduAmount");
            }
        },
        // 上传成功(减免)
        uploadComplete(response, filename){
            let data=response.data.content;
            this.defaultList.push({
                picId:data.id,
                picPath:data.path,
                flag:true
            })
            this.$refs.reliefData.validateField("pic");
        },
        // 图片删除(减免)
        uploadRemove(){
            if(item.flag && item.flag == 'phone'){
                this.$ajax.delete(this, this.$api.DELETE_FILE_UPLOAD_POST.replace("{code}", this.code).replace("{id}",
                    item.picId), {}, res => {
                        this.defaultList.splice(index,1);
                        this.$refs.reliefData.validateField("pic");
                });
            }else{
                this.defaultList.splice(index,1);
                this.$refs.reliefData.validateField("pic");
            }
        },
        // 同步手机端上传图片(减免)
        getReturn(){
            this.$ajax.get(
                this,
                this.$api.GET_FILE_UPLOAD_POST.replace("{code}", this.code), {},
                res => {
                    if(res.data.content.length>0){
                        let data=res.data.content;
                        data.forEach((e)=>{
                            this.defaultList.push({
                                picId:e.id,
                                picPath:e.path,
                                return:'phone',
                                flag:true
                            })
                        })
                    }
                }
            );
        },
        saveRelieData(name){
            this.$refs[name].validate((valid)=>{
                if(!valid) return;
                // this.reliefLoading=true;
                // RECHARGE_USING
                let params={};
                params.roomId=this.data.roomId;
                params.acctDetailId=this.data.id;
                params.deductible=this.reliefData.deduAmount;
                params.deduType=this.reliefData.deduType;
                params.remarks=this.reliefData.remarks;
                params.leaseId=this.data.leaseId;
                // params.houseKind=this.houseKind[0].key;
                params.picIdList=[];
                this.defaultList.forEach((e)=>{
                    params.picIdList.push(e.picId)
                })
                this.$ajax.post(
                    this,
                    this.$api.RENT_RELIEF_RECORD,
                    params,(res)=>{
                        // this.reliefLoading=false;
                        this.cancleRelieData();
                        this.$Message.success('新增减免成功');
                        this.getDetail();
                    },()=>{
                        // this.reliefLoading=false;
                    }
                )
            })
        },
        cancleRelieData(){
            this.reliefShow=false;
            this.reliefData.remarks='';
            this.reliefData.deduAmount='';
            this.reliefData.deduType='1';
            this.defaultList=[];
            this.$refs.reliefData.resetFields();
        },
        showColRelief(params){
            let Tparams=JSON.parse(JSON.stringify(params));
            if(Tparams.deduType=='0'){
                Tparams._deduType='政策性减免'
            }else{
                Tparams._deduType='临时性减免'
            }
            this.showData=Tparams;
            this.show=true;
        },
        showColToll(params){
            let Tparams=JSON.parse(JSON.stringify(params));
            if(Tparams.deduType=='1'){
                Tparams._deduType='预付款'
            }else{
                Tparams._deduType=Tparams.deduType;
            }

            this.showTollData=Tparams;
            this.showToll=true;
        },
        // 收款
        tollBtn(){
            this.tollData.deduAmount='';
            this.tollShow=true;
        },
        saveTollData(name){
            this.$refs[name].validate((valid)=>{

                if(!valid) return;
                this.tollLoading=true;
                // RECHARGE_USING
                let params={};
                let url;
                let methods;
                if(this.tollData.deduType=='预付款'){
                    url=this.$api.RECHARGE_USING;
                    params.roomId=this.data.roomId;
                    params.acctDetailId=this.data.id;
                    params.deductible=this.tollData.deduAmount;
                    params.deduType='1';
                    params.remarks=this.tollData.remarks;
                    params.receivedTime=this.tollData.receivedTime;
                    params.leaseId=this.data.leaseId;
                    params.picIdList=[];
                    this.defaultList2.forEach((e)=>{
                        params.picIdList.push(e.picId)
                    })
                    methods='post';
                }else{
                    params.code=this.tollData.code;
                    params.id=this.data.id;
                    params.note=this.tollData.remarks;
                    params.received=this.tollData.deduAmount;
                    params.receivedChannelName=this.tollData.deduType;
                    this.paymentData.forEach((e)=>{
                        if(e.name == params.receivedChannelName){
                            params.receivedChannel=e.id;
                        }
                    })
                    // paymentData
                    params.receivedTime=this.tollData.receivedTime;
                    url=this.$api.PUT_RECEIVE_MONEY;
                    methods='put';
                }


                this.$ajax[methods](
                    this,
                    url,
                    params,(res)=>{
                        this.tollLoading=false;
                        this.cancleTollData();
                        this.$Message.success('新增收款成功');
                        this.getDetail();
                        this.getFlow();
                    },(res)=>{
                        this.tollLoading=false;
                    }
                )
            })
        },
        cancleTollData(){
            this.tollShow=false;
            this.$refs.tollData.resetFields();
            this.tollData.remarks=='';
            this.tollData.deduType='';
            this.defaultList2=[];

        },
         // 上传成功(收款)
        uploadComplete2(response, filename){
            let data=response.data.content;
            this.defaultList2.push({
                picId:data.id,
                picPath:data.path,
                flag:true
            })
            this.$refs.tollData.validateField("pic");
        },
        // 图片删除(收款)
        uploadRemove2(item,index){
            if(item.flag && item.flag == 'phone'){
                this.$ajax.delete(this, this.$api.DELETE_FILE_UPLOAD_POST.replace("{code}", this.code).replace("{id}",
                    item.picId), {}, res => {
                        this.defaultList2.splice(index,1);
                        this.$refs.reliefData.validateField("pic");
                });
            }else{
                this.defaultList2.splice(index,1);
                this.$refs.tollData.validateField("pic");
            }
        },
        // 同步手机端上传图片(收款)
        getReturn2(){
            this.$ajax.get(
                this,
                this.$api.GET_FILE_UPLOAD_POST.replace("{code}", this.code), {},
                res => {
                    if(res.data.content.length>0){
                        let data=res.data.content;
                        data.forEach((e)=>{
                            this.defaultList2.push({
                                picId:e.id,
                                picPath:e.path,
                                return:'phone',
                                flag:true
                            })
                        })
                    }
                }
            );
        },
        getCode(){
            this.code='';
            this.code2='';
            this.$ajax.get(
                this,
                this.$api.GET_FILE_UPLOAD_CODE_GET + "?number=2", {},
                res => {
                    let codes=res.data.content.code;
                    codes=codes.split(',');
                    this.code=codes[0];
                    this.code2=codes[1];
                }
            );
        },
        getDetail(){
            // this.$route.query.id 242746585516380162
            this.$ajax.get(
                this,
                this.$api.ACCOUNT_BILLING_DETAIL.replace('{id}',this.$route.query.id),
                {},(res)=>{
                    let data=res.data.content;
                    data._receivable=Number(data.receivable)-Number(data.policyDeduc)-Number(data.tempDeduc);
                    data._deuc=Number(data.policyDeduc)+Number(data.tempDeduc);
                    data.received=data.received==null?0:data.received;
                    if(this.$route.query.showStatus=='2' || this.$route.query.showStatus=='10'){
                        if(data.status == '0' || data.status == '3'){
                            this.allShow=true;
                        }else if(data.status=='2'){
                            if(data._receivable != data.received){
                                this.allShow=true;
                            }else{
                                this.allShow=false;
                            }
                        }else{
                            this.allShow=false;
                        }
                    }else{
                        this.allShow=false;
                    }
                    this.data=data;
                }
            )
        },
        // 查询收款方式列表
        getPayMent(){
            this.$ajax.get(
                this,
                this.$api.PAYMENT_LIST_GET,
                null,
                (res)=>{
                    this.paymentData=res.data.content;
                    let data=res.data.content;
                }
            )
        },
        // 查询流水
        getFlow(){
            this.$ajax.get(
                this,
                this.$api.GET_TRANSACTION_LIST+'?status=1&peeType=0&leaseDetailId='+this.$route.query.id,
                null,
                (res)=>{
                    this.flowsList=res.data.content.content;
                }
            )
        }
    },
    computed:{
        setClass(){
            return this.reliefData.deduType=='0' ? '':'ivu-form-item-required';
        }
    },
    mounted(){
        if(this.$route.query.reliefShow == 'true' || this.$route.query.reliefShow == true){
            this.reliefShow=true;
        }
        if(this.$route.query.tollShow == 'true' || this.$route.query.tollShow==true){
            this.tollShow=true;
        }
        // this.houseKind=JSON.parse(this.$cookie.get('houseKind'));
        this.getCode();
        this.getDetail();
        this.getPayMent();
        this.getFlow();
    }
}
</script>
<style scoped>
    .rootDetail{
        background: #fff;
        padding:20px;
    }
    .basic-info {
        display: flex;
        flex-wrap: wrap;
    }
    .basic-info > p {
        width: 50%;
        margin-bottom: 5px;
        display: flex;
        align-items: center;
    }
    .basic-info > p > span {
        padding-left: 10px;
    }
    .basic-info > p > span:first-child {
        display: inline-block;
        width: 200px;
        text-align: right;
    }
    .title-button{
        /* height:24px; */
        float: right;
        /* line-height: 24px; */
    }
    .pic-class{
        width:60px;
        height:60px;
    }
    .Mb16{
        margin-bottom:16px;
    }
</style>
