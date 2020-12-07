<template>
  <div class="container">
    <GlobalHeader :user="user" />
    <ColumnList :list="list" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
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
    GlobalHeader
  },
  setup() {
    return {
      list: testData,
      user: currentUser
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
