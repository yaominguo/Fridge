<template>
  <Card dis-hover>
    <Form ref="dataForm" :label-width="90" :rules="rules" :model="newData">
      <h4>基本信息</h4>
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
        <Col :span="6">
          <FormItem label="所在楼层" >
            <Input v-model="houseFloor" disabled placeholder="所在楼层" />
          </FormItem>
        </Col>
      </Row>
      <Divider style="margin: 0 0 16px;"/>
      <h4>分户信息</h4>
      <Row>
        <Col :span="6">
          <FormItem label="室号" prop="roomNo">
            <Input :disabled="isOperating" v-model="newData.roomNo" placeholder="请输入室号" />
          </FormItem>
        </Col>
        <!-- <Col :span="6">
          <FormItem label="建筑面积" prop="buildArea">
            <Input v-model="newData.buildArea" placeholder="请输入建筑面积" />
          </FormItem>
        </Col> -->
        <Col :span="6">
          <FormItem :label-width="120" label="预测(建筑)面积" prop="predictedArea">
            <Input :disabled="isOperating  || newData.leaseType =='0'" v-model="newData.predictedArea" placeholder="请输入预测面积" />
          </FormItem>
        </Col>
        <!-- 如果房间是合租的，则不能修改面积及房型  leaseType: 0-合租  1-整租 -->
        <Col :span="6">
          <FormItem label="套内面积" prop="realArea">
            <Input :disabled="isOperating || newData.leaseType =='0'" v-model="newData.realArea" placeholder="请输入套内面积" />
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="房型" prop="apartmentType">
            <Input v-if="isOperating" :disabled="isOperating" :value="newData.apartmentTypeName" />
            <Select v-else :disabled="newData.leaseType =='0'" v-model="newData.apartmentType" clearable>
              <Option v-for="item in options.style" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="取得方式" prop="acquisitionMethodId">
            <Select :disabled="$com.confirm(building,'ownedWhole') == '1' || isRenting" v-model="newData.acquisitionMethodId" clearable>
              <Option v-for="item in options.method" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="出资人" prop="spnonsorId">
            <Select :disabled="$com.confirm(building,'ownedWhole') == '1' || isRenting" v-model="newData.spnonsorId" clearable>
              <Option v-for="item in options.investor" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="资产用途" prop="assetUseId">
            <Select :disabled="isRenting" v-model="newData.assetUseId" clearable>
              <Option v-for="item in options.assetUse" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="资产类型" prop="useAndClass">
            <Cascader :disabled="isRenting" :data="options.useAndClass" v-model="newData.useAndClass"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :span="6">
          <FormItem label="是否盈利" prop="haveIncome">
            <Select :disabled="isRenting" v-model="newData.haveIncome" clearable>
              <Option value="1">是</Option>
              <Option value="0">否</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Divider style="margin: 0 0 16px;"/>
      <h4>产证信息</h4>
      <Row>
        <Col :span="6">
          <FormItem label="产证人">
            <Input v-model="newData.userName" placeholder="请输入产证人" />
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="产证编号">
            <Input v-model="newData.rightNo" placeholder="请输入产证编号" />
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="产证类型">
            <Select v-model="newData.rightType" placeholder="请选择产证类型">
              <Option value="房产证">房产证</Option>
              <Option value="动迁证明">动迁证明</Option>
              <Option value="小产证公证书">小产证公证书</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="颁证日期">
            <DatePicker v-model="newData.rightTime" />
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="产证面积" prop="rightArea">
            <Input v-model="newData.rightArea" placeholder="请输入产证面积" />
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="产证套内面积" prop="rightInsideArea">
            <Input v-model="newData.rightInsideArea" placeholder="请输入产证套内面积" />
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div class="btn-box">
      <Button @click="handleSave" type="primary">保存</Button>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'AddNewAsset',
  data() {
    const checkNumber = (rule, value, callback) => {
      if (rule.required == true && !value) {
        callback(new Error('请输入面积'));
      } else if (value && value != 0 &&!this.$com.checkNumber(value)) {
        callback(new Error('请输入数字格式的面积'));
      } else {
        callback();
      }
    };
    return {
      houseFloor: '',
      options: {
        community: [],
        investor: [],
        method: [],
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
      newData: {},
      rules: {
        roomNo: {
          required: true,
          message: '请输入室号',
        },
        spnonsorId: {
          required: true,
          message: '请选择出资人',
        },
        acquisitionMethodId: {
          required: true,
          message: '请选择取得方式',
        },
        // apartmentType: {
        //   required: true,
        //   message: '请选择房型',
        // },
        // userMethod: {
        //   required: true,
        //   message: '请选择使用方式',
        // },
        useAndClass: {
          required: true,
          message: '请选择资产类型',
        },
        assetUseId: {
          required: true,
          message: '请选择资产用途',
        },
        haveIncome: {
          required: true,
          message: '请选择是否盈利',
        },
        // buildArea: {
        //   required: true,
        //   validator: checkNumber,
        // },
        predictedArea: {
          required: true,
          validator: checkNumber,
        },
        realArea: {
          required: true,
          validator: checkNumber,
        },
        rightArea: {
          validator: checkNumber,
        },
        rightInsideArea: {
          validator: checkNumber,
        },
      },
      isEdit: false,
      building: {},
    }
  },
  created() {
    this.building = JSON.parse(localStorage.getItem('buildingInfo')) || {};
    let { floor, isEdit } = this.$route.params;
    this.$ajax.all(...this.getOptions(), this.getTypes()).then(() => {
      const {id} = this.$route.query;
      if (id) {
        this.getInfo(id);
      }
      // if (building) {
      //   const obj = {
      //     spnonsorId: building.spnonsorId,
      //     acquisitionMethodId: building.acquisitionMethodId,
      //     assetUseId: building.assetUseId,
      //     haveIncome: building.haveIncome,
      //     useAndClass: this.curUseAndClass,
      //   };
      //   data = Object.assign(data || {}, obj);
      //   this.building = building;
      // }
      this.houseFloor = floor || '';
      // this.newData = data || {};
      this.isEdit = isEdit;
    })
  },
  methods: {
    getInfo(id) {
      this.$ajax.get(
        this,
        this.$api.ASSET_HOUSE + id,
        null,
        res => {
          this.newData = this.$com.confirm(res, 'data.content.value', {});
          this.options.useAndClass.forEach(parent => {
            parent.children.forEach(child => {
              if (this.newData.useAndClassId == child.value) {
                this.newData.useAndClass = [parent.value, child.value];
              }
            })
          })
        }
      )
    },
    getOptions() {
      const { ASSET_COMMUNITY, ASSET_INVESTOR, ASSET_METHOD, ASSET_STYLE } = this.$api;
      const list = [
        {url: ASSET_COMMUNITY, name: 'community'},
        {url: ASSET_INVESTOR, name: 'investor'},
        {url: ASSET_METHOD, name: 'method'},
        {url: ASSET_STYLE, name: 'style'},
      ];
      return list.map(item =>
        this.$ajax.get(
          this,
          item.url,
          {},
          (res) => {
            this.options[item.name] = this.$com.confirm(res, 'data.content', []);
          },
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
    handleSave() {
      this.$refs.dataForm.validate(valid => {
        if (!valid) return;
        this.newData.houseFloor = this.houseFloor;
        if (!this.newData.rightTime) {
          this.newData.rightTime = null;
        }
        const {spnonsorId, acquisitionMethodId, apartmentType, assetUseId, useAndClass} = this.newData,
              {investor, method, style, assetUse} = this.options;
        const _useAndClassId = useAndClass && useAndClass[1];
        let _useAndClassName = null;
        this.options.useAndClass.forEach(parent => {
          parent.children.forEach(child => {
            if (_useAndClassId == child.value) {
              _useAndClassName = child.label;
            }
          })
        })
        const styleList = style.filter(e => e.id == apartmentType);
        const obj = {
          spnonsorName: (investor && investor.length>0 && (investor.filter(e => e.id == spnonsorId))[0].name) || null,
          acquisitionMethodName: (method && method.length>0 && (method.filter(e => e.id == acquisitionMethodId))[0].name) || null,
          apartmentTypeName: ((style && style.length>0 && (styleList.length > 0 ? styleList[0].name : false)) || this.newData.apartmentTypeName ) || null,
          assetUseName: (assetUse && assetUse.length>0 && (assetUse.filter(e => e.id == assetUseId))[0].name) || null,
          useAndClassId: _useAndClassId || null,
          useAndClassName: _useAndClassName || null,
        };
        this.newData = Object.assign(this.newData, obj);
        if (this.isEdit) {
          this.newData.createTime = null;
          this.$ajax.put(
            this,
            this.$api.ASSET_HOUSE + this.newData.id,
            this.newData,
            (res) => {
              this.$Message.success('修改成功');
              this.$router.back();
            },
          );
        } else {
          const params = {
            floorId: this.building.id,
            list: [this.newData],
          };
          this.$ajax.post(
            this,
            this.$api.ADD_ASSET_HOUSE,
            params,
            (res) => {
              this.$Message.success('新增成功');
              this.$router.back();
            },
          );
        }
      });
    },
  },
  computed: {
    isOperating() {
      if (this.building.isOperating && this.building.isOperating != '0') {
        return true;
      }
      return false;
    },
    isRenting() {
      if (this.newData.leaseStatus == '1') {
        return true;
      }
      return false;
    }
  },
}
</script>

<style scoped>
h4 {
  margin-bottom: 10px;
}
.btn-box {
  text-align: center;
}
.btn-box button {
  padding: 5px 30px;
}
</style>
