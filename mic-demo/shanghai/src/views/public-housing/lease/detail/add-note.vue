<style scoped></style>
<template>
  <Modal
    v-model="model"
    title="记账"
    :width="500"
    :closable="false"
    :mask-closable="false"
    @on-cancel="cancel"
   >
        <Form v-if="model"  ref="noteForm" :rules="rules" label-position="right" :model="addData" :label-width="80" >
            <FormItem label="记账科目" prop="type">
            <Row>
              <Col span="18">
                <Select v-model="addData.type">
                    <Option v-for="item in feeTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </Col>
            </Row>
            </FormItem>
          <FormItem label="账单项目" prop="acctId">
            <Row>
              <Col span="18">
                <Select placeholder="请选择" label-in-value v-model="addData.acctId"  @on-change="itemChange">
                    <Option v-for="item in oneItemList" :value="item.id" :key="
                    item.id">{{item.name}}</Option>
                </Select>
              </Col>
            </Row>
          </FormItem>
          <FormItem prop="acctDetailId">
            <Row>
              <Col span="10">
                <Select placeholder="请选择子项目" label-in-value @on-change="childItemChange" v-model="addData.acctDetailId">
                  <Option v-for="item in twoItemList" :value="item.id" :key="
                    item.id">{{item.name}}</Option>
                </Select>   
              </Col>
              <Col  offset="2" span="4">
                <Button to="#/sys/configuration" target="_blank">自定义项目</Button>   
              </Col>
            </Row>
          </FormItem> 
          <FormItem label="选择账期">
            <Row>
              <Col span="8">
                <FormItem prop="startTime">
                  <DatePicker type="date" placeholder="开始日期" :options="startOptions" v-model="addData.startTime"></DatePicker>
                </FormItem>
              </Col>
              <Col span="2" style="text-align: center;">至</Col>
              <Col span="8">
                <FormItem prop="endTime">
                  <DatePicker type="date" placeholder="结束日期" :options="endOptions" v-model="addData.endTime"></DatePicker>
                </FormItem>
              </Col>
            </Row>
          </FormItem>
          <FormItem :label="whatType == 'pay' || whatType =='yetPay' ? '应付金额' : '应收金额'" prop="money">
              <InputNumber :min="0.1" v-model="addData.money"></InputNumber>&nbsp;元
          </FormItem>
          <FormItem :label="whatType == 'pay' || whatType =='yetPay' ? '应付日期' : '应收日期'" prop="shoudeDate">
              <Row>
                  <Col span="18">
                      <DatePicker type="date" placeholder="请选择日期" v-model="addData.shoudeDate"></DatePicker>
                  </Col>
              </Row>
          </FormItem>
          <template v-if="whatType == 'yetPay' || whatType =='yetReceive'">
            <FormItem :label="whatType == 'yetPay' ? '实付金额' : '实收金额'">
              <Row>
                  <Col span="18">
                      {{addData.money?addData.money+' 元':''}}
                  </Col>
              </Row>
            </FormItem>
            <FormItem :label="whatType == 'yetPay' ? '实付日期' : '实收日期'" prop="realDate">
              <Row>
                  <Col span="18">
                      <DatePicker type="date" placeholder="请选择日期" v-model="addData.realDate"></DatePicker>
                  </Col>
              </Row>
            </FormItem>
            <FormItem label="收支方式" prop="paymentWay">
              <Row>
                <Col span="18">
                  <Select v-model="addData.paymentWay">
                      <Option v-for="item in payList" :value="item.id" :key="
                      item.id">{{item.name}}</Option>
                  </Select>
                </Col>
              </Row>
            </FormItem>
          </template>
          <FormItem label="房源地址">
            {{base_info.roomName}}
          </FormItem >
          <FormItem label="相关租约">    
            {{base_info.tenantName}} {{base_info.leaseNo}}
            <br>
            ({{this.$com.changeDate(base_info.startTime)}} 至 {{this.$com.changeDate(base_info.endTime)}})
          </FormItem >
          <FormItem label="添加图片" prop="pic">
             <ImgUploader 
             :uploadButton="'upload2'" 
             :maxUploads="3" 
             :url="$api.FILE_UPLOAD_POST" 
             :defaultList="addData.picList"
             @on-complete="uploadComplete"
             @on-remove="uploadRemove"
             @showUploadImg="getReturn"
             :code="code"
             :isPhone="true"
              ></ImgUploader>
          </FormItem>
          <FormItem label="记账备注">
            <Row>
              <Col span="18">
                <Input v-model="addData.note" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入"></Input>
              </Col>
            </Row>
          </FormItem>
        </Form>
        <div slot="footer">
            <Button  size="large"   @click="cancel">取消</Button>
            <Button type="primary" size="large"  @click="ok">确认</Button>
        </div>
      </Modal>
