	<template>
    <div>
        <Tabs value="account" name="tab-2a" :animated="false">
            <TabPane label="账务配置" tab="tab-2a" name="account">
              <AccountConfig />
            </TabPane>
            <!-- <TabPane label="公共事业收费配置" tab="tab-2a" name="tripartite">
              <utilitChargeAllocation />
            </TabPane> -->
            <TabPane label="乐百分分期配置" tab="tab-2a" name="staging">
              <Alert show-icon>开启后，租户可使用信用卡一次支付多笔租金账单，但租户的分期还款的手续费用由房东承担</Alert>
                <Row class="row-color">（注：调整后，只影响新录入的租约，不影响已录入的租约）</Row>
                <Form ref="stagingData" :model="stagingData" :rules="stagingRule" :label-width="100">
                    <FormItem prop="isOpenBillingInstalments" style="margin-left:-50px;">
                        <Checkbox false-value="0" true-value="1" v-model="stagingData.isOpenBillingInstalments">开启账单分期</Checkbox>
                        <a @click="txtShow=true;">如何获取乐百分商户号？</a>
                    </FormItem>
                    <Row style="padding:0px 80px">
                        <Col span="8">
                            <FormItem :class="stagingData.isOpenBillingInstalments=='1'?'ivu-form-item-required':''" prop="merchantCode" label="商户编号：">
                                <Input class="width200" :disabled="stagingData.isOpenBillingInstalments == '0'" v-model="stagingData.merchantCode" placeholder="请输入商户编号"></Input>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem :class="stagingData.isOpenBillingInstalments=='1'?'ivu-form-item-required':''" prop="merchantName" label="商户名称：">
                                <Input class="width200" :disabled="stagingData.isOpenBillingInstalments == '0'" v-model="stagingData.merchantName" placeholder="请输入商户名称"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style="padding:0px 80px">
                        <Col span="8">
                            <FormItem :class="stagingData.isOpenBillingInstalments=='1'?'ivu-form-item-required':''" prop="merchantShort" label="商户简称：">
                                <Input class="width200" :disabled="stagingData.isOpenBillingInstalments == '0'" v-model="stagingData.merchantShort" placeholder="请输入商户简称"></Input>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem :class="stagingData.isOpenBillingInstalments=='1'?'ivu-form-item-required':''" prop="interfacePassword" label="接口密码：">
                                <Input type="password" class="width200" :disabled="stagingData.isOpenBillingInstalments == '0'" v-model="stagingData.interfacePassword" placeholder="请输入接口密码"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <Row class="footer-center">
                    <Button @click="saveIndex" type="primary">保存</Button>
                </Row>
                <Divider />
                <Row v-if="tableShow" style="margin:10px;0px">
                    <Col span="12">
                        账单分期组合
                    </Col>
                    <Col span="12" style="text-align:right;">
                        <Button type="primary" @click="addBtn" ghost size="small">添加组合</Button>
                    </Col>
                </Row>
                <Table v-if="tableShow" border :data="data" :columns="col"></Table>
            </TabPane>
			<Modal width="867" class="modal-scroll" v-model="txtShow" title="如何获取乐百分商户号">
                <Row>
                    <h4>一、 商户发送电子版资料</h4>
                    <ol class="padding10">
                        <li>法人身份证正反面复印件（盖章）</li>
                        <li>三证合一后的营业执照（正本或副本）复印件（旧版营业执照还需递交税务登记证、组织机构代码证复印件）盖章</li>
                        <li>《乐百分项目入网申请表》电子版</li>
                        <li>收款账号（包括对公账号名称、账号、银行开户行，盖公章，且须与《服务协议》中的收款账户一致，法定代表人收款则需同时提供银行卡正反面）</li>
                        <li>交易凭证样式（盖章）</li>
                        <p>电商类商户提供交易成功订单截图作为凭证样式及对应的物流追踪信息截图（或快递号）样式</p>
                        <p>线下实体店提供可出示的纸质交易凭证作为样式并盖章</p>
                        <p>★乐百分对外邮箱（fundshare@fundshare.com.cn）</p>
                        <p>★泓智联系人（程欢）</p>
                    </ol>
                    <h4>二、 商户寄送纸质版资料</h4>
                    <ol class="padding10">
                        <li>法人身份证正反面复印件（盖章）</li>
                        <li>三证合一后的营业执照（正本或副本）复印件（旧版营业执照还需递交税务登记证、组织机构代码证复印件）盖章</li>
                        <li>《乐百分项目入网申请表》打印后盖章</li>
                        <li>收款账号（包括对公司账号名称、账号、银行开户行，盖公章，且须与《服务协议》中的收款账户一致，法定代表人收款则需同时提供银行卡正方面）</li>
                        <li>交易凭证样式（盖章）</li>
                        <p>电商类商户提供交易成功订单截图作为凭证样式及对应的物流追踪信息截图（或快递号）样式</p>
                        <p>线下实体店提供可出示的纸质交易凭证作为样式并盖章</p>
                        <li>《乐百分项目特约商户服务协议》请用签字笔签名盖章（骑缝章）</li>
                    </ol>
                    <h4>三、 审批商户</h4>
                    <p class="padding10">乐百分与资方银行联合审核商户资料，需时1-2周。</p>
                    <h4>四、 配置商户参数</h4>
                    <p class="padding10">乐百分为审核通过的商户在“乐百分”系统上配置相关商户参数，发送商户号和交易二维码、使用手册至商户指定邮箱，完成开户流程。</p>
                </Row>
                <div slot="footer" class="footer-center">
                    <Button @click="txtShow=false;" type="primary">知道了</Button>
                </div>
            </Modal>
            <!-- 添加分租组合 -->
            <Modal :mask-closable="false" v-model="addShow" :title="addMessage.title" @on-cancel="cancelAdd">
                <Form ref="addData" :model="addData" :rules="addRule" :label-width="130">
                    <!-- <FormItem prop="accountNumber" label="一次性支付账单数" class="ivu-form-item-required">
                        <Input v-model="addData.accountNumber" placeholder="请输入一次性支付账单数"></Input>
                    </FormItem> -->
                    <Row>
                      <Col span="12">
                        <FormItem prop="accountNumber" label="一次性支付账单数" class="ivu-form-item-required">
                          <Input v-model="addData.accountNumber" placeholder="一次性支付账单数" />
                        </FormItem>
                      </Col>
                      <Col span="12">
                        <FormItem prop="monthNumber" label="且每期账单最少" :label-width="110">
                          <InputNumber v-model="addData.monthNumber" :min="1" :max="12" :precision="0"/> 个月
                        </FormItem>
                      </Col>
                    </Row>
                    <FormItem prop="stagingNumber" label="分期" class="ivu-form-item-required">
                        <Row>
                            <Col span="8">
                                <Select @on-change="stagingNumberChange" v-model="addData.stagingNumber">
                                    <Option v-for="(item,index) in dicList" :key="index" :label="item.stagingNumber+'期'" :value="item.stagingNumber"></Option>
                                </Select>
                            </Col>
                            <Col span="3" style="text-align:center">每期</Col>
                            <Col span="8">
                                <Input v-model="addData.rate" disabled></Input>
                            </Col>
                            <Col span="5">&nbsp;%手续费</Col>
                        </Row>
                    </FormItem>
                    <FormItem prop="reductionMode" label="租金优惠额">
                        <RadioGroup @on-change="radioChange" v-model="addData.reductionMode">
                            <FormItem class="item-input">
                                <Radio label="0">
                                    <Input
                                     v-model="addData.number1"
                                     @on-blur="numberChange"
                                     placeholder="请输入"
                                     :disabled="addData.reductionMode != '0'"
                                     ></Input>
                                     &nbsp;个单月租金
                                </Radio>
                            </FormItem>
                            <FormItem class="item-input">
                                <Radio label="1">
                                    固定&nbsp;<Input v-model="addData.number2" @on-blur="numberChange" :disabled="addData.reductionMode != '1'"></Input>&nbsp;元
                                </Radio>
                            </FormItem>
                        </RadioGroup>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="primary" ghost @click="cancelAdd">取消</Button>
                    <Button type="primary" @click="saveCom('addData')">保存</Button>
                </div>
            </Modal>
        </Tabs>
    </div>
