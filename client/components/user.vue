<template>
  <n-text>
    <b>{{ username }}</b>
  </n-text>
</template>

<script setup lang="ts">
import { NText } from 'naive-ui'
import type { PublicUser } from '@tbd/common'

const props = defineProps({
  user: Object as PropType<PublicUser>,
})

const username = computed(() => {
  if (props.user && props.user.username) return props.user.username
  return 'Unknown'
})
</script>
