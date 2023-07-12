<template>
  <n-config-provider>
    <n-global-style />
    <NuxtLayout>
      <n-notification-provider>
        <NuxtPage />
      </n-notification-provider>
    </NuxtLayout>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, NNotificationProvider, NGlobalStyle } from 'naive-ui'
</script>
