<template>
  <Card dis-hover>
    <Form :label-width="80">
      <Row>
        <Col :span="6">
          <FormItem label="区域">
            <Select v-model="searchData.zoneId" clearable>
              <Option v-for="item in options.area" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="小区">
            <Select v-model="searchData.communityId" clearable>
              <Option v-for="item in options.community" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="出资人">
            <Select v-model="searchData.spnonsorId" clearable>
              <Option v-for="item in options.investor" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="取得方式">
            <Select v-model="searchData.acquisitionMethodId" clearable>
              <Option v-for="item in options.method" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="持有方式">
            <Select v-model="searchData.ownedWhole" clearable>
              <Option value="1">整栋</Option>
              <Option value="0">分散</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="房屋结构">
            <Select v-model="searchData.housingStructure" clearable>
              <Option v-for="item in options.struction" v-if="item.status === '1'" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="6">
          <!-- <FormItem label="有无产权">
            <Select>
              <Option value="1">有</Option>
              <Option value="0">无</Option>
            </Select>
          </FormItem> -->
          <FormItem label="用途/分类">
            <Select v-model="searchData.useAndClassId" clearable>
              <Option v-for="item in options.class" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem>
            <Button @click="handleSearch" type="primary">查询</Button>
            <Button @click="handleReset" type="primary" ghost>重置</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Divider style="margin: 0 0 16px;"/>
    <ActiveTable
      :columns="columns"
      :data="list"
      :pageSize="pageSize"
      :current="pageNo"
      :total="total"
      @on-page-change="changePage"
    >
      <div slot="header" class="btn-box">
        <Button type="primary" @click="addNewFloor">新增楼栋</Button>
      </div>
    </ActiveTable>
    <Modal v-model="showModal" :title="title" :width="870">
      <Form ref="dataForm" v-if="showModal" :label-width="80" :model="newData" :rules="rules">
        <Row>
          <Col :span="8">
            <FormItem label="楼名" prop="name">
              <Input v-model="newData.name" placeholder="请输入楼名" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="总楼层" prop="floorCount">
              <Select v-model="newData.floorCount" clearable>
                <Option v-for="(item, index) in 99" :key="'floor' + index" :value="index + 1 + ''">{{index + 1}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="出资人" prop="spnonsor">
              <Select v-model="newData.spnonsor" clearable>
                <Option v-for="item in options.investor" :key="item.id" :value="item.id + '#' + item.name">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="取得方式" prop="acquisitionMethod">
              <Select v-model="newData.acquisitionMethod" clearable>
                <Option v-for="item in options.method" :key="item.id" :value="item.id + '#' + item.name">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="用途/分类" prop="useAndClass">
              <Select v-model="newData.useAndClass" clearable>
                <Option v-for="item in options.class" :key="item.id" :value="item.id + '#' + item.name">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="所属小区" prop="communityId">
              <Select v-model="newData.communityId" clearable>
                <Option v-for="item in options.community" :key="item.id" :value="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="房屋结构" prop="housingStructure">
              <Select v-model="newData.housingStructure" clearable>
                <Option v-for="item in options.struction" v-if="item.status === '1'" :key="item.id" :value="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="持有方式" prop="ownedWhole">
              <Select v-model="newData.ownedWhole" clearable>
                <Option value="1">整栋</Option>
                <Option value="0">分散</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="使用方式" prop="userMethod">
              <Select v-model="newData.userMethod" clearable>
                <Option value="1">内部</Option>
                <Option value="0">外部</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="是否盈利" prop="haveIncome">
              <Select v-model="newData.haveIncome" clearable>
                <Option value="1">是</Option>
                <Option value="0">否</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Divider style="margin: 0 0 16px;"/>
        <Row>
          <Col :span="8">
            <FormItem label="建筑面积" prop="buildArea">
              <Input v-model="newData.buildArea" placeholder="请输入建筑面积" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="套内面积" prop="realArea">
              <Input v-model="newData.realArea" placeholder="请输入套内面积"/>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="公摊面积" prop="averageArea">
              <Input v-model="newData.averageArea" placeholder="请输入公摊面积" />
            </FormItem>
          </Col>
        </Row>
        <Divider style="margin: 0 0 16px;"/>
        <Row>
          <Col :span="8">
            <FormItem label="产证人">
              <Input v-model="newData.userName" placeholder="请输入产证人" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="产证编号">
              <Input v-model="newData.rightNo" placeholder="请输入产证编号" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="产证类型">
              <Select v-model="newData.rightType" clearable>
                <Option value="房产证">房产证</Option>
                <Option value="动迁证明">动迁证明</Option>
                <Option value="小产证公证书">小产证公证书</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="产证面积" prop="rightArea">
              <Input v-model="newData.rightArea" placeholder="请输入产证面积"/>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="颁证日期">
              <DatePicker v-model="newData.rightTime" />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="ok" type="primary">确定</Button>
      </div>
    </Modal>
  </Card>
</template>

<script>
import ActiveTable from '@/components/Helper/Table/ActiveTable';

export default {
  name: 'AssetManagement',
  components: {
    ActiveTable,
  },
  data() {
    const checkNumber = (rule, value, callback) => {
      if (rule.required == true && !value) {
        callback(new Error('请输入建筑面积'));
      } else if (value && value != 0 &&!this.$com.checkNumber(value)) {
        callback(new Error('请输入数字格式的面积'));
      } else {
        callback();
      }
    };
    return {
      pageSize: 10,
      pageNo: 1,
      total: 0,
      options: {
        area: [],
        community: [],
        investor: [],
        method: [],
        struction: [],
        class: [],
      },
      newData: {},
      searchData: {},
      showModal: false,
      title: '新增楼栋',
      list: [
        // {
        //   name: '楼名',
        //   method: '取得方式',
        //   investor: '出资人',
        //   mianji: '建筑面积',
        //   inner: '套内面积',
        //   count: '总户数',
        //   public: '公摊面积',
        //   hold: '整栋',
        //   hasProperty: '有',
        // },
        // {
        //   name: '楼名',
        //   method: '取得方式',
        //   investor: '出资人',
        //   mianji: '建筑面积',
        //   inner: '套内面积',
        //   count: '总户数',
        //   public: '公摊面积',
        //   hold: '分散',
        //   hasProperty: '有',
        // },
      ],
      columns: [
        {
          title: '楼名',
          key: 'name',
        },
        {
          title: '取得方式',
          key: 'acquisitionMethodName',
        },
        {
          title: '出资人',
          key: 'spnonsorName',
        },
        {
          title: '建筑面积',
          key: 'buildArea',
        },
        {
          title: '套内面积',
          key: 'realArea',
        },
        // {
        //   title: '总户数',
        //   key: 'count',
        // },
        {
          title: '用途/分类',
          key: 'useAndClassName',
        },
        {
          title: '公摊面积',
          key: 'averageArea',
        },
        {
          title: '持有方式',
          key: 'holdType',
          render: (h, params) => {
            const txt = params.row.ownedWhole == '1' ? '整栋' : '分散';
            return h('div', txt);
          },
        },
        {
          title: '有无产权',
          key: 'hasRight',
          render: (h, params) => {
            const txt = params.row.rightNo ? '有' : '无';
            return h('div', txt);
          },
        },
        {
          title: '操作',
          key: 'operate',
          align: 'center',
          width: 200,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small',
                },
                on: {
                  click: () => {
                    this.editFloor(params.row);
                  },
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginLeft: '5px',
                },
                on: {
                  click: () => {
                    this.handleDelete(params.row.id);
                  }
                }
              }, '删除'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginLeft: '5px',
                },
                on: {
                  click: () => {
                    this.$store.dispatch('setBuildingInfo', params.row);
                    this.$router.push({
                      name: 'room-management',
                    });
                  }
                }
              }, '分户管理'),
            ])
          }
        },
      ],
      rules: {
        name: {
          required: true,
          message: '请输入楼名',
        },
        floorCount: {
          required: true,
          message: '请选择楼层',
        },
        spnonsor: {
          required: true,
          message: '请选择出资人',
        },
        acquisitionMethod: {
          required: true,
          message: '请选择取得方式',
        },
        useAndClass: {
          required: true,
          message: '请选择资产用途及分类',
        },
        communityId: {
          required: true,
          message: '请选择所属小区',
        },
        housingStructure: {
          required: true,
          message: '请选择房屋结构',
        },
        ownedWhole: {
          required: true,
          message: '请选择持有方式',
        },
        userMethod: {
          required: true,
          message: '请选择使用方式',
        },
        haveIncome: {
          required: true,
          message: '请选择是否盈利',
        },
        buildArea: {
          required: true,
          validator: checkNumber,
        },
        realArea: {
          validator: checkNumber,
        },
        averageArea: {
          validator: checkNumber,
        },
        rightArea: {
          validator: checkNumber,
        },
      },
    };
  },
  mounted() {
    this.$ajax.all(...this.getOptions(), this.getData());
  },
  methods: {
    // 获取选择框选项
    getOptions() {
      const { ASSET_ZONE, ASSET_COMMUNITY, ASSET_INVESTOR, ASSET_METHOD, ASSET_STRUCTION, ASSET_CLASS } = this.$api;
      const list = [
        {url: ASSET_ZONE, name: 'area'},
        {url: ASSET_COMMUNITY, name: 'community'},
        {url: ASSET_INVESTOR, name: 'investor'},
        {url: ASSET_METHOD, name: 'method'},
        {url: ASSET_STRUCTION, name: 'struction'},
        {url: ASSET_CLASS, name: 'class'},
      ];
      return list.map(item =>
        this.$ajax.get(
          this,
          item.url,
          {},
          (res) => {
            this.options[item.name] = res.data && res.data.content;
          },
        )
      );
    },
    getData(options = {}) {
      const params = Object.assign(options, {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
      });
      return this.$ajax.post(
        this,
        this.$api.SEARCH_FLOOR,
        params,
        (res) => {
          this.total = res.data.totalRows;
          this.list = res.data.content;
        },
      );
    },
    handleSearch() {
      this.pageNo = 1;
      this.getData(this.searchData);
    },
    handleReset() {
      this.searchData = {};
      this.pageNo = 1;
      this.getData();
    },
    addNewFloor() {
      this.newData = {};
      this.title = '新增楼栋';
      this.showModal = true;
    },
    editFloor(data) {
      data.acquisitionMethod = data.acquisitionMethodId + '#' + data.acquisitionMethodName;
      data.spnonsor = data.spnonsorId + '#' + data.spnonsorName;
      data.useAndClass = data.useAndClassId + '#' + data.useAndClassName;
      this.newData = data;
      this.title = '修改楼栋';
      this.showModal = true;
    },
    handleDelete(id) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定删除此楼栋数据吗？</p>',
        onOk: () => {
          this.$ajax.delete(
            this,
            this.$api.ASSET_FLOOR + id,
            {},
            (res) => {
              this.$Message.success('删除成功');
              this.getData();
            }
          )
        },
      });
    },
    ok() {
      this.$refs.dataForm.validate(valid => {
        if (!valid) return;
        const method = this.newData.acquisitionMethod.split('#');
          const spnonsor = this.newData.spnonsor.split('#');
          const useAndClass = this.newData.useAndClass.split('#');
          this.newData.acquisitionMethodId = method[0];
          this.newData.acquisitionMethodName = method[1];
          this.newData.spnonsorId = spnonsor[0];
          this.newData.spnonsorName = spnonsor[1];
          this.newData.useAndClassId = useAndClass[0];
          this.newData.useAndClassName = useAndClass[1];
        if (this.title == '新增楼栋') {
          this.newData.rightTime = null;
          this.$ajax.post(
            this,
            this.$api.ASSET_FLOOR,
            this.newData,
            (res) => {
              this.$Message.success('新增成功');
              this.searchData = {};
              this.pageNo = 1;
              this.getData();
              this.showModal = false;
            },
          );
        } else {
          this.newData.createTime = null;
          this.$ajax.put(
            this,
            this.$api.ASSET_FLOOR + this.newData.id,
            this.newData,
            (res) => {
              this.$Message.success('修改成功');
              this.searchData = {};
              this.pageNo = 1;
              this.getData();
              this.showModal = false;
            },
          );
        }
      })
    },
    changePage(page) {
      this.pageNo = page;
      this.getData();
    },
  }
}
</script>

<style scoped>
.btn-box {
  text-align: right;
  margin-bottom: 16px;
}
.btn-box button {
  padding: 5px 30px;
}
</style>

