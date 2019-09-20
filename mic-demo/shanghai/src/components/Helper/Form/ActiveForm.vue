<template>
  <Form class="ov-form"
    ref="form"
    :model="model"
    :rules="rules"
    :label-position="labelPosition"
    :label-width="labelWidth">
    <h3 v-if="header" class="ov-form-header">
        <Icon v-if="header.icon" class="ov-form-header-icon" :type="header.icon"></Icon>
        <span class="ov-form-header-title">{{ header.title }}</span>
    </h3>
    <slot name="pre"></slot>
    <Row v-for="(row, rowKey) in layout" :key="rowKey" :gutter="16">
      <Col v-for="(item, key) in row"
        :key="key"
        :span="item.width">
        <ActiveFormItem :entry="key"
          :item="item"
          :model='model'
          @on-item-click="handleClick"
          @on-item-change="handleChange">
        </ActiveFormItem>
      </Col>
    </Row>
    <slot></slot>
    <Row v-if="actions.length !== 0">
      <Col span="24" :class="actionsClass">
        <Button
          v-for="button in actions"
          :key="button.name"
          :icon="button.icon"
          :type="button.type"
          :long="button.long"
          :disabled="button.disabled"
          :html-type="buttonType(button.submit)"
          class="form-btn"
          :class="button.class"
          @click="handleClick(button.click)">
              {{ button.name }}
          </Button>
      </Col>
    </Row>
  </Form>
</template>

<script>
import ActiveFormItem from '@/components/Helper/Form/ActiveFormItem';

export default {
  name: 'ActiveForm',
  components: {
    ActiveFormItem,
  },
  props: {
    refs: {
      type: String,
    },
    header: {
      type: Object,
      default() {
        return {};
      },
    },
    layout: {
      type: [Array, Object],
      required: true,
    },
    model: {
      type: Object,
      default() {
        return {};
      },
    },
    rules: {
      type: Object,
      default() {
        return {};
      },
    },
    actions: {
      type: Array,
      default() {
        return [];
      },
    },
    actionsAlign: {
      type: String,
      default: 'left',
    },
    labelPosition: {
      type: String,
      default: 'top',
    },
    labelWidth: {
      type: Number,
    },
  },
  data() {
    return {

    };
  },
  computed: {
    actionsClass() {
      return `ov-form-actions ov-form-actions-${this.actionsAlign}`;
    },
  },
  methods: {
    buttonType(type) { // 判断 button 的 html-type 属性值
      return type ? 'submit' : 'button';
    },
    handleClick(event) { // 自定义按键事件名称
      if (event) {
        this.$emit(event, this.$refs);
      }
    },
    handleChange(label, data, param) {
      this.$emit('on-change', data, param, label);
      this.$emit(`on-${label}-change`, data, param);
    },
    /**
     * 校验数据
     * @param {Function} fn [当数据校验无误时执行此函数]
     */
    checkData(fn) {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (typeof(fn) == 'function') {
            fn();
          }
        } else {
            this.$Message.error('请检查表单信息!');
        }

      })
    }
  },
};
</script>

<style scoped>
.ov-form-header {
  text-align: left;
  font-size: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 16px;
}
.ov-form-header-icon, .ov-form-header-title {
  vertical-align: middle;
}
.ov-form-actions {
  margin-top: 16px;
  border-top: 1px solid #e0e0e0;
  padding-top: 16px;
}
.ov-form-actions-left {
  text-align: left;
}
.ov-form-actions-right {
  text-align: right;
}
.ov-form-actions-center {
  text-align: center;
}
</style>
