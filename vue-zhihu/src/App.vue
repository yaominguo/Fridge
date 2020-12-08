<template>
  <div class="container">
    <GlobalHeader :user="user" />
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
        <label for="exampleInputPassword" class="form-label">密码</label>
        <ValidateInput
          v-model="pwdVal"
          :rules="pwdRules"
          type="password"
          placeholder="密码"
        />
      </div>
      <!-- <template #submit>
        <button class="btn btn-danger">Submit</button>
      </template> -->
    </ValidateForm>
    <ColumnList :list="list" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'
const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'a',
    description: '这是a',
    avatar: 'https://avatars0.githubusercontent.com/u/16506946?s=100&v=4'
  },
  {
    id: 2,
    title: 'b',
    description: '这是b',
    avatar: 'https://avatars0.githubusercontent.com/u/16506946?s=100&v=4'
  },
  {
    id: 3,
    title: 'b',
    description: '这是b',
    avatar: 'https://avatars0.githubusercontent.com/u/16506946?s=100&v=4'
  },
  {
    id: 4,
    title: 'b',
    description: '这是b'
  },
  {
    id: 5,
    title: 'b',
    description: '这是b',
    avatar: 'https://avatars0.githubusercontent.com/u/16506946?s=100&v=4'
  }
]
const currentUser: UserProps = {
  isLogin: true,
  name: '郭郭郭',
  id: 1
}
export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader,
    ValidateInput,
    ValidateForm
  },
  setup() {
    const emailRules: RulesProp = [
      { type: 'required', message: '不能为空' },
      { type: 'email', message: '不是有效的邮箱地址' }
    ]
    const pwdRules: RulesProp = [{ type: 'required', message: '不能为空' }]
    const emailVal = ref('')
    const pwdVal = ref('')
    const onFormSubmit = (result: boolean) => {
      console.log('submit', result)
    }
    return {
      list: testData,
      user: currentUser,
      emailRules,
      pwdRules,
      emailVal,
      pwdVal,
      onFormSubmit
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
