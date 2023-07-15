<template>
  <n-card>
    <div class="media">
      <div class="media-content">
        <User :user="createdBy" />
        <nuxt-link :to="entryPath">
          <n-h6>{{ title }}</n-h6>
        </nuxt-link>
        <n-text>{{ maxChar(description, 100) }}</n-text>
      </div>
      <div class="media-right">
        <n-image :src="coverImage" object-fit="fill" :width="100" :height="100" :lazy="true" />
      </div>
    </div>
    <template #footer>
      <n-text>
        <small
          ><b>{{ location }}</b></small
        >
      </n-text>
    </template>
  </n-card>
</template>

<script setup lang="ts">
import { NH1, NH6, NText, NCard, NImage, NGrid, NGi, NGridItem, NSpace } from 'naive-ui'
import { fileDownloadUrlHelper, maxChar } from '@tbd/common'
import type { PublicEntry } from '@tbd/common'
import User from '~/components/user.vue'

const props = defineProps({
  entry: Object as PropType<PublicEntry>,
})

const { baseUrl } = useRuntimeConfig().public

const entryPath = computed(() => {
  return props.entry && props.entry.id ? `/entries/${props.entry.id}` : '/'
})
const entryType = computed(() => {
  if (props.entry && props.entry.type) return props.entry.type
  return 'No type'
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
const location = computed(() => {
  if (props.entry && props.entry.city && props.entry.city.name) {
    return `${props.entry.city.name}, ${props.entry.city.country_code}`
  }
  return `World`
})
</script>

<style scoped>
.right-image {
  float: right;
  margin: 0 0 1em 1em;
  top: 5px;
  right: 5px;
  position: absolute;
}
.media {
  align-items: flex-start;
  display: flex;
  text-align: inherit;
}

.media-left,
.media-right {
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
}

.media-left {
  margin-right: 1em;
}

.media-right {
  margin-left: 1em;
}

.media-content {
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: inherit;
}
</style>
