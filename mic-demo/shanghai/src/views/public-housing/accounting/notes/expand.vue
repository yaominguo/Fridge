<style scoped>
    div .ivu-row{
        margin-bottom: 10px;
    }
    .imgStyle{
        width: 50px;
        height: 50px;
        margin: 5px 5px;
    }
    .btns{
        overflow:hidden;
    }
    .btns li{
        list-style:none;
        float: left;
        margin-left: 5px;
    }
</style>
<template>
    <div>
        <Row>
            <Col span="12">
                <Row>
                    <Col>
                        <span class="expand-key">记账信息: </span>
                        <span class="expand-value">{{ row.userName+' '+row.createTime+'创建'}}</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <span class="expand-key">核销信息: </span>
                        <span class="expand-value">{{ row.checkStatus == '0' ?'未核销' : '已核销' }}</span>
                    </Col>
                </Row>
               <!--  <Row v-if="row.check_status == '1'">
                   <Col>
                       <span class="expand-key">核销原因: </span>
                       <span class="expand-value">{{row.check_reason}}</span>
                   </Col>
               </Row> -->
                <Row>
                    <Col>
                        <span class="expand-key">编号: </span>
                        <span class="expand-value">{{ row.documentNumber }}</span>
                    </Col>
                </Row>
            </Col>

            <Col span="12">
                <Row>
                    <Col>
                       <span class="expand-key">记账备注: </span>
                        <span class="expand-value">{{ row.note }}</span>
                    </Col>
                </Row>
                 <Row>
                    <Col>
                        <span class="expand-key">作废信息: </span>
                        <span class="expand-value">{{ row.flag == '1' ?'未作废' : '已作废' }}</span>
                    </Col>
                </Row>
                <Row v-if="row.flag == '0'">
                    <Col>
                        <span class="expand-key">作废原因: </span>
                        <span class="expand-value">{{row.cancleReason}}</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <span style="vertical-align: top;" >照片凭证: </span>
                        <span v-if="row.resourcePics.length<=0">无</span>
                        <div v-else style="display: inline-block;">
                            <img class="imgStyle"  v-for="item in row.resourcePics" :src="item.picPath" >
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
        <!-- 未作废 || 未核销  -->
        <ul class="btns" v-if="row.flag == '1' || row.checkStatus == '0'">
            <li  v-if="row.type!='0'&&row.type!='2' && row.status =='0'">
                <Button type="primary" @click="affirm">{{row.type=="1"?'确认收款':'确认付款'}}</Button>
            </li>
            <li v-if="row.status =='0'">
                <Button type="primary" @click="edit">编辑</Button>
            </li>
            <li>
                <Button type="error" @click="cancel">作废</Button>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {

        props: {
            row: Object,
            payList:Array,
        },
        mounted(){
        },
        methods:{
            affirm(){
                this.$emit('affirm',this.row)
            },
            edit(){
                let data = JSON.parse(JSON.stringify(this.row));
                this.$emit('edit',data)
            },
            cancel(){
                this.$emit('cancel',this.row)
            },
            check(){
                this.$emit('check',this.row)
            }
        }
    };
</script>
