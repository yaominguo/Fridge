<style scoped></style>
<template ref="test1111">
	<Modal
      v-model="model"
      title="新增账单"
      :width="400"
      :closable="false"
      :mask-closable="false"
			@on-cancel="esc"
      :footer-hide="true">
      <Form v-if="model" ref="addLeaseForm" :label-width="80" label-position="right" :rules="rules" :model="addLeaseData">
        <FormItem label="账单项目" prop="acctName">
          <Select v-model="addLeaseData.acctName" placeholder="请选择">
           <Option v-for="item in typeList" :value="item.name" :key="item.id">{{item.name}}</Option>
           <Option value="other">其他</Option>
         </Select>
        </FormItem>
        <FormItem label="应收金额" prop="receivable">
          <InputNumber :min="1" v-model="addLeaseData.receivable" placeholder="请输入应收金额"/></InputNumber>
        </FormItem>
        <FormItem label="收款日" prop="receivedTime">
          <DatePicker v-model="addLeaseData.receivedTime" placeholder="请选择应收款日"/>
        </FormItem>
        <FormItem label="所属账期" prop="sszq">
          <Select v-model="addLeaseData.sszq" @on-change="zqChange" placeholder="请选择">
          	<Option v-for="item in rentList" :key="item.id" :value="item.startToEnd">{{item.startToEnd}}</Option>
          	<!-- 列表内 -->
          </Select>
        </FormItem>
        <FormItem label="照片凭证" prop="pic">
          <ImgUploader 
					:uploadButton="'upload'" 
					:maxUploads="3" 
					:url="$api.FILE_UPLOAD_POST" 
					:defaultList="addLeaseData.picList"
          @on-complete="uploadComplete"
					@on-remove="uploadRemove"
					@showUploadImg="getReturn"
					:code="code"
					:isPhone="true"
					></ImgUploader>
        </FormItem>
        <FormItem label="应收备注">
          <Input v-model="addLeaseData.note" type="textarea" />
        </FormItem>
        <div style="textAlign: center;">
          <Button style="margin-right:40px;" @click="esc">取消</Button>        	
          <Button type="primary" @click="submit">提交</Button>
        </div>
      </Form>
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
			rentList:Array,
		},
		data(){
			const validatePic=(rule,value,callback)=>{
				if(this.addLeaseData.picList.length>3){
					callback(new Error('最多上传3张图片'))
				}else{
					callback();
				}
			}
			return {
				typeList:[],
				rules:{
					acctName:[
						{ required: true,  message: '请选择账单项目', trigger: 'change' }
					],
					receivable:[
						{required: true,type: 'number',message: '请输入应收金额',trigger: 'change'}
					],
					receivedTime:[
						{ type:'date',required: true,  message: '请选择收款日', trigger: 'blur' }
					],
					sszq:[
						{ required: true,  message: '请选择所属账期', trigger: 'change' }
					],
					pic:[
						{ validator: validatePic, trigger: 'change' }
					]
				},
				addLeaseData:{
					picList:[],
					receivable:1,
				},
				code:'',
			}
		},
		mounted(){
			this.getFeeTypeList();
		},
		methods:{
			zqChange(val){
				for(let i in this.rentList ){
					if(this.rentList[i].startToEnd == val){
						let item = this.rentList[i];
						this.addLeaseData.startTime = this.$com.changeDate(item.startTime);
						this.addLeaseData.endTime = this.$com.changeDate(item.endTime);
						this.addLeaseData.leaseAcctId=item.leaseAcctId;
						this.addLeaseData.leaseId=item.leaseId;
						this.addLeaseData.roomId=item.roomId;
						this.addLeaseData.storeId=item.storeId;
						//this.addLeaseData.acctSign='hand';
						//this.addLeaseData.acctName='手动添加';
					}
				}
			},
			getCode(){
					this.$ajax.get(this, this.$api.GET_FILE_UPLOAD_CODE_GET, {}, res => {
							this.code = res.data.content.code;
					});
			}, 
			getFeeTypeList() {
		       this.$ajax.get(
		        this,
		        this.$api.GET_FEE_ALL,
		        {},
		        res => {
		            this.typeList=res.data.content[0].acctTypes;
		        }
		      );
		    },
			esc(){
				this.addLeaseData = {};
				this.addLeaseData.picList=[];
				// this.getCode();
				this.$emit('esc')
			},
			submit(){
				this.$refs.addLeaseForm.validate(valid => {
		            if (!valid) return;
		            const submitData =JSON.parse(JSON.stringify(this.addLeaseData));
					this.addLeaseData = {};
					this.addLeaseData.picList=[];
					this.$emit('submitLease',submitData);
		        })
			},
			uploadComplete(response,type){
			  let data = response.data.content;
			    this.addLeaseData.picList.push({
			      picId: data.id,
			      picPath: data.path,
			      type: "manual"
					});
					this.$refs.addLeaseForm.validateField("pic")
			},
			uploadRemove(item,index) {
					if(item.flag && item.flag == 'phone'){
                this.$ajax.delete(this, this.$api.DELETE_FILE_UPLOAD_POST.replace("{code}", this.code).replace("{id}",
                    item.picId), {}, res => {
                        this.addLeaseData.picList.splice(index,1);
                        this.$refs.addLeaseForm.validateField("pic");
                });
            }else{
                this.addLeaseData.picList.splice(index,1);
                this.$refs.addLeaseForm.validateField("pic")
            }

			    // this.addLeaseData.picList.forEach((ele, index) => {
			    //   if (ele.picId == item.picId) {
			    //     this.addLeaseData.picList.splice(index, 1);
			    //   }
			    // });
			},
			// 同步手机端上传图片
			getReturn(){
					this.$ajax.get(
							this,
							this.$api.GET_FILE_UPLOAD_POST.replace("{code}", this.code), {},
							res => {
									if(res.data.content.length>0){
											let data=res.data.content;
											if(this.addLeaseData.picList.length==0){
													data.forEach((d)=>{
															this.addLeaseData.picList.push({
																	picId:d.id,
																	picPath:d.path,
																	flag:'phone'
															})
													})
											}else{
													data.forEach((d)=>{
															let flag=true;
															this.addLeaseData.picList.forEach((e)=>{
																	if(d.id==e.picId){
																			flag=false;
																	}
															})
															if(flag){
																	this.addLeaseData.picList.push({
																			picId:d.id,
																			picPath:d.path,
																			flag:'phone'
																	})
															}
													})
											}
											this.$refs.addLeaseForm.validateField("pic");
									}
							}
					);
			}, 
		},
	}
</script>