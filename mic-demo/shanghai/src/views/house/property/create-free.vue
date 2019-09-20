<template>
  <Card dis-hover>
    <Card dis-hover title="房源信息">
      <Form ref="basicForm" :label-width="100" :rules="rules" :model="basicInfo">
        <Row>
          <Col :span="8">
            <FormItem v-if="editId" label="房源" prop="house">
              <Input v-model="basicInfo.house" disabled/>
            </FormItem>
            <FormItem v-else label="房源" prop="house">
              <Select
                v-model="basicInfo.house"
                placeholder="小区/大楼"
                filterable
                clearable
                remote
                :remote-method="remoteMethod"
                :loading="loading">
                <Option v-for="house in houseList" :value="house.id + '#' + house.label" :key="house.id">{{house.label}}</Option>
              </Select>
            </FormItem>
          </Col>
          <!-- <Col :span="8">
            <FormItem label="房间号">
              <Select></Select>
            </FormItem>
          </Col> -->
        </Row>
      </Form>
    </Card>
    <Card dis-hover title="个人信息" style="marginTop: 10px;">
      <Form ref="personForm" :label-width="100" :rules="rules" :model="basicInfo">
        <Row>
          <Col :span="8">
            <FormItem label="业主姓名" prop="name">
              <Input v-model="basicInfo.name" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="业主电话" prop="phone">
              <Input v-model="basicInfo.phone" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="8">
            <FormItem label="身份证号码" prop="certNo">
              <Input v-model="basicInfo.certNo" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="身份证有效期">
              <DatePicker v-model="basicInfo.period" transfer type="daterange" split-panels />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="16">
            <FormItem label="证件照片">
              <ImgUploader
                :defaultList="imgList"
                @on-complete="uploadComplete"
                @on-remove="removeImg"
                :url="$api.IMG_UPLOAD_URL"
                :maxUploads="3"
                uploadButton="certNoBtn"
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="8">
            <FormItem label="紧急联系人姓名">
              <Input v-model="basicInfo.emgcPes "/>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="紧急联系人电话" prop="emgcPesPhone">
              <Input v-model="basicInfo.emgcPesPhone" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="8">
            <FormItem label="支付方式">
              <Select v-model="basicInfo.payMethod">
                <Option value="支付宝">支付宝</Option>
                <Option value="现金">现金</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="支付账号">
              <Input v-model="basicInfo.payAccount" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="收款人姓名">
              <Input v-model="basicInfo.payAccountName" />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Card dis-hover title="产权方信息" style="marginTop: 10px;">
      <Form ref="rightForm" :label-width="100" :rules="rules" :model="rightInfo">
        <Row>
          <Col :span="8">
            <FormItem label="产证人">
              <Input v-model="rightInfo.accountName" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="联系方式" prop="phone">
              <Input v-model="rightInfo.phone" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="8">
            <FormItem label="身份证号码" prop="idCardNo">
              <Input v-model="rightInfo.idCardNo" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="身份证有效期">
              <DatePicker v-model="rightInfo.period" transfer type="daterange" split-panels />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="8">
            <FormItem label="产证编号">
              <Input v-model="rightInfo.cardNo" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="产证面积" prop="rightArea">
              <Input v-model="rightInfo.rightArea"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="16">
            <FormItem label="产证附件">
              <ImgUploader
                :defaultList="propertyImgList"
                @on-complete="completeProperty"
                @on-remove="removeProperty"
                :url="$api.IMG_UPLOAD_URL"
                :maxUploads="3"
                uploadButton="propertyBtn"
              />
            </FormItem>
          </Col>
        </Row>
        <Row style="textAlign: center">
          <Button @click="handleSubmit" type="primary">提交</Button>
        </Row>
      </Form>
    </Card>
  </Card>
</template>

<script>
import ImgUploader from '@/components/Helper/Form/image-upload';
import moment from 'moment';

