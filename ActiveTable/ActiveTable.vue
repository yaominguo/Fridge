<template>
  <a-table
    :rowKey="rowKey"
    :columns="layout"
    :dataSource="data"
    :bordered="bordered"
    :rowClassName="setClassName"
    :rowSelection="rowSelection"
    :customRow="customRow"
    :pagination="pagination"
    @change="handleTableChange"
  >
    <span v-for="item in renderItems" :key="item.dataIndex" :slot="item.dataIndex" slot-scope="text, record">
      <a v-if="item.type === 'link'" @click="item.onClick(record)">{{ text || item.linkText }}</a>
      <span v-else-if="item.type === 'date'">{{ $tool.transformDate(text) }}</span>
      <span v-else-if="item.type === 'money'">{{ $tool.toMoney(text) }}</span>
      <a-input
        v-else-if="item.type === 'input'"
        v-model="record[item.dataIndex]"
        :disabled="item.disabled"
        :placeholder="item.placeholder"
        style="width: 100%;" />
      <a-select
        v-else-if="item.type === 'select'"
        v-model="record[item.dataIndex]"
        :disabled="item.disabled"
        :placeholder="item.placeholder"
        allowClear
        style="width: 100%;">
        <a-select-option
          v-for="option in item.options"
          :key="option.value"
          :value="option.value">
          {{ option.label }}
        </a-select-option>
      </a-select>
      <a-radio-group
        v-if="item.type === 'radio'"
        v-model="record[item.dataIndex]"
        :options="item.options"
        :disabled="item.disabled" />
    </span>
    <template slot="footer">
      <slot name="footer" />
    </template>
    <span v-for="item in slotItems" :key="item.dataIndex" :slot="item.scopedSlots.customRender" slot-scope="text, record">
      <slot :name="item.scopedSlots.customRender" :text="text" :record="record" />
    </span>
  </a-table>
</template>

<script>
export default {
  name: 'ActiveTable',
  props: {
    rowKey: {
      type: String,
      default: ''
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    showPager: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: true
    },
    stripe: { // 是否显示斑马纹
      type: Boolean,
      default: true
    },
    rowSelect: { // 开启单行选择
      type: Boolean,
      default: true
    },
    multiSelect: { // 开启多选
      type: Boolean,
      default: false
    },
    multiSelectDisabled: { // 开启多选后， 是否disable多选的checkbox
      type: Boolean,
      default: false
    },
    multiSelectDefaultChecked: { // 开启多选后，根据此key来判断每行默认选中状态
      type: [Boolean, String, Function],
      default: ''
    },
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      selectedRowKeys: [],
      selectedRows: {},
      renderItems: [],
      slotItems: []
    }
  },
  methods: {
    setClassName (record, index) {
      if (this.selectedRowKeys.indexOf(record[this.rowKey]) >= 0 && this.rowSelect) {
        return 'selected-row'
      } else {
        if (!this.stripe) {
          return ''
        }
        return index % 2 === 1 ? 'odd' : 'even'
      }
    },
    handleTableChange (pagination, filters, sorter) {
      this.$emit('on-filter-change', filters)
      this.$emit('on-page-change', pagination)
    },
    customRow (record) {
      if (!this.rowSelect) return {}
      return {
        props: {},
        on: {
          click: () => {
            // 选中项
            this.selectedRows = record
            // 选中项主键
            this.selectedRowKeys = [record[this.rowKey]]
            this.$emit('on-select-change', [record[this.rowKey]], record)
          }
        }
      }
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.$emit('on-select-change', selectedRowKeys, selectedRows)
    },
    // 开启多选后 - 选择框的默认属性配置
    getCheckboxProps (record) {
      return {
        props: {
          defaultChecked: record[this.multiSelectDefaultChecked],
          disabled: this.multiSelectDisabled
        }
      }
    }
  },
  computed: {
    rowSelection () {
      if (!this.multiSelect) return null
      return { onChange: this.onSelectChange, getCheckboxProps: this.getCheckboxProps }
    },
    pagination () {
      if (!this.showPager) return false
      return { showQuickJumper: true, total: this.total, current: this.currentPage }
    },
    layout () {
      /* eslint-disable */ 
      this.selectedRowKeys = this.data.length > 0 ? [this.data[0][this.rowKey]] : []
      this.selectedRows = this.data.length > 0 ? this.data[0] : {}
      const columns = [...this.columns]
      columns.forEach(item => {
        if (item.type) {
          item.scopedSlots = { customRender: item.dataIndex }
          this.renderItems.push(item)
        } else {
          if (item.scopedSlots) {
            this.slotItems.push(item)
          }
        }
      })
      return columns
    }
  }
}
</script>
