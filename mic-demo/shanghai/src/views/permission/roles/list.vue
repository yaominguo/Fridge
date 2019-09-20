<template>
    <Card dis-hover>
        <Form ref="form" 
            :model="searchData"
            label-position="right"
            :label-width="80"
        >
            <Row :gutter="16" class="ov-row">
                <Col span="6">
                    <FormItem label="职位名称" class="ov-form-item">
                        <Input v-model="searchData.roleName"></Input>
                    </FormItem>
                </Col>
                <Col span="6">
                    <Button type="primary" @click="getRolesLists">查询</Button>
                    <Button type="primary" ghost @click="reset">重置</Button>
                </Col>
            </Row>
        </Form>
        <h3 class="ov-form-header">
            <span class="ov-form-header-title">
                查询结果
            </span>
        </h3>
        <Table :data="rolesLists" :columns="col"></Table>
    </Card>
</template>
<script>
export default {
    data(){
        return{
            corporationId:null,
            rolesLists:[],
            col:[
                {
                    title:'职位',
                    align:'center',
                    key:'roleName'
                },
                {
                    title:'权限',
                    align:'center'
                }
            ],
            searchData:{
                roleName:''
            }
        }
    },
    methods:{
        //角色列表
        getRolesLists() {
            this.$ajax.get(
                this,
                this.$api.GET_ALL_CHARACTER_LISTS.replace("{storeId}", this.corporationId), {},
                res => {
                    this.rolesLists = res.data.content!=null?res.data.content:[];
                    console.log(this.rolesLists);
                }
            );
        },
        // 查询个人信息
        getUserInfo(){
            this.$ajax.get(
                this,
                this.$api.GET_USER_INFO,{},
                (res)=>{
                    this.corporationId=res.data.content.corporationId;
                    this.getRolesLists();
                }
            )
        },
        // 重置
        reset(){
            this.searchData.roleName='';
            this.getRolesLists();
        },
    },
    mounted(){
        if(this.$store.state.userInfo && this.$store.state.userInfo.corporationId){
            this.corporationId=this.$store.state.userInfo.corporationId;
            this.getRolesLists();
        }else{
            this.getUserInfo();
        }
    }
}
</script>
<style scoped>
    .ov-row{
        border-bottom: 1px solid #e0e0e0;
        margin-bottom: 20px;
    }
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
    .ov-form-header-span{
        font-size: 12px;
    }
</style>

