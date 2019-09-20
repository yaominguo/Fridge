<template>
    <Card dis-hover>
        <Row class="row-title">配租信息</Row>
        <Row class="padding-row">
            <Col span="8">
                <div class="item">
                    <label>配租人姓名</label>
                    <div class="item-content">
                        <span>{{formData.rentUserName}}</span>
                    </div>
                </div> 
            </Col>
            <Col span="8">
                <div class="item">
                    <label>身份证</label>
                    <div class="item-content">
                        <span>{{formData.idCard}}</span>
                    </div>
                </div> 
            </Col>
            <Col span="8">
                <div class="item">
                    <label>联系电话</label>
                    <div class="item-content">
                        <span>{{formData.phone}}</span>
                    </div>
                </div>
            </Col>
        </Row>
        <Row class="padding-row">
            <Col span="8">
                <div class="item">
                    <label>家庭类型</label>
                    <div class="item-content">
                        <span>{{formData.famailType}}</span>
                    </div>
                </div>
            </Col>
        </Row>
        <Row class="row-title">配租房屋信息</Row>
        <Row class="padding-row">
            <Col span="8">
                <div class="item">
                    <label>所属区域</label>
                    <div class="item-content">
                        <span>{{formData.county}}</span>
                    </div>
                </div>
            </Col>
            <Col span="8">
                <div class="item">
                    <label>配租项目</label>
                    <div class="item-content">
                        <span>{{formData.rentHouseProject}}</span>
                    </div>
                </div>
            </Col>
            <Col span="8">
                <div class="item">
                    <label>配租房号</label>
                    <div class="item-content">
                        <span>{{formData.houseNo}}</span>
                    </div>
                </div>
            </Col>
            <Col span="8">
                <div class="item">
                    <label>配租房型</label>
                    <div class="item-content">
                        <span>{{formData.housingStructureName}}</span>
                    </div>
                </div>
            </Col>
        </Row>
        <Row class="padding-row">
            <Col span="8">
                <div class="item">
                    <label>入住有效期</label>
                    <div class="item-content">
                        <span>{{formData.effectiveDate}}~{{formData.expiredDate}}</span>
                    </div>
                </div>
            </Col>
            <Col span="8">
                <div class="item">
                    <label>配租状态</label>
                    <div class="item-content">
                        <span>{{formData._status}}</span>
                    </div>
                </div>
            </Col>
        </Row>
        <Row class="row-title">入住信息</Row>
        <Row class="padding-row">
            <Col span="8">
                <div class="item">
                    <label>办理入住日</label>
                    <div class="item-content">
                        <span>{{checkinDate}}</span>
                    </div>
                </div>
            </Col>
        </Row>
        <Row class="padding-row">
            <Col span="8">
                <div class="item">
                    <label>身份证证明</label>
                    <div class="item-content">
                        <img :src="item.picPath" style="width:60px;height:60px;" alt="" v-for="(item,index) in defaultList" :key="index">
                    </div>
                </div>
            </Col>
        </Row>
        <Row class="padding-row">
            <Col span="24">
                <div class="item">
                    <Row class="marginBT10">入住人清单</Row>
                    <div>
                        <Table border :data="list" :columns="columns"></Table>
                    </div>
                </div>
            </Col>
        </Row>
        <Row class="bottom-row">
            <Button type="primary" :to="{name:'publicHousing/billingList'}">返回</Button>
        </Row>
    </Card>
</template>
<script>
export default {
    data(){
        return{
            formData:{},
            checkinDate:'',
            defaultList:[],
            list:[],
            columns:[
                {
                    title:'入住人姓名',
                    key:'tenantName'
                },
                {
                    title:'身份证号',
                    key:'idCard'
                },
                {
                    title:'联系电话',
                    key:'phone'
                },
                {
                    title:'与配租人关系',
                    key:'relationWithAllocation'
                },
                {
                    title:'身份证明',
                    render:(h,params)=>{
                        let arr=[];
                        params.row.resourcePics.forEach((e)=>{
                            arr.push(
                                h('img',{
                                    attrs:{
                                        src:e.picPath
                                    },
                                    style:{
                                        width:'60px',
                                        height:'60px'
                                    }
                                })
                            )
                        })
                        return arr;
                    }
                },
            ]
        }
    },
    methods:{
        getDetail(){
            this.$ajax.get(
                this,
                this.$api.BILLING_DETAIL.replace('{id}',this.$route.query.id),
                {},(res)=>{
                    let data=res.data.content.allocationOfRent;

                    let date = new Date();
                    let year = date.getFullYear();
                    let month = date.getMonth() + 1;
                    let date2 = date.getDate();

                    let now=year+'-'+month+'-'+date2;
                    let m=new Date(now);
                    let e=new Date(data.expiredDate);

                    if(m.getTime() > e.getTime()){
                        data._status='已过期'
                    }else{
                        if(data.status == '0'){
                            data._status='未入住'
                        
                        }else if(data.status == '1'){
                            data._status='已入住'
                        }
                    }
                    this.formData=data;
                    let allData=res.data.content;
                    this.defaultList=allData.resourcePics == null ? [] :allData.resourcePics;
                    this.list=allData.list == null ? [] :allData.list;
                    this.checkinDate=allData.checkinDate;
                }
            )
        }
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
        font-size:12px;
        margin-left:130px;
        word-break:break-all;
    }
    .bottom-row{
        text-align: center;
        padding:20px 0px;
    }
</style>
