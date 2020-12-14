<template>
  <div>
    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="exampleInputEmail" class="form-label">邮箱地址</label>
        <ValidateInput
          v-model="emailVal"
          :rules="emailRules"
          type="email"
          placeholder="请输入邮箱地址"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">昵称</label>
        <ValidateInput
          v-model="nameVal"
          :rules="nameRules"
          type="text"
          placeholder="请输入昵称"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <ValidateInput
          v-model="pwdVal"
          :rules="pwdRules"
          type="password"
          placeholder="请输入密码"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">确认密码</label>
        <ValidateInput
          v-model="repeatVal"
          :rules="repeatRules"
          type="password"
          placeholder="请再次输入密码"
        />
      </div>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { useRouter } from 'vue-router'
import { createMessage } from '../components/createMessage'
import axios from 'axios'

export default defineComponent({
  name: 'SignUp',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup() {
    const router = useRouter()
    const emailVal = ref('')
    const nameVal = ref('')
    const pwdVal = ref('')
    const repeatVal = ref('')
    const emailRules: RulesProp = [
      { type: 'required', message: '不能为空' },
      { type: 'email', message: '不是有效的邮箱地址' }
    ]
    const nameRules: RulesProp = [{ type: 'required', message: '不能为空' }]
    const pwdRules: RulesProp = [
      { type: 'required', message: '不能为空' },
      { type: 'pwd', message: '密码少于6位数' }
    ]
    const repeatRules: RulesProp = [
      { type: 'required', message: '不能为空' },
      { type: 'pwd', message: '密码少于6位数' },
      {
        type: 'custom',
        message: '两次密码输入不一致',
        validator: () => pwdVal.value === repeatVal.value
      }
    ]
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          email: emailVal.value,
          password: pwdVal.value,
          nickName: nameVal.value
        }
        axios
          .post('/mock/api/users', payload)
          .then(() => {
            createMessage('注册成功 正在跳转登录页面', 'success')
            setTimeout(() => {
              router.push('/login')
            }, 2000)
          })
          .catch(err => console.error(err))
      }
    }
    return {
      emailVal,
      nameVal,
      pwdVal,
      repeatVal,
      emailRules,
      nameRules,
      pwdRules,
      repeatRules,
      onFormSubmit
    }
  }
})
</script>
