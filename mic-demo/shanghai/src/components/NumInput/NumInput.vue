<template>
  <div class="wrapper">
    <span
      id = "label"
      :style = "{width: this.labelWidth}"
      :title = "label"
    >
      {{label}}
    </span>
    <InputNumber
      id="numInput"
      :value="number"
      :disabled="disabled"
      @on-change = "handleChange"
      :max = "max"
      :min = "min"
      :step = "step"
      :size = "size"
    />
  </div>
</template>

<script>
export default {
  name: 'NumInput',
  props: {
    'label': {
      type: String,
      required: true,
    },
    'value': {
      type: [String, Number, Boolean, Array, Object],
      default: 0,
    },
    'labelWidth': {
      type: String,
    },
    'max': {
      type: Number,
    },
    'min': {
      type: Number,
    },
    'step': {
      type: Number,
    },
    'size': {
      type: String,
    },
    'disabled': {
      type: Boolean,
    }
  },
  methods: {
    handleChange(num) {
      this.$emit('input',num)
    }
  },
  computed: {
    number() {
      return this.value;
    },
  },
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
}
#label {
  display: inline-block;
  border: 1px solid #dcdee2;
  padding: 0 5px;
  box-sizing: border-box;
  border-right: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  background: #f8f8f9;
  height: 32px;
  line-height: 32px;
  text-align: center;
  width: 50px;
  overflow: hidden;
  font-weight: normal;
}
#numInput {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
