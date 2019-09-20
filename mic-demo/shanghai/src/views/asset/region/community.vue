<template>
<Card dis-hover>
  <div>
    <Form :label-width="70">
      <Row>
        <Col :span="8">
          <FormItem label="名称">
            <Input v-model="searchName" placeholder="请输入小区名称" />
          </FormItem>
        </Col>

        <Col :span="3" :offset="1">
          <Button @click="handleSearch" type="primary">查询</Button>
          <Button @click="handleReset" type="primary" ghost>重置</Button>
        </Col>

        <Col span="10" :offset="1" style="text-align:right">
          <Button type="primary" @click="addNewCommunity" ghost>新增小区</Button>
        </Col>
      </Row>
    </Form>
    <Divider style="margin: 0 0 16px;"/>
    <Collapse v-if="dataShow" v-model="communityIds">
      <Panel v-for="(item, index) in data" :key="index" :name="item.projectName">
        {{item.projectName}}
        <div slot="content" class="wrapper">
          <div class="box" v-for="it in item.list" :key="it.id">
            <div class="inner">
              <div class="content">
                <p>{{it.name}}</p>
                <p>{{it.address}}</p>
              </div>
              <div class="operate">
                <Button @click="editRow(it)" type="text" size="large" icon="ios-create">编辑</Button>
                <Button @click="deleteRow(it)" type="text" size="large" icon="ios-trash">删除</Button>
              </div>
            </div>
          </div>
          <div class="box">
            <div class="inner add-btn">
              <Button @click="addNewCommunity(item)" class="add-btn" type="text" icon="md-add" />
            </div>
          </div>
        </div>
      </Panel>
    </Collapse>
    <div class="box" v-else>
      <div class="inner add-btn">
        <Button @click="addNewCommunity" class="add-btn" type="text" icon="md-add" />
      </div>
    </div>

    <Modal :mask-closable="false" v-model="showModal" :title="isEdit ? '修改小区' : '添加小区'" :width="850">
      <Form v-if="showModal" ref="modal" :label-width="80" :model="modal" :rules="rules">
        <Row>
          <Col :span="8">
            <FormItem label="小区名称" class="ivu-form-item-required" prop="name">
              <Input v-model="modal.name" placeholder="请输入小区名称" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="所属项目" prop="projectId">
              <Select v-model="modal.projectId">
                <Option v-for="item in projectList" :key="item.id" :value="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="定位">
              <Input placeholder="请输入小区地址用于地图定位" @on-focus="searchFocus" v-model="position" />
              <!-- <span>若定位有误，可移动地图上的标点调整</span> -->
              <div class="searchList" v-show="positionList.length > 0 && seachShow">
                <div
                  v-for="(item,index) in positionList"
                  :key="index"
                  @click="handleDrop(item)"
                >{{item.address}}{{item.title}}</div>
              </div>
            </FormItem>
          </Col>
        </Row>
        <div style="margin-bottom:20px">
          <BMapComponent
            :height="250"
            :width="830"
            :keyWords="position"
            :position="positionXY"
            @on-result="gainSearchList"
            @on-change="getNewAddress"
          />
        </div>
        <FormItem label="小区地址" class="ivu-form-item-required" style="width:480px" prop="address">
          <Input v-model="modal.address" type="text" />
          <span>小区地址会根据定位地址及定位自动匹配，若地址有误可手动修改。</span>
        </FormItem>
        <Row>
        <Col span="12">
          <FormItem label="水费缴费机构" prop="waterBusiCode" :label-width="110">
              <Select v-model="modal.waterBusiCode" >
                <Option v-for="item in waterBusiLists" :value="item.code" :key="item.code">{{ item.name }}</Option>
             </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="电费缴费机构" prop="elecBusiCode" :label-width="110">
              <Select v-model="modal.elecBusiCode">
                <Option v-for="item in eleBusiLists" :value="item.code" :key="item.code">{{ item.name }}</Option>
             </Select>
          </FormItem>
        </Col>
      </Row>
          <Row>
        <Col span="12">
          <FormItem label="煤气费缴费机构" prop="gasBusiCode" :label-width="110">
              <Select v-model="modal.gasBusiCode">
                <Option v-for="item in gasBusiLists" :value="item.code" :key="item.code">{{ item.name }}</Option>
             </Select>
          </FormItem>
        </Col>
      </Row>
      </Form>
      <div slot="footer">
        <Button type="primary" ghost @click="showModal = false;">取消</Button>
        <Button @click="ok" type="primary">确定</Button>
      </div>
    </Modal>
  </div>
