<template>
  <n-text>
    <b>{{ props.contact.medium }}</b> {{ props.contact.handle }}
    <n-icon v-if="props.contact.is_public">
      <planet-outline />
    </n-icon>
    <n-icon v-if="props.canDelete">
      <RemoveCircle />
    </n-icon>
  </n-text>
</template>

<script setup lang="ts">
import { NText, NIcon } from 'naive-ui'
import { ContactInfo } from '@tbd/common'
import { PlanetOutline, RemoveCircle } from '@vicons/ionicons5'

const props = defineProps({
  contact: Object as PropType<ContactInfo>,
  canDelete: Boolean,
})
</script>
