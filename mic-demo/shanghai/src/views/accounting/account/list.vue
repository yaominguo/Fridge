<template>
  <Card dis-hover>
    <Tabs v-model="tabName" :animated="false" class="tab-container">
      <TabPane
        v-for="tab in tabList"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name">
        <div>
          <div class="filter">
            <div>
              <span><Icon type="ios-funnel" /> 快速筛选：</span>
              <!-- <Badge :count="summary.arrearage" style="zIndex: 5;"> -->
                <RadioGroup @on-change="requestData" type="button" v-model="filterStatus">
                  <Radio v-for="item in filters" :key="item.value" :label="item.value">
                    <Badge v-if="item.value === '3'" :count="summary.arrearage" style="zIndex: 5;">
                      <span>{{item.label}}</span>
                    </Badge>
                    <span v-else>{{item.label}}</span>
                  </Radio>
                </RadioGroup>
              <!-- </Badge> -->
               <!-- 加一个 全部账单 租客账单 房东账单 -->
              <RadioGroup v-if="isPublic" style="margin-left: 50px;" @on-change="requestData2" type="button" v-model="realNameType">
                  <Radio key="all" label="all">
                    <span>全部账单</span>
                  </Radio>
                  <Radio key="0" label="0">
                    <span>租客账单</span>
                  </Radio>
                  <Radio key="1" label="1">
                    <span>房东账单</span>
                  </Radio>
                </RadioGroup>
            </div>
            <!-- <Input :placeholder="placeholder" style="width: 30%;"  /> -->
          </div>
          <SearchForm @toReceive="showBatchModal" @reset="handleSearch" @search="handleSearch" :isSelect="selectedData.length > 0" :tab="tabName" :status="filterStatus"/>
          <Divider style="margin: 16px 0;" />
          <div v-show="isTenantTab" class="summary">
            <div>
              总账单：<span>{{$com.toMoney(summary.waitReceive)}}</span>元（{{summary.totalCount}}笔）
            </div>
            <div>
              已收：<span>{{$com.toMoney(summary.received)}}</span>元
            </div>
            <div>
              待收：<span>{{$com.toMoney(summary.receivable)}}</span>元（{{summary.countReceived}}笔）
            </div>
          </div>
          <div v-show="!isTenantTab" class="summary">
            <div>
              应付金额：<span>{{$com.toMoney(summary.waitReceive)}}</span>元（{{summary.totalCount}}笔）
            </div>
            <div>
              已付金额：<span>{{$com.toMoney(summary.received)}}</span>元
            </div>
            <div>
              待付金额：<span>{{$com.toMoney(summary.receivable)}}</span>元（{{summary.countReceived}}笔）
            </div>
          </div>
          <ActiveTable
            :columns="layout"
            :data="dataResource"
            :total="total"
            :pageSize="pageSize"
            :current="pageNo"
            @on-select-change="handleSelect"
            @on-page-change="changePage"
          />
        </div>
      </TabPane>
      <!-- <div slot="extra">
        <Button type="primary">导出</Button>
      </div> -->
    </Tabs>
    <Modal
      v-model="openModal"
      :title="isTenantTab ? '确认收款' : '确认付款'"
      :width="400"
      :footer-hide="true">
      <Form v-if="openModal" ref="receiveForm" :label-width="80" label-position="right" :rules="rules" :model="receiveModel">
        <FormItem :label="isTenantTab ? '收款方式' : '付款方式'" prop="receivedChannel">
          <Select v-model="receiveModel.receivedChannel" :placeholder="isTenantTab ? '请选择收款方式' : '请选择付款方式'">
            <Option v-for="item in payWayList" :key="item.name" :value="item.name">{{item.name}}</Option>
            <!-- <Option value="现金">现金</Option>
            <Option value="支付宝">支付宝</Option> -->
          </Select>
        </FormItem>
        <FormItem :label="isTenantTab ? '收款金额' : '付款金额'" prop="received">
          <Input disabled v-model="receiveModel.received" :placeholder="isTenantTab ? '请输入收款金额' : '请输入付款金额'"/>
        </FormItem>
        <FormItem :label="isTenantTab ? '收款日期' : '付款日期'" prop="receivedTime">
          <DatePicker v-model="receiveModel.receivedTime" :placeholder="isTenantTab ? '请选择收款日期' : '请选择付款日期'"/>
        </FormItem>
        <FormItem label="凭证编号">
          <Input v-model="receiveModel.code" />
        </FormItem>
        <!-- <FormItem label="照片凭证">
          <ImgUploader
            :defaultList="imgList"
            @on-complete="uploadComplete"
            @on-remove="removeImg"
            :url="$api.IMG_UPLOAD_URL"
            :maxUploads="3"
            uploadButton="btn"
          />
        </FormItem> -->
        <FormItem :label="isTenantTab ? '收款备注' : '付款备注'">
          <Input v-model="receiveModel.note" type="textarea" />
        </FormItem>
        <div style="textAlign: center;">
          <Button type="primary" @click="receiveMoney">提交</Button>
        </div>
      </Form>
    </Modal>
    <Modal
      v-model="batchModal"
      :title="isTenantTab ? '批量收款' : '批量付款'"
      :width="400"
      :footer-hide="true">
      <Form v-if="batchModal" ref="batchForm" :label-width="80" label-position="right" :rules="rules" :model="batchModel">
        <FormItem :label="isTenantTab ? '收款方式' : '付款方式'" prop="receivedChannel">
          <Select disabled v-model="batchModel.receivedChannel" placeholder="请选择收款方式">
            <Option v-for="item in payWayList" :key="item.name" :value="item.name">{{item.name}}</Option>
            <!-- <Option value="现金">现金</Option>
            <Option value="支付宝">支付宝</Option> -->
          </Select>
        </FormItem>
        <FormItem label="总金额" prop="received">
          <Input disabled v-model="batchModel.received"/>
        </FormItem>
        <FormItem :label="isTenantTab ? '收款日期' : '付款日期'" prop="receivedTime">
          <DatePicker v-model="batchModel.receivedTime" :placeholder="isTenantTab ? '请选择收款日期' : '请选择付款日期'"/>
        </FormItem>
        <div style="textAlign: center;">
          <Button type="primary" @click="batchReceiveMoney">提交</Button>
        </div>
      </Form>
    </Modal>
    <!-- 收款Modal -->
    <Modal :mask-closable="false" v-model="tollShow" title="收款" @on-cancel="cancleTollData">
        <Form
            ref="tollData"
            :model="tollData"
            :rules="tollRule"
            :label-width="110"
        >
        <FormItem label="收款方式" prop="deduType">
            <Select placeholder="请选择收款方式"  v-model="tollData.deduType">
                <Option v-for="(item,index) in paymentData" :key="index" :label="item.name" :value="item.name"></Option>
            </Select>
        </FormItem>
        <FormItem label="收款金额" prop="deduAmount" class="ivu-form-item-required">
            <Row>
                <Col span="12">
                    <Input placeholder="请输入收款金额" v-model="tollData.deduAmount"></Input>
                </Col>
                <Col span="1">
                    &nbsp;
                </Col>
                <Col v-if="this.tollData.deduType=='预付款'" span="11">
                    <span v-if="rechargeBalance != null && rechargeBalance != ''">剩余余额：{{data.rechargeBalance}}元</span>
                    <span v-else>剩余余额:0元</span>
                </Col>
                <Col v-else span="11">
                    剩余收款：{{(Number(receivableCheck)-Number(received)).toFixed(2)}}元
                </Col>
            </Row>
        </FormItem>
        <!-- <FormItem label="照片凭证" prop="pic" class="ivu-form-item-required" v-if="this.tollData.deduType=='预付款'">
            <imageUpload
                :uploadButton="'upload'"
                :isPhone="true"
                :url="$api.FILE_UPLOAD_POST"
                :defaultList="defaultList2"
                @on-complete="uploadComplete"
                @on-remove="uploadRemove"
                @showUploadImg="getReturn"
                :code="code"
            ></imageUpload>
        </FormItem> -->
        <FormItem v-if="this.tollData.deduType!='预付款'" label="凭证编号" prop="code">
            <Input placeholder="请输入凭证编号" v-model="tollData.code"></Input>
        </FormItem>
        <!-- receivedTime -->
        <FormItem label="收款日期" prop="receivedTime">
            <DatePicker placeholder="请选择收款日期" :options="options" v-model="tollData.receivedTime" @on-change="tollData.receivedTime=$event" format="yyyy-MM-dd" />
        </FormItem>
        <FormItem label="备注" prop="remarks">
            <Input placeholder="备注" type="textarea" v-model="tollData.remarks"></Input>
        </FormItem>
        </Form>
        <div slot="footer">
            <Button type="primary" @click="cancleTollData" ghost>取消</Button>
            <Button type="primary" @click="saveTollData('tollData')">保存</Button>
        </div>
    </Modal>
  </Card>
