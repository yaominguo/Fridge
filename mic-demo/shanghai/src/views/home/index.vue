<template>
<div>
    <div class="view-content">
        <div class="content">
            <!-- 背景板 -->
            <Row class="board">
                <Card dis-hover style="height:530px;width:100%">
                    
                </Card>
            </Row>
            <!-- footer -->
            <Row class="footer">
                <Card dis-hover>
                    <Row justify="start" type="flex">
                        <Col span="8" class="footer-col" v-for="(item,index) in list" :key="index">
                            <Col span="12">
                                <Row type="flex" :gutter="20" justify="center" align="top">
                                    <Col span="12"><img class="route-logo" src="" alt=""></Col>
                                    <Col span="12" class="col-title border-right">{{item.permName}}</Col>
                                </Row>
                            </Col>
                            <Col span="12">
                                <Row type="flex" :gutter="20" justify="center" align="middle">
                                    <Col span="24" v-for="(routeName,routeIndex) in item.childList" class="route-click" :key="routeIndex" >
                                        <a @click="toNext(item.permKey,routeName.permKey)">{{routeName.permName}}</a>
                                    </Col>
                                </Row>
                            </Col>
                        </Col>
                    </Row>
                </Card>
            </Row>
        </div>
    </div>
    <Modal v-model="storeShow"
        :mask-closable="false"
        :closable="false"
    >
        <div slot="header" style="font-weight:700">
            请选择分店
        </div>
        <Row :gutter="20">
            <Col span="8" v-for="(store,index) in storeList" :key="index">
                <Card class="store-card" v-on:click.native="checkStore(store.id)">
                    <div style="text-align:center;">
                        <img :src="store.pic" class="route-logo" alt="">
                        <div>{{store.storeName}}</div>
                    </div>
                </Card>
            </Col>
        </Row>
        <div slot="footer"></div>
    </Modal>
 </div>
</template>
<script>
export default {
    props:{
        list:{
            type:Array,
            default() {
                return [];
            }
        },
        userStore:{
            type:Object,
            default() {
                return {};
            }
        },
        storeList:{
            type:Array,
            default() {
                return [];
            }
        }
    },
    data(){
        return{
            storeShow:false,
        }
    },
    methods:{
        // 选择分店,切换分店
        checkStore(id){
            this.$ajax.put(
                this,
                this.$api.CHOOSE_STORE.replace('{id}',id),
                {},(res)=>{
                    this.storeShow=false;
                }
            )
        },
        // 下一步点击事件
        toNext(parentKey,childKey){
            let query={};
            if(parentKey){
                query.parentKey=parentKey;
            }
            if(childKey){
                query.childKey=childKey;
            }
            this.$router.push({
                name:'home',
                query:query
            })
        }
    }
}
</script>

<style scoped>
.content{
    width:100%;
}
.col-title{
    font-weight: bold;
}
.route-logo{
    width:60px;
    height: 60px;
}
.route-logo>img{
    width:100%;height:100%;
}                      
.board,.footer{
    margin-top: 10px;
    background-color: #fff;
}
.footer-col{
    margin-bottom:10px;
    padding:20px;
    float: left;
}
.route-click{
    color:#2d8cf0;
    cursor: pointer;
    text-align: left;
    margin-left: 40px;
}
.border-right{
    border-right:1px solid #000;
    text-align:right;
}

.view-content{
    display: flex;
}
.left-content{
  min-width: 78px;
  background: #001529;
}
</style>

