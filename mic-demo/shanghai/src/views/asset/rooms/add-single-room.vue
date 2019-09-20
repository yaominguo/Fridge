<template>
<Card dis-hover>
<div v-show="disableTitle" class="editTitle">{{(newData.communityName || '') + ' | ' + (newData.buildingName || '')}}</div>
<Form ref="formData" :label-width="100" :model="newData" :rules="rules">
  <Row v-show="!disableTitle">
    <Col :span="8">
      <FormItem label="小区/公寓" prop="community">
      <div style="display: flex">
        <Select :disabled="disableInfo.community" v-model="newData.community" @on-change="getBuildingList" clearable>
          <Option v-for="item in options.community" :value="item.id + '#' + item.name" :key="item.id">{{item.name}}</Option>
        </Select>
        <Button @click="showCommunity = true" type="primary" ghost style="marginLeft: 10px;">添加小区</Button>
      </div>
      </FormItem>
    </Col>
    <Col :span="8">
      <FormItem label="楼栋" prop="building">
      <div style="display: flex">
        <Select :disabled="disableInfo.building" v-model="newData.building" @on-change="selectBuilding" clearable>
          <Option v-for="item in options.buildings" :value="item.id + '#' + item.name" :key="item.id">{{item.name}}</Option>
        </Select>
        <Button @click="showBuilding = true" type="primary" ghost style="marginLeft: 10px;">添加楼栋</Button>
      </div>
      </FormItem>
    </Col>
  </Row>
  <Row>
    <Col :span="8">
      <FormItem label="总楼层数">
        <Input disabled :value="curBuilding.floorCount"/>
      </FormItem>
    </Col>
    <Col :span="8">
      <FormItem label="所在楼层" prop="houseFloor">
        <InputNumber :disabled="disableInfo.floor" v-model="newData.houseFloor" style="width: 100%" :min="1" :max="Number(curBuilding.floorCount)"/>
      </FormItem>
    </Col>
    <Col :span="8">
      <FormItem label="室号" prop="roomNo">
        <Input :disabled="isOperating" v-model="newData.roomNo"/>
      </FormItem>
    </Col>
  </Row>
  <Row>
    <Col span="8" style="display:flex">
      <FormItem label="实际户型"></FormItem>
      <FormItem label="房" prop="roomNum" :label-width="40">
        <InputNumber :disabled="isOperating || isJoint" v-model="newData.roomNum" style="width: 100%" :min="1" :max="12" :precision="0"/>
      </FormItem>
      <FormItem label="厅" prop="parlourNum" :label-width="40">
        <InputNumber :disabled="isOperating || isJoint" v-model="newData.parlourNum" style="width: 100%" :min="0" :max="12" :precision="0"/>
      </FormItem>
      <FormItem label="卫" prop="toiletNum" :label-width="40">
        <InputNumber :disabled="isOperating || isJoint" v-model="newData.toiletNum" style="width: 100%" :min="0" :max="12" :precision="0"/>
      </FormItem>
    </Col>
    <Col :span="8">
      <FormItem label="取得方式" prop="acquisitionMethod">
        <Select :disabled="isRenting" v-model="newData.acquisitionMethod" clearable>
          <Option v-for="item in options.methods" :key="item.id" :value="item.id + '#' + item.name">{{item.name}}</Option>
        </Select>
      </FormItem>
    </Col>
    <Col :span="8">
      <FormItem label="出资人" prop="spnonsor">
        <Select :disabled="isRenting" v-model="newData.spnonsor" clearable>
          <Option v-for="item in options.spnonsor" :key="item.id" :value="item.id + '#' + item.name">{{item.name}}</Option>
        </Select>
      </FormItem>
    </Col>
  </Row>
  <Row>
    <Col :span="8">
      <FormItem label="资产用途" prop="assetUse">
        <Select :disabled="isRenting" v-model="newData.assetUse" clearable>
          <Option v-for="item in options.assetUse" :key="item.id" :value="item.id + '#' + item.name">{{item.name}}</Option>
        </Select>
      </FormItem>
    </Col>
    <Col :span="8">
      <FormItem :disabled="isRenting" label="资产类型" prop="useAndClass">
        <Cascader :data="options.useAndClass" v-model="newData.useAndClass"/>
      </FormItem>
    </Col>
    <Col :span="8">
      <FormItem label="是否盈利" prop="haveIncome">
        <Select :disabled="isRenting" v-model="newData.haveIncome" clearable>
          <Option value="1">是</Option>
          <Option value="0">否</Option>
        </Select>
      </FormItem>
    </Col>
  </Row>
  <Row>
    <Col :span="8">
      <FormItem label="套内面积(㎡)" prop="realArea">
        <InputNumber :disabled="isOperating || isJoint" v-model="newData.realArea" style="width: 100%" :min="0"/>
      </FormItem>
    </Col>
    <Col :span="8">
      <FormItem label="预测(建筑)面积(㎡)" :label-width="150">
        <InputNumber :disabled="isOperating || isJoint" v-model="newData.predictedArea" style="width: 100%" :min="0"/>
      </FormItem>
    </Col>
    <Col :span="8">
      <FormItem label="每平方米月租金(元)" :label-width="150">
        <InputNumber :disabled="isOperating || isJoint" v-model="newData.squareMeterMonthlyRent" style="width: 100%" :min="0"/>
      </FormItem>
    </Col>
  </Row>
  <Row>
    <Col span="8" style="display:flex">
      <FormItem label="付款方式"></FormItem>
      <FormItem label="付" :label-width="40" prop="payNum">
        <Select v-model="newData.payNum" clearable>
          <Option v-for="(count,index)  in 12" :value="count" :key="'pay' + index">{{ count }}</Option>
        </Select>
      </FormItem>
      <FormItem label="押" :label-width="40" prop="mortgageNum">
        <Select v-model="newData.mortgageNum" clearable>
          <Option value="auto">自定义</Option>
          <Option v-for="(count,index)  in 12" :value="count" :key="'mor' + index">{{ count }}</Option>
        </Select>
      </FormItem>
    </Col>
    <Col :span="8">
      <FormItem label="租金(元/月)" prop="rent">
        <InputNumber v-model="newData.rent" style="width: 100%" :min="0"/>
      </FormItem>
    </Col>
    <Col :span="8">
      <FormItem label="押金(元)" prop="deposit">
        <InputNumber :disabled="newData.mortgageNum != 'auto'" v-model="newData.deposit" style="width: 100%" :min="0"/>
      </FormItem>
    </Col>
  </Row>
  <Divider dashed />
  <Row>
    <Col span="8" style="display:flex">
      <FormItem label="水电煤户号"></FormItem>
      <FormItem label="水" :label-width="30">
        <Input v-model="newData.waterNum"/>
      </FormItem>
      <FormItem label="电" :label-width="30">
        <Input v-model="newData.elecNum"/>
      </FormItem>
      <FormItem label="煤" :label-width="30">
        <Input v-model="newData.gasNum"/>
      </FormItem>
    </Col>
    <!-- <Col span="8" style="display:flex">
      <FormItem label="水电煤单价"></FormItem>
      <FormItem label="水" :label-width="30">
        <Input />
      </FormItem>
      <FormItem label="电" :label-width="30">
        <Input />
      </FormItem>
      <FormItem label="煤" :label-width="30">
        <Input />
      </FormItem>
    </Col> -->
  </Row>
  <Row v-for="(item, index) in costList" :key="index">
    <Col :span="8">
      <FormItem :label="index == '0' ? '其他费用' : ''">
        <Row type="flex" justify="space-between" align="middle">
          <Col :span="16">
            <FormItem>
              <Cascader v-model="item.name" :data="options.feeTypeList" placeholder="费用类型" clearable/>
            </FormItem>
          </Col>
          <Col :span="7">
            <FormItem>
              <InputNumber style="width: 100%;" v-model="item.count" :min="0" placeholder="金额(元)" />
            </FormItem>
          </Col>
        </Row>
      </FormItem>
    </Col>
    <Col v-if="index != 0" :span="1" style="margin: 5px;">
      <Icon @click="costList.splice(index, 1)" type="ios-remove-circle-outline" style="cursor: pointer;" size="20" color="#2d8cf0" />
    </Col>
  </Row>
  <Row>
    <Col :span="8">
      <FormItem>
        <Button @click="addNewCost">增加其他费用</Button>
      </FormItem>
    </Col>
  </Row>
  <Row>
    <FormItem label="收租日设置">
      <RadioGroup v-model="newData.rentType" vertical>
        <Radio label="1" style="margin-bottom:10px">
          <span>提前</span>
          <InputNumber :disabled="newData.rentType != '1'" v-model="newData.rentDay" style="width: 50px;" :min="1" :max="31" :precision="0"/>
          <span>天收租</span>
        </Radio>
        <Radio label="2" style="margin-bottom:10px">
          <span>固定</span>
          <InputNumber :disabled="newData.rentType != '2'" v-model="newData.rentDay" style="width: 50px;" :min="1" :max="31" :precision="0"/>
          <span>日收租 (每期的第一个月)</span>
        </Radio>
        <Radio label="3">
          <span>固定</span>
          <InputNumber :disabled="newData.rentType != '3'" v-model="newData.rentDay" style="width: 50px;" :min="1" :max="31" :precision="0"/>
          <span>日收租 (每期提前一个月)</span>
        </Radio>
      </RadioGroup>
    </FormItem>
  </Row>
  <Divider dashed />
  <Row>
    <Col :span="24">
      <FormItem label="房间图片">
        <ImgUploader
          :defaultList="houseImgList"
          @on-complete="completeHouse"
          @on-remove="removeHouse"
          @showUploadImg="getReturn('houseImgList', this.code[0])"
          :isPhone="true"
          :url="$api.IMG_UPLOAD_URL"
          :maxUploads="5"
          :code="code[0] || ''"
          uploadButton="houseBtn"
        />
      </FormItem>
    </Col>
  </Row>
  <Row>
    <Col :span="16">
      <FormItem label="房间配置">
        <CheckboxGroup v-model="newData.roomConfigList">
            <Checkbox v-for="(item,index) in defaultConfigLists" :key="index" :label="item"></Checkbox>
        </CheckboxGroup>
      </FormItem>
    </Col>
  </Row>
  <Divider dashed />
  <Row>
    <Col :span="8">
      <FormItem label="产证人">
        <Input v-model="newData.userName" />
      </FormItem>
    </Col>
    <Col :span="8">
      <FormItem label="产证编号">
        <Input v-model="newData.rightNo"/>
      </FormItem>
    </Col>
    <Col :span="8">
      <FormItem label="产证类型">
        <Select v-model="newData.rightType">
          <Option value="房产证">房产证</Option>
          <Option value="动迁证明">动迁证明</Option>
          <Option value="小产证公证书">小产证公证书</Option>
        </Select>
      </FormItem>
    </Col>
    <Col :span="8">
      <FormItem label="颁证日期">
        <DatePicker v-model="newData.rightTime"/>
      </FormItem>
    </Col>
    <Col :span="8">
      <FormItem label="产证面积(㎡)">
        <InputNumber v-model="newData.rightArea" style="width: 100%" :min="0"/>
      </FormItem>
    </Col>
    <Col :span="8">
      <FormItem label="产证实用面积(㎡)" :label-width="140">
        <InputNumber v-model="newData.rightInsideArea" style="width: 100%" :min="0"/>
      </FormItem>
    </Col>
  </Row>
  <Row>
    <Col :span="24">
      <FormItem label="产证图片">
        <ImgUploader
          :defaultList="propertyImgList"
          @on-complete="completeProperty"
          @on-remove="removeProperty"
          @showUploadImg="getReturn('propertyImgList', this.code[1])"
          :isPhone="true"
          :url="$api.IMG_UPLOAD_URL"
          :maxUploads="5"
          :code="code[1] || ''"
          uploadButton="propertyBtn"
        />
      </FormItem>
    </Col>
  </Row>
