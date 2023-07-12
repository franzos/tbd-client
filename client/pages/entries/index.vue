<template>
  <Entries :data="data" />
</template>

<script setup lang="ts">
import Entries from '~/components/entries.vue'
const { baseUrl } = useRuntimeConfig().public
const { data } = await useFetch(`${baseUrl}/entries`, {
  query: {
    limit: 50,
  },
})
</script>
