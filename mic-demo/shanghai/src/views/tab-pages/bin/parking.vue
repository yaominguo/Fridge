<template>
    <div>
        <Form ref="searchData"
            :model="searchData"
            label-position="right"
            :label-width="90"
        >
        <Row :gutter="16">
            <Col span="6">
                <FormItem label="所属项目" class="ov-form-item" prop="projectId_in">
                    <Select clearable placeholder="请选择" v-model="searchData.projectId_in" @on-change="projectChange">
                        <Option v-for="item in projectList" :key="item.id" :value="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>
            </Col>
            <Col span="6">
                <FormItem label="所属小区" class="ov-form-item" prop="villageId">
                    <Select clearable placeholder="请选择" v-model="searchData.villageId">
                        <Option v-for="item in communityList" :key="item.id" :value="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>
            </Col>
            <Col span="6">
                <FormItem label="车位编号" class="ov-form-item" prop="number_l">
                    <Input placeholder="请输入" v-model="searchData.number_l"></Input>
                </FormItem>
            </Col>
            <Col span="6">
                <FormItem label="车位类型" class="ov-form-item" prop="parkType">
                    <Select clearable placeholder="请选择" v-model="searchData.parkType">
                        <Option v-for="item in parkTypeList" v-if="item.isChecked == '1'" :key="item.id" :value="item.id" :label="item.typeName"></Option>
                    </Select>
                </FormItem>
            </Col>
        </Row>
        <Row :gutter="16">
            <Col span="6">
                <FormItem label="是否运营" class="ov-form-item" prop="isOperate">
                    <Select clearable placeholder="请选择" v-model="searchData.isOperate">
                        <Option v-for="item in isOperateList" :key="item.value" :value="item.value" :label="item.label"></Option>
                    </Select>
                </FormItem>
            </Col>
            <Col span="6">
                <FormItem label="用途" class="ov-form-item" prop="purpose">
                    <Select clearable placeholder="请选择" v-model="searchData.purpose">
                        <Option v-for="item in purposeList" :key="item.value" :value="item.value" :label="item.label"></Option>
                    </Select>
                </FormItem>
            </Col>
            <Col span="6">
                <FormItem label="取得方式" class="ov-form-item" prop="acquireWay">
                    <Select clearable placeholder="请选择" v-model="searchData.acquireWay">
                        <Option v-for="item in acquireWayList" :key="item.id" :value="item.id" :label="item.name"></Option>
                    </Select>
                </FormItem>
            </Col>
            <Col span="6">
                <FormItem label="出资人" class="ov-form-item" prop="contributor">
                    <Select clearable placeholder="请选择" v-model="searchData.contributor">
                        <Option v-for="item in contributorList" :key="item.id" :value="item.id" :label="item.name"></Option>
                    </Select>
                </FormItem>
            </Col>
        </Row>
        <!-- <Row type="flex" :gutter="16">
            <Col span="6">
                <FormItem label="是否盘点" class="ov-form-item" prop="isChecked">
                    <Select clearable placeholder="请选择" v-model="searchData.isChecked">
                        <Option v-for="item in isCheckedList" :key="item.value" :value="item.value" :label="item.label"></Option>
                    </Select>
                </FormItem>
            </Col>
            <Col span="6">
                <FormItem label="盘点年份" class="ov-form-item" prop="checkDate">
                    <DatePicker type="year" v-model="searchData.checkDate" placeholder="请选择"></DatePicker>
                </FormItem>
            </Col>
            <Col span="6">
                <FormItem label="地址" class="ov-form-item" prop="address_l">
                    <Input placeholder="请输入" v-model="searchData.address_l"></Input>
                </FormItem>
            </Col>
            <Col span="6">
                <FormItem label="审批状态" class="ov-form-item" prop="checkStatus">
                    <Select clearable placeholder="请选择" v-model="searchData.checkStatus">
                        <Option v-for="item in statusList" :key="item.value" :value="item.value" :label="item.label"></Option>
                    </Select>
                </FormItem>
            </Col>
        </Row> -->
        <Row :gutter="16" type="flex" justify="space-between">
            <Col span="6">
                <FormItem label="作废原因" class="ov-form-item"  prop="reason">
                    <Select v-model="searchData.reason">
                        <Option value="信息填写错误">信息填写错误</Option>
                        <Option value="划转">划转</Option>
                        <Option value="出售">出售</Option>
                        <Option value="拆除">拆除</Option>
                    </Select>
                </FormItem>
            </Col>
            <Col span="6" class="algin-right">
                <Button type="primary" style="min-width:86px;" @click="getList">查询</Button>
                <Button type="default" style="min-width:86px;" @click="reset">重置</Button>
            </Col>
        </Row>
        <ActiveTable 
            :showTitle="true"
            :columns="col"
            :data="data"
            :pageSize="searchData.pageSize"
            :current="searchData.pageNo"
            :total="total"
            @on-page-change="changePage"
        />
        <!-- <Divider />
        <Table :data="data" :columns="col"></Table>
        <Row class="pager">
            <Page @on-change="changePage" :current="searchData.pageNo" :page-size="searchData.pageSize" :total="total" show-total />
        </Row> -->
        </Form>
    </div>
