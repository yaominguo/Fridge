<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
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
import { GlobalDataProps, PostProps } from '@/store'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'

export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup() {
    const router = useRouter()
    const store = useStore<GlobalDataProps>()
    const titleRules: RulesProp = [{ type: 'required', message: '不能为空' }]
    const contentRules: RulesProp = [{ type: 'required', message: '不能为空' }]
    const titleVal = ref('')
    const contentVal = ref('')
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { columnId } = store.state.user
        if (!columnId) return
        const post: PostProps = {
          id: new Date().getTime(),
          title: titleVal.value,
          content: contentVal.value,
          columnId,
          createdAt: new Date().toLocaleString()
        }
        store.commit('createPost', post)
        router.push({ name: 'column', params: { id: columnId } })
      }
    }
    return {
      titleRules,
      titleVal,
      contentRules,
      contentVal,
      onFormSubmit
    }
  }
})
</script>
