<template>
  <Card dis-hover >
    <Layout :style="{background: '#fff',}">
      <Sider id="sideMenu" :style="maxHeight">
        <Tabs @on-click="selectTab" id="login-container" :animated="false">
          <TabPane
            v-for="tab in tabs"
            :key="tab.name"
            :label="tab.name"
            :name="tab.name">
            <Menu @on-select="selectMenu" v-if="tab.name == '项目'" active-name="all" style="zIndex: 1; ">
              <MenuItem
                v-for="item in options.projectId"
                :key="item.value"
                :name="item.value">
                {{item.text}}
              </MenuItem>
            </Menu>
            <Menu @on-select="selectMenu" v-else-if="tab.name == '小区/公寓'" active-name="all" style="zIndex: 1; ">
              <MenuItem
                v-for="item in options.communityId"
                :key="item.value"
                :name="item.value">
                {{item.text}}
              </MenuItem>
            </Menu>
          </TabPane>
        </Tabs>
      </Sider>
      <Content :style="{marginLeft: '16px',}">
        <div ref="card">
          <ActiveForm
          ref="search"
          labelPosition="right"
          :labelWidth="90"
          :header="null"
          :layout="searchLayout"
          :model="searchModel" >
            <div class="btn-box">
              <Button type="primary" @click="handleSearch">查询</Button>
              <Button @click="handleReset">重置</Button>
              <Button @click="toAdd(null)" type="primary">新增楼栋</Button>
              <Upload
                :action="$api.ASSET_UPLOAD"
                :headers="{Authorization: $cookie.get('token')}"
                :format="['xls','xlsx']"
                :show-upload-list="false"
                :on-progress="()=>{$store.dispatch('setLoading', true)}"
                :on-success="uploadSuccess"
                :on-format-error="uploadFormatError"
                :on-error="uploadError"
                style="marginLeft: 10px;">
                  <Button icon="ios-cloud-upload-outline">资产导入</Button>
              </Upload>
              <Button type="warning" :to="modelUrl" target="_blank">资产导入模板</Button>
              <!-- <Button @click="handleBatchCheck" v-show="selectedData.length>0">批量盘点</Button> -->
            </div>
          </ActiveForm>
          <ActiveTable
            :showTitle="true"
            :columns="columns"
            :data="resultList"
            :pageSize="pageSize"
            :current="pageNo"
            :total="total"
            @on-page-change="changePage"
          />
        </div>
      </Content>
    </Layout>
    <!-- <Modal
      v-model="inventoryModal"
      :title="selectedData.length>1 ? `批量盘点（已选${selectedData.length}项资产）` : '确认盘点'">
      <Form v-if="inventoryModal" ref="inventoryForm" :rules="rules" :model="formData" :label-width="120">
        <FormItem label="请确认盘点年份" prop="checkDate">
          <DatePicker :value="formData.checkDate" format="yyyy" @on-change="handleCheckDate" type="year" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="inventoryOk" type="primary">确定</Button>
      </div>
    </Modal> -->
    <Modal
      v-model="soldModal"
      title="提交运营审批">
      <Form v-if="soldModal" ref="soldForm" :rules="rules" :model="formData" :label-width="120">
        <FormItem label="将此资产推送为" prop="rentType">
          <Select v-model="formData.rentType">
            <Option value="0">出租</Option>
            <Option value="1">出售</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="soldOk" type="primary">确定</Button>
      </div>
    </Modal>
    <Modal
      v-model="blamerModal"
      title="负责人">
      <Form v-if="blamerModal" ref="blamerForm" :rules="rules" :label-width="120" :model="formData">
        <FormItem label="改变负责人为" prop="blamer">
          <Select v-model="formData.blamer">
            <Option v-for="item in options.blamers" :key="item.value" :value="item.value">
              {{item.text}}
            </Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="blamerOk" type="primary">确定</Button>
      </div>
    </Modal>
    <Modal
      v-model="discardModal"
      title="作废资产">
      <Form v-if="discardModal" ref="deleteForm" :label-width="120" :rules="rules" :model="deleteInfo">
        <FormItem label="作废原因" prop="deleteReason">
          <Select v-model="deleteInfo.deleteReason">
            <Option value="信息填写错误">信息填写错误</Option>
            <Option value="划转">划转</Option>
            <Option value="出售">出售</Option>
            <Option value="拆除">拆除</Option>
          </Select>
        </FormItem>
        <FormItem label="备注说明">
          <Input v-model="deleteInfo.deleteRemark" type="textarea" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="discardOk" type="primary">确定</Button>
      </div>
    </Modal>
  </Card>
