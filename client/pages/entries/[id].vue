<template>
  <n-grid x-gap="12" :cols="3" :y-gap="10">
    <n-grid-item>
      <Sidebar />
    </n-grid-item>
    <n-grid-item>
      <Entry :entry="entry" :isEntryPage="true" />
    </n-grid-item>
    <n-grid-item> </n-grid-item>
  </n-grid>

  <Entries :data="entries" :cols="6" />
</template>

<script setup lang="ts">
import { NGrid, NGridItem } from 'naive-ui'
import Entry from '~/components/entry.vue'
import Entries from '~/components/entries.vue'
import Sidebar from '~/components/sidebar.vue'
import type { ListResponse, PublicEntry } from '@tbd/common'

const userRoute = useRoute()
const id = userRoute.params.id
const { baseUrl } = useRuntimeConfig().public

const { data: entry } = await useFetch<PublicEntry>(`${baseUrl}/entries/${id}`, {
  params: {
    id,
  },
})
const { data: entries } = await useFetch<ListResponse<PublicEntry>>(`${baseUrl}/entries`, {
  lazy: true,
  query: {
    limit: 6,
  },
})
</script>