</template>
<script>
  import ImgUploader from '@/components/Helper/Form/image-upload';
  export default{
    components: {
        ImgUploader
    },
    props:{
      model:Boolean,
      base_info:Object,
    },
    data(){
      const validatePic=(rule,value,callback)=>{
				if(this.addData.picList.length>3){
					callback(new Error('最多上传3张图片'))
				}else{
					callback();
				}
			}
      return {
        startOptions:{
         disabledDate :function(date) {
          const dataEnd = this.addData.endTime;
          //结束时间以后不可以选择 
          if(dataEnd){
            return  dataEnd.valueOf() < date.valueOf();  
          }else{
            return false;
          }
        }.bind(this)
      },
      endOptions:{
        disabledDate :function(date) {
          //结束时间不小开始时间
          const dataStart = this.addData.startTime;
          if(dataStart){
            return date.valueOf() < dataStart.valueOf();
          }else{
            return false;
          }
        }.bind(this)
      },
        payList:[],
        oneItemList:[],//一级项目
        twoItemList:[],//二级项目
          feeTypeList:[
            {
              label:'已收款（预收）',
              value:'0',
            },
            {
              label:'应收款',
              value:'1',
            },
            {
              label:'已付款（预付）',
              value:'2',
            },
            {
              label:'应付款',
              value:'3'
            }
          ],
        rules:{
          type:[
            { required: true,  message: '请选择记账科目', trigger: 'change' }
          ],
          isRoomRelation:[
            { required:true, message:'请选择房源地址', trigger:'change'}
          ],
          sectId:[
            {required:true,message:'请选择小区',trigger:'change'}
          ],
          houseId:[
            {required:true,message:'请选择房门号',trigger:'change'}
          ],
          roomId:[
            {required:true,message:'请选择房间号',trigger:'change'}
          ],
          acctId:[
            {required:true,message:'请选择记账主项目',trigger:'change'}
          ],
          acctDetailId:[
            {required:true,message:'请选择记账子项目',trigger:'change'}
          ],
          startTime:[
            {required:true, type:'date',message:'请选择开始时间',trigger:'change'}
          ],
          endTime:[
            {required:true, type:'date',message:'请选择结束时间',trigger:'change'}
          ],
          money:[
            {required:true, type:'number',message:'请输入金额',trigger:'change'}
          ],
          shoudeDate:[
            {required:true, type:'date',message:'请选择时间',trigger:'change'}
          ],
          realDate:[
            {required:true, type:'date',message:'请选择时间',trigger:'change'}
          ],
          paymentWay:[
            {required:true,message:'请选择付款方式',trigger:'change'}
          ],
          pic:[
						{ validator: validatePic, trigger: 'change' }
					]
        },
        addData:{
          picList:[],
          money:1,
          acctId:'',
          acctDetailId:'',
        },
        code:''
      }
    },
    computed:{
      whatType(){
        if(this.addData.type == '0'){
        //已收款
          return 'yetReceive'
        }else if(this.addData.type =='1'){
          //应收
          return 'receive'
        }else if(this.addData.type == '2'){
          //已付款
          return 'yetPay'
        }else{
          //未选择 或者 应付
          return 'pay'
        }
      },
    },
    mounted(){
      //获取一级账单项目
      this.getOneItemList();
      this.payWayList();
    },
    methods:{
       //记账方式列表
      payWayList(){
        this.$ajax.get(
          this,
          this.$api.GET_PAY_METHODS,
          {},
          (res) =>{
            const list = res.data.content;
            this.payList = list;
          }
        )
      },
      getCode(){
					this.$ajax.get(this, this.$api.GET_FILE_UPLOAD_CODE_GET, {}, res => {
							this.code = res.data.content.code;
					});
			}, 
      uploadComplete(response,type){
          let data = response.data.content;
          this.addData.picList.push({
            picId: data.id,
            picPath: data.path,
            type: "manual"
          });
          this.$refs.noteForm.validateField("pic");
      },
      uploadRemove(item,index) {
        if(item.flag && item.flag == 'phone'){
            this.$ajax.delete(this, this.$api.DELETE_FILE_UPLOAD_POST.replace("{code}", this.code).replace("{id}",
                item.picId), {}, res => {
                    this.addData.picList.splice(index,1);
                    this.$refs.noteForm.validateField("pic");
            });
        }else{
            this.addData.picList.splice(index,1);
            this.$refs.noteForm.validateField("pic")
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
											if(this.addData.picList.length==0){
													data.forEach((d)=>{
															this.addData.picList.push({
																	picId:d.id,
																	picPath:d.path,
																	flag:'phone'
															})
													})
											}else{
													data.forEach((d)=>{
															let flag=true;
															this.addData.picList.forEach((e)=>{
																	if(d.id==e.picId){
																			flag=false;
																	}
															})
															if(flag){
																	this.addData.picList.push({
																			picId:d.id,
																			picPath:d.path,
																			flag:'phone'
																	})
															}
													})
											}
											this.$refs.noteForm.validateField("pic");
									}
							}
					);
			}, 
      //一级账单项目
      getOneItemList(){
        this.$ajax.get(
          this,
          this.$api.NOTE_GET_CUSTOMACCTYPE.replace('{id}','1'),
          {},
          (res) => {
            const list = res.data.content;
            this.oneItemList  = list;
        })
      },
      //二级账单项目
      getTwoItemList(val){
        this.$ajax.get(
          this,
          this.$api.NOTE_GET_CUSTOMACCTYPE.replace('{id}',val),
          {},
          (res) => {
            this.twoItemList = [];
            const list = res.data.content;
            this.twoItemList  = list;
        })
      },
       itemChange(item){
        //console.log('11',item)
        if(!item){ return }
        this.addData.acctName = item.label;
        this.addData.acctDetailName ='';
        this.addData.acctDetailId = '';
        this.twoItemList = [];
        this.getTwoItemList(item.value);
        },
        //二级账单项目改变
        childItemChange(item){
          //console.log('22',item)
            if(!item){
              this.addData.acctDetailName = '';
            }else{
              this.addData.acctDetailName = item.label;
            }
        },

        cancel(){
          this.addData = {};
          this.addData.picList=[];
          this.addData.money=1;
          this.$emit('esc')
        },
        ok(){
          this.$refs.noteForm.validate(valid => {
            if (!valid) return;
            const submitData = JSON.parse(JSON.stringify(this.addData));
            submitData.startTime = this.$com.changeDate(submitData.startTime);
            submitData.endTime = this.$com.changeDate(submitData.endTime);
            submitData.shoudeDate = this.$com.changeDate(submitData.shoudeDate);
            submitData.realDate = this.$com.changeDate(submitData.realDate);
            submitData.isRoomRelation = '1';
            submitData.address=this.base_info.roomName;
            this.addData = {};
            this.addData.picList=[];
            this.addData.money=1;
            //alert('通过')
            this.$emit('submitNote',submitData)
            
          })
         
        },
    },
  }
</script>