</Form>
<div class="btn-box">
  <Button v-if="isEdit && isDraft" @click="handleEdit" type="primary">保存</Button>
  <Button v-else-if="isEdit && isPassed" @click="handleEdit" type="primary">保存并提交修改审批</Button>
  <Button v-else @click="handleSubmit" type="primary">保存</Button>
</div>
<AddCommunityModal @handleCancle="showCommunity = false" :leaseType="1" @handleOk="getOptions" :showModal="showCommunity" />
<Modal title="添加楼栋" v-model="showBuilding" footer-hide :mask-closable="false" width="1100">
  <BuildingModal @complete="getOptions" v-if="showBuilding" :isModal="true"/>
</Modal>
</Card>
</template>

<script>
import ImgUploader from '@/components/Helper/Form/image-upload';
import AddCommunityModal from "@/views/house/components/createCommunity.vue";
import BuildingModal from '@/views/asset/building/building-info';
export default {
  name: 'AddSingleRoom',
  components: {
    ImgUploader,
    AddCommunityModal,
    BuildingModal,
  },
  data() {
    return {
      code: [],
      isEdit: false,
      showCommunity: false,
      showBuilding: false,
      defaultConfigLists: ['WIFI', '空调', '热水器', '洗衣机', '冰箱', '电视', '微波炉', '燃气灶', '抽油烟机', '电磁炉', '床', '书桌', '衣柜', '沙发','阳台'],
      houseImgList: [],
      propertyImgList: [],
      costList: [{name: [], count: null}],
      options: {
        community: [],
        spnonsor: [],
        acquisitionMethod: [],
        // housingStructure: [],
        buildings: [],
        assetUse: [
          {
            id: '0',
            name: '自用',
          },
          {
            id: '1',
            name: '出租',
          },
          {
            id: '2',
            name: '出售',
          },
        ],
        useAndClass: [],
      },
      curBuilding: {},
      newData: {
        houseFloor: null,
        roomNum: null,
        parlourNum: null,
        toiletNum: null,
        realArea: null,
        predictedArea: null,
        squareMeterMonthlyRent: null,
        rent: null,
        deposit: null,
        rightArea: null,
        rightInsideArea: null,
        rentDay: null,
        rentType: '1',
        acquisitionMethod: null,
        assetUse: null,
        spnonsor: null,
        useAndClass: [],
        haveIncome: null,
      },
      rules: {
        community: {
          required: true,
          message: '请选择小区/公寓',
        },
        building: {
          required: true,
          message: '请选择楼栋',
        },
        houseFloor: {
          required: true,
          message: '请选择所在楼层',
        },
        roomNo: {
          required: true,
          message: '请输入室号',
        },
        roomNum: {
          required: true,
          message: '请选择房',
        },
        parlourNum: {
          required: true,
          message: '请选择厅',
        },
        toiletNum: {
          required: true,
          message: '请选择卫',
        },
        // acquisitionMethod: {
        //   required: true,
        //   message: '请选择取得方式',
        // },
        // spnonsor: {
        //   required: true,
        //   message: '请选择出资人',
        // },
        assetUse: {
          required: true,
          message: '请选择资产用途',
          trigger: 'blur',
        },
        useAndClass: {
          required: true,
          message: '请选择资产类型',
          trigger: 'blur',
        },
        haveIncome: {
          required: true,
          message: '请选择是否盈利',
          trigger: 'blur',
        },
        payNum: {
          required: true,
          message: '请选择付几',
        },
        mortgageNum: {
          required: true,
          message: '请选择押几',
        },
        rent: {
          required: true,
          message: '请输入租金',
        },
        deposit: {
          required: true,
          message: '请输入押金',
        },
        realArea: {
          required: true,
          message: '请输入套内面积',
        },
        predictedArea: {
          required: true,
          message: '请输入套内面积',
        },
      },
      disableInfo: {
        community: false,
        building: false,
        floor: false,
      },
    }
  },
  created() {
    this.$ajax.all(
      ...this.getOptions(),
      this.getTypes(),
      this.getFeeTypeList(),
      this.getCode(),
    );
  },
  mounted() {
    // this.$nextTick(() => this.init());
    setTimeout(this.init, 100);
  },
  methods: {
    init() {
      if (this.$route.query.id) {
        const {id, isEdit} = this.$route.query;
        this.isEdit = isEdit == '1';
        this.getInfo(id);
      }

      if(this.$route.query && this.$route.query.buildingId) { // 从楼栋管理新增分户跳转过来
        const {communityName, communityId, buildingId, curFloor} = this.$route.query;
        this.newData.community = communityId + '#' + communityName;
        this.getBuildingList(this.newData.community).then(res => {
          this.curBuilding = this.options.buildings.find(item => item.id == buildingId);
          this.newData.communityName = communityName;
          this.newData.buildingName = this.curBuilding.name;
          this.newData.building = this.curBuilding.id + '#' + this.curBuilding.name;
          this.newData.houseFloor = curFloor ? Number(curFloor) : null;
        });
        this.disableInfo = {
          community: true,
          building: true,
          floor: curFloor ? true : false,
        }
      }
    },
    getInfo(id) { // 编辑获取分户信息
      this.$ajax.get(
        this,
        this.$api.ASSET_HOUSE + id,
        null,
        res => {
          const data = this.$com.confirm(res, 'data.content.value', {});
          this.options.useAndClass.forEach(parent => {
            parent.children.forEach(child => {
              if (data.useAndClassId == child.value) {
                data.useAndClass = [parent.value, child.value];
              }
            })
          });
          const keys = ['community', 'acquisitionMethod', 'assetUse', 'spnonsor', 'building'];
          keys.forEach(key => {
            data[key] = data[key + 'Id'] + '#' + data[key + 'Name'];
            if (key == 'community') {
              this.getBuildingList(data[key]);
            }
          })
          const isNumbers = ['floorCount', 'houseFloor', 'roomNum', 'parlourNum', 'toiletNum', 'realArea', 'predictedArea', 'squareMeterMonthlyRent', 'rent', 'deposit', 'rentDay', 'rightArea', 'rightInsideArea', 'payNum', 'mortgageNum'];
          for (let key in data) {
            if (isNumbers.indexOf(key) >= 0 && Number(data[key]) == data[key]) {
              data[key] = Number(data[key]);
            }
            if (key == 'roomCostList' && data[key].length > 0) {
              this.costList = data[key].map(item => {
                if (item.parName && item.costNo && item.cost) {
                  return {name: [item.parName, item.costNo], count: Number(item.cost)};
                } else {
                  return {name: [], count: null};
                }
              })
            }
            if (key == 'roomConfigList' && data[key].length > 0) {
              data[key] = data[key].map(item => item.name);
            }
          }
          const {resourcePics} = data;
          if (resourcePics && resourcePics.length > 0) {
            const houses = [], propertys = [];
            resourcePics.forEach(item => {
              item.createTime = null;
              if (item.type == 'room' || item.type == 'house') {
                houses.push(item);
              } else if (item.type == 'property') {
                propertys.push(item);
              }
            })
            this.houseImgList = houses;
            this.propertyImgList = propertys;
          }
          this.curBuilding.floorCount = data.floorCount;
          this.newData = {...data};
        }
      )
    },
    addNewCost() {
      const flag = this.costList.some(item => !item.name || item.name.length <=0 || !item.count);
      if (flag) {
        this.$Message.error("请先将上一条其他费用补充完整");
        return;
      }
      this.costList.push({name: [], count: null});
    },
    getOptions() {
      this.showCommunity = false;
      this.showBuilding = false;
      const { ASSET_COMMUNITY, ASSET_INVESTOR, ASSET_METHOD, ASSET_STRUCTION } = this.$api;
      const list = [
        {url: ASSET_COMMUNITY, name: 'community'},
        {url: ASSET_INVESTOR, name: 'spnonsor'},
        {url: ASSET_METHOD, name: 'methods'},
        // {url: ASSET_STRUCTION, name: 'housingStructure'},
      ];
      return list.map(item =>
        this.$ajax.get(
          this,
          item.url,
          {},
          (res) => {
            const data = this.$com.confirm(res, 'data.content');
            this.options[item.name]= data;
          },
          true,
        )
      );
    },
    getFeeTypeList() {
      return this.$ajax.get(
        this,
        this.$api.GET_FEE_ALL,
        null,
        res => {
          const data = this.$com.confirm(res, 'data.content', []);
          const list = data.map(item => {
            const children = item.acctTypes.map(child => {
              return {
                value: child.id,
                label: child.name,
              }
            });
            return {
              value: item.name,
              label: item.name,
              children: children,
            };
          })
          this.options.feeTypeList = list;
        }
      );
    },
    getTypes() {
      return this.$ajax.get(
        this,
        this.$api.ASSET_TYPES,
        null,
        (res) => {
          const options = [
            {
              value: '0',
              label: '公租房',
              children: [],
            },
            {
              value: '1',
              label: '非居',
              children: [],
            },
            {
              value: '2',
              label: '租赁',
              children: [],
            }
          ];
          const data = res.data.content;
          if (data && data.length > 0) {
            data.forEach(child => {
              options.forEach(parent => {
                if (child.type == parent.value) {
                  parent.children.push({
                    value: child.id,
                    label: child.name,
                  })
                }
              })
            })
          }
          this.options.useAndClass = options;
        },
        true,
      )
    },
    getBuildingList(val) {
      this.newData.building = null;
      if (!val) {
        this.options.buildings = [];
        return;
      };
      const params = {
        communityId: val.split('#')[0],
        pageSize: 10000,
        pageNo: 1,
        delete: '0',
      };
      return this.$ajax.post(
        this,
        this.$api.SEARCH_FLOOR,
        params,
        (res) => {
          this.options.buildings = this.$com.confirm(res, 'data.content', []);
        },
        true,
      );
    },
    selectBuilding(val) {
      if (!val) {
        this.curBuilding = {};
        return;
      }
      const id = val.split('#')[0],
        building = this.options.buildings.filter(item => item.id == id);
      this.curBuilding = building.length > 0 ? building[0] : {};
    },
    getParams() { // 组织要提交的数据
      const keys = ['acquisitionMethod', 'assetUse', 'building', 'community', 'spnonsor'], data = {...this.newData};
      keys.forEach(key => {
        if (data[key]) {
          const arr = data[key].split('#');
          data[key+'Id'] = (arr && arr[0] && arr[0] != 'null') ? arr[0] : null;
          data[key+'Name'] = (arr && arr[1] && arr[1] != 'null') ? arr[1] : null;
          this.$delete(data, key);
        }
      })

      const roomCostList = this.costList.map(item => {
        const costNo = (item.name && item.name[1]) || null, parName = (item.name && item.name[0]) || null;
        let name = '', sign = '';
        this.options.feeTypeList.forEach(parent => {
          if (parent.value == parName && parent.children && parent.children.length > 0) {
            parent.children.forEach(child => {
              if (child.value == costNo) {
                name = child.label;
                // 0：水费,1:电费,2:燃气费,3: 其他
                if (name.indexOf('水') >= 0) {
                  sign = '0';
                } else if (name.indexOf('电') >= 0) {
                  sign = '1';
                } else if (name.indexOf('煤') >= 0 || name.indexOf('燃') >= 0) {
                  sign = '2';
                } else {
                  sign = '3';
                }
              }
            })
          }
        })
        return {
          cost: item.count || null,
          costNo,
          parName,
          name,
          sign,
        }
      });

      const {useAndClass} = data, useAndClassId = useAndClass && useAndClass[1];
      let useAndClassName = null;
      this.options.useAndClass.forEach(parent => {
        parent.children.forEach(child => {
          if (useAndClassId == child.value) {
            useAndClassName = child.label;
          }
        })
      })
      this.$delete(data, 'useAndClass');

      let roomConfigList = [];
      if (data.roomConfigList && data.roomConfigList.length > 0) {
        roomConfigList = data.roomConfigList.map(item => {
          return {name: item, num: '1'};
        });
      }
      const resourcePics = [...this.houseImgList, ...this.propertyImgList];
      const result = Object.assign(data, {
        floorCount: this.curBuilding.floorCount,
        resourcePics,
        useAndClassId,
        useAndClassName,
        roomCostList,
        roomConfigList,
      });
      return result;
    },
    handleSubmit() {
      this.$refs.formData.validate(valid => {
        if (!valid) {this.$Message.error('请检查表单信息!'); return};
        const params = this.getParams();
        this.$ajax.post(
          this,
          this.$api.POST_ASSET_ROOM,
          {list: [params]},
          res => {
            this.$Message.success('新增成功');
            this.$router.back();
          },
        )
      })
    },
    handleEdit() {
      this.$refs.formData.validate(valid => {
        if (!valid) {this.$Message.error('请检查表单信息!'); return};
        const params = this.getParams();
        params.createTime = null;
        const submit = (status) => {
          this.$ajax.put(
            this,
            this.$api.PUT_EDIT_ROOM.replace('{id}', this.newData.id).replace('{status}', status),
            {list: [params]},
            res => {
              this.$Message.success('提交修改成功');
              this.$router.back();
            },
          )
        };

        // status 0--草稿 2/提交并审核
        if (this.newData.checkStatus == '0') { // 草稿的修改
          submit('0')
        } else if (this.newData.checkStatus == '5') { // 审批通过的修改
          this.$Modal.confirm({
            title: '确认修改分户信息？',
            content: '<p>修改以后需由专人审批后方可生效。生效后，不可撤回。</p>',
            onOk: () => {submit('2')}
          })
        }
      })
    },
    getCode(){
      return this.$ajax.get(
        this,
        this.$api.GET_FILE_UPLOAD_CODE_GET + "?number=2",
        null,
        res => {
          let {code}=res.data.content;
          this.code=code.split(',');
        }
      );
    },
    completeHouse(response,filename){
      response = response.data.content;
      this.houseImgList.push({
        picId:response.id,
        name:response.name,
        picPath:response.path,
        type: 'house',
      })
    },
    removeHouse(item){
      const index = this.houseImgList.findIndex(ele => ele.picId == item.picId);
      this.houseImgList.splice(index, 1);
      this.deleteForPhone(item.flag, this.code[0], item.picId);
    },
    deleteForPhone(flag,code,id){
      if(flag != 'phone') return ;
      this.$ajax.delete(
        this,
        this.$api.DELETE_FILE_UPLOAD_POST.replace("{code}", code).replace("{id}",id),
        {},
        res => {}
      );
    },
    completeProperty(response,filename){
      response = response.data.content;
      this.propertyImgList.push({
        picId:response.id,
        name:response.name,
        picPath:response.path,
        type: 'property',
      })
    },
    removeProperty(item){
      const index = this.propertyImgList.findIndex(ele => ele.picId == item.picId);
      this.propertyImgList.splice(index, 1);
      this.deleteForPhone(item.flag, this.code[1], item.picId);
    },
    getReturn(name, code){
      this.$ajax.get(
        this,
        this.$api.GET_FILE_UPLOAD_POST.replace("{code}", code),
        null,
        res => {
          if(res.data.content.length>0){
            const data = res.data.content, type = name == 'houseImgList' ? 'house' : 'property';
            const result = data.map(e => {
              return {
                picId:e.id,
                picPath:e.path,
                return:'phone',
                flag:true,
                type,
              };
            });
            if (this[name].length == 0) {
              this[name] = result;
            } else {
              result.forEach((d)=>{
                let flag=true;
                this[name].forEach((e)=>{
                  if(d.picId == e.picId){
                    flag = false;
                  }
                })
                if(flag){
                  this[name].push({
                    picId:d.picId,
                    picPath:d.picPath,
                    type,
                  })
                }
              })
            }
          }
        }
      );
    },
    toNumber(val) {
      return Number(val.toFixed(2));
    },
  },
  computed: {
    isOperating() { // 是运营中
      const {leaseStatus} = this.newData;
      if (!leaseStatus) return false;
      return leaseStatus == '0' ? false : true;
    },
    isJoint() { // 是合租
      const {leaseType} = this.newData;
      if (!leaseType && leaseType !== 0) return false;
      return leaseType == '0' ? true : false;
    },
    isRenting() { // 出租中
      const {leaseStatus} = this.newData;
      if (!leaseStatus) return false;
      return leaseStatus == '2' ? true : false;
    },
    disableTitle() {
      return this.isEdit || this.disableInfo.community;
    },
    isDraft() {
      if (this.newData.checkStatus == '0') {
        return true;
      } else if (this.newData.checkStatus == '7'){
        if (this.newData.dataStatus == '0') {
          return true;
        }
      }
      return false;
    },
    isPassed() {
      if (this.newData.checkStatus == '5') {
        return true;
      } else if (this.newData.checkStatus == '7'){
        if (this.newData.dataStatus == '1') {
          return true;
        }
      }
      return false;
    },
  },
  watch: {
    curBuilding(cur, past) {
      const data = {
        acquisitionMethod: null,
        assetUse: null,
        spnonsor: null,
        useAndClass: [],
        haveIncome: null,
      };
      if (cur != past) {
        if (!cur || !cur.id) {
          this.newData = Object.assign(this.newData, data);
          return;
        }
        const {acquisitionMethodId, acquisitionMethodName, assetUseId, assetUseName, spnonsorId, spnonsorName, useAndClassId, haveIncome} = cur;
        for (let key in data) {
          if (cur[key + 'Id'] && key != 'useAndClass') {
            data[key] = cur[key + 'Id'] + '#' + cur[key + 'Name'];
          }
        }
        if (!useAndClassId) {
          data.useAndClass = [];
        } else {
          this.options.useAndClass.forEach(parent => {
            parent.children.forEach(child => {
              if (useAndClassId == child.value) {
                data.useAndClass = [parent.value, child.value];
              }
            })
          });
        }
        data.haveIncome = haveIncome;
        this.newData = Object.assign(this.newData, data);
      }
    },
    'newData.realArea': {
      handler(cur, past) {
        if (cur && cur != past) {
          const val = cur * (this.newData.squareMeterMonthlyRent || 0);
          this.newData.rent = this.toNumber(val);
        }
      },
    },
    'newData.squareMeterMonthlyRent': {
      handler(cur, past) {
        if (cur && cur != past) {
          const val = cur * (this.newData.realArea || 0);
          this.newData.rent = this.toNumber(val);
        }
      },
    },
    'newData.mortgageNum': {
      handler(cur, past) {
        if (cur && cur != past && cur != 'auto') {
          const val = cur * (this.newData.rent || 0);
          this.newData.deposit = this.toNumber(val);
        }
      }
    },
    'newData.rent': {
      handler(cur, past) {
        if (cur && cur != past && this.newData.mortgageNum != 'auto') {
          const val = cur * (this.newData.mortgageNum || 0);
          this.newData.deposit = this.toNumber(val);
        }
      }
    },
  },
}
</script>

<style scoped>
.editTitle {
  font-size: 16px;
  padding: 7px 8px;
  border-bottom: 1px dashed #e9e9e9;
  margin-bottom: 21px;
  position: relative;
}
.editTitle:before {
  content: " ";
  display: block;
  position: absolute;
  width: 4px;
  height: 20px;
  background: #e9e9e9;
  left: 0;
  top: 8px;
}
.btn-box {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}
.btn-box>button {
  min-width: 86px;
}
</style>
