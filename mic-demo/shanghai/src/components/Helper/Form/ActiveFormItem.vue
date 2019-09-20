<template>
  <FormItem class="ov-form-item" :label="item.label" :prop="entry">
    <Input v-if="item.type == 'input'" v-model="model[entry]"
      :disabled="item.disabled"
       @on-change="(event) => { handleOnChange(event, model[entry], entry, item.type) }">
    </Input>

    <Input v-if="item.type == 'password'" type="password" v-model="model[entry]"
      @on-change="(event) => { handleOnChange(event, model[entry], entry, item.type) }"></Input>

    <Input v-if="item.type == 'textarea'" type="textarea" v-model="model[entry]"
      @on-change="(event) => { handleOnChange(event, model[entry], entry, item.type) }"></Input>

    <Select v-if="item.type == 'select'" class="ov-form-select" v-model="model[entry]" clearable
       @on-change="(vm) => { handleOnChange(vm, model[entry], entry, item.type) }">
      <Option v-for="option in item.options"
        :key="option.value"
        :value="option.value"
        class="ov-form-select-option">
        {{ option.text }}
      </Option>
    </Select>

    <Cascader v-if="item.type === 'cascader'"
      :data="item.options"
      v-model="model[entry]"
      @on-change="(value, selectedData) => { handleOnChange({ 'value': value, 'selectedData': selectedData },model[entry], entry, item.type) }">
    </Cascader>

    <RadioGroup v-if="item.type === 'radio'" v-model="model[entry]"
      @on-change="(vm) => { handleOnChange(vm, model[entry], entry, item.type) }">
        <Radio v-for="option in item.options"
          :disabled = "option.disabled"
          :key="option.value"
          :label="option.value"
          :style="itemWidth(option.width)"
          class="ov-form-checkbox">
          {{option.text}}
        </Radio>
    </RadioGroup>

    <CheckboxGroup v-if="item.type == 'checkbox'" v-model="model[entry]"
      disabled
      @on-change="(vm) => { handleOnChange(vm, model[entry], entry, item.type) }">
      <Checkbox v-for="option in item.options"
        :disabled = "option.disabled"
        :key="option.value"
        :label="option.value"
        :style="itemWidth(option.width)"
        class="ov-form-checkbox">
        {{option.text}}
      </Checkbox>
    </CheckboxGroup>

    <DatePicker v-if="item.type == 'date'"
      :type="item.dateType?item.dateType:'date'"
      :format="item.format?item.format:'yyyy/MM/dd'"
      :disabled="item.disabled || false"
      transfer
      v-model="model[entry]"
      @on-change="(vm) => { handleOnChange(vm, model[entry], entry, item.type) }">
    </DatePicker>

    <!-- <Upload v-if="item.type == 'file'" action="//jsonplaceholder.typicode.com/posts/">
      <Button :type="item.button.type" :icon="item.button.icon">{{ item.button.text }}</Button>
    </Upload> -->
    <FileUpload v-if="item.type === 'file'"
      :action="item.action"
      :multiple="item.multiple"
      :defaultList="item.defaultList"
      :ext="item.ext"
      :max-size="item.maxSize"
      :max-count="item.maxCount"
      @on-file-success="item.success"
      @on-change="(vm) => { handleOnChange(vm, model[entry], entry, item.type) }">
        <Button :type="item.button.type" :icon="item.button.icon">{{ item.button.text }}</Button>
    </FileUpload>

    <ImageUpload v-if="item.type === 'image'"
      :defaultList="item.defaultList"
      :ext="item.ext"
      :max-size="item.maxSize"
      :url="$api.IMG_UPLOAD_URL"
      :max-count="item.maxCount"
      @on-complete="item.complete"
      @on-remove="item.remove"
      :maxUploads="item.maxNumber"
      :uploadButton="item.uploadIdName">
    </ImageUpload>
  </FormItem>
</template>

<script>

import FileUpload from './file-upload';
import ImageUpload from './image-upload';

export default {
  name: 'ActiveFormItem',
  components: {
    FileUpload,
    ImageUpload,
  },
  props: {
    entry: {
      type: String,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    model: {
      type: [String, Number, Boolean, Array, Object],
      default: '',
    },
  },
  data() {
    return {
    };
  },
  methods: {
    itemWidth(width) {
      return width ? `width:${width}` : '';
    },
    handleClick(event) {
      if (event) {
        this.$emit('on-item-click', event);
      }
    },
    handleOnChange(param, data, label, type) {
      if (type === 'editor' || type === 'image' || type === 'file') {
        this.model[this.entry] = param;
        data = param;
      }
      if (type === 'date') {
        this.model[this.entry] = param;
      }
      this.$emit('on-item-change', label, data, param);
    },
  },
};
</script>

<style scoped>
.ov-form-item {
  font-weight: bold;
  font-size: 14px;
  text-align: left;
}
.ov-form-select, .ov-form-checkbox {
  font-weight: normal;
}
</style>

