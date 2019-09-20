<template>
  <Card dis-hover>
    <!-- <CardModel
      label="区域名称"
      :url="url"
      :searchUrl="searchUrl"
    /> -->
    <Form :label-width="100">
      <Row>
        <Col :span="6">
          <FormItem label="项目名称">
            <Input v-model="searchName" />
          </FormItem>
        </Col>
        <Col span="2">&nbsp;</Col>
        <Col :span="6">
          <div class="btn-box">
            <Button @click="handleSearch" type="primary" >查询</Button>
            <Button @click="handleReset">重置</Button>
          </div>
        </Col>
      </Row>
    </Form>
    <Divider style="margin: 0 0 16px;"/>

    <div class="wrapper">
        <div class="box" v-for="item in data" :key="item.id">
          <div class="inner">
            <div class="content">
              <p>{{item.alias}}</p>
            </div>
            <div class="operate">
              <Button @click="editRow(item)" type="text" size="large" icon="ios-create">编辑</Button>
              <Button @click="deleteRow(item.id)" type="text" size="large" icon="ios-trash">删除</Button>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="inner add-btn">
            <Button @click="addRow()" class="add-btn" type="text" icon="md-add" />
          </div>
        </div>
      </div>
    <Modal v-model="modalShow" title="区域信息" @on-cancel="close">
        <Form 
          :model="modalData" 
          ref="modalData" 
          :label-width="110"
          :rules="rule"
        >
          <FormItem label="区域名称" prop="alias">
              <Input v-model="modalData.alias"></Input>
          </FormItem>
          <FormItem label="所在区域" prop="province">
              <Row class="mt20Row">
                <Col span="2">
                  省:
                </Col>
                <Col span="22">
                  <Select transfer v-model="modalData.province" @on-change="provinceChange">
                    <Option v-for="(item,index) in provinceList" :key="index" :value="item.id" :label="item.name"></Option>
                  </Select>
                </Col>
              </Row>
          </FormItem>
          <FormItem label="" prop="city">
            <Row class="mt20Row">
                <Col span="2">
                  市：
                </Col>
                <Col span="22">
                  <Select transfer v-model="modalData.city" @on-change="cityChange">
                    <Option v-for="(item,index) in cityList" :key="index" :value="item.id" :label="item.name"></Option>
                  </Select>
                </Col>
              </Row>
          </FormItem>
          <FormItem label="" prop="county">
              <Row class="mt20Row">
                <Col span="2">
                  区：
                </Col>
                <Col span="22">
                  <Select transfer v-model="modalData.county">
                    <Option v-for="(item,index) in areaList" :key="index" :value="item.id" :label="item.name"></Option>
                  </Select>
                </Col>
              </Row>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button @click="save('modalData')" type="primary">保存</Button>
        </div>
    </Modal>
  </Card>
</template>

<script>
import CardModel from '../components/card-model';
export default {
  components: {
    CardModel,
  },
  data() {
    return {
      data:[],
      searchName:'',
      modalShow:false,
      provinceList:[],
      cityList:[],
      areaList:[],
      modalData:{},
      rule:{
        alias:[
          { required: true, message: '请输入区域名称', trigger: 'blur' }
        ],
        province:[
          { required: true, message: '请选择所在省份', trigger: 'change' }
        ],
        city:[
          { required: true, message: '请选择所在城市', trigger: 'change' }
        ],
        county:[
          { required: true, message: '请选择所在城区', trigger: 'change' }
        ]
      },
      type:'',
    };
  },
  methods:{
    addRow(){
      this.type='add';
      this.modalShow=true;
    },
    editRow(data){
      this.type='edit';
      this.getCity(data.province);
      this.getArea(data.city);
      this.modalData=JSON.parse(JSON.stringify(data));
      this.modalShow=true;
    },
    // 获取省
    getProvince(){
        this.$ajax.get(
          this,
          this.$api.GET_PROVINCE_LIST,
          {},(res)=>{
            console.log(res);
            this.provinceList=res.data.content;
          }
        )
    },
    // 获取市
    getCity(id){
      this.$ajax.get(
        this,
        this.$api.GET_CITY_LIST+id,
        {},(res)=>{
          this.cityList=res.data.content;
        }
      )
    },
    // 获取区
    getArea(id){
      this.$ajax.get(
        this,
        this.$api.GET_COUNTY_LIST+id,
        {},(res)=>{
          this.areaList=res.data.content;
        }
      )
    },
    // 省改变
    provinceChange(id){
      delete this.modalData.city;
      delete this.modalData.county;
      this.cityList=[];
      this.areaList=[];
      if(id){
        this.getCity(id);
      }
    },
    // 市改变
    cityChange(id){
      delete this.modalData.county;
      this.areaList=[];
      if(id){
        this.getArea(id);
      }
    },
    // 关闭modal
    close(){
      this.modalData={};
      this.$refs['modalData'].resetFields();
    },
    // 保存
    save(name){
      this.$refs[name].validate((valid)=>{
        if(!valid) return;
        let url,methods,message;
        let params=JSON.parse(JSON.stringify(this.modalData))
        if(this.type == 'add'){
          url=this.$api.ASSET_ZONE;
          methods='post';
          message='新增成功';
        }else{
          url=this.$api.ASSET_ZONE+this.modalData.id;
          methods='put';
          message='修改成功';
        }
        this.$ajax[methods](
          this,
          this.$api.SEARCH_ZONE,
          params,(res)=>{
            this.$Message.success(message);
            this.getList();
            this.close();
          }
        )
      })
    },
    deleteRow(id){
      if (id) {
            this.$Modal.confirm({
            title: '提示',
            content: '<p>确定删除此数据吗？</p>',
            onOk: () => {
                this.$ajax.delete(
                this,
                this.$api.ASSET_ZONE + id,
                {},
                (res) => {
                    this.$Message.success('删除成功');
                    this.getList();
                }
                )
            },
            });
        }
    },
    handleReset(){
      this.searchName='';
      this.getList();
    },
    handleSearch(){
      getList();
    },
    // 查询
    getList(){
      const params = {
        // pageSize: this.pageSize,
        // pageNo: this.pageNo,
        alias: this.searchName,
      };
      this.$ajax.post(
        this,
        this.$api.SEARCH_ZONE,
        params,
        (res) => {
          this.data = res.data.content;
        },
      );
    }
  },
  mounted(){
    this.getList();
    this.getProvince();
  }
}
</script>
<style scoped>
  .mt20Row{
    margin-bottom:16px;
  }
  .wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  .box {
    width: 20%;
    padding: 0 16px 16px 0;
  }
  .inner {
    height: 150px;
    display: flex;
    flex-direction: column;
    border: 1px solid #e8eaec;
  }
  .content {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .operate {
    border-top: 1px solid #e8eaec;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .operate > button {
    border-radius: 0;
    width: 50%;
  }
  .operate > button:first-child {
    border-right: 1px solid #e8eaec;
  }
  .inner.add-btn {
    background: #e8eaec;
  }
  .inner.add-btn > button {
    width: 100%;
    height: 100%;
    font-size: 30px;
  }
</style>

