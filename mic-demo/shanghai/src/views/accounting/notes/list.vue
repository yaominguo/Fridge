<template>
  <Card dis-hover>
    <Tabs v-model="tabName" :animated="false">
      <TabPane
        v-for="tab in tabList"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name">
        <div>
          <!-- 搜索 -->
          <Form ref="searchForm" label-position="right" :model="searchData" :label-width="100" >
            <Row>
              <Col span="14">
                <FormItem class="item"  label="房源地址" >
                    <Row>
                      <Col span="8">
                        <Select placeholder="小区/大楼" label-in-value @on-change="buildChangeSearch" v-model="searchData.sectId">
                            <Option v-for="item in communityList" :value="item.id" :key="
                            item.id">{{item.name}}</Option>
                        </Select>
                      </Col>
                      <Col span="8">
                        <Select placeholder="房门号" label-in-value filterable  @on-change="houseChangeSearch"  v-model="searchData.houseId">
                          <Option v-for="item in houseList" :value="item.id" :key="
                            item.id">{{item.name}}</Option>
                        </Select>
                      </Col>
                      <Col span="8">
                        <Select placeholder="房间名" v-if="searchHomeType" label-in-value @on-change="roomChangeSearch" v-model="searchData.roomId">
                         <Option v-for="item in roomList" :value="item.id" :key="
                            item.id">{{item.alias}}</Option>
                        </Select>
                      </Col>
                    </Row>
                  </FormItem>
              </Col>
              <Col span="8">
                <FormItem class="item" label="记账项目" >
                    <Row>
                      <Col span="12">
                        <Select placeholder="记账主项目" label-in-value @on-change="itemChangeSearch" v-model="searchData.acctId">
                            <Option v-for="item in oneItemList" :value="item.id" :key="
                            item.id">{{item.name}}</Option>
                        </Select>
                      </Col>
                      <Col span="12">
                        <Select placeholder="记账子项目" label-in-value @on-change="childItemChangeSearch"  v-model="searchData.acctDetailId">
                          <Option v-for="item in twoItemList" :value="item.id" :key="
                            item.id">{{item.name}}</Option>
                        </Select>
                      </Col>
                    </Row>
                  </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="10">
                  <FormItem class="item"  label="应收/支日期" >
                    <Row>
                      <Col span="10">
                          <DatePicker  type="date" placeholder="开始日期" v-model="searchData.shoudeDateStart"></DatePicker>
                      </Col>
                      <Col span="2" style="text-align: center;">至</Col>
                      <Col span="10">
                          <DatePicker type="date" placeholder="结束日期" v-model="searchData.shoudeDateEnd"></DatePicker>
                      </Col>
                    </Row>
                  </FormItem>
              </Col>
              <Col span="10">
                  <FormItem class="item"  label="实收/支日期" >
                    <Row>
                      <Col span="10">
                        <DatePicker type="date" placeholder="开始日期" v-model="searchData.realDateStart"></DatePicker>
                      </Col>
                      <Col span="2" style="text-align: center;">至</Col>
                      <Col span="10">
                        <DatePicker type="date" placeholder="结束日期" v-model="searchData.realDateEnd"></DatePicker>
                      </Col>
                    </Row>
                  </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="7">
                <FormItem class="item"  label="收支方式" >
                    <Select v-model="searchData.paymentWay">
                        <Option v-for="item in payList" :value="item.id" :key="
                        item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>
              </Col>
              <Col span="7">
                <FormItem class="item"  label="编号" >
                  <Input v-model="searchData.documentNumber" placeholder="请楚入编号"></Input>
                </FormItem>
              </Col>
              <Col span="7">
                <FormItem class="item"  label="房源所属门店" >
                  <Select v-model="searchData.storeId" >
                   <Option v-for="item in storeList" :value="item.id" :key="
                        item.id">{{item.storeName}}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="end">
              <Col span="10">
               <FormItem class="item" label="记账科目" >
                  <CheckboxGroup v-model="searchData.type">
                    <Checkbox v-for="item in feeTypeList" :key="item.value" :label="item.value">{{item.label}}</Checkbox>
                  </CheckboxGroup>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem class="item" label="状态" >
                  <RadioGroup  v-model="searchData.flag" type="button" >
                      <Radio :label="'1'">已生效</Radio>
                      <Radio :label="'0'">已作废</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col offset="4" span="4">
								<Row type="flex" justify="end">
									<Col>
										 <Button size="large" @click="restSearch">清空</Button>
										<Button size="large" @click="handleSearch" style="margin-left: 10px;" type="primary">查询</Button>
									</Col>
								</Row>

              </Col>
            </Row>
          </Form>
          <div class="summary">
            <Row >
              <Col span="12">
                 <Row>
                  <Col span="12">应收：{{titleData.shouldIncome}}元（{{titleData.shouldIncomeCount}}笔）</Col>
                  <Col span="12">应付：{{titleData.shouldOutcome}}元（{{titleData.shouldOutcomeCount}}笔）</Col>
                </Row>
                <Row>
                  <Col span="12">已收款（预收）：{{titleData.realIncome}}元（{{titleData.realIncomeCount}}笔）</Col>
                  <Col span="12">已付款（预付）：{{titleData.realOutcome}}元（{{titleData.realOutcomeCount}}笔）</Col>
                </Row>
              </Col>
              <Col span="12" class="right" >总计：
              {{Number(titleData.shouldIncome)-Number(titleData.shouldOutcome)
              +Number(titleData.realIncome)-Number(titleData.realOutcome)}}
              元
              （{{titleData.shouldIncomeCount+titleData.shouldOutcomeCount+titleData.realIncomeCount+titleData.realOutcomeCount ?titleData.shouldIncomeCount+titleData.shouldOutcomeCount+titleData.realIncomeCount+titleData.realOutcomeCount :''}}笔）</Col>
            </Row>
          </div>
          <Table :columns="columns" :data="listData" ></Table>
          <div class="pager">
            <Page @on-change="changePage" :current="searchData.pageNo" :page-size="searchData.pageSize" :total="searchData.total" show-total />
          </div>
        </div>
      </TabPane>
      <div style="width: 300px;" class="actions" slot="extra">
        <Row type="flex" justify="end">
          <Col>
            <Button type="primary" icon="md-add" @click="addNote">记一笔账</Button>
          </Col>
          <!-- <Col offset="2" span="10">
            <Select >
             <Option v-for="item in storeList" :value="item.id" :key="
                  item.id">{{item.storeName}}</Option>
            </Select>
          </Col> -->
        </Row>
      </div>
    </Tabs>

    <Modal
      :mask-closable="false"
      v-model="modal"
    >
      <div slot="header">
        <h2 v-if="isNew">添加记账</h2>
        <dl v-else>
          <dt ><h2>编辑记账</h2></dt>
          <dd style="margin-top: 10px">编号:{{' '+editData.documentNumber}}</dd>
        </dl>
      </div>
      <!-- 编辑记账 -->
      <Form v-show="!isNew" ref="editForm" :rules="rules" label-position="right" :model="editData" :label-width="80">
        <FormItem label="记账类型">
          <Row>
            <Col span="18">
              {{showTypeTex(editData.type)}}
            </Col>
          </Row>
        </FormItem>
        <FormItem label="房源地址">
            {{showAddressTex(editData)}}
        </FormItem >
        <FormItem label="账单项目" prop="acctId">
          <Row>
            <Col span="18">
              <Select placeholder="请选择" label-in-value v-model="editData.acctId"  @on-change="itemChangeEdit">
                  <Option v-for="item in oneItemList" :value="item.id" :key="
                  item.id">{{item.name}}</Option>
              </Select>
            </Col>
          </Row>
        </FormItem>
         <FormItem prop="acctDetailId">
          <Row>
            <Col span="10">
              <Select placeholder="请选择子项目" label-in-value @on-change="childItemChangeEdit" v-model="editData.acctDetailId">
                <Option v-for="item in twoItemList" :value="item.id" :key="
                  item.id">{{item.name}}</Option>
              </Select>
            </Col>
            <Col  offset="2" span="4">
              <Button to="#/sys/configuration" target="_blank">自定义项目</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="选择账期" >
         <Row>
           <Col span="18">
             {{this.changeDate(editData.startTime)+' '}}至{{' '+this.changeDate(editData.endTime)}}
           </Col>
         </Row>
        </FormItem>
        <FormItem :label="whatType == 'pay' || whatType =='yetPay' ? '应付金额' : '应收金额'">
           {{editData.money?editData.money+' 元':''}}
           <!-- <InputNumber :min="0.1" v-model="addData.money"></InputNumber>&nbsp;元 -->
       </FormItem>
        <FormItem :label="whatType == 'pay' || whatType =='yetPay' ? '应付日期' : '应收日期'">
           <Row>
               <Col span="18">
                    {{this.changeDate(editData.shoudeDate)}}
               </Col>
           </Row>
       </FormItem>
        <template v-if="whatType == 'yetPay' || whatType =='yetReceive'">
         <FormItem :label="whatType == 'yetPay' ? '实付金额' : '实收金额'">
           <Row>
               <Col span="18">
                   {{editData.money?editData.money+' 元':''}}
               </Col>
           </Row>
         </FormItem>
         <FormItem :label="whatType == 'yetPay' ? '实付日期' : '实收日期'">
           <Row>
               <Col span="18">
                   {{this.changeDate(editData.realDate)}}
               </Col>
           </Row>
         </FormItem>
         <FormItem label="收支方式">
           <Row>
             <Col span="18">
                  {{this.showPayTex(editData.paymentWay)}}
             </Col>
           </Row>
         </FormItem>
       </template>
        <FormItem label="添加图片">
           <ImgUploader :uploadButton="'upload1'" :maxUploads="3" :url="$api.FILE_UPLOAD_POST" :defaultList="editData.resourcePics"
             @on-complete="uploadCompleteEdit"
             @on-remove="uploadRemoveEdit"
             :isPhone="true"
            @showUploadImg="getReturnEdit"
            :code="code"
             ></ImgUploader>
        </FormItem>
        <FormItem label="记账备注">
          <Row>
            <Col span="18">
              <Input v-model="editData.note" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入"></Input>
            </Col>
          </Row>
        </FormItem>
      </Form>
      <!-- 新增记账 -->
      <Form v-show="isNew" ref="noteForm" :rules="rules" label-position="right" :model="addData" :label-width="80" >
        <FormItem label="记账类型" prop="type">
          <Row>
            <Col span="18">
              <Select v-model="addData.type">
                  <Option v-for="item in feeTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="房源地址" prop="isRoomRelation">
            <RadioGroup v-model="addData.isRoomRelation" @on-change="roomTypeChange">
                <Radio :label="'1'">房源相关</Radio>
                <Radio :label="'0'">房源无关</Radio>
            </RadioGroup>
        </FormItem >
        <FormItem prop="sectId" v-if="!roomDisabled">
          <Row>
            <Col span="18">
              <Select placeholder="小区/大楼" label-in-value  @on-change="buildChangeAdd" v-model="addData.sectId">
                  <Option v-for="item in communityList" :value="item.id" :key="
                  item.id">{{item.name}}</Option>
              </Select>
            </Col>
          </Row>
        </FormItem>
        <FormItem prop="houseId" v-if="!roomDisabled">
          <Row>
            <Col span="18">
              <Select placeholder="房门号" label-in-value filterable  @on-change="houseChangeAdd" v-model="addData.houseId">
                <Option v-for="item in houseList" :value="item.id" :key="
                  item.id">{{item.name}}</Option>
              </Select>
            </Col>
          </Row>
        </FormItem>
        <FormItem prop="roomId" v-if="!roomDisabled && isDisperse">
          <Row>
            <Col span="18">
              <Select placeholder="房间名" label-in-value  @on-change="roomChangeAdd" v-model="addData.roomId">
               <Option v-for="item in roomList" :value="item.id" :key="
                  item.id">{{item.alias}}</Option>
              </Select>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="账单项目" prop="acctId">
          <Row>
            <Col span="18">
              <Select placeholder="请选择" label-in-value v-model="addData.acctId"  @on-change="itemChangeAdd">
                  <Option v-for="item in oneItemList" :value="item.id" :key="
                  item.id">{{item.name}}</Option>
              </Select>
            </Col>
          </Row>
        </FormItem>
        <FormItem prop="acctDetailId">
          <Row>
            <Col span="10">
              <Select placeholder="请选择子项目" label-in-value @on-change="childItemChangeAdd" v-model="addData.acctDetailId">
                <Option v-for="item in twoItemList" :value="item.id" :key="
                  item.id">{{item.name}}</Option>
              </Select>
            </Col>
            <Col  offset="2" span="4">
              <Button to="#/sys/configuration" target="_blank">自定义项目</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="选择账期" class="ivu-form-item-required">
          <Row>
            <Col span="8">
              <FormItem prop="startTime">
                <DatePicker type="date" :options="startOptions" placeholder="开始日期" v-model="addData.startTime"></DatePicker>
              </FormItem>
            </Col>
            <Col span="2" style="text-align: center;">至</Col>
            <Col span="8">
              <FormItem prop="endTime">
                <DatePicker type="date" :options="endOptions" placeholder="结束日期" v-model="addData.endTime"></DatePicker>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem :label="whatType == 'pay' || whatType =='yetPay' ? '应付金额' : '应收金额'" prop="money">
            <InputNumber :min="0.1" v-model="addData.money"></InputNumber>&nbsp;元
        </FormItem>
        <FormItem :label="whatType == 'pay' || whatType =='yetPay' ? '应付日期' : '应收日期'" prop="shoudeDate">
            <Row>
                <Col span="18">
                    <DatePicker type="date" placeholder="请选择日期" v-model="addData.shoudeDate"></DatePicker>
                </Col>
            </Row>
        </FormItem>
        <template v-if="whatType == 'yetPay' || whatType =='yetReceive'">
          <FormItem :label="whatType == 'yetPay' ? '实付金额' : '实收金额'">
            <Row>
                <Col span="18">
                    {{addData.money?addData.money+' 元':''}}
                </Col>
            </Row>
          </FormItem>
          <FormItem :label="whatType == 'yetPay' ? '实付日期' : '实收日期'" prop="realDate">
            <Row>
                <Col span="18">
                    <DatePicker type="date" placeholder="请选择日期" v-model="addData.realDate"></DatePicker>
                </Col>
            </Row>
          </FormItem>
          <FormItem label="收支方式" prop="paymentWay">
            <Row>
              <Col span="18">
                <Select v-model="addData.paymentWay">
                    <Option v-for="item in payList" :value="item.id" :key="
                    item.id">{{item.name}}</Option>
                </Select>
              </Col>
            </Row>
          </FormItem>
        </template>
        <FormItem label="添加图片" prop="pic">
           <ImgUploader
           :uploadButton="'upload2'"
           :maxUploads="3"
           :url="$api.FILE_UPLOAD_POST"
           :defaultList="picList"
            @on-complete="uploadCompleteAdd"
            @on-remove="uploadRemoveAdd"
            :isPhone="true"
            @showUploadImg="getReturnAdd"
            :code="code"
            ></ImgUploader>
        </FormItem>
        <FormItem label="记账备注">
          <Row>
            <Col span="18">
              <Input v-model="addData.note" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入"></Input>
            </Col>
          </Row>
        </FormItem>
      </Form>
      <div slot="footer">
          <Button  size="large"   @click="cancel">取消</Button>
          <Button type="primary" size="large"  @click="ok">确认</Button>
      </div>
    </Modal>
    <!-- 确认收付款模态框 -->
    <Modal
      :mask-closable="false"
      v-model="affirmModal"
    >
    <div slot="header">
      <h2 v-if="affirmData.type =='1'">确认收款</h2>
      <h2 v-else>确认付款</h2>
    </div>
      <Form :rules="rules" label-position="right" :model="affirmData" :label-width="80" >
        <FormItem :label="affirmData.type =='1' ?'应收金额':'应付金额'">
          <Row>
            <Col span="18">
              {{affirmData.money}}
            </Col>
          </Row>
          </FormItem>
          <FormItem :label="affirmData.type =='1' ?'收款方式':'付款方式'">
          <Row>
            <Col span="18">
              <Select v-model="affirmData.paymentWay">
                  <Option v-for="item in payList" :value="item.id" :key="
                  item.id">{{item.name}}</Option>
              </Select>
            </Col>
          </Row>
        </FormItem>
          <FormItem :label="affirmData.type =='1' ?'收款日期':'付款日期'">
            <Row>
                <Col span="18">
                    <DatePicker type="date" placeholder="请选择日期" v-model="affirmData.realDate"></DatePicker>
                </Col>
            </Row>
          </FormItem>
          <FormItem label="备注">
          <Row>
            <Col span="18">
              <Input v-model="affirmData.note" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入"></Input>
            </Col>
          </Row>
        </FormItem>
      </Form>
      <div slot="footer">
          <Button  size="large"   @click="affirmCancel">取消</Button>
          <Button type="primary" size="large"  @click="affirmOk">确认</Button>
      </div>
    </Modal>
  </Card>
