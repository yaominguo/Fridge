<template>
    <div class="add">
        <Row>
            <Card>
                <p slot="title">
                    预付费登记
                </p>
                <Form class="mt10" :model="info" :label-width="180" :rules="ruleValidate" ref="paramsForm">
                    <Row>
                        <Col span="10">
                            <Form-item label="付费租户" prop="certNo">
                                <Select
                                    v-model="info.certNo"
                                    filterable
                                    remote
                                    :remote-method="remoteMethod"
                                    :loading="loading">
                                    <Option v-for="(option, index) in options" :value="option.certNo" :key="option.certNo">{{option.name+'-'+option.certNo}}</Option>
                                </Select>
                            </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10">
                            <Form-item label="付费方式" prop="channel">
                                 <Select v-model="info.channel" >
                                    <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10">
                            <Form-item label="费用金额" prop="amount">
                                 <InputNumber :min="1" v-model="info.amount"></InputNumber>
                            </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10">
                            <Form-item label="备注" prop="remark">
                                 <Input type="textarea" v-model="info.remark" placeholder="请输入"></Input>
                            </Form-item>
                        </Col>
                    </Row>
                </Form>
                <Row  justify="center" type="flex">
                    <Col span="2">
                         <Button  type="primary" @click="add('paramsForm')" >保存</Button>
                    </Col>
                    <Col span="2">
                        <Button    @click="back">返回</Button>
                    </Col>
                </Row>
            </Card>
        </Row>
    </div>
</template>
<script>

export default {
    data(){
        return{
            options:[],
            loading: false,
            typeList:[
                {
                    label:"现金",
                    value:'现金'
                },
                {
                    label:"POS",
                    value:'POS'
                },
                {
                    label:"微信",
                    value:'微信'
                },
            ],
            info:{
                amount:1
            },
            ruleValidate:{
                certNo:[
                   {required: true,message: '请选择租户',trigger: 'change'}
                ],
                channel:[
                    { required: true, message: '请选择付费方式', trigger: 'change' }, 
                ],
              /*  amount:[
                    { type:'number',required: true, message: '请输入费用金额', trigger: 'blur' }
                ],*/
                /*ac_remark:[
                    { max:500, message: '长度超限，请输入500个字以内', trigger: 'blur' }
                ],*/
            }
        }
    },
    methods:{
        /*** 保存按钮*/
        add(name){
            this.$refs[name].validate((valid) => {
                if(valid){
                    this.$ajax.put(this,this.$api.PRE_PAYMENT_ADD,this.info,(res) => {
                        if (res.code == "200") {
                            this.$Message.success("新增成功！");
                            this.back();
                        } else {
                            this.$Message.error(res.msg);
                        }

                    });
                }else{
                    this.$Message.error('请检查输入')
                }
            })
        },
        /**返回按钮 */
        back(){
            this.$router.go(-1)
        },
        remoteMethod (query) {
            if (query !== '') {
                this.loading = true;
                this.getUser(query);
            } else {
                this.options = [];
            }
        },
        getUser(query){
            this.$ajax.get(
                this,
                this.$api.PRE_PAYMENT_USERS,
                {mark:query},
                (res)=>{
                    this.loading = false;
                    this.options =  res.data.content;
                    //this.options = 
                }
            )
        },
    }    
}
</script>
<style scoped>

</style>

