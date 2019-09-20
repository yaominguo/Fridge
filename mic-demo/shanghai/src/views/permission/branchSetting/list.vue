<template>
    <Card dis-hover>
        <Form ref="form"
            :model="searchData"
            label-position="right"
            :label-width="80"
        >
        <Row :gutter="16" class="ov-row">
            <Col span="6">
                <FormItem label="分店名称" class="ov-form-item">
                    <Input placeholder="请输入分店名称" v-model="searchData.storeName"></Input>
                </FormItem>
            </Col>
            <Col span="6">
                <Button type="primary" @click="getList">查询</Button>
                <Button type="primary" ghost @click="reset">重置</Button>
            </Col>
        </Row>
        </Form>
        <h3 class="ov-form-header">
            <span class="ov-form-header-title">
                查询结果
                <span class="ov-form-header-span">总共有 {{ tableData.length }} 家分店</span>
            </span>
            <Button type="primary" class="right-bth" :to="{name:'AddBranch'}">新增分店</Button>
        </h3>
        <Table class="branch-list" border :data="tableData" :columns="tableCol"></Table>
        <Row class="pager">
            <Page @on-change="changePage" :current="searchData.pageNo" :page-size="searchData.pageSize" :total="searchData.total" show-total />
        </Row>
    </Card>
