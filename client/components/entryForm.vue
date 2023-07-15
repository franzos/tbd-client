<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" :size="size">
    <div v-for="entry of formFields" :key="entry.name">
      <div v-if="entry.type !== 'sub'">
        <FormItem
          :type="entry.type"
          :model-value="formValue[entry.name]"
          v-on:update:modelValue="formValue[entry.name] = $event"
          :label="entry.label"
          :path="entry.name"
          :placeholder="`${entry.placeholder ? entry.placeholder : ''}`"
          :options="entry.options"
        />
      </div>
      <div v-else>
        <n-grid x-gap="12" :cols="3">
          <n-gi v-for="field of entry.fields" :key="field.name">
            <FormItem
              :type="field.type"
              :model-value="formValue[entry.name][field.name]"
              v-on:update:modelValue="formValue[entry.name][field.name] = $event"
              :label="field.label"
              :path="`${entry.name}.${field.name}`"
              :placeholder="`${field.placeholder ? field.placeholder : ''}`"
              :options="field.options"
            />
          </n-gi>
        </n-grid>
      </div>
    </div>
    <n-form-item>
      <n-button @click="handleValidateClick">Submit</n-button>
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import { FormInst, NForm, NFormItem, NGrid, NGi, NButton } from 'naive-ui'
import {
  EntryApartmentLongTermRentalForm,
  EntryApartmentShortTermRentalForm,
  EntryItemSaleForm,
  EntryLookingForForm,
  EntryPetSitterForm,
  formFieldToFormRules,
  formFieldsToFormValue,
} from '@tbd/common'
import FormItem from '@/components/formItem.vue'

const props = defineProps({
  entryType: {
    type: String,
    default: 'apartment-short-term-rental',
  },
})

const size = ref<'small' | 'medium' | 'large'>('medium')
const formRef = ref<FormInst | null>(null)
const formValue = ref({
  title: '',
  description: '',
  from: '',
  to: '',
  price: '',
  price_interval: '',
  address: {
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    latitude: '',
    longitude: '',
  },
})

const rules = ref(formFieldToFormRules(EntryApartmentShortTermRentalForm))
const formFields = ref(EntryApartmentShortTermRentalForm)

function setFormValue(type: string) {
  console.log(type)

  let fields = EntryApartmentShortTermRentalForm
  switch (type) {
    case 'apartment-short-term-rental':
      fields = EntryApartmentShortTermRentalForm
      break
    case 'apartment-long-term-rental':
      fields = EntryApartmentLongTermRentalForm
      break
    case 'pet-sitter':
      fields = EntryPetSitterForm
      break
    case 'item-sale':
      fields = EntryItemSaleForm
      break
    case 'looking-for':
      fields = EntryLookingForForm
      break

    default:
      break
  }

  formValue.value = formFieldsToFormValue(fields)
  rules.value = formFieldToFormRules(fields)
  formFields.value = fields
}

onBeforeMount(() => {
  setFormValue(props.entryType)
})

watchEffect(() => {
  setFormValue(props.entryType)
})

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate(errors => {
    if (errors) {
      console.log(errors)
    }
  })
}
</script>
