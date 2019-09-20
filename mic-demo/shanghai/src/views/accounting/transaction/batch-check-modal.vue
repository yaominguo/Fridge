<style scoped>
    .header{
        text-align: center;
    }
</style>
<template>
    <Modal 
      :mask-closable="false"
      v-model="modal"
      :closable="false"
      :width='1000'
    >
        <div class="header" slot="header">
            <h3>批量核销</h3>
        </div>
        <Table :columns="columns" :data="data"></Table>
        <div slot="footer">
            <Button type="primary" size="large"  @click="check">核销</Button>
            <Button  size="large"   @click="cancel">取消</Button>
        </div>
    </Modal>
</template>
<script>
    export default {
        props: {
            data: Array,
            modal:Boolean,
        },
        data(){
            return {
                columns:[
                     {
                        title: '进出账',
                        //key: 'inOrOut',
                        align: 'center',
                        width:100,
                        render:(h,params)=>{
                            return h('div',this.$com.inOroutText(params.row.inOrOut))
                        },
                    },
                    {
                        title:'交易类型',
                        key:'peeType',
                        align:'center',
                        minWidth:100,
                        render:(h,params)=>{
                            return h('div',this.$com.feeText(params.row.peeType))
                        }
                    },
                    {
                        title:'金额',
                        key:'pee',
                        sortable: true,
                        align:'center',
                        minWidth:100,
                    },
                    {
                        title:'交易日期',
                        key:'tradeTime',
                        sortable:true,
                        align:'center',
                        width:120,
                        render:(h,params)=>{
                            return h('div',this.$com.changeDate(params.row.tradeTime))
                        }

                    },
                     {
                        title:'方式',
                        align:'center',
                        minWidth:100,
                        render:(h,params)=>{
                            return h('div',this.$com.matchArray(params.row.paymentChannel,this.payWayList,'id','name'))
                        }
                    },
                     {
                        title:'房源',
                        key:'roomName',
                        align:'center',
                        minWidth:120,
                    },
                    {
                        title:'交易人',
                        key:'realName',
                        align:'center',
                        minWidth:100,
                    },
                ],
            }
        },
        mounted(){
        },
        methods:{
            batchArray(){
                
                return this.data.map(item=>{
                    return{
                        id:item.id,
                        peeType:item.peeType,
                        leaseId:item.leaseId
                    }                    
                })
            },

            check(){
                let batchArray = this.batchArray();
                //console.log(batchArray)
                if(batchArray.length<1){
                    this.$emit('check',{type:'close'})
                }else{
                    this.$emit('check',{type:'batch',batchArray:batchArray})    
                }
                
            },
            cancel(){
                this.$emit('cancel')
            }
        }
    };
</script>
