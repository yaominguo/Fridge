<template>
  <div v-model="show" title="添加新公寓" inline :styles="{top: '30px'}" :mask-closable="false" :width="880" :closable="false">
    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
      <Row>
        <Col span="12">
          <FormItem label="公寓名称" prop="name">
            <Input type="text" v-model="formCustom.name" placeholder="请输入公寓名称"></Input>
            <span>申请添加的公寓，在审核通过前，该公寓的房源无法对外推广</span>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="定位" prop="position">
            <Input v-model="formCustom.position"  @on-change="positionChange"></Input>
            <span>若定位有误，可移动地图上的标点调整</span>
            <div class="searchList" v-show="showDropLists">
              <div
                v-for="(item,index) in searchLists"
                :key="index"
                @click="handleDrop(item)"
              >{{item.title}},{{item.address}}</div>
            </div>
          </FormItem>
        </Col>
      </Row>

      <div style="margin-bottom:20px">
        <BMapComponent
          :height="250"
          :width="830"
          :keyWords="keyWords"
          :position="positionXY"
          @on-change="getNewAddress"
          @on-result="gainSearchList"
        ></BMapComponent>
      </div>
      <Row>
        <Col span="12">
          <FormItem label="小区地址" prop="address">
            <Input type="text" v-model="formCustom.address" disabled></Input>
            <span>小区地址会根据定位地址及定位自动匹配，无需输入</span>
          </FormItem>
        </Col>
      </Row>
           <Row>
        <Col span="12">
          <FormItem label="水费缴费机构" prop="waterBusiCode" :label-width="110">
              <Select v-model="formCustom.waterBusiCode" >
                <Option v-for="item in waterBusiLists" :value="item.code" :key="item.code">{{ item.name }}</Option>
             </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="电费缴费机构" prop="elecBusiCode" :label-width="110">
              <Select v-model="formCustom.elecBusiCode">
                <Option v-for="item in eleBusiLists" :value="item.code" :key="item.code">{{ item.name }}</Option>
             </Select>
          </FormItem>
        </Col>
      </Row>
          <Row>
        <Col span="12">
          <FormItem label="煤气费缴费机构" prop="gasBusiCode" :label-width="110">
              <Select v-model="formCustom.gasBusiCode">
                <Option v-for="item in gasBusiLists" :value="item.code" :key="item.code">{{ item.name }}</Option>
             </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="ok()">确认</Button>
      <Button type="default" @click="cancel()">取消</Button>
    </div>
  </div>
</template>
<script>
import BMapComponent from "../../../../components/BaiduMap/BMapComponent.vue";
export default {
  components: {
    BMapComponent
  },
  data() {
    return {
      formCustom: {
        name: "",
        position: "",
        address: "",
        waterBusiCode: "",
        elecBusiCode: "",
        gasBusiCode: ""
      },
      ruleCustom: {
        name: [
          { required: true, message: "公寓名称不能为空！", trigger: "change" }
        ],
        address: [
          { required: true, message: "定位不能为空！", trigger: "change" }
        ]
      },
      show: true,
      searchLists: [],
      showDropLists: false, //是否显示下拉的内容
      clickEvent: false,
      keyWords: "", //搜索关键字
      positionXY: {},
      options1: [],
      waterBusiLists: [],
      eleBusiLists: [],
      gasBusiLists: [],
      provinceCode: "",
      cityCode: ""
    };
  },
  props: ["showModal", "leaseType"],
  watch: {
    showModal() {
      this.show = this.showModal;
    }
  },
  methods: {
    ok() {
      this.$refs["formCustom"].validate(valid => {
        if (valid) {
          let formDatas = {};
          formDatas.name = this.formCustom.name;
          let data = this.formCustom.submitDatas;
          formDatas.address = data.address;
          formDatas.provName = data.province;
          formDatas.cityName = data.city;
          formDatas.countyName = data.district;
          formDatas.leaseType = this.leaseType;
          formDatas.lat = this.formCustom.lat;
          formDatas.lng = this.formCustom.lng;
          formDatas.waterBusiCode = this.formCustom.waterBusiCode;
          formDatas.eleBusiLists = this.formCustom.elecBusiCode;
          formDatas.gasBusiLists = this.formCustom.gasBusiCode;
          this.$ajax.post(
            this,
            this.$api.POST_COMMUNITY_LIST,
            formDatas,
            res => {
              if (res.code == "200") {
                this.$Message.success("新增成功！");
                this.$emit("handleOk");
              } else {
                this.$Message.error(res.msg);
              }
            }
          );
        } else {
        }
      });
    },
    cancel() {
      this.$emit("handleCancle");
    },
    //得到搜索列表
    gainSearchList(val) {
      this.searchLists = val.Ar;
      this.showDropLists = true;
    },
    //拖拽或点击获取新的地址
    getNewAddress(data) {
      this.formCustom.address = data.address;
      this.formCustom.submitDatas = data;
			if(data.city){
				this.getProvinceCode(data.city);
			}else{
				this.$Message.error("地址最少精确到市区");
			}
    },
    handleDrop(val) {
      this.showDropLists = false;
      this.formCustom.position = val.title;
			 this.formCustom.address = val.address;
      this.clickEvent = true;
      this.positionXY = val.point;
      this.formCustom.lat = val.point.lat;
      this.formCustom.lng = val.point.lng;
			if(val.city){
				this.getProvinceCode(val.city);
			}else{
				this.$Message.error("地址最少精确到市区");
			}
    },
    positionChange(val) {
      this.keyWords = this.formCustom.position;
			if(this.keyWords==""){
				this.searchLists=[];
			}
    },
    getProvinceCode(query) {
      this.$ajax.get(
        this,
        this.$api.GET_CITYCODE +
          "?cityName=" +
          query,
        {},
        res => {
          this.cityCode = res.data.content.unionCityNo;
          this.getLists();
        }
      );
    },
    getLists() {
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
    }
  }
};
</script>
<style scoped>
.searchList {
  width: 300px;
  border: 1px solid #dcdee2;
  border-radius: 5px;
  position: absolute;
  z-index: 100;
  background: white;
  top: 40px;
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
</style>