<template>
<div>
    <Alert show-icon>用途：会在下次新录房源时自动填充已配置的数据，大幅缩短录入时间！</Alert>
    <Tabs value="name1" name="tab-2c" :animated="false">
        <TabPane tab="tab-2c" label="租金相关设置" name="name1">
            <Row class="row-color">（注：调整后，只影响新录入的房源，不影响已录入的房源）</Row>
            <Row class="pL20 pT20">
                <Form ref="formData" :model="formData" :rules="formRule">
                    <Row class="mB10">默认收租日</Row>
                    <RadioGroup @on-change="radioChange" v-model="type" vertical>
                        <FormItem class="item-input">
                            <Radio label="1">
                                提前&nbsp;<Input v-model="number1" @on-blur="numberChange" :disabled="type != '1'"></Input>&nbsp;天收租
                            </Radio>
                        </FormItem>
                        <FormItem class="item-input">
                            <Radio label="2">
                                固定&nbsp;<Input v-model="number2" @on-blur="numberChange" :disabled="type != '2'"></Input>&nbsp;日收租（每期的第一个月）
                            </Radio>
                        </FormItem>
                        <FormItem class="item-input">
                            <Radio label="3">
                                固定&nbsp;<Input v-model="number3" @on-blur="numberChange" :disabled="type != '3'"></Input>&nbsp;日收租（每期提前一个月）
                            </Radio>
                        </FormItem>
                    </RadioGroup>
                    <Row class="mB10">默认收款方式</Row>
                    <Row class="row-line-height">
                        <Col span="2"><Button @click="addStyle" :disabled="formData.number1 !== undefined">添加</Button></Col>
                        <Col span="22" v-if="formData.number1 !== undefined">
                            <div class="item-div">付款方式</div>
                            <div class="item-div">付</div>
                            <FormItem class="item-inline" prop="number1">
                                <Select transfer v-model="formData.number1">
                                    <Option v-for="(item,index) in number1List" :key="index" :label="item.name" :value="item.value"></Option>
                                </Select>
                            </FormItem>
                            <div class="item-div">押</div>
                            <FormItem class="item-inline" prop="number2">
                                <Select transfer v-model="formData.number2">
                                    <Option v-for="(item,index) in number2List" :key="index" :label="item.name" :value="item.value"></Option>
                                </Select>
                            </FormItem>
                            <Icon color="#507bea" class="cursor-icon" @click="deleteStyle" size="24" type="ios-trash-outline" />
                        </Col>
                    </Row>
                    <Row class="mT20">
                        <Button type="primary" @click="saveMoney">保存</Button>
                    </Row>
                </Form>

            </Row>

        </TabPane>
        <TabPane tab="tab-2c" label="房源相关设置" name="name2">
            <!-- <Row class="row-color">（注：调整后，只影响新录入的房源，不影响已录入的房源）</Row> -->
            <Row class="mtb20 pL20">房源配置（整套房源拥有的配置信息）</Row>
            <Row class="pL20">
                <Col span="2">
                <!-- :disabled="setData.data.length>2" -->
                    <Button @click="addSetData">添加</Button>
                </Col>
                <Col span="22">
                    <Row v-for="(item,index) in setData.data" :key="index">
                        <Form ref="formValidate" label-position="left" :model="item" :rules="ruleValidate" :label-width="100">
                            <Col span="24" class="row-line-height">
                                <FormItem prop="configName" class="item-inline" :label="'配置'+(index+1)+'名称'">
                                    <Input :maxlength="5" v-model="item.configName"></Input>
                                </FormItem>
                                <Checkbox true-value="01" false-value="00" @on-change="isDefaultChange($event,index)" v-model="item.isDefault">设为默认</Checkbox>
                                <Icon color="#507bea" @click="deleteRow(index)" class="cursor-icon" size="24" type="ios-trash-outline" />
                            </Col>
                            <Col span="24" style="margin-top:10px;">
                                <!-- 配置组 -->
                                <FormItem prop="configResources">
                                    <Checkbox style="min-width:100px;" true-value="01" false-value="00" v-model="label.isChecked" v-for="(label,labelIndex) in item.configResources" :key="labelIndex">
                                        {{label.name}}
                                        <Icon color="#507bea" v-if="label.isDelete == '1'" class="cursor-icon" size="24" @click="deleteLabel(index,labelIndex)" type="ios-trash-outline" />
                                    </Checkbox>
                                    <!-- <Icon color="#507bea" class="cursor-icon" size="24" @click="addLabel(index)" type="md-add" /> -->
                                </FormItem>
                            </Col>
                        </Form>
                    </Row>
                </Col>
            </Row>
            <Row class="mT20 pL20">
                <Button type="primary" @click="saveSet">保存</Button>
            </Row>
            <!-- 新增配置名称 -->
            <Modal :mask-closable="false" v-model="addLabelShow" title="新增配置" @on-cancel="closeAddLabel">
                <Form ref="addLabelData" :model="addLabelData" :rules="addLabelRule" :label-width="80">
                    <FormItem label="名称" prop="name" class="ov-form-item">
                        <Input v-model="addLabelData.name"></Input>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="primary" ghost @click="closeAddLabel">取消</Button>
                    <Button @click="okAddLabel" type="primary">保存</Button>
                </div>
            </Modal>
        </TabPane>
    </Tabs>