</template>
<script>
  import utilitChargeAllocation from "./utilitChargeAllocation";
  import AccountConfig from './accountConfigDetail';
export default {
	components:{
    utilitChargeAllocation,
    AccountConfig
	},
    data(){
        const validateaccountNumber=(rule,value,callback)=>{
            if(isNaN(this.addData.accountNumber) ||
            this.addData.accountNumber == '' ||
            this.addData.accountNumber === undefined
            || Number(this.addData.accountNumber)<=0
            ){
                callback(new Error('请输入大于0的数字'));
            }else{
                callback();
            }
        }
        const validatemerchantCode=(rule,value,callback)=>{
            if(this.stagingData.isOpenBillingInstalments == '1'){
                if(this.stagingData.merchantCode == '' || this.stagingData.merchantCode === undefined){
                    callback(new Error('请输入商品编号'))
                }else{
                    callback();
                }
            }else{
                callback();
            }
        }

        const validatemerchantName=(rule,value,callback)=>{
            if(this.stagingData.isOpenBillingInstalments == '1'){
                if(this.stagingData.merchantName == '' || this.stagingData.merchantName === undefined){
                    callback(new Error('请输入商品名称'))
                }else{
                    callback();
                }
            }else{
                callback();
            }
        }
        const validatemerchantShort=(rule,value,callback)=>{
            if(this.stagingData.isOpenBillingInstalments == '1'){
                if(this.stagingData.merchantShort == '' || this.stagingData.merchantShort === undefined){
                    callback(new Error('请输入商品简称'))
                }else{
                    callback();
                }
            }else{
                callback();
            }
        }
        const validateinterfacePassword=(rule,value,callback)=>{
            if(this.stagingData.isOpenBillingInstalments == '1'){
                if(this.stagingData.interfacePassword == '' || this.stagingData.interfacePassword === undefined){
                    callback(new Error('请输入接口密码'))
                }else{
                    callback();
                }
            }else{
                callback();
            }
        }
        return{
            tableShow:false,
            dicList:[],
            stagingData:{},
            stagingRule:{
                merchantCode:[
                    {validator:validatemerchantCode,trigger:'blur'}
                ],
                merchantName:[
                    {validator:validatemerchantName,trigger:'blur'}
                ],
                merchantShort:[
                    {validator:validatemerchantShort,trigger:'blur'}
                ],
                interfacePassword:[
                    {validator:validateinterfacePassword,trigger:'blur'}
                ],
            },
            txtShow:false,
            data:[],
            col:[
                {
                    title:'一次性支付账单数',
                    align:'center',
                    key:'accountNumber'
                },
                {
                    title:'每期账单最少月数',
                    align:'center',
                    key:'monthNumber',
                },
                {
                    title:'分期数',
                    align:'center',
                    key:'stagingNumber'
                },
                {
                    title:'费率',
                    align:'center',
                    render:(h,params)=>{
                        return h('div',{},params.row.rate+'%')
                    }
                },
                {
                    title:'减免方式',
                    align:'center',
                    render:(h,params)=>{
                        let type;
                        if(params.row.reductionMode == '0'){
                            type='按月租比例';
                        }else if(params.row.reductionMode =='1'){
                            type='固定金额';
                        }
                        return h('div',{},type)
                    }
                },
                {
                    title:'租金优惠额度',
                    align:'center',
                    render:(h,params)=>{
                        if(params.row.reductionMode == '0'){
                            return h('div',{},params.row.rentConcessions+'个单月租金')
                        }else if(params.row.reductionMode == '1'){
                            return h('div',{},'￥'+params.row.rentConcessions)
                        }
                    }
                },
                {
                    title:'操作',
                    align:'center',
                    render:(h,params)=>{
                        return [
                            h('Button',{
                                props:{
                                    type:'primary',
                                    size: 'small',
                                },
                                style:{
                                    margin:'0px 10px'
                                },
                                on:{
                                    click:()=>{
                                        this.editCom(params.row);
                                    }
                                }
                            },'编辑'),
                            h('Button',{
                                props:{
                                    type:'error',
                                    size: 'small',
                                },
                                on:{
                                    click:()=>{
                                        this.delCom(params.row);
                                    }
                                }
                            },'删除')
                        ]
                    }
                },
            ],
            addShow:false,
            addData:{
                reductionMode:'0',
                number1:'0',
                number2:'0',
                monthNumber: 1,
            },
            addRule:{
                accountNumber:[
                    { validator: validateaccountNumber, trigger: 'blur' }
                ],
                monthNumber: [
                  {required: true, message: '请输入每期账单最少月数'},
                ],
                reductionMode: [
                    { required: true, message: '请选择租金优惠额', trigger: 'change' }
                ],
            },
            addMessage:{
                title:'添加分租组合',
                type:'add'
            }
        }
    },
    methods:{
        addBtn(){
            this.addMessage.title='添加分租组合';
            this.addMessage.type='add';
            this.addShow=true;
        },
        numberChange(){
            if(this.addData.type=='0'){
                if(isNaN(this.addData.number1) || Number(this.addData.number1)<0 || this.addData.number1 == ''){
                    this.$Message.error('请输入大于等于0的数字');
                    this.addData.number1='0';
                }
            }else if(this.addData.type=='1'){
                if(isNaN(this.addData.number2) || Number(this.addData.number2)<0 || this.addData.number2 == ''){
                    this.$Message.error('请输入大于等于0的数字');
                    this.addData.number2='0';
                }
            }
        },
        radioChange(value){
            this.addData.number1='0';
            this.addData.number2='0';
        },
        // 分期改变
        stagingNumberChange(value){
            this.dicList.forEach((e)=>{
                if(e.stagingNumber == value){
                    this.addData.rate=e.rateNo;
                }
            })

        },
        // 查询字典
        getDic(){
            this.$ajax.get(
                this,
                this.$api.STAGING_DIC_GET,
                {},(res)=>{
                    this.dicList=res.data.content;
                }
            )
        },
        // 查询配置
        getIndex(){
            this.$ajax.get(
                this,
                this.$api.STAGING_INDEX_GET,
                {},(res)=>{
                  if (!this.$com.confirm(res, 'data.content')) {
                    this.tableShow=false;
                    return;
                  }
                  let data=res.data.content;
                  this.stagingData=data;
                  if(data.isOpenBillingInstalments == '1'){
                      this.tableShow=true;
                      // 查询分租
                      this.getCom();
                  }else{
                      this.tableShow=false;
                  }
                }
            )
        },
        // 保存配置
        saveIndex(){
            this.$refs['stagingData'].validate((valid)=>{
                if(!valid) return;
                let params=JSON.parse(JSON.stringify(this.stagingData));
                if(params.createTime) delete params.createTime;
                this.$ajax.post(
                    this,
                    this.$api.STAGIN_CREATE_POST,
                    params,
                    (res)=>{
                        if(res.code == '200'){
                            this.$Message.success('保存成功');
                            this.getIndex();
                        }
                    }
                )
            })
        },
        // 查询分租
        getCom(){
            this.$ajax.get(
                this,
                this.$api.STAGING_COMBINATION_GET,
                {},(res)=>{
                    this.data=res.data.content;
                }
            )
        },
        // 保存分租
        saveCom(name){
            this.$refs[name].validate((valid)=>{
                if(!valid) return;
                let methods,url,message;
                if(this.addMessage.type=='add'){
                    methods='post';
                    url=this.$api.STAGING_COMBINATION_POST;
                    message='新增成功';
                }else{
                    methods='put';
                    url=this.$api.STAGING_COMBINATION_UPDATE;
                    message='修改成功';
                }
                let params=JSON.parse(JSON.stringify(this.addData));
                if(params.reductionMode == '0'){
                    params.rentConcessions=params.number1;
                    if(params.number1) delete params.number1;
                    if(params.number2) delete params.number2;
                }else{
                    params.rentConcessions=params.number2;
                    if(params.number1) delete params.number1;
                    if(params.number2) delete params.number2;
                }
                this.$ajax[methods](
                    this,
                    url,
                    params,
                    (res)=>{
                        if(res.code == '200'){
                            this.cancelAdd();
                            this.$Message.success(message);
                            this.getCom();
                        }
                    }
                )
            })
        },
        editCom(params){
            this.addMessage.title='编辑分租组合';
            this.addMessage.type='edit';
            let temParams=JSON.parse(JSON.stringify(params));
            if(temParams.reductionMode == '0'){
                temParams.number1=temParams.rentConcessions;
                temParams.number2='0';
            }else{
                temParams.number2=temParams.rentConcessions;
                temParams.number1='0';
            }
            temParams.monthNumber = Number(temParams.monthNumber);
            delete temParams.rentConcessions;
            delete temParams.createTime;
            this.addData=JSON.parse(JSON.stringify(temParams));
            this.addShow=true;
        },
        delCom(params){
            let id=params.id;
            if(id){
                this.$Modal.confirm({
                title: '提示',
                content: '<p>是否确认删除分租组合？</p>',
                onOk: () => {
                        this.$ajax.delete(
                        this,
                        this.$api.STAGING_COMBINATION_DELETE.replace('{id}',id),
                        {},
                        (res) => {
                                this.$Message.success('删除成功');
                                this.getCom();
                            }
                        )
                    },
                });
            }
        },
        cancelAdd(){
            this.addShow=false;
            this.$refs['addData'].resetFields();
            this.addData.accountNumber='';
            delete this.addData.stagingNumber;
            delete this.addData.rate;
            this.addData.reductionMode='0';
            this.addData.number1='0';
            this.addData.number2='0';
        }
    },
    mounted(){
        this.getIndex();
        this.getDic();
    }
}
</script>
<style scoped>
    .row-color{
        color: rgb(177, 177, 177);
        padding-left:20px;
        margin-bottom: 10px;
    }
    .padding10{
        padding:10px 20px;
    }
    .padding10 li,p{
        margin:6px 0px;
    }
    .footer-center{
        text-align: center;
    }
    .width200{
        width: 200px;
    }
    .item-input .ivu-input-type{
        width: 100px;
        margin-bottom:10px;
    }
</style>
<style>
    .modal-scroll .ivu-modal-body{
        height:480px;overflow-y: scroll;
    }
</style>


