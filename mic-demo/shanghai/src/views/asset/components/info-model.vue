<template>
  <Card dis-hover>
    <Form :label-width="70">
      <Row>
        <Col :span="8">
          <FormItem :label="label">
            <Input v-model="searchName" :placeholder="'请输入'+label" />
          </FormItem>
        </Col>
        <Col :span="8" :offset="1">
          <Button @click="handleSearch" type="primary">查询</Button>
          <Button @click="handleReset" type="primary" ghost>重置</Button>
        </Col>
      </Row>
    </Form>
    <Divider style="margin: 0 0 16px;"/>
    <ActiveTable
      :columns="columns"
      :data="dataSource"
      :pageSize="pageSize"
      :current="pageNo"
      :total="total"
      @on-page-change="changePage"
    >
      <div slot="header" class="btn-box">
        <Button @click="addNewRow" type="primary">新增</Button>
      </div>
    </ActiveTable>
  </Card>
</template>

<script>
import ActiveTable from '@/components/Helper/Table/ActiveTable';

export default {
  name: 'InfoModel',
  components: {
    ActiveTable,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    searchUrl: {
      type: String,
    },
  },
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 0,
      searchName: '',
      columns: [
        {
          title: '序号',
          key: 'index',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', params.index + 1);
          },
        },
        {
          title: this.label,
          key: 'name',
          align: 'center',
          render: (h, params) => {
            if (params.row.isEdit) {
              return h('div', [
                h('Input', {
                  props: {
                    placeholder: '请输入'+this.label,
                    value: params.row.name || '',
                  },
                  on: {
                    'on-blur': (e) => {
                      params.row.name = e.target.value;
                    }
                  }
                }),
              ])
            }
            return h('div', params.row.name);
          },
        },
        {
          title: '操作',
          key: 'operate',
          align: 'center',
          width: 150,
          render: (h, params) => {
            const whichBtn = params.row.isEdit
              ? h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                },
                on: {
                  click: () => {
                    this.saveRow(params.row, params.index);
                  },
                }
              }, '保存')
              : h('Button', {
                props: {
                  type: 'warning',
                  size: 'small',
                },
                on: {
                  click: () => {
                    this.editRow(params.index);
                  },
                }
              }, '修改');
            return h('div', [
              whichBtn,
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
                    this.deleteRow(params.row.id, params.index);
                  }
                }
              }, '删除'),
            ])
          }
        }
      ],
      dataSource: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    changePage(page) {
      this.pageNo = page;
      this.getList();
    },
    getList() {
      const params = {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        name_l: this.searchName,
      };
      this.$ajax.post(
        this,
        this.searchUrl,
        params,
        (res) => {
          this.total = res.data.totalRows;
          this.dataSource = res.data.content;
        },
      );
    },
    handleSearch() {
      this.pageNo = 1;
      this.getList();
    },
    handleReset() {
      this.searchName = '';
      this.pageNo = 1;
      this.getList();
    },
    addNewRow() {
      this.dataSource.unshift({
        isEdit: true,
      })
    },
    deleteRow(id, index) {
      if (id) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除此数据吗？</p>',
          onOk: () => {
            this.$ajax.delete(
              this,
              this.url + id,
              {},
              (res) => {
                this.$Message.success('删除成功');
                this.getList();
              }
            )
          },
        });
      } else {
        this.dataSource.splice(index, 1);
      }
    },
    editRow(index) {
      const data = Object.assign(this.dataSource[index], { isEdit: true, });
      this.dataSource.splice(index, 1, data);
    },
    saveRow(data) {
      if (!data.name) {
        this.$Message.error('请输入名称');
        return;
      }
      if (data.id) {
        const params = {
          id: data.id,
          name: data.name,
        };
        this.$ajax.put(
          this,
          this.url + data.id,
          params,
          (res) => {
            this.$Message.success('修改成功');
            this.getList();
          }
        );
      } else {
        const params = {
          name: data.name,
        };
        this.$ajax.post(
          this,
          this.url,
          params,
          (res) => {
            this.$Message.success('新增成功');
            this.getList();
          }
        );
      }
    },
  },
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
