import { Address } from './address'

export interface BaseEntry {
  title: string
  description: string
  address: Address
}

export interface EntryApartmentShortTermRental extends BaseEntry {
  from: string
  to: string
  price: string
  price_interval: string
}

export interface EntryApartmentLongTermRental extends BaseEntry {
  from: string
  price: string
  price_interval: string
}

export interface Option {
  label: string
  value: string
}

export interface FormItemRule {
  key?: string
  trigger: string[]
  message: string
}

export interface FormField extends FormItemRule {
  name: string
  label: string
  type: 'text' | 'textarea' | 'date' | 'options' | 'sub'
  placeholder?: string
  required?: boolean
  options?: Option[]
  fields?: FormField[]
}

export function formFieldToFormRules(arr: FormField[]) {
  const rules = {}

  for (const field of arr) {
    if (field && field.type === 'sub') {
      rules[field.name] = formFieldToFormRules(field.fields)
    } else {
      rules[field.name] = {
        required: field.required,
        message: field.message,
        trigger: field.trigger,
      }
    }
  }
  return rules
}

export function formFieldsToFormValue(arr: FormField[]) {
  const value = {}

  for (const field of arr) {
    if (field && field.type === 'sub') {
      value[field.name] = formFieldsToFormValue(field.fields)
    } else {
      value[field.name] = ''
    }
  }
  return value as any
}

// All this should probably come from backend so communities can customize
const base: FormField[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    placeholder: 'Title',
    required: true,
    message: 'Please input the title',
    trigger: ['blur', 'change'],
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Description',
    required: true,
    message: 'Please input the description',
    trigger: ['blur', 'change'],
  },
]

const address: FormField[] = [
  {
    name: 'address',
    label: 'Address',
    type: 'sub',
    message: 'Please input the address',
    trigger: [],
    fields: [
      {
        name: 'street',
        label: 'Street',
        type: 'text',
        placeholder: 'Street',
        required: true,
        message: 'Please input the street',
        trigger: ['blur', 'change'],
      },
      {
        name: 'number',
        label: 'Number',
        type: 'text',
        placeholder: 'Number',
        required: true,
        message: 'Please input the number',
        trigger: ['blur', 'change'],
      },
      {
        name: 'post_code',
        label: 'Post code',
        type: 'text',
        placeholder: 'Post code',
        required: true,
        message: 'Please input the post code',
        trigger: ['blur', 'change'],
      },
      {
        name: 'city',
        label: 'City',
        type: 'text',
        placeholder: 'City',
        required: true,
        message: 'Please input the city',
        trigger: ['blur', 'change'],
      },
      {
        name: 'state',
        label: 'State',
        type: 'text',
        placeholder: 'State',
        required: true,
        message: 'Please input the state',
        trigger: ['blur', 'change'],
      },
      {
        name: 'country',
        label: 'Country',
        type: 'text',
        placeholder: 'Country',
        required: true,
        message: 'Please input the country',
        trigger: ['blur', 'change'],
      },
      {
        name: 'latitude',
        label: 'Latitude',
        type: 'text',
        placeholder: 'Latitude',
        required: true,
        message: 'Please input the latitude',
        trigger: ['blur', 'change'],
      },
      {
        name: 'longitude',
        label: 'Longitude',
        type: 'text',
        placeholder: 'Longitude',
        required: true,
        message: 'Please input the longitude',
        trigger: ['blur', 'change'],
      },
    ],
  },
]

export const EntryApartmentShortTermRentalForm: FormField[] = [
  ...base,
  {
    name: 'from',
    label: 'From',
    type: 'date',
    placeholder: 'From',
    // Validation error
    required: false,
    message: 'Please input the from date',
    trigger: [],
  },
  {
    name: 'to',
    label: 'To',
    type: 'date',
    placeholder: 'To',
    // Validation error
    required: false,
    message: 'Please input the to date',
    trigger: [],
  },
  {
    name: 'price',
    label: 'Price',
    type: 'text',
    placeholder: 'Price',
    required: true,
    message: 'Please input the price',
    trigger: ['blur', 'change'],
  },
  {
    name: 'price_interval',
    label: 'Price interval',
    type: 'options',
    options: [
      { value: 'per_day', label: 'Per day' },
      { value: 'per_week', label: 'Per week' },
      { value: 'per_month', label: 'Per month' },
    ],
    placeholder: 'Price interval',
    required: true,
    message: 'Please select the price interval',
    trigger: ['blur', 'change'],
  },
  ...address,
]

export const EntryApartmentLongTermRentalForm = EntryApartmentShortTermRentalForm.filter(i => i.name !== 'to')

export const EntryPetSitterForm: FormField[] = [
  ...base,
  {
    name: 'price',
    label: 'Price',
    type: 'text',
    placeholder: 'Price',
    required: true,
    message: 'Please input the price',
    trigger: ['blur', 'change'],
  },
  {
    name: 'price_interval',
    label: 'Price interval',
    type: 'options',
    options: [
      { value: 'per_day', label: 'Per day' },
      { value: 'per_week', label: 'Per week' },
      { value: 'per_month', label: 'Per month' },
    ],
    placeholder: 'Price interval',
    required: true,
    message: 'Please select the price interval',
    trigger: ['blur', 'change'],
  },
  ...address,
]

export const EntryItemSaleForm: FormField[] = [
  ...base,
  {
    name: 'price',
    label: 'Price',
    type: 'text',
    placeholder: 'Price',
    required: true,
    message: 'Please input the price',
    trigger: ['blur', 'change'],
  },
  ...address,
]

export const EntryLookingForForm: FormField[] = [...base, ...address]
