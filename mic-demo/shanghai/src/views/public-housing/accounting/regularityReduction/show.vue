<template>
    <Card dis-hover>
        <Row class="row-title">基本信息</Row>
        <Row class="padding-row">
            <Col span="12">
                <div class="item">
                    <label>申请人姓名</label>
                    <div class="item-content">
                        <span>{{formData.name}}</span>
                    </div>
                </div> 
            </Col>
            <Col span="12">
                <div class="item">
                    <label>申请人身份证号码</label>
                    <div class="item-content">
                        <span>{{formData.idCard}}</span>
                    </div>
                </div> 
            </Col>
        </Row>
        <Row class="padding-row">
            <Col span="12">
                <div class="item">
                    <label>项目</label>
                    <div class="item-content">
                        <span>{{formData.projectName}}</span>
                    </div>
                </div>
            </Col>
            <Col span="12">
                <div class="item">
                    <label>公寓/小区</label>
                    <div class="item-content">
                        <span>{{formData.communityName}}</span>
                    </div>
                </div>
            </Col>
        </Row>
        <Row class="padding-row">
            <Col span="24">
                <div class="item">
                    <label>入住人地址</label>
                    <div class="item-content">
                        <span>{{formData.address}}</span>
                    </div>
                </div>
            </Col>
        </Row>
        <Row class="padding-row">
            <Col span="12">
                <div class="item">
                    <label>建筑面积</label>
                    <div class="item-content">
                        <span>{{formData.buildArea}}</span>
                    </div>
                </div>
            </Col>
        </Row>
        <Row class="row-title">年度政策减免信息</Row>
        <Row class="padding-row">
            <Col span="12">
                <div class="item">
                    <label>入住人数</label>
                    <div class="item-content">
                        <span>未确认字段</span>
                    </div>
                </div>
            </Col>
            <Col span="12">
                <div class="item">
                    <label>年度入住日期</label>
                    <div class="item-content">
                        <span>{{formData.checkInTime}}</span>
                    </div>
                </div>
            </Col>
            <Col span="12">
                <div class="item">
                    <label>计租月数</label>
                    <div class="item-content">
                        <span>{{formData.rentalMonth}}</span>
                    </div>
                </div>
            </Col>
            <Col span="12">
                <div class="item">
                    <label>核减年度</label>
                    <div class="item-content">
                        <span>{{formData.year}}</span>
                    </div>
                </div>
            </Col>
            <Col span="12">
                <div class="item">
                    <label>获得核减金额</label>
                    <div class="item-content">
                        <span>{{formData.annualSubtraction}}</span>
                    </div>
                </div>
            </Col>
            <Col span="12">
                <div class="item">
                    <label>剩余核减金额</label>
                    <div class="item-content">
                        <span>{{Number(formData.annualSubtraction)-Number(formData.actualAnnualRelief)}}</span>
                    </div>
                </div>
            </Col>
        </Row>
        <Row class="row-title">抵扣记录</Row>
        <Table :data="formData.recordList" :columns="columns" border></Table>
        <Row class="bottom-row">
            <Button type="primary" :to="{name:'publicHousing/RegularityReduction'}">返回</Button>
        </Row>
    </Card>
</template>
<script>
export default {
    data(){
        return{
            formData:{
                record:[]
            },
            columns:[
                {
                    title:'租约地址',
                    key:'houseName'
                },
                {
                    title:'租约始末',
                    render:(h,params)=>{
                        return h('div',{},
                        this.$com.strTime(params.row.leaseStartTime)+'~'+this.$com.strTime(params.row.leaseEndTime)
                        )
                    }
                },
                {
                    title:'扣抵收缴期',
                    render:(h,params)=>{
                        return h('div',{},
                        this.$com.strTime(params.row.acctDetailStartTime)+'~'+this.$com.strTime(params.row.acctDetailEndTime)
                        )
                    }
                },
                {
                    title:'租约月租',
                    key:'receivable'
                },
                {
                    title:'抵扣金额',
                    key:'deductible'
                },
                {
                    title:'抵扣日期',
                    key:'createTime',
                    render:(h,params)=>{
                        return h('div',{},this.$com.strTime(params.row.createTime))
                    }
                },
                {
                    title:'操作',
                    render:(h,params)=>{
                        return h('Button',{
                            props:{
                                type:'primary'
                            },
                            on:{
                                click:()=>{
                                    this.$router.push(
                                        {
                                            name:'public-housing-contract-detail',
                                            params:{
                                                leaseId: params.row.leaseId,
                                                houseId: params.row.houseId,
                                                roomId:params.row.roomId,
                                                fromAccount: '0',
                                            }
                                        }
                                    )
                                }
                            }
                        },'查看租约')
                    }
                }
            ]
        }
    },
    methods:{
        getDetail(){
            this.$ajax.get(
                this,
                this.$api.REGULARITY_REDUCTION_DETAIL.replace('{id}',this.$route.query.id),
                {},(res)=>{
                    //console.log(res);
                    this.formData=res.data.content;
                }
            )
        },
    },
    mounted(){
        this.getDetail();
    }
}
</script>
<style scoped>
    .marginBT10{
        margin:10px 0px;
    }
    .padding-row{
        padding:0px 10px;
    }
    .row-title{
        border-bottom: 1px solid #e0e0e0;
        height: 37px;padding-left:16px;line-height: 37px;
        font-weight: bold;margin-bottom:20px;
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
    .bottom-row{
        text-align: center;
        padding:20px 0px;
    }
</style>
