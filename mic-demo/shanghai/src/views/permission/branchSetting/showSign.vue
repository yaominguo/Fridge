<template>
    <Card dis-hover>
        <Card dis-hover :padding="0" class="margin-card">
            <Row class="padding-row padding-top-row" v-if="$route.query.storeType !='person'">
                <Col span="8">
                    <div class="item">
                        <label>公司名称</label>
                        <div class="item-content">
                            <span>{{formData.companyName}}</span>
                        </div>
                    </div> 
                </Col>
                <Col span="8">
                    <div class="item">
                        <label>注册地址</label>
                        <div class="item-content">
                            <span>{{formData.registerAddr}}</span>
                        </div>
                    </div> 
                </Col>
                <Col span="8">
                    <div class="item">
                        <label>营业执照号</label>
                        <div class="item-content">
                            <span>{{formData.certNo}}</span>
                        </div>
                    </div> 
                </Col>
            </Row>
            <Row class="padding-row" v-if="$route.query.storeType !='person'">
                <Col span="8">
                    <div class="item">
                        <label>法人姓名</label>
                        <div class="item-content">
                            <span>{{formData.realName}}</span>
                        </div>
                    </div> 
                </Col>
            </Row>

            <Row class="padding-row padding-top-row" v-if="$route.query.storeType =='person'">
                <Col span="8">
                    <div class="item">
                        <label>姓名</label>
                        <div class="item-content">
                            <span>{{formData.realName}}</span>
                        </div>
                    </div> 
                </Col>
                <Col span="8">
                    <div class="item">
                        <label>银行卡号</label>
                        <div class="item-content">
                            <span>{{formData.bankNo}}</span>
                        </div>
                    </div> 
                </Col>
                <Col span="8">
                    <div class="item">
                        <label>身份证号</label>
                        <div class="item-content">
                            <span>{{formData.certNo}}</span>
                        </div>
                    </div> 
                </Col>
            </Row>
            <Row v-if="$route.query.storeType =='person'">
                <Col span="8">
                    <div class="item">
                        <label>手机号</label>
                        <div class="item-content">
                            <span>{{formData.phone}}</span>
                        </div>
                    </div> 
                </Col>
            </Row>
            <Row class="bottom-row">
                <Button type="primary" :to="{name:'BranchList'}">返回</Button>
            </Row>
        </Card>
    </Card>
</template>
<script>
export default {
    data(){
        return{
            formData:{
                companyName:null,
                registerAddr:null,
                certNo:null,
                realName:null,
                bankNo:null
            }
        }
    },
    methods: {
        getDetail(){
            this.$ajax.get(
                this,
                this.$api.GET_STORE_DETAIL.replace('{id}',this.$route.query.id),
                {},
                (res)=>{
                    let data=res.data.content;
                    this.formData.companyName=data.companyName;
                    this.formData.registerAddr=data.registerAddr;
                    this.formData.certNo=data.certNo;
                    this.formData.realName=data.realName;
                    this.formData.bankNo=data.bankNo;
                }
            )
        },
    },
    mounted () {
        this.getDetail();
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

