<template>
<Card dis-hover :bordered="!isModal">
  <!-- 楼栋号及单元号的变更不影响现有分户的资产编号 -->
  <Card dis-hover title="地址信息">
    <p slot="title" style="display: flex; alignItems: center;">
      <span>地址信息</span>
      <span class="msg">
        (<Icon :size="16" type="ios-alert-outline" color="red"/>楼栋号及单元号的变更不影响现有分户的资产编号)
      </span>
    </p>
    <Form ref="addressForm" :rules="rules" :model="newData" :label-width="130">
      <Row>
        <Col :span="6">
          <FormItem label="所属项目" prop="project">
            <Select :disabled="project || isOperating" v-model="newData.project" @on-change="getCommunityList" clearable>
              <Option v-for="item in options.project" :value="item.id + '#' + item.name" :key="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="小区/公寓" prop="community">
            <Select :disabled="community || isOperating" @on-change="getAddress" v-model="newData.community" clearable>
              <Option v-for="item in options.community" :value="item.id + '#' + item.name" :key="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="6" :offset="1">
          <Button @click="toAddCommunity" type="primary" ghost>添加小区/公寓</Button>
        </Col>
      </Row>
      <Row>
        <Col :span="6">
          <FormItem label="楼栋号" prop="houseNo">
            <Input :disabled="isOperating" v-model="newData.houseNo"/>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="单元/梯位号">
            <Input :disabled="isOperating" v-model="newData.houseUnit"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :span="12">
          <FormItem label="完整地址">
            <Input disabled :value="address"/>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Card>
  <Card dis-hover title="楼栋信息" style="marginTop: 10px;">
    <Form ref="buildingForm" :rules="rules" :model="newData" :label-width="130">
      <Row>
        <Col :span="6">
          <FormItem label="总楼层" prop="floorCount">
            <InputNumber :disabled="isOperating" v-model="newData.floorCount" style="width: 100%" :min="1"/>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="房屋结构" prop="housing">
            <Select :disabled="isOperating" v-model="newData.housing" clearable>
              <Option v-for="item in options.housingStructure" v-if="item.status === '1'" :value="item.id + '#' + item.name" :key="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <!-- <Col :span="6">
          <FormItem label="公摊面积(㎡)">
            <InputNumber v-model="newData.averageArea" style="width: 100%" :min="1"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :span="6">
          <FormItem label="预测面积(㎡)" prop="predictedArea">
            <InputNumber v-model="newData.predictedArea" style="width: 100%" :min="1"/>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="建筑面积(㎡)" prop="buildArea">
            <InputNumber v-model="newData.buildArea" style="width: 100%" :min="1"/>
          </FormItem>
        </Col> -->
      </Row>
    </Form>
  </Card>
  <Card dis-hover title="分类及用途" style="marginTop: 10px;">
    <Form ref="classForm" :rules="rules" :model="newData" :label-width="130">
      <Row>
        <Col :span="6">
          <FormItem label="资产类型" prop="useAndClass">
            <Cascader :disabled="isOperating" :data="options.useAndClass" v-model="newData.useAndClass"/>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="资产用途" prop="assetUse">
            <Select :disabled="isOperating" v-model="newData.assetUse" clearable>
              <Option v-for="item in options.assetUse" :value="item.id + '#' + item.name" :key="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="是否盈利" prop="haveIncome">
            <Select :disabled="isOperating" v-model="newData.haveIncome" clearable>
              <Option value="1">是</Option>
              <Option value="0">否</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :span="6">
          <FormItem label="出资人" prop="spnonsor">
            <Select :disabled="isOperating" v-model="newData.spnonsor" clearable>
              <Option v-for="item in options.spnonsor" :value="item.id + '#' + item.name" :key="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="取得方式" prop="acquisitionMethod">
            <Select :disabled="isOperating" v-model="newData.acquisitionMethod" clearable>
              <Option v-for="item in options.acquisitionMethod" :value="item.id + '#' + item.name" :key="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="持有方式" prop="ownedWhole">
            <Select :disabled="isOperating || disableOwned" v-model="newData.ownedWhole" clearable>
              <Option value="1">整栋</Option>
              <Option value="0">分散</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Card>
  <Card dis-hover title="无产证信息" style="marginTop: 10px;">
    <Form ref="noRightForm" :rules="rules" :model="newData" :label-width="130">
      <Row>
        <Col :span="6">
          <FormItem label="预测(建筑)面积(㎡)" prop="predictedArea">
            <InputNumber v-model="newData.predictedArea" style="width: 100%" :min="1"/>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="实测面积(㎡)">
            <InputNumber :disabled="disableInput.buildArea" v-model="newData.buildArea" style="width: 100%" :min="1"/>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="套内面积(㎡)">
            <InputNumber :disabled="disableInput.insideArea" v-model="newData.insideArea" style="width: 100%" :min="1"/>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="公摊面积(㎡)">
            <InputNumber :disabled="disableInput.averageArea" v-model="newData.averageArea" style="width: 100%" :min="1"/>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Card>
  <Card dis-hover title="产证信息" style="marginTop: 10px;">
    <Form ref="rightForm" :rules="rules" :model="newData" :label-width="130">
      <Row>
        <Col :span="6">
          <FormItem label="产证人">
            <Input v-model="newData.userName"/>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="产证编号">
            <Input v-model="newData.rightNo"/>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="产证类型">
            <Select v-model="newData.rightType">
              <Option value="房产证">房产证</Option>
              <Option value="动迁证明">动迁证明</Option>
              <Option value="小产证公证书">小产证公证书</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="颁证日期">
            <DatePicker v-model="newData.rightTime"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :span="6">
          <FormItem label="产证面积(㎡)">
            <InputNumber v-model="newData.rightArea" style="width: 100%" :min="1"/>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="产证实用面积(㎡)">
            <InputNumber v-model="newData.rightRealArea" style="width: 100%" :min="1"/>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="产证公摊面积(㎡)">
            <InputNumber v-model="newData.rightAverageArea" style="width: 100%" :min="1"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :span="12">
          <FormItem label="产证图片">
            <ImgUploader
              :defaultList="propertyImgList"
              @on-complete="completeProperty"
              @on-remove="removeProperty"
              @showUploadImg="getReturn"
              :isPhone="true"
              :url="$api.IMG_UPLOAD_URL"
              :maxUploads="5"
              :code="code"
              uploadButton="propertyBtn"
            />
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Card>
  <div class="btn-box">
    <Button v-if="isPassed" @click="handleSubmit" type="primary">保存并提交修改审批</Button>
    <Button v-else @click="handleSubmit" type="primary">保存</Button>
  </div>
