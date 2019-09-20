<template>
  <Card dis-hover>
    <h1 style="text-align: center;margin: 20px 0;">租客登记</h1>
    <Card dis-hover title="房源信息">
      <!-- 多房源 -->
      <Form v-if="moreCheck" ref="houseForm" label-position="right" :model="formModel" :label-width="100" :rules="rules" @submit.native.prevent>
        <Row>
          <Col span="8">
            <FormItem class="item-label" label="房源地址" prop="houseId">
              <Select
                placeholder="请输入小区/公寓"
                label-in-value
                v-model="formModel.houseId"
                :disabled="selectDisabled"
                filterable
                remote
                :remote-method="remoteMethod"
                @on-change="selectHouseMore"
                :loading="loading"
                ref="checkHouse"
              >
              <Option v-for="(option, index) in houseOptions" :value="option.value" :key="index">{{option.label}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col offset="1" span="2">
                <Button @click="resetHouse">重选</Button>
          </Col>
        </Row>
        <Row :gutter="20" v-if="moreCheck">
          <Col span="8" style="margin-bottom:10px;" v-if="checkHouseList.length>0" v-for="(item,index) in checkHouseList" :key="index">
            <Card dis-hover>
                <p slot="title">
                    <Row>
                      <Col span="20" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                        {{item.roomName}}
                      </Col>
                      <Col span="4" style="text-align:right;color:#2d8cf0;cursor:pointer">
                        <!-- <a href="#" slot="extra" @click.prevent="changeLimit(index)">
                          删除
                        </a> -->
                        <div @click="changeLimit(index)">删除</div>
                      </Col>
                    </Row>
                </p>
                
                <Row class="font12" :gutter="5">
                  <Col span="12">
                    面积：{{item.roomSpace}}㎡
                  </Col>
                  <Col span="12">
                    户型：
                    <span v-if="item.roomNum != '' && item.roomNum != null">
                      {{item.roomNum}}室
                    </span>
                    <span v-if="item.parlourNum != '' && item.parlourNum != null">
                      {{item.parlourNum}}室
                    </span>
                    <span v-if="item.toiletNum != '' && item.toiletNum != null">
                      {{item.toiletNum}}卫
                    </span>
                  </Col>
                  <Col span="8">
                    付费方式：付{{item.payNum}}押{{item.mortgageNum}}
                  </Col>
                  <Col span="8">
                    月租金：{{item.rent}}元
                  </Col>
                  <Col span="8">
                    押金：{{item.deposit}}元
                  </Col>
                </Row>
            </Card>
          </Col>
        </Row>
        <Row style="margin-top:20px;">
          <Col span="8">
            <FormItem v-if="checkHouseList.length>1" class="item-label" label="租约地址" prop="moreName">
              <Input v-model="formModel.moreName" placeholder="请输入租约地址" />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <!-- v-for="(item,index) in checkHouseList" :key="index" -->
      
      <!--  -->
      <Form v-else ref="houseForm" label-position="right" :model="formModel" :label-width="100" :rules="rules" @submit.native.prevent>
        <FormItem class="item-label" label="房源地址" prop="houseId">
          <Row v-if="showAddress">
            <Col>{{formModel.roomName}}</Col>
          </Row>
          <Row v-else>
            <Col span="8">
               <Select
                placeholder="请输入小区/公寓"
                :disabled="selectDisabled"
                label-in-value
                v-model="formModel.houseId"
                filterable
                remote
                :remote-method="remoteMethod"
                @on-change="selectHouse"
                :loading="loading">
                <Option v-for="(option, index) in houseOptions" :value="option.value" :key="index">{{option.label}}</Option>
            </Select>
            </Col>
            <Col offset="1" span="2">
                 <Button @click="resetHouse">重选</Button>
            </Col>
          </Row>
        </FormItem>
      </Form>
    </Card>
    <Card dis-hover>
      <p slot="title">
        <span>合同类型</span>
      </p>
      <div class="contract-wrapper">
        <div v-show="canUseElec" :class="contractType == 0 ? 'contract-box on': 'contract-box'" @click="changeContractType(0)">
          <Icon type="ios-checkmark" class="check-icon"/>
          <h3>新签电子合同</h3>
          <p>适用于空房新租客签约场景，使用CA电子合同，实名认证租客身份，公证机构颁发云证书，具备法律效力， 同时管理方便。租客若授权芝麻信用，按时在线交租有助积累信用，逾期违约将产生负面记录。</p>
        </div>
        <div :class="contractType == 1 ? 'contract-box on': 'contract-box'" @click="changeContractType(1)">
          <Icon type="ios-checkmark" class="check-icon"/>
          <h3>已签纸质合同</h3>
          <p>适用于已与租客签约过纸质合同场景，将合同信息补录到系统中，方便统一管理，支持在线收租。</p>
        </div>
      </div>
      <Form  ref="contractForm" v-if="contractType == 0 && canUseElec" :model="formModel" label-position="right" :label-width="100" :rules="rules">
       <FormItem class="item-label" label="合同模板" prop="templateId">
         <Row>
           <Col span="8">
             <Select v-model="formModel.templateId">
               <Option v-for="(option, index) in contractModelList" :value="option.id" :key="option.id">{{option.templateName}}</Option>
             </Select>
           </Col>
           <Col span="6" style="textAlign: center">
             <Button :to="{name:'contractTemplate/add'}" type="primary" ghost icon="md-add">点击创建新电子合同模板</Button>
           </Col>
         </Row>
       </FormItem>
     </Form>
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
                  >
                  </ImgUploader>
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
              <Input placeholder="请输入金额（元）" :disabled="leaseModel.mortgageNum != 0" v-model="leaseModel.deposit" number />
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
          <RadioGroup @on-change="canShowPlan" vertical style="fontWeight:normal" v-model="leaseModel.collectType">
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
        <!-- 选择的是电子合同 && 选的账期数支持分期 -->
          <Row v-show="contractType == 0 && canUseStageList.length >= 1">
            <Col span="12">
              <FormItem class="item-label" label="收费方式"  >
                <RadioGroup   v-model="leaseModel.chargeMethodsType" @on-change="chargeChange">
                    <Radio label="0" >
                      常规收款模式
                    </Radio>
                    <Radio label="1">
                      分期模式
                    </Radio>
                </RadioGroup>
              </FormItem>
            </Col>
           </Row>
         <!-- 选择了分期模式 && 电子合同 -->
         <Row v-show="leaseModel.chargeMethodsType == '1' && contractType == 0">
          <Col span="15" >
            <FormItem class="item-label">
              <div class="radio-box" >
                <Alert class="alert-style" show-icon>租客需一次性支付所需方案中的总计费用，手续费都有房东承担</Alert>
                <RadioGroup style="vertical-align: center;" v-model="leaseModel.stagePortfolioBillsId" @on-change="stageBillChange">
                    <Radio style="margin:10px 0;" v-for="item in canUseStageList" :key="item.id" :label="item.id">
                        <div class="radio-item">
                          前 <b>{{item.accountNumber}}</b> 笔周期账单及押金总计 <b>￥{{item.totalCount}}</b> , 每期账单最少 <b>{{item.monthNumber}}</b> 个月。
                          <br>
                          总共需一次性支付 <b>￥{{item.onePay}}</b> , 获得优惠 <b>￥{{item.totalDiscount}}</b> , 分 <b>{{item.stagingNumber}}</b> 期还款，费率为 <b>{{item.rate}}%</b>。
                        </div>
                    </Radio>
                </RadioGroup>
              </div>
              <!-- style="background-color: #f3f3f3;padding: 10px;" -->

            </FormItem>
          </Col>
        </Row>
        <Row  v-show="contractType == 0 && canUseStageList.length >= 1" >
          <Col span="18">
            <FormItem style="margin-bottom: 0;">
              <Alert show-icon>“常规收款模式” 不支持分期付款；<br>“分期模式” 支持租户信用卡一次性支付部分租金费用。前提需房东与第三方金融机构签订协议，并完成电子签申请</Alert>
            </FormItem>
          </Col>
        </Row>

        <Collapse simple style="border:none;" v-model="currentPanel">
          <Panel name="more">
            <Button type="text">{{currentPanel[0] == 'more' ? '收起' : '展开'}}更多信息（{{contractType == 0 ? '家具清单、附加条款' : '原合同编号、备注'}}） </Button>
            <div slot="content">
              <div style="height: 20px;"></div>
              <Row v-if="contractType == 1" >
                <Col span="8" >
                  <FormItem class="item-label" label="原合同编号">
                    <Input v-model="leaseModel.originContractNo" placeholder="请输入原合同编号" />
                  </FormItem>
                </Col>
              </Row>
              <FormItem v-if="contractType == 0" class="item-label" label="租金包含费用">
                <CheckboxGroup v-model="leaseModel.includeCost" >
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
              <FormItem v-if="contractType == 0" class="item-label" label="房间配置">
                <CheckboxGroup v-model="leaseModel.roomConfigList" >
                <Col span="2" :key="item.name" v-for="item in furnitureList">
                  <Checkbox
                    style="fontWeight: normal;"
                    :label="item.name">
                    {{item.name}}
                  </Checkbox>
                </Col>
                </CheckboxGroup>
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
     <!--  <Button>预览合同</Button> -->
      <Button type="primary" @click="handleSubmit">保存并提交</Button>
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
  name: 'TenantRegister',
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
      moreCheck:false,
      checkHouseList:[],
      // 多房源逻辑↑
      roomConfigList:[],
      codeList:[],
      planList: [],
      canUseStageList:[],
      originStageList:[],
      //是否可以显示电子合同
      canUseElec:true,
      //公共事业缴费禁用
      landLoadDisabled:false,
      lordShow:false,
      houseNum:'',
      //水电煤
      gasBusiCode:'',
      elecBusiCode:'',
      waterBusiCode:'',
      //面积
      houseSpace:'',
      //照片
      frontArray:[],
      reverArray:[],
      handArray:[],
      proofArray:[],
      startOptions:{
         disabledDate :function(date) {
          const dataEnd = this.leaseModel.endTime?this.leaseModel.endTime : false;
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
          //结束时间不小与开始时间
            return  date.valueOf() < this.leaseModel.startTime.valueOf();
        }.bind(this)
      },
      showAddress:false,
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
        houseId:''
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
        {name: 'WIFI'},
        {name: '热水器'},
        {name: '洗衣机'},
        {name: '冰箱'},
        {name: '电视'},
        {name: '沙发'},
        {name: '微波炉'},
        {name: '燃气灶'},
        {name: '电磁炉'},
        {name: '抽油烟机'},
        {name: '空调'},
        {name: '床'},
        {name: '书桌'},
        {name: '衣柜'},
        {name: '阳台'},
        {name: '独卫'},
      ],
      rules: {
        moreName:[
          {
            required: true,
            message: '请输入租约地址',
            trigger: 'blur',
          }
        ],
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
          // // type:'number',
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
        isLesseeOrigin:[],
        sex:'',
        certNo:'',
        photoFront:'',
        photoRevers:'',
        photoHand:''
      },
      leaseModel: {
        chargeMethodsType:'0',
        stagePortfolioBillsId:'',
        corporationId:'',
        landlordCharges:'1',//公共事业缴费
        roomConfigList: [],
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
            const { dateStart, dateEnd,dateRange,isCombine,payNum,isStage } = params.row;
            let ele;
            if ( params.index === 0 && !isCombine && !isStage ) {
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
            const { dateStart,dateEnd,periodFeeList, onceFeeList,payNum,isStage } = params.row;
            let ele = [];

            //是否为整期
            let isWhole = moment(dateEnd).isSame( moment(dateStart).subtract(1, 'days').add(Number(payNum), 'months'));
            //账期有几个月
            let monthsNumber  = moment(moment(dateEnd)-moment(dateStart)).get('month');
            //账期是否是整月
            let isWholeMonth = moment(dateEnd).isSame( moment(dateStart).subtract(1, 'days').add(monthsNumber,'month'));

            //第一期和最后一期可能不是整期，周期费用 和 房租费用可能按天算
            if (params.index == 0 || params.index == this.planList.length-1 ){
              //带入this.planList 用于零散和整期 合并与取消合并
              this.planList[params.index].isWhole = isWhole;
              if(isWhole || isStage){//整期 或 分期的
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
                      item.num_sp = +num;
                      ele.push(h('p', `${item.type}  ${ num}`))
                   }else{//跨月
                    if(isWholeMonth){//跨月为整月
                      let num = singleMoney * monthsNumber;
                      item.num_sp = +num;
                      ele.push(h('p', `${item.type}  ${num}`));
                    }else{//非整月
                      // 中间的整月（为结束月份 - 开始月份 -1)
                      let fullMonth =   moment(dateEnd).month() - moment(dateStart).month() -1;
                      let num = (startAddEndMoney + fullMonth*singleMoney).toFixed(2);
                      item.num_sp  = +num;
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
              const { dateStart, dateEnd,isWhole,isCombine,isStage}  = params.row;

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
              }else if(isWhole || isStage){
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
                          this.planList[index].dateStart= data.dateStart;
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
      resourceImgs: [],
    }
  },
  watch:{
    contractType:function (val, oldVal) {
      //续租
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
    if(this.$route.query.checkList && this.$route.query.checkList == 'moreCheck'){
      this.moreCheck=true;
    }
    //图片上传随机码
    this.getCode();
    //获得电子签及分期权限
    this.getAuthori();

    vm = this;
    let query = this.$route.query;
    if(query.roomId){
      this.showAddress =true;

      if(query.type == 'room'){
         this.$ajax.all([this.getFeeTypeList(),this.getModelList(),this.getRoomDetail(query.roomId)]);
      }
    }else{
      //费用类型
      this.getFeeTypeList();
      //合同模板
      this.getModelList()
    }
    //从cookie 拿默认合同模板
    this.formModel.templateId = this.$cookie.get('contractId');
  },
  methods: {
    selectHouseMore(item){
      if(item === undefined || item == '') return;
      this.houseOptions.forEach((e)=>{
          if(e.value==item.value){
            this.formModel.roomSpace=e.roomSpace;
          }
        })
        //房屋名称
        if(item && item.label){
          this.formModel.roomName = item.label;
          let flag=true;
          this.houseOptions.forEach((child)=>{
            //房屋费用带入
            if(child.value == item.value){
                this.checkHouseList.push({
                  houseKind:child.houseKind,
                  roomId:child.roomId,
                  houseId:child.houseId,
                  roomSpace:child.roomSpace,
                  roomName:child.label,
                  houseSpace:child.houseSpace,//面积
                  payNum:child.payNum,//付几
                  mortgageNum:child.mortgageNum,//押几
                  rent:child.rent,//租金
                  deposit:child.deposit,//押金
                  roomNum:child.roomNum,//室
                  parlourNum:child.parlourNum,//厅
                  toiletNum:child.toiletNum,//卫
                })
              // if(this.checkHouseList.length == 0){
              //     this.checkHouseList.push({
              //       houseKind:child.houseKind,
              //       roomId:child.roomId,
              //       houseId:child.houseId,
              //       roomSpace:child.roomSpace,
              //       roomName:child.label,
              //       houseSpace:child.houseSpace,//面积
              //       payNum:child.payNum,//付几
              //       mortgageNum:child.mortgageNum,//押几
              //       rent:child.rent,//租金
              //       deposit:child.deposit,//押金
              //       roomNum:child.roomNum,//室
              //       parlourNum:child.parlourNum,//厅
              //       toiletNum:child.toiletNum,//卫
              //     })
              // }else{
                
                // if(this.checkHouseList[this.checkHouseList.length-1].houseKind != child.houseKind){
                //   this.$Message.error('所选房源类型不同');
                //   flag=false;
                // }else{
                  // let repeat=this.checkHouseList.map((it)=>{
                  //   console.log(it.roomId,child.roomId,it.roomId == child.roomId);
                  //   return it.roomId == child.roomId;
                  // })
                  // if(repeat[0]==true){
                  //   this.$Message.error('所选房源列表已存在');
                  //   flag=false;
                  // }else{
                    // this.checkHouseList.push({
                    //   houseKind:child.houseKind,
                    //   roomId:child.roomId,
                    //   houseId:child.houseId,
                    //   roomSpace:child.roomSpace,
                    //   roomName:child.label,
                    //   houseSpace:child.houseSpace,//面积
                    //   payNum:child.payNum,//付几
                    //   mortgageNum:child.mortgageNum,//押几
                    //   deposit:child.deposit,//押金
                    //   roomNum:child.roomNum,//室
                    //   parlourNum:child.parlourNum,//厅
                    //   toiletNum:child.toiletNum,//卫
                    // })
                  // }
                // }
              // }
              // 多房源逻辑↑
              // if(!flag) return;
              //公共事业缴费 有无户号
              if(!child.houseNum){//无户号，默认房东缴费禁用表单
                this.leaseModel.landlordCharges = '1'
                this.landLoadDisabled = true;
              }
            //水电煤代码
            /*
              waterBusiCode 便民缴费水费业务代码
              elecBusiCode    便民缴费电费业务代码
              gasBusiCode   便民缴费燃气费业务代码
            */
              this.houseNum = child.houseNum;

              this.waterBusiCode = child.waterBusiCode;
              this.elecBusiCode = child.elecBusiCode;
              this.gasBusiCode = child.gasBusiCode;

              //房屋面积
              this.houseSpace = child.houseSpace;

              this.leaseModel.rent = Number(child.rent);
              this.leaseModel.deposit = Number(child.deposit);
              this.leaseModel.squareMeterMonthlyRent = Number(child.squareMeterMonthlyRent);
              this.leaseModel.mortgageNum = Number(child.mortgageNum);
              this.leaseModel.payNum = Number(child.payNum);
              this.leaseModel.collectType = child.rentType;
              let rentDay = Number(child.rentDay);
              switch (this.leaseModel.collectType) {
                case '1':
                  this.leaseModel.beforeDay = rentDay;
                  break;
                case '2':
                  this.leaseModel.fixedFirst= rentDay;
                  break;
                case '3':
                  this.leaseModel.fixedEarly= rentDay;
                  break;
                default:
                  this.leaseModel.collectType = '1';
                  this.leaseModel.beforeDay = 10;
                  break;
              }
              if(child.roomCostList && child.roomCostList.length >=1){
                  //其他费用
                  this.feeList = [];//清空
                  child.roomCostList.forEach(ele=>{
                    this.feeList.push({
                      ps:'',
                      count:Number(ele.cost),
                      name:[ele.parName,ele.costNo],
                    })
                  })
              }
              //房间配置
              if(child.roomConfigList && child.roomConfigList.length >=1){
                this.leaseModel.roomConfigList = [];//清空
                child.roomConfigList.forEach(ele=>{
                  this.leaseModel.roomConfigList.push(ele.name)
                })
              }
            }
          })
          // if(!flag){

          // }else{
          //   this.selectDisabled = true
          // }
          
        }
        //禁用
        if(item && item.value){
            this.selectDisabled = true
        }else{
            this.selectDisabled = false
        }
    },
    changeLimit(index){
      if(this.checkHouseList[index].roomId == this.formModel.houseId){
        this.formModel.houseId='';
        this.selectDisabled=false;
        this.checkHouseList.splice(index,1);
      }else{
        this.checkHouseList.splice(index,1);
      }
      
    },
    // 多房源逻辑↑
    getAuthori(){
      this.$ajax.get(
        this,
        this.$api.JUDGE_STAGE_AND_ELEC,
        {},
        res =>{
          if(res.data.content.isOpenSign){
            this.canUseElec = true;
            if(res.data.content.isOpenFQ){
              this.getStageList()
            }else{
              this.originStageList = [];
            }
          }else{
            this.canUseElec = false;
          }

        }
      )
    },
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
          this.$api.GET_FILE_UPLOAD_POST.replace("{code}", code),
          {},
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
    stageBillChange(val){
      this.canShowPlan();
      //找到对应的选项
      for(let i in this.canUseStageList){
        if(this.canUseStageList[i].id == val){
          let item = this.canUseStageList[i];
          let startTime = this.planList[0].dateStart;
          let endTime = this.planList[(+item.accountNumber) -1 ].dateEnd;
          let tempObj = {
            dateStart:startTime,
            dateEnd:endTime,
            dateRange:`${startTime} 至 ${endTime}`,
            isStage:true,//是否分期
            payDay:this.planList[0].payDay,
            onceFeeList:[],
            periodFeeList:[
              {
                id:'',
                num:item.onePay,
                num_sp:'',
                type:'分期费用',
              }
            ],
            statement:''
          };
          //替换
          this.planList.splice(0,+item.accountNumber,tempObj);
        }
      }
    },
    chargeChange(val){
      this.leaseModel.stagePortfolioBillsId = '';
      this.canShowPlan();
    },
    getStageList(){
      this.$ajax.get(
        this,
        this.$api.GET_STAGE_LISE,
        {},
        res => {
            this.originStageList = res.data.content;
        }
      );
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
        {
          status:'1',
          applicableScenarioType:'0',
        },
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
    //房屋详情
    getRoomDetail(roomId){
      this.$ajax.get(
          this,
          this.$api.GET_ROOM_DETAIL,
          {
            id:roomId,
          },
          res => {
            let info = res.data.content;
            //水电煤
            this.waterBusiCode = info.waterBusiCode;
            this.elecBusiCode = info.elecBusiCode;
            this.gasBusiCode = info.gasBusiCode;
            //房屋面积
            this.houseSpace = info.houseSpace;
            //户号
            this.houseNum = info.houseNum;
            //公共事业缴费 有无户号
              if(!info.houseNum){//无户号，默认房东缴费禁用表单
                this.leaseModel.landlordCharges = '1'
                this.landLoadDisabled = true;
              }

            this.formModel.roomName = info.showName;
            this.formModel.houseId = info.id;
            this.leaseModel.rent = Number(info.rent);
            this.leaseModel.deposit = Number(info.deposit);
            this.leaseModel.squareMeterMonthlyRent = Number(info.squareMeterMonthlyRent);

            this.leaseModel.mortgageNum = Number(info.mortgageNum);
            this.leaseModel.payNum = Number(info.payNum);
            this.leaseModel.collectType = info.rentType;
            let rentDay = Number(info.rentDay);
              switch (this.leaseModel.collectType) {
                case '1':
                  this.leaseModel.beforeDay = rentDay;
                  break;
                case '2':
                  this.leaseModel.fixedFirst= rentDay;
                  break;
                case '3':
                  this.leaseModel.fixedEarly= rentDay;
                  break;
                default:
                  this.leaseModel.collectType = '1';
                  this.leaseModel.beforeDay = 10;
                  break;
              }
              //其他费用
              if(info.roomCostList && info.roomCostList.length >=1){
                  this.feeList = [];//清空
                  info.roomCostList.forEach(ele=>{
                    this.feeList.push({
                      ps:'',
                      count:Number(ele.cost),
                      name:[ele.parName,ele.costNo],
                    })
                  })
              }
              //房间配置
              if(info.roomConfigList && info.roomConfigList.length >=1){
                this.leaseModel.roomConfigList = [];//清空
                info.roomConfigList.forEach(ele=>{
                  this.leaseModel.roomConfigList.push(ele.name)
                })
              }
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
    resetHouse(){
        this.formModel.houseId='';
        this.formModel.roomName ='';
        this.selectDisabled = false
    },
    selectHouse(item){
      this.houseOptions.forEach((e)=>{
          if(e.value==item.value){
            this.formModel.roomSpace=e.roomSpace;
          }
        })
        //房屋名称
        if(item && item.label){
          this.formModel.roomName = item.label;

          this.houseOptions.forEach((child)=>{

            //房屋费用带入
            if(child.value == item.value){
              //公共事业缴费 有无户号
              if(!child.houseNum){//无户号，默认房东缴费禁用表单
                this.leaseModel.landlordCharges = '1'
                this.landLoadDisabled = true;
              }
            //水电煤代码
            /*
              waterBusiCode 便民缴费水费业务代码
              elecBusiCode    便民缴费电费业务代码
              gasBusiCode   便民缴费燃气费业务代码
            */
              this.houseNum = child.houseNum;

              this.waterBusiCode = child.waterBusiCode;
              this.elecBusiCode = child.elecBusiCode;
              this.gasBusiCode = child.gasBusiCode;

              //房屋面积
              this.houseSpace = child.houseSpace;

              this.leaseModel.rent = Number(child.rent);
              this.leaseModel.deposit = Number(child.deposit);
              this.leaseModel.squareMeterMonthlyRent = Number(child.squareMeterMonthlyRent);
              this.leaseModel.mortgageNum = Number(child.mortgageNum);
              this.leaseModel.payNum = Number(child.payNum);
              this.leaseModel.collectType = child.rentType;
              let rentDay = Number(child.rentDay);
              switch (this.leaseModel.collectType) {
                case '1':
                  this.leaseModel.beforeDay = rentDay;
                  break;
                case '2':
                  this.leaseModel.fixedFirst= rentDay;
                  break;
                case '3':
                  this.leaseModel.fixedEarly= rentDay;
                  break;
                default:
                  this.leaseModel.collectType = '1';
                  this.leaseModel.beforeDay = 10;
                  break;
              }
              if(child.roomCostList && child.roomCostList.length >=1){
                  //其他费用
                  this.feeList = [];//清空
                  child.roomCostList.forEach(ele=>{
                    this.feeList.push({
                      ps:'',
                      count:Number(ele.cost),
                      name:[ele.parName,ele.costNo],
                    })
                  })
              }
              //房间配置
              if(child.roomConfigList && child.roomConfigList.length >=1){
                this.leaseModel.roomConfigList = [];//清空
                child.roomConfigList.forEach(ele=>{
                  this.leaseModel.roomConfigList.push(ele.name)
                })
              }
            }
          })
        }
        //禁用
        if(item && item.value){
            this.selectDisabled = true
        }else{
            this.selectDisabled = false
        }
    },
    //远程搜索方法
    remoteMethod(query){
      if (query !== '') {
        
        this.loading = true;
                this.$ajax.get(
                    this,
                    this.$api.GET_HOUSE_ADDRESS,
                    {
                      name:query,
                      houseKind:'2,3,4,5',
                    },
                    res => {
                        this.loading = false;
                        let data=res.data.content;
                        let arr=[];
                        data.forEach((item)=>{
                          let obj={
                            value:item.id,
                            label:item.showName,
                            rent:+item.rent,//租金
                            deposit :+item.deposit,//押金
                            squareMeterMonthlyRent:+item.squareMeterMonthlyRent,//每平米租金
                            mortgageNum :+item.mortgageNum,//押几
                            payNum :+item.payNum,//付几
                            roomCostList:item.roomCostList,//费用列表
                            roomConfigList:item.roomConfigList,//房屋配置
                            rentType: item.rentType,//收租方式
                            rentDay:item.rentDay,//收租日
                            waterBusiCode:item.waterBusiCode,//水
                            houseSpace:item.houseSpace,//面积
                            elecBusiCode:item.elecBusiCode,//电
                            gasBusiCode:item.gasBusiCode,//煤气
                            houseNum:item.houseNum,//户号
                            roomSpace:item.roomSpace,
                            // 多房源逻辑↓
                            roomNum:item.roomNum,//室
                            parlourNum:item.parlourNum,//厅
                            toiletNum:item.toiletNum,//卫
                            houseKind:item.houseKind,
                            houseId:item.houseId,
                            roomId:item.id
                          };
                          if(this.checkHouseList.length==0){
                            arr.push(obj);
                          }else{
                            let flag=true;
                            this.checkHouseList.forEach((e)=>{
                              if(e.roomId == item.id || e.houseKind != item.houseKind){
                                flag=false;
                              }else{
                                
                              }
                            })
                            if(flag){
                              arr.push(obj);
                            }
                          }
                        })
                        this.houseOptions=JSON.parse(JSON.stringify(arr));  
                        
                        // this.houseOptions = res.data.content.map(item=>{
                        //   let obj=
                        //   {
                        //     value:item.id,
                        //     label:item.showName,
                        //     rent:+item.rent,//租金
                        //     deposit :+item.deposit,//押金
                        //     squareMeterMonthlyRent:+item.squareMeterMonthlyRent,//每平米租金
                        //     mortgageNum :+item.mortgageNum,//押几
                        //     payNum :+item.payNum,//付几
                        //     roomCostList:item.roomCostList,//费用列表
                        //     roomConfigList:item.roomConfigList,//房屋配置
                        //     rentType: item.rentType,//收租方式
                        //     rentDay:item.rentDay,//收租日
                        //     waterBusiCode:item.waterBusiCode,//水
                        //     houseSpace:item.houseSpace,//面积
                        //     elecBusiCode:item.elecBusiCode,//电
                        //     gasBusiCode:item.gasBusiCode,//煤气
                        //     houseNum:item.houseNum,//户号
                        //     roomSpace:item.roomSpace,
                        //     // 多房源逻辑↓
                        //     roomNum:item.roomNum,//室
                        //     parlourNum:item.parlourNum,//厅
                        //     toiletNum:item.toiletNum,//卫
                        //     houseKind:item.houseKind,
                        //     houseId:item.houseId,
                        //     roomId:item.id
                        //   }
                        //   if(this.checkHouseList.length==0){
                        //     return obj;
                        //   }else{
                        //     this.checkHouseList.forEach((e)=>{
                        //       if(e.roomId == obj.roomId || e.houseKind != obj.houseKind){
                                
                        //       }else{
                        //         return obj;
                        //       }
                        //     })
                        //   }

                        // })
                    },
                    true, // 隐藏loading图
                )
      } else {
          this.houseOptions = [];
      }
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
      //if( this.feeList.length > 0){
        const lastItem = this.feeList[this.feeList.length - 1];
        if (!lastItem.name[1] || !lastItem.count) {
          this.$Message.warning("请选择费用类型并输入金额！");
          return;
        }
      //}
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
      if ( !startTime || !endTime|| !payNum || !rent || !deposit ) {
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
            ////temp

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
          payNum:payNum,//几个月
          dateStart: start,//开始时间
          dateEnd: end,//结束时间
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
      //筛选可用的分期
      let len = this.planList.length;
      this.canUseStageList = this.originStageList.filter(item =>{
        //账期数大于分期数且付款方式的付几需大于等于每期账单最少月数
        return Number(item.accountNumber) <= len && this.leaseModel.payNum >= Number(item.monthNumber);
      });
      this.canUseStageList.forEach(child=>{
        //总金额
        child.totalCount = 0;
        //优惠金额
        child.totalDiscount = 0;
        //一次性支付
        child.onePay = 0;

        for(let i=0;i<child.accountNumber;i++){
          //一次费用
          if(i == 0){
            this.planList[i].onceFeeList.forEach(item=>{
              child.totalCount += item.num;
            })
          }
          //周期费用
          this.planList[i].periodFeeList.forEach(item=>{
            child.totalCount += item.num_sp ? item.num_sp : item.num;
          })
        }
        if(child.reductionMode == '0'){
          child.totalDiscount = +child.rentConcessions * +rent
        }else{
          child.totalDiscount = child.rentConcessions
        }
        child.onePay = child.totalCount - child.totalDiscount > 0 ?child.totalCount - child.totalDiscount:0;
      })
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
      if(type == '1'){
        //纸质模板
        this.leaseModel.chargeMethodsType = '0';
        this.leaseModel.stagePortfolioBillsId = '';
      }
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
     if(this.showAddress){//跳过验证选择房屋
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
     }else{
        this.$refs.houseForm.validate( valid =>{
           if(valid){
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
           }else{
             this.$Message.error('请选择房源地址!');
           }

        })
     }

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
            temObj.roomSpace=this.formModel.roomSpace;
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
                case '分期费用':
                    temObj.acctSign ='stage';
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
        //rentDay = '';
        break;
    }
    //是否本人租赁
    // this.tenantModel.isLessee = this.tenantModel.isLesseeOrigin && this.tenantModel.isLesseeOrigin.length > 0 ? 1 : 0;

    let imageArray = this.frontArray.concat(this.reverArray,this.handArray);

    const params = {
      extra:this.leaseModel.extra,
      //分期相关
      //收费方式类型
      chargeMethodsType:this.leaseModel.chargeMethodsType,
      //账单分期组合id
      stagePortfolioBillsId:this.leaseModel.stagePortfolioBillsId,
      //水电煤 toto
      waterBusiCode:this.waterBusiCode,
      elecBusiCode:this.elecBusiCode,
      gasBusiCode:this.gasBusiCode,
      //面积
      houseSpace:this.houseSpace,
      //公共事业
      landlordCharges:this.leaseModel.landlordCharges,
      houseNum:this.houseNum,
      //平方米租金
      squareMeterMonthlyRent:this.leaseModel.squareMeterMonthlyRent,

      startTime: this.$com.changeDate(this.leaseModel.startTime),
      endTime: this.$com.changeDate(this.leaseModel.endTime),
      mortgageNum: this.leaseModel.mortgageNum,
      payNum: this.leaseModel.payNum,
      rent: this.leaseModel.rent,
      deposit:this.leaseModel.deposit,
      rentDay: rentDay,
      rentType: this.leaseModel.collectType,
      roomId: this.formModel.houseId,
      // roomName:this.formModel.roomName,
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
    if(this.checkHouseList.length>1){
      params.roomName=this.formModel.moreName;
      params.roomSet=JSON.parse(JSON.stringify(this.checkHouseList));
      params.roomNum=this.checkHouseList.length;
    }else{
      params.roomName=this.formModel.roomName
    }
    // 多房源新增逻辑↑
    // TODO  发请求(接口待确认)
    if(this.contractType == '0' ){
      this.$Modal.confirm({
        title: '是否确认租约信息无误',
        content: '<p>待租客线上确认租约后，平台将为此租约生成具有法律效用的电子合同</p>',
        onOk: () => {
          this.$ajax.post(
            this,
            this.$api.POST_NEW_LEASE,
            params,
            (res) => {
              this.$Message.info('成功');
              this.toList();
            },
          )
        },
      });
    }else{
      this.$ajax.post(
        this,
        this.$api.POST_NEW_LEASE,
        params,
        (res) => {
          this.$Message.info('成功');
          this.toList();
        },
      )
    }
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
.radio-box{
    background-color: #f3f3f3;
    padding:10px;
}
.alert-style{
  line-height:1.5em;
  font-size:14px;
  background-color: #f3f3f3;
  color: #2d8cf0;
  border:none;
  margin-bottom: 0;
  padding-bottom: 0;
}
.radio-item{
  display: inline-block;
  vertical-align: middle;
  padding:5px;
  background-color: #fff
}
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
.font12{
  font-size: 12px;
}
</style>
