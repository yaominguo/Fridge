<template>
    <Card dis-hover>
        <div class="h4-title">
            <span class="div-title-span">编辑分店</span>
        </div>
        <Form ref="form"
            :model="formData"
            label-position="right"
            :label-width="110"
            class="form-data"
            :rules="rule"
        >
            <Row>
                <Col span="8">
                    <FormItem label="分店名称" class="ov-form-item" prop="storeName">
                        <Input v-model="formData.storeName"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <FormItem label="分店地址" class="ov-form-item">
                        <Input v-model="formData.address"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <FormItem label="分店电话" class="ov-form-item">
                        <Input v-model="formData.storePhone"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <FormItem label="门店照片" prop="pic" class="ov-form-item ivu-form-item-required">
                        <imageUpload 
                            :uploadButton="'upload'" 
							:maxUploads="1" 
                            :isPhone="true"
							:url="$api.FILE_UPLOAD_POST" 
							:defaultList="defaultList"
							@on-complete="uploadComplete"
							@on-remove="uploadRemove"
                            @showUploadImg="getReturn"
                            :code="code"
                        ></imageUpload>
                        <div class="color-div">注：图片为门店主图，仅允许上传一张。</div>
                        <div class="color-div padding-div">推荐尺寸为正方形：150px*150px，大小在500k以内</div>
                        <div class="color-div padding-div">支持JPG,JPEG,PNG,BMVP格式</div>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <Row class="bottom-row">
            <Button type="primary" @click="save">保存</Button>
            <Button type="primary" ghost :to="{name:'BranchList'}">取消</Button>
        </Row>
    </Card>
</template>
<script>
import imageUpload from "../../../components/Helper/Form/image-upload";
export default {
    components: {
        imageUpload
    },
    data(){
        const validatePic=(rule,value,callback)=>{
            if(this.defaultList.length==0){
                callback(new Error('请上传门店照片'))
            }else{
                if(this.defaultList.length==1){
                    callback();
                }else{
                    callback(new Error('最多上传一张门店照片'))
                }
            }
        }
        return{
            defaultList:[],
            formData:{
                storeName:null,
                address:null,
                storePhone:null,
            },
            rule:{
                storeName:[
                    { required: true, message: '请输入分店名称', trigger: 'blur' }
                ],
                pic:[
                    { validator: validatePic, trigger: 'change' }
                ]
            },
            code:''
        }
    },
    methods: {
        getDetail(){
            this.$ajax.get(
                this,
                this.$api.GET_STORE_DETAIL.replace('{id}',this.$route.query.id),
                {},
                (res)=>{
                    let data=res.data.content;
                    this.formData.storeName=data.storeName;
                    this.formData.address=data.address;
                    this.formData.storePhone=data.storePhone;
                    if(data.pic != null && data.pic != ''){
                        this.defaultList.push({
                            flag:false,
                            name:data.pic,
                            picPath:data.pic,
                        })
                    }
                }
            )
        },
        save(){
            this.$refs.form.validate((valid)=>{
                if(!valid)retun;
                let params=JSON.parse(JSON.stringify(this.formData));
                let imgList=JSON.parse(JSON.stringify(this.defaultList));
                if(imgList.length > 0){
                    if(imgList[0].flag == true){
                        params.picId=imgList[0].picId
                    }
                }else{
                    // params.picId=null;
                }
                params.id=this.$route.query.id;
                this.$ajax.put(
                    this,
                    this.$api.ADDD_STORES,
                    params,
                    (res)=>{
                        if (res.code == "200") {
                            this.$ajax.delete(this, this.$api.DELETE_FILE_UPLOAD_BY_CODE+"?codes="+this.code, null, res => {
                                this.$Message.success("修改成功！");
                                this.$router.push({
                                    name:'BranchList'
                                })
                            });
                        } else {
                            this.$Message.error(res.msg);
                        }
                    }
                )
            })
        },
        getUserInfo(){
            this.$ajax.get(
                this,
                this.$api.GET_USER_INFO,{},
                (res)=>{
                    this.formData.parentId=res.data.content.storeInfo.id;
                }
            )
        },
        // 上传成功
        uploadComplete(response, filename){
            //console.log(response,filename);
            let data=response.data.content;
            this.defaultList.push({
                picId:data.id,
                picPath:data.path,
                flag:true
            })
            this.$refs.form.validateField("pic");
        },
        // 图片删除
        uploadRemove(item,index){
            // this.defaultList=[];
            if(item.flag && item.flag == 'phone'){
                this.$ajax.delete(this, this.$api.DELETE_FILE_UPLOAD_POST.replace("{code}", this.code).replace("{id}",
                    item.picId), {}, res => {
                        this.defaultList.splice(index,1);
                        this.$refs.form.validateField("pic");
                });
            }else{
                this.defaultList.splice(index,1);
                this.$refs.form.validateField("pic");
            }
            
        },
        // 同步手机端上传图片
        getReturn(){
            this.$ajax.get(
                this,
                this.$api.GET_FILE_UPLOAD_POST.replace("{code}", this.code), {},
                res => {
                    if(res.data.content.length>0){
                        let data=res.data.content;
                        if(this.defaultList.length==0){
                            data.forEach((d)=>{
                                this.defaultList.push({
                                    picId:d.id,
                                    picPath:d.path,
                                    return:'phone',
                                    flag:true
                                })
                            })
                        }else{
                            data.forEach((d)=>{
                                let flag=true;
                                this.defaultList.forEach((e)=>{
                                    if(d.id==e.picId){
                                        flag=false;
                                    }
                                })
                                if(flag){
                                    this.defaultList.push({
                                        picId:d.id,
                                        picPath:d.path,
                                        return:'phone',
                                        flag:true
                                    })
                                }
                            })
                        }
                        this.$refs.form.validateField("pic");
                    }
                }
            );
        },
        getCode(){
            this.$ajax.get(this, this.$api.GET_FILE_UPLOAD_CODE_GET, {}, res => {
                this.code = res.data.content.code;
            });
        },  
    },
    mounted () {
        this.getDetail();
        this.getCode();
    }
}
</script>

<style scoped>
    .h4-title{
        height:37px;margin-bottom: 20px;
        border-bottom: 1px solid #e0e0e0;
    }
    .div-title-span{
        display: inline-block;width:100px;text-align: center;
        height:37px;color:#2d8cf0;border-bottom:2px solid #2d8cf0;
        font-weight: bold;
    }
    .ov-form-item{
        font-weight: bold;
        font-size: 14px;
        text-align: left;
    }
    .form-data{
        border-bottom: 1px solid #e0e0e0;
    }
    .bottom-row{
        text-align: center;
        padding:20px 0px;
    }
    .color-div{
        color:#2d8cf0;
        font-size: 12px;
        line-height: 20px;
    }
    .padding-div{
        padding-left:20px;
    }
</style>

