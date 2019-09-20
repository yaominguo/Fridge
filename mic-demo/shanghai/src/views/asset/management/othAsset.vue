<template>
  <Card dis-hover>
    <Form :label-width="70">
      <Row>
        <Col :span="6">
          <FormItem label="小区">
            <Select v-model="building.communityId" disabled clearable>
              <Option v-for="item in options.community" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="楼名">
            <Input v-model="building.name" disabled />
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="楼层总高">
            <Input v-model="building.floorCount" disabled />
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Divider style="margin: 0 0 16px;" />
    <div class="btn-box right">
      <Button @click="addRoom" type="primary">新增房间</Button>
    </div>
    <Table :columns="columns" :data="list" />
    <div class="btn-box">
      <Button @click="showModal" type="primary">保存</Button>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'OthAsset',
  data() {
    return {
      options: {
        community: [],
        investor: [],
        method: [],
        style: [],
        // class: [],
        // useAndClass: [],
        assetUse: [
          {
            id: '0',
            name: '自用',
          },
          {
            id: '1',
            name: '出租',
          },
          {
            id: '2',
            name: '出售',
          },
        ],
        useAndClass: [],
      },
      columns: [
        {
          title: '室号',
          key: 'roomNo',
          align: 'center',
          minWidth: 150,
          render: (h, params) => this.renderComponent(h, params, 'input'),
        },
        {
          title: '所在楼层',
          key: 'houseFloor',
          align: 'center',
          minWidth: 150,
          render: (h, params) => {
            const len = Number(this.building.floorCount);
            const list = [];
            for (let i=1; i<=len; i++) {
              list.push({
                name: i,
                id: i,
              });
            }
            return this.renderComponent(h, params, 'select', list)
          }
        },
        // {
        //   title: '建筑面积',
        //   key: 'buildArea',
        //   align: 'center',
        //   minWidth: 150,
        //   render: (h, params) => this.renderComponent(h, params, 'input'),
        // },
        {
          title: '预测(建筑)面积(㎡)',
          key: 'predictedArea',
          align: 'center',
          minWidth: 150,
          render: (h, params) => this.renderComponent(h, params, 'input'),
        },
        {
          title: '套内面积(㎡)',
          key: 'realArea',
          align: 'center',
          minWidth: 150,
          render: (h, params) => this.renderComponent(h, params, 'input'),
        },
        {
          title: '出资人',
          key: 'spnonsorId',
          align: 'center',
          minWidth: 150,
          render: (h, params) => this.renderComponent(h, params, 'select', this.options.investor),
        },
        {
          title: '取得方式',
          key: 'acquisitionMethodId',
          align: 'center',
          minWidth: 150,
          render: (h, params) => this.renderComponent(h, params, 'select', this.options.method),
        },
        {
          title: '房型',
          key: 'apartmentType',
          align: 'center',
          minWidth: 150,
          render: (h, params) => this.renderComponent(h, params, 'select', this.options.style),
        },
        {
          title: '资产类型',
          key: 'useAndClass',
          align: 'center',
          minWidth: 150,
          render: (h, params) => this.renderComponent(h, params, 'cascader', this.options.useAndClass),
        },
        {
          title: '资产用途',
          key: 'assetUseId',
          align: 'center',
          minWidth: 150,
          render: (h, params) => this.renderComponent(h, params, 'select', this.options.assetUse),
        },
        {
          title: '是否收益',
          key: 'haveIncome',
          align: 'center',
          minWidth: 150,
          render: (h, params) => {
            const list = [
              {
                id: '1',
                name: '是',
              },
              {
                id: '0',
                name: '否',
              },
            ]
            return this.renderComponent(h, params, 'select', list);
          },
        },
        {
          title: '操作',
          key: 'operate',
          align: 'center',
          fixed: 'right',
          minWidth: 150,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                },
                on: {
                  click: () => {
                    this.deleteRoom(params.index);
                  }
                }
              } ,'删除'),
            ]);
          },
        },
      ],
      building: {},
      list: [{}],
      curUseAndClass: [],
    }
  },
  created() {
    const building = JSON.parse(localStorage.getItem('buildingInfo'));
    this.$ajax.all(...this.getOptions(), this.getTypes()).then(() => {
      if (building) {
        this.options.useAndClass.forEach(parent => {
          parent.children.forEach(child => {
            if (building.useAndClassId == child.value) {
              this.curUseAndClass = [parent.value, child.value];
            }
          })
        })
        this.$set(this.list, '0', {
          spnonsorId: building.spnonsorId,
          acquisitionMethodId: building.acquisitionMethodId,
          assetUseId: building.assetUseId,
          haveIncome: building.haveIncome,
          useAndClass: this.curUseAndClass,
        })
        this.building = building;
      }
    });
  },
  methods: {
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
          this.options.useAndClass = options;
        },
        true,
      )
    },
    // 获取选择框选项
    getOptions() {
      const { ASSET_COMMUNITY, ASSET_INVESTOR, ASSET_METHOD, ASSET_STYLE, ASSET_CLASS } = this.$api;
      const list = [
        {url: ASSET_COMMUNITY, name: 'community'},
        {url: ASSET_INVESTOR, name: 'investor'},
        {url: ASSET_METHOD, name: 'method'},
        {url: ASSET_STYLE, name: 'style'},
        // {url: ASSET_CLASS, name: 'class'},
      ];
      return list.map(item =>
        this.$ajax.get(
          this,
          item.url,
          {},
          (res) => {
            this.options[item.name] = this.$com.confirm(res, 'data.content', []);
          },
          true,
        )
      );
    },
    showModal() {
      const isError = this.list.some(item => {
        if(!item.roomNo) {
          this.$Message.error('请输入室号');
          return true;
        }
        if(!item.houseFloor) {
          this.$Message.error('请选择所在楼层');
          return true;
        }
        // if(!this.$com.checkNumber(item.buildArea)) {
        //   this.$Message.error('请输入数字格式建筑面积');
        //   return true;
        // }
        if(!this.$com.checkNumber(item.predictedArea)) {
          this.$Message.error('请输入数字格式预测(建筑)面积');
          return true;
        }
        if(!this.$com.checkNumber(item.realArea)) {
          this.$Message.error('请输入数字格式套内面积');
          return true;
        }
        if(!item.spnonsorId) {
          this.$Message.error('请选择出资人');
          return true;
        }
        if(!item.acquisitionMethodId) {
          this.$Message.error('请选择取得方式');
          return true;
        }
        // if(!item.useAndClassId) {
        //   this.$Message.error('请选择用途及分类');
        //   return true;
        // }
        // if(!item.apartmentType) {
        //   this.$Message.error('请选择房型');
        //   return true;
        // }
        if(!item.assetUseId && item.assetUseId != 0) {
          this.$Message.error('请选择资产用途');
          return true;
        }
        if(!item.haveIncome && item.haveIncome != 0) {
          this.$Message.error('请选择是否收益');
          return true;
        }
      })
      if (isError) return;
      const {investor, method, style, assetUse} = this.options;
      let roomObj = {}, sameRoom = false;
      this.list.forEach(item => {
        if (roomObj[item.roomNo.trim()]) {
          this.$Message.error('存在相同的室号');
          sameRoom = true;
          return
        }
        roomObj[item.roomNo.trim()] = true;
        const {spnonsorId, acquisitionMethodId, apartmentType, assetUseId, useAndClass} = item;
        const _useAndClassId = useAndClass && useAndClass[1];
        let _useAndClassName = null;
        this.options.useAndClass.forEach(parent => {
          parent.children.forEach(child => {
            if (_useAndClassId == child.value) {
              _useAndClassName = child.label;
            }
          })
        })
        const obj = {
          spnonsorName: (investor && investor.length>0 && (investor.filter(e => e.id == spnonsorId))[0].name) || null,
          acquisitionMethodName: (method && method.length>0 && (method.filter(e => e.id == acquisitionMethodId))[0].name) || null,
          apartmentTypeName: (style && style.length>0 && (style.filter(e => e.id == apartmentType))[0].name) || null,
          assetUseName: (assetUse && assetUse.length>0 && (assetUse.filter(e => e.id == assetUseId))[0].name) || null,
          useAndClassId: _useAndClassId,
          useAndClassName: _useAndClassName,
        };
        item = Object.assign(item, obj);
      })
      if (!sameRoom) {
        this.$Modal.confirm({
          title: '操作提示',
          content: '<p>是否继续添加产证信息</p>',
          okText: '是',
          cancelText: '否',
          onOk: () => {
            this.$router.push({
              name: 'add-property',
              params: {
                data: this.list,
              },
            })
          },
          onCancel: () => {
            const params = {
              floorId: this.building.id,
              list: this.list,
            };
            this.$ajax.post(
              this,
              this.$api.ADD_ASSET_HOUSE,
              params,
              (res) => {
                this.$Message.success('新增成功');
                this.$router.back();
              }
            );
          },
        });
      }
    },
    addRoom() {
      const {spnonsorId, acquisitionMethodId, assetUseId, haveIncome} = this.building;
      this.list.unshift({
        spnonsorId,
        acquisitionMethodId,
        assetUseId,
        haveIncome,
        useAndClass: this.curUseAndClass,
      });
    },
    deleteRoom(index) {
      this.list.splice(index, 1);
    },
    renderComponent(h, params, type, list) {
      switch (type) {
        case 'input':
          return h('div', [
            h('Input', {
              props: {
                placeholder: params.column.title,
                value: this.list[params.index] && this.list[params.index][params.column.key] || ''
              },
              on: {
                'on-blur': (e) => {
                  this.list[params.index][params.column.key] = e.target.value;
                }
              }
            }),
          ]);
        case 'select':
          const options = list.map(item => {
            return h('Option', {
              props: {
                label: item.name,
                value: item.id,
              }
            });
          })
          return h('div', [
            h('Select', {
              props: {
                value: this.list[params.index] && this.list[params.index][params.column.key] || '',
              },
              on: {
                'on-change': (val) => {
                  this.list[params.index][params.column.key] = val;
                }
              }
            }, options),
          ]);
        case 'cascader':
          return h('div', [
            h('Cascader', {
              props: {
                data: list,
                value: this.list[params.index] && this.list[params.index][params.column.key] || [],
              },
              on: {
                'on-change': (val) => {
                  this.list[params.index][params.column.key] = val;
                }
              }
            })
          ])
      }
    },
  },
}
</script>

<style scoped>
.btn-box {
  text-align: center;
  margin-top: 20px;
}
.btn-box.right {
  text-align: right;
  margin: 0 0 16px;
}
.btn-box button {
  padding: 5px 30px;
}
</style>
