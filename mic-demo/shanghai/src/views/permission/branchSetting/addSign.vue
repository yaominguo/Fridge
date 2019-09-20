<template>
    <Card dis-hover>
        <Card dis-hover :padding="0" class="margin-card">
            <Form ref="form"
                :model="formData"
                label-position="right"
                :label-width="110"
                :rules="rule"
            >   
                <Row class="padding-row padding-top-row" v-if="$route.query.storeType !='personal'">
                    <Col span="8">
                        <FormItem label="公司名称" class="ov-form-item" prop="companyName">
                            <Input v-model="formData.companyName"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="注册地址" class="ov-form-item" prop="registerAddr">
                            <Input v-model="formData.registerAddr"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="营业执照号" class="ov-form-item ivu-form-item-required" prop="certNo">
                            <Input v-model="formData.certNo"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row class="padding-row" v-if="$route.query.storeType !='personal'">
                    <Col span="8">
                        <FormItem label="法人姓名" class="ov-form-item ivu-form-item-required" prop="realName">
                            <Input v-model="formData.realName"></Input>
                        </FormItem>
                    </Col>
                </Row>

                <Row class="padding-row padding-top-row" v-if="$route.query.storeType =='personal'">
                    <Col span="8">
                        <FormItem label="姓名" class="ov-form-item ivu-form-item-required" prop="realName">
                            <Input v-model="formData.realName"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="银行卡号" class="ov-form-item" prop="bankNo">
                            <Input v-model="formData.bankNo"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="身份证号" class="ov-form-item ivu-form-item-required" prop="certNo">
                            <Input v-model="formData.certNo"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row class="padding-row" v-if="$route.query.storeType =='personal'">
                    <Col span="8">
                        <FormItem label="手机号" class="ov-form-item" prop="phone">
                            <Input v-model="formData.phone"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>

            <Row class="bottom-row">
                <Button type="primary" @click="save">保存</Button>
                <Button type="primary" :to="{name:'BranchList'}" ghost>取消</Button>
            </Row>
        </Card>
    </Card>
</template>
<script>
export default {
    data(){
        const validateRealName=(rule,value,callback)=>{
            if(this.formData.realName && this.formData.realName!=''){
                callback()
            }else{
                if(this.$route.query.storeType == 'personal'){
                    callback(new Error('请输入姓名'))
                }else{
                    callback(new Error('请输入法人姓名'))
                }
            }
        }
        const validateCertNo=(rule,value,callback)=>{
            if(this.formData.certNo && this.formData.certNo!=''){
                callback()
            }else{
                if(this.$route.query.storeType == 'personal'){
                    callback(new Error('请输入身份证号'))
                }else{
                    callback(new Error('请输入营业执照号'))
                }
            }
        }
        return{
            formData:{},
            rule:{
                companyName:[
                    { required: true, message: '请输入公司名称', trigger: 'blur' }
                ],
                registerAddr:[
                    { required: true, message: '请输入注册地址', trigger: 'blur' }
                ],
                realName:[
                    { validator: validateRealName ,trigger: 'change' }
                ],
                bankNo:[
                    { required: true, message: '请输入银行卡号', trigger: 'blur' }
                ],
                certNo:[
                    { validator: validateCertNo ,trigger: 'change' }
                ],
                phone:[
                    { required: true, message: '请输入手机号', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        save(){
            this.$refs['form'].validate((valid)=>{
                if(!valid)return;
                this.$ajax.post(
                    this,
                    this.$api.ADD_RECORD,
                    this.formData,
                    (res)=>{
                        if (res.code == "200") {
                            this.$Message.success("开通成功！");
                            this.$router.push({
                                name:'BranchList'
                            })
                        } else {
                            this.$Message.error(res.msg);
                        }
                    }
                )
            })
        }
    },
    mounted () {
        this.formData.id=this.$route.query.id;
        this.formData.storeType=this.$route.query.storeType;
    }
}
</script>

<style scoped>
    .bottom-row{
        text-align: center;
        padding:20px 0px;
        border-top: 1px solid #e0e0e0;
    }
    .margin-card{
        margin-bottom:16px;
    }
    .padding-row{
        padding:0px 10px;
    }
    .padding-top-row{
        padding-top: 20px;
    }
    .item{
        font-weight: bold;
        font-size: 14px;
        text-align: left;
        margin-bottom:20px;vertical-align:top;zoom:1
    }
    .item:before{
        content:'';
        display: table;
    }
    .item:after{
        content:'';
        display:block;
        clear: both;
    }
    .item label{
        text-align:right;
        vertical-align:middle;
        float: left;
        font-size:12px;
        color:#495060;
        line-height:1;
        padding:10px 12px 10px 0;
        box-sizing:border-box;
        width:110px;
    }
    .item .item-content{
        position: relative;
        line-height:32px;
        font-size:14px;
        margin-left:130px;
        word-break:break-all;
    }
</style>

