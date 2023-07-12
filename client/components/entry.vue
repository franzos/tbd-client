<template>
  <n-card>
    <template #cover>
      <n-image :src="coverImage" object-fit="fill" :lazy="true" />
    </template>
    <div v-if="props.isEntryPage">
      <User :user="createdBy" />
      <n-h1>{{ title }}</n-h1>
      <n-text>{{ description }}</n-text>
    </div>
    <div v-else>
      <User :user="createdBy" />
      <nuxt-link :to="entryPath">
        <n-h3>{{ title }}</n-h3>
      </nuxt-link>
      <n-text>{{ maxChar(description, 100) }}</n-text>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { NH1, NH3, NText, NCard, NImage } from 'naive-ui'
import { fileDownloadUrlHelper, maxChar } from '@tbd/common'
import type { PublicEntry } from '@tbd/common'
import User from '~/components/user.vue'

const props = defineProps({
  entry: Object as PropType<PublicEntry>,
  isEntryPage: {
    type: Boolean,
    default: false,
    required: false,
  },
})

const { baseUrl } = useRuntimeConfig().public

const entryPath = computed(() => {
  return props.entry && props.entry.id ? `/entries/${props.entry.id}` : '/'
})
const title = computed(() => {
  if (props.entry && props.entry.data.title) return props.entry.data.title
  return 'No title'
})
const description = computed(() => {
  if (props.entry && props.entry.data.description) return props.entry.data.description
  return 'No description'
})
const coverImage = computed(() => {
  const fallback = 'https://via.placeholder.com/600x400'
  const imageExtensions = ['jpg', 'png', 'gif', 'bmp', 'webp']
  if (!props.entry || !props.entry.files) return fallback
  const imageFiles = props.entry.files.filter(file => {
    const extension = file.path.split('.').pop()
    return extension && imageExtensions.includes(extension)
  })
  if (imageFiles.length > 0) {
    return fileDownloadUrlHelper(baseUrl, imageFiles[0].id, imageFiles[0].path)
  }
  return fallback
})

const createdBy = computed(() => {
  if (props.entry && props.entry.created_by) {
    return props.entry.created_by
  }
  return undefined
})
</script>