</Card>
</template>

<script>
import ImgUploader from '@/components/Helper/Form/image-upload';

export default {
  name: 'AssetBuildingInfo',
  components: {
    ImgUploader,
  },
  props: {
    isModal: { // 是否作为modal弹窗来使用
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      propertyImgList: [],
      options: {
        community: [],
        spnonsor: [],
        acquisitionMethod: [],
        housingStructure: [],
        useAndClass: [],
        project: [],
        assetUse: [
          {id: '0', name: '自用'},
          {id: '1', name: '出租'},
          {id: '2', name: '出售'},
        ],
      },
      address: '',
      newData: {
        floorCount: null,
        averageArea: null,
        buildArea: null,
        predictedArea: null,
        insideArea: null,
        rightArea: null,
        rightRealArea: null,
        rightAverageArea: null,
      },
      rules: {
        houseNo: {
          required: true,
          message: '请输入楼栋号',
        },
        project: {
          required: true,
          message: '请选择所属项目',
        },
        community: {
          required: true,
          message: '请选择小区/公寓',
        },
        useAndClass: {
          required: true,
          message: '请选择资产类型',
        },
        assetUse: {
          required: true,
          message: '请选择资产用途',
        },
        spnonsor: {
          required: true,
          message: '请选择出资人',
        },
        acquisitionMethod: {
          required: true,
          message: '请选择取得方式',
        },
        ownedWhole: {
          required: true,
          message: '请选择持有方式',
        },
        haveIncome: {
          required: true,
          message: '请选择是否盈利',
        },
        floorCount: {
          required: true,
          message: '请输入总楼层',
        },
        // insideArea: {
        //   required: true,
        //   message: '请输入套内面积',
        // },
        // buildArea: {
        //   required: true,
        //   message: '请输入建筑面积',
        // },
        predictedArea: {
          required: true,
          message: '请输入预测面积',
        },
      },
      community: false,
      project: false,
      disableOwned: false,
      disableInput: {
        buildArea: false,
        insideArea: false,
        averageArea: false,
      },
      code: '',
      useAndClassArray: [],
    }
  },
  mounted() {
    this.$ajax.all(
      ...this.getOptions(),
      this.getTypes()
    ).then(() => {
      this.init();
      this.getCode();
    });
  },
  methods: {
    getOptions() {
      const { ASSET_COMMUNITY, ASSET_INVESTOR, ASSET_METHOD, ASSET_STRUCTION, ASSET_CLASS, ASSET_PROJECT } = this.$api;
      const list = [
        {url: ASSET_COMMUNITY, name: 'community'},
        {url: ASSET_INVESTOR, name: 'spnonsor'},
        {url: ASSET_METHOD, name: 'acquisitionMethod'},
        {url: ASSET_STRUCTION, name: 'housingStructure'},
        // {url: ASSET_CLASS, name: 'useAndClass'},
        {url: ASSET_PROJECT, name: 'project'},
        // {url: GET_ASSETUSE, name: 'assetUse'},
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
          this.useAndClassArray = data || [];
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
      )
    },
    init() {
      const id = this.$com.confirm(this.$route, 'query.id');
      if (!id) {
        const key = this.$com.confirm(this.$route, 'query.key'),
          val = this.$com.confirm(this.$route, 'query.value');
        if (key && val) {
          const fn = (id, type) => {
            const index = this.options[type].findIndex(item => item.id == val);
            const value = this.options[type][index].id + '#' + this.options[type][index].name;
            this.$set(this.newData, type, value);
            this[type] = true;
            this.getAddress();
          }
          if (key == 'projectId') {
            fn('projectId', 'project');
            this.getCommunityList(val);
          } else if (key == 'communityId') {
            fn('communityId', 'community');
            this.newData.project = this.$com.confirm(this.$route, 'query.project');
            this.project = true;
          }
        }
        return;
      }
      this.$ajax.get(
        this,
        this.$api.ASSET_FLOOR + id,
        {id},
        (res) => {
          const data = this.$com.confirm(res, 'data.content.floor');
          this.propertyImgList = this.$com.confirm(res, 'data.content.resourcePics');
          data.community = data.communityId + '#' + data.communityName;
          data.spnonsor = data.spnonsorId + '#' + data.spnonsorName;
          data.acquisitionMethod = data.acquisitionMethodId + '#' + data.acquisitionMethodName;
          data.housing = (data.housingStructure && data.housingStructureName) ? (data.housingStructure + '#' + data.housingStructureName) : null;
          // data.useAndClass = data.useAndClassId + '#' + data.useAndClassName;
          this.options.useAndClass.forEach(parent => {
            parent.children.forEach(child => {
              if (data.useAndClassId == child.value) {
                data.useAndClass = [parent.value, child.value];
              }
            })
          })
          data.project = data.projectId + '#' + data.projectName;
          data.assetUse = data.assetUseId + '#' + data.assetUseName;
          data.floorCount = parseInt(data.floorCount) || null;
          data.averageArea = parseInt(data.averageArea) || null;
          data.predictedArea = parseInt(data.predictedArea) || null;
          data.buildArea = parseInt(data.buildArea) || null;
          data.insideArea = parseInt(data.insideArea) || null;
          data.rightArea = parseInt(data.rightArea) || null;
          data.rightRealArea = parseInt(data.rightRealArea) || null;
          data.rightAverageArea = parseInt(data.rightAverageArea) || null;
          data.houseUnit = (!data.houseUnit || data.houseUnit == '0') ? '' : data.houseUnit;
          this.project = true;
          this.community = true;
          this.newData = data;
          this.address = data.address;
        },
        true,
      )
    },
    getCode(){
      return this.$ajax.get(
        this,
        this.$api.GET_FILE_UPLOAD_CODE_GET + "?number=1",
        null,
        res => {
          let {code}=res.data.content;
          this.code=code.split(',')[0];
        },
        this.isModal, // 弹窗显示则初加载不显示loading
      );
    },
    handleSubmit() {
      this.$refs.addressForm.validate(valid => {
        if (!valid) {this.$Message.error('请检查表单信息!'); return};
        this.$refs.buildingForm.validate(valid => {
          if(!valid) {this.$Message.error('请检查表单信息!'); return};
          this.$refs.classForm.validate(valid => {
            if (!valid) {this.$Message.error('请检查表单信息!'); return};
            this.$refs.noRightForm.validate(valid => {
              if(!valid) {this.$Message.error('请检查表单信息!'); return};
              this.submitForm();
            })
          })
        })
      })
    },
    submitForm() {
      const {community, spnonsor, acquisitionMethod, housing, useAndClass, project, assetUse} = this.newData;
      const _community = community && community.split('#'),
        _spnonsor = spnonsor && spnonsor.split('#'),
        _method = acquisitionMethod && acquisitionMethod.split('#'),
        _housing = housing && housing.split('#'),
        _useAndClassId = useAndClass && useAndClass[1],
        _project = project && project.split('#'),
        _assetUse = assetUse && assetUse.split('#');

      let _useAndClassName = null;
      this.options.useAndClass.forEach(parent => {
        parent.children.forEach(child => {
          if (_useAndClassId == child.value) {
            _useAndClassName = child.label;
          }
        })
      })
      this.newData = Object.assign(this.newData, {
        communityId: _community[0] || null,
        communityName: _community[1] || null,
        spnonsorId: _spnonsor[0] || null,
        spnonsorName: _spnonsor[1] || null,
        acquisitionMethodId: _method[0] || null,
        acquisitionMethodName: _method[1] || null,
        housingStructure: (_housing && _housing[0] && _housing[0] != 'null') ? _housing[0] : null,
        housingStructureName: (_housing && _housing[1] && _housing[1] != 'null') ? _housing[1] : null,
        useAndClassId: _useAndClassId || null,
        useAndClassName: _useAndClassName || null,
        projectId: _project[0] || null,
        projectName: _project[1] || null,
        assetUseId: _assetUse[0] || null,
        assetUseName: _assetUse[1] || null,
        address: this.address,
        name: this.address,
      });

      if (this.propertyImgList.length>0) {
        this.propertyImgList.forEach((e,i) => this.$delete(this.propertyImgList[i], 'createTime'));
      }
      const params = {
        floor: this.newData,
        resourcePics: this.propertyImgList,
      };
      if (!this.newData.id) {
        this.newData.rightTime = null;
        this.$ajax.post(
          this,
          this.$api.EDIT_ASSET_FLOOR,
          params,
          (res) => {
            if (this.isModal) {
              this.$emit('complete');
              return;
            }
            this.$Message.success('新增成功');
            this.$router.back();
          },
          this.isModal, // 弹窗显示则初加载不显示loading
        );
      } else {
        this.newData.createTime = null;
        const submit = (status) => {
          this.$ajax.put(
            this,
            this.$api.PUT_EDIT_BUILDING.replace('{id}', this.newData.id).replace('{status}', status),
            // {list: [params]},
            params,
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
            title: '确认修改楼栋信息？',
            content: '<p>修改以后需由专人审批后方可生效。生效后，不可撤回。</p>',
            onOk: () => {submit('2')}
          })
        }
      }
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
      this.deleteForPhone(item.flag, this.code, item.picId);
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
    getReturn(){
      this.$ajax.get(
        this,
        this.$api.GET_FILE_UPLOAD_POST.replace("{code}", this.code),
        null,
        res => {
          if(res.data.content.length>0){
            const data = res.data.content;
            const result = data.map(e => {
              return {
                picId:e.id,
                picPath:e.path,
                return:'phone',
                flag:true,
                type: 'property',
              };
            });
            if (this.propertyImgList.length == 0) {
              this.propertyImgList = result;
            } else {
              result.forEach((d)=>{
                let flag=true;
                this.propertyImgList.forEach((e)=>{
                  if(d.picId == e.picId){
                    flag = false;
                  }
                })
                if(flag){
                  this.propertyImgList.push({
                    picId:d.picId,
                    picPath:d.picPath,
                    type:'property'
                  })
                }
              })
            }
          }
        }
      );
    },
    getAddress() {
      const val = this.newData.community;
      if (!val) {
        this.address = '';
        return;
      }
      const id = val.split('#')[0],
        index = this.options.community.findIndex(item => item.id == id),
        data = this.options.community[index].address || '';
      const fn = this.$com.confirm_currying(this);
      const houseNo = fn('newData.houseNo', ''), houseUnit = fn('newData.houseUnit', '');
      this.address = `${data}${houseNo || ''}${houseUnit || ''}`;
    },
    toAddCommunity() {
      this.$router.push({
        name: 'community-management',
      });
    },
    getCommunityList(val) {
      this.newData.community = null;
      if(!val) {
        this.options.community = [];
        return;
      }
      let id = val;
      if(val.indexOf('#')>=0) {
        id = val.split('#')[0];
      }
      this.$ajax.get(
        this,
        this.$api.GET_COMMUNITY_BY_PROJECT + id,
        null,
        (res) => {
          this.options.community = res.data.content;
        },
        true,
      )
    },
  },
  computed: {
    isOperating() {
      if (this.newData.isOperating && this.newData.isOperating != '0') {
        return true;
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
    'newData.useAndClass': {
      // 公租房/人才公寓/国有公房——必须为整栋
      handler(cur, past) {
        const id = cur[1], list = this.useAndClassArray.filter(item => item.id == id)
        let name = '';
        if (list.length > 0 ) {
          name = list[0].name;
        }
        if (name == '公租房' || name == '国有公房' || name == '人才公寓') {
          this.$set(this.newData, 'ownedWhole', '1');
          this.disableOwned = true;
        } else {
          this.disableOwned = false;
        }
      }
    },
    'newData.houseNo': {
      handler(cur, past) {
        if (past != cur) {
          this.getAddress();
        }
      }
    },
    'newData.houseUnit': {
      handler(cur, past) {
        if (past != cur) {
          this.getAddress();
        }
      }
    },
    'newData.rightArea': {
      handler(cur, past) {
        if (past != cur) {
          this.newData.buildArea = cur;
          this.disableInput.buildArea = true;
        }
        if (!cur) {
          this.disableInput.buildArea = false;
        }
      }
    },
    'newData.rightRealArea': {
      handler(cur, past) {
        if (past != cur) {
          this.newData.insideArea = cur;
          this.disableInput.insideArea = true;
        }
        if (!cur) {
          this.disableInput.insideArea = false;
        }
      }
    },
    'newData.rightAverageArea': {
      handler(cur, past) {
        if (past != cur) {
          this.newData.averageArea = cur;
          this.disableInput.averageArea = true;
        }
        if (!cur) {
          this.disableInput.averageArea = false;
        }
      }
    },
  }
}
</script>

<style scoped>
.btn-box {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}
.btn-box>button {
  min-width: 86px;
}
.msg {
  color: #666;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: normal;
  margin-left: 10px;
}
</style>