export default {
  name: 'CreateFreeProperty',
  components: {
    ImgUploader,
  },
  data() {
    const checkPhone = (rule, value, callback) => {
      if (value && !this.$com.checkPhone(value)) {
        callback(new Error('手机号码有误'));
      } else {
        callback();
      }
    };
    const checkCert = (rule, value, callback) => {
      if (value && !this.$com.checkID(value)) {
        callback(new Error('证件号码有误'));
      } else {
        callback();
      }
    };
    const checkNumber = (rule, value, callback) => {
      if (value && value != 0 && !this.$com.checkNumber(value)) {
        callback(new Error('请输入数字格式的面积'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      basicInfo: {},
      rightInfo: {},
      imgList: [],
      editId: '',
      propertyImgList: [],
      houseList: [],
      rules: {
        house: [
          {
          required: true,
          message: '请选择房源',
          },
        ],
        name: [
          {
          required: true,
          message: '请输入姓名',
          },
        ],
        phone: [
          {
            validator: checkPhone,
          }
        ],
        emgcPesPhone: [
          {
            validator: checkPhone,
          }
        ],
        certNo: [
          {
            validator: checkCert,
          }
        ],
        idCardNo: [
          {
            validator: checkCert,
          }
        ],
        rightArea: [
          {
            validator: checkNumber,
          }
        ],
      },
    };
  },
  mounted() {
    const id = this.$route.params.id;
    if (id) {
      this.editId = id;
      this.getDetail(id);
    }
  },
  methods: {
    getDetail(id) {
      this.$ajax.get(
        this,
        this.$api.GET_PROPERTY_DETAIL + id,
        null,
        (res) => {
          const data = res.data.content;
          this.basicInfo = Object.assign(data.tenant, {
            house: data.propertyRight.houseName,
            houseName: data.propertyRight.houseName,
            houseId: data.propertyRight.houseId,
            period: data.tenant.certPeriod && data.tenant.certPeriod.split('~'),
          });
          this.imgList = data.certPic;
          this.rightInfo = Object.assign(data.propertyRight, {
            period: data.propertyRight.certPeriod && data.propertyRight.certPeriod.split('~'),
          });
          this.propertyImgList = data.propertyPic;
        }
      )
    },
    remoteMethod(query) {
      if(!query) {
        this.houseList = [];
        return;
      }
      this.loading = true;
      this.$ajax.get(
        this,
        this.$api.GET_PROPERTY_HOUSE,
        { name: query, leaseStatus: 1, },
        (res) => {
          this.loading = false;
          const data = res.data.content;
          if(data && data.length > 0) {
            this.houseList = data.map(item => {
              return {
                id: item.houseId,
                label: item.showName,
              };
            });
          }
        },
        true,
      );
    },
    uploadComplete(response,filename){
      response = response.data.content;
      this.imgList.push({
        picId:response.id,
        name:response.name,
        picPath:response.path,
        type: '1',
      })
    },
    removeImg(item){
      const index = this.imgList.findIndex(ele => ele.id == item.id);
      this.imgList.splice(index, 1);
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
      const index = this.propertyImgList.findIndex(ele => ele.id == item.id);
      this.propertyImgList.splice(index, 1);
    },
    handleSubmit() {
      this.$refs.basicForm.validate(valid => {
        if(!valid) return;
        this.$refs.personForm.validate(valid => {
          if(!valid) return;
          if (this.editId) {
            this.editData();
          } else {
            this.addNewData();
          }
        })
      })
    },
    addNewData() {
      const { house } = this.basicInfo;
      this.basicInfo = Object.assign(this.basicInfo, {houseName: house.split('#')[1], houseId: house.split('#')[0]});
      const rightInfo = Object.assign(this.rightInfo, {houseId: this.basicInfo.houseId, houseName: this.basicInfo.houseName,});
      const params = {
        tenant: this.basicInfo,
        houseId: this.basicInfo.houseId,
        houseName: this.basicInfo.houseName,
        propertyRight: rightInfo,
        certPic: this.imgList,
        propertyPic: this.propertyImgList,
      };
      this.$ajax.post(
        this,
        this.$api.POST_FREE_PROPERTY,
        params,
        (res) => {
          this.$Message.success('新增成功');
          this.$router.back();
        }
      )
    },
    editData() {
      this.basicInfo = Object.assign(this.basicInfo, {
        createTime: null,
        certPeriod: this.basicInfo.period && this.basicInfo.period.length > 0 && `${moment(this.basicInfo.period[0]).format('YYYY-MM-DD')}~${moment(this.basicInfo.period[1]).format('YYYY-MM-DD')}`,
      })
      this.rightInfo = Object.assign(this.rightInfo, {
        createTime: null,
        certPeriod: this.rightInfo.period && this.rightInfo.period.length > 0 && `${moment(this.rightInfo.period[0]).format('YYYY-MM-DD')}~${moment(this.rightInfo.period[1]).format('YYYY-MM-DD')}`,
      })
      if (this.imgList && this.imgList.length > 0) {
        this.imgList.forEach(item => item.createTime = null);
      }
      if (this.propertyImgList && this.propertyImgList.length > 0) {
        this.propertyImgList.forEach(item => item.createTime = null);
      }
      const params = {
        tenant: this.basicInfo,
        houseId: this.basicInfo.houseId,
        houseName: this.basicInfo.houseName,
        propertyRight: this.rightInfo,
        certPic: this.imgList,
        propertyPic: this.propertyImgList,
      };
      this.$ajax.put(
        this,
        this.$api.PUT_PROPERTY_DETAIL + this.editId,
        params,
        (res) => {
          this.$Message.success('修改成功');
          this.$router.back();
        }
      )
    }
  },
}
</script>
