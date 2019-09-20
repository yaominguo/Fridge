<template>
  <Card dis-hover>
    <Form :label-width="88">
      <Row>
        <Col :span="6">
          <FormItem label="房源">
            <Input v-model="searchModel.houseName_l"/>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="产权人">
            <Input v-model="searchModel.accountName_l" />
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="产权编号">
            <Input v-model="searchModel.cardNo_l" />
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
    <Divider style="margin: 0 0 16px;" />
    <ActiveTable
      :columns="columns"
      :data="list"
      :pageSize="pageSize"
      :current="pageNo"
      :total="total"
      @on-page-change="changePage"
    >
      <div slot="header" style="textAlign:right; marginBottom: 16px;">
        <Button @click="routerTo('create-owner')" icon="md-add" type="primary">新增业主合同</Button>
        <Button @click="routerTo('create-free')" icon="md-add" style="marginLeft: 5px;" type="primary">自有产权录入</Button>
      </div>
    </ActiveTable>
  </Card>
</template>

<script>
import ActiveTable from '@/components/Helper/Table/ActiveTable';

export default {
  name: 'HouseProperty',
  components: {
    ActiveTable,
  },
  data() {
    return {
      pageSize: 10,
      pageNo: 1,
      total: 0,
      searchModel: {},
      filters: [
        {
          label: '全部',
          value: '全部',
        },
        {
          label: '未开始',
          value: '未开始',
        },
        {
          label: '在租中',
          value: '在租中',
        },
        {
          label: '已到期',
          value: '已到期',
        },
        {
          label: '已结束',
          value: '已结束',
        },
        {
          label: '已删除',
          value: '已删除',
        },
      ],
      columns: [
        {
          title: '房源',
          key: 'houseName',
        },
        {
          title: '产权人',
          key: 'accountName',
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
              h('span', params.row.accountName),
              params.row.phone ? tip : null,
            ]);
          },
        },
        {
          title: '产权编号',
          key: 'cardNo',
        },
        {
          title: '产权面积(m²)',
          key: 'rightArea',
        },
        {
          title: '操作',
          key: 'operate',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                },
                on: {
                  click: () => {
                    this.routerTo('property-info', params.row.id);
                  }
                }
              } ,'查看'),
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small',
                },
                style: {
                  marginLeft: '5px',
                },
                on: {
                  click: () => {
                    this.routerTo('create-free', params.row.id);
                  }
                }
              } ,'修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                },
                style: {
                  marginLeft: '5px',
                },
                on: {
                  click: () => {
                    this.handleDelete(params.row.id);
                  }
                }
              } ,'删除'),
            ])
          }
        },
      ],
      list: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    handleDelete(id) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定删除此数据吗？</p>',
        onOk: () => {
          this.$ajax.delete(
            this,
            this.$api.DELETE_PROPERTY_DETAIL + id,
            null,
            (res) => {
              this.$Message.success('删除成功');
              this.getList();
            }
          )
        },
      });
    },
    handleSearch() {
      this.pageNo = 1;
      this.getList(this.searchModel);
    },
    handleReset() {
      this.searchModel = {};
      this.pageNo = 1;
      this.getList();
    },
    getList(query = {}) {
      const params = Object.assign(query, {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
      });
      this.$ajax.post(
        this,
        this.$api.POST_PROPERTY_LIST,
        params,
        (res) => {
          this.list = res.data.content;
          this.total = res.data.totalRows;
        }
      )
    },
    routerTo(name, id) {
      this.$router.push({
        name,
        params: {
          id: id || null,
        },
      });
    },
    changePage(page) {
      this.pageNo = page;
      this.getList();
    },
  },
}
</script>