</template>

<script>
import ImgUploader from '@/components/Helper/Form/image-upload';
import expandRow from './expand';
import moment from 'moment';
var vm;

export default {
  name: 'noteList',
  components: {
    ImgUploader
  },
  data() {
    const validatePic=(rule,value,callback)=>{
        if(this.picList.length>3){
          callback(new Error('最多上传三张图片'));

        }else{
          callback();
        }
    }
    return {
      code:'',
      searchHomeType:true,
       startOptions:{
         disabledDate :function(date) {
          const dataEnd = this.addData.endTime;
          //结束时间以后不可以选择
          if(dataEnd){
            return  dataEnd.valueOf() < date.valueOf();
          }else{
            return false;
          }
        }.bind(this)
      },
      endOptions:{
        disabledDate :function(date) {
          //结束时间不小开始时间
          const dataStart = this.addData.startTime;
          if(dataStart){
            return date.valueOf() < dataStart.valueOf();
          }else{
            return false;
          }
        }.bind(this)
      },
      isNew:true,//是否为新增
      isDisperse:true,//是否为分租
      cancelMark:'',//作废原因
      checkMark:'',//核销原因
      affirmModal:false,

      affirmData:{},
      editData:{},
      listData:[],
      titleData:{},
      communityList:[],//小区列表
      houseList:[],//房屋列表
      roomList:[],//房间列表
      oneItemList:[],//一级项目
      twoItemList:[],//二级项目
      payList:[],//支付方式
      storeList:[],//门店列表
      rules:{
        type:[
          { required: true,  message: '请选择记账科目', trigger: 'change' }
        ],
        isRoomRelation:[
          { required:true, message:'请选择房源地址', trigger:'change'}
        ],
        sectId:[
          {required:true,message:'请选择小区',trigger:'change'}
        ],
        houseId:[
          {required:true,message:'请选择房门号',trigger:'change'}
        ],
        roomId:[
          {required:true,message:'请选择房间名',trigger:'change'}
        ],
        acctId:[
          {required:true,message:'请选择记账主项目',trigger:'change'}
        ],
        acctDetailId:[
          {required:true,message:'请选择记账子项目',trigger:'change'}
        ],
        startTime:[
          {required:true, type:'date',message:'请选择开始时间',trigger:'change'}
        ],
        endTime:[
          {required:true, type:'date',message:'请选择结束时间',trigger:'change'}
        ],
        money:[
          {required:true, type:'number',message:'请输入金额',trigger:'blur'}
        ],
        shoudeDate:[
          {required:true, type:'date',message:'请选择时间',trigger:'change'}
        ],
        realDate:[
          {required:true, type:'date',message:'请选择时间',trigger:'change'}
        ],
        paymentWay:[
          {required:true,message:'请选择付款方式',trigger:'change'}
        ],
        pic:[
            { validator: validatePic, trigger: 'change' }
        ]
      },
      feeTypeList:[
        {
          label:'已收款（预收）',
          value:'0',
        },
        {
          label:'应收款',
          value:'1',
        },
        {
          label:'已付款（预付）',
          value:'2',
        },
        {
          label:'应付款',
          value:'3'
        }
      ],
      roomDisabled:false,
      picList:[],
      addData:{
        money:1,
        isRoomRelation:'1',
        acctDetailId:'',
        acctDetailName:'',
        acctId:'',
        acctName:'',
        sectId:'',
        houseId:'',
        roomId:'',
        sectName:'',
        houseName:'',
        roomName:'',
      },
      modal:false,
      flag:'1',
      noteType:0,
      typeList:[
        {
          label:'全部',
          value:0,
        },
        {
          label:'总店',
          value:1
        },
        {
          label:'分店',
          value:2
        },

        {
          label:''
        }
      ],

      tabName: 'all',
      searchData: {
        flag:1,
        pageNo: 1,
        pageSize: 10,
        total: 0,
      },
      tabList: [
        {
          label: '记账本',
          name: 'all',
        },
      ],
      columns:[
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
              return h(expandRow, {
                  props: {
                      row: params.row,
                      payList:this.payList
                  },
                  on:{
                    //确认收款
                    affirm:(value)=>{
                      this.affirmData = value;
                      this.affirmModal = true;
                    },
                    //编辑
                    edit:(value)=>{
                      this.getCode();
                      this.isNew = false;
                      this.getTwoItemList(value.acctId,value);
                      //this.editData = value;
                      this.modal = true;
                    },
                    //作废
                    cancel:(value)=>{
                        this.cancelRender(value);
                    },
                    //核销
                    check:(value)=>{
                        this.checkRender(value);
                    }
                  }
              })
          }
        },
        {
          title:'记账科目',
          render:(h,params)=>{
            return h('div', this.showTypeTex(params.row.type));
          },
        },
        {
          title:'房源',
          align:'center',
          render:(h,params)=>{
            return h('div',{},this.showAddressTex(params.row))
          }
        },
        {
          title:'记账项目',
          render:(h,params)=>{
            return h('div',{},params.row.acctName+'-'+params.row.acctDetailName)
          }
        },
        {
          title:'账期',
          width:180,
          render:(h,params)=>{
            return h('div',{},this.changeDate(params.row.startTime)+'至'+this.changeDate(params.row.endTime))
          }
        },
        {
          title:'应收/付金额（￥）',
          key:'money'
        },
        {
          title:'实收/付金额（￥）',
          //status 0未付 1已付
          render:(h,params)=>{
            if(params.row.status == '0'){
              return h('div',{},'-')
            }else{
              return h('div',{},params.row.money)
            }
          }

        },
        {
          title:'实收/付日期（￥）',
          render:(h,params)=>{
            if(params.row.status == '0'){
              return h('div',{},'-')
            }else{
              return h('div',{},this.changeDate(params.row.realDate))
            }
          }
        },
      ],
    }
  },
  computed:{
    whatType(){
      if(this.isNew){
        if(this.addData.type == '0'){
        //已收款
          return 'yetReceive'
        }else if(this.addData.type =='1'){
          //应收
          return 'receive'
        }else if(this.addData.type == '2'){
          //已付款
          return 'yetPay'
        }else{
          //未选择 或者 应付
          return 'pay'
        }
      }else{
        if(this.editData.type == '0'){
        //已收款
          return 'yetReceive'
        }else if(this.editData.type =='1'){
          //应收
          return 'receive'
        }else if(this.editData.type == '2'){
          //已付款
          return 'yetPay'
        }else{
          //未选择 或者 应付
          return 'pay'
        }
      }
    },

  },
  mounted() {
    //请求列表
    this.getList();
   //请求小区列表
   this.getCommunityList();
   //获取一级账单项目
   this.getOneItemList();
   //支付方式列表
   this.payWayList();
   //门店列表
   this.getStoreList();

  },
  methods: {
    checkRender(row){
      this.$Modal.confirm({
        onOk:()=>{
          if(this.checkMark == ''){
             this.$Message.error('核销信息未填写，核销失败!')
          }else{
            let submitData ={
              id:row.id,
              check_status:'1',
              check_reason:this.checkMark,
            };
            this.$ajax.put(
                    this,
                    this.$api.PUT_AFFIRM_NOTE.replace('{id}',row.id),
                    submitData,
                    (res) => {
                      if(res.code== '200'){
                        this.checkMark = '';
                        this.$Message.info('核销成功');
                        this.getList();
                      }
                    },
                )

            }
        },
        onCancel(){
          this.$Message.info('核销取消');
        },
        title:'记账核销',
        render: (h) => {
             return h('Input', {
                 props: {
                     type:'textarea',
                     value: this.checkMark,
                     autofocus: true,
                     placeholder: '请输入核销原因'
                 },
                 on: {
                     input: (val) => {
                         this.checkMark = val;
                     },
                 }
             })
         }
      })
    },
    cancelRender(row){
      this.$Modal.confirm({
        onOk:()=>{
          if(this.cancelMark == ''){
             this.$Message.error('作废信息未填写，作废失败!')
          }else{
            let submitData ={
              id:row.id,
              flag:'0',
              cancleReason:this.cancelMark,
            };
            this.$ajax.put(
                    this,
                    this.$api.PUT_AFFIRM_NOTE.replace('{id}',row.id),
                    submitData,
                    (res) => {
                      if(res.code== '200'){
                        this.cancelMark = '';
                        this.$Message.info('作废成功');
                        this.getList();
                      }
                    },
                )

            }
        },
        onCancel(){
          this.$Message.info('作废取消');
        },
        title:'记账作废',
        render: (h) => {
             return h('Input', {
                 props: {
                     type:'textarea',
                     value: this.cancelMark,
                     autofocus: true,
                     placeholder: '请输入作废原因'
                 },
                 on: {
                     input: (val) => {
                         this.cancelMark = val;
                     },
                 }
             })
         }
     })
    },

    //支付方式
    showPayTex(id){
      for(let i in this.payList){
        if(this.payList[i].id == id){
          return this.payList[i].name;
        }
      }
    },
    //房源地址
    showAddressTex(obj){
      let  {isRoomRelation,sectName,houseName,roomName,address} = obj;
      address=address==null?'':address
      if(isRoomRelation == '0'){
        return '无房源'
      }else{
        if(roomName){
          return address==null?'':address+ sectName+'-'+houseName+'-'+roomName;
        }else{
          return address==null?'':address+ sectName+'-'+houseName;
        }

      }
    },
    //记账类型
    showTypeTex(type){
      switch (type) {
        case '0':
          return '已收款（预收）';
        case '1':
          return '应收款';
        case '2':
          return '已付款（预付）';
        case '3':
          return '应付款';
        default:
          return '';
      }
    },
    //新增记账
    addNote(){
      this.getCode();
      this.isNew = true;
      this.modal = true;
    },
    //确认收付款点取消
    affirmCancel(){
      this.affirmModal = false;
    },
    //确认收付款
    affirmOk(){
      let submitData ={};
      submitData.note = this.affirmData.note;
      submitData.id = this.affirmData.id;
      submitData.realDate = this.affirmData.realDate;
      submitData.paymentWay = this.affirmData.paymentWay;
      submitData.status = '1';
      submitData.realDate=this.changeDate(submitData.realDate);
      this.$ajax.put(
          this,
          this.$api.PUT_AFFIRM_NOTE.replace('{id}',this.affirmData.id),
          submitData,
          (res) => {
            if(res.code== '200'){
              this.affirmData = {};
              this.$Message.info('确认收付款成功');
              this.affirmModal = false;
              this.getList();
            }
          },
      )
    },
    //改时间格式
    changeDate(date){
      if(date === undefined || date == '') return '';
      return moment(date).format('YYYY-MM-DD')
    },
    //记账列表
    getList(params={}){
      params.shoudeDateStart=this.changeDate(params.shoudeDateStart);
      params.shoudeDateEnd=this.changeDate(params.shoudeDateEnd);
      params.realDateStart=this.changeDate(params.realDateStart);
      params.realDateEnd=this.changeDate(params.realDateEnd);
      this.$ajax.post(
          this,
          this.$api.GET_NOTE_LIST,
          params,
          (res) => {
            this.searchData.total = res.data.content.data.totalRows;
            this.searchData.pageSize = res.data.content.data.pageSize;
            this.searchData.pageNo = res.data.content.data.page
            this.listData = res.data.content.data.content;
            this.titleData = res.data.content.title;
          }
      )
    },
    //记账方式列表
    payWayList(){
      this.$ajax.get(
        this,
        this.$api.GET_PAY_METHODS,
        {},
        (res) =>{
          const list = res.data.content;
          this.payList = list;
        }
      )
    },
    //门店列表
    getStoreList(){
      this.$ajax.get(
        this,
        this.$api.GET_USER_STORE,
        {},
        (res)=>{
          const list =res.data.content;
          this.storeList = list;
        }
      )
    },
    //一级账单项目
    getOneItemList(){
      this.$ajax.get(
        this,
        this.$api.NOTE_GET_CUSTOMACCTYPE.replace('{id}','1'),
        {},
        (res) => {
          const list = res.data.content;
          this.oneItemList  = list;
      })
    },
    //二级账单项目
    getTwoItemList(val,data){
      this.$ajax.get(
        this,
        this.$api.NOTE_GET_CUSTOMACCTYPE.replace('{id}',val),
        {},
        (res) => {
          this.twoItemList = [];
          const list = res.data.content;
          this.twoItemList  = list;
          if(data){
            this.editData = data;
          }
      })
    },
    //一级账单项目改变 新增，搜索，编辑
    itemChangeAdd(item){
      this.itemChange(item,'add')
    },
    itemChangeEdit(item){
      this.itemChange(item,'edit')
    },
    itemChangeSearch(item){
      this.itemChange(item,'search')
    },
    childItemChangeAdd(item){
      this.childItemChange(item,'add')
    },
    childItemChangeEdit(item){
      this.childItemChange(item,'edit')
    },
    childItemChangeSearch(item){
      this.childItemChange(item,'search')
    },

    //二级账单项目改变 新增 编辑 搜索
    itemChange(item,type){
    if(!item){ return }
          if(type != 'search'){
            this[type+'Data'].acctName = item.label;
            this[type+'Data'].acctDetailName ='';
          };
          this.twoItemList = [];
          this.$delete(this[type+'Data'],'acctDetailId');
          this.getTwoItemList(item.value);
    },
    //二级账单项目改变
    childItemChange(item,type){
      if(!item){ return }

      if(type != 'search'){
        this[type+'Data'].acctDetailName = item.label
      };

    },
    //  小区改变
    buildChangeAdd(val){
      this.buildChange(val,'add')
    },
    buildChangeSearch(val){
      this.buildChange(val,'search')
    },
    //房门改变
    houseChangeAdd(val){
      this.houseChange(val,'add')
    },
    houseChangeSearch(val){
      this.houseList.forEach((e)=>{
        if(e.id == val.value){
          if(e.leaseType == '1'){
            // 整租
            this.searchHomeType=false;
          }else{
            this.searchHomeType=true;
          }
        }
      })
      this.houseChange(val,'search')
    },
    //房屋改变
    roomChangeAdd(val){
      this.roomChange(val,'add')
    },
    roomChangeSearch(val){
      this.roomChange(val,'search')
    },
    buildChange(val,type){//add  search
      if(!val){ return }

        if(type != 'search'){
          this[type+'Data'].sectName = val.label;
        };
        this[type+'Data'].houseId = '';
        this[type+'Data'].roomId = '';

        this.houseList = [];
        this.roomList = [];

        this.getHouseList(val.value);
    },
    houseChange(val,type){
      if(!val){ return }
        //清空房间号
        this[type+'Data'].roomId = '';
        if(type != 'search'){
          this[type+'Data'].houseName = val.label;
          //整租隐藏房间选项 分租展示
          this.houseList.forEach(item =>{
            if(item.id ==val.value){
              if(item.leaseType == '1'){
                //整租
                this.isDisperse = false;
              }else{
                //分租
                this.isDisperse = true;
              }
            }
          })
        };
        this.roomList = [];
        this.getRoomList(val.value);
    },
    roomChange(val,type){
      if(!val){ return }

      this[type+'Data'].roomId = val.value;

      if(type != 'search'){
          this[type+'Data'].roomName = val.label;
        };
    },

    getCommunityList(){
      this.$ajax.get(
        this,
        this.$api.NOTE_COMMUNITY_LIST,
        {},
        (res) => {
          const list = res.data.content;
          this.communityList  = list;
      })
    },
    getHouseList(val){
      this.$ajax.get(
        this,
        this.$api.NOTE_HOUSE_LIST,
        {communityId:val},
        (res) =>{
          let list = res.data.content;
          /*if( list.length>=1 ){
            //分散式
            list.forEach((item)=>{
              if(item.buildType == '0'){
                let unitNo  = item.unitNo ? item.unitNo+'-':'',
                    buildingCode= item.buildingCode ? item.buildingCode+'-':'';
                item.name = unitNo + buildingCode + item.roomNo;
              }else{
                //集中式
                item.name =item.roomNo ;
              }
            })
          }*/
          this.houseList = list;
        }
      )
    },
    getRoomList(val){
      this.$ajax.get(
        this,
        this.$api.NOTE_ROOM_LIST,
        {houseId:val},
        (res) => {
          const list = res.data.content;
          this.roomList  = list;
      })
    },
    resetForm(){
      this.$refs['editForm'].resetFields();
      this.$refs['noteForm'].resetFields();
    },
    roomTypeChange(value){
      if(value == '1'){
        this.roomDisabled = false;
      }else{
        this.roomDisabled = true;
        this.addData.sectId = '';
        this.addData.houseId = '';
        this.addData.roomId = '';
      }
      //value == '1'? this.roomDisabled = false : this.roomDisabled = true;
    },
    uploadCompleteAdd(response){
      this.uploadComplete(response,'add')
    },
    uploadCompleteEdit(response){
      this.uploadComplete(response,'edit')
    },
    uploadComplete(response,type){
      let data = response.data.content;
      if(type == 'add'){
        this.picList.push({
          picId: data.id,
          picPath: data.path,
          type: "manual"
        });
        this.$refs.noteForm.validateField("pic");
      }else{
        this.editData.resourcePics.push({
          picId: data.id,
          picPath: data.path,
          type: "manual"
        })
        this.$refs.editForm.validateField("pic");
      }

    },
    uploadRemoveAdd(item,index){
      this.uploadRemove(item,index,'add');
    },
    uploadRemoveEdit(item){
      this.uploadRemove(item,index,'edit');
    },
    // 图片删除
    uploadRemove(item,index,type) {
      if(type == 'add'){
        if(item.flag && item.flag == 'phone'){
              this.$ajax.delete(this, this.$api.DELETE_FILE_UPLOAD_POST.replace("{code}", this.code).replace("{id}",
                  item.picId), {}, res => {
                      this.picList.splice(index,1);
                      this.$refs.noteForm.validateField("pic");
              });
          }else{
              this.picList.splice(index,1);
              this.$refs.noteForm.validateField("pic");
          }
      }else{
        if(item.flag && item.flag == 'phone'){
              this.$ajax.delete(this, this.$api.DELETE_FILE_UPLOAD_POST.replace("{code}", this.code).replace("{id}",
                  item.picId), {}, res => {
                      this.editData.resourcePics.splice(index,1);
                      this.$refs.editForm.validateField("pic");
              });
          }else{
              this.editData.resourcePics.splice(index,1);
              this.$refs.editForm.validateField("pic");
          }
      }
    },
    // 同步手机端上传图片
    getReturnEdit(){
        this.$ajax.get(
            this,
            this.$api.GET_FILE_UPLOAD_POST.replace("{code}", this.code), {},
            res => {
                if(res.data.content.length>0){
                    let data=res.data.content;
                    if(this.editData.resourcePics.length==0){
                        data.forEach((d)=>{
                            this.picList.push({
                                picId:d.id,
                                picPath:d.path,
                                flag:'phone'
                            })
                        })
                    }else{
                        data.forEach((d)=>{
                            let flag=true;
                            this.editData.resourcePics.forEach((e)=>{
                                if(d.id==e.picId){
                                    flag=false;
                                }
                            })
                            if(flag){
                                this.editData.resourcePics.push({
                                    picId:d.id,
                                    picPath:d.path,
                                    flag:'phone'
                                })
                            }
                        })
                    }
                    this.$refs.editForm.validateField("pic");
                }
            }
        );
    },
    // 同步手机端上传图片
    getReturnAdd(){
        this.$ajax.get(
            this,
            this.$api.GET_FILE_UPLOAD_POST.replace("{code}", this.code), {},
            res => {
                if(res.data.content.length>0){
                    let data=res.data.content;
                    if(this.picList.length==0){
                        data.forEach((d)=>{
                            this.picList.push({
                                picId:d.id,
                                picPath:d.path,
                                flag:'phone'
                            })
                        })
                    }else{
                        data.forEach((d)=>{
                            let flag=true;
                            this.picList.forEach((e)=>{
                                if(d.id==e.picId){
                                    flag=false;
                                }
                            })
                            if(flag){
                                this.picList.push({
                                    picId:d.id,
                                    picPath:d.path,
                                    flag:'phone'
                                })
                            }
                        })
                    }
                    this.$refs.noteForm.validateField("pic");
                }
            }
        );
    },
    ok () {
      if(this.isNew){
        this.addData.resourcePics = this.picList;
        let params=JSON.parse(JSON.stringify(this.addData));
        params.startTime=this.changeDate(params.startTime);
        params.endTime=this.changeDate(params.endTime);
        params.realDate=this.changeDate(params.realDate);
        params.shoudeDate=this.changeDate(params.shoudeDate);
        params.acctSignId = params.acctName+'-'+params.acctDetailName;
        this.$refs.noteForm.validate(valid => {
          if (!valid) return;
            this.$ajax.post(
                this,
                this.$api.POST_ADD_MANUAL,
                params,
                (res) => {
                  if(res.code== '200'){
                    this.picList = [];
                    this.addData = {};
                    this.$Message.info('新增成功');
                    this.modal = false;
                    this.getList();
                    this.resetForm()
                  }
                },
            )
        })

      }else{
        this.editData.resourcePics.forEach((item)=>{
          delete item.createTime;
        })
        delete this.editData.createTime;
        this.editData.acctSignId = this.editData.acctName+'-'+this.editData.acctDetailName;

        this.$refs.editForm.validate(valid=>{
          if(!valid) return;
          this.$ajax.put(
              this,
              this.$api.PUT_AFFIRM_NOTE.replace('{id}',this.editData.id),
              this.editData,
              (res) => {
                if(res.code== '200'){
                  this.$Message.info('修改成功');
                  this.modal = false;
                  this.getList();
                  this.resetForm()
                }
              },
          )
        })


      }

    },
    cancel () {
      this.picList = [];
      this.addData = {};
      this.editData ={};
      this.modal = false;
      this.resetForm()
    },
    getCode(){
        this.$ajax.get(this, this.$api.GET_FILE_UPLOAD_CODE_GET, {}, res => {
            this.code = res.data.content.code;
        });
    },
    changePage(page) {
      this.searchData.pageNo = page;
      this.getList(this.searchData);
    },
    restSearch(){
      this.searchData ={};
      this.getList();
    },
    // 处理搜索的参数
    handleSearch() {
      this.searchData.pageNo = 1;
      this.getList(this.searchData);
    }
  },
}
</script>

<style scoped>
.summary{
  height: 70px;
  background: #fafafa;
  padding: 9px 21px;
  margin-bottom: 20px;
}

.right{
  line-height: 50px;
  border-left:1px solid silver;
  padding-left: 40px;
}
.item{
  font-weight: bold;
}
.item .ivu-select{
  padding-left: 5px;
}
.pager{
  margin: 5px;
}
</style>
