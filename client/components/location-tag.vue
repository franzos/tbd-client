<template>
  <nuxt-link :to="link" :alt="altText"
    ><n-tag size="small">{{ altText }}</n-tag></nuxt-link
  >
</template>

<script setup lang="ts">
import { NTag } from 'naive-ui'
import { PublicCity } from '@tbd/common'
import { PropType } from 'nuxt/dist/app/compat/capi'

// An entry may have an address without city, but with country.
// city > country > world
const props = defineProps({
  city: Object as PropType<PublicCity>,
  countryCode: String,
  type: String,
})

const altText = computed(() => {
  return props.city && props.city.name
    ? `${props.city.name}, ${props.city.country_code}`
    : props.countryCode && props.countryCode.length === 3
    ? `${props.countryCode}`
    : `World`
})

const link = computed(() => {
  return props.city && props.city.slug
    ? `/city/${props.city.slug}?type=${props.type}`
    : props.countryCode && props.countryCode.length === 3
    ? `/country/${props.countryCode}?type=${props.type}`
    : `/type/${props.type}`
})
</script>
