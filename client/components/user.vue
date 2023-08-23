<template>
  <div class="media">
    <div class="media-left">
      <UserImage :user="user" :width="15" :height="15" :lazy="true" />
    </div>
    <div class="media-content">
      <n-text>
        <b>{{ username }}</b>
      </n-text>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NText } from 'naive-ui'
import { PublicUser } from '@tbd/common'
import UserImage from '~/components/user-image.vue'

const props = defineProps({
  user: Object as PropType<PublicUser>,
})

const username = computed(() => {
  if (props.user && props.user.username) return props.user.username
  return 'Unknown'
})
</script>
