<template>
  <n-page-header>
    <template #title>
      <n-h2>{{ type }}</n-h2>
    </template>
    <!-- <Entries :data="entries" :cols="6" /> -->

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

const type = computed(() => {
  return route.params.type || 'World'
})

const { data: entries } = await useFetch<ListResponse<PublicEntry>>(`${baseUrl}/entries?type=${route.params.type}`, {
  query: {
    limit: 10,
  },
})
</script>
