<template>
    <Upload
        :action="action"
        :multiple="multiple"
        :max-size="maxSize"
        :max-count="maxCount"
        :format="ext"
        :on-success="handleSuccess"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload">
        <slot></slot>
    </Upload>
</template>
<script>
export default {
  props: {
    defaultList: {
      type: [Object, Array],
      default() {
        return [];
      },
    },
    action: {
      type: String,
      required: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    ext: {
      type: [String, Array],
      default() {
        return ['jpg', 'jpeg', 'png'];
      },
    },
    maxSize: {
      type: Number,
      default: 2048,
    },
    maxCount: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      uploadList: [],
    };
  },
  methods: {
    handleSuccess(res, file) {
      this.$emit('on-file-success', res, file);
    },
    handleFormatError(file) {
      this.$emit('on-format-error', file);
    },
    handleMaxSize(file) {
      this.$emit('on-max-size-error', file);
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < this.maxCount;
      this.$emit('on-max-count-error', check);
      return check;
    },
  },
  watch: {
    uploadList(cv) {
      this.$emit('on-change', cv);
    },
  },
};
</script>
