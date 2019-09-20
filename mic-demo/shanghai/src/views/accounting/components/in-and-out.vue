<template>
<div>
  <template v-if="type == 'register'">
    <Modal :value="show" @on-visible-change="modalChange" title="收支登记" :width="400">
      <Form ref="form" v-if="show" :rules="rules" :label-width="80" :model="formData">
        <FormItem label="类型">
          <span>{{Number(info.amount) >=0 ? '入账' : '出账'}}</span>
        </FormItem>
        <FormItem label="剩余金额">
          <span>{{$com.toMoney(Math.abs(Number(remainAmount)))}}元</span>
        </FormItem>
        <FormItem :label="'本次' + (Number(info.amount) >= 0 ? '入账' : '出账')" prop="count">
          <InputNumber v-model="formData.count" :min="1" :max="Math.abs(Number(remainAmount))" /> 元
        </FormItem>
        <FormItem label="支付方式" prop="paymentWay">
          <Select v-model="formData.paymentWay">
            <Option v-for="item in paymentWay" :key="item.id" :value="item.id + '#' + item.name">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem :label="(Number(info.amount) >= 0 ? '入账' : '出账') + '日期'" prop="receivedTime">
          <DatePicker v-model="formData.receivedTime" format="yyyy-MM-dd" />
        </FormItem>
        <FormItem label="凭证">
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
        <FormItem label="备注">
          <Input v-model="formData.remark" type="textarea" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="handleSubmit" type="primary">提交</Button>
      </div>
    </Modal>
  </template>
  <template v-else-if="type == 'detail'">
    <Modal :value="show" @on-visible-change="modalChange" title="收支明细" :width="600" footer-hide>
      <Table :columns="columns" :data="list" border />
    </Modal>
  </template>
</div>
</template>

<script>
import ImgUploader from '@/components/Helper/Form/image-upload';
export default {
  name: 'InAndOutModal',
  components: {
    ImgUploader,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    showModal: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      show: false,
      code: '',
      list: [],
      imgList: [],
      formData: {
        count: null,
        remark: '',
        paymentWay: null,
        receivedTime: null,
      },
      remainAmount: 0,
      columns: [
        {
          title: '进出账',
          key: 'inorout',
          render: (h, params) => {
            return h('div', Number(this.info.amount) >= 0 ? '入账' : '出账');
          }
        },
        {
          title: '日期',
          key: 'time',
          render: (h, params) => {
            const date = (params.row.receivedTime && params.row.receivedTime.split(' ')[0]) || '暂无';
            return h('div', date);
          }
        },
        {
          title: '金额',
          key: 'money',
          render: (h, params) => {
            return h('div', this.$com.toMoney(Math.abs(Number(params.row.amount))) + ' 元');
          }
        },
        {
          title: '支付方式',
          key: 'paymentWayName',
        },
        {
          title: '备注',
          key: 'remark',
        },
      ],
      rules: {
        count: [{
          required: true,
          message: '请输入金额',
        }],
        paymentWay: [{
          required: true,
          message: '请选择支付方式',
        }],
        receivedTime: [{
          required: true,
          message: '请选择支付时间',
        }],
      },
      paymentWay: [],
    }
  },
  mounted() {
  },
  methods: {
    getList() {
      this.$ajax.post(
        this,
        this.$api.POST_COST_LIST,
        { roomCostId: this.info.id, pageNo: 1, pageSize: 10000 },
        res => {
          this.list = this.$com.confirm(res, 'data.content', []);
        },
        true,
      )
    },
    // 查询收款方式列表
    getPayMent(){
      this.$ajax.get(
        this,
        this.$api.PAYMENT_LIST_GET,
        null,
        (res)=>{
          this.paymentWay = res.data.content;
        },
        true,
      )
    },
    getAmount() {
      this.$ajax.get(
        this,
        this.$api.GET_REMAIN_COST + this.info.id,
        null,
        res => {
          this.remainAmount = this.$com.confirm(res, 'data.content.val', 0);
        },
        true,
      )
    },
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
    modalChange(val) {
      this.remainAmount = 0;
      this.formData = {
        count: null,
        remark: '',
        receivedTime: null,
      };
      this.$emit('close', val);
    },
    handleComplete(response,filename){
      response = response.data.content;
      this.imgList.push({
        picId:response.id,
        name:response.name,
        picPath:response.path,
        type: 'roomCostRecord',
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
                type: 'roomCostRecord',
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
                    type:'roomCostRecord'
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
        let money = this.formData.count;
        if (Number(this.info.amount) >=0 ) {
          money = '-' + money;
        }
        const paymentWay = this.formData.paymentWay.split('#');
        const params = {
          amount: money,
          leaseId: this.info.leaseId,
          remark: this.formData.remark,
          resourcesPics: this.imgList,
          roomCostId: this.info.id,
          paymentWay: paymentWay[0],
          paymentWayName: paymentWay[1],
          receivedTime: this.formData.receivedTime,
        };
        this.modalChange(false);
        this.$ajax.post(
          this,
          this.$api.POST_ROOM_COST,
          params,
          res => {
            this.$Message.success('登记成功');
            this.$emit('success');
          }
        )
      })
    },
  },
  watch: {
    showModal(cur, past) {
      if (cur == past) return;
      if (cur && this.type == 'detail') {
        this.getList();
      } else if (cur && this.type == 'register') {
        this.getCode();
        this.getAmount();
        this.getPayMent();
      }
      this.show = cur;
    },
  },
}
</script>
