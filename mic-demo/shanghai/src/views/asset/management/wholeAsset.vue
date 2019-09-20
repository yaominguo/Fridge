<template>
  <Card dis-hover>
    <Form :label-width="70">
      <Row>
        <Col :span="6">
          <FormItem label="小区">
            <Select v-model="building.communityId" disabled clearable>
              <Option v-for="item in options.community" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="楼名">
            <Input v-model="building.name" disabled />
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="楼层总高">
            <Input v-model="building.floorCount" disabled />
          </FormItem>
        </Col>
      </Row>
    </Form>
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
          <FormItem label="所在楼层">
            <Select
              v-model="floorList[f]['houseFloor']"
              transfer
              clearable
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
                  <Select v-model="floorList[f][r]['assetUseId']" placeholder="资产用途" clearable>
                    <Option v-for="item in options.assetUse" :key="item.id" :value="item.id">{{item.name}}</Option>
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
                  <!-- <Input @on-change="areaChance" v-model="floorList[f][r]['buildArea']" placeholder="建筑面积" /> -->
                  <Select v-model="floorList[f][r]['apartmentType']" placeholder="房型" clearable>
                    <Option v-for="item in options.style" :key="item.id" :value="item.id">{{item.name}}</Option>
                  </Select>
                  <Input v-model="floorList[f][r]['predictedArea']" placeholder="预测(建筑)面积" />
                  <Input @on-change="areaChance" v-model="floorList[f][r]['realArea']" placeholder="套内面积" />
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
      <Button @click="showConfirm" type="primary">保存</Button>
    </div>
    <!-- <Modal v-model="showModal" title="公摊面积确认" @on-ok="ok" :width="700">
      <Form :label-width="120">
        <Row>
          <Col :span="12">
            <FormItem label="楼栋实测面积" >
              <Input v-model="building.buildArea" disabled placeholder="楼栋实测面积" />
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="已填房间总套内面积" :label-width="150">
              <Input v-model="roomTotalArea" disabled placeholder="已填房间总套内面积" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="计算得公摊面积" >
              <Input v-model="publicArea" disabled placeholder="计算得公摊面积" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="12">
            <FormItem label="已填公摊面积" >
              <Input v-model="averageArea" :disabled="writeOnly" placeholder="已填公摊面积" />
            </FormItem>
          </Col>
          <Button @click="writeOnly = false" type="primary" ghost style="marginLeft: 10px;">修改</Button>
        </Row>
      </Form>
    </Modal> -->
  </Card>
</template>

