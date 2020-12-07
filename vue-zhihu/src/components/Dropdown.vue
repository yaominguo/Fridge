<template>
  <div class="dropdown">
    <a
      href="#"
      class="btn btn-outline-light my2 dropdown-toggle"
      @click.prevent="toggleOpen"
    >
      {{ title }}
    </a>
    <ul class="dropdown-menu" v-show="isOpen" style="display:block;">
      <slot />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const isOpen = ref(false)
    const toggleOpen = () => (isOpen.value = !isOpen.value)
    return {
      isOpen,
      toggleOpen
    }
  }
})
</script>
