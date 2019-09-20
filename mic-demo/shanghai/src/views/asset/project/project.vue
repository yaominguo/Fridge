<template>
<Card dis-hover>
  <Form :label-width="100">
    <Row>
      <Col :span="6">
        <FormItem label="项目名称">
          <Input v-model="searchName" />
        </FormItem>
      </Col>
      <Col :span="6">
        <div class="btn-box">
          <Button @click="handleSearch" type="primary" >查询</Button>
          <Button @click="handleReset">重置</Button>
        </div>
      </Col>
      <Col :span="6" :offset="6">
        <div class="btn-box">
          <Button type="primary" ghost @click="handleEdit(null)">新增项目</Button>
        </div>
      </Col>
    </Row>
  </Form>
  <Divider style="margin: 0 0 16px;"/>
  <Collapse v-show="!noData" v-model="areaIds">
    <Panel v-for="(area, index) in list" :key="area.id" :name="area.id">
      {{area.city + ' - ' + area.county}}
      <div slot="content" class="wrapper">
        <div class="box" v-for="item in area.list" :key="item.id">
          <div class="inner">
            <div class="content">
              <p>{{item.name}}</p>
            </div>
            <div class="operate">
              <Button @click="handleEdit(index, item.id, item.name, item.blamer, item.remark)" type="text" size="large" icon="ios-create">编辑</Button>
              <Button @click="handleDelete(item.id)" type="text" size="large" icon="ios-trash">删除</Button>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="inner add-btn">
            <Button @click="handleEdit(index, null, null)" class="add-btn" type="text" icon="md-add" />
          </div>
        </div>
      </div>
    </Panel>
  </Collapse>
  <div v-show="noData" style="textAlign: center;minHeight: 400px;">暂无数据</div>
  <Modal v-model="showModal" title="项目信息" :width="500">
    <Form v-if="showModal" ref="dataForm" :rules="rules" :model="dataModel" :label-width="80">
      <FormItem label="项目名称" prop="projectName">
        <Input v-model="dataModel.projectName"/>
      </FormItem>
      <FormItem v-if="isNew"  label="省市区" prop="provId">
        <Row type="flex" justify="space-between">
          <Col :span="7">
            <FormItem prop="provId">
              <Select v-model="dataModel.provId" placeholder="请选择省份" filterable clearable>
                <Option v-for="item in options.provId" :key="item.value" :value="item.value">{{item.text}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="7">
            <FormItem prop="cityId">
              <Select v-model="dataModel.cityId" placeholder="请选择城市" filterable clearable>
                <Option v-for="item in options.cityId" :key="item.value" :value="item.value">{{item.text}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="7">
            <FormItem prop="countyId">
              <Select v-model="dataModel.countyId" placeholder="请选择区域" filterable clearable>
                <Option v-for="item in options.countyId" :key="item.value" :value="item.value">{{item.text}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="负责人" prop="blamer">
        <div style="display: flex;">
          <Select v-model="dataModel.blamer" filterable clearable>
            <Option v-for="item in options.blamer" :key="item.value" :value="item.value">{{item.text}}</Option>
          </Select>
          <!-- <Button style="marginLeft: 10px;" type="primary" ghost @click="$router.push({name:'StaffManageCreate'})">添加负责人</Button> -->
          <Button style="marginLeft: 10px;" type="primary" ghost @click="showAdd=true">添加负责人</Button>
        </div>
      </FormItem>
      <FormItem label="备注">
        <Input v-model="dataModel.remark" type="textarea"/>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="handleSubmit" type="primary">保存</Button>
    </div>
  </Modal>
  <Modal v-model="showAdd" width="90%" footer-hide :mask-closable="false">
    <StaffManageCreate :isFromProjectAdd="true" @submitSuccess="addManagerSuccess" v-if="showAdd" />
  </Modal>
</Card>
</template>

<script>
import ActiveForm from '@/components/Helper/Form/ActiveForm';
import StaffManageCreate from '@/views/permission/staffManage/create'; //新增员工

export default {
  name: 'AssetProject',
  components: {
    ActiveForm,
    StaffManageCreate,
  },
  data() {
    const checkName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入项目名称'));
      } else if (!this.$com.checkContent(value)) {
        callback(new Error('项目名称只能由中、英文或数字组成'));
      } else {
        callback();
      }
    };
    return {
      showAdd: false,
      pageNo: 1,
      pageSize: 10000,
      searchName: null,
      list: [],
      areas: [],
      areaIds: [],
      showModal: false,
      options: {
        blamer: [],
        provId: [],
        cityId: [],
        countyId: [],
      },
      dataModel: {},
      noData: false,
      isNew: false,
      rules: {
        projectName: {
          required: true,
          validator: checkName,
        },
        blamer: {
          required: true,
          message: '请选择负责人',
        },
        provId: {
          required: true,
          message: '请选择省份',
        },
        cityId: {
          required: true,
          message: '请选择城市',
        },
        countyId: {
          required: true,
          message: '请选择区域',
        },
      },
    };
  },
  mounted() {
    this.requestSelectOptions(this.$api.GET_PROVINCE_LIST, 'provId');
    this.getBlamers();
    this.getArea();
  },
  methods: {
    getBlamers() {
      // this.$ajax.get(
      //   this,
      //   this.$api.GET_BLAMER,
      //   null,
      //   (res) => {
      //     const data = this.$com.confirm(res, 'data.content');
      //     if (!data) return;
      //     this.options.blamer = data.map(item => {
      //       return {
      //         text: item.name,
      //         value: item.id,
      //       }
      //     })
      //   }
      // )
      this.$ajax.get(
        this,
        this.$api.GET_ALL_STAFF_LISTS,
        {pageNo: 1, pageSize: 100000},
        (res) => {
          const data = this.$com.confirm(res, 'data.content');
          if (!data) return;
          this.options.blamer = data.map(item => {
            return {
              text: `${(item.isAllPerm ? '主账号' : item.name)} / ${item.phone}`,
              value: item.id,
            }
          })
        }
      );
    },
    getArea(name) {
      this.$ajax.post(
        this,
        this.$api.SEARCH_ZONE,
        {pageNo: this.pageNo, pageSize: this.pageSize},
        (res) => {
          this.areas = res.data.content;
          this.getData(name);
        },
        true,
      )
    },
    requestSelectOptions(requestUrl, selectItem) {
      return this.$ajax.get(
        this,
        requestUrl,
        {},
        (res) => {
          const data = res.data.content;
          const options = data.map(item => {
            return {text: item.name, value: item.id + '#' + item.name, width: '42%'};
          });
          this.options[selectItem] = options;
        },
        true,
      )
    },
    // 省市区联动，根据省获取市，根据市获取区
    getOptions() {
      const { provId, cityId } = this.dataModel;
      if (provId) {
        this.requestSelectOptions(this.$api.GET_CITY_LIST + provId.split('#')[0], 'cityId');
      } else {
        this.options.cityId = [];
      }
      if (cityId) {
        this.requestSelectOptions(this.$api.GET_COUNTY_LIST + cityId.split('#')[0], 'countyId');
      } else {
        this.options.countyId = [];
      }
    },
    getData(name) {
      if (name) {
        this.$ajax.post(
          this,
          this.$api.SEARCH_PROJECT,
          {
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            name_l: name,
          },
          (res) => {
            const data = res.data.content;
            if (!data || data.length <= 0) {
              this.list = [];
              this.noData = true;
              return;
            }
            const list = [...this.areas];
            data.forEach(item => {
              list.forEach(area => {
                if (area.city == item.cityName && area.county == item.areaName) {
                  if (!area.list) {
                    area.list = [];
                  }
                  area.list.push(item);
                }
              })
            })
            this.noData = false;
            this.list = list.filter(item => this.$com.confirm(item, 'list.length', 0) > 0);
            this.$nextTick(()=> {
              this.areaIds=this.list.map(item => item.id)
            }, 0)
          }
        )
        return;
      }
      this.$ajax.get(
        this,
        this.$api.ASSET_PROJECT,
        null,
        (res) => {
          const data = res.data.content;
          const list = [...this.areas];
          data.forEach(item => {
            list.forEach(area => {
              if (area.city == item.cityName && area.county == item.areaName) {
                if (!area.list) {
                  area.list = [];
                }
                area.list.push(item);
              }
            })
          })
          if (list.length <= 0) {
            this.noData = true;
          } else {
            this.noData = false;
          }
          this.list = list;
          this.$nextTick(()=> {
            this.areaIds=this.list.map(item => item.id)
          }, 0)
        },
      );
    },
    handleSubmit() {
      this.$refs.dataForm.validate(valid => {
        if(!valid) return;
        const {id, projectName, province, provId, city, cityId, county, countyId, blamer, remark} = this.dataModel;
        let params = null;
        const blamerName = (this.options.blamer.filter(item => item.value == blamer))[0].text;
        if (provId && cityId && countyId) {
          params = {
            areaName: countyId.split('#')[1],
            blamer,
            blamerName,
            cityName: cityId.split('#')[1],
            name: projectName,
            provinceName: provId.split('#')[1],
            remark,
          };
        } else {
          params = {
            areaName: county,
            blamer,
            blamerName,
            cityName: city,
            name: projectName,
            provinceName: province,
            remark,
          };
        }
        if (id) {
          this.$ajax.put(
            this,
            this.$api.ASSET_PROJECT + id,
            {...params, id},
            () => {
              this.$Message.success('编辑成功');
              this.showModal = false;
              this.getArea();
            }
          )
        } else {
          this.$ajax.post(
            this,
            this.$api.ASSET_PROJECT,
            params,
            () => {
              this.$Message.success('新增成功');
              this.showModal = false;
              this.getArea();
            }
          )
        }
      });
    },
    handleSearch() {
      this.getArea(this.searchName);
    },
    handleReset() {
      this.searchName = null;
      this.getArea();
    },
    handleEdit(i, id, name, blamer, remark) {
      this.isNew = true;
      this.dataModel = {};
      if (i || i == 0) {
        this.isNew = false;
        const {province, city, county} = this.list[i];
        this.dataModel = {
          id,
          projectName: name,
          province,
          city,
          county,
          blamer,
          remark,
        }
      }
      this.showModal = true;
    },
    handleDelete(id) {
      this.$Modal.confirm({
        title: '确认删除此项目',
        content: '<p>此操作不可撤销。</p>',
        onOk: () => {
          this.$ajax.delete(
            this,
            this.$api.ASSET_PROJECT + id,
            {},
            (res) => {
              this.$Message.success('删除成功');
              this.getArea();
              // this.$Modal.confirm({
              //   title: '删除失败',
              //   content: '<p>此项目下存在资产，需将本项目中的资产迁移到别的项目中。</p>',
              //   onOk: () => {},
              // });
            }
          )
        },
      });
    },
    addManagerSuccess() {
      this.$Message.success('添加成功');
      this.showAdd = false;
      this.getBlamers();
    },
  },
  watch: {
    'dataModel.provId': {
      handler(cur, old) {
        if (cur != old) {
          this.$delete(this.dataModel, 'cityId');
          this.$delete(this.dataModel, 'countyId');
          this.getOptions();
        }
      }
    },
    'dataModel.cityId': {
      handler(cur, old) {
        if (cur != old) {
          this.$delete(this.dataModel, 'countyId');
          this.getOptions();
        }
      }
    },
  },
}
</script>

<style scoped>
.btn-box {
  display: flex;
  justify-content: flex-end;
}
.btn-box>button {
  margin-left: 10px;
  min-width: 86px;
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
}
.title {
  width: 100%;
  background: #e8eaec;
  padding: 0 10px;
  line-height: 30px;
  margin-bottom: 10px;
}
.box {
  width: 20%;
  padding: 0 16px 16px 0;
}
.inner {
  height: 150px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e8eaec;
}
.content {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.content .input {
  display: block;
  width: 90%;
}
.content > p {
  text-align: center;
  font-size: 12px;
}
.content > p:first-child {
  font-weight: bold;
  font-size: 14px;
}
.operate {
  border-top: 1px solid #e8eaec;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.operate > button {
  border-radius: 0;
  width: 50%;
}
.operate > button:first-child {
  border-right: 1px solid #e8eaec;
}
.inner.add-btn {
  background: #e8eaec;
}
.inner.add-btn > button {
  width: 100%;
  height: 100%;
  font-size: 30px;
}
</style>
