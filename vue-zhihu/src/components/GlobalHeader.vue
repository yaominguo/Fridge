<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a href="#" class="navbar-brand">VUE</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link to="/login" class="btn btn-outline-light my2">
          登陆
        </router-link>
      </li>
      <li class="list-inline-item">
        <router-link to="/sign" class="btn btn-outline-light my2">
          注册
        </router-link>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <Dropdown :title="`你好, ${user.nickName}`">
          <DropdownItem>
            <router-link to="/create">新建文章</router-link>
          </DropdownItem>
          <DropdownItem>编辑资料</DropdownItem>
          <DropdownItem @click="logout">退出登陆</DropdownItem>
        </Dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
import { UserProps } from '@/store'
export default defineComponent({
  name: 'GlobalHeader',
  components: { Dropdown, DropdownItem },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup() {
    const logout = localStorage.removeItem('token')
    return {
      logout
    }
  }
})
</script>
