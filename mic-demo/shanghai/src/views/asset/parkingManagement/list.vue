<template>
    <Card dis-hover>
        <Form ref="searchData"
            :model="searchData"
            label-position="right"
            :label-width="80"
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
        <Row type="flex" :gutter="16">
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
                <FormItem label="状态" class="ov-form-item" prop="checkStatus">
                    <Select clearable placeholder="请选择" v-model="searchData.checkStatus">
                        <Option v-for="item in statusList" :key="item.value" :value="item.value" :label="item.label"></Option>
                    </Select>
                </FormItem>
            </Col>
        </Row>
        <Row type="flex" justify="end" :gutter="10">
            <Col>
                <Button style="min-width:86px;" type="primary" @click="getList">查询</Button>

            </Col>
            <Col>
                <Button style="min-width:86px;" type="default" @click="reset">重置</Button>
            </col>
            <Col>
                <Button icon="md-add" type="primary" @click="add('adds')">批量新增停车位</Button>
            </col>
            <Col>
                <Button icon="md-add" type="primary" @click="add('add')">单条新增停车位</Button>
            </col>
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
        <Table border :data="data" :columns="col"></Table>
        <Row class="pager">
            <Page @on-change="changePage" :current="searchData.pageNo" :page-size="searchData.pageSize" :total="total" show-total />
        </Row> -->
        </Form>
        <Modal title="作废" v-model="obsoleteShow" :mask-closable="false" @on-cancel="cancelobsolete">
            <Form ref="obsoleteData" :model="obsoleteData" :rules="obsoleteRule" :label-width="120">
                <FormItem label="作废原因" prop="reason">
                    <Select v-model="obsoleteData.reason">
                        <Option value="信息填写错误">信息填写错误</Option>
                        <Option value="划转">划转</Option>
                        <Option value="出售">出售</Option>
                        <Option value="拆除">拆除</Option>
                    </Select>
                </FormItem>
                <FormItem label="备注" prop="marks">
                    <Input type="textarea" v-model="obsoleteData.marks"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" ghost @click="cancelobsolete">取消</Button>
                <Button type="primary" @click="saveObsolete">提交</Button>
            </div>
        </Modal>
    </Card>