</template>
<script>
import ActiveTable from '@/components/Helper/Table/ActiveTable';
export default {
    components: {
        ActiveTable,
    },
    data(){
        return{
            projectList:[],
            communityList:[],
            searchData:{
                pageNo: 1,
                pageSize: 10,
                operationStatus:'全部',
                dataStatus:'2'
            },
            total: 0,
            data:[],
            parkTypeList:[],
            isOperateList:[
                {label:'是', value:'1'},
                {label:'否', value:'0'}
            ],
            purposeList:[
                {label: '自用', value: '0'},
                {label: '出租', value: '1'},
                {label: '出售', value: '2'},
            ],
            acquireWayList:[],
            contributorList:[],
            isCheckedList:[
                {label:'是', value:'1'},
                {label:'否', value:'0'}
            ],
            col:[
                {
                    title:'车位编号',
                    width:140,
                    fixed: 'left',
                    render:(h,params)=>{
                        return h('div',{},
                            params.row.number
                        )
                    }
                },
                {
                    title:'车位地址',
                    width:280,
                    render:(h,params)=>{
                        return h('div',{},
                            params.row.address+'-'+params.row.subarea+'-'+params.row.parkNum
                        )
                    }
                },
                {
                    title:'车位类型',
                    minWidth:120,
                    key:'_parkType'
                },
                {
                    title:'资产信息',
                    width:220,
                    render:(h,params)=>{
                        return h('div',{
                            style:{
                                padding:'10px 0px'
                            }
                        }, [
                            // assetNum
                            h('p','编号：'+this.$com.editNull(params.row.assetNum)),
                            h('p','用途：'+this.$com.editNull(params.row._purpose)),
                            h('p','取得方式：'+this.$com.editNull(params.row._acquireWay)),
                            h('p','出资人：'+this.$com.editNull(params.row._contributor))
                        ])
                    }
                },
                {
                    title:'车位面积(m²)',
                    width:120,
                    key:'parkArea'
                },
                {
                    title:'价格',
                    width:180,
                    render:(h,params)=>{
                        return [
                            h('p','每小时单价（元）：'+params.row.hourRent),
                            h('p','月租金（元）：'+params.row.monthRent),
                        ]
                    }
                },
                // {
                //     title:'盘点信息',
                //     render:(h,params)=>{
                //         return [
                //             h('p',params.row.isChecked =='1'?'是否盘点：是':'是否盘点：否'),
                //             h('p','盘点年份：'+this.$com.editNull(params.row.checkDate))
                //         ]
                //     }
                // },
                // {
                //     title:'运营状态',
                //     render:(h,params)=>{
                //         return [
                //             h('p',params.row.isOperate == '1'?'已运营':'未运营')
                //         ]
                //     }
                // },
                {
                    title:'作废原因',
                    width:120,
                    key:'reason'
                },
                {
                    title:'备注说明',
                    width:120,
                    key:'marks'
                },
                {
                    title:'操作',
                    width:120,
                    fixed: 'right',
                    render:(h,params)=>{
                        let show=h('Button',{
                                props:{
                                    type:'primary',
                                    size:'small'
                                },
                                on:{
                                    click:()=>{
                                        this.show(params.row);
                                    }
                                }
                            },'还原');
                        return show;
                    }
                }
            ]
        }
    },
    methods:{
        show(row){
            if(row.id){
                this.$Modal.confirm({
					title: "提示",
					content: "确认还原车位 "+row.address+row.number+' ？',
					okText: "确认",
					cancelText: "取消",
					onOk: () => {
						this.$ajax.put(
							this,
							this.$api.PARK_REDUCITON.replace("{id}", row.id), {},
							(res) => {
								this.$Message.success("还原成功！");
								this.getList();
							}
						)
					}
				})
            }
        },
       // 查询项目列表
        getProjcetList(){
            return this.$ajax.get(
                this,
                this.$api.PROJECT_ALL_WITH_COMMUNITY,
                {},
                (res) => {
                    this.projectList = res.data.content;
                },
            )
        },
        projectChange(value){
            this.communityList=[];
            if(this.searchData.villageId){
                delete this.searchData.villageId
            }
            if(value){
                this.projectList.forEach((e)=>{
                    if(e.id == value){
                        this.communityList=e.communities
                    }
                })
            }
        },
        // 获取取得方式
        getAcquireWayList(){
            this.$ajax.get(
                this,
                this.$api.ASSET_METHOD,
                {},
                (res)=>{
                    this.acquireWayList=res.data.content;
                }
            )
        },
        // ASSET_INVESTOR
        // 获取出资人
        getContributorList(){
            this.$ajax.get(
                this,
                this.$api.ASSET_INVESTOR,
                {},
                (res)=>{
                    this.contributorList=res.data.content;
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
                }
            )
        },
        getList(){
            let params=JSON.parse(JSON.stringify(this.searchData));
            for(let i in params){
                if(params[i] == ''){delete params[i]}
                if(params[i] == '全部'){delete params[i]}
            }
            this.$ajax.get(
                this,
                this.$api.PARKING_BATCH_LIST,
                params,
                (res)=>{
                    this.total=res.data.totalRows;
                    let data=res.data.content == null?[]:res.data.content;
                    
                    data.forEach((e)=>{
                        this.parkTypeList.forEach((p)=>{
                            if(p.id == e.parkType){
                                e._parkType=p.typeName;
                            }
                        })
                        this.acquireWayList.forEach((a)=>{
                            if(a.id == e.acquireWay){
                                e._acquireWay=a.name;
                            }
                        })
                        // contributorList
                        this.contributorList.forEach((c)=>{
                            if(c.id == e.contributor){
                                e._contributor=c.name;
                            }
                        })
                        this.purposeList.forEach((p)=>{
                            if(p.value == e.purpose){
                                e._purpose=p.label;
                            }
                        })
                    })
                    this.data=data;
                }
            )
        },
        changePage(page) {
            this.searchData.pageNo = page;
            this.getList();
        },
        reset(){
            this.$refs['searchData'].resetFields();
            this.communityList=[];
            this.searchData.pageNo=1;
            this.searchData.pageSize=10;
            this.searchData.operationStatus='全部';
            this.searchData.dataStatus='2';
            this.getList();
        },
    },
    mounted(){
        Promise.all(
            [
                this.getProjcetList(), 
                this.getAcquireWayList(),
                this.getContributorList(),
                this.getParkTypeList(),//车位类型
                
        ]
        ).then((result) => {
            this.getList()
        }).catch((error) => {
            console.log(error)
        })
    }
}
</script>
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
    .algin-right{
        text-align: right;
    }
    .pager{
        margin: 20px;
        text-align: center;
    }
</style>

