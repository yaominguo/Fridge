<template>
<Card dis-hover>
  <Form :label-width="100">
    <Row>
      <Col :span="6">
        <FormItem label="出资方">
          <Input v-model="searchName" />
        </FormItem>
      </Col>
      <Col :span="6">
        <div class="btn-box">
          <Button @click="getData" type="primary" >查询</Button>
          <Button @click="handleReset">重置</Button>
        </div>
      </Col>
    </Row>
  </Form>
  <Divider style="margin: 0 0 16px;"/>
  <div class="wrapper">
    <div class="box" v-for="(item, index) in list" :key="item.id">
      <div class="inner">
        <div v-if="!item.isEdit" class="content">
          <p>{{item.name}}</p>
          <p style="marginTop: 10px;">{{item.remark}}</p>
        </div>
        <div v-else class="content">
          <Input v-model="item.name" class="input" :autosize="{ minRows: 1, maxRows: 1 }" placeholder="请输入出资方名称" type="textarea"/>
          <Input v-model="item.remark" class="input" :autosize="{ minRows: 2, maxRows: 2 }" placeholder="请输入备注" type="textarea" style="marginTop: 10px;"/>
        </div>
        <div v-if="!item.isEdit" class="operate">
          <Button @click="handleEdit(index)" type="text" size="large" icon="ios-create">编辑</Button>
          <Button @click="handleDelete(item.id, index)" type="text" size="large" icon="ios-trash">删除</Button>
        </div>
        <div v-else class="operate">
          <Button @click="handleSave(index)" type="text" size="large" icon="ios-checkmark-circle">保存</Button>
          <Button @click="handleCancel(item.id, index)" type="text" size="large" icon="ios-refresh-circle">取消</Button>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="inner add-btn">
        <Button @click="handleAdd" class="add-btn" type="text" icon="md-add" />
      </div>
    </div>
  </div>
</Card>
</template>

<script>
export default {
  name: 'AssetInvestor',
  data() {
    return {
      pageNo: 1,
      pageSize: 10000,
      searchName: null,
      list: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      const params = {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        name_l: this.searchName,
      };
      this.$ajax.post(
        this,
        this.$api.SEARCH_INVESTOR,
        params,
        (res) => {
          this.list = res.data.content;
        },
      );
    },
    handleReset() {
      this.searchName = null;
      this.getData();
    },
    handleEdit(i) {
      this.list.splice(i, 1, Object.assign(this.list[i], {isEdit:true}));
    },
    handleCancel(id, i) {
      if (id) {
        this.list.splice(i, 1, Object.assign(this.list[i], {isEdit:false}));
      } else {
        this.list.splice(i, 1);
      }
    },
    handleSave(i) {
      const data = this.list[i];
      if (!data.name) {
        this.$Message.error('请输入出资人');
        return;
      }
      if (data.id) {
        const params = {
          id: data.id,
          name: data.name,
          remark: data.remark,
        };
        this.$ajax.put(
          this,
          this.$api.ASSET_INVESTOR + data.id,
          params,
          (res) => {
            this.$Message.success('修改成功');
            this.getData();
          }
        );
      } else {
        const params = {
          name: data.name,
          remark: data.remark,
        };
        this.$ajax.post(
          this,
          this.$api.ASSET_INVESTOR,
          params,
          (res) => {
            this.$Message.success('新增成功');
            this.getData();
          }
        );
      }
    },
    handleDelete(id, i) {
      if (id) {
        this.$Modal.confirm({
          title: '确认删除出资人',
          content: '<p>请确保当前操作出资人已不存在与资产的关联关系，否则将操作失败。</p>',
          onOk: () => {
            this.$ajax.delete(
              this,
              this.$api.ASSET_INVESTOR + id,
              {},
              (res) => {
                this.$Message.success('删除成功');
                this.getData();
              }
            )
          },
        });
      } else {
        this.list.splice(i, 1);
      }
    },
    handleAdd() {
      this.list.push({
        isEdit: true,
        name: '',
        remark: '',
      });
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
