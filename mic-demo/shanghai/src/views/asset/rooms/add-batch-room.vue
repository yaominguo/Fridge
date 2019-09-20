<template>
<Card dis-hover>
  <Steps :current="curStep" class="steper">
    <Step title="分户信息"></Step>
    <Step title="价格信息补充"></Step>
  </Steps>
  <Form :label-width="100">
    <Row>
      <Col :span="10">
        <FormItem label="小区/公寓">
        <div style="display: flex">
          <Select :disabled="curStep != '0'" v-model="newData.community" @on-change="getBuildingList" clearable>
            <Option v-for="item in options.community" :value="item.id + '#' + item.name" :key="item.id">{{item.name}}</Option>
          </Select>
          <Button v-show="curStep=='0'" @click="showCommunity = true" type="primary" ghost style="marginLeft: 10px;">添加小区</Button>
        </div>
        </FormItem>
      </Col>
      <Col :span="10">
        <FormItem label="楼栋">
        <div style="display: flex">
          <Select :disabled="curStep != '0'" v-model="newData.building" @on-change="selectBuilding" clearable>
            <Option v-for="item in options.buildings" :value="item.id + '#' + item.name" :key="item.id">{{item.name}}</Option>
          </Select>
          <Button v-show="curStep=='0'" @click="showBuilding = true" type="primary" ghost style="marginLeft: 10px;">添加楼栋</Button>
        </div>
        </FormItem>
      </Col>
    </Row>
  </form>
  <div v-show="curStep == '0' && newData.building">
    <Divider style="margin: 0;" />
    <Row v-for="(floor, f) in floorList" :key="'floor' + f">
      <Form
        style="padding-top:20px"
        :label-width="70"
      >
        <Col span="1">
          <Button @click="deleteFloor(f)" class="del-btn" size="small" type="error" icon="ios-trash"/>
        </Col>
        <Col span="3">
          <FormItem label="所在楼层" :label-width="80">
            <Select
              v-model="floorList[f]['houseFloor']"
              transfer
              clearable
              placeholder="楼层"
            >
              <Option v-for="i in totalFloor" :key="i.name" :value="i.name">{{i.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="20">
          <div class="room-container">
            <div v-for="(room, r) in floor" :key="'room' + r" class="room-card">
              <Icon @click="deleteRoom(f, r)" class="del-room" type="ios-close-circle" />
              <Row>
                <Col :span="11" class="col">
                  <Input v-model="floorList[f][r]['roomNo']" placeholder="室号" />
                  <Select v-model="floorList[f][r]['assetUse']" placeholder="资产用途" clearable>
                    <Option v-for="item in options.assetUse" :key="item.id" :value="item.id + '#' +item.name">{{item.name}}</Option>
                  </Select>
                  <Select v-model="floorList[f][r]['haveIncome']" placeholder="是否盈利" clearable>
                    <Option value="1">是</Option>
                    <Option value="0">否</Option>
                  </Select>
                </Col>
                <Col :span="2">
                  <div class="line"></div>
                </Col>
                <Col :span="11" class="col">
                  <Select v-model="floorList[f][r]['apartmentType']" placeholder="房型" clearable>
                    <Option v-for="item in options.style" :key="item.id" :value="item.id + '#' + item.name">{{item.name}}</Option>
                  </Select>
                  <Input v-model="floorList[f][r]['predictedArea']" placeholder="预测(建筑)面积" />
                  <!-- <Input @on-change="areaChance" v-model="floorList[f][r]['realArea']" placeholder="套内面积" /> -->
                  <Input v-model="floorList[f][r]['realArea']" placeholder="套内面积" />
                </Col>
              </Row>
              <Row style="marginTop: 10px;">
                <Col :span='24'>
                  <Cascader v-model="floorList[f][r]['useAndClass']" :data="options.useAndClass" placeholder="请选择资产类型" clearable/>
                </Col>
              </Row>
            </div>
            <div class="add-room-btn">
              <Button @click="addRoom(f)" type="text" icon="md-add">新增房间</Button>
            </div>
          </div>
        </Col>
      </Form>
    </Row>
    <Button @click="addFloor" type="dashed" style="width: 100%;">新增楼层</Button>
    <div class="btn-box">
      <Button @click="nextStep" type="primary">下一步</Button>
    </div>
  </div>
  <div v-show="curStep == '1'">
    <Divider style="margin: 0;" />
    <div class="tips">点击 "<Icon type="md-settings" color="#2d8cf0"/>" 可批量修改</div>
    <div class="form-list">
      <Row class-name="header" type="flex" justify="space-between" align="middle">
        <Col span="1">室号</Col>
        <Col span="2">套内面积(㎡)</Col>
        <Col span="3"><span class="required">*</span><span>每平方米月租金</span><Icon @click="showSettingModal('eachRent')" type="md-settings" size="18" color="#2d8cf0" /></Col>
        <Col span="2"><span class="required">*</span><span>月租金</span><Icon type="md-settings" @click="showSettingModal('rent')" size="18" color="#2d8cf0" /></Col>
        <Col span="4"><span class="required">*</span><span>付款方式</span><Icon type="md-settings" @click="showSettingModal('payMethod')" size="18" color="#2d8cf0" /></Col>
        <Col span="2"><span class="required">*</span><span>押金</span><Icon type="md-settings" @click="showSettingModal('deposit')" size="18" color="#2d8cf0" /></Col>
        <Col span="2"><span>房间配置</span><Icon type="md-settings" @click="showSettingModal('config')" size="18" color="#2d8cf0"/></Col>
        <Col span="2"><span>房间照片</span></Col>
        <Col span="2"><span>水费户号</span></Col>
        <Col span="2"><span>电费户号</span></Col>
        <Col span="2"><span>煤气费户号</span></Col>
      </Row>
      <Row v-for="(item, i) in roomList" :key="i" class-name="content">
        <Col span="1">{{item.roomNo}}</Col>
        <Col span="2">{{item.realArea}}</Col>
        <Col span="3">
          <InputNumber @on-change="changeRent(i)" v-model="item.squareMeterMonthlyRent" :min="0" placeholder="元/㎡"/>
        </Col>
        <Col span="2">
          <InputNumber @on-change="changeDeposit(i)" v-model="item.rent" :min="0" placeholder="租金(元)"/>
        </Col>
        <Col span="4" style="display: flex;justifyContent: space-around">
          <Select v-model="item.payNum" clearable placeholder="付" style="width: 40%">
            <Option v-for="(count,index)  in 12" :value="count" :key="'pay' + index">{{ count }}</Option>
          </Select>
          <Select @on-change="changeDeposit(i)" v-model="item.mortgageNum" clearable placeholder="押" style="width: 40%">
            <Option value="auto">自定义</Option>
            <Option v-for="(count,index)  in 12" :value="count" :key="'mor' + index">{{ count }}</Option>
          </Select>
        </Col>
        <Col span="2">
          <InputNumber @on-change="changeMortgageNum(i)" :disabled="item.mortgageNum != 'auto'" v-model="item.deposit" :min="0"/>
        </Col>
        <Col span="2">
          <Button @click="showRoomConfigModal(i)" type="text">房间配置</Button>
        </Col>
        <Col span="2">
          <Button @click="showPhotoModal(i)" type="text">上传照片</Button>
        </Col>
        <Col span="2">
          <Input v-model="item.waterNum" style="width: 90%" placeholder="水费户号"/>
        </Col>
        <Col span="2">
          <Input v-model="item.elecNum" style="width: 90%" placeholder="电费户号"/>
        </Col>
        <Col span="2">
          <Input v-model="item.gasNum" style="width: 90%" placeholder="煤气费户号"/>
        </Col>
      </Row>
    </div>
    <div class="btn-box">
      <Button @click="curStep -= 1" type="primary" ghost>上一步</Button>
      <Button @click="handleSubmit" type="primary">保存</Button>
    </div>
  </div>
  <AddCommunityModal @handleCancle="showCommunity = false" :leaseType="1" @handleOk="getOptions" :showModal="showCommunity" />
  <Modal title="添加楼栋" v-model="showBuilding" footer-hide :mask-closable="false" width="1100">
    <BuildingModal @complete="getOptions" v-if="showBuilding" :isModal="true"/>
  </Modal>
  <Modal @on-ok="handleSetting" title="设置" v-model="showSetting" :mask-closable="false">
    <Form>
      <FormItem>
        <p>将列表中的<span class="required">{{settingModalTitle}}</span>统一设置为: </p>
        <Row v-if="settingType == 'payMethod'">
          <Col span="10" style="display: flex;justifyContent: space-around">
            <Select v-model="setting.payNum" clearable placeholder="付" style="width: 48%">
              <Option v-for="(count,index)  in 12" :value="count" :key="'pay' + index">{{ count }}</Option>
            </Select>
            <Select v-model="setting.mortgageNum" clearable placeholder="押" style="width: 48%">
              <Option value="auto">自定义</Option>
              <Option v-for="(count,index)  in 12" :value="count" :key="'mor' + index">{{ count }}</Option>
            </Select>
          </Col>
        </Row>
        <CheckboxGroup v-else-if="settingType == 'config'" v-model="setting.roomConfigList">
          <Checkbox v-for="(item,index) in defaultConfigLists" :key="index" :label="item" />
        </CheckboxGroup>
        <InputNumber v-else v-model="setting.count" :min="0" style="width: 50%;"/>
      </FormItem>
    </Form>
  </Modal>
  <Modal @on-ok="handleRoomConfig" title="房间配置" v-model="showRoomConfig" :mask-closable="false">
    <CheckboxGroup v-model="rowConfigs">
      <Checkbox v-for="item in defaultConfigLists" :key="item" :label="item" />
    </CheckboxGroup>
  </Modal>
  <Modal v-model="showPhoto" title="房间照片" :mask-closable="false" footer-hide>
    <ImgUploader v-if="showPhoto"
      :defaultList="roomList[this.curRow].resourcePics || []"
      @on-complete="completeHouse"
      @on-remove="removeHouse"
      @showUploadImg="getReturn(this.curRow)"
      :isPhone="true"
      :url="$api.IMG_UPLOAD_URL"
      :maxUploads="5"
      :code="codeList[this.curRow]"
      uploadButton="houseBtn"
    />
  </Modal>
</Card>
</template>

<script>
import AddCommunityModal from "@/views/house/components/createCommunity.vue";
import BuildingModal from '@/views/asset/building/building-info';
import ImgUploader from '@/components/Helper/Form/image-upload';
export default {
  name: 'AddBatchRoom',
  components: {
    AddCommunityModal,
    BuildingModal,
    ImgUploader,
  },
  data() {
    return {
      curStep: 0,
      showCommunity: false,
      showBuilding: false,
      showSetting: false,
      showRoomConfig: false,
      showPhoto: false,
      newData: {},
      options: {
        community: [],
        buildings: [],
        useAndClass: [],
        style: [],
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
      },
      defaultConfigLists: ['WIFI', '空调', '热水器', '洗衣机', '冰箱', '电视', '微波炉', '燃气灶', '抽油烟机', '电磁炉', '床', '书桌', '衣柜', '沙发','阳台'],
      floorList: [[{}]],
      curUseAndClass: [],
      roomList: [],
      curBuilding: {},
      setting: {count: null},
      settingModalTitle: '',
      settingType: '',
      curRow: '',
      rowConfigs: [],
      codeList: [],
    }
  },
  mounted() {
    this.$ajax.all(
      ...this.getOptions(),
      this.getTypes(),
    );
  },
  methods: {
    showRoomConfigModal(i) {
      const list = this.roomList[i]['roomConfigList'];
      if (list && list.length > 0) {
        this.rowConfigs = list;
      } else {
        this.rowConfigs = [];
      }
      this.curRow = i;
      this.showRoomConfig = true;
    },
    handleRoomConfig() {
      this.roomList[this.curRow]['roomConfigList'] = this.rowConfigs;
    },
    showSettingModal(type) {
      const obj = {
        eachRent: '每平方米月租金',
        rent: '月租金',
        payMethod: '付款方式',
        deposit: '押金',
        config: '房间配置',
      };
      this.setting = {count: null};
      this.settingType = type;
      this.settingModalTitle = obj[type];
      this.showSetting = true;
    },
    showPhotoModal(i) {
      this.curRow = i;
      this.showPhoto = true;
    },
    handleSetting() { // 批量设置参数
      const {count, roomConfigList, mortgageNum, payNum} = this.setting;
      switch (this.settingType) {
        case 'eachRent':
          if (count) {
            this.roomList.forEach((item, i) => {
              item.squareMeterMonthlyRent = count;
              this.changeRent(i);
            })
          }
          break;
        case 'rent':
          if (count) {
            this.roomList.forEach((item, i) => {
              item.rent = count;
              this.changeDeposit(i);
            })
          }
          break;
        case 'deposit':
          if (count) {
            this.roomList.forEach((item, i) => {
              item.deposit = count;
              this.changeMortgageNum(i);
            })
          }
          break;
        case 'payMethod':
          if (payNum && mortgageNum) {
            this.roomList.forEach((item, i) => {
              item.payNum = payNum;
              item.mortgageNum = mortgageNum;
              this.changeDeposit(i);
            })
          }
          break;
        case 'config':
          if (roomConfigList && roomConfigList.length > 0) {
            this.roomList.forEach(item => {
              item.roomConfigList = roomConfigList;
            })
          }
          break;
        default:
          break;
      }
    },
    getOptions() {
      this.showCommunity = false;
      this.showBuilding = false;
      const { ASSET_COMMUNITY, ASSET_STYLE } = this.$api;
      const list = [
        {url: ASSET_COMMUNITY, name: 'community'},
        {url: ASSET_STYLE, name: 'style'},
      ];
      return list.map(item =>
        this.$ajax.get(
          this,
          item.url,
          {},
          (res) => {
            const data = this.$com.confirm(res, 'data.content');
            this.options[item.name] = data;
          },
          true,
        )
      );
    },
    getFeeTypeList() { // 获取其他费用类型
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
      this.$ajax.post(
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
        this.floorList = [[{}]];
        return;
      }
      const id = val.split('#')[0],
        building = this.options.buildings.filter(item => item.id == id);
      this.curBuilding = building.length > 0 ? building[0] : {};
      this.options.useAndClass.forEach(parent => {
        parent.children.forEach(child => {
          if (this.curBuilding.useAndClassId == child.value) {
            this.curUseAndClass = [parent.value, child.value];
          }
        })
      })
      this.floorList[0][0] = {
        assetUse: this.curBuilding.assetUseId + '#' + this.curBuilding.assetUseName,
        haveIncome: this.curBuilding.haveIncome,
        useAndClass: this.curUseAndClass,
      };
    },
    deleteFloor(i) {
      this.floorList.splice(i, 1);
    },
    deleteRoom(floor, room) {
      this.floorList[floor].splice(room, 1);
    },
    addRoom(index) {
      this.floorList[index].push({
        assetUse: this.curBuilding.assetUseId + '#' + this.curBuilding.assetUseName,
        haveIncome: this.curBuilding.haveIncome,
        useAndClass: this.curUseAndClass,
      });
    },
    addFloor() {
      this.floorList.push([{
        assetUse: this.curBuilding.assetUseId + '#' + this.curBuilding.assetUseName,
        haveIncome: this.curBuilding.haveIncome,
        useAndClass: this.curUseAndClass,
      }])
    },
    nextStep() {
      const isError = this.dataList.some(item => {
        if(!item.houseFloor) {
          this.$Message.error('请选择所在楼层');
          return true;
        }
        if(!item.roomNo) {
          this.$Message.error('请输入室号');
          return true;
        }
        if(!item.assetUseId && item.assetUseId != 0) {
          this.$Message.error('请选择资产用途');
          return true;
        }
        if(!item.useAndClassId) {
          this.$Message.error('请选择资产类型');
          return true;
        }
        if(!item.haveIncome && item.haveIncome != 0) {
          this.$Message.error('请选择是否盈利');
          return true;
        }
        if(!this.$com.checkNumber(item.predictedArea)) {
          this.$Message.error('请输入数字格式的预测(建筑)面积');
          return true;
        }
        if(!this.$com.checkNumber(item.realArea)) {
          this.$Message.error('请输入数字格式的套内面积');
          return true;
        }
      })
      if (isError) return;
      let roomObj = {}, sameRoom = false;
      this.dataList.forEach(item => {
        if (sameRoom) return;
        if (roomObj[item.roomNo.trim()]) {
          this.$Message.error('存在相同的室号');
          sameRoom = true;
          return
        }
        roomObj[item.roomNo.trim()] = true;
      })
      if (!sameRoom) {
        this.roomList = [...this.dataList];
        this.curStep += 1;
        this.getCode();
      }
    },
    getCode(){
      return this.$ajax.get(
        this,
        this.$api.GET_FILE_UPLOAD_CODE_GET + "?number=" + this.roomList.length,
        null,
        res => {
          let {code}=res.data.content;
          this.codeList=code.split(',');
        }
      );
    },
    completeHouse(response,filename){
      response = response.data.content;
      this.roomList[this.curRow].resourcePics.push({
        picId:response.id,
        name:response.name,
        picPath:response.path,
        type: 'house',
      })
    },
    removeHouse(item){
      const index = this.roomList[this.curRow].resourcePics.findIndex(ele => ele.picId == item.picId);
      this.roomList[this.curRow].resourcePics.splice(index, 1);
      this.deleteForPhone(item.flag, this.codeList[this.curRow], item.picId);
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
    getReturn(i){
      this.$ajax.get(
        this,
        this.$api.GET_FILE_UPLOAD_POST.replace("{code}", this.codeList[i]),
        null,
        res => {
          if(res.data.content.length>0){
            const data = res.data.content;
            const result = data.map(e => {
              return {
                picId:e.id,
                picPath:e.path,
                return:'phone',
                flag: true,
                type: 'house',
              };
            });
            if (this.roomList[i].resourcePics.length == 0) {
              this.roomList[i].resourcePics = result;
            } else {
              result.forEach((d)=>{
                let flag=true;
                this.roomList[i].resourcePics.forEach((e)=>{
                  if(d.picId == e.picId){
                    flag = false;
                  }
                })
                if(flag){
                  this.roomList[i].resourcePics.push({
                    picId:d.picId,
                    picPath:d.picPath,
                    type: 'house',
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
    changeRent(i) { // 当每平米租金改变时改变租金
      const val = (this.roomList[i].squareMeterMonthlyRent || 0) * (this.roomList[i].realArea || 0);
      this.roomList[i].rent = this.toNumber(val);
      this.changeDeposit(i);
    },
    changeDeposit(i) { // 当押或租金改变时改变押金
      if (this.roomList[i].mortgageNum == 'auto') {
        this.roomList[i].deposit = this.roomList[i].deposit || null;
        return;
      }
      const val = (this.roomList[i].rent || 0) * (this.roomList[i].mortgageNum || 0);
      this.roomList[i].deposit = this.toNumber(val);
    },
    changeMortgageNum(i) { // 当押金数目不匹配押则置换押的数目为自定义
      const num = Number(this.roomList[i].deposit / this.roomList[i].rent);
      if (num % 1 ==0 && num >= 1 && num <= 12) {
        this.roomList[i].mortgageNum = num;
        return;
      };
      this.roomList[i].mortgageNum = 'auto';
    },
    handleSubmit() {
      const isError = this.roomList.some(item => {
        if(!item.squareMeterMonthlyRent && item.squareMeterMonthlyRent != 0) {
          this.$Message.error('请设置每平方米月租金');
          return true;
        }
        if(!item.rent && item.rent != 0) {
          this.$Message.error('请设置租金');
          return true;
        }
        if(!item.payNum || !item.mortgageNum) {
          this.$Message.error('请选择付款方式');
          return true;
        }
        if(!item.deposit && item.deposit != 0) {
          this.$Message.error('请设置押金');
          return true;
        }
      })
      if (isError) return;
      const params = JSON.parse(JSON.stringify(this.roomList));
      params.forEach(obj => {
        obj.roomConfigList = obj.roomConfigList.map(item => {
          return {name: item, num: '1'};
        });
      })
      this.$ajax.post(
        this,
        this.$api.POST_ASSET_ROOM,
        {list: params},
        res => {
          this.$Message.success('新增成功');
          this.$router.back();
        },
      )
    },
  },
  computed: {
    totalFloor() {
      if (!this.curBuilding.floorCount) return [];
      const len = Number(this.curBuilding.floorCount);
      const list = [];
      for (let i=1; i<=len; i++) {
        list.push({
          name: i,
        });
      }
      return list;
    },
    dataList() { // 组织数据
      const list = [];
      this.floorList.map(floor => {
        for(let key in floor) {
          if (key != 'houseFloor') {
            floor[key]['houseFloor'] = floor['houseFloor'];
            floor[key]['building'] = this.newData.building;
            floor[key]['community'] = this.newData.community;
            list.push({...floor[key]});
          }
        }
      })
      const keys = ['assetUse', 'apartmentType', 'building', 'community'];
      keys.forEach(key => {
        list.forEach(item => {
          if (item[key]) {
            const arr = item[key].split('#');
            item[key+'Id'] = (arr && arr[0] && arr[0] != 'null') ? arr[0] : null;
            item[key+'Name'] = (arr && arr[1] && arr[1] != 'null') ? arr[1] : null;
            this.$delete(item, key);
          }
        })
      })
      list.forEach(item => {
        const {useAndClass} = item, useAndClassId = useAndClass && useAndClass[1];
        let useAndClassName = null;
        this.options.useAndClass.forEach(parent => {
          parent.children.forEach(child => {
            if (useAndClassId == child.value) {
              useAndClassName = child.label;
            }
          })
        })
        item.useAndClassId = useAndClassId;
        item.useAndClassName = useAndClassName;
        this.$delete(item, 'useAndClass');
        item = Object.assign(item, {
          squareMeterMonthlyRent: null,
          rent: null,
          deposit: null,
          payNum: null,
          mortgageNum: null,
          waterNum: null,
          elecNum: null,
          gasNum: null,
          roomConfigList: [],
          resourcePics: [],
        });
      });
      return list;
    },
  },
}
</script>

<style scoped>
.steper {
  width: 50%;
  margin: 20px auto 50px;
}
.btn-box {
  text-align: center;
  margin-top: 20px;
}
.btn-box button {
  padding: 5px 30px;
}
.room-container {
  display: flex;
  flex-wrap: wrap;
}
.room-card {
  position: relative;
  width: 250px;
  height: 175px;
  border: 1px solid #e8eaec;
  border-radius: 5px;
  padding: 10px;
  margin: 0 0 10px 10px;
}
.room-container .col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 110px;
}
.room-container .line {
  background: #e8eaec;
  width: 1px;
  height: 110px;
  margin: 0 7px;
}
.add-room-btn {
  width: 130px;
  height: 175px;
  border: 1px solid #e8eaec;
  border-radius: 5px;
  margin: 0 0 10px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #efefef;
}
.add-room-btn button {
  width: 100%;
  height: 100%;
}
.del-btn {
  margin-top: 4px;
  font-size: 14px;
  border-radius: 3px;
}
.del-room {
  position: absolute;
  top: -8px;
  right: -8px;
  color: #ed4014;
  font-size: 18px;
  cursor: pointer;
}
.tips {
  margin: 20px 0 10px;
  font-weight: bold;
}
.required {
  color: red;
}
.form-list .header {
  background: rgb(249, 248, 248);
  height: 40px;
  margin-bottom: 15px;
  border: 1px solid #e8eaec;
}
.form-list .content {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.form-list .ivu-col {
  text-align: center;
}
.form-list .ivu-icon {
  cursor: pointer;
}
</style>
