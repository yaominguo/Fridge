<template>
  <div class="container">
    <Loader v-if="isLoading" text="Loading ..." />
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
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue'
import Loader from './components/Loader.vue'
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loader
  },
  setup() {
    const store = useStore()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    return {
      user: currentUser,
      isLoading
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
