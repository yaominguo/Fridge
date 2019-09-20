/** 基于iview table的组件封装 */
<template>
  <div>
    <slot name="header" /> <!-- 可自定义头部 -->
    <p v-if="showTitle" class="title">
      <Icon size="18" :type="titleIcon" />
      {{titleMessage}}
    </p>
    <Table
      @on-selection-change="handleSelect"
      :stripe="stripe"
      :border="border"
      :columns="columns"
      :data="data">
    </Table>
    <div v-if="showPager" class="pager">
      <Page
        @on-change="handlePageChange"
        :page-size="pageSize"
        :current="current"
        :total="total"
        :show-total="showTotal"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActiveTable',
  props: {
    columns: { // table列配置
      type: Array,
      required: true,
    },
    data: { // table数据
      type: Array,
      default: [],
    },
    stripe: { // 是否显示间隔斑马纹
      type: Boolean,
      default: false,
    },
    border: { // 是否显示纵向边框
      type: Boolean,
      default: true,
    },
    showPager: { // 是否显示分页
      type: Boolean,
      default: true,
    },
    pageSize: { // 每页展示几条数据（默认10）
      type: Number,
      default: 10,
    },
    current: { // 当前页码
      type: Number,
      default: 1,
    },
    showTotal: { // 是否显示共几条数据
      type: Boolean,
      default: true,
    },
    total: { // 总共几条数据
      type: String | Number,
      default: 0,
    },
    showTitle: { // 是否显示标题栏
      type: Boolean,
      default: false,
    },
    titleMessage: { // 标题栏信息（默认为‘查询结果’）
      type: String,
      default: '查询结果'
    },
    titleIcon: { // 标题栏图标（默认为‘ios-podium’）
      type: String,
      default: 'ios-podium',
    }
  },
  methods: {
    /**
     * （多选模式下）table行选中项发生变化时就会触发
     *  @param {Array} list [已选项数据]
     */
    handleSelect(list) {
      this.$emit('on-select-change', list);
    },
    /**
     * 点击分页的页数回调
     * @param {Number} page [当前页码]
     */
    handlePageChange(page) {
      this.$emit('on-page-change', page);
    }
  },
}
</script>

<style scoped>
.pager {
  text-align: center;
  margin: 10px 0;
}
.title {
  display: flex;
  align-items: center;
  padding: 10px 0;
  margin-top: 10px;
  border-top: 1px solid #dcdee2;
}
</style>

