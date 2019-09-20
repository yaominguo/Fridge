<template>
    <Modal :mask-closable="false" :value="show" @on-visible-change="modalChange" title="报修处理登记" :width="400">
      <Form ref="form" v-if="show" :rules="rules" :label-width="80" :model="formData">
        <FormItem label="登记时间" prop="registerTime">
          <DatePicker @on-change="handleDateChange" :value="formData.registerTime" format="yyyy-MM-dd"/>
        </FormItem>
        <FormItem label="情况描述" prop="situationDescription">
          <Input v-model="formData.situationDescription" type="textarea" />
        </FormItem>
        <FormItem label="处理状态" prop="status">
          <Select v-model="formData.status">
            <Option v-for="item in options" :key="item.id" :value="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="现场照片" prop="picIdList">
          <ImgUploader
            :defaultList="imgList"
            @on-complete="handleComplete"
            @on-remove="handleRemove"
            @showUploadImg="getReturn"
            :isPhone="true"
            :url="$api.IMG_UPLOAD_URL"
            :maxUploads="5"
            :code="code"
            uploadButton="button"
          />
        </FormItem>
        <FormItem label="处理人">
          <Input v-model="formData.dealingPeople"/>
        </FormItem>
        <FormItem label="联系方式" prop="phone">
          <Input v-model="formData.phone"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="handleSubmit" type="primary">提交</Button>
      </div>
    </Modal>
</template>

<script>
import ImgUploader from '@/components/Helper/Form/image-upload';
export default {
  name: 'RepairModal',
  components: {
    ImgUploader,
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    repairId: {
      type: String,
      required: true,
    },
  },
  data() {
    const checkImgList = (rule, value, callback) => {
      if (this.imgList.length<=0) {
        callback(new Error('请上传现场照片'));
      } else {
        callback();
      }
    };
    const checkPhone = (rule, value, callback) => {
      if (value && !this.$com.checkPhone(value)) {
        callback(new Error('手机号码有误'));
      } else {
        callback();
      }
    };
    return {
      show: false,
      code: '',
      imgList: [],
      formData: {
        registerTime: null,
        situationDescription: '',
        status: null,
      },
      rules: {
        registerTime: [{
          required: true,
          message: '请选择登记时间',
        }],
        situationDescription: [{
          required: true,
          message: '请输入情况描述',
        }],
        status: [{
          required: true,
          message: '请选择处理状态',
        }],
        picIdList: [{
          required: true,
          validator: checkImgList,
        }],
        phone: [{
          validator: checkPhone,
        }],
      },
      options: [
        {id: '0', name: '待处理'},
        {id: '1', name: '处理中'},
        {id: '2', name: '已处理'},
      ],
    }
  },
  mounted() {
  },
  methods: {
    getCode(){
      this.$ajax.get(
        this,
        this.$api.GET_FILE_UPLOAD_CODE_GET + "?number=1",
        null,
        res => {
          let {code}=res.data.content;
          this.code=code.split(',')[0];
        },
        true,
      );
    },
    handleDateChange(date) {
      this.formData.registerTime = date;
    },
    modalChange(val) {
      this.formData = {
        registerTime: null,
        situationDescription: '',
        status: null,
      };
      this.imgList = [];
      this.$emit('close', val);
    },
    handleComplete(response,filename){
      response = response.data.content;
      this.imgList.push({
        picId:response.id,
        name:response.name,
        picPath:response.path,
        type: 'repair',
      })
    },
    handleRemove(item){
      const index = this.imgList.findIndex(ele => ele.picId == item.picId);
      this.imgList.splice(index, 1);
      this.deleteForPhone(item.flag, this.code, item.picId);
    },
    deleteForPhone(flag,code,id){
      if(flag != 'phone') return ;
      this.$ajax.delete(
        this,
        this.$api.DELETE_FILE_UPLOAD_POST.replace("{code}", code).replace("{id}",id),
        {},
        res => {}
      );
    },
    getReturn(){
      this.$ajax.get(
        this,
        this.$api.GET_FILE_UPLOAD_POST.replace("{code}", this.code),
        null,
        res => {
          if(res.data.content.length>0){
            const data = res.data.content;
            const result = data.map(e => {
              return {
                picId:e.id,
                picPath:e.path,
                return:'phone',
                flag:true,
                type: 'repair',
              };
            })
            if (this.imgList.length == 0) {
              this.imgList = result;
            } else {
              result.forEach((d)=>{
                let flag=true;
                this.imgList.forEach((e)=>{
                  if(d.picId == e.picId){
                    flag = false;
                  }
                })
                if(flag){
                  this.imgList.push({
                    picId:d.picId,
                    picPath:d.picPath,
                    type:'repair'
                  })
                }
              })
            }
          }
        }
      );
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) return;
        const params = Object.assign(this.formData, {
          repairId: this.repairId,
          resourcePicList: this.imgList,
        });
        this.$ajax.post(
          this,
          this.$api.POST_REPAIR_RECORD,
          params,
          res => {
            this.$emit('success');
          }
        );
      })
    },
  },
  watch: {
    showModal(cur, past) {
      if (cur == past) return;
      this.getCode();
      this.show = cur;
    },
  },
}
</script>
