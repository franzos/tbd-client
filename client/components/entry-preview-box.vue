<template>
  <n-card>
    <template #cover>
      <nuxt-link :to="path">
        <n-image :src="coverImage" object-fit="fill" :lazy="true" preview-disabled />
      </nuxt-link>
    </template>
    <User :user="createdBy" />
    {{ type }}
    <nuxt-link :to="path">
      <n-h3>{{ title }}</n-h3>
    </nuxt-link>
    <n-text>{{ maxChar(description, 100) }}</n-text>
  </n-card>
</template>

<script setup lang="ts">
import { NH3, NText, NCard, NImage } from 'naive-ui'
import { maxChar } from '@tbd/common'
import type { PublicEntry } from '@tbd/common'
import User from '~/components/user.vue'
import { useEntry } from '@/composables/entry'

const props = defineProps({
  entry: Object as PropType<PublicEntry>,
})

const { baseUrl } = useRuntimeConfig().public

const entrySnippets = useEntry(baseUrl, props.entry)
const { path, title, type, description, coverImage, createdBy } = entrySnippets
</script>
