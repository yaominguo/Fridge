<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <Uploader
      actions="/mock/api/upload"
      :beforeUpload="uploadCheck"
      @file-uploaded="handleFileUploaded"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
    >
      <h2>点击上传图片</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-seconda" role="status"></div>
          <h2>正在上传...</h2>
        </div>
      </template>
      <template #uploaded="{uploadedData}">
        <img :src="uploadedData.data.url" />
      </template>
    </Uploader>
    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="exampleInputEmail" class="form-label">文章标题</label>
        <ValidateInput
          v-model="titleVal"
          :rules="titleRules"
          type="text"
          placeholder="请输入文章标题"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章内容</label>
        <ValidateInput
          v-model="contentVal"
          :rules="contentRules"
          tag="textarea"
          rows="10"
          placeholder="请输入文章内容"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps, PostProps, ResponseType, ImageProps } from '@/store'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import Uploader from '../components/Uploader.vue'
import { beforeUploadCheck } from '../helper'
import createMessage from '../components/createMessage'

export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateInput,
    ValidateForm,
    Uploader
  },
  setup() {
    const router = useRouter()
    const store = useStore<GlobalDataProps>()
    const titleRules: RulesProp = [{ type: 'required', message: '不能为空' }]
    const contentRules: RulesProp = [{ type: 'required', message: '不能为空' }]
    const titleVal = ref('')
    const contentVal = ref('')
    let imageId = ''
    const handleFileUploaded = (data: ResponseType<ImageProps>) => {
      if (data.data._id) {
        imageId = data.data._id
      }
    }
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column, _id } = store.state.user
        if (!column) return
        const post: PostProps = {
          title: titleVal.value,
          content: contentVal.value,
          column,
          author: _id,
          createdAt: new Date().toLocaleString()
        }
        if (imageId) {
          post.image = imageId
        }
        store.dispatch('createPost', post).then(() => {
          createMessage('发表成功 2秒后跳转到文章', 'success', 2000)
          setTimeout(() => {
            router.push({ name: 'column', params: { id: column } })
          }, 2000)
        })
      }
    }
    const uploadCheck = (file: File) => {
      const { passed, error } = beforeUploadCheck(file, {
        format: ['image/jpeg', 'image/png'],
        size: 1
      })
      if (error === 'format') {
        createMessage('上传图片只能是jpg或png格式', 'error')
      }
      if (error === 'size') {
        createMessage('上传图片大小不能超过1Mb', 'error')
      }
      return passed
    }
    return {
      titleRules,
      titleVal,
      contentRules,
      contentVal,
      onFormSubmit,
      uploadCheck,
      handleFileUploaded
    }
  }
})
</script>
<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