<script>
export default {
  name: 'WholeAsset',
  data() {
    return {
      floorList: [[{}]],
      options: {
        community: [],
        // investor: [],
        // method: [],
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
        useAndClass: [],
      },
      // showModal: false,
      // writeOnly: true,
      averageArea: 0,
      roomTotalArea: 0,
      building: {},
      curUseAndClass: [],
    }
  },
  created() {
    this.$ajax.all(...this.getOptions(), this.getTypes()).then(() => {
      const building = {...JSON.parse(localStorage.getItem('buildingInfo'))};
      if (building) {
        this.options.useAndClass.forEach(parent => {
          parent.children.forEach(child => {
            if (building.useAndClassId == child.value) {
              this.curUseAndClass = [parent.value, child.value];
            }
          })
        })
        this.floorList[0][0] = {
          assetUseId: building.assetUseId,
          haveIncome: building.haveIncome,
          useAndClass: this.curUseAndClass,
        };
        this.building = building;
        this.averageArea = building.averageArea || 0;
      }
    });
  },
  methods: {
    // 获取选择框选项
    getOptions() {
      const { ASSET_COMMUNITY, ASSET_INVESTOR, ASSET_METHOD, ASSET_STYLE } = this.$api;
      const list = [
        {url: ASSET_COMMUNITY, name: 'community'},
        // {url: ASSET_INVESTOR, name: 'investor'},
        // {url: ASSET_METHOD, name: 'method'},
        {url: ASSET_STYLE, name: 'style'},
      ];
      return list.map(item =>
        this.$ajax.get(
          this,
          item.url,
          {},
          (res) => {
            this.options[item.name] = res.data && res.data.content;
          },
          true,
        )
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
    // ok() {
    //   const {style, assetUse} = this.options;
    //   this.dataList.forEach(item => {
    //     const {apartmentType, assetUseId, useAndClass} = item;
    //     const _useAndClassId = useAndClass && useAndClass[1];
    //     let _useAndClassName = null;
    //     this.options.useAndClass.forEach(parent => {
    //       parent.children.forEach(child => {
    //         if (_useAndClassId == child.value) {
    //           _useAndClassName = child.label;
    //         }
    //       })
    //     })
    //     const obj = {
    //       apartmentTypeName: (style && style.length>0 && (style.filter(e => e.id == apartmentType))[0].name) || null,
    //       assetUseName: (assetUse && assetUse.length>0 && (assetUse.filter(e => e.id == assetUseId))[0].name) || null,
    //       useAndClassId: _useAndClassId,
    //       useAndClassName: _useAndClassName,
    //     };
    //     item = Object.assign(item, obj);
    //   })
    //   const params = {
    //     floorId: this.building.id,
    //     list: this.dataList,
    //   };
    //   this.building.createTime = null;
    //   if (this.averageArea > 0) {
    //     this.building.averageArea = this.averageArea;
    //   }
    //   const changeFloor = this.$ajax.put(
    //     this,
    //     this.$api.ASSET_FLOOR + this.building.id,
    //     this.building,
    //   );
    //   const submitData = this.$ajax.post(
    //     this,
    //     this.$api.ADD_ASSET_HOUSE,
    //     params,
    //     (res) => {
    //       this.$Message.success('新增成功');
    //       this.$router.back();
    //     }
    //   );
    //   this.$ajax.all(changeFloor, submitData);
    // },
    deleteFloor(i) {
      this.floorList.splice(i, 1);
    },
    deleteRoom(floor, room) {
      this.floorList[floor].splice(room, 1);
    },
    addRoom(index) {
      this.floorList[index].push({
        assetUseId: this.building.assetUseId,
        haveIncome: this.building.haveIncome,
        useAndClass: this.curUseAndClass,
      });
    },
    addFloor() {
      this.floorList.push([{
        assetUseId: this.building.assetUseId,
        haveIncome: this.building.haveIncome,
        useAndClass: this.curUseAndClass,
      }])
    },
    showConfirm() {
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
        if(!item.useAndClass || item.useAndClass.length<=0) {
          this.$Message.error('请选择资产类型');
          return true;
        }
        // if(!item.apartmentType) {
        //   this.$Message.error('请选择房型');
        //   return true;
        // }
        if(!item.haveIncome && item.haveIncome != 0) {
          this.$Message.error('请选择是否盈利');
          return true;
        }
        // if(!this.$com.checkNumber(item.buildArea)) {
        //   this.$Message.error('请输入数字格式的建筑面积');
        //   return true;
        // }
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
        if (roomObj[item.roomNo.trim()]) {
          this.$Message.error('存在相同的室号');
          sameRoom = true;
          return
        }
        roomObj[item.roomNo.trim()] = true;
      })
      if(parseInt(this.building.buildArea) < parseInt(this.roomTotalArea)) {
        this.$Message.error('已填房间总面积大于楼栋面积');
        return;
      }
      if (!sameRoom) {
        // this.writeOnly = true;
        // this.showModal = true;
        this.handleSubmit();
      }
    },
    handleSubmit() {
      const {style, assetUse} = this.options;
      this.dataList.forEach(item => {
        const {apartmentType, assetUseId, useAndClass} = item;
        const _useAndClassId = useAndClass && useAndClass[1];
        let _useAndClassName = null;
        this.options.useAndClass.forEach(parent => {
          parent.children.forEach(child => {
            if (_useAndClassId == child.value) {
              _useAndClassName = child.label;
            }
          })
        })
        const obj = {
          apartmentTypeName: (style && style.length>0 && (style.filter(e => e.id == apartmentType))[0].name) || null,
          assetUseName: (assetUse && assetUse.length>0 && (assetUse.filter(e => e.id == assetUseId))[0].name) || null,
          useAndClassId: _useAndClassId,
          useAndClassName: _useAndClassName,
        };
        item = Object.assign(item, obj);
      })
      const params = {
        floorId: this.building.id,
        list: this.dataList,
      };
      this.$ajax.post(
        this,
        this.$api.ADD_ASSET_HOUSE,
        params,
        (res) => {
          this.$Message.success('新增成功');
          this.$router.back();
        }
      );
    },
    areaChance() {
      let sum = 0;
      this.dataList.forEach(item => {
        sum += parseInt(item.realArea);
      })
      this.roomTotalArea = sum;
    },
  },
  computed: {
    totalFloor() {
      const len = Number(this.building.floorCount);
      const list = [];
      for (let i=1; i<=len; i++) {
        list.push({
          name: i,
        });
      }
      return list;
    },
    dataList() {
      const list = [];
      this.floorList.forEach(floor => {
        for(let key in floor) {
          if (key != 'houseFloor') {
            floor[key]['houseFloor'] = floor['houseFloor'];
            list.push(floor[key]);
          }
        }
      })
      return list;
    },
    publicArea() {
      return parseInt(this.building.buildArea) - this.roomTotalArea;
    },
  },
}
</script>

<style scoped>
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
  width: 210px;
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
</style>