</template>
<script>
import ActiveTable from '@/components/Helper/Table/ActiveTable';
export default {
    components: {
        ActiveTable,
    },
    data(){
        return{
            // 作废
            obsoleteShow:false,
            obsoleteData:{
                marks:''
            },
            obsoleteRule:{
                reason: [{
                    required: true,
                    message: "请选择作废原因",
                }]
            },

            projectList:[],
            communityList:[],
            searchData:{
                pageNo: 1,
                pageSize: 10,
                dataStatus_in:'0,1'
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
            statusList:[
                {label:'草稿',value:'0'},
                {label:'新增审批中',value:'1'},
                {label:'修改审批中',value:'2'},
                {label:'作废审批中',value:'3'},
                {label:'提交运营审批中',value:'4'},
                {label:'审核通过',value:'5'},
                // {label:'审核撤回',value:'6'},
                {label:'审核驳回',value:'7'},
                {label:'撤回运营审批中',value:'8'},
            ],
            col:[
                {
                    title:'车位编号',
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
                    key:'_parkType'
                },
                {
                    title:'资产信息',
                    width:140,
                    render:(h,params)=>{
                        return h('div',{
                            style:{
                                padding:'10px 0px'
                            }
                        },[
                            h('p','用途：'+this.$com.editNull(params.row._purpose)),
                            h('p','取得方式：'+this.$com.editNull(params.row._acquireWay)),
                            h('p','出资人：'+this.$com.editNull(params.row._contributor))
                        ])
                    }
                },
                {
                    title:'盘点信息',
                    render:(h,params)=>{
                        return [
                            h('p',params.row.isChecked =='1'?'是否盘点：是':'是否盘点：否'),
                            h('p','盘点年份：'+this.$com.editNull(params.row.checkDate))
                        ]
                    }
                },
                {
                    title:'运营状态',
                    render:(h,params)=>{
                        return [
                            h('p',params.row.isOperate == '1'?'已运营':'未运营')
                        ]
                    }
                },
                {
                    title:'状态',
                    render:(h,params)=>{
                        let status='';
                        this.statusList.forEach((e)=>{
                            if(e.value == params.row.checkStatus){
                                status=e.label;
                            }
                        })
                        return h('div',status)
                    }
                },
                {
                    title:'操作',
                    render:(h,params)=>{
                        let edit=h('a',{
                            props:{
                                type:'primary'
                            },
                            style:{
                                margin:'0px 5px'
                            },
                            on:{
                                click:()=>{
                                    this.edit(params.row)
                                }
                            }
                        },'修改');
                        let addApproval=h('a',{
                            props:{
                                type:'primary'
                            },
                            on:{
                                click:()=>{
                                    this.addApproval(params.row);
                                }
                            },
                        },'新增审批');
                        let del=h('a',{
                            props:{
                                type:'error'
                            },
                            style:{
                                margin:'0px 5px'
                            },
                            on:{
                                click:()=>{
                                    this.deleteRow(params.row)
                                }
                            }
                        },'删除');
                        let withdrawAddApproval=h('a',{
                            props:{
                                type:'primary',
                                size:'small'
                            },
                            on:{
                                click:()=>{
                                    this.widthdrawApproval(params.row,'撤回新增审批')
                                }
                            }
                        },'撤回新增审批');
                        let withdrawEditApproval=h('a',{
                            props:{
                                type:'primary',
                                size:'small'
                            },
                            on:{
                                click:()=>{
                                    this.widthdrawApproval(params.row,'撤回修改审批')
                                }
                            }
                        },'撤回修改审批');
                        let withdrawObsoleteApproval=h('a',{
                            props:{
                                type:'primary',
                                size:'small'
                            },
                            on:{
                                click:()=>{
                                    this.widthdrawApproval(params.row,'撤回作废审批')
                                }
                            }
                        },'撤回作废审批');
                        let withdrawOperationApproval=h('a',{
                            props:{
                                type:'primary',
                                size:'small'
                            },
                            on:{
                                click:()=>{
                                    this.widthdrawApproval(params.row,'取消提交运营审批')
                                }
                            }
                        },'取消提交运营审批');
                        let Obsolete=h('a',{
                            props:{
                                type:'error'
                            },
                            style:{
                                margin:'0px 5px'
                            }, 
                            on:{
                                click:()=>{
                                    this.Obsolete(params.row)
                                }
                            } 
                        },'作废');
                        let withdrawOperation=h('a',{
                            props:{
                                type:'primary',
                            },
                            on:{
                                click:()=>{
                                    this.drawOperation(params.row)
                                }
                            }
                        },'撤回运营');
                        let qxWithdrawOperation=h('a',{
                            props:{
                                type:'primary',
                            },
                            on:{
                                click:()=>{
                                    this.widthdrawApproval(params.row,'取消撤回运营审批')
                                }
                            }
                        },'取消撤回运营审批');
                        
                        let addOperation=h('a',{
                            on:{
                                click:()=>{
                                    this.addOperation(params.row)
                                }
                            }
                        },'提交运营');
                        let show=h('a',{
                            on:{
                                click:()=>{
                                    this.show(params.row);
                                }
                            }
                        },'查看')
                        let status=params.row.checkStatus;
                        let arr=[];
                        if(status == '0'){
                            arr=[edit,addApproval,del,show]
                        }else if(status == '1'){
                            arr=[withdrawAddApproval,show]
                        }else if(status == '2'){
                            arr= [withdrawEditApproval,show]
                        }else if(status == '3'){
                            arr= [withdrawObsoleteApproval,show]
                        }else if(status == '4'){
                            arr= [withdrawOperationApproval,show]
                        }else if(status == '5'){
                            if(params.row.isOperate == '1'){
                                arr= [edit,Obsolete,withdrawOperation,show]
                            }else{
                                arr=[edit,Obsolete,addOperation,show]
                            }
                        }else if(status == '7'){
                            if(params.row.dataStatus == '0'){
                                arr=[edit,addApproval,del,show]
                            }else if(params.row.dataStatus == '1'){
                                if(params.row.isOperate == '1'){
                                    arr=[edit,Obsolete,withdrawOperation,show]
                                }else{
                                    arr=[edit,Obsolete,addOperation,show]
                                }
                            }
                        }else if(status == '8'){
                            arr= [qxWithdrawOperation,show]
                        }

                        if(arr.length>1){
                            const arrs = arr.map(item => {
                                return h('DropdownItem', [item]);
                            })
                            return h('div', [
                                h('Dropdown',
                                {
                                    props: {
                                    transfer: true,
                                    }
                                },
                                [
                                    h('Button', {
                                    props: {
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px',
                                    },
                                    }, '更多'),
                                    h('DropdownMenu',{
                                    slot: 'list',
                                    style: {
                                        textAlign: 'center',
                                    },
                                    }, arrs)
                                ])
                            ])
                        }else{
                            return arr;
                        }
                    }
                }
            ]
        }
    },
    methods:{
        show(row){
            this.$router.push({
                name:'parking/show',
                query:{
                    id:row.id
                }
            })
        },
        edit(row){
            this.$router.push({
                name:'parking/edit',
                query:{
                    id:row.id
                }
            })
        },
        saveObsolete(){
            this.$refs.obsoleteData.validate((valid)=>{
                if(!valid) return;
                this.$ajax.put(
                    this,
                    this.$api.PARKING_CANCEL_PUT.replace("{id}", this.obsoleteData.id)+
                    '?reason='+this.obsoleteData.reason+'&marks='+this.obsoleteData.marks, 
                    {
                        // reason:this.obsoleteData.reason,
                        // marks:this.obsoleteData.marks
                    },
                    (res) => {
                        this.$Message.success("提交作废成功！");
                        this.cancelobsolete();
                        this.getList();
                    }
                )
            })
        },
        cancelobsolete(){
            this.obsoleteShow=false;
            this.$refs['obsoleteData'].resetFields();
        },
        // 删除
        deleteRow(row){
            if(row.id){
                this.$Modal.confirm({
					title: "提示",
					content: "确认删除车位编号 "+row.number+' ？',
					okText: "确认",
					cancelText: "取消",
					onOk: () => {
						this.$ajax.delete(
							this,
							this.$api.PARKING_BY_ID.replace("{id}", row.id), {},
							(res) => {
								this.$Message.success("删除成功！");
								this.getList();
							}
						)
					}
				})
            }
        },
        // 新增审批 
        addApproval(row){
            if(row.id){
                this.$Modal.confirm({
					title: "提示",
					content: "确认新增审批车位 "+row.address+row.number+' ？',
					okText: "确认",
					cancelText: "取消",
					onOk: () => {
						this.$ajax.put(
							this,
							this.$api.PARKING_CHECK_PUT.replace("{id}", row.id), {},
							(res) => {
								this.$Message.success("提交新增审批成功！");
								this.getList();
							}
						)
					}
				})
            }
        },
        // 撤回审批
        widthdrawApproval(row,type){
            if(row.id){
                this.$Modal.confirm({
					title: "提示",
					content: "确认对车位 "+row.address+row.number+' '+type+'？',
					okText: "确认",
					cancelText: "取消",
					onOk: () => {
						this.$ajax.put(
							this,
							this.$api.PARGING_WIDTHDRAW.replace("{id}", row.id), {},
							(res) => {
								this.$Message.success("操作成功");
								this.getList();
							}
						)
					}
				})
            }
        },
        // 提交运营
        addOperation(row){
            if(row.id){
                this.$Modal.confirm({
					title: "提示",
					content: "确认提交运营车位 "+row.address+row.number+' ？',
					okText: "确认",
					cancelText: "取消",
					onOk: () => {
						this.$ajax.put(
							this,
							this.$api.PARGING_SUB_OPRAATE.replace("{id}", row.id), {},
							(res) => {
								this.$Message.success("提交运营成功！");
								this.getList();
							}
						)
					}
				})
            }
        },
        // 撤回运营
        drawOperation(row){
            if(row.id){
                this.$Modal.confirm({
					title: "提示",
					content: "确认撤回运营车位 "+row.address+row.number+' ？',
					okText: "确认",
					cancelText: "取消",
					onOk: () => {
						this.$ajax.put(
							this,
							this.$api.PARGING_WITHDRAW_OPRAATE.replace("{id}", row.id), {},
							(res) => {
								this.$Message.success("撤回运营成功！");
								this.getList();
							}
						)
					}
				})
            }
        },
        // 撤回运营
        withdrawOperation(row){
            if(row.id){
                this.$Modal.confirm({
					title: "提示",
					content: "确认撤回运营车位 "+row.address+row.number+' ？',
					okText: "确认",
					cancelText: "取消",
					onOk: () => {
						this.$ajax.put(
							this,
							this.$api.PARGING_WITHDRAW_OPRAATE.replace("{id}", row.id), {},
							(res) => {
								this.$Message.success("撤回运营成功！");
								this.getList();
							}
						)
					}
				})
            }
        },
        // 作废
        Obsolete(row){
            if(row.id){
                this.$Modal.confirm({
                    title: '是否确认作废此资产',
                    content: '<p>资产作废后，其关联的待租房源将被回收，请确保所有租约已结束，否则将导致作废操作失败。此操作无法撤销。</p>',
                    onOk: () => {
                        this.obsoleteShow = true;
                        this.obsoleteData.id =row.id;
                    },
                });
                // this.$Modal.confirm({
				// 	title: "提示",
				// 	content: "确认作废车位编号 "+row.number+' ？',
				// 	okText: "确认",
				// 	cancelText: "取消",
				// 	onOk: () => {
				// 		this.$ajax.put(
				// 			this,
				// 			this.$api.PARKING_CANCEL_PUT.replace("{id}", row.id), {},
				// 			(res) => {
				// 				this.$Message.success("作废成功！");
				// 				this.getList();
				// 			}
				// 		)
				// 	}
				// })
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
            let params=this.searchData;
            for(let i in params){
                if(params[i] == ''){delete params[i]}
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
            this.searchData.dataStatus_in='0,1';
            this.getList();
        },
        add(type){
            this.$router.push({
                name:'parking/'+type
            })
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

