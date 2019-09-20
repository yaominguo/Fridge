<template>
    <Card dis-hover>
        <h2 slot="title"></h2>
        <Row class="row-title">基本信息</Row>
        <Row class="padding-row">
            <Col span="12">
                <div class="item">
                    <label>付费人姓名</label>
                    <div class="item-content">
                        <span>{{formData.name}}</span>
                    </div>
                </div> 
            </Col>
            <Col span="12">
                <div class="item">
                    <label>使用状态</label>
                    <div class="item-content">
                        <span>{{formData.balance == '0'?'余额已用完':'使用中'}}</span>
                    </div>
                </div> 
            </Col>
        </Row>
        <Row class="padding-row">
            <Col span="12">
                <div class="item">
                    <label>付费总额</label>
                    <div class="item-content">
                        <span>{{formData.totalAmount}}</span>
                    </div>
                </div>
            </Col>
            <Col span="12">
                <div class="item">
                    <label>剩余可用金额</label>
                    <div class="item-content">
                        <span>{{formData.balance}}</span>
                    </div>
                </div>
            </Col>
            <!-- <Col span="12">
                <div class="item">
                    <label>付费方式</label>
                    <div class="item-content">
                        <span>{{formData.communityName}}</span>
                    </div>
                </div>
            </Col> -->
        </Row>
     <!--    <Row class="padding-row">
            <Col span="24">
                <div class="item">
                    <label>备注</label>
                    <div class="item-content">
                        <span>{{formData.address}}</span>
                    </div>
                </div>
            </Col>
        </Row> -->
        <Row class="row-title">付费记录</Row>
        <Table :data="formData.rechargeRecordList" :columns="historyColumns" border></Table>
        <Row class="row-title">抵扣记录</Row>
        <Table :data="formData.deductibleRecordList" :columns="columns" border></Table>
        <Row class="bottom-row">
            <Button type="primary" :to="{name:'normal-finance/prePayment'}">返回</Button>
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
            historyColumns:[
                {
                    title:'预付总额',
                    key:'amount',
                },
                {
                    title:"付费方式",
                    key:'channel',
                },
                {
                    title:"付费日期",
                    key:'createTime'
                },
                {
                    title:'备注',
                    key:'remark'
                }
            ],
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
                this.$api.PRE_PAYMENT_DETAIL.replace('{userId}',this.$route.query.userId),
                {},(res)=>{

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
