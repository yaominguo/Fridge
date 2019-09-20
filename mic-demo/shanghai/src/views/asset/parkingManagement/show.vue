<template>
    <div class="parking-detail">
        <Row class="editTitle">
            {{formData.address}}-{{formData.subarea}}-{{formData.parkNum}}
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
                付{{formData.payNum}}押{{formData._custodyNum}}
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

        <Row class="align-center marginTop20">
            <Button type="primary" :to="{name:'asset/parking'}">返回</Button>
        </Row>
    </div>
</template>
<script>
export default {
    data(){
        return{
            communityList:[],
            acquireWayList:[],
            contributorList:[],
            parkTypeList:[],
            purposeList:[
                {label: '自用', value: '0'},
                {label: '出租', value: '1'},
                {label: '出售', value: '2'},
            ],
            formData:{}
        }
    },
    methods:{
        getDetail(){
            this.$ajax.get(
                this,
                this.$api.PARKING_BY_ID.replace('{id}',this.$route.query.id),
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


