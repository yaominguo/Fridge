<template>
  <div>
    <InforBar />
    <Table border :columns="columns" :data="contractList" />
    <Modal v-model="picShow" title="照片凭证">
      <div class="align-div" v-if="picList.length==0">无内容</div>
      <img class="img-modal" v-else v-for="(item,index) in picList" :key="index" :src="item.picPath">
    </Modal>
  </div>
</template>

<script>
import InforBar from './info';

export default {
  name: 'ContractDetail',
  props:{
    lease:{
      type:Object,
      default:function(){
        return {}
      }
    },
    renew:{
      type:Array,
      default:function(){
        return []
      }
    }
  },
  components: {
    InforBar,
  },
  data() {
    return {
      columns: [
        {
          title: '合同类型',
          // key: 'type',
          render:(h,params)=>{
            if(params.row.type == '0'){
              return h('div',{},'电子合同')
            }else{
              return h('div',{},'纸质合同')
            }
          }
        },
        {
          title: '租期',
          // key: 'date',
          render:(h,params)=>{
            return h('div',{},
              this.$com.strTime(params.row.startTime)+' ~ '+this.$com.strTime(params.row.endTime)
            )
          }
        },
        {
          title: '合同',
          key: 'contract',
          render: (h, params) => {
            if(params.row.type == '0' && params.row.status == "2"){
              return h('div', [
                h('Button',{
                  on:{
                    click:()=>{
                      let token=this.$cookie.get("token");
                      let tempUrl=this.$api.GET_LEASE_PDF;
                      let url=this.$api.GET_LEASE_PDF+'?orderId='+params.row.id+'&type=pdf&token='+token;
                      window.open(url);
                    }
                  }
                }, '查看合同')
              ]);
            }
          },
        },
        {
          title: '证件照片',
          key: 'pic',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                on:{
                  click:()=>{
                    this.showPic(params.row);
                  }
                }
              },'查看证件照片')
            ]);
          },
        },
      ],
      contractList: [],
      picList:[],
      picShow:false,
    }
  },
  mounted(){
    this.forMat();  
  },
  methods:{
      forMat(){
        let arr;
        arr=this.renew == null ? [] :this.renew;
        arr.push(this.lease);
        this.contractList=arr;
      },
      showPic(row){
        if(row.contractPic === undefined || row.contractPic=='' || row.contractPic == null){
            this.picList=[];
        }else{
          this.picList=row.contractPic;
        }
        this.picShow=true;
      }
  },
  watch:{
    'lease':function(){
      this.forMat();
    }
  }
}
</script>
<style scoped>
  .align-div{
    text-align: center;
  }
  .img-modal{
    width:60px;height:60px;
    margin:10px;
  }
</style>

