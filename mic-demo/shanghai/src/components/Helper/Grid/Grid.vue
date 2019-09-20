<template>
  <div class="ov-grid-wrapper">
    <h3 v-if="header" class="ov-grid-header">
        <Row>
          <Col :span="12">
            <Icon v-if="header.icon" class="ov-form-header-icon" :type="header.icon"></Icon>
            <span class="ov-form-header-title">{{ header.title }}</span>
          </Col>
          <Col :span="12">
            <div class="ov-grid-header-actions">
              <template v-for="button in header.actions">
                <Button :key="button.name"
                  class="ov-grid-header-actions-button"
                  :type="button.type"
                  size="small"
                  :to="{ name: button.to }">
                  {{ button.name }}
                  </Button>
              </template>
            </div>
          </Col>
        </Row>
    </h3>
    <Row>
      <Col>
        <Table class="ov-grid-table"
          :columns="columns"
          :data="data"
          :border="border"
          :stripe="stripe">
        </Table>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'Grid',
  props: {
    header: {
      type: Object,
      default() {
        return {};
      },
    },
    layout: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    actions: {
      type: Array,
      default() {
        return [];
      },
    },
    actionsWidth: {
      type: Number,
    },
    border: {
      type: Boolean,
      default: true,
    },
    stripe: {
      type: Boolean,
      default: true,
    },
    showIndex: {
      type: Boolean,
      default: false,
    },
    showChekcbox: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.$nextTick(this.initColumns);
  },
  data() {
    return {
      columns: [],
    };
  },
  methods: {
    initColumns() {
      const layout = this.layout;
      if (this.showIndex) {
        this.setIndexColumn();
      }
      if (this.showChekcbox) {
        this.setCheckboxColumn();
      }
      Object.keys(layout).forEach((key) => {
        const column = {
          title: layout[key].title,
          key: layout[key].name,
          width: layout[key].width || '',
        };
        this.columns.push(column);
      });
      if (this.actions.length > 0) {
        this.setActionsColumn();
      }
    },
    setIndexColumn() { // 序号列参数
      const indexColumn = {
        type: 'index',
        align: 'center',
        width: 50,
      };
      this.columns.push(indexColumn);
    },
    setCheckboxColumn() { // 复选框参数
      const checkboxColumn = {
        type: 'selection',
        align: 'center',
        width: 60,
      };
      this.columns.push(checkboxColumn);
    },
    setActionsColumn() { // 行操作参数
      const actionsColumn = {
        title: '操作',
        key: 'actions',
        align: 'center',
        width: this.actionsWidth || 200,
        render: (h, params) => {
          const buttons = [];
          this.actions.forEach((item) => {
            if (typeof item.filter === 'function' && !item.filter(params)) {
              return;
            }
            buttons.push(
              h('Button', {
                props: {
                  type: item.type,
                  icon: item.icon,
                  size: 'small',
                },
                attrs: {
                  title: item.title,
                },
                style: {
                  marginRight: '5px',
                },
                on: {
                  click: () => {
                    if (item.click) { // 根据预设事件名，$emit 到组件外部，并且可使用行内所有字段作为参数
                      this.$emit(item.click, params.row);
                    }
                  },
                },
              }, item.name),
            );
          });
          return h('div', [buttons]);
        },
      };
      this.columns.push(actionsColumn);
    },
  },
};
</script>

<style scoped>
.ov-grid-header {
  text-align: left;
  font-size: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 16px;
}
.ov-grid-header-actions {
  text-align: right;
}
.ov-grid-header-actions-button {
  margin-left: 8px;
}
</style>

<style>
.ov-grid-wrapper .ov-grid-table .ivu-btn {
  background: #efefef;
}
</style>