</div>
</template>
<script>
export default {
    data(){
        const validateNumber1=(rule,value,callback)=>{
            if(this.formData.number1 === undefined){
                callback();
            }else{
                if(this.formData.number1 == ''){
                    callback(new Error('请输入'))
                }else{
                    callback();
                }
            }
        }
        const validateNumber2=(rule,value,callback)=>{
            if(this.formData.number2 === undefined){
                callback();
            }else{
                if(this.formData.number2 == ''){
                    callback(new Error('请输入'))
                }else{
                    callback();
                }
            }
        }
        // 检验是否选择了配置
        const validateLabel=(rule,value,callback)=>{
            let flag=false;
            value.forEach((e)=>{
                if(e.isChecked=='01'){
                    flag=true;
                }
            })
            if(flag){
                callback();
            }else{
                callback(new Error('请选择配置'))
            }
        }
        // 校验是否存在相同配置名称
        const validateConfigName=(rule,value,callback)=>{
            let index=0;
            this.setData.data.forEach((e)=>{
                if(e.configName == value){
                    index++;
                }
            })
            if(index > 1){
                callback(new Error('配置名称不能相同'))
            }else{
                callback();
            }
        }
        // 检验新增配置
        const validAddLabel=(rule,value,callback)=>{
            let flag=true;
            this.setData.data[this.addLabelIndex].configResources.forEach((e)=>{
                if(e.name == value){
                    flag=false;
                }
            })
            if(flag){
                callback();
            }else{
                callback(new Error('不可添加已有配置'))
            }
        }
        return{
            defaultList:[
                {
                    name:'WIFI',
                    isChecked:'00',
                    isDelete:'0',
                    sort:'1'
                },
                {
                    name:'空调',
                    isChecked:'00',
                    isDelete:'0',
                    sort:'2'
                },
                {
                    name:'热水器',
                    isChecked:'00',
                    isDelete:'0',
                    sort:'3'
                },
                {
                    name:'洗衣机',
                    isChecked:'00',
                    isDelete:'0',
                    sort:'4'
                },
                {
                    name:'冰箱',
                    isChecked:'00',
                    isDelete:'0',
                    sort:'4'
                },
                {
                    name:'电视',
                    isChecked:'00',
                    isDelete:'0',
                    sort:'5'
                },
                {
                    name:'微波炉',
                    isChecked:'00',
                    isDelete:'0',
                    sort:'6'
                },
                {
                    name:'燃气灶',
                    isChecked:'00',
                    isDelete:'0',
                    sort:'7'
                },
                {
                    name:'抽油烟机',
                    isChecked:'00',
                    isDelete:'0',
                    sort:'8'
                },
                {
                    name:'电磁炉',
                    isChecked:'00',
                    isDelete:'0',
                    sort:'9'
                },
                {
                    name:'床',
                    isChecked:'00',
                    isDelete:'0',
                    sort:'10'
                },
                {
                    name:'书桌',
                    isChecked:'00',
                    isDelete:'0',
                    sort:'11'
                },
                {
                    name:'衣柜',
                    isChecked:'00',
                    isDelete:'0',
                    sort:'12'
                },
                {
                    name:'沙发',
                    isChecked:'00',
                    isDelete:'0',
                    sort:'13'
                },
                {
                    name:'阳台',
                    isChecked:'00',
                    isDelete:'0',
                    sort:'14'
                }
            ],
            number1:'0',
            number2:'1',
            number3:'1',
            type:'',
            formData:{
            },
            formRule:{
                number1:[
                    { validator: validateNumber1, trigger: 'change' }
                ],
                number2:[
                    { validator: validateNumber2, trigger: 'change' }
                ]
            },
            style:{},
            number1List:[
                {
                    name:'一',
                    value:'1'
                },
                {
                    name:'二',
                    value:'2'
                },
                {
                    name:'三',
                    value:'3'
                },
                {
                    name:'四',
                    value:'4'
                },
                {
                    name:'五',
                    value:'1'
                },
                {
                    name:'六',
                    value:'6'
                },
                {
                    name:'七',
                    value:'7'
                },
                {
                    name:'八',
                    value:'8'
                },
                {
                    name:'九',
                    value:'9'
                },
                {
                    name:'十',
                    value:'10'
                },
                {
                    name:'十一',
                    value:'11'
                },
                {
                    name:'十二',
                    value:'12'
                }
            ],
            number2List:[
                {
                    name:'一',
                    value:'1'
                },
                {
                    name:'二',
                    value:'2'
                },
                {
                    name:'三',
                    value:'3'
                },
                {
                    name:'四',
                    value:'4'
                },
                {
                    name:'五',
                    value:'1'
                },
                {
                    name:'六',
                    value:'6'
                },
                {
                    name:'七',
                    value:'7'
                },
                {
                    name:'八',
                    value:'8'
                },
                {
                    name:'九',
                    value:'9'
                },
                {
                    name:'十',
                    value:'10'
                },
                {
                    name:'十一',
                    value:'11'
                },
                {
                    name:'十二',
                    value:'12'
                },{
                    name:'自定义',
                    value:'0'
                }
            ],
            // tab2
            setData:{
                data:[],
            },
            ruleValidate:{
                configName: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { validator: validateConfigName, trigger: 'blur' }
                ],
                configResources: [
                    { validator: validateLabel, trigger: 'change' }
                ],
            },
            setRule:{},
            addLabelIndex:-1,
            addLabelShow:false,
            addLabelData:{},
            addLabelRule:{
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { validator: validAddLabel, trigger: 'blur' }
                ],
            },
            id:'',
        }
    },
    methods:{
        radioChange(value){
            this.number1='0';
            this.number2='1';
            this.number3='1';
        },
        numberChange(){
            let pattern=/^([0-9]{1,})$/;
            if(this.type == ''){

            }else{
                if(this.type == '1'){
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
                }else if(this.type == '2'){
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
                }else if(this.type == '3'){
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
        addStyle(){
            this.$set(this.formData,'number1','');
            this.$set(this.formData,'number2','');
        },
        deleteStyle(){
            this.formData={};
        },
        // 保存按钮
        saveMoney(){
            if(this.formData.number1 !== undefined){
                this.$refs['formData'].validate((valid)=>{
                    if(!valid) return;
                    let params={};
                    if(this.type != ''){
                        params.type=this.type;
                    }
                    if(params.type == '1'){
                        params.date=this.number1;
                    }else if(params.type == '2'){
                        params.date=this.number2;
                    }else if(params.type == '3'){
                        params.date=this.number3;
                    }
                    params.deposit=this.formData.number2;
                    params.rent=this.formData.number1;
                    if(this.id !=''){
                        params.id=this.id;
                    }
                    this.toSaveMoney(params);
                })
            }else{
                let params={};
                if(this.type != ''){
                    params.type=this.type;
                }
                if(params.type == '1'){
                    params.date=this.number1;
                }else if(params.type == '2'){
                    params.date=this.number2;
                }else if(params.type == '3'){
                    params.date=this.number3;
                }
                if(this.id !=''){
                    params.id=this.id;
                }
                this.toSaveMoney(params);
            }
        },
        // 保存接口
        toSaveMoney(params){
            this.$ajax.post(
                this,
                this.$api.RENT_RELATED,
                params,
                (res)=>{
                    this.$Message.success('保存成功');
                    this.getRent();
                }
            )
        },
        // 查询租金相关
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
                    if(data==null || data ==''){
                        this.type='1';
                        this.number1='10';
                    }else{
                        if(data.type){
                            this.type=data.type;
                        }else{
                            this.type='';
                        }
                        if(this.type == '1'){
                            this.number1=data.date
                        }else if(this.type == '2'){
                            this.number2=data.date
                        }else if(this.type == '3'){
                            this.number3=data.date
                        }
                        if(data.deposit != null){
                            this.$set(this.formData,'number2',data.deposit);
                            this.$set(this.formData,'number1',data.rent);
                        }else{
                            delete this.formData.number1;
                            delete this.formData.number2;
                        }
                    }
                    if( data && data.id){
                        this.id=data.id;
                    }else{
                        this.id='';
                    }
                }
            )
        },
        // 第二个tab
        addSetData(){
            this.setData.data.push({
                configName:'',
                configResources:JSON.parse(JSON.stringify(this.defaultList)),
                isDefault:'00',
            })
        },
        // 删除配置
        deleteRow(index){
            this.setData.data.splice(index, 1);
        },
        // 房源配置保存
        saveSet(){
            let arr = [];
            this.$refs['formValidate'].forEach((item)=>{
                item.validate((valid)=>{
                    if (valid) {
                        arr.push(true);
                    } else {
                        arr.push(false);
                    }
                })
            })
            let flag=arr.every((item)=>{
                return item === true;
            })
            if(flag){
                let params=JSON.parse(JSON.stringify(this.setData.data));
                params.forEach((e,index)=>{
                    e.sort=index+1
                    delete e.createTime;
                    e.configResources.forEach((i)=>{
                        delete i.createTime;
                    })
                })
                this.$ajax.post(
                    this,
                    this.$api.HOUSE_CONFIG_POST,
                    params,
                    (res)=>{
                        this.$Message.success('保存成功');
                        this.getHouseConfig();
                    }
                )
            }else{
                // this.$Message.error('filed');
            }
        },
        // 添加配置按钮
        addLabel(index){
            this.addLabelIndex=index;
            this.addLabelShow=true;
        },
        // 默认值切换
        isDefaultChange(value,index){
            if(value == '01'){
                this.setData.data.forEach((item,itemIndex)=>{
                    if(itemIndex != index){
                        item.isDefault='00'
                    }
                })
            }
        },
        okAddLabel(){
            this.$refs['addLabelData'].validate((valid)=>{
                if(!valid) return;
                this.setData.data[this.addLabelIndex].configResources.push({
                    name:JSON.parse(JSON.stringify(this.addLabelData.name)),
                    isChecked:'00',
                    isDelete:'1',
                    sort:Number(this.setData.data[this.addLabelIndex].configResources[this.setData.data[this.addLabelIndex].configResources.length-1].sort)+1
                })
                this.closeAddLabel();
            })
        },
        deleteLabel(index,labelIndex){
            this.setData.data[index].configResources.splice(labelIndex,1)
        },
        closeAddLabel(){
            this.addLabelShow=false;
            this.$refs['addLabelData'].resetFields();
			delete this.addLabelData.name;
        },
        // 查询房源配置
        getHouseConfig(){
            this.$ajax.get(
                this,
                this.$api.HOUSE_CONFIG,
                {},(res)=>{
                    this.setData.data=[];
                    let data=res.data.content;

                    data.forEach((e)=>{
                        let source=[];
                        source=JSON.parse(e.resourceConfig);
                        delete e.resourceConfig
                        e.configResources=source;
                        e.configResources.sort(function(a,b){
                            let value1=a['sort'];
                            let value2=b['sort'];
                            return value1-value2;
                        })
                    })
                    // data.sort(function(a,b){
                    //     let value1=a['sort'];
                    //     let value2=b['sort'];
                    //     return value1-value2;
                    // })
                    this.setData.data=data;
                }
            )
        },
    },
    mounted(){
        this.getRent();
        this.getHouseConfig();
    }
}
</script>
<style scoped>
    .row-color{
        color: rgb(177, 177, 177);
        padding-left:20px;
    }
    .pL20{
        padding-left: 20px;
    }
    .pT20{
        padding-top: 20px;
    }
    .item-input .ivu-input-type{
        width: 100px;
    }
    .mB10{
        margin-bottom: 10px;
    }
    .item-inline{
        display: inline-block;
    }
    .item-inline .ivu-select{
        width: 100px;
    }
    .item-div{
        display: inline-block;
        margin:0px 10px;
    }
    .row-line-height{
        line-height: 37px;
        height: 37px;
    }
    .cursor-icon{
        cursor: pointer;
    }
    .mT20{
        margin-top: 20px;
    }
    .mtb20{
        margin:20px 0px;;
    }
    .set-form-item .ivu-input-type{
        width: 100px;
    }
</style>


