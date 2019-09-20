<template>
    <Card dis-hover>
        <Form
            :model="formData"
            :ref="formData"
            label-position="right"
            :label-width="110"
            >
            <Card dis-hover :padding="0" class="margin-card">
                <Row class="row-title">企业信息</Row>
                <Row class="padding-row">
                    <Col span="8">
                        <div class="item">
                            <label>企业名称</label>
                            <div class="item-content">
                                <span>{{formData.busiName}}</span>
                            </div>
                        </div> 
                    </Col>
                    <Col span="8">
                        <div class="item">
                            <label>企业简称</label>
                            <div class="item-content">
                                <span>{{formData.merNameAlias}}</span>
                            </div>
                        </div> 
                    </Col>
                    <Col span="8">
                        <div class="item">
                            <label>公司所在省份</label>
                            <div class="item-content">
                                <span>{{formData.provinceName}}</span>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row class="padding-row">
                    <Col span="8">
                        <div class="item">
                            <label>公司所在城市</label>
                            <div class="item-content">
                                <span>{{formData.cityName}}</span>
                            </div>
                        </div>
                    </Col>
                    <Col span="8">
                        <div class="item">
                            <label>详细地址</label>
                            <div class="item-content">
                                <span>{{formData.address}}</span>
                            </div>
                        </div>
                    </Col>
                    <Col span="8">
                        <div class="item">
                            <label>客服电话</label>
                            <div class="item-content">
                                <span>{{formData.servicePhone}}</span>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row class="padding-row">
                    <Col span="8">
                        <div class="item">
                            <label>联系邮箱</label>
                            <div class="item-content">
                                <span>{{formData.contactEmail}}</span>
                            </div>
                        </div>
                    </Col>
                    <Col span="8">
                        <div class="item">
                            <label>联系电话</label>
                            <div class="item-content">
                                <span>{{formData.contactPhone}}</span>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row class="padding-row">
                    <Col span="8">
                        <div class="item">
                            <label>营业执照照片</label>
                            <div class="item-content">
                                <img class="img" :src="attr1" alt="">
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>
            <Card dis-hover :padding="0" class="margin-card">
                <Row class="row-title">法人信息</Row>
                <Row class="padding-row">
                    <Col span="8">
                        <div class="item">
                            <label>法人姓名</label>
                            <div class="item-content">
                                <span>{{formData.contactName}}</span>
                            </div>
                        </div>
                    </Col>
                    <Col span="8">
                        <div class="item">
                            <label>法人身份证号</label>
                            <div class="item-content">
                                <span>{{formData.cerdId}}</span>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <div class="item">
                            <label>身份证正面照片</label>
                            <div class="item-content">
                                <img class="img" :src="attr2" alt="">
                            </div>
                        </div>
                    </Col>
                    <Col span="8">
                        <div class="item">
                            <label>身份证反面照片</label>
                            <div class="item-content">
                                <img class="img" :src="attr3" alt="">
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>
            <Card dis-hover :padding="0" class="margin-card">
                <Row class="row-title">账户信息</Row>
                <Row class="padding-row">
                    <Col span="8">
                        <div class="item">
                            <label>结算账户开户名</label>
                            <div class="item-content">
                                <span>{{formData.cardName}}</span>
                            </div>
                        </div>
                    </Col>
                    <Col span="8">
                        <div class="item">
                            <label>结算账户账户号</label>
                            <div class="item-content">
                                <span>{{formData.cardNoCipher}}</span>
                            </div>
                        </div>
                    </Col>
                    <Col span="8">
                        <div class="item">
                            <label>是否对公账户</label>
                            <div class="item-content">
                                <span>{{formData.isCompay}}</span>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row class="padding-row">
                    <Col span="8">
                        <div class="item">
                            <label>开户支行名</label>
                            <div class="item-content">
                                <span>{{formData.merNameAlias}}</span>
                            </div>
                        </div>
                    </Col>
                    <Col span="8">
                        <div class="item">
                            <label>收款方式</label>
                            <div class="item-content">
                                <span>支付宝、微信、银联</span>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <div class="item">
                            <label>身份证反面照片</label>
                            <div class="item-content">
                                <img class="img" :src="attr4" alt="">
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>
        </Form>
        <Row class="bottom-row">
            <Button type="primary" :to="{name:'BranchList'}">返回</Button>
        </Row>
    </Card>
</template>
<script>
export default {
    data(){
        return{
            attr1:'',
            attr2:'',
            attr3:'',
            attr4:'',
            formData:{
                cityName:'',
                provinceName:''
            }
        }
    },
    methods: {
        getDetail(){
            this.$ajax.get(
                this,
                this.$api.REPORT_INFI.replace('{id}',this.$route.query.id),
                {},(res)=>{
                    //console.log(res);
                    this.formData=res.data.content;
                    this.attr1=this.formData.attrFile1;
                    this.attr2=this.formData.attrFile2;
                    this.attr3=this.formData.attrFile3;
                    this.attr4=this.formData.attrFile4;
                    this.getCity(this.formData.provinceId);
                    this.getProvince();
                }
            )
        },
        // 查询省份
        getProvince(){
            this.$ajax.get(
                this,
                this.$api.ALL_CITY_LIST.replace('{id}','1'),
                {},
                (res)=>{
                    let provinceList=res.data.content.data;
                    provinceList.forEach((e)=>{
                        if(e.id == this.formData.provinceId){
                            this.$set(this.formData,'provinceName',e.name)
                        }
                    })
                }
            )
        },
        // 查询地区
        getCity(id){
            this.$ajax.get(
                this,
                this.$api.ALL_CITY_LIST.replace('{id}',id),
                {},
                (res)=>{
                    let cityList=res.data.content.data;
                    cityList.forEach((e)=>{
                        if(e.id == this.formData.cityId){
                            this.$set(this.formData,'cityName',e.name)
                        }
                    })
                }
            )
        },
        provinceChange(id){
            this.getCity(id);
        }
    },
    mounted () {
        this.getDetail();
    }
}
</script>
<style>
    .padding-row{
        padding:0px 10px;
    }
    .row-title{
        border-bottom: 1px solid #e0e0e0;
        height: 37px;padding-left:16px;line-height: 37px;
        font-weight: bold;margin-bottom:20px;
    }
    .margin-card{
        margin-bottom:16px;
    }
    .bottom-row{
        text-align: center;
        padding:20px 0px;
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
    .img{
        width:150px;height:150px;
        cursor: pointer;
    }
</style>
