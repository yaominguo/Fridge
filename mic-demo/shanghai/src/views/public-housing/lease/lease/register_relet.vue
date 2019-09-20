<template>
  <Card dis-hover>
    <h1 style="text-align: center;margin: 20px 0;">发起续租</h1>

    <Card dis-hover title="房源信息">
      <Form ref="houseForm" label-position="right" :model="formModel" :label-width="100" :rules="rules" @submit.native.prevent>
        <FormItem class="item-label" label="房源地址" prop="houseId">
          <Row >
            <Col>{{formModel.roomName}}</Col>
          </Row>
        </FormItem>
      </Form>
    </Card>
    <Card dis-hover>
      <p slot="title">
        <span>合同类型</span>
      </p>
      <div class="contract-wrapper">
        <!-- <div :class="contractType == 0 ? 'contract-box on': 'contract-box'" @click="changeContractType(0)">
          <Icon type="ios-checkmark" class="check-icon"/>
          <h3>新签电子合同</h3>
          <p>适用于空房新租客签约场景，使用CA电子合同，实名认证租客身份，公证机构颁发云证书，具备法律效力， 同时管理方便。租客若授权芝麻信用，按时在线交租有助积累信用，逾期违约将产生负面记录。</p>
        </div> -->
        <div :class="contractType == 1 ? 'contract-box on': 'contract-box'" @click="changeContractType(1)">
          <Icon type="ios-checkmark" class="check-icon"/>
          <h3>已签纸质合同</h3>
          <p>适用于已与租客签约过纸质合同场景，将合同信息补录到系统中，方便统一管理，支持在线收租。</p>
        </div>
      </div>
     <!--  <Form ref="contractForm" v-if="contractType == 0" :model="formModel" label-position="right" :label-width="100" :rules="rules">
        <FormItem class="item-label" label="合同模板" prop="templateId">
          <Row>
            <Col span="8">
              <Select v-model="formModel.templateId">
                <Option v-for="(option, index) in contractModelList" :value="option.templateNo" :key="index">{{option.templateName}}</Option>
              </Select>
            </Col>
            <Col span="6" style="textAlign: center">
              <Button type="primary" ghost icon="md-add">点击创建新电子合同模板</Button>
            </Col>
          </Row>
        </FormItem>
      </Form> -->
    </Card>
    <Card dis-hover title="承租人信息">
      <ActiveForm
        ref="personForm"
        :labelPosition="'right'"
        :labelWidth="100"
        :header="null"
        :rules="rules"
        :layout="tenantLayout"
        :model="tenantModel"
      />
        <Form  label-position="right" :label-width="100" >
          <Row>
            <Col span="8">
              <FormItem class="item-label" label="身份证正面">
                <ImgUploader
                  :url="$api.FILE_UPLOAD_POST"
                  :uploadButton="'btn1'"
                  :maxUploads="1"
                  :defaultList = "frontArray"
                  @on-complete="frontImageComplete"
                  @on-remove="frontImgeRemove"
                  :isPhone="true"
                  :code="codeList[0]"
                  @showUploadImg="startRunFun(codeList[0],'front')"
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem class="item-label" label="身份证反面">
                <ImgUploader
                  :url="$api.FILE_UPLOAD_POST"
                  :uploadButton="'btn2'"
                  :maxUploads="1"
                  :defaultList = "reverArray"
                  @on-complete="reversImageComplete"
                  @on-remove="reversImgeRemove"
                  :isPhone="true"
                  :code="codeList[1]"
                  @showUploadImg="startRunFun(codeList[1],'rever')"
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem class="item-label" label="手持半身">
                <ImgUploader
                  :url="$api.FILE_UPLOAD_POST"
                  :uploadButton="'btn3'"
                  :maxUploads="1"
                  :defaultList = "handArray"
                  @on-complete="this.handImageComplete"
                  @on-remove="this.handImgeRemove"
                  :isPhone="true"
                  :code="codeList[2]"
                  @showUploadImg="startRunFun(codeList[2],'hand')"
                />
              </FormItem>
            </Col>
          </Row>
        </Form>
    </Card>
    <Card dis-hover title="租约信息">
      <Form ref="leaseForm" label-position="right" :label-width="140" :model="leaseModel" :rules="rules">
        <Row>
          <Col span="8">
            <FormItem label="租约起止" class="item-label ivu-form-item-required">
              <Row>
                  <Col span="11">
                      <FormItem prop="startTime">
                          <DatePicker type="date" :options="startOptions" placeholder="开始日期" v-model="leaseModel.startTime" @on-change="canShowPlan"></DatePicker>
                      </FormItem>
                  </Col>
                  <Col span="2" style="text-align: center">至</Col>
                  <Col span="11">
                      <FormItem prop="endTime">
                          <DatePicker type="date" :options="endOptions" placeholder="截止日期" v-model="leaseModel.endTime" @on-change="canShowPlan"></DatePicker>
                      </FormItem>
                  </Col>
              </Row>
            </FormItem>

          </Col>
          <Col span="3">
            <FormItem class="item-label" label="付款方式"></FormItem>
          </Col>
          <Col span="3">
            <FormItem :label-width="50" class="item-label" label="付" prop="payNum">
              <Select style="width: 80px; fontWeight: normal;" v-model="leaseModel.payNum" @on-change="canShowPlan">
                <Option v-for="num in 12" :key="'ya'+num" :value="num">{{num}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="3">
            <FormItem :label-width="50" class="item-label" label="押" prop="mortgageNum">
              <Select style="width: 80px; fontWeight: normal;" v-model="leaseModel.mortgageNum" @on-change="changeLeaseCost('mortgageNum')">
                 <Option :value="0">自定义</Option>
                <Option v-for="num in 12" :key="'fu'+num" :value="num">{{num}}</Option>

              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem class="item-label ivu-form-item-required" label="房屋租金（元/月）" prop="rent">
              <Input placeholder="请输入金额（元/月）" v-model="leaseModel.rent" @on-change="changeLeaseCost" number />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem class="item-label" label="房屋押金（元）" prop="deposit">
              <Input placeholder="请输入金额（元）" v-model="leaseModel.deposit" :disabled="leaseModel.mortgageNum != 0" number />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem class="item-label" label="平方米月租金（元）">
              <Input disabled v-model="leaseModel.squareMeterMonthlyRent"/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem class="item-label" label="公共事业缴费" prop="landlordCharges">
              <RadioGroup   v-model="leaseModel.landlordCharges" @on-change="landlordChange">
                  <Radio :disabled="landLoadDisabled" label="1" >
                    房东
                  </Radio>
                  <Radio :disabled="landLoadDisabled" label="0">
                    租客
                  </Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <FormItem class="item-label" label="其他费用">
          <Row v-for="(item,index) in feeList" :key="index" style="marginBottom: 10px;">
            <Col span="5">
              <FormItem>
                <Cascader v-model="item.name" :clearable="false" @on-change="feeTypeChange" :data="feeTypeList" trigger="hover"/>
              </FormItem>
            </Col>
            <Col offset="1" span="3">
              <FormItem >
                <InputNumber  v-model="item.count" :min="0" @on-change="canShowPlan" type="text" placeholder="请输入金额" />
              </FormItem>
            </Col>
            <Col span="5">
              <FormItem>
                <Input v-model="item.ps" type="text" placeholder="请输入费用备注"  />
              </FormItem>
            </Col>
            <Col span="3">
              <Button v-if="feeList.length >= 1" @click="deleteRow(index)" class="delete-row" shape="circle" icon="md-close"></Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Button @click="addRow">增加其他费用</Button>
        </FormItem>
        <FormItem class="item-label" label="收租日期" prop="collectType">
          <RadioGroup vertical style="fontWeight:normal" v-model="leaseModel.collectType">
            <Radio label="1" style="margin-bottom:24px">
              <span>提前</span>
              <FormItem prop="beforeDay" style="display: inline-block;">
                <InputNumber :disabled="leaseModel.collectType != '1'" v-model="leaseModel.beforeDay" @on-change="canShowPlan" :max="99" :min="0"/>
              </FormItem>
              <span>天收租</span>
            </Radio>
            <Radio label="2" style="margin-bottom:24px">
              <span>固定</span>
              <FormItem prop="fixedFirst" style="display: inline-block;">
              <InputNumber :disabled="leaseModel.collectType != '2'" v-model="leaseModel.fixedFirst" @on-change="canShowPlan" :max="31" :min="1" />
              </FormItem>
              <span>日收租 (每期的第一个月)</span>
            </Radio>
            <Radio label="3">
              <span>固定</span>
              <FormItem prop="fixedEarly" style="display: inline-block;">
              <InputNumber :disabled="leaseModel.collectType != '3'" v-model="leaseModel.fixedEarly" @on-change="canShowPlan" :max="31" :min="1" />
              </FormItem>
              <span>日收租 (每期提前一个月)</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem class="item-label" label="账单计划">
          <Table border :columns="columns" :data="planList" style="fontWeight: normal;"></Table>
        </FormItem>
        <Row>
          <Col span="8">
            <FormItem class="item-label" label="开始收租日" prop="startCollectDate">
              <Select v-model="leaseModel.startCollectDate" :disabled="contractType == 0">
                <Option v-for="item in endPayDayList" :key="'start'+item" :value="item">
                  {{item}}
                </Option>
                <Option value="all-clear">
                  账单已结清
                </Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Collapse simple style="border:none;" v-model="currentPanel">
          <Panel name="more">
            <Button type="text">{{currentPanel[0] == 'more' ? '收起' : '展开'}}更多信息（{{contractType == 0 ? '家具清单、附加条款' : '原合同编号、备注'}}） </Button>
            <div slot="content">
              <div style="height: 20px;"></div>
              <Row v-if="contractType == 1">
                <Col span="8">
                  <FormItem class="item-label" label="原合同编号">
                    <Input v-model="leaseModel.originContractNo" placeholder="请输入原合同编号" />
                  </FormItem>
                </Col>
              </Row>
              <FormItem v-if="contractType == 0" class="item-label" label="租金包含费用">
                <CheckboxGroup v-model="leaseModel.includeCost">
                  <Checkbox
                    style="fontWeight: normal;"
                    v-for="item in costList"
                    :disabled="cloueFee(item)"
                    :key="item.name"
                    :label="item.name">
                    {{item.name}}
                  </Checkbox>
                </CheckboxGroup>
              </FormItem>
              <FormItem v-if="contractType == 0" class="item-label" label="房内家电家具">
                <Col span="6"
                  v-for="(item,index) in furnitureList"
                  :key="item.name + index"
                  style="marginBottom: 10px;">
                  <FormItem>
                    <NumInput
                      :label = "item.name"
                      :min = "0"
                      :max = "99"
                      v-model="leaseModel.houseFurniture[item.name]"
                    />
                  </FormItem>
                </Col>
              </FormItem>
              <Tooltip :content="contractType == 0 ? '可上传房间物品照片等，最多20张' : '可上传合同、房间照片等，最多20张'">
                <FormItem class="item-label" label="照片凭证">
                  <ImgUploader
                    :url="$api.FILE_UPLOAD_POST"
                    :uploadButton="'btn4'"
                    :maxUploads="20"
                    :defaultList = "proofArray"
                    @on-complete="proofCommplete"
                    @on-remove="proofRemove"
                    :isPhone="true"
                    :code="codeList[3]"
                    @showUploadImg="startRunFun(codeList[3],'proof')"
                  />
                </FormItem>
              </Tooltip>
              <FormItem class="item-label" :label="contractType == 0 ? '附加条款' : '备注'">
                <Input v-model="leaseModel.extra" type="textarea" :rows="3" placeholder="备注信息及附加条款，填写后租客可见。" />
              </FormItem>
            </div>
          </Panel>
        </Collapse>
      </Form>
    </Card>
    <Divider />
    <!-- <Tooltip content="注：如不勾选，可在签约单列表稍后发送">
      <Checkbox>立刻发送短信和微信消息提醒租客确认租约，且后续自动给租客发送消息提醒交租</Checkbox>
    </Tooltip> -->
    <div class="btn-box">
      <!-- <Button>预览合同</Button> -->
      <Button type="primary" :disabled="disableSubmit" @click="handleSubmit">保存并提交</Button>
    </div>
  </Card>
</template>

<script>
import moment from 'moment';
import ActiveForm from '@/components/Helper/Form/ActiveForm';
import NumInput from '@/components/NumInput/NumInput';
import ImgUploader from '@/components/Helper/Form/image-upload';
let vm;


export default {
  components: {
    ActiveForm,
    NumInput,
    ImgUploader,
  },
  data() {
    const checkPhone = (rule, value, callback) => {
      if (!value || !this.$com.checkPhone(value)) {
        callback(new Error('手机号码有误'));
      } else {
        callback();
      }
    };
    const checkCert = (rule, value, callback) => {
      if (!value || !this.$com.checkID(value)) {
        callback(new Error('证件号码有误'));
      } else {
        callback();
      }
    };
    const checkMoney=(rule,value,callback)=>{
      if(value<0 ){
        callback(new Error('请输入正确的数字'))
      }else{
        callback()
      }
    }
    const checkMoneyRent = (rule,value,callback) =>{
      if(this.leaseModel.rent === '' || this.leaseModel.rent === undefined){
          callback(new Error('请输入金额'))
      }else{
        if(isNaN(this.leaseModel.rent)){
          callback(new Error('请输入正确的数字'))
        }else{
          if(this.leaseModel.rent<0 ){
            callback(new Error('请输入正确的数字'))
          }else{
            callback()
          }
        }
      }
    };
    return {
      codeList:[],
      //是否可提交
      disableSubmit:false,
      //公共事业缴费禁用
      landLoadDisabled:false,
      lordShow:false,
      houseNum:'',
      //水电煤
      gasBusiCode:'',
      elecBusiCode:'',
      waterBusiCode:'',
      houseSpace:'',
      //照片
      frontArray:[],
      reverArray:[],
      handArray:[],
      proofArray:[],
      startOptions:{
        disabledDate :function(date) {
          const dataEnd = this.leaseModel.endTime;
          //当前时间15天以前 或 当前时间三个月后 或 结束时间以后不可以选择
          /*if(dataEnd){
            return date.valueOf() < new Date() -86400000*16 || dataEnd.valueOf() < date.valueOf()  || moment(date).isAfter( moment( new Date() ).add(3,'months') );
          }else{
            return date.valueOf() < new Date() -86400000*16 || moment(date).isAfter( moment( new Date() ).add(3,'months') );
          }*/
          //结束时间以后不可选择
          if(dataEnd){
           return dataEnd.valueOf() < date.valueOf();
          }else{
            return false;
          }
        }.bind(this)
      },
      endOptions:{
        shortcuts: [
          {
            text: '一年',
            value () {
                //const date = new Date();
                const date = vm.leaseModel.startTime;
                const end = new Date( moment(date).add(1,'years').subtract(1, 'days') );
                return end;
            }
          },
          {
            text: '六个月',
            value () {
                //const date = new Date();
                const date = vm.leaseModel.startTime;
                const end = new Date( moment(date).add(6,'months').subtract(1, 'days') );
                return end;
            }
          },
          {
            text: '三个月',
            value () {
                //const date = new Date();
                const date = vm.leaseModel.startTime;
                const end = new Date( moment(date).add(3,'months').subtract(1, 'days') );
                return end;
            }
          },
          {
            text: '一个月',
            value () {
                const date = vm.leaseModel.startTime;

                const end = new Date( moment(date).add(1,'months').subtract(1, 'days') );

                return end;
            }
          },
        ],
        disabledDate :function(date) {
          //结束时间不小当前时间且不小于开始时间
          const dateStart = this.leaseModel.startTime;
            return date.valueOf() < dateStart;
        }.bind(this)
      },
      selectDisabled:false,
      houseList:[],//房屋列表
      houseOptions:[],
      contractModelList:[],//合同模板列表
      loading:false,//地址搜索
      contractType: 1, // 合同类型 0-电子合同 1-纸质合同
      endPayDayList: [], // 最晚支付日列表
      currentPanel: '',
      feeList: [{
        name: [],
        count: 0,
        ps: '',
        feeType:'',//one period
      }],
      formModel: {

      },
      feeTypeList: [],
      costList: [
        {name: "水费"},
        {name: "电费"},
        {name: "煤气费"},
        {name: "有线电视费"},
        {name: "网络宽带费"},
        {name: "物业管理费"},
        {name: "维修费（认为使用不当除外）"},
        {name: "保洁费"},
        {name: "暖气费"},
      ],
      furnitureList: [
        {name: '单人床'},
        {name: '双人床'},
        {name: '台灯'},
        {name: '床垫'},
        {name: '床头柜'},
        {name: '衣柜'},
        {name: '矮柜'},
        {name: '茶几'},
        {name: '斗柜'},
        {name: '吊橱'},
        {name: '空调'},
        {name: '电视'},
        {name: '遥控器'},
        {name: '沙发'},
        {name: '电视柜'},
        {name: '桌子'},
        {name: '椅子'},
        {name: '窗帘'},
        {name: '落地台灯'},
        {name: '吊灯'},
        {name: '壁灯'},
        {name: '沙发床'},
        {name: '化妆台'},
        {name: '化妆椅'},
        {name: '鞋柜'},
        {name: '机顶盒'},
      ],
      rules: {
        houseId: [
          {
          required: true,
          message: '请选择房源地址',
          trigger: 'change',
          }
        ],
        templateId: [
          {
          required: true,
          message: '请选择合同模板',
          trigger: 'change',
          }
        ],
        phone: [
          {
            required: true,
            validator: checkPhone,
          }
        ],
        name: [
          {
          required: true,
          message: '请输入承租人姓名',
          trigger: 'blur',
          }
        ],
        sex: [
          {
          required: true,
          message: '请选择性别',
          type: 'number',
          trigger: 'change',
          }
        ],
        certNo: [
          {
          required: true,
          validator: checkCert,
          }
        ],
        startTime: [
          {
          required: true,
          message: '请选择租约开始时间',
          type: 'date',
          trigger: 'change',
          }
        ],
        endTime: [
          {
          required: true,
          message: '请选择租约结束时间',
          type: 'date',
          trigger: 'change',
          }
        ],
        payNum: [
          {
          required: true,
          message: '请选择付款方式',
          }
        ],
        mortgageNum: [
          {
          required: true,
          message: '请选择付款方式',
          }
        ],
        method: [
          {
          required: true,
          message: '请选择付款方式',
          trigger: 'change',
          }
        ],
        rent: [
          // {
          // required: true,
          // type:'number',
          // message: '请输入租金金额',
          // trigger: 'blur',
          // },
          { validator: checkMoneyRent, trigger: 'blur' }
        ],
        deposit: [
          /*{
          required: true,
          type:'number',
          message: '请输入押金金额',
          trigger: 'blur',
          },*/
          {required: true,validator: checkMoney, trigger: 'blur' }
        ],
        collectType: [
          {
          required: true,
          message: '请选择收租方式',
          trigger: 'change',
          }
        ],
        beforeDay: [
          {
          required: true,
          type: 'number',
          message: '请输入收租日',
          trigger: 'blur',
          }
        ],
        fixedFirst: [
          {
          required: true,
          type: 'number',
          message: '请输入收租日',
          trigger: 'blur',
          }
        ],
        fixedEarly: [
          {
          required: true,
          type: 'number',
          message: '请输入收租日',
          trigger: 'blur',
          }
        ],
      },
      tenantLayout:[
        {
          phone: {
            label: '承租人手机',
            type: 'input',
            width: 8,
            disabled:false,
          },
          name: {
            label: '承租人姓名',
            type: 'input',
            width: 8,
            disabled:false,
          },
          /*isLesseeOrigin: {
            type: 'checkbox',
            width: 8,
            options: [
              {
                disabled:false,
                text: '承租人本人入住',
                value: 1,
              },
            ],
          },*/
        },
        {
          sex: {
            label: '性别',
            type: 'radio',
            width: 8,
            options: [
              {
                disabled:false,
                text: '男',
                value: 0,
              },
              {
                disabled:false,
                text: '女',
                value: 1,
              },
            ]
          }
        },
        {
          certNo: {
            disabled:false,
            label: '身份证号码',
            type: 'input',
            width: 16,
          },
        },
        {
          address: {
            disabled:false,
            label: '住址',
            type: 'input',
            width: 16,
          },
        },
      ],
      tenantModel: {
        phone:'',
        name:'',
        address:'',
        isLesseeOrigin:[1],
        sex:'',
        certNo:'',
        photoFront:'',
        photoRevers:'',
        photoHand:''
      },
      leaseModel: {
        landlordCharges:'1',//公共事业缴费
        houseFurniture: {}, // 房内家电家具 名称：数量
        collectType: '1', // 收租方式 1-提前收租 2-每期的第一个月 3-每期提前一个月
        payNum: 1,
        beforeDay:10,
        fixedFirst:1,
        fixedEarly:1,
        mortgageNum: 0,
        //开始时间
        startTime:new Date(),
        endTime:'',
      },
      columns: [
        {
          title: '期数',
          key: 'account',
          align: 'center',
          width: 100,
          render: (h, params) => {
            return h('div', params.index + 1);
          }
        },
        {
          title: '账期',
          key: 'date',
          align: 'center',
          width: 400,
          render: (h, params) => {
            const { dateStart, dateEnd,dateRange,isCombine,payNum } = params.row;
            let ele;
            if (params.index === 0 && !isCombine) {
              ele = [
                h('p', {
                  style: {
                    display: 'inline-block',
                  },
                }, dateStart + ' 至 '),
                h('DatePicker',{
                  props: {
                    options: {
                      disabledDate (date) {
                        return !moment(date).isBetween(moment(dateStart).subtract(1,'days'), moment(dateStart).add(payNum,'month') );
                      },
                    },
                    clearable: false,
                    value: dateEnd,
                  },
                  style: {
                    width: '150px',
                  },
                  on: {
                    'on-change': (date) => {
                      this.canShowPlan(date,'1');
                    }
                  },
                }),
              ];
            } else {
              ele = [h('p', {
                style: {
                  marginRight: '5px'
                },
              }, dateRange)];
            }
            return h('div', ele);
          }
        },
        {
          title: '账单（单位：元）',
          key: 'statement',
          align: 'center',
          render: (h, params) => {
            const { dateStart,dateEnd,periodFeeList, onceFeeList,payNum } = params.row;
            let ele = [];
            let isWhole = moment(dateEnd).isSame( moment(dateStart).subtract(1, 'days').add(Number(payNum), 'months'));//是否为整期

            let monthsNumber  = moment(moment(dateEnd)-moment(dateStart)).get('month'); //账期有几个月
            let isWholeMonth = moment(dateEnd).isSame( moment(dateStart).subtract(1, 'days').add(monthsNumber,'month'));//账期是否是整月

            //第一期和最后一期可能不是整期，周期费用 和 房租费用可能按天算
            if (params.index == 0 || params.index == this.planList.length-1 ){
              //带入this.planList 用于零散和整期 合并与取消合并
              this.planList[params.index].isWhole = isWhole;
              if(isWhole){//整期
                ele = periodFeeList.map(item => {
                  return h('p', `${item.type}  ${item.num}`)
                });
              }else{//非整期
                vm.planList[params.index].periodFeeList.forEach((item,index) =>{
                    let startMonthTotalDay = moment(dateStart).daysInMonth(),//开始月份总天数
                    endMonthTotalDay = moment(dateEnd).daysInMonth(),//结束月份总天数
                    startDay = moment(dateStart).date(),//开始日期
                    endDay = moment(dateEnd).date(),//结束日期
                    singleMoney = item.num / payNum,//每个月钱
                    startMoney= (startMonthTotalDay - startDay + 1)/startMonthTotalDay * singleMoney,//开始月份钱
                    endMoney = (endDay / endMonthTotalDay) * singleMoney,//结束月份钱
                    startAddEndMoney = +(startMoney + endMoney).toFixed(2),//开始加结束月份钱
                    monthEqual = moment(dateStart).get('month') == moment(dateEnd).get('month') ? true : false;//开始月份和结束月份是否一样

                   if(monthEqual){//非跨月
                      let num = ((endDay - startDay + 1)/startMonthTotalDay * singleMoney).toFixed(2);
                      item.num_sp = num;
                      ele.push(h('p', `${item.type}  ${ num}`))
                   }else{//跨月
                    if(isWholeMonth){//跨月为整月
                      let num = singleMoney * monthsNumber;
                      item.num_sp = num;
                      ele.push(h('p', `${item.type}  ${num}`));
                    }else{//非整月
                      // 中间的整月（为结束月份 - 开始月份 -1)
                      let fullMonth =   moment(dateEnd).month() - moment(dateStart).month() -1;
                      let num = (startAddEndMoney + fullMonth*singleMoney).toFixed(2);
                      item.num_sp  = num;
                      ele.push(h('p', `${item.type}  ${num}`));
                    }
                   }
                })
              }
              if(params.index == 0){
                //一次性费用
                onceFeeList.forEach(item =>{
                  ele.push(h('p', `${item.type}  ${item.num}`))
                })
              }
            }else{
              ele = periodFeeList.map(item => {
                return h('p', `${item.type}  ${item.num}`)
              });
            }
            return h('div', ele);
          },
        },
        {
          title: '最晚支付日',
          key: 'payDay',
          align: 'center',
        },
        {
          title: '零散与整期合并',
          key: 'combine',
          align: 'center',
          render: (h, params) => {
            //首期和最后一期如果不是整的有合并，合并后有取消合并
            if ((params.index == 0 || params.index == this.planList.length-1) && this.planList.length>1 ){
              const { dateStart, dateEnd,isWhole,isCombine}  = params.row;
              const start = moment(dateStart).add(1, 'months').format('YYYY-MM-DD');
              const end = moment(dateEnd).add(1, 'days').format('YYYY-MM-DD');
              //3种情况 1.已合并 取消合并 2.未合并 是整期 无 3.未合并 非整齐 合并

              if(isCombine){
                return h('div', [
                  h('Button', {
                    on: {
                      'click': () => {
                        this.canShowPlan();
                      },
                    },
                  }, '取消合并')
                ]);
              }else if(isWhole){
                return;
              }else{
                return h('div', [
                  h('Button', {
                    on: {
                      'click': () => {
                        const data = this.planList[params.index];

                        let index;
                        if (params.index == this.planList.length-1) {//最后一期
                          index = params.index - 1;
                          this.planList[index].dateEnd = data.dateEnd;
                          this.planList[index].payDay = this.planList[index].dateStart;

                        } else if (params.index == 0) {//首期
                          index = params.index + 1;
                          this.planList[index].dateStart = data.dateStart;
                          this.planList[index].payDay = data.dateStart;

                        }

                        this.planList[index].dateRange = `${this.planList[index].dateStart} 至 ${this.planList[index].dateEnd}`;
                        this.planList[index].isCombine = true;
                        this.planList.splice(params.index, 1);
                      },
                    },
                  }, '合并')
                  ]);
              }
            }
          },
        },
      ],
      planList: [],
      resourceImgs: [],
    }
  },
  watch:{
    contractType:function (val, oldVal) {
      //续租 禁用部分表单
        if(val == '1' && this.$route.query.type && this.$route.query.type == 'relet'){
           this.disabledTenant();
        }else if(val == '0' && this.$route.query.type && this.$route.query.type == 'relet'){
          this.disabledPhone();
        }
    }
  },
  computed:{

  },
  mounted() {
    vm = this;
    this.getCode();
    let query = this.$route.query;

    this.$ajax.all([this.getFeeTypeList(),this.getModelList(),this.getDataDetail(query.roomId,query.leaseId)]);

  },
  methods: {
    //得到微信上传的图片
      startRunFun(code,type) {
        let count = 0,
            NAME_SPACE = type+'Array',
            type_num = '';

        if(type == 'front'){
          type_num = 1;
        }else if(type == 'rever'){
          type_num = 0;
        }else if(type == 'hand'){
          type_num = 2;
        }

        this.$ajax.get(
          this,
          this.$api.GET_FILE_UPLOAD_POST.replace("{code}", code), {},
          res => {
            count = res.data.content.length;
            if (count > 0) {
              let data = res.data.content;
              data.forEach(element => {
                element.picPath = element.path;
                element.picId = element.id;
                element.type = type_num;
                element.flag = 'phone';
              });


              if (this[NAME_SPACE].length == 0) {
                this[NAME_SPACE] = data;
              } else {
                data.forEach((d)=>{
                  let flag=true;
                  this[NAME_SPACE].forEach((e)=>{
                      if(d.id==e.picId){
                          flag=false;
                      }
                  })
                  if(flag){
                    this[NAME_SPACE].push({
                        picId:d.id,
                        picPath:d.path,
                        flag:'phone',
                        type:type_num
                    })
                  }
                })
              }
            }
          }
        );
    },
    getCode(){
        this.$ajax.get(this, this.$api.GET_FILE_UPLOAD_CODE_GET, {number:4}, res => {
          this.codeList = res.data.content.code.split(',');
        });
      },
    cloueFee(item){
      if(this.lordShow && (item.name == '水费' || item.name == '电费' ||item.name == '煤气费' )){
        return true;
      }else{
        return false;
      }
    },
    //公共事业缴费
    landlordChange(val){
      if(val == '0'){//其他费用 - 周期费用不可选水电煤
        this.canUse(0);
        this.lordShow = true;
      }else{
        this.canUse(1);
        this.lordShow = false;
      }
    },
    //禁用或者取消禁用 其他费用 -> 周期费用 -> 水电煤
    canUse(val){
      this.feeTypeList.forEach(child =>{
        if(child.label =='周期费用'){
          child.children.forEach( item=>{
            if(item.label == "水费"|| item.label == "电费" || item.label == "燃气费" ){
              if(val == 0){
                item.disabled = true;
              }else if(val == 1){
                item.disabled = false;
              }

            }
          })
        }
      })
    },
    disabledTenant(){
      this.tenantLayout[0].phone.disabled = true;
      this.tenantLayout[0].name.disabled = true;
      // this.tenantLayout[0].isLesseeOrigin.options[0].disabled = true;
      this.tenantLayout[1].sex.options.forEach(item=>{
        item.disabled = true;
      });
      this.tenantLayout[2].certNo.disabled = true;
      this.tenantLayout[3].address.disabled = true;
    },
    disabledPhone(){
      this.tenantLayout[0].phone.disabled = true;
       this.tenantLayout[0].name.disabled = false;
      // this.tenantLayout[0].isLesseeOrigin.options[0].disabled = false;
      this.tenantLayout[1].sex.options.forEach(item=>{
        item.disabled = false;
      });
      this.tenantLayout[2].certNo.disabled = false;
      this.tenantLayout[3].address.disabled = false;
    },
    getModelList(){
      this.$ajax.get(
        this,
        this.$api.GET_CONTRACTMODEL_LISE,
        {},
        res => {
            if(res.data.content instanceof Array){
              this.contractModelList = res.data.content;
            }
        }
      );
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
    proofCommplete(response,filename){
      response = response.data.content;
      this.proofArray.push({
        picId:response.id,
        name:response.name,
        picPath:response.path
      })
    },
    proofRemove(item){
      this.proofArray.forEach((ele,index)=>{
        if(ele.picId == item.picId){
         this.proofArray.splice(index,1)
        }
      })
      this.deleteForPhone(item.flag,this.codeList[3],item.picId)
    },
    frontImageComplete(response,filename){
        response = response.data.content;
        this.frontArray.push({
          picId:response.id,
          name:response.name,
          picPath:response.path,
          type:1,
        })
    },
    frontImgeRemove(item){
        this.frontArray.forEach((ele,index)=>{
          if(ele.picId == item.picId){
           this.frontArray.splice(index,1)
          }
        })
        this.deleteForPhone(item.flag,this.codeList[0],item.picId)
    },

    reversImageComplete(response,filename){
        response = response.data.content;
       this.reverArray.push({
          picId:response.id,
          name:response.name,
          picPath:response.path,
          type:0,
        })
    },
    reversImgeRemove(item){
        this.reverArray.forEach((ele,index)=>{
          if(ele.picId == item.picId){
           this.reverArray.splice(index,1)
          }
        })

        this.deleteForPhone(item.flag,this.codeList[1],item.picId)
    },

    handImageComplete(response,filename){
        response = response.data.content;
         this.handArray.push({
          picId:response.id,
          name:response.name,
          picPath:response.path,
          type:2,
        })
    },
    handImgeRemove(item){
        this.handArray.forEach((ele,index)=>{
          if(ele.picId == item.picId){
           this.handArray.splice(index,1)
          }
        })
        this.deleteForPhone(item.flag,this.codeList[2],item.picId)
    },
    //租约详情
    getDataDetail(roomId,leaseId){
      this.$ajax.get(
          this,
          this.$api.GET_LEASE_DETAIL,
          {
            roomId,
            leaseId
          },
          res => {
              let lease = res.data.content.lease;
              let tenant = res.data.content.tenant;
              let resource = res.data.content.resource;
              ////todo
              this.waterBusiCode = lease.waterBusiCode;
              this.elecBusiCode = lease.elecBusiCode;
              this.gasBusiCode = lease.gasBusiCode;

              this.houseSpace = lease.houseSpace;

              this.houseNum = lease.houseNum;

              //公共事业缴费 - 有无户号
              if(!lease.houseNum){//无户号，默认房东缴费禁用表单
                this.leaseModel.landlordCharges = '1';
                this.landLoadDisabled = true;
              }else{
                this.landLoadDisabled = false;
              }

              //房屋id,name
              this.formModel.roomName = lease.roomName;
              this.formModel.houseId = lease.roomId;
              //合同类型 电子-纸质合同
              this.contractType = lease.type;

              //电子合同有合同模板 纸质没有
              if(lease.type == '0'){
                this.formModel.templateId = lease.templateId
              };

              //租客手机姓名
              this.tenantModel.phone = tenant.phone;
              this.tenantModel.name = tenant.name;
              //是否本人承租
              if(tenant.isLessee == '1'){
                this.tenantModel.isLesseeOrigin = [1]
              }else{
                this.tenantModel.isLesseeOrigin = []
              };
              //租客信息 性别，身份证号，地址，
              this.tenantModel.sex = Number(tenant.sex);
              this.tenantModel.certNo = tenant.certNo;
              this.tenantModel.address = tenant.address;

              this.leaseModel = JSON.parse(lease.leaseModel);
              //续租 租约起止 开始时间为结束时间的下一天，结束时间为空
              this.leaseModel.startTime = new Date(moment(this.leaseModel.endTime).add(1,'days')) ;
              this.leaseModel.endTime = '';

              //照片凭证
              this.proofArray = lease.contractPic?lease.contractPic:[];;
              //其他费用
              this.feeList = JSON.parse(lease.feeList) ? JSON.parse(lease.feeList) : [{name: [],count: '',ps: '',feeType:'',}];

              //三张照片 正反手持半身
             resource && resource.forEach( item =>{
                if(item.type == '1'){
                  this.frontArray.push(item)
                }else if(item.type == "0"){
                  this.reverArray.push(item)
                }else if(item.type == "2"){
                  this.handArray.push(item)
                }
              })

          }
      )

    },
    feeTypeChange(value,selectData){
        //已选择项禁用
        this.feeTypeList.forEach(child =>{
            if(value[0] == child.value){
                child.children.forEach(item =>{
                    if(item.value == value[1]){
                        item.disabled = true;
                    }
                })
            }
        })
        //刷新table数据
        this.canShowPlan();
    },
    //根据配租单号查承租人信息
    selectTenant(no='0000'){
      this.$ajax.get(
        this,
        this.$api.GET_TENANT_INFO,
        {no},
        res => {
              if(res.data == null || res.data == ''){
                //置灰提交按钮
                this.disableSubmit = true;
                //如已录入 清空承租人数据
                this.tenantModel = {};
                //禁用
                this.appendTenantAndDisabled({});
                //提示
                this.$Message.warning({content:res.msg,duration:3})
              }else{
                //放开提交按钮
                this.disableSubmit = false;

                let info = res.data.content;

                this.appendTenantAndDisabled(info);
                //表单填入数据&置灰
              }
        }
      );
    },
    appendTenantAndDisabled(info){
      //填入数据
      this.tenantModel.phone = info.phone;
      this.tenantModel.name = info.tenantName;
      this.tenantModel.certNo = info.idCard;

      //表单置灰
      this.tenantLayout[0].phone.disabled = true;
      this.tenantLayout[0].name.disabled = true;
      // this.tenantLayout[0].isLesseeOrigin.options[0].disabled = true;
      this.tenantLayout[2].certNo.disabled = true;
    },
    //删除行
    deleteRow(index) {
        if(index == 0){
         //取消所有禁用
          this.feeTypeList.forEach(child=>{
            child.children.forEach(item=>{
              item.disabled = false;
            })
          })
          //清空所选项
          this.feeList = [];
           this.feeList.push({
              name: [],
              count: 0,
              ps: '',
              feeType:'',
            });
           return
        }

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
    addRow() {
      const lastItem = this.feeList[this.feeList.length - 1];
      if (!lastItem.name[1] || !lastItem.count) {
        this.$Message.error("请选择费用类型并输入金额！");
        return;
      }
      this.feeList.push({
        name: [],
        count: 0,
        ps: '',
        feeType:'',
      });
    },
    changeLeaseCost(flag) {
      const { mortgageNum, rent, deposit } = this.leaseModel;

      const changeDeposit = () => {
        if (rent && deposit) {
          const result = Number(deposit) / Number(rent);
          if (result >=1 && result <= 12 && Number(deposit) % Number(rent) === 0) {
            this.leaseModel.mortgageNum = result;
          } else {
            this.leaseModel.mortgageNum = 0
          }
        }
      };

      const changeMortgageNum = () => {
        if (rent && mortgageNum && mortgageNum != '0') {
          this.leaseModel.deposit = (Number(rent) * Number(mortgageNum)).toString();
        }
      };

      if (!rent) {
        this.leaseModel.deposit = 0;
      }
      if (flag == 'mortgageNum') {
        changeMortgageNum();
      } else if (flag == 'deposit') {
        changeDeposit();
      } else {
        changeMortgageNum();
      }
      this.canShowPlan();
    },
    canShowPlan(planDate,type) {
              //开始时间 结束时间   付几    押几          房租   押金     收租日         提前         固定        固定提前一月
      const { startTime,endTime, payNum, mortgageNum, rent, deposit, collectType, beforeDay, fixedFirst, fixedEarly } = this.leaseModel;
      if ( !startTime || !endTime|| !payNum || !rent || !deposit ){
        return;
      }
      //total 还根据第一期的结束时间改变
      const total = Math.ceil( moment(endTime).diff(moment(startTime), 'month') /payNum );
      let list = [], endPayDayList = [];
      for(let i = 0; i <= total+2; i++) {
        let start, end;
        if (i === 0) {
          start = moment(startTime).format('YYYY-MM-DD');
          // 在第一期改变账期影响以后每期的结束日 起始结束时间change事件默认传date加type判断
          if (typeof(planDate) == 'string' && type == '1') {
            end = planDate;
          } else {
            end = moment(start).add(Number(payNum), 'months').subtract(1, 'days').format('YYYY-MM-DD');

            if( moment(end) > moment(endTime)){
              end = moment(endTime).format('YYYY-MM-DD');
            }

          };
        } else {
          start = moment(list[i-1].dateEnd).add(1, 'days').format('YYYY-MM-DD');
          end = moment(start).add(Number(payNum),'months').subtract(1,'days').format('YYYY-MM-DD') ;
          //最后一期
          if(moment(start) < moment(endTime) && moment(end) > moment(endTime)){
            end = moment(endTime).format('YYYY-MM-DD');
          }

          if(moment(start) > moment(endTime)){
            break;
          }
        }

        // 改变收租日期 （提前，固定每期第一个月，固定每期提前一个月）
        let payDay = start;
        if (i !== 0) {
          if (collectType == '1' && beforeDay) {
            payDay = moment(payDay).subtract(Number(beforeDay), 'days').format('YYYY-MM-DD');
          } else if (collectType == '2' && fixedFirst) {
            let monthTotalDay= moment(payDay).daysInMonth();
            if(fixedFirst > 28 && monthTotalDay < fixedFirst){//当月天数小与设置的日期则改为最后一天
              payDay = moment(payDay).date(Number(monthTotalDay)).format('YYYY-MM-DD');
            }else{
              payDay = moment(payDay).date(Number(fixedFirst)).format('YYYY-MM-DD');
            }
          } else if (collectType == '3' && fixedEarly) {
            payDay = moment(payDay).subtract(1, 'months').date(Number(fixedEarly)).format('YYYY-MM-DD');
          }
        }
        //周期账单
        const periodFeeList = [
          {
            type: '房屋租金',
            num: Number(rent) * Number(payNum),
            id:'',
            num_sp:'',//非整期情况下的租金
          },
        ];
        //一次账单
        const onceFeeList = [
          {
            type: '押金',
            num: Number(deposit),
            id:''
          },
        ];

        ////准备渲染所需数据
        this.feeList && this.feeList.forEach(item=>{
            //双重循环拿到名称
            this.feeTypeList.forEach( i =>{
                if(item.name[0] == i.label){
                    i.children.forEach( j =>{
                        if(j.value == item.name[1]){
                            item.feeName = item.name[0]+'-'+j.label
                        }
                    })
                }
            })

            //确定是一次费用还是周期费用
            if(item.name[0] == "周期费用"){
                item.feeType = 'period';
            }else{
                item.feeType = 'one';
            }
        })

        //准备渲染数据
        if (this.feeList.length > 0) {
          this.feeList.forEach(item => {
            //去除空行
            if(item.name[1]){
              if(item.feeType == 'one'){
                onceFeeList.push({type:item.feeName,num:item.count,id:item.name[1],note:item.ps})
              }else if(item.feeType == 'period'){
                   periodFeeList.push({type:item.feeName,num:item.count*payNum,id:item.name[1],note:item.ps,num_sp:''})
              }
            }
          })
        }
        list.push({
          payNum:payNum,
          dateStart: start,
          dateEnd: end,
          dateRange: `${start} 至 ${end}`,
          statement: '',
          periodFeeList: periodFeeList,
          onceFeeList: onceFeeList,
          payDay: payDay,
          isWhole:true,
        });
        endPayDayList.push(payDay);
      };
      this.planList = list;
      this.endPayDayList = endPayDayList;
      this.leaseModel.startCollectDate = moment(startTime).format('YYYY-MM-DD');
    },
    getFeeTypeList() {
       this.$ajax.get(
        this,
        this.$api.GET_FEE_ALL,
        {},
        res => {
            if(res.data.content instanceof Array){
                this.changeStructure(res.data.content)
            }
        }
      );
    },
    changeStructure(data){
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
    changeContractType(type) {
      this.contractType = type;
      if(type == '1' && this.$route.query.type && this.$route.query.type == 'relet'){
          this.tenantLayout[0].name.disabled = true;
          // this.tenantLayout[0].isLesseeOrigin.options[0].disabled = true;
          this.tenantLayout[1].sex.options.forEach(item=>{
            item.disabled = true;
          })
          this.tenantLayout[2].certNo.disabled = true;
          this.tenantLayout[3].address.disabled = true;
        }
    },
    checkOther(){
      //是否为纸质合同 纸质跳过验证合同模板
     let isPaper = this.contractType == 0 ? false : true;
        this.$refs.leaseForm.validate(valid =>{
           if(valid){
              if(isPaper){
               this.submitData();
              }else{
                this.$refs.contractForm.validate(valid =>{
                  if(valid){
                    this.submitData();
                  }else{
                    this.$Message.error('请选择电子合同模板!');
                  }
                })
              }

           }else{
            this.$Message.error('请检查表单信息!');
           }
          })
    },
    submitData(){
      let tempArr = [];
      this.planList.forEach((item,index)=>{
        if(index == 0){//第一个月 一次性费用在里面
          item.onceFeeList.forEach( child =>{
              let temObj ={};
              temObj.roomId = this.formModel.houseId;
              switch(child.type){
                  case '首期一次性费用-水费' :
                      temObj.acctSign = 'water';
                      break;
                  case '首期一次性费用-电费' :
                      temObj.acctSign ='elec';
                      break;
                  case '首期一次性费用-燃气费' :
                      temObj.acctSign ='gas';
                      break;
                  case '押金':
                      temObj.acctSign ='deposit';
                      break;
                  default :
                      temObj.acctSign = 'other'
              };
              temObj.acctName=child.type;
              temObj.acctSignId=child.type;
              temObj.receivable = child.num;
              temObj.note = child.note ? child.note : '';
              temObj.number = 1;
              temObj.receivableTime = item.payDay;
              temObj.status = '0';
              temObj.startTime = item.dateStart;
              temObj.endTime = item.dateEnd;
              temObj.resourceId = this.formModel.houseId;
              tempArr.push(temObj);
          });
        };

        //都有的周期费
        item.periodFeeList.forEach( child =>{
            let temObj ={};
            temObj.roomId = this.formModel.houseId;
            switch(child.type){
                case '周期费用-水费' :
                    temObj.acctSign = 'water';
                    break;
                case '周期费用-电费' :
                    temObj.acctSign ='elec';
                    break;
                case '周期费用-燃气费' :
                    temObj.acctSign ='gas';
                    break;
                case '房屋租金' :
                    temObj.acctSign ='rent';
                    break;
                default :
                    temObj.acctSign = 'other'

            };
            temObj.acctName=child.type;
            temObj.acctSignId=child.type;
            temObj.receivable = child.num_sp?child.num_sp:child.num;
            temObj.number = index+1;
            temObj.note = child.note ? child.note : '';
            temObj.receivableTime = item.payDay;
            temObj.status = '0';
            temObj.startTime = item.dateStart;
            temObj.endTime = item.dateEnd;
            temObj.resourceId = this.formModel.houseId;
            tempArr.push(temObj);
        });

    });

    let rentDay;
    switch (this.leaseModel.collectType) {
      case '1':
        rentDay = this.leaseModel.beforeDay;
        break;
      case '2':
        rentDay = this.leaseModel.fixedFirst;
        break;
      case '3':
        rentDay = this.leaseModel.fixedEarly;
        break;
      default:
        rentDay = '';
        break;
    }
    //是否本人租赁
    // this.tenantModel.isLessee = this.tenantModel.isLesseeOrigin && this.tenantModel.isLesseeOrigin.length > 0 ? 1 : 0;

    let imageArray = this.frontArray.concat(this.reverArray,this.handArray);

    const params = {
      extra:this.leaseModel.extra,
      //水电煤 toto
      waterBusiCode:this.waterBusiCode,
      elecBusiCode:this.elecBusiCode,
      gasBusiCode:this.gasBusiCode,

      houseSpace:this.houseSpace,

      //公共事业
      landlordCharges:this.leaseModel.landlordCharges,
      houseNum:this.houseNum,

      startTime: this.$com.changeDate(this.leaseModel.startTime),
      endTime: this.$com.changeDate(this.leaseModel.endTime),
      mortgageNum: this.leaseModel.mortgageNum,
      payNum: this.leaseModel.payNum,
      rent: this.leaseModel.rent,
      deposit:this.leaseModel.deposit,
      squareMeterMonthlyRent:this.leaseModel.squareMeterMonthlyRent,
      rentDay: rentDay,
      rentType: this.leaseModel.collectType,
      roomId: this.formModel.houseId,
      roomName:this.formModel.roomName,
      templateId : this.formModel.templateId,
      type: this.contractType,
      tenant: this.tenantModel,
      feeList:JSON.stringify(this.feeList),
      leaseModel:JSON.stringify(this.leaseModel),
      leaseAccountingDetails: tempArr,
      resourcePics:imageArray,
      contractPic:this.proofArray,
      //houseKind
      // houseKind:JSON.parse(this.$cookie.get('houseKind'))[0].key,
    };
    // TODO  发请求(接口待确认)
        let query = this.$route.query;
        params.leaseId = query.leaseId;
        if(params.resourcePics.length>0){
          params.resourcePics.forEach((e)=>{
            if(e.createTime){
              delete e.createTime;
            }
          })
        }
        if(params.contractPic.length>0){
          params.contractPic.forEach((e)=>{
            if(e.createTime){
              delete e.createTime;
            }
          })
        }

        this.$ajax.put(
          this,
          this.$api.PUT_RELET_LEASE,
          params,
          (res) => {
            this.$Message.info('成功');
            this.toList();
          },
        )
    },
    handleSubmit() {
      this.$refs.personForm.checkData(
        this.checkOther
      )
    },
    //返回列表
    toList(){
      this.$router.push({name:'contract/lease'})
    }
  }
}
</script>

<style scoped>
.ivu-card-body>.ivu-card + .ivu-card {
  margin-top: 16px;
}
.slogon {
  display: inline-block;
  color: #2dc281;
  border: 1px solid #2dc281;
  border-radius: 10px;
  font-weight: normal;
  font-size: 12px;
  padding: 0 5px;
  line-height: 18px;
  height: 18px;
  margin-left: 10px;
}
.contract-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.contract-box{
  width: 49%;
  height: 130px;
  margin: 0 0 16px;
  border: 1px solid #efefef;
  position: relative;
  padding: 16px;
  cursor: pointer;
}
.contract-box.on {
  border: 2px solid #2d8cf0;
}
.contract-box .check-icon {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 30px;
  color: #fff;
  z-index: 1;
  display: none;
}
.contract-box .check-icon::after {
  content: '';
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  top: 0;
  right: 0;
  border: 25px solid transparent;
  border-top-color: #2d8cf0;
  border-right-color: #2d8cf0;
  z-index: -1;
}
.contract-box.on .check-icon {
  display: block;
}
.btn-box {
  margin: 16px 0;
  text-align: center;
}
.item-label {
  font-weight: bold;
}
.delete-row {
  display: flex;
  align-items: center;
  justify-content: center;
}
.furniture-name {
  display: inline-block;
  width: 50px;
}
</style>