</template>
<script>
export default {
    data(){
        return{
            // searchData:{},
            tableData:[],
            searchData:{
                pageNo: 1,
                pageSize: 10,
                total: 0,
                storeName:''
            },
            tableCol:[
                {
                    title:'序号',
                    render:(h,params)=>{
                        return h ('div',params.index+1)
                    }
                },
                {
                    title:'店面信息',
                    width:280,
                    render:(h,params)=>{
                        let picUrl;
                        let vm=this;
                        if(params.row.pic != null){
                            picUrl=params.row.pic;
                        }
                        return[
                            h('img',{
                                attrs:{
                                    src:picUrl
                                },
                                style:{
                                    display:'inline-block',
                                    width:'60px',
                                    height:'60px',
                                    margin:'14px 10px',
                                    float:'left'
                                }
                            }),
                            h('div',{
                                style:{
                                    display:'inline-block',
                                    borderLeft:'1px solid #e0e0e0',
                                    margin:'10px 0px',
                                    paddingLeft:'10px',
                                    float:'left',
                                    lineHeight:'20px'
                                }
                            },[
                                h('div',{
                                    style:{
                                        marginBottom:'5px',
                                        fontSize:'14px',
                                        fontWeight:'700'
                                    }
                                },params.row.storeName),
                                h('div','电话：'+this.$com.returnName(params.row.storePhone,'未填写')),
                                h('div','地址：'+this.$com.returnName(params.row.address,'未填写')),
                                h('div','开店时间：'+this.$com.strTime(params.row.createTime)),
                            ])
                        ]
                    }
                },
                {
                    title:'房源信息',
                    width:210,
                    render:(h,params)=>{
                        let arr=[];
                        if(params.row.houseCount.list1){
                             params.row.houseCount.list1.forEach((e)=>{
                                arr.push(
                                    h('div',{
                                        style:{
                                            margin:'5px 0px'
                                        }
                                    },[
                                        h('div',e.houseKindName+'：'),
                                        h('div','共'+e.count+'间，合计'+e.space+'㎡')
                                    ])
                                )
                            })
                        }
                        if(params.row.houseCount.list2){
                            let hCount=0;
                            let zCount=0;
                            let tCount=0;
                            params.row.houseCount.list2.forEach((e)=>{
                                if(e.buildType == '0' && e.leaseType == '0'){
                                    hCount=Number(hCount)+Number(e.count);
                                }
                                if(e.buildType == '0' && e.leaseType == '1'){
                                    zCount=Number(zCount)+Number(e.count);
                                }
                                if(e.buildType == '1' && e.leaseType == '1'){
                                    tCount=Number(tCount)+Number(e.count);
                                }
                            })
                            arr.push(
                                h('div',{
                                    style:{
                                        paddingTop:'10px',
                                        marginTop:'10px',
                                        borderTop:'1px solid #e0e0e0'
                                    }
                                },[
                                    h('div','分散式房源：'),
                                    h('div',{
                                        style:{
                                            marginBottom:'5px'
                                        }
                                    },'合租'+hCount+'间，整租'+zCount+'套'),
                                    h('div','集中式房源：'),
                                    h('div',tCount+'套')
                                ])
                            )
                        }
                        return arr;
                    }
                },
                {
                    title:'分店人员',
                    render:(h,params)=>{
                        let arr=[];
                        let index=0;
                        let numbers=params.row.staffNumber == null?'0':params.row.staffNumber;
                        if(params.row.roleCount != null){
                            params.row.roleCount.forEach((e)=>{
                                index=index+Number(e.count);
                                arr.push(
                                    h('div',e.roleName+'：'+e.count)
                                )
                            })
                        }
                        arr.unshift(
                            h('div',{
                                style:{
                                    borderBottom:'1px solid #e0e0e0',
                                    paddingBottom:'10px'
                                }
                            },'共'+numbers+'人')
                        )
                        return arr;
                    }
                },
                {
                    title:'账户及进鉴',
                    render:(h,params)=>{
                        // if(params.row.bankNo != null){
                            let arr=[];
                            if(params.row.terStatus == '0' || params.row.terStatus == null){
                                arr.push(
                                    h('div','收款账户：未开设'),
                                )
                            }else if(params.row.terStatus == '1'){
                                arr.push(
                                    h('div','收款账户：开设申请中'),
                                )
                            }else if(params.row.terStatus == '2'){
                                arr.push(
                                    h('div','收款账户：申请驳回'),
                                )
                            }else if(params.row.terStatus == '1'){
                                arr.push(
                                    h('div','收款账户：已开设'),
                                )
                            }
                            if(params.row.signStatus == '1'){
                                arr.push(
                                    h('div','电子签：已开设'),
                                )
                            }else{
                                arr.push(
                                    h('div','电子签：未开设'),
                                )
                            }
                            return arr;
                        // }
                    }
                },
                {
                    title:'门店状态',
                    render:(h,params)=>{
                        if(params.row.status == '1'){
                            return h('div','开启中')
                        }else{
                            return h('div','已关闭')
                        }
                    }
                },
                {
                    title:'操作',
                    render:(h,params)=>{
                        let arr=[];
                        arr.push(h('div',{
                            style:{
                                cursor:'pointer',
                                margin:'5px'
                            },
                            on:{
                                click:()=>{
                                    this.$router.push({
                                        name:'EditBranch',
                                        query:{
                                            id:params.row.id,
                                            storeType:params.row.storeType
                                        }
                                    })
                                }
                            }
                        },'编辑信息'));
                        arr.push(h('div',{
                            style:{
                                cursor:"pointer",
                                margin:'5px'
                            },
                            on:{
                                click:()=>{
                                    this.$router.push({
                                        name:'OrgFlatsList',
                                        storeId:params.row.id
                                    })
                                }
                            }
                        },'管理房源'));
                        arr.push(h('div',{
                            style:{
                                cursor:"pointer",
                                margin:'5px'
                            },
                            on:{
                                click:()=>{
                                    this.$router.push({
                                        name:'StaffManage',
                                        storeId:params.row.id
                                    })
                                }
                            }
                        },'管理员工'));
                        arr.push(h('div',{
                            style:{
                                cursor:"pointer",
                                margin:'5px'
                            },
                            on:{
                                click:()=>{
                                    this.$router.push({
                                        name:'Charge',
                                        storeId:params.row.id
                                    })
                                }
                            }
                        },'管理三方收费户'));
                        if(params.row.terStatus == '1' || params.row.terStatus == '4'){
                            arr.push(h('div',{
                                style:{
                                    cursor:"pointer",
                                    margin:'5px'
                                },
                                on:{
                                    click:()=>{
                                        this.$router.push({
                                            name:'ShowAccount',
                                            query:{
                                                id:params.row.id,
                                                storeType:params.row.storeType,
                                            }
                                        })
                                    }
                                }
                            },'查看账户'));
                        }else if(params.row.terStatus == '0' || params.row.terStatus == null){
                            arr.push(h('div',{
                                style:{
                                    cursor:'pointer',
                                    margin:'5px'
                                },
                                on:{
                                    click:()=>{
                                        this.$router.push({
                                            name:'BranchAccount',
                                            query:{
                                                id:params.row.id,
                                                storeType:params.row.storeType,
                                                parentId:params.row.parentId
                                            }
                                        })
                                    }
                                }
                            },'开设账户'));
                        }else if(params.row.terStatus == '2'){
                            arr.push(h('div',{
                                style:{
                                    cursor:'pointer',
                                    margin:'5px'
                                },
                                on:{
                                    click:()=>{
                                        this.$router.push({
                                            name:'BranchAccount',
                                            query:{
                                                id:params.row.id,
                                                storeType:params.row.storeType,
                                                type:'edit',
                                                parentId:params.row.parentId
                                            }
                                        })
                                    }
                                }
                            },'重新开设'));
                        }
                        if(params.row.signStatus == '1'){
                            arr.push(h('div',{
                                style:{
                                    cursor:'pointer',
                                    margin:'5px'
                                },
                                on:{
                                    click:()=>{
                                        this.$router.push({
                                            name:'ShowSign',
                                            query:{
                                                id:params.row.id,
                                                storeType:params.row.storeType
                                            }
                                        })
                                    }
                                }
                            },'查看电子签'));
                        }else{
                            arr.push(h('div',{
                                style:{
                                    cursor:'pointer',
                                    margin:'5px'
                                },
                                on:{
                                    click:()=>{
                                        this.$router.push({
                                            name:'AddSign',
                                            query:{
                                                id:params.row.id,
                                                storeType:params.row.storeType
                                            }
                                        })
                                    }
                                }
                            },'开设电子签'));
                        }
                        if(params.row.status == '1' && params.row.parentId != '0'){
                            arr.push(h('div',{
                                style:{
                                    cursor:'pointer',
                                    margin:'5px'
                                },
                                on:{
                                    click:()=>{
                                        this.closeStore(params.row);
                                    }
                                }
                            },'关闭分店'));
                        }else if(params.row.status != '1' && params.row.parentId != '0'){
                            arr.push(h('div',{
                                style:{
                                    cursor:'pointer',
                                    margin:'5px'
                                },
                                on:{
                                    click:()=>{
                                        this.openStore(params.row);
                                    }
                                }
                            },'开启分店'));
                        }
                        return h('div',{
                            style:{
                                color:'#65aaf3',
                                textAlign:'center'
                            }
                        },arr);
                    }
                }
            ]
        }
    },
    methods: {
        changePage(page) {
            this.searchData.pageNo = page;
            this.getList();
        },
        // 重置
        reset(){
            this.searchData={};
            this.getList();
        },
        getList(){
            let url;
            if(this.searchData.storeName && this.searchData.storeName != ''){
                url=this.$api.GET_STORES_LIST+'?storeName='+this.searchData.storeName;
            }else{
                url=this.$api.GET_STORES_LIST;
            }
            let params=JSON.parse(JSON.stringify(this.searchData));
            delete params.storeName;
            delete params.total;
            this.$ajax.get(
                this,
                url,
                params,
                (res)=>{
                    this.searchData.total=res.data.totalRows;
                    this.tableData=res.data.content;

                }
            )
        },
        // 开启分店
        openStore(params){
            let id = params.id;
            if(id){
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确定开启分店吗？</p>',
                    onOk: () => {
                        this.$ajax.put(
                        this,
                        this.$api.OPEN_STORE.replace('{id}',id),
                        {},
                        (res) => {
                            this.$Message.success('开启成功！');
                            this.getList();
                        }
                        )
                    },
                });
            }
        },
        // 关闭分店
        closeStore(params){
            let id = params.id;
            if(id){
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确定关闭分店吗？</p>',
                    onOk: () => {
                        this.$ajax.put(
                        this,
                        this.$api.CLOSE_STORE.replace('{id}',id),
                        {},
                        (res) => {
                            this.$Message.success('关闭成功！');
                            this.getList();
                        }
                        )
                    },
                });
            }
        },
    },
    mounted () {
        this.getList();
    }
}
</script>
<style>
    .branch-list .ivu-table-cell{
        padding:20px;
    }
</style>

<style scoped>
    .ov-form-item{
        font-weight: bold;
        font-size: 14px;
        text-align: left;
    }
    .ov-form-header {
        text-align: left;
        font-size: 16px;
        padding-bottom: 8px;
        margin-bottom: 16px;
    }
    .ov-form-header-icon, .ov-form-header-title {
        vertical-align: middle;
    }
    .ov-row{
        border-bottom: 1px solid #e0e0e0;
        margin-bottom: 20px;
    }
    .right-bth{
        float: right;
    }
    .ov-form-header-span{
        font-size: 12px;
    }
    .pager{
        margin: 20px;
        text-align: center;
    }
</style>


