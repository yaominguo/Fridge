<template>
<div>
    <p class="title-color">1、记账本-记账本项目配置<Button type="primary" class="leftM20" @click="addPocketBtn" icon="md-add" ghost>添加记账本子项目</Button></p>
    <Row v-for="(item,nameIndex) in pocketBookData" :key="nameIndex" class="height-row">
        <div class="item">
            <label class="item-label">{{item.name}}</label>
            <Row class="item-content">
                <Col span="4" class="bottomM20" v-for="(checxLabel,index) in item.checkList" :key="index">
                    <Checkbox true-value='1' false-value='0' large v-model="checxLabel.status">
                        {{checxLabel.name}}
                    </Checkbox>
                    <Icon class="cursorP" v-if="checxLabel.id == null" @click="deleteLable(nameIndex,index)" color="#507bea" size="24" type="ios-trash-outline" />
                </Col>
            </Row>
        </div>
    </Row>
    <Row class="row-center">
        <Button type="primary" @click="save('pocketBook')">保存</Button>
    </Row>
    <p class="title-color">2、收款-收款方式设置<Button type="primary" class="leftM20" @click="addPaymentBtn" icon="md-add" ghost>添加金融方式</Button></p>
    <Row class="height-row" >
        <div class="item">
            <label class="item-label">金融方式</label>
            <Row class="item-content" type="flex" justify="start">
                <Col span="3" class="bottomM20" v-for="(type,index) in paymentData" :key="index">
                    {{type.name}}
                    <Icon class="cursorP" v-if="type.id === undefined" @click="deletePayMent(index)" color="#507bea" size="24" type="ios-trash-outline" />
                </Col>
            </Row>
        </div>
    </Row>
    <Row class="row-center">
        <Button type="primary" @click="savePayMent()">保存</Button>
    </Row>
    <!-- 添加记账本子项目Modal -->
    <Modal :mask-closable="false" title="添加账单子项目" v-model="addPocketShow" @on-cancel="close">
        <Form :label-width="100" ref="addPocket" :model="addPocket" :rules="addPocketRule" label-position="left">
            <Row>
                <Col span="16">
                    <FormItem label="子项目名称" prop="name">
                        <Input v-model="addPocket.name" :maxlength="10" placeholder="请输入子项目名称" />
                    </FormItem>
                </Col>
                <Col span="1">&nbsp;</Col>
                <Col span="7" class="alert-col">
                    <Icon type="md-alert" class="alert-icon" size="16" color="#f90" /><span  class="alert-span">最多输入10个字符</span>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <FormItem label="所属主项目" prop="parentId">
                        <Select v-model="addPocket.parentId" @on-change="parentIdChange" transfer placeholder="请选择主项目">
                            <Option v-for="(item,index) in pocketBookData" :key="index" :value="item.id" :label="item.name"></Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <Row slot="footer">
            <Button type="primary" @click="close" ghost>取消</Button>
            <Button type="primary" @click="okAddPocket">保存</Button>
        </Row>
    </Modal>
    <!-- 添加金融方式Modal -->
    <Modal :mask-closable="false" title="添加金融收款方式" v-model="addPaymentShow" @on-cancel="closeType">
        <Form :label-width="100" ref="addPayment" :model="addPayment" :rules="addPaymentRule">
            <Row>
                <Col span="16">
                    <FormItem label="名称" prop="name">
                        <Input v-model="addPayment.name" :maxlength="11"  placeholder="请输入金融产品名称" />
                    </FormItem>
                </Col>
                <Col span="1">&nbsp;</Col>
                <Col span="7" class="alert-col">
                    <Icon type="md-alert" class="alert-icon" size="16" color="#f90" /><span  class="alert-span">最多输入11个字符</span>
                </Col>
            </Row>
            <!-- <Alert type="warning" show-icon>* 添加后暂不可删除，请保证输入名称正确无误</Alert> -->
            <Row class="color-ccc leftM100">
                <Icon type="md-alert" class="alert-icon" size="16" color="#f90" /><span  class="alert-span">* 添加后暂不可删除，请保证输入名称正确无误</span>
            </Row>
        </Form>
        <Row slot="footer">
            <Button type="primary" @click="closeType" ghost>取消</Button>
            <Button @click="okAddPayment" type="primary">保存</Button>
        </Row>
    </Modal>
