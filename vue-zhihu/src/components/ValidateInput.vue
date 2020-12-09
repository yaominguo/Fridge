<template>
  <div class="validate-input-container pb-3">
    <input
      v-if="tag === 'input'"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      v-bind="$attrs"
    />
    <textarea
      v-else
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      v-bind="$attrs"
    />
    <span v-if="inputRef.error" class="invalid-feedback">
      {{ inputRef.message }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive } from 'vue'
import { emitter } from './ValidateForm.vue'
interface RuleProp {
  type: 'required' | 'email'
  message: string
}
const emailReg = /[\w-.]+@[\w-]+(.[\w_-]+)+/
export type RulesProp = RuleProp[]
export type TagType = 'input' | 'textarea'
export default defineComponent({
  name: 'ValidateInput',
  inheritAttrs: false,
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  setup(props, context) {
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    const validateInput = (): boolean => {
      if (!props.rules) return true
      const allPassed = props.rules.every(rule => {
        let passed = true
        inputRef.message = rule.message
        switch (rule.type) {
          case 'required':
            passed = inputRef.val.trim() !== ''
            break
          case 'email':
            passed = emailReg.test(inputRef.val)
            break
          default:
            break
        }
        return passed
      })
      inputRef.error = !allPassed
      return allPassed
    }
    const updateValue = (e: KeyboardEvent): void => {
      const { value } = e.target as HTMLInputElement
      inputRef.val = value
      context.emit('update:modelValue', value)
    }
    onMounted(() => emitter.emit('form-item-created', validateInput))
    return {
      inputRef,
      validateInput,
      updateValue
    }
  }
})
</script>
