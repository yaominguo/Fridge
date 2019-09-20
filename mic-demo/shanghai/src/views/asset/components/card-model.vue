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

    <CardList
        :dataSource='dataSource'
        :label="label"
        :actions='actions'
        :saveActions="saveActions"
        @editRow="editRow"
        @deleteRow="deleteRow"
        @saveRow="saveRow"
        @add="addNewRow"
        @reset="resetRow"
    >

    </CardList>
  </Card>
</template>

<script>
import CardList from './card-list';
export default {
  name: 'InfoModel',
  components: {
    CardList
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
      pageSize: 10000,
      total: 0,
      searchName: '',
      actions: [
        {
            icon: "ios-create",
            click: "editRow",
            class:"op-left",
            name:'编辑'
        },
        {
            icon:'ios-trash',
            click:'deleteRow',
            name:'删除'
        }
      ],
      saveActions:[
          {
            icon:'ios-checkmark-circle',
            click: "saveRow",
            class:"op-left",
            name:'保存'
        },
        {
            icon:'md-refresh',
            click:"reset",
            name:'取消'
        }
      ],
      dataSource: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
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
      this.dataSource.push({
        isEdit: true,
      })
    },
    deleteRow(item) {
        let id = item.id;
        let index = item.index;
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
    editRow(item) {
        let index = item.index;
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
    resetRow(data){
      this.dataSource[data.index].isEdit=false;
    }
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