</div>
</template>
<script>
export default {
    data(){
        const validPocketName=(rule,value,callback)=>{
            //console.log(this.addPocket,this.pocketBookData);
            let params=[];
            let addData=JSON.parse(JSON.stringify(this.pocketBookData));
            // addData.forEach((e)=>{
            //     let tempObj=JSON.parse(JSON.stringify(e));
            //     delete tempObj.checkList;
            //     params.push(tempObj);
            //     if(e.checkList){
            //         e.checkList.forEach((c)=>{
            //             params.push(c)
            //         })
            //     }
            // })

            let flag=false;
            addData.forEach((e)=>{
                if(e.id == this.addPocket.parentId){
                    if(e.name == this.addPocket.name){
                        flag=true;
                    }else{
                        e.checkList.forEach((c)=>{
                            if(c.name == this.addPocket.name){
                                flag=true;
                            }
                        })
                    }
                }
            })
            // let flag=params.some((e)=>{
            //     return e.name == value;
            // })
            if(flag){
                // 添加子项目名称不能与主项目或子项目名称一致！
                callback(new Error('添加子项目名称不能与主项目或子项目名称一致！'));

            }else{
                callback();
            }
        }
        // 检验金融名称是否重复
        const validPaymentName=(rule,value,callback)=>{
            let flag=this.paymentData.some((e)=>{
                return e.name == value;
            })
            if(flag){
                callback(new Error('该金融产品已经存在！'));
            }else{
                callback();
            }
        }
        return{
            pocketBookData:[],
            paymentData:[],
            addPocketShow:false,
            addPocket:{},
            addPocketRule:{
                name:[
                    { required: true, message: '子账号名称不可为空', trigger: 'blur' },
                    {validator:validPocketName,trigger:'blur'},
                ],
                parentId:[
                    { required: true, message: '请选择主项目', trigger: 'change' },
                ]
            },
            addPaymentShow:false,
            addPayment:{},
            addPaymentRule:{
                name:[
                    { required: true, message: '请输入金融产品名称', trigger: 'blur' },
                    {validator:validPaymentName,trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        // 查询记账本配置列表
        getPocketBook(){
            this.$ajax.get(
                this,
                this.$api.POCKER_BOOK_LIST_GET,
                {},
                (res)=>{
                    this.toForMat(res.data.content);
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
                }
            )
        },
        // 整理记账本数据格式
        toForMat(data){
            let tempData=[];
            data.forEach((e)=>{
                if(e.parentId == '1'){
                    tempData.push(e);
                }
            });
            tempData.forEach((tempObj)=>{
                tempObj.checkList=[];
            })
            data.forEach((c)=>{
                if(c.parentId != '1' && c.parentId != null){
                    tempData.forEach((t)=>{
                        if(c.parentId == t.id){
                            t.checkList.push(c);
                        }
                    })
                }
            })
            this.pocketBookData=tempData;
        },
        // 保存记账本项目配置
        save(dataName){
            let params=[];
            this.pocketBookData.forEach((e)=>{
                let tempObj=JSON.parse(JSON.stringify(e));
                delete tempObj.checkList;
                params.push(tempObj);
                if(e.checkList){
                    e.checkList.forEach((c)=>{
                        params.push(c)
                    })
                }
            })
            params.forEach((p)=>{
                if(p.createTime){
                    delete p.createTime;
                }
            })
            this.$ajax.post(
                this,
                this.$api.POCKER_BOOK_EDIT_POST,
                {list:params},
                (res)=>{
                    this.$Message.success('保存成功');
                    this.getPocketBook();
                }
            )
        },
        // 添加记账本子项目按钮
        addPocketBtn(){
            this.addPocketRule.parentId=[
                    { required: true, message: '请选择主项目', trigger: 'change' },
                ]
            this.addPocketShow=true;
        },
        // 添加记账本子项目Modal确定按钮
        okAddPocket(){
            let params={};
            params=JSON.parse(JSON.stringify(this.addPocket))
            params.id=null;
            params.status='1'
            this.$refs['addPocket'].validate((valid)=>{
                if(!valid)return;
                this.pocketBookData.forEach((e)=>{
                    if(e.id == params.parentId){
                        e.checkList.push(JSON.parse(JSON.stringify(params)));
                        this.close();
                        return;
                    }
                })
            })
        },
        // 记账本子项目删除按钮
        deleteLable(nameIndex,index){
            this.$delete(this.pocketBookData[nameIndex].checkList,index);
        },
        // 添加金融方式按钮
        addPaymentBtn(){
            this.addPaymentShow=true;
        },
        // 添加金融方式Modal确定按钮
        okAddPayment(){
            this.$refs['addPayment'].validate((valid)=>{
                if(!valid)return;
                //console.log(this.addPayment);
                this.paymentData.push(JSON.parse(JSON.stringify(this.addPayment)));
                this.closeType();
            })
        },
        // 确认保存金融方式
        savePayMent(){
            let params=[];
            this.paymentData.forEach((e)=>{
                if(!e.id){
                    params.push(e)
                }
            })
            this.$ajax.post(
                this,
                this.$api.GET_PAY_METHODS_SAVE,
                params,
                (res)=>{
                    this.$Message.success('保存成功');
                    this.getPayMent();
                }
            )
        },
        deletePayMent(index){
            this.paymentData.splice(index,1);
        },
        close(){
            this.addPocket={};
            this.addPocketShow=false;
            this.$refs['addPocket'].resetFields();
            this.addPocketRule.parentId=[];
        },
        closeType(){
            this.addPayment={};
            this.addPaymentShow=false;
            delete this.addPocketRule.parentId;
            this.$refs['addPayment'].resetFields();
        },
        parentIdChange(){
            if(this.addPocket.parentId && this.addPocket.parentId != ''){
                this.$refs.addPocket.validateField('name')
            }
        }
    },
    mounted(){
        this.getPocketBook();
        this.getPayMent();
    },
    watch:{
        'addPayment.name':function(){
            if(this.addPayment.name){
                setTimeout(()=>{
                    this.addPayment.name=this.addPayment.name.replace(/(^\s*)/g, "");
                },100)
            }
        },
        'addPocket.name':function(){
            if(this.addPocket.name){
                setTimeout(()=>{
                    this.addPocket.name=this.addPocket.name.replace(/(^\s*)/g, "");
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
    .leftM20{
        margin-left: 20px;
    }
    .col-center{
        text-align: center;
    }
    .bottomM20{
        margin-bottom:20px;
    }
    .row-center{
        text-align: center;
        margin:20px;
    }
    .height-row{
        min-height: 69px;border-bottom: 1px dashed #ccc;
    }
    .item{
        vertical-align:top;zoom:1;position: relative;min-height: 69px;
        width: 100%;
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
    .color-ccc{
        /* color: #ccc; */
        margin-bottom: 10px;
    }
    .leftM100{
        margin-left: 100px;
    }
    .cursorP{
        cursor: pointer;
    }
    .alert-col{
        /* color: #f90; */
        position: relative;
    }
    .alert-icon{
        position: absolute;
        top: 6px;
    }
    .alert-span{
        position: absolute;
        top: 6px;
        left: 20px;
        /* color: #f90; */
    }
</style>

