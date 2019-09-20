<template>
    <Card dis-hover>
        <Row>
            <Button type="primary" @click="importExcel">政策性减免批量导入</Button>
            <Button type="primary" ghost @click="downloadExcel">下载政策性减免导入模板</Button>
        </Row>
        <Row class="padding-row">
            <Form
                ref="form"
                :v-model="searchData"
                label-position="right"
                :label-width="120"
            >
            <Row :gutter="16" class="ov-row" type="flex" justify="center">
                <Col span="6">
                    <FormItem label="项目" class="ov-form-item">
                        <Input v-model="searchData.projectName_l" placeholder="请输入项目"></Input>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="减免年份" class="ov-form-item">
                        <DatePicker v-model="searchData.year" @on-change="searchData.year=$event"  type="year" placeholder="请选择减免年份"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="申请人姓名" class="ov-form-item">
                        <Input v-model="searchData.name_l" placeholder="请输入申请人姓名"></Input>
                    </FormItem>
                </Col>

                <Col span="6">
                    <FormItem label="申请人身份证号码" class="ov-form-item">
                        <Input v-model="searchData.idCard_l" placeholder="请输入申请人身份证号码"></Input>
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
                    查询结果
                </span>
            </h3>
            <Table border :data="data" :columns="columns"></Table>
        </Row>
        <Row class="pager">
            <Page @on-change="changePage" :current="searchData.pageNo" :page-size="searchData.pageSize" :total="searchData.total" show-total />
        </Row>
        <Modal v-model="showModal" title="政策性减免导入">
            <Row>
                <Col span="10" class="label-col">请上传填写完成的政策性减免</Col>
                <Col span="8" class="file-col">
                    <fileUpload
                        :uploadButton="'upload'"
                        :url="$api.REGULARITY_REDUCTION_IMPORT"
                        :defaultList="defaultList"
                        @on-complete="uploadComplete"
                        @on-error="uploadError"
                        :allowExt="allow"
                        :icon="'md-cloud-upload'"
                        :customerBtn="true"
                        :btnTxt="'上传政策性减免'"
                    ></fileUpload>
                </Col>
            </Row>
            <div slot="footer"></div>
        </Modal>
    </Card>
</template>
<script>
import fileUpload from "../../../../components/Helper/Form/image-upload";
export default {
    components: {
        fileUpload
    },
    data(){
        return{
            showModal:false,
            allow:['xls','cls','xlsx'],
            defaultList:[],
            searchData:{
                pageNo: 1,
                pageSize: 10,
                total: 0,
            },
            data:[],
            columns:[
                {
                    title:'申请人姓名',
                    width:100,
                    key:'name'
                },
                {
                    title:'申请人身份证号码',
                    width:150,
                    key:'idCard'
                },
                {
                    title:'减免年度',
                    width:100,
                    key:'year'
                },
                {
                    title:'项目名',
                    width:100,
                    key:'projectName'
                },
                {
                    title:'房源地址',
                    width:100,
                    key:'address'
                },
                {
                    title:'入住时间',
                    width:100,
                    key:'checkInTime'
                },
                {
                    title:'计租月数',
                    width:100,
                    key:'rentalMonth'
                },
                {
                    title:'入住人数',
                    width:100,
                },
                {
                    title:'建设面积',
                    width:100,
                    key:'buildArea'
                },
                {
                    title:'住地地段市场租金标准',
                    width:200,
                    key:'standardRent'
                },
                {
                    title:'年度核减',
                    width:100,
                    // key:'annualSubtraction'
                    render:(h,params)=>{
                        let annualSubtraction=params.row.annualSubtraction==null?0:params.row.annualSubtraction;
                        let actualAnnualRelief=params.row.actualAnnualRelief==null?0:params.row.actualAnnualRelief;
                        return [
                            h('div',{},'总额：'+annualSubtraction),
                            h('div',{},'剩余：'+(Number(annualSubtraction)-Number(actualAnnualRelief)))
                        ]
                    }
                },
                {
                    title:'操作',
                    width:100,
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
        // 导入按钮
        importExcel(){
            this.showModal=true;
        },
        // 上传成功
        uploadComplete(res){
            // this.showModal=false;
            // this.$Message.success('上传成功');
            // this.getList();
            this.showModal=false;
            this.$com.handleUploadResponse(res.data.content);
            this.getList();
        },
        uploadError(error, file, fileList) {
          this.showModal=false;
          if(file.code == '710') {
            this.$com.handleUploadResponse(file.msg);
          } else {
            this.$Message.error('导入失败');
          }
          this.getList();
        },
        // 下载模板
        downloadExcel(){
            window.open(this.$api.IMGURL+'/template/政策性减免.xlsx');
        },
        getList(){
            let params=JSON.parse(JSON.stringify(this.searchData));
            delete params.total;
            for(let i in params){
                if(params[i] == ''){
                    delete params[i]
                }
            }
            this.$ajax.get(
                this,
                this.$api.REGULARITY_REDUCTION_LIST,
                params,
                (res)=>{
                    this.searchData.total=res.data.totalRows;
                    this.data=res.data.content == null?[]:res.data.content;
                }
            )
        },
        // 重置
        reset(){
            delete this.searchData.year;
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
                name:'publicHousing/accounting/regularityReductionShow',
                query:{
                    id:params.id
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
    .label-col{
        height:30px;line-height: 30px;
    }
    .file-col{
        margin-left: -60px;
    }
</style>