</template>

<script>
import SearchForm from './search';
import ImageUpload from "@/components/Helper/Form/image-upload.vue"
import ActiveTable from "@/components/Helper/Table/ActiveTable.vue"
import moment from 'moment';
export default {
  name: 'AccountList',
  components: {
    SearchForm,
    ImageUpload,
    ActiveTable,
  },
  data() {
    const VadeduAmount=(rule,value,callback)=>{
        if(this.tollData.deduAmount === ''){
            callback(new Error('请输入收款金额'));
        }else{
            if(isNaN(this.tollData.deduAmount)){
                callback(new Error('请输入大于0的数字'));
            }else{
                if(this.tollData.deduAmount<=0){
                    callback(new Error('请输入大于0的数字'));
                }else{
                    setTimeout(()=>{
                        this.tollData.deduAmount=Number(this.tollData.deduAmount).toFixed(2);
                        if(Number(this.tollData.deduAmount)>Number((Number(this.receivableCheck)-Number(this.received)).toFixed(2))){
                            callback(new Error('输入金额不能大于应收款金额'))
                        }else{
                            callback();
                        }
                    },200)
                }
            }
        }
    }
    return {
      // 收款----
      tollShow:false,
      tollData:{
          deduType:'0',
          deduAmount:''
      },
      tollRule:{
          deduType:[
              { required: true, message: '请选择收款方式', trigger: 'change' }
          ],
          deduAmount:[
              { validator: VadeduAmount, trigger: 'blur' }
          ],
          receivedTime:[
              { required: true, message: '请选择收款日期',},
          ]
      },
      options: {
          disabledDate (date) {
              return date && date.valueOf() > Date.now();
          }
      },
      receivableCheck:'',
      received:'',
      rechargeBalance:'',
      // tollLoading:false,
      paymentData:[],
      billingData:{},
      //支付方式
      payWayList:[],

      pageNo: 1,
      pageSize: 10,
      total: 0,
      tabName: 'tenant',
      openModal: false,
      batchModal: false,
      filterStatus: 'all',
      realNameType:'all',
      imgList: [],
      summary: {
        waitReceive : 0,
        received : 0,
        receivable : 0,
        totalCount: 0,
        countReceived: 0,
        arrearage: 0,
      },
      tabList: [
        {
          label: '租客账单',
          name: 'tenant',
        },
        // {
        //   label: '业主账单',
        //   name: 'owner',
        // },
        // {
        //   label:'公共事业账单',
        //   name:'public'
        // }
      ],
      tenantFilters: [
        {
          label: '全部账单',
          value: 'all',
        },
        {
          label: '待收款',
          value: '0',
        },
        {
          label: '已收款',
          value: '2',
        },
        {
          label: '欠费',
          value: '3',
        },
        {
          label: '已取消',
          value: '4',
        },
        {
          label: '已退房结算',
          value: '5',
        },
      ],
      ownerFilters: [
        {
          label: '全部账单',
          value: 'all',
        },
        {
          label: '待付款',
          value: '0',
        },
        // {
        //   label: '未付款',
        //   value: '1',
        // },
        {
          label: '已付款',
          value: '2',
        },
        {
          label: '已取消',
          value: '4',
        },
      ],
      publicColumns:[
        {
          title: '房源',
          key: 'address',
          minWidth: 200,
          fixed: 'left',
        },
        {
          title:'付款方式',
          minWidth: 150,
          render:(h,params)=>{
            if(params.row.realNameType == '0'){
              return h('div','租客付款')
            }else if(params.row.realNameType == '1'){
              return h('div','房东付款')
            }
          }
        },
        {
          title: '承租人',
          key: 'leaseUserName',
          minWidth: 150,
         /* render: (h, params) => {
            const tip = h('Tooltip', {
              props: {
                content: params.row.phone,
              }
            }, [
              h('Icon', {
                props: {
                  type: 'ios-call',
                  size: 14,
                },
                style: {
                  cursor: 'pointer',
                  marginLeft: '5px',
                }
              })
            ]);
            return h('div', [
              h('span', params.row.name),
              params.row.phone ? tip : null,
            ]);
          },*/
        },
        {
          title: '账单项目',
          key: 'acctName',
          minWidth: 150,
        },
        {
          title: '账单金额（￥）',
          key: 'receivable',
          minWidth: 150,
        },
        {
          title: '应收款日',
          key: 'receivableDay',
          minWidth: 150,
          render: (h, params) => {
            return h('div', params.row.receivedTime && (params.row.receivedTime).split(' ')[0]);
          },
        },
        {
          title: '已收款（￥）',
          key: 'received',
          minWidth: 150,
          render: (h, params) => {
            return h('div', params.row.received || 0);
          },
        },
        {
          title: '账单状态',
          key: 'status',
          align: 'center',
          minWidth: 120,
          render: (h, params) => {
            return h('div', [
              h('Tag', {
                props: {
                  color: this.$com.transformCheckinStatus(params.row.status).color,
                },
              }, this.$com.transformCheckinStatus(params.row.status).txt)
            ])
          },
        },
       /* {
          title: '备注',
          key: 'note',
          minWidth: 150,
        },*/
        {
          title: '操作',
          key: 'actions',
          align: 'center',
          minWidth: 150,
          fixed: 'right',
          render: (h, params) => {
            const pay = h('Button', {
                props: {
                  type: 'default',
                  size: 'small'
                },
                on: {
                  click: () => {
                    alert('支付')
                    //this.showModal(params.row);
                  }
                }
              }, '支付');
            const anotherPay = h('Button', {
                props: {
                  type: 'default',
                  size: 'small'
                },
                on: {
                  click: () => {
                    alert('代付')
                    //this.showModal(params.row);
                  }
                }
              }, '代付');;
            if(params.row.status == '0' || params.row.status == '3'){//待付款 欠费
              if(params.row.realNameType == '0'){
                return h('div',[anotherPay])
              }else if(params.row.realNameType == '1'){
                return h('div',[pay])
              }
            }

          }
        },


      ],
      columns: [
        {
          type: 'selection',
          width: 50,
          align: 'center',
          fixed: 'left',
        },
        {
          title: '房源',
          key: 'roomName',
          minWidth: 200,
          fixed: 'left',
        },
        {
          title: '承租人',
          key: 'name',
          minWidth: 150,
          render: (h, params) => {
            const tip = h('Tooltip', {
              props: {
                content: params.row.phone,
              }
            }, [
              h('Icon', {
                props: {
                  type: 'ios-call',
                  size: 14,
                },
                style: {
                  cursor: 'pointer',
                  marginLeft: '5px',
                }
              })
            ]);
            return h('div', [
              h('span', params.row.name),
              params.row.phone ? tip : null,
            ]);
          },
        },
        {
          title: '账单项目',
          key: 'acctName',
          minWidth: 150,
        },
        {
          title: '账单金额（￥）',
          key: 'receivable',
          minWidth: 150,
        },
        {
          title: '应收款日',
          key: 'receivableDay',
          minWidth: 150,
          render: (h, params) => {
            return h('div', params.row.receivableDay && (params.row.receivableDay).split(' ')[0]);
          },
        },
        {
          title: '已收款（￥）',
          key: 'received',
          minWidth: 150,
          render: (h, params) => {
            let _deuc=Number(params.row.policyDeduc || 0)+Number(params.row.tempDeduc);
            if(_deuc !== 0){
              return h('div', (params.row.received || 0) + '（已抵扣'+_deuc+'元）');
            }else{
              return h('div', params.row.received || 0);
            }
          },
        },
        {
          title: '收款方式',
          key: 'receivedChannel',
          minWidth: 150,
          render: (h, params) => {
            return h('div', params.row.receivedChannelName || '暂无');
          },
        },
        {
          title: '账单状态',
          key: 'status',
          align: 'center',
          minWidth: 120,
          render: (h, params) => {
            return h('div', [
              h('Tag', {
                props: {
                  color: this.$com.transformCheckinStatus(params.row.status).color,
                },
              }, this.$com.transformCheckinStatus(params.row.status).txt)
            ])
          },
        },
        {
          title: '备注',
          key: 'note',
          minWidth: 150,
        },
        {
          title: '操作',
          key: 'actions',
          align: 'center',
          minWidth: 150,
          fixed: 'right',
          render: (h, params) => {
            // let _receivable=Number(params.row.receivable)-Number(params.row.policyDeduc)-Number(params.row.tempDeduc);
            // console.log(_receivable);
            let all=params.row.receivable == null ? '0' : params.row.receivable;
              all=Number(all.replace(',',''));
              let _receivable=
              Number(all)
              -Number(params.row.policyDeduc == null ? '0' : params.row.policyDeduc )
              -Number(params.row.tempDeduc == null ? '0' : params.row.tempDeduc);


            let money=h('Button', {
                props: {
                  type: 'default',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.showBilling(params.row);
                  }
                }
              }, '收款');
            let view=h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                },
                style: {
                  marginRight: '5px',
                },
                on: {
                  click: () => {
                    this.routerToDetail(params.row);
                  }
                }
              }, '查看');
              let arr=[];
              let received=params.row.received == null ? '0':params.row.received;
              if(params.row.status == '0' || params.row.status=='3'){
                arr.push(view,money)
              }else if(params.row.status == '2'){
                if(_receivable != (received.replace(',',''))){
                  arr.push(view,money)
                }else{
                  arr.push(view);
                }
              }else{
                arr.push(view);
              }
              return arr;
            // console.log(params);
            // const btn = h('Button', {
            //     props: {
            //       type: 'default',
            //       size: 'small'
            //     },
            //     on: {
            //       click: () => {
            //         this.showBilling(params.row);
            //       }
            //     }
            //   }, '收款');
            // return h('div', [
            //   h('Button', {
            //     props: {
            //       type: 'primary',
            //       size: 'small',
            //     },
            //     style: {
            //       marginRight: '5px',
            //     },
            //     on: {
            //       click: () => {
            //         this.routerToDetail(params.row);
            //       }
            //     }
            //   }, '查看'),
            //   params.row.status == '2' ? null : btn
            // ]);



          }
        },
      ],
      ownerColumns: [
        {
          type: 'selection',
          width: 50,
          align: 'center',
          fixed: 'left',
        },
        {
          title: '房源',
          key: 'roomName',
          minWidth: 200,
          fixed: 'left',
        },
        {
          title: '业主',
          key: 'name',
          minWidth: 150,
          render: (h, params) => {
            const tip = h('Tooltip', {
              props: {
                content: params.row.phone,
              }
            }, [
              h('Icon', {
                props: {
                  type: 'ios-call',
                  size: 14,
                },
                style: {
                  cursor: 'pointer',
                  marginLeft: '5px',
                }
              })
            ]);
            return h('div', [
              h('span', params.row.name),
              params.row.phone ? tip : null,
            ]);
          },
        },
        {
          title: '账单项目',
          key: 'acctName',
          minWidth: 150,
        },
        {
          title: '账单金额（￥）',
          key: 'receivable',
          minWidth: 150,
        },
        {
          title: '应付款日',
          key: 'receivableDay',
          minWidth: 150,
          render: (h, params) => {
            return h('div', params.row.receivableDay && (params.row.receivableDay).split(' ')[0]);
          },
        },
        {
          title: '已付款（￥）',
          key: 'received',
          minWidth: 150,
          render: (h, params) => {
            return h('div', params.row.received || 0);
          },
        },
        {
          title: '付款方式',
          key: 'receivedChannelName',
          minWidth: 150,
          render: (h, params) => {
            return h('div', params.row.receivedChannelName || '暂无');
          },
        },
        {
          title: '账单状态',
          key: 'status',
          align: 'center',
          minWidth: 120,
          render: (h, params) => {
            return h('div', [
              h('Tag', {
                props: {
                  color: this.$com.transformCheckoutStatus(params.row.status).color,
                },
              }, this.$com.transformCheckoutStatus(params.row.status).txt)
            ])
          },
        },
        {
          title: '备注',
          key: 'note',
          minWidth: 150,
        },
        {
          title: '操作',
          key: 'actions',
          align: 'center',
          minWidth: 150,
          fixed: 'right',
          render: (h, params) => {
            const btn = h('Button', {
                props: {
                  type: 'default',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.showModal(params.row);
                  }
                }
              }, '付款');
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                },
                style: {
                  marginRight: '5px',
                },
                on: {
                  click: () => {
                    this.routerToDetail(params.row);
                  }
                }
              }, '查看'),
              params.row.status == '2' ? null : btn,
            ]);
          }
        },
      ],
      dataResource: [],
      searchQuery: {},
      selectedData: [],
      receiveModel: {},
      batchModel: {},
      rules: {
        receivedChannel: [
          {
          required: true,
          message: this.isTenantTab ? '请选择收款方式' : '请选择付款方式',
          trigger: 'change',
          },
        ],
        received: [
          {
          required: true,
          type: 'number',
          message: '请输入金额',
          trigger: 'blur',
          },
        ],
        receivedTime: [
          {
          required: true,
          message: '请选择日期',
          },
        ],
      },
    };
  },
  methods: {
    changePage(page) {
      this.pageNo = page;
      if (this.filterStatus !='2' && this.filterStatus !='all') {
        this.searchQuery.paymentChannel = null;
      }
      this.getAccountList(this.searchQuery);
    },
    requestData() {
      this.pageNo = 1;
      if (this.filterStatus !='2' && this.filterStatus !='all') {
        this.searchQuery.paymentChannel = null;
      }
      if(this.isPublic){
        this.getPublicList(this.searchQuery);
      }else{
        this.getAccountList(this.searchQuery);

      }
    },
    //付款方式搜索
    requestData2() {
      this.pageNo = 1;
      this.getPublicList(this.searchQuery);
    },
    showBatchModal() { // 批量收款modal
      const sum = (...arr) => [].concat(...arr).reduce((acc, val) => acc + val, 0); //求和
      const numList = this.selectedData.map(item => {
        const num = item.receivable.toString().split(',').join('');
        return Number(num);
      })
      this.batchModel = {
        receivedChannel: '现金',
        received: Number(sum(numList).toFixed(2)),
      }
      this.batchModal = true;
    },
    showModal(data) {
      this.receiveModel = {
        id: data.id,
        received: data.receivable.toString().split(',').join(''),
      };
      this.openModal = true;
    },
    handleSearch(res) {

      let data = res.data;
      this.payWayList = res.payWayList;
      this.paymentData=res.payWayList;
      this.pageNo = 1;
      if(this.isPublic){
        this.getPublicList(data);
      }else{
        this.getAccountList(data);
      }

    },
    //改时间格式
    changeDate(date) {
        if (!date || date == '') {
            return ''
        }
        return moment(date).format('YYYY-MM-DD')
    },
    getAccountList(query = {}) {
      this.searchQuery = query;
      const params = Object.assign(query, {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        leaseType: this.tabName == 'tenant' ? '0' : '1',
        status: this.filterStatus == 'all' ? null : this.filterStatus,
      });
      params.endTime=this.changeDate(params.endTime);
      params.startTime=this.changeDate(params.startTime);
      this.$ajax.get(
        this,
        this.$api.GET_ACCOUNT_LIST,
        params,
        (res) => {
          if (!res.data.content) return;
          this.total = res.data.totalRows;
          this.summary = res.data.content[0][0];
          const data = res.data.content[1];
          if (!data || data.length <= 0) {
            this.dataResource = [];
            return;
          };
          this.dataResource = data.map(item => {
            if (item.status == '2') { // 如果已收款状态则不可选
              item._disabled = true;
            };
            return item;
          });
        },
      );
    },
    getPublicList(query = {}) {
      this.searchQuery = query;
      const params = Object.assign(query, {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        status: this.filterStatus == 'all' ? null : this.filterStatus,
        realNameType:this.realNameType =='all'?null:this.realNameType,
      });
      params.endTime=this.changeDate(params.endTime);
      params.startTime=this.changeDate(params.startTime);
      this.$ajax.get(
        this,
        this.$api.GET_PUBLIC_LIST,
        params,
        (res) => {
          if (!res.data.content) return;
          this.total = res.data.totalRows;
          this.summary = res.data.content[0][0];
          const data = res.data.content[1];
          if (!data || data.length <= 0) {
            this.dataResource = [];
            return;
          };
          this.dataResource = data.map(item => {
            if (item.status == '2') { // 如果已收款状态则不可选
              item._disabled = true;
            };
            return item;
          });
        },
      );
    },
    routerToDetail(data) {
      this.$router.push({
        name: 'contract-detail',
        params: {
          tab: 'account',
          leaseId: data.id || '',
          roomId: data.roomId || '',
          fromAccount: '1',
        }
      })
    },
    receiveMoney() { // 收付款
      this.receiveModel.received = Number(this.receiveModel.received);
      this.$refs.receiveForm.validate(valid => {
        if (!valid) return;
        this.$ajax.put(
          this,
          this.$api.PUT_RECEIVE_MONEY,
          this.receiveModel,
          (res) => {
            this.$Message.success(this.isTenantTab ? '收款成功' : '付款成功');
            this.openModal = false;
            this.receiveModel = {};
            this.getAccountList();
          },
        )
      })
    },
    batchReceiveMoney() { // 批量收付款
      this.batchModel.ids = this.selectedData.map(item => item.id);
      this.$refs.batchForm.validate(valid => {
        if (!valid) return;
        this.$ajax.put(
          this,
          this.$api.PUT_RECEIVE_BATCH,
          this.batchModel,
          (res) => {
            this.$Message.success(this.isTenantTab ? '批量收款成功' : '批量付款成功');
            this.batchModal = false;
            this.batchModel = {};
            this.getAccountList();
          },
        )
      })
    },
    handleSelect(list) {
      this.selectedData = list;
    },
    // 单个收款按钮
    showBilling(row){
      let all=row.receivable == null ? '0' : row.receivable;
      all=Number(all.replace(',',''));
      this.receivableCheck=
      Number(all)
      -Number(row.policyDeduc == null ? '0' : row.policyDeduc )
      -Number(row.tempDeduc == null ? '0' : row.tempDeduc);
      let received=row.received == null ? '0':row.received;
      this.received=Number(received.replace(',',''));
      this.billingData=row;
      this.tollData.deduAmount='';
      this.tollShow=true;
    },
    saveTollData(name){
    this.$refs[name].validate((valid)=>{

        if(!valid) return;
        // this.tollLoading=true;
        // RECHARGE_USING
        let params={};
        let url;
        let methods;
        if(this.tollData.deduType=='预付款'){
            url=this.$api.RECHARGE_USING;
            params.roomId=this.billingData.roomId;
            params.acctDetailId=this.billingData.id;
            params.deductible=this.tollData.deduAmount;
            params.deduType='1';
            params.remarks=this.tollData.remarks;
            params.receivedTime=this.tollData.receivedTime;
            params.leaseId=this.billingData.leaseId;
            params.picIdList=[];
            // this.defaultList2.forEach((e)=>{
            //     params.picIdList.push(e.picId)
            // })
            methods='post';
        }else{
            params.code=this.tollData.code;
            params.id=this.billingData.id;
            params.note=this.tollData.remarks;
            params.received=this.tollData.deduAmount;
            params.receivedChannelName=this.tollData.deduType;
            this.paymentData.forEach((e)=>{
                if(e.name == params.receivedChannelName){
                    params.receivedChannel=e.id;
                }
            })
            // paymentData
            params.receivedTime=this.tollData.receivedTime;
            url=this.$api.PUT_RECEIVE_MONEY;
            methods='put';
        }

        this.$ajax[methods](
            this,
            url,
            params,(res)=>{
                // this.tollLoading=false;
                this.cancleTollData();
                this.$Message.success('新增收款成功');
                this.getAccountList(this.searchQuery);
            },(res)=>{
                // this.tollLoading=false;
            }
        )
    })
},
cancleTollData(){
    this.tollShow=false;
    this.$refs.tollData.resetFields();
    this.tollData.remarks=='';
    this.tollData.deduType='';
},
  },
  computed: {
    layout() {
      //表格显示
      return this.isTenantTab ? this.columns :(this.isPublic?this.publicColumns :this.ownerColumns);
    },
    isTenantTab() {
      //是否为租客账单
      return this.tabName === 'tenant';
    },
    //是否为公公共事业账单
    isPublic(){
      return this.tabName === 'public'
    },
    filters() {
      //快速筛选
      return this.isTenantTab || this.isPublic ? this.tenantFilters : this.ownerFilters;
    },
    placeholder() {
      return this.isTenantTab ? '房间号/姓名/电话/签约单编号/房源编号' : '房间号/姓名/电话';
    },
  },
  watch: {
    tabName(current, past) {
      if(current != past) {
        this.searchQuery = {};
        this.filterStatus = 'all';
      };
    },
  },
}
</script>

<style scoped>
.filter {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.filter > div{
  display: flex;
  align-items: center;
}
.summary {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fffdf5;
  border: 1px solid #fff7e5;
  height: 40px;
  width: 100%;
  margin-bottom: 16px;
}
.summary span {
  color: #507bea;
  font-size: 18px;
}
</style>

