<template>
  <nuxt-link :to="link" :alt="altText"
    ><n-tag size="small">{{ type }}</n-tag></nuxt-link
  >
</template>

<script setup lang="ts">
import { NTag } from 'naive-ui'
import { PublicCity } from '@tbd/common'
import { PropType } from 'nuxt/dist/app/compat/capi'

const props = defineProps({
  city: Object as PropType<PublicCity>,
  type: String,
})

const altText = computed(() => {
  return props.city && props.city.name ? `${props.type} in ${props.city.name}` : `${props.type} in the world`
})

const link = computed(() => {
  return props.city && props.city.glob_id
    ? `/type/${props.type}?city_glob_id=${props.city.glob_id}`
    : `/type/${props.type}`
})
</script>
