<template>
  <n-page-header>
    <template #title>
      <n-h2>{{ city }}</n-h2>
    </template>

    <n-grid x-gap="12" :cols="3" :y-gap="10">
      <n-grid-item>
        <n-card title="Cities on TBD">
          On TBD much like in the world, cities are the harbor of communities, and a great place to find people to
          exchange ideas, goods and services. We don't differentiate between large cities and smaller settlements;
          Cities are meant to provide an easy to recognize, physical boundary to simplify commerce and social
          interactions. For ex,. food delivery in city London; Or events in city Berlin.
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <div v-if="entries">
          <div v-for="entry of entries.items" :key="entry.id">
            <EntryPreview :entry="entry" style="margin-bottom: 1rem" />
          </div>
        </div>
      </n-grid-item>
      <n-grid-item>
        <n-h4>Categories</n-h4>
        <n-space vertical>
          <n-tag
            v-for="entry of entriesType"
            :key="entry.type"
            @click="setTypeFilter(entry.type)"
            :checkable="true"
            :checked="typeFilter === entry.type"
          >
            {{ entry.type }} ({{ entry.results }})
          </n-tag>
        </n-space>
      </n-grid-item>
    </n-grid>
  </n-page-header>
</template>

<script setup lang="ts">
import EntryPreview from '~/components/entry-preview.vue'
import { NGrid, NGridItem, NH2, NPageHeader, NCard, useLoadingBar, NSpace, NTag } from 'naive-ui'
import type { ListResponse, PublicEntry } from '@tbd/common'

const { baseUrl } = useRuntimeConfig().public
const route = useRoute()
const loadingBar = useLoadingBar()

const city = computed(() => {
  return route.params.city || 'World'
})

let typeFilter = ref<string>(route.query.type as string)
let isBusy = ref<boolean>(false)

const { data: entries } = await useFetch<ListResponse<PublicEntry>>(`${baseUrl}/entries`, {
  query: {
    limit: 10,
    city_slug: route.params.city,
    ...(route.query.type && { type: route.query.type }),
  },
})

const { data: entriesType } = await useFetch<
  {
    type: string
    results: number
  }[]
>(`${baseUrl}/entries/by-type/count`, {
  query: {
    limit: 20,
    city_slug: route.params.city,
  },
})

const filterEntries = async () => {
  isBusy.value = true
  loadingBar.start()
  const { data } = await useFetch<ListResponse<PublicEntry>>(`${baseUrl}/entries`, {
    query: {
      limit: 10,
      city_slug: route.params.city,
      ...(typeFilter.value && { type: typeFilter.value }),
    },
  })
  isBusy.value = false
  loadingBar.finish()
  entries.value = data.value
}

const setTypeFilter = (type: string) => {
  if (typeFilter.value === type) {
    typeFilter.value = ''
  } else {
    typeFilter.value = type
  }
  filterEntries()
}
</script>
