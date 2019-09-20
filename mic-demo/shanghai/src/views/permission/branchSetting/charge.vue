<template>
    <div class="root-charge"> 
        <Tabs :value="name" :animated="false">
            <TabPane label="微信商户号" name="name1">
                <Alert show-icon>
                    <ol style="margin-left:10px;">
                        <li>开通微信线上收款渠道，可实现租户端使用微信线上缴费</li>
                        <li>可维护多个微信收款商户号，用于收取不同类型的财务项目</li>
                        <li>修改后，对后续线上收款即时生效，对已发生的无效</li>
                    </ol>
                </Alert>
                <Form v-if="!editFlag" ref="wxData" :model="wxData" :rules="wxRule" :label-width="140" style="margin-top:10px;"> 
                    <FormItem style="margin-left:-100px;" prop="status">
                        <Checkbox v-model="wxData.status">开通微信线上收款渠道</Checkbox>
                    </FormItem>
                    <Row style="padding:0px 80px">
                        <Col span="8">
                            <FormItem prop="mchId" label="微信收款商户号">
                                <Input :disabled="mchIdFlag"  v-model="wxData.mchId" placeholder="请输入微信收款商户号"></Input>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem prop="apiKey" label="微信收款商户号Key">
                                <Input :disabled="apiKeyFlag"  v-model="wxData.apiKey" placeholder="请输入微信收款商户号Key"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style="padding:0px 80px">
                        <Col span="8">
                            <FormItem prop="appId1" label="App应用ID">
                                <Input :disabled="appId1Flag" v-model="wxData.appId1" placeholder="请输入App应用ID"></Input>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem prop="appId2" label="小程序应用ID">
                                <Input :disabled="appId2Flag" v-model="wxData.appId2" placeholder="请输入小程序应用ID"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row class="footer-center">
                        <Button @click="save('wxData')" type="primary">保存</Button>
                    </Row>
                </Form>
                <Form v-else ref="wxData" :model="wxData" :rules="wxRule" inline style="margin-top:10px;"> 
                    <FormItem prop="status">
                        <Checkbox v-model="wxData.status">开通微信线上收款渠道</Checkbox>
                    </FormItem>
                    <Button @click="save('wxData')" type="primary">保存</Button>
                </Form>
                <Divider />
                <Row v-if="tableShow" style="margin:10px;0px">
                    <Col span="12">
                        商户号
                    </Col>
                    <Col span="12" style="text-align:right;">
                        <Button type="primary" @click="addBtn" ghost size="small">添加商户号</Button>
                    </Col>
                </Row>
                <Table v-if="tableShow" border :data="businessData" :columns="col"></Table>
            </TabPane>
        </Tabs>
        <!-- 添加商户号 -->
        <Modal :mask-closable="false" @on-cancel="closeAdd" v-model="addShow" :title="addMessage.title">
            <Form ref="addData" :model="addData" :rules="addRule" :label-width="130">
                <FormItem prop="mchId" label="微信收款商户号">
                    <Input  v-model="addData.mchId" placeholder="请输入微信收款商户号"></Input>
                </FormItem>
                <FormItem prop="apiKey" label="微信收款商户号Key">
                    <Input  v-model="addData.apiKey" placeholder="请输入微信收款商户号Key"></Input>
                </FormItem>
                <FormItem prop="appId1" label="App应用ID">
                    <Input  v-model="addData.appId1" placeholder="请输入App应用ID"></Input>
                </FormItem>
                <FormItem prop="appId2" label="小程序应用ID">
                    <Input  v-model="addData.appId2" placeholder="请输入小程序应用ID"></Input>
                </FormItem>
                <FormItem class="ivu-form-item-required" v-if="addData.status === undefined" prop="merchantAcctList" label="账单项目">
                    <Select v-model="addData.merchantAcctList" @on-change="projectChange" multiple placeholder="请选择账单项目">
                        <Option v-for="(item,index) in feeTypeList" :key="index" :value="item.value" :label="item.label"></Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="closeAdd" ghost>取消</Button>
                <Button type="primary" @click="saveAdd('addData')">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
    data(){
        const validateIds=(rule,value,callback)=>{
            if(this.wxData.appId1 === '' && this.wxData.appId2 === ''){
                callback(new Error('请输入App应用ID或者小程序应用ID'));
            }else{
                callback();
            }
        }
        const validateAddIds=(rule,value,callback)=>{
            if(this.addData.appId1 === '' && this.addData.appId2 === ''){
                callback(new Error('请输入App应用ID或者小程序应用ID'));
            }else{
                callback();
            }
        }
        const validateMerchantAcctList=(rule,value,callback)=>{
            if(this.addData.merchantAcctList && this.addData.merchantAcctList.length>0){
                callback();
            }else{
                callback(new Error('请选择账单项目'))
            }
        }
        return {
            name:'name1',
            wxData:{
                mchId:'',
                apiKey:'',
                status:'0',
                appId1:'',
                appId2:''
            },
            wxRule:{
                mchId:[
                    { required: true, message: '请输入微信收款商户号', trigger: 'blur' }
                ],
                apiKey:[
                    { required: true, message: '请输入微信收款商户号Key', trigger: 'blur' }
                ],
                appId1:[
                    { validator: validateIds }
                ],
                appId2:[
                    { validator: validateIds }
                ]
            },
            tableShow:true,
            businessData:[],
            col:[
                {
                    title:'微信收款商户号',
                    // key:'mchId'
                    // minWidth:100,
                    render:(h,params)=>{
                        let arr=[];
                        // <Tag color="geekblue">geekblue</Tag>
                        arr.push(
                            h('span',{
                                style:{
                                    marginRight:'10px'
                                }
                            },params.row.mchId)
                        )
                        if(params.row.status){
                            arr.push(h('Tag',{
                                props:{
                                    color:'geekblue'
                                }
                            },'默认收款商户号'))
                        }
                        return arr;
                    }
                },
                {
                    title:'微信收款商户号Key',
                    key:'apiKey'
                },
                {
                    title:'应用IDS',
                    render:(h,params)=>{
                        let arr=[];
                        if(params.row.appId1 != '' && params.row.appId1 != null){
                            arr.push(h('div',{},
                                'App应用ID：'+params.row.appId1
                            ))
                        }
                        if(params.row.appId2 != '' && params.row.appId2 != null){
                            arr.push(h('div',{},
                                '小程序应用ID：'+params.row.appId2
                            ))
                        }
                        return arr;
                    }
                },
                {
                    title:'账单项目',
                    render:(h,params)=>{
                        if(params.row.status !== undefined){
                            return h('div','全部')
                        }else{
                            let all=params.row.merchantAcctList.map((e)=>{
                                return e.acctSignName
                            })
                            all=all.join('、');
                            return h('div',all);
                        }
                    }
                },
                {
                    title:'操作',
                    render:(h,params)=>{
                        let arr=[];
                        arr.push(
                            h('Button',{
                                props:{
                                    type:'primary',
                                    ghost:true
                                },
                                style:{
                                    marginRight:'10px'
                                },
                                on:{
                                    click:()=>{
                                        this.editBtn(params.row);
                                    }
                                }
                            },'修改')
                        )
                        if(params.row.status === undefined){
                            arr.push(
                                h('Button',{
                                    props:{
                                        type:'error',
                                        ghost:true
                                    },
                                    on:{
                                        click:()=>{
                                            this.delBtn(params.row)
                                        }
                                    }
                                },'删除')
                            )
                        }
                        return arr;
                    }
                }
            ],
            addShow:false,
            addData:{
                mchId:'',
                apiKey:'',
                appId1:'',
                appId2:'',
                merchantAcctList:[]
            },
            addRule:{
                mchId:[
                    { required: true, message: '请输入微信收款商户号', trigger: 'blur' }
                ],
                apiKey:[
                    { required: true, message: '请输入微信收款商户号Key', trigger: 'blur' }
                ],
                appId1:[
                    { validator: validateAddIds }
                ],
                appId2:[
                    { validator: validateAddIds }
                ],
                merchantAcctList:[
                    // { required: true,type:'array', message: '请选择账单项目', trigger: 'blur' },
                    { validator: validateMerchantAcctList }
                ]
            },
            addMessage:{
                title:'添加商户号'
            },
            feeTypeList:[],
            mchIdFlag:false,
            apiKeyFlag:false,
            appId1Flag:false,
            appId2Flag:false,
            editFlag:false,
        }
    },
    methods:{
        addBtn(){
            this.addMessage.title='新增商户号';
            this.addShow=true;
            delete this.addData.status;
        },
        closeAdd(){
            this.addShow=false;
            // this.addData.merchantAcctList=[];
            this.$refs['addData'].resetFields();
            if(this.addData.id) delete this.addData.id;
        },
        projectChange(){

        },
        // 默认保存按钮
        save(name){
            this.$refs[name].validate((valid)=>{
                if(!valid) return;
                let params=JSON.parse(JSON.stringify(this.wxData));
                let url,methods;
                if(params.id){
                    url=this.$api.MERCHANT+'/'+params.id;
                    delete params.id;
                    methods='put';
                }else{
                    url=this.$api.MERCHANT;
                    methods='post';
                }
                this.$ajax[methods](
                    this,
                    url,
                    params,
                    (res)=>{
                        this.$Message.success('保存成功');
                        this.closeAdd();
                        this.getList();
                    }
                )
            })
        },
        // modal保存按钮
        saveAdd(name){
            this.$refs[name].validate((valid)=>{
                if(!valid) return;
                let params=JSON.parse(JSON.stringify(this.addData));
                let flag=false;
                if(this.addData.merchantAcctList && this.addData.merchantAcctList.length>0){
                    this.addData.merchantAcctList.forEach((e)=>{
                        this.businessData.forEach((b)=>{
                            if(b.merchantAcctList){
                                b.merchantAcctList.forEach((item)=>{
                                    if(item.acctSign == e){
                                        if(params.id){
                                            if(params.id==b.id){

                                            }else{
                                                flag = true;
                                            }
                                        }else{
                                            flag=true;
                                        }
                                    }
                                })
                            }
                        })
                    })
                }
                if(flag){
                    this.$Message.error('已存在此账单项目的商户号，无法继续添加');
                    return;
                }else{
                    let nameFlag=false;
                    if(this.addData.id !== undefined){
                        this.businessData.forEach((e)=>{
                            if(e.mchId == this.addData.mchId && e.id != this.addData.id){
                                nameFlag=true;
                            }
                        })
                    }else{
                        this.businessData.forEach((e)=>{
                            this.businessData.forEach((e)=>{
                            if(e.mchId == this.addData.mchId){
                                    nameFlag=true;
                                }
                            })
                        })
                    }
                    if(nameFlag){
                        this.$Modal.confirm({
                            title: "提示",
                            content: "已存在此商户号，是否确认保存修改内容？",
                            okText: "确认",
                            cancelText: "取消",
                            onOk: () => {
                                delete params.merchantAcctList;
                                params.merchantAcctList=[];
                                this.feeTypeList.forEach((e)=>{
                                    this.addData.merchantAcctList.forEach((addItem)=>{
                                        if(addItem == e.value){
                                            params.merchantAcctList.push({
                                                acctSign:e.value,
                                                acctSignName:e.label
                                            })
                                        }
                                    })
                                })
                                let url,methods;
                                if(params.id){
                                    url=this.$api.MERCHANT+'/'+params.id;
                                    delete params.id;
                                    methods='put';
                                }else{
                                    url=this.$api.MERCHANT;
                                    methods='post';
                                }
                                this.$ajax[methods](
                                    this,
                                    url,
                                    params,
                                    (res)=>{
                                        this.$Message.success('保存成功');
                                        this.closeAdd();
                                        this.getList();
                                    }
                                )
                            }
                        })
                    }else{
                        delete params.merchantAcctList;
                        params.merchantAcctList=[];
                        if(this.addData.merchantAcctList && this.addData.merchantAcctList.length>0){
                            this.feeTypeList.forEach((e)=>{
                                this.addData.merchantAcctList.forEach((addItem)=>{
                                    if(addItem == e.value){
                                        params.merchantAcctList.push({
                                            acctSign:e.value,
                                            acctSignName:e.label
                                        })
                                    }
                                })
                            })
                        }
                        let url,methods,msg;
                        if(params.id){
                            url=this.$api.MERCHANT+'/'+params.id;
                            delete params.id;
                            methods='put';
                            msg='修改成功';
                        }else{
                            url=this.$api.MERCHANT;
                            methods='post';
                            msg="新增成功";
                        }
                        this.$ajax[methods](
                            this,
                            url,
                            params,
                            (res)=>{
                                this.$Message.success(msg);
                                this.closeAdd();
                                this.getList();
                            }
                        )
                    }   
                }
            })
        },
        editBtn(row){
            this.addMessage.title='修改商户号';
            let params=JSON.parse(JSON.stringify(row));
            if(params.merchantAcctList){
                delete params.merchantAcctList; 
                params.merchantAcctList=[];
            }
            if(row.merchantAcctList){
                row.merchantAcctList.forEach((e)=>{
                    params.merchantAcctList.push(e.acctSign)
                })
            }
            this.addData=JSON.parse(JSON.stringify(params));
            this.addShow=true;
        },
        delBtn(row){
            if(row.id){
                this.$Modal.confirm({
                    title: "提示",
                    content: "已存在此商户号，是否确认保存修改内容？",
                    okText: "确认",
                    cancelText: "取消",
                    onOk: () => {
                        this.$ajax.delete(
                            this,
                            this.$api.MERCHANT+'/'+row.id,
                            {},
                            res=>{
                                this.$Message.success('删除成功');
                                this.getList();
                            }
                        )
                    }
                })
            }
        },
        getList(){
            this.$ajax.get(
                this,
                this.$api.MERCHANT,
                {},
                (res)=>{
                    let data=res.data.content;
                    if(data.length == 0){
                        // this.mchIdFlag=false;
                        // this.apiKeyFlag=false;
                        // this.appId1Flag=false;
                        // this.appId2Flag=false;
                        this.editFlag=false;
                        this.tableShow=false;
                    }else{
                        this.editFlag=true;
                        let arr=[];
                        let flagIndex;
                        data.forEach((e,index)=>{
                            if(e.status !== undefined){
                                arr.push(e);
                                flagIndex=index;
                            }
                        })
                        data.splice(flagIndex,1);
                        let all=arr.concat(data);
                        this.tableShow=all[0].status;
                        // if(all[0].mchId != '' && all[0].mchId != null){
                        //     this.mchIdFlag=true;
                        // }
                        // if(all[0].apiKey != '' && all[0].apiKey != null){
                        //     this.apiKeyFlag=true;
                        // }
                        // if(all[0].appId1 != '' && all[0].appId1 != null){
                        //     this.appId1Flag=true;
                        // }
                        // if(all[0].appId2 != '' && all[0].appId2 != null){
                        //     this.appId2Flag=true;
                        // }
                        this.wxData=JSON.parse(JSON.stringify(all[0]));
                        this.businessData=JSON.parse(JSON.stringify(all));
                    }
                }
            )
        },
        getFeeTypeList() {
            this.$ajax.get(
                this,
                this.$api.GET_FEE_ALL,
                {},
                res => {
                    if(res.data.content instanceof Array){
                        this.changeStructure(res.data.content)
                    }
                }
            );
        },
        changeStructure(data){
            let all=[];
            const list = data.map(item => {
                const children = item.acctTypes.map(child => {
                    all.push({
                        value: child.id,
                        label: item.name+' / '+child.name,
                    })
                });         
            })
            this.feeTypeList = all;
        },
    },
    mounted(){
        this.getList();
        this.getFeeTypeList();//查询账单项目
    }
}
</script>
<style scoped>
    .root-charge{
        background-color: #fff;
        padding:20px;
    }
    .footer-center{
        text-align: center;
    }
</style>


