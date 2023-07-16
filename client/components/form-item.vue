<template>
  <n-form-item v-if="type === 'options'" :label="label" :path="path">
    <n-select
      :show="show"
      :value="modelValue"
      v-on:focus="show = true"
      v-on:change="updateModelValue($event)"
      :placeholder="placeholder"
      :options="options"
    />
  </n-form-item>
  <n-form-item v-else-if="type === 'date'" :label="label" :path="path">
    <n-date-picker :value="dateValue" v-on:change="updateModelValue($event)" type="date" />
  </n-form-item>
  <n-form-item v-else :label="label" :path="path">
    <n-input
      :value="modelValue"
      @input="updateModelValue($event)"
      :placeholder="placeholder"
      :type="type === 'textarea' ? 'textarea' : 'text'"
    />
  </n-form-item>
</template>

<script lang="ts">
import { NFormItem, NInput, NSelect, NDatePicker } from 'naive-ui'
export default {
  name: 'FormItem',
  data() {
    return {
      show: false,
    }
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    path: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  components: {
    NFormItem,
    NInput,
    NSelect,
    NDatePicker,
  },
  methods: {
    updateModelValue(value: string | number | Date) {
      console.log('updateModelValue', value)
      if (this.type === 'date') {
        this.$emit('update:modelValue', new Date(value))
      } else {
        this.$emit('update:modelValue', value)
      }
      this.show = false
    },
  },
  computed: {
    dateValue() {
      if (this.type === 'date') {
        if (this.modelValue) {
          return new Date(this.modelValue).getTime()
        } else {
          return new Date().getTime()
        }
      } else {
        return undefined
      }
    },
  },
}
</script>
