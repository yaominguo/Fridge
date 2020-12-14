<template>
  <div class="file-upload">
    <div
      class="file-upload-container"
      @click.prevent="triggerUpload"
      v-bind="$attrs"
    >
      <slot name="loading" v-if="fileStatus === 'loading'">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>
      <slot
        name="uploaded"
        v-else-if="fileStatus === 'success'"
        :uploadedData="uploadedData"
      >
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input
      @change.prevent="handleFileChange"
      class="file-input d-none"
      ref="fileInput"
      type="file"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import axios from 'axios'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean
export default defineComponent({
  name: 'Uploader',
  props: {
    actions: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>
    }
  },
  inheritAttrs: false,
  emits: ['file-uploaded', 'file-uploaded-error'],
  setup(props, context) {
    const fileInput = ref<HTMLInputElement | null>(null)
    const fileStatus = ref<UploadStatus>('ready')
    const uploadedData = ref()
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const handleFileChange = (e: Event) => {
      const { files } = e.target as HTMLInputElement
      if (files) {
        const uploadedFile = Array.from(files)
        if (props.beforeUpload) {
          const result = props.beforeUpload(uploadedFile[0])
          if (!result) return
        }
        fileStatus.value = 'loading'
        const formData = new FormData()
        formData.append(uploadedFile[0].name, uploadedFile[0])
        axios
          .post(props.actions, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
          .then(res => {
            uploadedData.value = res.data
            context.emit('file-uploaded', res.data)
            fileStatus.value = 'success'
          })
          .catch(err => {
            fileStatus.value = 'error'
            context.emit('file-uploaded-error', err)
          })
          .finally(() => {
            if (fileInput.value) {
              fileInput.value.value = ''
            }
          })
      }
    }
    return {
      fileInput,
      fileStatus,
      uploadedData,
      triggerUpload,
      handleFileChange
    }
  }
})
</script>
