<template>
  <div>
    <InforBar />
    <Form inline :label-width="80">
      <FormItem label="操作人">
        <Input style="width: 180px;" placeholder="请输入操作人" />
      </FormItem>
      <FormItem label="操作时间">
        <DatePicker style="width: 180px;" type="daterange" />
      </FormItem>
      <FormItem label="操作渠道">
        <Select style="width: 180px;">
          <Option value="官网">官网</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button style="padding: 5px 30px;" type="primary">查询</Button>
      </FormItem>
    </Form>
    <Table border :columns="columns" :data="operateList" />
    <div class="pager">
      <Page @on-change="changePage" :page-size="pageSize"  :total="operateList && operateList.length" show-total />
    </div>
  </div>
</template>

<script>
import InforBar from './info';

export default {
  name: 'OperateDetail',
  components: {
    InforBar,
  },
  data() {
    return {
      pageNo: 1,
      pageSize: 20,
      columns: [
        {
          title: '操作人',
          key: 'name',
        },
        {
          title: '操作类型-子类型',
          key: 'type',
        },
        {
          title: '操作内容',
          key: 'content',
        },
        {
          title: '操作时间',
          key: 'date',
        },
        {
          title: '操作渠道',
          key: 'method',
        },
      ],
      operateList: [],
    }
  },
  methods: {
    changePage(page) {
      this.pageNo = page;
    }
  }
}
</script>

<style scoped>
.pager{
  text-align: center;
  margin: 10px 0;
}
</style>
