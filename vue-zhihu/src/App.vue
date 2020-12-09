<template>
  <div class="container">
    <GlobalHeader :user="user" />
    <router-view />
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">Copy Right 2020 MR.Guo</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'

const currentUser: UserProps = {
  isLogin: false,
  name: '郭郭郭',
  id: 1
}
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader
  },
  setup() {
    return {
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
