<template>
    <Card class="card" dis-hover>
        <!-- 步骤条 -->
        <div id="steps">
            <Row type="flex" justify="center">
                <Col span="10" :offset="3">
                <Steps :current="current">
                    <Step title="停车位信息"></Step>
                    <Step title="价格信息补充"></Step>
                </Steps>
                </Col>
            </Row>
        </div>
       <formList :custodyNum="custodyNum" :payNum="payNum" :parkingList="data" :commuityForm="form" @next="next" v-if="current === 0"></formList>
       <priceList  :priceList="data" :commuityForm="form" @save="save" @last="last" v-if="current === 1"></priceList>
    </Card>
</template>
<script>
import formList from "./formList.vue";
import priceList from "./priceList.vue";
export default {
    components: {
        formList,
        priceList
    },
    data(){
        return{
            current:0,
            data:[],
            form:{},
            custodyNum:'',
            payNum:''
        }
    },
    methods:{
        next(list,form){
            this.data=list;
            this.form=form;
            this.current=1;
        },
        last(list,form){
            this.data=list;
            this.form=form;
            this.current=0;
        },
        save(list,form){
            let arr=JSON.parse(JSON.stringify(list));
            arr.forEach((e)=>{
                e.villageId=form.villageId;
                e.villageName=form.villageName;
                e.address=form.address;
            })
            this.$ajax.post(
                this,
                this.$api.PARKING_BATCH_POST,
                arr,
                (res)=>{
                    this.$Message.success('新增成功');
                    this.$router.push({
                        name:'asset/parking'
                    })
                }
            )
        },
        getRent(){
            this.$ajax.get(
                this,
                this.$api.RENT_RELATED,
                {},
                (res)=>{
                    let testData={
                        parkType:'',
                        purpose:'',
                        acquireWay:'',
                        contributor:'',
                        parkArea:'',
                        deposit:'',
                        hourRent:'',
                        monthRent:'',
                        payNum:'',
                        custodyNum:'',
                    }
                    let data;
                    if(res.data != null && res.data.content){
                        data=res.data.content;
                    }else{
                        data=null;
                    }
                    if(data == null || data == ''){
                        this.formData.rentType='1';
                        this.number1='10';
                    }else{
                        if(data.deposit != null){
                            testData.custodyNum=data.deposit;
                            testData.payNum=data.rent;
                            this.custodyNum=data.deposit;
                            this.payNum=data.rent;
                        }
                    }
                    this.data.push(
                        testData
                    )
                }
            )
        }
    },
    mounted(){
        this.getRent();
    }
}
</script>
<style scoped>
    #steps {
		margin-top: 10px;
		padding: 20px 0;
	}
</style>
