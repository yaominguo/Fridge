<template>
  <Card dis-hover>
    <h4>{{building.communityId}} | {{building.name}}</h4>
    <Table :columns="columns" :data="list" />
    <div class="btn-box">
      <Button @click="handleSave" type="primary">保存</Button>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'AssetProperty',
  data() {
    return {
      building: {},
      columns: [
        {
          title: '室号',
          key: 'roomNo',
          align: 'center',
        },
        {
          title: '产证人',
          key: 'userName',
          align: 'center',
          render: (h, params) => this.renderComponent(h, params),
        },
        {
          title: '产证编号',
          key: 'rightNo',
          align: 'center',
          render: (h, params) => this.renderComponent(h, params),
        },
        {
          title: '产证类型',
          key: 'rightType',
          align: 'center',
          render: (h, params) => this.renderComponent(h, params, 'select'),
        },
        {
          title: '产证面积',
          key: 'rightArea',
          align: 'center',
          render: (h, params) => this.renderComponent(h, params),
        },
        {
          title: '产证套内面积',
          key: 'rightInsideArea',
          align: 'center',
          render: (h, params) => this.renderComponent(h, params),
        },
        {
          title: '颁证日期',
          key: 'rightTime',
          align: 'center',
          render: (h, params) => this.renderComponent(h, params, 'date'),
        },
      ],
      list: []
    }
  },
  created() {
    const building = {...JSON.parse(localStorage.getItem('buildingInfo'))};
    const list = this.$route.params.data;
    if (building) {
      this.building = building;
    }
    this.list = list || [];
  },
  methods: {
    handleSave() {
      const params = {
        floorId: this.building.id,
        list: this.list,
      };
      this.$ajax.post(
        this,
        this.$api.ADD_ASSET_HOUSE,
        params,
        () => {
          this.$Message.success('新增成功');
          this.$router.go(-2);
        }
      )

    },
    renderComponent(h, params, type) {
      if (type === 'date') {
        return h('div', [
          h('DatePicker', {
            props: {
              value: this.list[params.index] && this.list[params.index][params.column.key] || ''
            },
            on: {
              'on-change': (val) => {
                this.list[params.index][params.column.key] = val;
              }
            }
          }),
        ]);
      }
      if (type === 'select') {
        const list = [
          {name: '房产证'},
          {name: '动迁证明'},
          {name: '小产证公证书'},
        ];
        const options = list.map(item => {
          return h('Option', {
            props: {
              label: item.name,
              value: item.name,
            }
          });
        });
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
        ])
      }
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
    },
  },
}
</script>

<style scoped>
.btn-box {
  text-align: center;
  margin-top: 20px;
}
.btn-box button {
  padding: 5px 30px;
}
h4 {
  margin-bottom: 16px;
}
</style>
