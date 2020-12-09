<template>
  <div class="column-detail-page w75 mx-auto">
    <div
      v-if="column"
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
    >
      <div class="col-3 text-center">
        <img
          :src="column.avatar"
          :alt="column.title"
          class="rounded-circle border w-100"
        />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <PostList :list="list" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { testData, testPosts } from '@/testData'
import PostList from '../components/PostList.vue'
export default defineComponent({
  name: 'ColumnDetail',
  components: { PostList },
  setup() {
    const route = useRoute()
    const { id } = route.params
    const column = testData.find(item => item.id === +id)
    const list = testPosts.filter(item => item.columnId === +id)
    return {
      column,
      list
    }
  }
})
</script>
