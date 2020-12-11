<template>
  <div>
    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="exampleInputEmail" class="form-label">邮箱地址</label>
        <ValidateInput
          v-model="emailVal"
          :rules="emailRules"
          type="email"
          placeholder="邮箱地址"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <ValidateInput
          v-model="pwdVal"
          :rules="pwdRules"
          type="password"
          placeholder="密码"
        />
      </div>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const emailRules: RulesProp = [
      { type: 'required', message: '不能为空' },
      { type: 'email', message: '不是有效的邮箱地址' }
    ]
    const pwdRules: RulesProp = [{ type: 'required', message: '不能为空' }]
    const emailVal = ref('')
    const pwdVal = ref('')
    const onFormSubmit = (result: boolean) => {
      if (result) {
        router.push({ name: 'home' })
        store.commit('login')
      }
    }
    return {
      emailRules,
      pwdRules,
      emailVal,
      pwdVal,
      onFormSubmit
    }
  }
})
</script>
