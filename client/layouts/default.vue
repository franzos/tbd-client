<template>
  <div>
    <Navigation :is-logged-in="isLoggedIn" />
    <slot />
    <div class="container footer has-bg-grey">
      <n-space justify="center">
        <n-p>
          <strong>{{ applicationName }}</strong> &nbsp; &nbsp; |
          <a :href="`mailto:${publicContactEmail}`">
            <n-button quaternary size="small">{{ publicContactEmail }}</n-button>
          </a>
        </n-p>
      </n-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NSpace, NP, NButton } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import Navigation from '~/components/navigation.vue'

const { applicationName, publicContactEmail } = useRuntimeConfig().public
const auth = useAuthStore()
const { isLoggedIn } = storeToRefs(auth)

onMounted(() => {
  auth.restoreSession()
})
</script>

<style>
.right-image {
  float: right;
  margin: 0 0 1em 1em;
  top: 5px;
  right: 5px;
  position: absolute;
}
.media {
  align-items: flex-start;
  display: flex;
  text-align: inherit;
}

.media-left,
.media-right {
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
}

.media-left {
  margin-right: 1em;
}

.media-right {
  margin-left: 1em;
}

.media-content {
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: inherit;
}
</style>
