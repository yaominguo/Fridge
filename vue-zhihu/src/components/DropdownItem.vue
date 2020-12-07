<template>
  <li
    class="dropdown-item dropdown-option"
    :class="{ 'is-disabled': disabled }"
  >
    <slot />
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DropdownItem',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped>
.dropdown-option {
  cursor: pointer;
}
.dropdown-item.is-disabled {
  color: #6c757d;
  cursor: not-allowed;
  background: transparent;
}
</style>
