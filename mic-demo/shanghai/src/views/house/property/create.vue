<template>
  <Card dis-hover>
    <Steps class="steper" :current="currentStep">
      <Step title="步骤1" content="填写基础信息" />
      <Step title="步骤2" content="填写租期信息" />
      <Step title="步骤3" content="上传合同附件" />
    </Steps>
    <Divider style="margin: 16px 0;" />
    <div v-show="currentStep == 0">
      <Card dis-hover title="房源信息">
        <Form ref="basicForm" :label-width="100" :rules="rules" :model="basicInfo">
          <Row>
            <Col :span="8">
              <FormItem label="房源" prop="house">
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
                <DatePicker v-model="basicInfo.certPeriod" transfer type="daterange" split-panels />
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
                <Input v-model="rightInfo.accountName"/>
              </FormItem>
            </Col>
            <Col :span="8">
              <FormItem label="联系方式" prop="phone">
                <Input v-model="rightInfo.phone"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :span="8">
              <FormItem label="身份证号码" prop="idCardNo">
                <Input v-model="rightInfo.idCardNo"/>
              </FormItem>
            </Col>
            <Col :span="8">
              <FormItem label="身份证有效期">
                <DatePicker v-model="rightInfo.certPeriod" transfer type="daterange" split-panels />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :span="8">
              <FormItem label="产证编号">
                <Input v-model="rightInfo.cardNo"/>
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
            <Button @click="goNext" type="primary">下一步</Button>
          </Row>
        </Form>
      </Card>
    </div>
    <div v-show="currentStep == 1">
      <Card dis-hover title="租期信息">
        <Form ref="leaseForm" :label-width="100" :rules="rules" :model="leaseInfo">
          <Row>
            <Col :span="8">
              <FormItem label="合同租约起止" prop="date">
                <DatePicker @on-change="changePlan" v-model="leaseInfo.date" type="daterange" />
              </FormItem>
            </Col>
            <Col :span="8">
              <FormItem label="付款周期" prop="payNum">
                <Select @on-change="changePlan" v-model="leaseInfo.payNum">
                  <Option value="all">
                    一次性付清
                  </Option>
                  <Option v-for="item in 12" :key="item" :value="item">
                    {{'付' + item}}
                  </Option>
                </Select>
              </FormItem>
            </Col>
            <Col :span="8">
              <FormItem label="租金金额" prop="rent">
                <InputNumber @on-change="changePlan" v-model="leaseInfo.rent" :max="9999999" :min="0" style="width: 100%;"/>
              </FormItem>
            </Col>
          </Row>
          <FormItem label="其他费用">
            <Row v-for="(item,index) in feeList" :key="index" style="marginBottom: 10px;">
              <Col span="9" class="row">
                <Cascader v-model="item.name" :clearable="false" @on-change="feeTypeChange" :data="feeTypeList" trigger="hover" style="width: 190px;"/>
                <InputNumber v-model="item.count" :max="999999" :min="0" placeholder="请输入金额" style="width: 150px; marginLeft: 10px;"/>
              </Col>
              <Col span="3">
                <Button @click="deleteRow(index)" v-if="feeList.length >= 2" class="delete-row" shape="circle" icon="md-close"></Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button @click="addRow">增加其他费用</Button>
          </FormItem>
          <FormItem label="收租日期">
            <RadioGroup @on-change="changePlan" vertical style="fontWeight:normal" v-model="leaseInfo.rentType">
              <Radio label="0" style="margin-bottom:24px">
                <span>提前</span>
                <FormItem style="display: inline-block;">
                  <InputNumber @on-change="changePlan" :disabled="leaseInfo.rentType != '0'" v-model="leaseInfo.beforeDay" :max="60" :min="0"/>
                </FormItem>
                <span>天收租</span>
              </Radio>
              <Radio label="1" style="margin-bottom:24px">
                <span>固定</span>
                <FormItem style="display: inline-block;">
                <InputNumber @on-change="changePlan" :disabled="leaseInfo.rentType != '1'" v-model="leaseInfo.fixedFirst" :max="30" :min="1" />
                </FormItem>
                <span>日收租 (每期的第一个月)</span>
              </Radio>
              <Radio label="2">
                <span>固定</span>
                <FormItem style="display: inline-block;">
                <InputNumber @on-change="changePlan" :disabled="leaseInfo.rentType != '2'" v-model="leaseInfo.fixedEarly" :max="30" :min="1" />
                </FormItem>
                <span>日收租 (每期提前一个月)</span>
              </Radio>
            </RadioGroup>
          </FormItem>
          <Row>
            <Col :span="8">
              <FormItem label="装修免租期起止">
                <DatePicker :disabled="!leaseInfo.date || !leaseInfo.date[0]" :options="endDateOptions" v-model="leaseInfo.freeRent" type="daterange" />
              </FormItem>
            </Col>
            <Col :span="8">
              <FormItem label="减免金额">
                <InputNumber :disabled="!leaseInfo.freeRent || !leaseInfo.freeRent[0]" v-model="leaseInfo.freeMoney" :max="9999999" :min="0" style="width: 100%;"/>
              </FormItem>
            </Col>
          </Row>
          <FormItem label="每期房租明细">
            <Table border :columns="columns" :data="leaseData"></Table>
          </FormItem>
          <Row style="textAlign: center">
            <Button @click="goPre" type="primary" ghost>上一步</Button>
            <Button @click="goNext" type="primary">下一步</Button>
          </Row>
        </Form>
      </Card>
    </div>
    <div v-show="currentStep == 2">
      <Card dis-hover title="合同信息">
        <Form :label-width="100">
          <Row>
            <Col :span="8">
              <FormItem label="合同编号">
                <Input v-model="contractInfo.leaseNo" />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :span="16">
              <FormItem label="合同备注">
                <Input v-model="contractInfo.contractRemark" type="textarea"/>
              </FormItem>
            </Col>
          </Row>
          <FormItem label="合同附件">
            <ImgUploader
              :defaultList="contractImgList"
              @on-complete="completeContract"
              @on-remove="removeContract"
              :url="$api.FILE_UPLOAD_POST"
              :maxUploads="3"
              uploadButton="contractBtn"
            />
          </FormItem>
          <Row style="textAlign: center">
            <Button @click="goPre" type="primary" ghost>上一步</Button>
            <Button @click="handleSubmit" type="primary" style="width: 68px;">提交</Button>
          </Row>
        </Form>
      </Card>
    </div>
  </Card>
