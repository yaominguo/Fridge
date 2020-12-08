<template>
  <form class="validate-form-container">
    <slot />
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button class="btn btn-primary" type="submit">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
export const emitter = mitt()
type ValidateFunc = () => boolean
export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup(props, context) {
    let fnCollection: ValidateFunc[] = []
    const submitForm = () => {
      const isAllPassed = fnCollection.map(fn => fn()).every(result => result)
      context.emit('form-submit', isAllPassed)
    }
    const cb = (func?: ValidateFunc) => {
      func && fnCollection.push(func)
    }
    emitter.on('form-item-created', cb)
    onUnmounted(() => {
      emitter.off('form-item-created', cb)
      fnCollection = []
    })
    return {
      submitForm
    }
  }
})
</script>