</Card>
</template>

<script>
import BMapComponent from "@/components/BaiduMap/BMapComponent";

export default {
  name: 'RegionCommunity',
  components: {
    BMapComponent,
  },
  data() {
    const validateName=(rule, value, callback)=>{
      if(this.modal.name === undefined || this.modal.name == ''){
        callback(new Error('小区名称不能为空'))
      }else{
        callback();
      }
    }
    const validateAddress=(rule, value, callback)=>{
      if(this.modal.address === undefined || this.modal.address == ''){
        callback(new Error('小区地址不能为空'))
      }else{
        callback();
      }
    }
    return {
      seachShow:false,
      dropFlag:false,
      communityIds:[],
      dataShow:false,
      waterBusiLists:[],
      eleBusiLists:[],
      gasBusiLists:[],
      showModal: false,
      isEdit: false,
      searchName: '',
      position: '',
      positionXY: {},
      positionList: [],
      projectList:[],
      modal: {},
      dataSource: [],
      rules: {
        name:[
          { validator: validateName, trigger: 'change' }
        ],
        address:[
          { validator: validateAddress, trigger: 'change' }
        ],
        projectId: {
          required: true,
          message: '请选择所属项目',
        },
      },
      data:[],
    };
  },
  mounted() {
    this.$ajax.all(
      this.getCommunity(),
      this.getProjcetList(),
    )
  },
  methods: {
    getProjcetList(){
        return this.$ajax.get(
          this,
          this.$api.ASSET_PROJECT,
          {},
          (res) => {
            this.projectList = res.data.content;
          },
        )
    },
    getCommunity() {
      const params = {
        name: this.searchName,
      };
      return this.$ajax.get(
        this,
        this.$api.SEARCH_COMMUNITY,
        params,
        (res) => {
            const data = res.data.content;
            if(data == null || data=='' || data.length==0){
                this.dataShow=false;
                return;
            }
            this.data=[];
            let arr=[];
            let tempArr=JSON.parse(JSON.stringify(data));
            tempArr.map((e)=>{arr.push(e.projectName)})
            arr=arr.filter((x, index,self)=>self.indexOf(x)===index);
            arr.forEach((e)=>{
                this.data.push({
                    projectName:e,
                    list:[]
                })
            })

            tempArr.forEach((e)=>{
                this.data.forEach((c)=>{
                    if(e.projectName == c.projectName){
                        c.list.push(e)
                    }
                })
            })
            this.$nextTick(()=>{
              this.communityIds=this.data.map(item=>item.projectName == null ?'':item.projectName);
            })

            this.dataShow=true;
        },
      );
    },
    handleSearch() {
      this.getCommunity();
    },
    handleReset() {
      this.searchName = '';
      this.getCommunity();
    },
    searchFocus(){
      this.seachShow=true;
    },
    gainSearchList(val) {
      this.positionList = val.Ar;
    },
    //拖拽或点击获取新的地址
    getNewAddress(data,addressTemp) {
      let address=addressTemp;
      let province='',city='',district='';
      if(data.province){
        province=data.province;
      }
      if(data.city){
        city=data.city;
      }
      if(data.district){
        district=data.district;
      }
      if(province == city){
        if(address.indexOf(province) != -1){

        }else{
          if(district != ''){
            address=district+address;
          }
          if(province != ''){
            address=province+address;
          }
        }
      }else{
        if(address.indexOf(district) != -1){
          if(district != ''){
            address=district+address;
          }
        }

        if(address.indexOf(city) != -1){

        }else{
          if(city != ''){
            address=city+address;
          }
        }

        if(address.indexOf(province) != -1){

        }else{
          if(province != ''){
            address=province+address;
          }
        }
      }



      this.$set(this.modal,'address',address);
      this.$set(this.modal,'provName',data.province);
      this.$set(this.modal,'cityName',data.city);
      this.$set(this.modal,'countyName',data.district);
			if(data.city){
				this.getProvinceCode(data.city);
			}else{
				this.$Message.error("地址最少精确到市区");
			}
    },
    handleDrop(val) {
      this.seachShow=false;
      this.positionXY=val;
      const data = {
        lat: this.positionXY.point.lat,
        lng: this.positionXY.point.lng,
        address: val.address,
        name: val.title,
      };
      this.modal = Object.assign(this.modal, data);
      this.position=val.address+val.title;
      this.dropFlag=true;
    },
    getProvinceCode(query) {
      if(query =='') return;
      this.$ajax.get(
        this,
         this.$api.GET_CITYCODE+
        "?cityName=" +
        query,
        {},
        res => {
          this.cityCode = res.data.content.unionCityNo;
          this.getWaterBusiLists();
          this.getEleBusiLists();
          this.getGasBusiLists();
        }
      );
    },
    getWaterBusiLists(){
      this.$ajax.get(
          this,
          this.$api.GET_FEE_OF_WATERELE
          .replace("{city}", this.cityCode)
          .replace("{type}", 1),
          {},
          res => {
            this.waterBusiLists = res.data.content;
          }
        );
    },
    getEleBusiLists(){
      this.$ajax.get(
          this,
          this.$api.GET_FEE_OF_WATERELE
          .replace("{city}", this.cityCode)
          .replace("{type}", 2),
          {},
          res => {
           this.eleBusiLists = res.data.content;
          }
        );
    },
    getGasBusiLists(){
      this.$ajax.get(
          this,
          this.$api.GET_FEE_OF_WATERELE
          .replace("{city}", this.cityCode)
          .replace("{type}", 3),
          {},
          res => {
          this.gasBusiLists = res.data.content;
          }
        );
    },
    addNewCommunity(data) {
      // if(this.projectList.length == 0){
      //   this.$Message.error('请先添加项目！');
      //   return;
      // }
      this.isEdit = false;
      this.position = '';
      this.positionList = [];
      this.modal = {};
      this.waterBusiLists=[];
      this.eleBusiLists=[];
      this.gasBusiLists=[];
      if(data && data.list && data.list.length>0){
        this.modal.projectId=data.list[0].projectId;
      }else{
        if(this.projectList.length>0){
          this.modal.projectId=this.projectList[0].id;
        }
      }
      this.showModal = true;
    },
    deleteRow(item) {
      let id=item.id;
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定删除此数据吗？</p>',
        onOk: () => {
          this.$ajax.delete(
            this,
            this.$api.ASSET_COMMUNITY + id,
            {},
            (res) => {
              this.$Message.success('删除成功');
              this.getCommunity();
            },
          );
        },
      });
    },
    editRow(data) {
      this.isEdit = true;
      this.modal = JSON.parse(JSON.stringify(data));
      let cityName=this.$com.sliceAddress(this.modal.address);
      this.getProvinceCode(cityName);
      this.positionXY = {
        lat: data.lat,
        lng: data.lng,
      };
      this.position = data.address;
      this.showModal = true;
    },
    ok() {
      this.$refs.modal.validate(valid => {
        if(!valid) return;
        const project = this.projectList.filter((item) => {
          return item.id === this.modal.projectId;
        });
        const params = Object.assign(this.modal, {projectName: project[0].name});
        if (this.isEdit) {
          delete params.createTime
          this.$ajax.put(
            this,
            this.$api.ASSET_COMMUNITY + this.modal.id,
            params,
            (res) => {
              this.$Message.success('修改成功');
              this.getCommunity();
              this.showModal = false;
            }
          )
        } else {
          this.$ajax.post(
            this,
            this.$api.ASSET_COMMUNITY,
            params,
            (res) => {
              this.$Message.success('新增成功');
              this.getCommunity();
              this.showModal = false;
            }
          )
        }
      })
    },
  },
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.btn-box {
  text-align: right;
  margin-bottom: 16px;
}
.btn-box button {
  padding: 5px 30px;
}
.searchList {
  width: 300px;
  border: 1px solid #dcdee2;
  margin-top: 10px;
  border-radius: 5px;
  position: absolute;
  z-index: 100;
  background: white;
}
.searchList div {
  border-bottom: 1px solid #dcdee2;
  padding-left: 6px;
}
.searchList div:last-of-type {
  border: none;
}
.searchList div:hover {
  cursor: pointer;
}
.btn-box {
  display: flex;
  justify-content: flex-end;
}
.btn-box>button {
  margin-left: 10px;
  min-width: 86px;
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
}
.title {
  width: 100%;
  background: #e8eaec;
  padding: 0 10px;
  line-height: 30px;
  margin-bottom: 10px;
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
.content .input {
  display: block;
  width: 90%;
}
.content > p {
  text-align: center;
  font-size: 12px;
}
.content > p:first-child {
  font-weight: bold;
  font-size: 14px;
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

