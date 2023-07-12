<template>
  <Entries :data="data" />
</template>

<script setup lang="ts">
import Entries from '~/components/entries.vue'
import type { ListResponse, PublicEntry } from '@tbd/common'
const { baseUrl } = useRuntimeConfig().public
const { data } = await useFetch<ListResponse<PublicEntry>>(`${baseUrl}/entries`, {
  query: {
    limit: 50,
  },
})
</script>
