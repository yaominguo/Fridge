<template>
    <Card dis-hover v-if="show">
        <Form
            :model="formData"
            ref="formData"
            label-position="right"
            :label-width="110"
            :rules="rule"
            >
            <Card dis-hover :padding="0" class="margin-card">
                <Row class="row-title">{{storeType.ftitle}}</Row>
                <Row class="padding-row">
                    <Col span="8">
                        <FormItem :label="storeType.busiName" class="ov-form-item ivu-form-item-required" prop="busiName">
                            <Input v-model="formData.busiName"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem :label="storeType.merNameAlias" class="ov-form-item ivu-form-item-required" prop="merNameAlias">
                            <Input v-model="formData.merNameAlias"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem :label="storeType.provinceId" class="ov-form-item ivu-form-item-required" prop="provinceId">
                            <Select v-model="formData.provinceId" @on-change="provinceChange">
                                <Option v-for="(item,index) in provinceList" :key="index" :value="item.id" :label="item.name"></Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row class="padding-row">
                    <Col span="8">
                        <FormItem :label="storeType.cityId" class="ov-form-item ivu-form-item-required" prop="cityId">
                            <Select v-model="formData.cityId">
                                <Option v-for="(item,index) in cityList" :key="index" :value="item.id" :label="item.name"></Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem :label="storeType.address" class="ov-form-item ivu-form-item-required" prop="address">
                            <Input v-model="formData.address"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="客服电话" class="ov-form-item" prop="servicePhone">
                            <Input v-model="formData.servicePhone"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row class="padding-row">
                    <Col span="8">
                        <FormItem label="联系邮箱" class="ov-form-item" prop="contactEmail">
                            <Input v-model="formData.contactEmail"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="联系电话" class="ov-form-item" prop="contactPhone">
                            <Input v-model="formData.contactPhone"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row class="padding-row">
                    <Col span="8">
                        <FormItem label="营业执照照片" class="ov-form-item ivu-form-item-required" prop="attr1">
                             <imageUpload 
                                :uploadButton="'upload1'" 
                                :maxUploads="1" 
                                :isPhone="true"
                                :url="$api.FILE_UPLOAD_POST" 
                                :defaultList="defaultList1"
                                @on-complete="uploadComplete1" 
                                @on-remove="uploadRemove1"
                                @showUploadImg="getReturn1"
                                :code="code1"
                            ></imageUpload>
                            <div class="color-div">注：仅允许上传一张图片。</div>
                        </FormItem>
                    </Col>
                </Row>
            </Card>
            <Card dis-hover :padding="0" class="margin-card">
                <Row class="row-title">{{storeType.stitle}}</Row>
                <Row class="padding-row">
                    <Col span="8">
                        <FormItem :label="storeType.contactName" class="ov-form-item ivu-form-item-required" prop="contactName">
                            <Input v-model="formData.contactName"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem :label="storeType.cerdId" class="ov-form-item ivu-form-item-required" prop="cerdId">
                            <Input v-model="formData.cerdId"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row class="padding-row">
                    <Col span="8">
                        <FormItem label="身份证正面照片" class="ov-form-item ivu-form-item-required" prop="attr2">
                            <imageUpload 
                                :uploadButton="'upload2'" 
                                :maxUploads="1" 
                                :isPhone="true"
                                :url="$api.FILE_UPLOAD_POST" 
                                :defaultList="defaultList2"
                                @on-complete="uploadComplete2" 
                                @on-remove="uploadRemove2"
                                @showUploadImg="getReturn2"
                                :code="code2"
                            ></imageUpload>
                            <div class="color-div">注：仅允许上传一张图片。</div>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="身份证反面照片" class="ov-form-item ivu-form-item-required" prop="attr3">
                            <imageUpload 
                                :uploadButton="'upload3'" 
                                :maxUploads="1" 
                                :isPhone="true"
                                :url="$api.FILE_UPLOAD_POST" 
                                :defaultList="defaultList3"
                                @on-complete="uploadComplete3" 
                                @on-remove="uploadRemove3"
                                @showUploadImg="getReturn3"
                                :code="code3"
                            ></imageUpload>
                            <div class="color-div">注：仅允许上传一张图片。</div>
                        </FormItem>
                    </Col>
                </Row>
            </Card>
            <Card dis-hover :padding="0" class="margin-card">
                <Row class="row-title">账户信息</Row>
                <Row class="padding-row">
                    <Col span="8">
                        <FormItem :label="storeType.cardName" class="ov-form-item ivu-form-item-required" prop="cardName">
                            <Input v-model="formData.cardName"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem :label="storeType.cardNoCipher" class="ov-form-item ivu-form-item-required" prop="cardNoCipher">
                            <Input v-model="formData.cardNoCipher"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="是否对公账户" class="ov-form-item" prop="isCompany">
                            <Select v-model="formData.isCompany">
                                <Option value="1">是</Option>
                                <Option value="0">否</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row class="padding-row">
                    <Col span="8">
                        <FormItem label="开户支行名" class="ov-form-item ivu-form-item-required" prop="accBankNo">
                            <Select
                                v-model="formData.bankName"
                                transfer
                                filterable
                                remote
                                :label-in-value="true"
                                @on-change="bankChange"
                                :remote-method="remoteMethod">
                                <Option v-for="(option, index) in BankList" :value="option.bankName" :key="index">{{option.bankName}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="收款方式" class="ov-form-item">
                            <Input value="支付宝、微信、银联" disabled></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row class="padding-row">
                    <Col span="12">
                        <FormItem label="开户许可证图" class="ov-form-item ivu-form-item-required" prop="attr4">
                             <imageUpload 
                                :uploadButton="'upload4'" 
                                :maxUploads="1" 
                                :isPhone="true"
                                :url="$api.FILE_UPLOAD_POST" 
                                :defaultList="defaultList4"
                                @on-complete="uploadComplete4" 
                                @on-remove="uploadRemove4"
                                @showUploadImg="getReturn4"
                                :code="code4"
                            ></imageUpload>
                            <div class="color-div">注：仅允许上传一张图片。</div>
                        </FormItem>
                    </Col>
                </Row>
            </Card>
        </Form>
        <Row class="bottom-row">
            <Button type="primary" @click="save">保存</Button>
            <Button type="primary" ghost :to="{name:'BranchList'}">取消</Button>
        </Row>
    </Card>
</template>
<script>
import Store from '@/store';
import imageUpload from "../../../components/Helper/Form/image-upload";
import types from "./types.js";
import axios from "axios";
import Cookie from "@/local-cookie";
import { setTimeout } from 'timers';
export default {
  components: {
    imageUpload
  },
  data() {
      const validateAttr1=(rule,value,callback)=>{
            if(this.defaultList1.length==0){
                callback(new Error('营业执照照片不能为空！'))
            }else{
                if(this.defaultList1.length==1){
                    callback();
                }else{
                    callback(new Error('最多上传一张营业执照照片！'))
                }
            }
      }
      const validateAttr2=(rule,value,callback)=>{
          if(this.defaultList2.length==0){
                callback(new Error('身份证正面照片不能为空！'))
            }else{
                if(this.defaultList2.length==1){
                    callback();
                }else{
                    callback(new Error('最多上传一张身份证正面照片！'))
                }
            }
      }
      const validateAttr3=(rule,value,callback)=>{
            if(this.defaultList3.length==0){
                callback(new Error('身份证反面照片不能为空！'))
            }else{
                if(this.defaultList3.length==1){
                    callback();
                }else{
                    callback(new Error('最多上传一张身份证反面照片！'))
                }
            }
      }
      const validateAttr4=(rule,value,callback)=>{
          if(this.defaultList4.length==0){
                callback(new Error('开户许可证图不能为空！'))
            }else{
                if(this.defaultList4.length==1){
                    callback();
                }else{
                    callback(new Error('最多上传一张开户许可证图！'))
                }
            }
      }
      const validateProvinceId=(rule,value,callback)=>{
          if(this.formData.provinceId && this.formData.provinceId!=''){
              callback()
          }else{
              callback(new Error('请选择'+this.storeType.provinceId))
          }
      }
      const validateCityId=(rule,value,callback)=>{
          if(this.formData.cityId && this.formData.cityId!=''){
              callback()
          }else{
              callback(new Error('请选择'+this.storeType.cityId))
          }
      }
      const validateBusiName=(rule,value,callback)=>{
          if(this.formData.busiName && this.formData.busiName!=''){
              callback()
          }else{
              callback(new Error('请输入'+this.storeType.busiName))
          }
      }
      const validateMerNameAlias=(rule,value,callback)=>{
          if(this.formData.merNameAlias && this.formData.merNameAlias!=''){
              callback()
          }else{
              callback(new Error('请输入'+this.storeType.merNameAlias))
          }
      }
      const validateAddress=(rule,value,callback)=>{
          if(this.formData.address && this.formData.address!=''){
              callback()
          }else{
              callback(new Error('请输入'+this.storeType.address))
          }
      }

      const validateContactName=(rule,value,callback)=>{
          if(this.formData.contactName && this.formData.contactName!=''){
              callback()
          }else{
              callback(new Error('请输入'+this.storeType.contactName))
          }
      }
      const validateCerdId=(rule,value,callback)=>{
          if(this.formData.cerdId && this.formData.cerdId!=''){
              callback()
          }else{
              callback(new Error('请输入'+this.storeType.cerdId))
          }
      }
      const validateCardName=(rule,value,callback)=>{
          if(this.formData.cardName && this.formData.cardName!=''){
              callback()
          }else{
              callback(new Error('请输入'+this.storeType.cardName))
          }
      }
      const validateCardNoCipher=(rule,value,callback)=>{
          if(this.formData.cardNoCipher && this.formData.cardNoCipher!=''){
              callback()
          }else{
              callback(new Error('请输入'+this.storeType.cardNoCipher))
          }
      }
      const validateAccBankNo=(rule,value,callback)=>{
          if(this.formData.accBankNo && this.formData.accBankNo != ''){
              callback();
          }else{
              callback(new Error('请选择开户支行名'));
          }
      }
      const validateTel=(rule,value,callback)=>{
          if(this.$com.checkPhone(value) || this.$com.checkTel(value)){
              callback();
          }else{
              callback(new Error('请输入正确号码'));
          }
      }
      const validateCard=(rule,value,callback)=>{
          if(this.$com.checkID(value)){
              callback();
          }else{
              callback(new Error('请输入正确身份证号'));
          }
      }
    return {
      show:true,
      BankList: [],
      formData: {},
      provinceList: [],
      cityList: [],
      storeType: {},
      formDatass: new FormData(),
      token: "",
      defaultList1:[],
      defaultList2:[],
      defaultList3:[],
      defaultList4:[],
      code1:'',
      code2:'',
      code3:'',
      code4:'',
      rule:{
        busiName: [
            { validator: validateBusiName, trigger: 'change' }
        ],
        merNameAlias: [
            { validator: validateMerNameAlias, trigger: 'blur' }
        ],
        provinceId: [
            { validator: validateProvinceId, trigger: 'change' }
        ],
        cityId: [
            { validator: validateCityId, trigger: 'change' }
        ],
        address: [
            { validator: validateAddress, trigger: 'blur' }
        ],
        servicePhone: [
            { required: true, message: '请输入客服电话', trigger: 'blur' },
            { validator: validateTel, trigger: 'blur' }
        ],
        contactEmail: [
            { required: true, message: '请输入联系邮箱', trigger: 'blur' }
        ],
        contactPhone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
            { validator: validateTel, trigger: 'blur' }
        ],
        contactName: [
            { validator: validateContactName, trigger: 'blur' }
        ],
        cerdId: [
            { validator: validateCerdId, trigger: 'blur' },
            { validator: validateCard, trigger: 'blur' }
        ],
        cardName: [
            { validator: validateCardName, trigger: 'blur' }
        ],
        cardNoCipher: [
            { validator: validateCardNoCipher, trigger: 'blur' }
        ],
        isCompany: [
            { required: true, message: '请选择是否对公账户', trigger: 'change' }
        ],
        accBankNo:[
            { validator: validateAccBankNo, trigger: 'change' }
        ],
        attr1:[
            { validator: validateAttr1, trigger: 'change' }
        ],
        attr2:[
            { validator: validateAttr2, trigger: 'change' }
        ],
        attr3:[
            { validator: validateAttr3, trigger: 'change' }
        ],
        attr4:[
            { validator: validateAttr4, trigger: 'change' }
        ]
      }
    };
  },
  methods: {
      bankChange(value){
          this.BankList.forEach((e)=>{
              if(e.bankName == value.value){
                  this.formData.accBankNo=e.bankNo
              }
          })
      },
    getProvince() {
      this.$ajax.get(this, this.$api.ALL_CITY_LIST.replace('{id}',1), {}, res => {
        this.provinceList = res.data.content.data;
      });
    },
    getCity(id,data) {
      this.cityList = [];
      delete this.formData.cityId;
      this.$ajax.get(this, this.$api.ALL_CITY_LIST.replace('{id}',id), {}, res => {
        this.cityList = res.data.content.data;
      });
    },
    // 编辑整理格式
    forMat(data){
        // this.formData=JSON.parse(JSON.stringify(data));
        this.formData.busiName=data.busiName;
        this.formData.bankName=data.bankName;
        this.formData.merNameAlias=data.merNameAlias;
        this.formData.provinceId=Number(data.provinceId);
        this.formData.cityId=Number(data.cityId);
        this.formData.address=data.address;
        this.formData.servicePhone=data.servicePhone;
        this.formData.contactEmail=data.contactEmail;
        this.formData.contactPhone=data.contactPhone;
        this.formData.contactName=data.contactName;
        this.formData.id=data.id;
        this.formData.cerdId=data.cerdId;
        this.formData.cardName=data.cardName;
        this.formData.cardNoCipher=data.cardNoCipher;
        this.formData.isCompany=data.isCompany;
        this.formData.accBankNo=data.accBankNo;
        this.attrFile1=data.attrFile1;
        this.attrFile2=data.attrFile2;
        this.attrFile3=data.attrFile3;
        this.attrFile4=data.attrFile4;
        if(data.attrFile1 != null){
            this.defaultList1.push({
                flag:false,
                name:data.attrFile1,
                picPath:data.attrFile1,
            })
        }
        if(data.attrFile2 != null){
            this.defaultList2.push({
                flag:false,
                name:data.attrFile1,
                picPath:data.attrFile1,
            })
        }
        if(data.attrFile3 != null){
            this.defaultList3.push({
                flag:false,
                name:data.attrFile1,
                picPath:data.attrFile1,
            })
        }
        if(data.attrFile4 != null){
            this.defaultList4.push({
                flag:false,
                name:data.attrFile1,
                picPath:data.attrFile1,
            })
        }
        this.show=true; 
    },
    provinceChange(id) {
      this.getCity(id);
    },
    remoteMethod(value) {
        if(!value && value != ''){
            this.BankList=[];
            return;
        }
        this.$ajax.get(this, this.$api.BANK_LIST.replace('{name}',value), {}, res => {
          setTimeout(()=>{
            //   this.BankList=res.data.content;
              this.$set(this,'BankList',res.data.content);
          },200)
      });
    },
    // 图片开始
    // 上传成功
    uploadComplete1(response, filename){
        //console.log(response,filename);
        let data=response.data.content;
        this.defaultList1.push({
            picId:data.id,
            picPath:data.path,
            flag:true
        })
        this.$refs.formData.validateField("attr1");
    },
    // 图片删除
    uploadRemove1(item,index){
        // this.defaultList=[];
        if(item.flag && item.flag == 'phone'){
            this.$ajax.delete(this, this.$api.DELETE_FILE_UPLOAD_POST.replace("{code}", this.code1).replace("{id}",
                item.picId), {}, res => {
                    this.defaultList1.splice(index,1);
                    this.$refs.formData.validateField("attr1");
            });
        }else{
            this.defaultList1.splice(index,1);
            this.$refs.formData.validateField("attr1");
        }
        
    },
    // 同步手机端上传图片
    getReturn1(){
        this.$ajax.get(
            this,
            this.$api.GET_FILE_UPLOAD_POST.replace("{code}", this.code1), {},
            res => {
                if(res.data.content.length>0){
                    let data=res.data.content;
                    if(this.defaultList1.length==0){
                        data.forEach((d)=>{
                            this.defaultList1.push({
                                picId:d.id,
                                picPath:d.path,
                                return:'phone',
                                flag:true
                            })
                        })
                }else{
                        data.forEach((d)=>{
                            let flag=true;
                            this.defaultList1.forEach((e)=>{
                                if(d.id==e.picId){
                                    flag=false;
                                }
                            })
                            if(flag){
                                this.defaultList1.push({
                                    picId:d.id,
                                    picPath:d.path,
                                    return:'phone',
                                    flag:true
                                })
                            }
                        })
                    }
                }
				this.$refs.formData.validateField("attr1");
            }
        );
    },
    // 上传成功2
    uploadComplete2(response, filename){
        //console.log(response,filename);
        let data=response.data.content;
        this.defaultList2.push({
            picId:data.id,
            picPath:data.path,
            flag:true
        })
        this.$refs.formData.validateField("attr2");
    },
    // 图片删除
    uploadRemove2(item,index){
        // this.defaultList=[];
        if(item.flag && item.flag == 'phone'){
            this.$ajax.delete(this, this.$api.DELETE_FILE_UPLOAD_POST.replace("{code}", this.code2).replace("{id}",
                item.picId), {}, res => {
                    this.defaultList2.splice(index,1);
                    this.$refs.formData.validateField("attr2");
            });
        }else{
            this.defaultList2.splice(index,1);
            this.$refs.formData.validateField("attr2");
        }
        
    },
    // 同步手机端上传图片
    getReturn2(){
        this.$ajax.get(
            this,
            this.$api.GET_FILE_UPLOAD_POST.replace("{code}", this.code2), {},
            res => {
                if(res.data.content.length>0){
                    let data=res.data.content;
                    if(this.defaultList2.length==0){
                        data.forEach((d)=>{
                            this.defaultList2.push({
                                picId:d.id,
                                picPath:d.path,
                                return:'phone',
                                flag:true
                            })
                        })
                }else{
                        data.forEach((d)=>{
                            let flag=true;
                            this.defaultList2.forEach((e)=>{
                                if(d.id==e.picId){
                                    flag=false;
                                }
                            })
                            if(flag){
                                this.defaultList2.push({
                                    picId:d.id,
                                    picPath:d.path,
                                    return:'phone',
                                    flag:true
                                })
                            }
                        })
                    }
                }
				this.$refs.formData.validateField("attr2");
            }
        );
    },
    // 上传成功3
    uploadComplete3(response, filename){
        //console.log(response,filename);
        let data=response.data.content;
        this.defaultList3.push({
            picId:data.id,
            picPath:data.path,
            flag:true
        })
        this.$refs.formData.validateField("attr3");
    },
    // 图片删除
    uploadRemove3(item,index){
        // this.defaultList=[];
        if(item.flag && item.flag == 'phone'){
            this.$ajax.delete(this, this.$api.DELETE_FILE_UPLOAD_POST.replace("{code}", this.code3).replace("{id}",
                item.picId), {}, res => {
                    this.defaultList3.splice(index,1);
                    this.$refs.formData.validateField("attr3");
            });
        }else{
            this.defaultList3.splice(index,1);
            this.$refs.formData.validateField("attr3");
        }
        
    },
    // 同步手机端上传图片
    getReturn3(){
        this.$ajax.get(
            this,
            this.$api.GET_FILE_UPLOAD_POST.replace("{code}", this.code3), {},
            res => {
                if(res.data.content.length>0){
                    let data=res.data.content;
                    if(this.defaultList3.length==0){
                        data.forEach((d)=>{
                            this.defaultList3.push({
                                picId:d.id,
                                picPath:d.path,
                                return:'phone',
                                flag:true
                            })
                        })
                }else{
                        data.forEach((d)=>{
                            let flag=true;
                            this.defaultList3.forEach((e)=>{
                                if(d.id==e.picId){
                                    flag=false;
                                }
                            })
                            if(flag){
                                this.defaultList3.push({
                                    picId:d.id,
                                    picPath:d.path,
                                    return:'phone',
                                    flag:true
                                })
                            }
                        })
                    }
                }
				this.$refs.formData.validateField("attr3");
            }
        );
    },
    // 上传成功
    uploadComplete4(response, filename){
        //console.log(response,filename);
        let data=response.data.content;
        this.defaultList4.push({
            picId:data.id,
            picPath:data.path,
            flag:true
        })
        this.$refs.formData.validateField("attr4");
    },
    // 图片删除
    uploadRemove4(item,index){
        // this.defaultList=[];
        if(item.flag && item.flag == 'phone'){
            this.$ajax.delete(this, this.$api.DELETE_FILE_UPLOAD_POST.replace("{code}", this.code4).replace("{id}",
                item.picId), {}, res => {
                    this.defaultList4.splice(index,1);
                    this.$refs.formData.validateField("attr1");
            });
        }else{
            this.defaultList4.splice(index,1);
            this.$refs.formData.validateField("attr4");
        }
        
    },
    // 同步手机端上传图片
    getReturn4(){
        this.$ajax.get(
            this,
            this.$api.GET_FILE_UPLOAD_POST.replace("{code}", this.code4), {},
            res => {
                if(res.data.content.length>0){
                    let data=res.data.content;
                    if(this.defaultList4.length==0){
                        data.forEach((d)=>{
                            this.defaultList4.push({
                                picId:d.id,
                                picPath:d.path,
                                return:'phone',
                                flag:true
                            })
                        })
                }else{
                        data.forEach((d)=>{
                            let flag=true;
                            this.defaultList4.forEach((e)=>{
                                if(d.id==e.picId){
                                    flag=false;
                                }
                            })
                            if(flag){
                                this.defaultList4.push({
                                    picId:d.id,
                                    picPath:d.path,
                                    return:'phone',
                                    flag:true
                                })
                            }
                        })
                    }
                }
				this.$refs.formData.validateField("attr4");
            }
        );
    },



    save() {
        this.$refs.formData.validate((valid)=>{
            if(!valid) return;

            this.formDatass=new FormData();
            this.token = Cookie.get("token");
            let name = "";
            if(this.defaultList1.flag == true){
                this.formDatass.append('attrFile1',this.defaultList1[0].picId)
            }else{
                this.formDatass.append("attrFile1",this.attrFile1)
            }

            if(this.defaultList2.flag == true){
                this.formDatass.append('attrFile2',this.defaultList2[0].picId)
            }else{
                this.formDatass.append("attrFile2",this.attrFile2)
            }

            if(this.defaultList3.flag == true){
                this.formDatass.append('attrFile3',this.defaultList3[0].picId)
            }else{
                this.formDatass.append("attrFile3",this.attrFile3)
            }

            if(this.defaultList4.flag == true){
                this.formDatass.append('attrFile4',this.defaultList4[0].picId)
            }else{
                this.formDatass.append("attrFile4",this.attrFile4)
            }



            for (let key in this.formData) {
                this.formDatass.append(key,this.formData[key]);
            }
            let url;
            let methods;
            if(this.$route.query.type=='edit'){
                url=this.$api.UPDATE_REPORT;
                methods='post';
            }else{
                
                if(this.$route.query.parentId == '0'){
                    url=this.$api.RECEUVED_METHOD;
                }else{
                    url=this.$api.NEW_RECEUVED_METHOD;
                }
                methods='post';
            }
            Store.dispatch('setLoading', true);
            axios[methods](url, this.formDatass, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: this.token,
                "X-Requested-With": "XMLHttpRequest",
                "X-File-Name": "file",
            },
            })
            .then(res => {
                Store.dispatch('setLoading', false);
                if (res.data.code == "200") {
                    this.$ajax.delete(this, this.$api.DELETE_FILE_UPLOAD_BY_CODE+"?codes="+this.code1+','+this.code2+','+this.code3+','+this.code4, null, res => {
                        this.$Message.success("开设提交成功！");
                        this.$router.push({
                            name:'BranchList'
                        })
                    });
                } else {
                    this.$Message.error(res.msg);
                }
            }).catch(err=>{
                Store.dispatch('setLoading', false);
                this.$Message.error("开设提交失败！");
            });
        })
      
    },
    getDetail(){
        this.$ajax.get(
            this,
            this.$api.REPORT_INFI.replace('{id}',this.$route.query.id),
            {},(res)=>{
                let data=res.data.content;
                this.getFirstProvince(data);
            }
        )
    },
    getFirstProvince(data) {
      this.$ajax.get(this, this.$api.ALL_CITY_LIST.replace('{id}',1), {}, res => {
        this.provinceList = res.data.content.data;
        this.getFirstCity(data.provinceId,data);
      });
    },
    getFirstCity(id,data) {
      this.$ajax.get(this, this.$api.ALL_CITY_LIST.replace('{id}',id), {}, res => {
        this.cityList = res.data.content.data;
        this.forMat(data);
      });
    },
    getCode(){
        this.$ajax.get(
            this,
            this.$api.GET_FILE_UPLOAD_CODE_GET + "?number=4", {},
            res => {
                //console.log(res);
                let codes=res.data.content.code;
                codes=codes.split(',');
                this.code1=codes[0];
                this.code2=codes[1];
                this.code3=codes[2];
                this.code4=codes[3];
            }
        );
    },
  },
  mounted() {   
    this.formData.storeId = this.$route.query.id;
    this.getCode();
    if (this.$route.query.storeType == "person") {
      this.storeType = types.person;
    } else {
      this.storeType = types.company;
    }
    if(this.$route.query.type == "edit"){
        this.show=false;
        this.getDetail();
    }else{
        this.getProvince();
        this.show=true;
    }
    
  }
};
</script>
<style>
.padding-row {
  padding: 0px 10px;
}
.row-title {
  border-bottom: 1px solid #e0e0e0;
  height: 37px;
  padding-left: 16px;
  line-height: 37px;
  font-weight: bold;
  margin-bottom: 20px;
}
.ov-form-item {
  font-weight: bold;
  font-size: 14px;
  text-align: left;
}
.margin-card {
  margin-bottom: 16px;
}
.bottom-row {
  text-align: center;
  padding: 20px 0px;
}
.padding-top-row {
  padding-top: 20px;
}
.color-div{
    color:#2d8cf0;
    font-size: 12px;
    line-height: 20px;
}
</style>
