<style scoped>
    .item-list .ivu-row{
        margin-bottom: 10px;
    }
    .header{
        text-align: center;
        position: relative;

    }

    .card{
        background: #fffdf5;
        border: 1px solid #fff7e5;
        color: #646464;
        padding: 15px;
        margin-bottom: 15px;
    }
    .sNumber{
        position: absolute;
        top: 5px;
        left: 15px;
        color: #999;
    }
    .title{
        font-size: 20px;
        font-weight: 400;
    }
    .orange{
        color:#f56336;
    }

</style>
<template>
    <Modal 
      :mask-closable="false"
      v-model="modal"
      :closable="false"
    >
        <div class="header" slot="header">
            <span class="sNumber">{{detail.flowNo}}</span>
            <h3>交易详情</h3>
        </div>
        <Row class="card">
            <Col span="12">
               <span class="orange"  style="font-size: 24px;">{{detail.pee}}</span>
               <br> 
               <span>{{this.$com.inOroutText(detail.inOrOut)}}(元)</span>
            </Col>
            <Col span="12" style="font-size: 14px;">
                <span style="word-break: break-all;">{{this.$com.changeDate(detail.tradeTime)}}  {{this.$com.matchArray(detail.paymentChannel,this.payWayList,'id','name')}}</span>
                <br>
                <span>{{this.$com.roomAndPerson(detail)}}</span>
            </Col>
        </Row>
        <div class="item-list">
            <Row>
                <Col span="4">交易类型：</Col>
                <Col span="20">{{this.$com.feeText(detail.peeType)}}</Col>
            </Row>
            <Row>
                <Col span="4">交易项目：</Col>
                <Col span="20">{{detail.acctType}}</Col>
            </Row>
            <Row>
                <Col span="4">收款方：</Col>
                <Col span="20">{{detail.companyName}}</Col>
            </Row>
            <Row>
                <Col span="4">交易状态：</Col>
                <Col span="20">{{this.$com.statusTex(detail.isChecked )}}</Col>
            </Row>
            <Row>
                <Col span="4">凭证编号：</Col>
                <Col span="20">{{detail.orderNo}}</Col>
            </Row>
            <Row>
                <Col span="4">凭证图片：</Col>
                <Col span="20">无</Col>
            </Row>
            <Row>
                <Col span="4">备注：</Col>
                <Col span="20">{{detail.note}}</Col>
            </Row>
            <Row>
                <Col span="4">创建时间：</Col>
                <Col span="20">{{this.$com.changeDate(detail.createTime)}}</Col>
            </Row>
        </div>
        
        <div slot="footer">
            <Button v-if="!detail.isChecked" type="primary" size="large"  @click="check">核销</Button>
            <Button  size="large"   @click="cancel">取消</Button>
        </div>
    </Modal>
</template>
<script>
    export default {
        props: {
            detail: Object,
            modal:Boolean,
            payWayList:Array,
        },
        mounted(){
            //console.log(this.detail,this.modal)
        },
        methods:{
            check(){
                let singleObj ={
                    id:this.detail.id,
                    peeType:this.detail.peeType,
                    leaseId:this.detail.leaseId,
                    flowNo:this.detail.flowNo
                }
                this.$emit('check',{singleObj:singleObj,type:'single'})
            },
            cancel(){
                this.$emit('cancel')
            }
        }
    };
</script>