</template>

<script>
import ActiveForm from '@/components/Helper/Form/ActiveForm';
import ActiveTable from '@/components/Helper/Table/ActiveTable';

export default {
  name: 'AssetBuilding',
  components: {
    ActiveForm,
    ActiveTable,
  },
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 0,
      curTab: '项目',
      tabs: [
        {name: '项目'},
        {name: '小区/公寓'},
      ],
      searchLayout:[
        {
          spnonsorId: {
            label: '出资人',
            type: 'select',
            width: 6,
            options: [],
          },
          acquisitionMethodId: {
            label: '取得方式',
            type: 'select',
            width: 6,
            options: [],
          },
          ownedWhole: {
            label: '持有方式',
            type: 'select',
            width: 6,
            options: [
              {text: '整栋', value: '1'},
              {text: '分散', value: '0'},
            ]
          },
          housingStructure: {
            label: '房屋结构',
            type: 'select',
            width: 6,
            options: [],
          },
          useAndClass: {
            label: '资产类型',
            type: 'cascader',
            width: 6,
            options: [],
          },
          assetUseId: {
            label: '资产用途',
            type: 'select',
            width: 6,
            options: [
              {text: '自用', value: '0'},
              {text: '出租', value: '1'},
              {text: '出售', value: '2'},
            ],
          },
          // checkOrNot: {
          //   label: '盘点情况',
          //   type: 'radio',
          //   width: 6,
          //   options: [
          //     {text: '是', value: '1'},
          //     {text: '否', value: '0'},
          //   ]
          // },
          checkOrNot: {
            label: '盘点情况',
            type: 'select',
            width: 6,
            options: [
              {text: '已盘点', value: '1'},
              {text: '未盘点', value: '0'},
            ]
          },
          checkDate: {
            label: '盘点年份',
            type: 'date',
            width: 6,
            dateType: 'year',
            format: 'yyyy',
            disabled: false,
          },
          isOperating: {
            label: '是否运营中',
            type: 'select',
            width: 6,
            options: [
              {text: '是', value: '1'},
              {text: '否', value: '0'},
            ],
          },
          checkStatus: {
            label: '审批状态',
            type: 'select',
            width: 6,
            options: [
              {text: '草稿', value: '0'},
              {text: '新增审批中', value: '1'},
              {text: '修改审批中', value: '2'},
              {text: '作废审批中', value: '3'},
              {text: '运营审批中', value: '4'},
              {text: '审核通过', value: '5'},
              {text: '审核撤回', value: '6'},
              {text: '审核驳回', value: '7'},
              {text: '取消运营审批中', value: '8'},
            ],
          },
          communityId: {
            label: '小区/公寓',
            type: 'select',
            width: 6,
            options: [],
          },
        },
      ],
      searchModel: {},
      // selectedData: [],
      columns: [
        // {
        //   type: 'selection',
        //   minWidth: 50,
        //   align: 'center',
        //   fixed: 'left',
        // },
        {
          title: '楼名',
          key: 'name',
          minWidth: 200,
          fixed: 'left',
        },
        {
          title: '小区/公寓',
          key: 'communityName',
          minWidth: 150,
          fixed: 'left',
        },
        {
          title: '资产编号',
          key: 'no',
          minWidth: 120,
          // fixed: 'left',
        },
        {
          title: '出资人',
          key: 'spnonsorName',
          minWidth: 100,
        },
        {
          title: '取得/持有方式',
          key: 'methods',
          minWidth: 150,
          render: (h, params) => {
            const acquisitionMethodName = params.row.acquisitionMethodName || '未知';
            let ownedWhole = '未知';
            if(params.row.ownedWhole == '1') {
              ownedWhole = '整栋';
            } else if (params.row.ownedWhole == '0') {
              ownedWhole = '分散';
            }
            return h('div', `${acquisitionMethodName}/${ownedWhole}`);
          }
        },
        {
          title: '资产类型及用途',
          key: 'typeAndUse',
          minWidth: 150,
          render: (h, params) => {
            return h('div', [
              h('p', params.row.useAndClassName),
              h('p', params.row.assetUseName),
            ])
          }
        },
        {
          title: '房屋结构',
          key: 'housingStructureName',
          minWidth: 150,
        },
        {
          title: '面积',
          key: 'area',
          minWidth: 200,
          render: (h, params) => {
            const {buildArea, rightArea, averageArea, predictedArea, insideArea, rightRealArea} = params.row,
              build = (buildArea && buildArea != 0) ? `实测面积：${buildArea}㎡` : '',
              predicted = (predictedArea && predictedArea != 0) ? `预测(建筑)面积：${predictedArea}㎡` : '',
              inside = (insideArea && insideArea != 0) ? `套内面积：${insideArea}㎡` : '',
              average = (averageArea && averageArea != 0) ? `公摊面积：${averageArea}㎡` : '',
              right = (rightArea && rightArea != 0) ? `产证面积：${rightArea}㎡` : '',
              real = (rightRealArea && rightRealArea != 0) ? `产证实用面积：${rightRealArea}㎡` : '';
            return h('div', [
              h('p', predicted),
              h('p', build),
              h('p', inside),
              h('p', average),
              h('p', right),
              h('p', real),
            ]);
          }
        },
        {
          title: '产权',
          key: 'property',
          minWidth: 70,
          align: 'center',
          render: (h, params) => {
            return h('div', params.row.rightNo ? '有' : '无');
          }
        },
        {
          title: '运营中',
          key: 'operating',
          minWidth: 90,
          align: 'center',
          render: (h, params) => {
            const txt = params.row.isOperating == '1' ? '是' : '否';
            return h('div', txt);
          }
        },
        {
          title: '盘点情况',
          key: 'checkDate',
          minWidth: 180,
          render: (h, params) => {
            const {checkDate} = params.row;
            const isChecked = checkDate != new Date().getFullYear() ? '否' : '是';
            return h('div', [
              h('p', `本周期是否已盘点：${isChecked}`),
              h('p', `最近盘点年份：${checkDate && checkDate != '0' ? checkDate + '年' : '无' }`),
            ]);
          }
        },
        {
          title: '状态',
          key: 'status',
          minWidth: 100,
          render: (h, params) => {
            return h('div', this.$com.transformCheckStatus(params.row.checkStatus));
          },
        },
        {
          title: '操作',
          key: 'actions',
          align: 'center',
          minWidth: 150,
          fixed: 'right',
          render: (h, params) => {
            let items = this.operateBtns(h, params), btns = [...items];
            if (items.length >=3) {
              const arr = items.map(item => {
                return h('DropdownItem', [item]);
              })
              btns = h('Dropdown',
                {
                  props: {
                    transfer: true,
                  }
                },
                [
                  h('Button', {
                    props: {
                      size: 'small',
                    },
                    style: {
                      marginRight: '5px',
                    },
                  }, '更多'),
                  h('DropdownMenu',{
                    slot: 'list',
                    style: {
                      textAlign: 'center',
                    },
                  }, arr)
              ])
            }
            return h('div', [
              btns,
            ])
          }
        },
      ],
      resultList: [],
      // inventoryModal: false,
      soldModal: false,
      discardModal: false,
      blamerModal: false,
      options: {
        projectId: [{text: '全部', value: 'all'}],
        communityId: [{text: '全部', value: 'all'}],
        blamers: [],
      },
      formData: {
        blamer: null,
        rentType: null,
        checkDate: null,
      },
      curProject: null,
      curOptions: {},
      deleteInfo: {},
      currentId: '',
      fullHeight: document.documentElement.clientHeight,
      communityList: [],
      rules: {
        deleteReason: [{
          required: true,
          message: "请选择作废原因",
        }],
        blamer: [{
          required: true,
          message: "请选择负责人",
        }],
        rentType: [{
          required: true,
          message: "请选择推送类型",
        }],
        checkDate: [{
          required: true,
          message: "请选择盘点年份",
        }],
      },
    }
  },
  mounted() {
    // this.$ajax.gql(`
    //   query {
    //     options {
    //       community {
    //         ...details
    //       }
    //       project {
    //         ...details
    //       }
    //       housingStructure {
    //         ...details
    //       }
    //       acquisitionMethod {
    //         ...details
    //       }
    //       spnonsor {
    //         ...details
    //       }
    //     }
    //   }
    //   fragment details on OptionsDetail {
    //     id
    //     name
    //   }
    // `).then(res => {
    //   console.log(res);

    // })
    this.$ajax.all(...this.getOptions(), this.getBlamers(), this.getTypes(), this.getData());
  },
  methods: {
    // 获取选择框选项
    getOptions() {
      const { ASSET_COMMUNITY, ASSET_INVESTOR, ASSET_METHOD, ASSET_STRUCTION, ASSET_PROJECT } = this.$api;
      const list = [
        {url: ASSET_COMMUNITY, name: 'communityId'},
        {url: ASSET_INVESTOR, name: 'spnonsorId'},
        {url: ASSET_METHOD, name: 'acquisitionMethodId'},
        {url: ASSET_STRUCTION, name: 'housingStructure'},
        {url: ASSET_PROJECT, name: 'projectId'},
      ];
      this.options = {
        projectId: [{text: '全部', value: 'all'}],
        communityId: [{text: '全部', value: 'all'}],
      };
      return list.map(item =>
        this.$ajax.get(
          this,
          item.url,
          {},
          (res) => {
            const data = this.$com.confirm(res, 'data.content', []);
            if (item.name == 'projectId' || item.name == 'communityId') {
              const list = data.map(item => {
                return {
                  text: item.name,
                  value: item.id,
                }
              });
              if (item.name == 'communityId') {
                this.communityList = data;
              }
              this.options[item.name].push(...list);
            } else {
              this.searchLayout[0][item.name].options = data.map(item => {
                return {
                  text: item.name,
                  value: item.id,
                }
              });
            }
            this.selectTab('项目');
          },
          true,
        )
      );
    },
    getBlamers() {
      this.$ajax.get(
        this,
        this.$api.GET_ALL_STAFF_LISTS,
        {pageNo: 1, pageSize: 100000},
        (res) => {
          const data = this.$com.confirm(res, 'data.content');
          if (!data) return;
          this.options.blamers = data.map(item => {
            return {
              text: `${(item.isAllPerm ? '主账号' : item.name)} / ${item.phone}`,
              value: item.id,
            }
          })
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
          this.searchLayout[0].useAndClass.options = options;
        },
        true,
      )
    },
    getData(options = {}) {
      // this.selectedData = [];
      const params = Object.assign(options, {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        delete: '0',
      }, this.curOptions);
      return this.$ajax.post(
        this,
        this.$api.SEARCH_FLOOR,
        params,
        (res) => {
          this.total = res.data.totalRows;
          this.resultList = res.data.content;
          this.fullHeight = document.documentElement.clientHeight;
        },
      );
    },
    selectMenu(id) {
      if (id == 'all') {
        id = null;
      }
      this.pageNo = 1;
      if (this.curTab == '项目') {
        this.curOptions = {projectId: id};
        this.getData({projectId: id});
      } else {
        this.curOptions = {communityId: id};
        if (id) {
          const data = this.communityList.filter(item => item.id == id);
          this.curProject = data[0].projectId + '#' + data[0].projectName;
        } else {
          this.curProject = null;
        }
        this.getData({communityId: id});
      }
    },
    selectTab(tab) {
      this.curTab = tab;
      this.curOptions = {};
      if (tab == '项目') {
        this.$delete(this.searchLayout[0], 'projectId')
        this.searchLayout[0].communityId = {
          label: '小区/公寓',
          type: 'select',
          width: 6,
          options: this.options.communityId.slice(1),
        }
      } else {
        this.$delete(this.searchLayout[0], 'communityId')
        this.searchLayout[0].projectId = {
          label: '项目',
          type: 'select',
          width: 6,
          options: this.options.projectId.slice(1),
        }
      }
    },
    changePage(page) {
      this.pageNo = page;
      const params = {...this.searchModel};
      if (params.useAndClass) {
        params.useAndClassId = params.useAndClass[1];
        this.$delete(params, 'useAndClass');
      }
      this.getData(params);
    },
    // handleSelect(list) {
    //   this.selectedData = list;
    // },
    // handleBatchCheck() { // 批量盘点
    //   this.inventoryModal = true;
    //   this.currentId = this.selectedData.map(item => item.id);
    // },
    handleSearch() {
      this.pageNo = 1;
      const params = {...this.searchModel};
      if (params.useAndClass) {
        params.useAndClassId = params.useAndClass[1];
        this.$delete(params, 'useAndClass');
      }
      this.getData(params);
    },
    handleReset() {
      this.searchModel = {};
      this.pageNo = 1;
      this.getData();
    },
    handleCheckDate(val) {
      this.formData.checkDate = val;
    },
    // inventoryOk() {
    //   this.$refs.inventoryForm.validate(valid => {
    //     if (!valid) return;
    //     this.inventoryModal = false;
    //     this.$ajax.put(
    //       this,
    //       this.$api.ASSET_FLOOR + 'batch',
    //       {
    //         checkDate: this.formData.checkDate,
    //         ids: this.currentId,
    //       },
    //       () => {
    //         this.$Message.success('盘点成功');
    //         this.formData.checkDate = null;
    //         this.handleReset();
    //       }
    //     )
    //   })
    // },
    soldOk() {
      this.$refs.soldForm.validate(valid => {
        if (!valid) return;
        this.soldModal = false;
        this.$ajax.put(
          this,
          this.$api.PUT_RENT + this.currentId + '/' + this.formData.rentType,
          {id: this.currentId, type: this.formData.rentType},
          () => {
            this.$Message.success('提交成功');
            this.formData.rentType = null;
            this.handleReset();
          },
        )
      })
    },
    blamerOk() {
      this.$refs.blamerForm.validate(valid => {
        if (!valid) return;
        this.blamerModal = false;
        this.$ajax.put(
          this,
          this.$api.PUT_BLAMER.replace('{blamerId}', this.formData.blamer).replace('{floorId}', this.currentId),
          {floorId: this.currentId, blamerId: this.formData.blamer},
          () => {
            this.$Message.success('修改成功');
            this.formData.blamer = null;
            this.handleReset();
          }
        )
      })
    },
    discardOk() {
      this.$refs.deleteForm.validate(valid => {
        if (!valid) return;
        this.discardModal = false;
        this.$Modal.confirm({
          title: '确认作废楼栋信息？',
          content: '<p>资产作废需由专人审批后方可生效。生效后，不可撤回。</p>',
          onOk: () => {
            this.$ajax.put(
              this,
              this.$api.ASSET_FLOOR + this.currentId,
              {...this.deleteInfo, delete: '1'},
              () => {
                this.$Message.success('作废成功');
                this.deleteInfo = {};
                this.handleReset();
              }
            )
          }
        })
      })
    },
    toAdd(id) {
      let options = {};
      if (this.curOptions && Object.keys(this.curOptions)[0]) {
        options = {
          key: Object.keys(this.curOptions)[0],
          value: this.curOptions[Object.keys(this.curOptions)[0]],
        }
        if (this.curProject) {
          options.project = this.curProject;
        }
      }
      this.$router.push({
        name: 'building-info',
        query: {
          id,
          ...options,
        }
      })
    },
    uploadSuccess(res) {
      this.$store.dispatch('setLoading', false);
      this.$com.handleUploadResponse(res.data.content);
      this.getOptions();
      this.handleReset();
    },
    uploadFormatError() {
      this.$Message.error('文件格式有误，只能导入xls、xlsx文件！');
    },
    uploadError(error, file, fileList) {
      this.$store.dispatch('setLoading', false);
      if(file.code == '710') {
        this.$com.handleUploadResponse(file.msg);
      } else {
        this.$Message.error('导入失败');
      }
      this.getOptions();
      this.handleReset();
    },
    operateBtns(h, params) {
      const o = {
        style: {
          display: 'inline-block',
          width: '100%',
        },
      };
      const b = {
        props: {
          size: 'small',
          type: 'primary',
        },
      };
      let soldBtn = [
        h('a', {
          ...o,
          on: {
            click: (e) => {
              e.stopPropagation();
              if(params.row.isOperating == '1') {
                this.$Modal.confirm({
                  title: '操作失败',
                  content: '<p>此资产正在运营中，暂无法改变出租/出售状态。</p>',
                  onOk: () => {},
                });
                return;
              }
              this.currentId = params.row.id;
              this.formData.rentType = null;
              this.soldModal = true;
            }
          }
        }, '提交运营审批'),
      ];
      let cancelSoldBtn = [
        h('a', {
          ...o,
          on: {
            click: (e) => {
              e.stopPropagation();
              // this.currentId = params.row.id;
              const backUse = () => {
                this.$ajax.put(
                  this,
                  this.$api.PUT_USE_BACK.replace('{id}', params.row.id),
                  null,
                  () => {
                    this.$Message.success('提交成功');
                    this.handleReset();
                  }
                )
              }
              this.$Modal.confirm({
                title: '确定撤回此资产的运营状态',
                content: '<p>撤回资产的运营需由专人审批后方可生效</p>',
                onOk: () => {
                  backUse();
                },
              });
            }
          }
        }, '撤回运营'),
      ];
      const events = (status) => {
        return {
          on: {
            click: (e) => {
              e.stopPropagation();
              this.$Modal.confirm({
                title: '是否确认撤回审批',
                content: '<p>审批撤回后，原修改内容将失效。</p>',
                onOk: () => {
                  this.$ajax.put(
                    this,
                    this.$api.POST_BUILDING_BACK_VERIFY.replace('{id}', params.row.id) + '?status=' + status,
                    null,
                    () => {
                      this.$Message.success('撤回成功');
                      this.handleReset();
                    }
                  )
                }
              })
            }
          },
        }
      }
      const draftBtns = [
        h('a', {
          ...o,
          on: {
            click: (e) => {
              e.stopPropagation();
              this.toAdd(params.row.id);
            }
          }
        }, '修改'),
        h('a', {
          ...o,
          on: {
            click: (e) => {
              e.stopPropagation();
              this.$Modal.confirm({
                title: '确认新增楼栋信息？',
                content: '<p>资产新增需由专人审批后方可生效。生效后，不可撤回。</p>',
                onOk: () => {
                  this.$ajax.post(
                    this,
                    this.$api.POST_BUILDING_ADD_VERIFY.replace('{id}', params.row.id),
                    null,
                    () => {
                      this.$Message.success('提交成功');
                      this.handleReset();
                    }
                  )
                },
              });
            }
          },
        }, '提交新增审批'),
        h('a', {
          ...o,
          on: {
            click: (e) => {
              e.stopPropagation();
              this.$Modal.confirm({
                title: '确认删除楼栋信息？',
                content: '<p>删除后，数据将无法恢复或找回。</p>',
                onOk: () => {
                  this.$ajax.delete(
                    this,
                    this.$api.ASSET_HOUSE + params.row.id,
                    null,
                    () => {
                      this.$Message.success('删除成功');
                      this.handleReset();
                    }
                  )
                },
              });
            }
          },
        }, '删除'),
      ];
      let passBtns = [
        h('a', {
          ...o,
          on: {
            click: (e) => {
              e.stopPropagation();
              this.toAdd(params.row.id);
            }
          }
        }, '修改'),
        h('a', {
          ...o,
          on: {
            click: (e) => {
              e.stopPropagation();
              localStorage.setItem('buildingInfo', JSON.stringify(params.row));
              this.$router.push({
                name: 'room-management',
              });
            }
          }
        }, '分户管理'),
        h('a', {
          ...o,
          on: {
            click: (e) => {
              e.stopPropagation();
              this.currentId = params.row.id;
              this.formData.blamer = params.row.blamerId;
              this.blamerModal = true;
            }
          }
        }, '负责人'),
        h('a', {
          ...o,
          on: {
            click: (e) => {
              e.stopPropagation();
              this.$Modal.confirm({
                title: '确认作废此楼栋信息',
                content: '<p>资产作废后，其关联的待租房源将被回收，请确保所有租约已结束，否则将导致作废操作失败。此操作无法撤销。</p>',
                onOk: () => {
                  this.discardModal = true;
                  this.deleteInfo = {};
                  this.currentId = params.row.id;
                },
              });
            }
          }
        }, '作废'),
      ];
      if (params.row.isOperating != '1') {
        passBtns = [...passBtns, ...soldBtn];
      } else {
        passBtns = [...passBtns, ...cancelSoldBtn];
      }
      switch (params.row.checkStatus) {
        case '0':
          return draftBtns;
        case '1':
          return [h('Button', {...b, ...events('0')}, '撤回新增审批')];
        case '2':
          return [h('Button', {...b, ...events('5')}, '撤回修改审批')];
        case '3':
          return [h('Button', {...b, ...events('5')}, '撤回作废审批')];
        case '4':
          return [h('Button', {...b, ...events('5')}, '撤回运营审批')];
        case '8':
          return [h('Button', {...b, ...events('5')}, '撤回取消运营审批')];
        case '5':
          return passBtns;
        case '7':
          if (params.row.dataStatus == '0') {
            return draftBtns;
          } else if (params.row.dataStatus == '1') {
            return passBtns;
          } else {
            return [];
          }
        default:
          return [];
      }
    },
  },
  computed: {
    maxHeight() {
      return {maxHeight: this.fullHeight + 'px'};
    },
    modelUrl() {
      return `${this.$api.BASEURL}/file/template/%E9%BB%84%E7%9F%B3%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx`
    }
  },
  watch: {
    'searchModel.checkOrNot': {
      handler(cur) {
        if (cur == '0') {
          this.searchModel.checkDate = null;
          this.searchLayout[0].checkDate.disabled=true;
        } else {
          this.searchLayout[0].checkDate.disabled=false;
        }
      }
    }
  }
}
</script>

<style scoped>
#sideMenu {
  overflow-x: hidden;
  overflow-y: auto;
  background: #fff;
  min-height: 480px;
  border-right: 1px solid #e8eaec;
  padding-right: 10px;
}
.tab .ivu-tabs-nav-scroll{
  padding-left: 20px;
}
.btn-box {
  display: flex;
  justify-content: flex-end;
}
.btn-box>button, .btn-box>a {
  margin-left: 10px;
  min-width: 86px;
}
</style>
