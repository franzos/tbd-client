<template>
  <n-image :src="userImage" :width="$props.width" :height="$props.height" :lazy="true" />
</template>

<script setup lang="ts">
import { NImage } from 'naive-ui'
import { PublicUser, fileDownloadUrlHelper } from '@tbd/common'

const props = defineProps({
  user: Object as PropType<PublicUser>,
  width: {
    type: Number,
    default: 15,
  },
  height: {
    type: Number,
    default: 15,
  },
})

const { baseUrl } = useRuntimeConfig().public

const userImage = computed(() => {
  const fallback = 'https://via.placeholder.com/400x400'
  if (!props.user || !props.user.image || props.user.image.id === '') return fallback
  return fileDownloadUrlHelper(baseUrl, props.user.image.id, props.user.image.path)
})
</script>

<style scoped lang="css">
.n-image {
  border: 1px solid #bbb;
}
</style>
