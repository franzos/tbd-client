<template>
  <div class="media">
    <div class="media-left">
      <n-image :src="userImage" :width="15" :height="15" :lazy="true" />
    </div>
    <div class="media-content">
      <n-text>
        <b>{{ username }}</b>
      </n-text>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NText, NImage } from 'naive-ui'
import { PublicUser, fileDownloadUrlHelper } from '@tbd/common'

const props = defineProps({
  user: Object as PropType<PublicUser>,
})

const { baseUrl } = useRuntimeConfig().public

const username = computed(() => {
  if (props.user && props.user.username) return props.user.username
  return 'Unknown'
})

const userImage = computed(() => {
  const fallback = 'https://via.placeholder.com/400x400'
  const imageExtensions = ['jpg', 'png', 'gif', 'bmp', 'webp']
  if (!props.user || props.user.image) return fallback
  return fileDownloadUrlHelper(baseUrl, props.user.image.id, props.user.image.path)
})
</script>
