<template>
  <teleport to="#loader">
    <div
      class="d-flex justify-content-center align-items-center h-100 loading-container"
      :style="{ background }"
    >
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status" />
        <p v-if="text" class="text-primary small">{{ text }}</p>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Loader',
  props: {
    text: {
      type: String
    },
    background: {
      type: String,
      default: 'rgba(255,255,255,.5)'
    }
  },
  setup() {
    if (document.querySelector('#loader')) return
    const node = document.createElement('div')
    node.id = 'loader'
    document.body.appendChild(node)
  }
})
</script>

<style scoped>
.loading-container {
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-align: center;
}
</style>
