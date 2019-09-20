<template>
    <Card dis-hover>
        <Row class="padding-row">
            <Form 
                ref="form" 
                :v-model="searchData" 
                label-position="right"
                :label-width="100"
            >
            <Row :gutter="16" class="ov-row" type="flex" justify="end">
                <Col span="6">
                    <FormItem label="付费时间">
                        <DatePicker v-model="searchData.time" type="daterange" placeholder="请选择付费时间"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="付费人姓名">
                        <Input v-model="searchData.name" placeholder="请输入付费人姓名"></Input>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="付费方式">
                        <Select v-model="searchData.channel" clearable>
                            <Option value="现金">现金</Option>
                            <Option value="POS">POS</Option>
                            <Option value="微信">微信</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="6" style="margin-bottom:10px">
                    <Button type="primary" @click="getList">查询</Button>
                    <Button type="primary" ghost @click="reset">重置</Button>
                </Col>
            </Row>
            </Form>
            <h3 class="ov-form-header">
                <span class="ov-form-header-title">
                    <Button type="primary" @click="toAdd">登记预付费收款</Button>
                </span>
            </h3>
            <Table border :data="data" :columns="columns"></Table>
        </Row>
        <Row class="pager">
            <Page @on-change="changePage" :current="searchData.pageNo" :page-size="searchData.pageSize" :total="searchData.total" show-total />
        </Row>
    </Card>
</template>
<script>
export default {
    data(){
        return{
            searchData:{
                pageNo: 1,
                pageSize: 10,
                total: 0,
            },
            data:[],
            columns:[
                {
                    title:'租户姓名',
                    key:'name'
                },
                {
                    title:'付费总额',
                    key:'totalAmount'
                },
                {
                    title:'剩余可用金额',
                    key:'balance'
                },
                {
                    title:'付费次数',
                    key:'payTime'
                },
                {
                    title:'操作',
                    width:180,
                    fixed: 'right',
                    render:(h,params)=>{
                        return h('Button',{
                            props:{
                                type:'primary'
                            },
                            on:{
                                click:()=>{
                                    this.show(params.row)
                                }
                            }
                        },'查看')
                    }
                }
            ]
        }
    },
    methods:{
        toAdd(){
            this.$router.push({name:'normal-finance/prePayment/prePaymentAdd'})
        },
        getList(){
            let params=JSON.parse(JSON.stringify(this.searchData));
            params.startTime = params.time[0];
            params.endTime = params.time[1];
            delete params.time;
            delete params.total;
            for(let i in params){
                if(params[i] == ''){
                    delete params[i]
                }
            }
            this.$ajax.get(
                this,
                this.$api.PRE_PAYMENT_LIST,
                params,
                (res)=>{
                    this.searchData.total=res.data.totalRows;
                    this.data=res.data.content;
                }
            )
        },
        // 重置
        reset(){
            this.searchData={
                pageNo: 1,
                pageSize: 10,
                total: 0,
            };
            this.getList();
        },
        // 页数改变
        changePage(page) {
            this.searchData.pageNo = page;
            this.getList();
        },
        // 查看
        show(params){
            this.$router.push({
                name:'normal-finance/prePayment/prePaymentDetail',
                query:{
                    userId:params.userId
                }
            })
        }
    },
    mounted(){
        this.getList();
    }
}
</script>
<style scoped>
    .ov-row{
        border-bottom: 1px solid #e0e0e0;
        margin-bottom: 20px;
    }
    .padding-row{
        padding: 20px;
    }
    .pager{
        margin: 20px;
        text-align: center;
    }
    .ov-form-header-span{
        font-size: 12px;
    }
    .ov-form-header {
        text-align: left;
        font-size: 16px;
        padding-bottom: 8px;
        margin-bottom: 16px;
    }
</style>