</template>

<script>
import ImgUploader from '@/components/Helper/Form/image-upload';
import moment from 'moment';

export default {
  name: 'CreateOwnerProperty',
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
      currentStep: 0,
      imgList: [],
      contractImgList: [],
      propertyImgList: [],
      columns: [
        {
          title: '期数',
          key: 'index',
          width: 60,
          align: 'center',
          render: (h, params) => {
            return h('div', params.index + 1);
          }
        },
        {
          title: '账期',
          key: 'date',
          align: 'center',
          render: (h, params) => {
            const { start, end } = params.row;
            return h('div', `${start} 至 ${end}`);
          },
        },
        {
          title: '账单',
          key: 'account',
          align: 'center',
          render: (h, params) => {
            const { type, count } = params.row;
            return h('div', `${type}  ${this.$com.toMoney(count)}元`);
          },
        },
        {
          title: '应付款日',
          key: 'time',
          width: 150,
          align: 'center',
        },
      ],
      basicInfo: {},
      houseList: [],
      leaseInfo: {
        rentType: '0', // 收租方式 0-提前收租 1-每期的第一个月 2-每期提前一个月
        rent: 0,
        beforeDay:1,
        fixedFirst:1,
        fixedEarly:1,
        freeMoney: 0,
      },
      feeTypeList: [],
      feeList: [{
        name: [],
        count: null,
        feeType:'', //one period
      }],
      leaseData: [],
      contractInfo: {},
      rightInfo: {},
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
        date: [
          {
          required: true,
          message: '请选择租约起止时间',
          },
        ],
        payNum: [
          {
          required: true,
          message: '请选择付款周期',
          },
        ],
        rent: [
          {
          required: true,
          message: '请输入租金金额',
          },
        ],
      },
      endDateOptions: {
        // 合同前装修免租期只能选租约开始日期之前
        disabledDate: date => {
          const validDate = this.leaseInfo.date && this.leaseInfo.date[0];
          return date && date.valueOf() > validDate && validDate.valueOf();
        }
      },
    };
  },
  mounted() {
    this.getFeeTypeList();
  },
  methods: {
    remoteMethod(query) {
      if(!query) {
        this.houseList = [];
        return;
      }
      this.loading = true;
      this.$ajax.get(
        this,
        this.$api.GET_PROPERTY_HOUSE,
        { name: query, leaseStatus: 0, },
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
    goNext() {
      if(this.currentStep == 0) {
        this.$refs.basicForm.validate(valid => {
          if(!valid) return;
          this.$refs.personForm.validate(valid => {
            if(!valid) return;
            this.currentStep += 1;
          })
        })
      } else if (this.currentStep == 1) {
        this.$refs.leaseForm.validate(valid => {
          if(!valid) return;
          this.currentStep += 1;
        })
      };
      const { house, houseName, houseId } = this.basicInfo;
      if(house && !houseName && !houseId) {
        this.basicInfo = Object.assign(this.basicInfo, {houseName: house.split('#')[1], houseId: house.split('#')[0]});
      }
      const { freeRent, freeRentStart, freeRentEnd } = this.leaseInfo;
      if(freeRent && !freeRentStart && !freeRentEnd) {
        this.leaseInfo = Object.assign(this.leaseInfo, {freeRentStart: freeRent[0], freeRentEnd: freeRent[1]});
      }
    },
    goPre() {
      this.currentStep -= 1;
    },
    getFeeTypeList() {
       this.$ajax.get(
        this,
        this.$api.GET_FEE_ALL,
        {},
        (res) => {
          const data = res.data.content;
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
          this.feeTypeList = list;
        },
        true,
      );
    },
    feeTypeChange(value){
      //已选择项禁用
      this.feeTypeList.forEach(child =>{
        if(value[0] == child.value){
          child.children.forEach(item =>{
            if(item.value == value[1]){
              item.disabled = true;
            };
          })
        }
      })
    },
    addRow() {
      const lastItem = this.feeList[this.feeList.length - 1];
      if (!lastItem.name[1] || !lastItem.count) {
        this.$Message.error("请选择费用类型并输入金额！");
        return;
      }
      this.feeList.push({
        name: [],
        count: null,
        feeType:'',
      });
    },
    changePlan() {
      const { rent, payNum, date, rentType, beforeDay, fixedFirst, fixedEarly } = this.leaseInfo;
      if(rent && payNum && date) {
        const startTime = moment(date[0]).format('YYYY-MM-DD'), endTime = moment(date[1]).format('YYYY-MM-DD');
        const diffMonths = moment(endTime).diff(moment(startTime), 'month');
        if (payNum == 'all' || payNum > diffMonths) { // 如果是一次性付清或所选周期大于月份期间
          const months = moment(endTime).diff(moment(startTime), 'month'),
                endMonth = moment(startTime).add(months, 'month'),
                diffDays = moment(endTime).diff(moment(endMonth), 'day') + 1;
          let payDay = startTime;
          if (rentType == '0' && beforeDay) {
            payDay = moment(payDay).subtract(Number(beforeDay), 'days').format('YYYY-MM-DD');
          } else if (rentType == '1' && fixedFirst) {
            payDay = moment(payDay).date(Number(fixedFirst)).format('YYYY-MM-DD');
          } else if (rentType == '2' && fixedEarly) {
            payDay = moment(payDay).subtract(1, 'months').date(Number(fixedEarly)).format('YYYY-MM-DD');
          }
          this.leaseData = [];
          this.leaseData.push({
            start: startTime,
            end: endTime,
            type: '房屋租金',
            count: rent * diffMonths + (rent / 30) * diffDays,
            time: payDay,
          });
          return;
        }
        const total = Math.ceil((moment(endTime).diff(moment(startTime), 'month') + 1) / payNum);
        const result = [];
        for(let i=0; i < total; i++) {
          let start, end;
          if (i === 0) {
            start = moment(startTime).format('YYYY-MM-DD');
            end = moment(start).subtract(1, 'days').add(Number(payNum), 'months').format('YYYY-MM-DD');
          } else {
            start = moment(result[i-1].end).add(1, 'days').format('YYYY-MM-DD');
            end = moment(start).add(Number(payNum),'months').subtract(1,'days').format('YYYY-MM-DD') ;
          }
          let payDay = start;
          if (rentType == '0' && beforeDay) {
            payDay = moment(payDay).subtract(Number(beforeDay), 'days').format('YYYY-MM-DD');
          } else if (rentType == '1' && fixedFirst) {
            payDay = moment(payDay).date(Number(fixedFirst)).format('YYYY-MM-DD');
          } else if (rentType == '2' && fixedEarly) {
            payDay = moment(payDay).subtract(1, 'months').date(Number(fixedEarly)).format('YYYY-MM-DD');
          }
          //最后一期
          if(moment(end) > moment(endTime)){
            end = moment(endTime).format('YYYY-MM-DD');
            const diffDays = moment(end).diff(moment(start), 'day') + 1;
            result.push({
              start,
              end,
              type: '房屋租金',
              count: (rent / 30) * diffDays,
              time: payDay || '',
            });
          } else {
            result.push({
              start,
              end,
              type: '房屋租金',
              count: rent * payNum,
              time: payDay || '',
            });
          }
        };
        this.leaseData = result;
      }
    },
    deleteRow(index) {
      //取消禁用
      if(this.feeList[index].name.length == 2 ){
        const selectValue = this.feeList[index].name[2];
        this.feeTypeList.forEach(child =>{
          child.children.forEach(item =>{
            if(item.value == selectValue){
              item.disabled = false;
            }
          })
        })
      }
      this.feeList.splice(index, 1);
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
    completeContract(response,filename){
      response = response.data.content;
      this.contractImgList.push({
        picId:response.id,
        name:response.name,
        picPath:response.path,
        type: 'cont',
      })
    },
    removeContract(item){
      const index = this.contractImgList.findIndex(ele => ele.id == item.id);
      this.contractImgList.splice(index, 1);
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
      let rentDay;
      switch (this.leaseInfo.rentType) {
        case '0':
          rentDay = this.leaseInfo.beforeDay;
          break;
        case '1':
          rentDay = this.leaseInfo.fixedFirst;
          break;
        case '2':
          rentDay = this.leaseInfo.fixedEarly;
          break;
        default:
          rentDay = '';
          break;
      };
      // 给feeList添加feeName、feeType
      this.feeList.forEach((item, index) => {
        this.feeTypeList.forEach(type => {
          if(item.name[0] == type.value) {
            type.children.forEach(child => {
              if (child.value == item.name[1]) {
                item.feeName = child.label;
                item.feeType = type.value == '周期费用' ? 'period' : 'one';
              }
            })
          }
        })
      })
      const onceFeeList = this.feeList.filter(item => item.feeType == 'one');
      const periodFeeList = this.feeList.filter(item => item.feeType == 'period');
      const result = [];
      const transformData = (sign, fee, data, index) => {
        result.push({
          acctSign: sign,
          acctName: fee.feeName,
          receivable: fee.count,
          number: index + 1,
          receivableTime: data.time,
          status: '0',
          startTime: data.start,
          endTime: data.end,
        });
      }
      this.leaseData.forEach((item, index) => {
        item.feeName = item.type;
        if (index == 0 && onceFeeList && onceFeeList.length > 0) {
          onceFeeList.forEach(one => {
            transformData('other', one, item, index);
          });
        }
        if (periodFeeList && periodFeeList.length > 0) {
          periodFeeList.forEach(period => {
            transformData('other', period, item, index);
          });
        }
        transformData('rent', item, item, index);
      });
      this.basicInfo.certPeriod = this.transformPeriod(this.basicInfo.certPeriod);
      this.rightInfo.certPeriod = this.transformPeriod(this.rightInfo.certPeriod);
      const { date, payNum, rent, rentType, freeMoney, freeRentStart, freeRentEnd } = this.leaseInfo;
      const rightInfo = Object.assign(this.rightInfo, {houseId: this.basicInfo.houseId, houseName: this.basicInfo.houseName,});
      const params = {
        startTime: date[0],
        endTime: date[1],
        payNum,
        rent,
        rentType,
        rentDay,
        feeList: JSON.stringify(this.feeList),
        leaseAccountingDetails: result,
        tenant: this.basicInfo,
        houseId: this.basicInfo.houseId,
        houseName: this.basicInfo.houseName,
        freeMoney,
        freeRentStart,
        freeRentEnd,
        propertyRight: rightInfo,
        leaseType: 1,
        certPic: this.imgList,
        propertyPic: this.propertyImgList,
        contractPic: this.contractImgList,
      };
      this.$ajax.post(
        this,
        this.$api.POST_OWNER_PROPERTY,
        params,
        (res) => {
          this.$Message.success('新增成功');
          this.$router.back();
        }
      )
    },
    transformPeriod(date) {
      if (!date || date.length <= 0) return null;
      return moment(date[0]).format('YYYY-MM-DD') + '~' + moment(date[1]).format('YYYY-MM-DD');
    },
  },
  watch: {
    'leaseInfo.date': {
      handler(cur, past) {
        if (past != cur) {
          this.leaseInfo.freeRent = [];
        }
      }
    }
  }
}
</script>

<style scoped>
.steper {
  width: 80%;
  margin: 0 auto;
}
.row {
  display: flex;
  align-items: center;
}
</style>

