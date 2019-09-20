<template>
    <div>
        <p class="title-color">1、停车位类型<Button type="primary" class="leftM20" @click="addType" icon="md-add" ghost>添加停车位类型</Button></p>
        <Row style="margin-top:20px;">
	        <template v-for="(item,parkingTypeIndex) in parkingTypeList">
        		<Checkbox :disabled="item.isDefault=='1'" :key="parkingTypeIndex" class="ml20" true-value='1' false-value='0' large v-model="item.isChecked">
        	    {{item.typeName}}
        		</Checkbox>
        		<Icon class="cursorP" v-if="item.id === undefined" :key="parkingTypeIndex+'icon'" @click="deleteRow(item,parkingTypeIndex)" color="#507bea" size="24" type="ios-trash-outline" />
	        </template>
       	</Row>
       <Row class="row-center">
           <Button type="primary" @click="save()">保存</Button>
       </Row>
       <Modal :mask-closable="false" title="新增停车位类型" @on-cancel="closeAdd" v-model="addShow">
           <Form ref="addData" :model="addData" :rules="addDataRule" :label-width="80">
               <FormItem label="名称" prop="typeName" class="ivu-form-item-required">
					<Input v-model="addData.typeName" placeholder="请输入"></Input>
				</FormItem>
           </Form>
           <div slot="footer">
               <Button type="primary" ghost @click="closeAdd">取消</Button>
               <Button type="primary" @click="okAdd">保存</Button>
           </div>
       </Modal>
    </div>
</template>
<script>
export default {
    data(){
        const VtypeName=(rule,value,callback)=>{
            if(value == ''){
                callback(new Error('请输入类型名称'))
            }else{
                let flag=false;
                this.parkingTypeList.forEach((e)=>{
                    if(e.typeName == value){
                        flag=true;
                    }
                })
                if(!flag){
                    callback();
                }else{
                    callback(new Error("名称已存在"))
                }
            }
        }
        return{
            parkingTypeList:[],
            addShow:false,
            addData:{
                typeName:''
            },
            addDataRule:{
                typeName:[
                    {validator: VtypeName, trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        // 保存按钮
        save(){
            let params=JSON.parse(JSON.stringify(this.parkingTypeList));
            params.forEach((e)=>{
                if(e.createTime) delete e.createTime;
            })
            this.$ajax.post(
                this,
                this.$api.PARK_TYPES_Add_post,
                params,
                (res)=>{
                    this.$Message.success('保存成功');
                    this.getTypes();
                }
            )
        },
        // 新增按钮
        addType(){
            this.addShow=true;
        },
        // 关闭modal
        closeAdd(){
            this.$refs['addData'].resetFields();
            this.addShow=false;
        },
        // 确认modal
        okAdd(){
            this.$refs.addData.validate((valid)=>{
                if(!valid) return;
                let name=JSON.parse(JSON.stringify(this.addData.typeName));
                this.parkingTypeList.push({
                    typeName:name,
                    isDelete:'1',
                    isChecked:'1',
                    isDefault:'0'
                })
                this.closeAdd();
            })
        },
        deleteRow(item,index){
            if(item.id){

            }else{
                this.parkingTypeList.splice(index,1);
            }
        },
        getTypes(){
            this.$ajax.get(
                this,
                this.$api.PARK_TYPES_GET,
                {},
                (res)=>{
                    this.parkingTypeList=res.data.content;
                }
            )
        }
    },
    mounted(){
        this.getTypes();
    }
}
</script>
<style scoped>
    .title-color{
        color:#507bea;
        font-weight: 400;
        font-size: 16px;
        padding-bottom:20px;
        border-bottom: 1px solid #e6e8ef;
        margin-bottom:10px;
    }
    .leftM20{
        margin-left: 20px;
    }
    .row-center{
        text-align: center;
        margin:20px;
    }
    .cursorP{
    	cursor: pointer;
    }
    .ml20{
    	margin-left: 20px;
    	margin-right: 0;
    }
</style>
