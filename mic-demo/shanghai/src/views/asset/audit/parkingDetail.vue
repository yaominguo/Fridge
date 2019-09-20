<template>
    <div class="parking-detail">
        <Row class="editTitle">
            停车位
        </Row>
        <Row :gutter="20">
            <Col span="3" class="col-left">停车位地址：</Col>
            <Col span="20">
                {{formData.address}}-{{formData.subarea}}-{{formData.parkNum}}
            </Col>
        </Row>
        <Row :gutter="20">
            <Col span="3" class="col-left">停车位编号：</Col>
            <Col span="6">
                {{formData.subarea}}-{{formData.parkNum}}
            </Col>
            <Col span="3" class="col-left">停车位类型：</Col>
            <Col span="6">
                {{formData._parkType}}
            </Col>
        </Row>
        <Row :gutter="20">
            <Col span="3" class="col-left">车位面积(m²)：</Col>
            <Col span="6">
                {{formData.parkArea}}
            </Col>
        </Row>
        <Row :gutter="20">
            <Col span="3" class="col-left">取得方式：</Col>
            <Col span="3">
                {{formData._acquireWay}}
            </Col>
            <Col span="3" class="col-left">出资人：</Col>
            <Col span="3">
                {{formData._contributor}}
            </Col>
            <Col span="3" class="col-left">用途：</Col>
            <Col span="3">
                {{formData._purpose}}
            </Col>
        </Row>
        <Divider dashed />
        <Row :gutter="20">
            <Col span="3" class="col-left">每小时单价（元）：</Col>
            <Col span="6">
                {{formData.hourRent}}
            </Col>
            <Col span="3" class="col-left">月租金（元）：</Col>
            <Col span="6">
                {{formData.monthRent}}
            </Col>
        </Row>
        <Row :gutter="20">
            <Col span="3" class="col-left">付款方式：</Col>
            <Col span="6">
                付{{formData.hourRent}}押{{formData._custodyNum}}
            </Col>
            <Col span="3" class="col-left">押金（元）：</Col>
            <Col span="6">
                {{formData.deposit}}
            </Col>
        </Row>
        <Row :gutter="20" v-if="formData._rentType">
            <Col span="3" class="col-left">收租日：</Col>
            <Col span="6">
                {{formData._rentType}}
            </Col>
        </Row>
        <Divider dashed />
        <Row class="editTitle">
            审批结果
        </Row>
        <Table border :data="result" class="table" :columns="col"></Table>
        <Row class="align-center marginTop20">
            <Button type="primary" :to="{name:'asset/audit',params:{tabs:'parking'}}" ghost>返回</Button>
            <Button type="primary" @click="approBtn">审核</Button>
        </Row>
        <Modal v-model="approShow" title="审批" :mask-closable="false" @on-cancel="cancelAppro">
            <Form ref="approData" :model="approData" :rules="approRule" :label-width="120">
                <FormItem prop="type" label="审批结果：">
                    <RadioGroup v-model="approData.type">
                        <Radio label="5">审批通过</Radio>
                        <Radio label="7">审批驳回</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem prop="reason" label="审批原因：">
                    <Input v-model="approData.reason" type="textarea" :rows="4" placeholder="请输入" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="cancelAppro" ghost>取消</Button>
                <Button type="primary" @click="saveAppro">提交</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
    data(){
        return{
            approShow:false,
            approData:{},
            approRule:{
                type:[
                     { required: true, message: '请选择', trigger: 'change' },
                ],
                reason:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ]
            },
            communityList:[],
            acquireWayList:[],
            contributorList:[],
            parkTypeList:[],
            result:[],
            col:[
                {
                    title:'审批结果',
                    key:'operationStatus'
                },
                {
                    title:'审批内容',
                    key:'auditReason'
                },
                {
                    title:'审批时间',
                    key:'time'
                }
            ],
            purposeList:[
                {label: '自用', value: '0'},
                {label: '出租', value: '1'},
                {label: '出售', value: '2'},
            ],
            formData:{}
        }
    },
    methods:{
        approBtn(row){
            this.approShow=true;
            this.approData.id=this.$route.query.id;
        },
        saveAppro(){
            this.$refs['approData'].validate((valid)=>{
                if(!valid) return;
                this.$ajax.put(
                    this,
                    this.$api.AUDITS_PARK_AUDIT.replace('{type}','1').replace('{id}',this.approData.id)
                    +'?status='+this.approData.type+'&reason='+this.approData.reason,
                    {
                        // resaon:this.approData.reason,
                        // status:this.approData.type
                    },
                    (res)=>{
                        this.$Message.success('提交成功');
                        this.cancelAppro();
                        this.$router.push({
                            name:'asset/audit',params:{tabs:'parking'}
                        })
                    }
                )
            })
        },
        cancelAppro(){
            this.approShow=false;
            this.$refs['approData'].resetFields();
        },
        getDetail(){
            this.$ajax.get(
                this,
                this.$api.AUDITS_PARK_DETAIL.replace('{id}',this.$route.query.id),
                {},
                (res)=>{
                    let data=res.data.content;
                    this.parkTypeList.forEach((p)=>{
                        if(p.id == data.parkType){
                            data._parkType=p.typeName;
                        }
                    })
                    this.acquireWayList.forEach((a)=>{
                        if(a.id == data.acquireWay){
                            data._acquireWay=a.name;
                        }
                    })
                    // contributorList
                    this.contributorList.forEach((c)=>{
                        if(c.id == data.contributor){
                            data._contributor=c.name;
                        }
                    })
                    this.purposeList.forEach((p)=>{
                        if(p.value == data.purpose){
                            data._purpose=p.label;
                        }
                    })
                    if(data.rentType){
                        if(data.rentType == '1'){
                            data._rentType='提前'+data.rentDay+'天收租'
                        }else if(data.rentType == '2'){
                            data._rentType='固定'+data.rentDay+'日收租（每期的第一个月）'
                        }else if(data.rentType == '3'){
                            data._rentType='固定'+data.rentDay+'日收租（每期提前一个月）'
                        }
                    }
                    if(data.custodyNum && data.custodyNum == '0'){
                        data._custodyNum='自定义';
                    }else{
                        data._custodyNum=data.custodyNum;
                    }
                    
                    if(data.operationStatus != null && data.operationStatus != '' && data.operationStatus != '待审批'){
                        this.result=[];
                        this.result.push({
                            operationStatus:data.operationStatus,
                            time:this.$com.strTime(data.operationTime),
                            auditReason:data.auditReason
                        })
                    }
                    
                    data.parkArea=data.parkArea==null || data.parkArea ==''?'无':data.parkArea;
                    data._acquireWay=data._acquireWay==null || data._acquireWay ==''?'无':data._acquireWay;
                    data._contributor=data._contributor==null || data._contributor ==''?'无':data._contributor;
                    data._purpose=data._purpose==null || data._purpose ==''?'无':data._purpose;
                    this.formData=data;
                }
            )
        },
        //小区列表
        getCommunity() {
            this.$ajax.get(
                this,
                this.$api.SEARCH_COMMUNITY + "?name=", {},
                res => {
                    this.communityList = res.data.content;
                    this.getAcquireWayList()
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
                    this.getContributorList()
                }
            )
        },
        // 获取出资人
        getContributorList(){
            this.$ajax.get(
                this,
                this.$api.ASSET_INVESTOR,
                {},
                (res)=>{
                    this.contributorList=res.data.content;
                    this.getParkTypeList()//车位类型
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
                    this.getDetail()
                }
            )
        },
    },
    mounted(){
        this.getCommunity()
    }
}
</script>
<style scoped>
    .parking-detail{
        background: #fff;
        padding:10px 20px;
        font-size: 14px;
    }
    .table{
        font-size: 14px;
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
    .col-left{
        text-align: right;
    }
    .marginTop20{
        margin-top: 20px;
    }
    .align-center{
        text-align: center;
    }
</style>
<style>
    .parking-detail .ivu-row{
        margin:10px 0px;
    }
</style>


