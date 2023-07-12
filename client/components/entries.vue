<template>
  <div v-if="props.data && props.data.items">
    <n-grid x-gap="12" :cols="props.cols" :y-gap="10">
      <n-grid-item v-for="entry in props.data.items" :key="entry.id">
        <Entry :entry="entry" />
      </n-grid-item>
    </n-grid>
  </div>
  <div v-else>
    <n-text>Loading...</n-text>
  </div>
</template>

<script setup lang="ts">
import { NGrid, NGridItem, NText } from 'naive-ui'
import type { ListResponse, PublicEntry } from '@tbd/common'
import Entry from './entry.vue'

const props = defineProps({
  data: Object as PropType<ListResponse<PublicEntry>>,
  cols: {
    type: Number,
    default: 4,
  },
})
</script>
