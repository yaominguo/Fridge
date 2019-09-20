<template>
    <div class="zoom-div">
        <div class="list-card" v-if="!showHeader" v-for="(item,index) in data" :key="index">
            <Card :padding=0 dis-hover>
                <Row type="flex" justify="center" align="middle" class="card-content">
                    <Col span="24" class="col-name">
                        <Input v-model="item.name" :placeholder="'请输入'+label" v-if="item.isEdit == true"></Input>
                        <p v-else>{{item.county}}</p>
                    </Col>
                </Row>
                <div class="card-opeation">
                    <div v-if="item.isEdit == true" class="width100">
                        <div v-for="(ac,actionIndex) in saveActions" 
                            :class="ac.class" 
                            @click="handleClick(ac,item,index)" 
                            :key="actionIndex">
                            <Icon  
                                :type="ac.icon"
                                color="#898989" 
                                size="18"
                                style="vertical-align:sub;"
                            >
                            </Icon>
                            {{ac.name}}
                        </div>
                        
                    </div>
                    <div v-else class="width100">
                        <div v-for="(ac,actionIndex) in actions"
                            :class="ac.class" 
                            @click="handleClick(ac,item,index)"
                            :key="actionIndex">
                            <Icon  
                                :type="ac.icon"
                                color="#898989" 
                                size="18"
                                style="vertical-align:sub;"
                            >
                            </Icon>
                            {{ac.name}}
                        </div>

                    </div>
                </div>
            </Card>
        </div>
        <Card v-if="!showHeader" class="list-card add-card" :padding=0 dis-hover>
            <div @click="add">
                <Icon type="ios-add" size="54"  />
            </div>
        </Card>
        <!-- ShowHeader(区域展示) -->
        <div class="over-card" v-if="dataShow && showHeader" v-for="(item,index) in data" :key="index">
            <h4 class="house-card-list-header">{{item.title}}
                <span class="house-card-list-header-subtitle">({{ item.list.length }})</span>
            </h4>
            <div class="list-card" v-for="(li,listIndex) in item.list" :key="listIndex">
                <Card :padding=0 dis-hover>
                    <Row type="flex" justify="center" align="middle" class="card-content">
                        <Col span="24" class="col-name">
                            {{li.name}}
                        </Col>
                        <Col span="24" class="col-address">
                            {{li.address}}
                        </Col>
                    </Row>
                    <div class="card-opeation">
                        <div class="width100">
                            <div v-for="(ac,actionIndex) in actions"
                                :class="ac.class" 
                                @click="handleClick(ac,li,index)"
                                :key="actionIndex">
                                <Icon  
                                    :type="ac.icon"
                                    color="#898989" 
                                    size="18"
                                    style="vertical-align:sub;"
                                >
                                </Icon>
                                {{ac.name}}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            <Card v-if="dataShow && showHeader" class="list-card add-card" :padding=0 dis-hover>
                <div  @click="add(item)">
                    <Icon type="ios-add" size="54"/>
                </div>
            </Card>
        </div>
        <Card v-if="dataShow && showHeader && data.length == 0" class="list-card add-card" :padding=0 dis-hover>
            <div @click="add">
                <Icon type="ios-add" size="54"  />
            </div>
        </Card>

    </div>
</template>
<script>
export default {
    props:{
        label:{//placeholder
            type:String,
            required:true,
        },
        dataSource:{ //数据
            type: Array,
            default: [],
        },
        actions:{//操作
            type:Array,
            default: function() {
                return [];
            }
        },
        saveActions:{//操作
            type:Array,
            default: function() {
                return [];
            }
        },
        showHeader:{//是否区域显示（小区管理）
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            data:[],
            dataShow:false,
        }
    },
    methods:{
        // 点击事件
        handleClick(action,item,index){
            item.index=index;
            if(action.click == 'reset'){
                if(item.id){
                    this.data[index].name=this.data[index].oldName;
                    this.data[index].isEdit=false;
                    this.$emit('reset',item);
                }else{
                    this.$emit('deleteRow',item)
                }
                
            }else{
                this.$emit(action.click,item);
            }
        },
        // 整理数据
        forMatData(){
            this.dataShow=false;
            this.data=[];
            let arr=[];
            let tempArr=JSON.parse(JSON.stringify(this.dataSource));
            tempArr.map((e)=>{arr.push(e.zoneName)})
            arr=arr.filter((x, index,self)=>self.indexOf(x)===index);
            arr.forEach((e)=>{
                this.data.push({
                    title:e,
                    list:[]
                })
            })
            
            tempArr.forEach((e)=>{
                this.data.forEach((c)=>{
                    if(e.zoneName == c.title){
                        c.list.push(e)
                    }
                })
            })
            this.dataShow=true;
        },
        toSetData(){
            this.data=JSON.parse(JSON.stringify(this.dataSource));
            this.data.forEach((e)=>{
                e.oldName=e.name;
            })
        },
        // 新增
        add(data){
            this.$emit('add',data);
        }
    },
    watch:{
        dataSource:function(){
            if(this.showHeader){
                this.forMatData();
            }else{
                this.toSetData();
            }
        }
    }
}
</script>
<style scoped>
.zoom-div{
    overflow: hidden;
}
.over-card{
    overflow: hidden;
}
.card-content{
    height: 100px;
    text-align: center;
    padding:10px;
    color: #4A4A4A;
    border-bottom: 1px solid #E8E8E8;
}
.card-opeation{
    background-color: #FAFAFA;
    height:30px;padding:5px;
}
.card-opeation>div{
    text-align: center;
    float: left;width: 100%;
}
.card-opeation>div>i{
    cursor: pointer;
}
.card-opeation .width100 >div{
    width: 50%;display: inline-block;
    cursor: pointer;font-size: 12px;
    line-height: 12px;
}
.op-left{
    border-right: 1px solid #E8E8E8;
}
.list-card{
    float: left;
    width: 18%;
    margin:1%;
}
.item-title{
    background-color: #a7a0a0;color:#000;
    height:30px;font-weight: bold;padding-left:10px;
    line-height: 30px;
}
.col-name{
    font-weight: bold;
}
.col-address{
    color:#686868;
}
.house-card-list-header {
  height: 40px;
  line-height: 40px;
  text-indent: 16px;
  border-bottom: 1px solid #dcdee2;
  background: #f0f0f0;
  margin-bottom: 8px;
}
.house-card-list-header-subtitle {
  font-size: 12px;
  font-weight: normal;
}
.add-card{
    height: 130px;text-align: center;
    line-height: 130px;cursor: pointer;
    background-color: #FAFAFA;
}
</style>

