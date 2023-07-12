<template>
  <div>
    <Navigation />
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
import Navigation from '~/components/navigation.vue'

const { applicationName, publicContactEmail } = useRuntimeConfig().public
</script>
