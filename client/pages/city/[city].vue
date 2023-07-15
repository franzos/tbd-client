<template>
  <Entries :data="entries" />
</template>

<script setup lang="ts">
import Entries from '~/components/entries.vue'
import type { ListResponse, PublicEntry } from '@tbd/common'

const { baseUrl } = useRuntimeConfig().public

const route = useRoute()

const { data: entries } = await useFetch<ListResponse<PublicEntry>>(
  `${baseUrl}/entries?city_clug=${route.params.city}`,
  {
    query: {
      limit: 20,
    },
  },
)
</script>
