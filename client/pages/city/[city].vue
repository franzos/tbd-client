<template>
  <n-page-header>
    <template #title>
      <n-h2>{{ city }}</n-h2>
    </template>

    <n-grid x-gap="12" :cols="3" :y-gap="10">
      <n-grid-item></n-grid-item>
      <n-grid-item>
        <div v-if="entries">
          <div v-for="entry of entries.items" :key="entry.id">
            <EntryPreview :entry="entry" style="margin-bottom: 1rem" />
          </div>
        </div>
      </n-grid-item>
      <n-grid-item></n-grid-item>
    </n-grid>
  </n-page-header>
</template>

<script setup lang="ts">
import EntryPreview from '~/components/entry-preview.vue'
import { NGrid, NGridItem, NH2, NPageHeader } from 'naive-ui'
import type { ListResponse, PublicEntry } from '@tbd/common'

const { baseUrl } = useRuntimeConfig().public
const route = useRoute()

const city = computed(() => {
  return route.params.city || 'World'
})

const { data: entries } = await useFetch<ListResponse<PublicEntry>>(
  `${baseUrl}/entries?city_clug=${route.params.city}`,
  {
    query: {
      limit: 10,
    },
  },
)
</script>
