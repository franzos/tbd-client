<template>
  <n-config-provider>
    <n-global-style />
    <NuxtLayout>
      <n-loading-bar-provider>
        <n-notification-provider>
          <NuxtPage />
        </n-notification-provider>
      </n-loading-bar-provider>
    </NuxtLayout>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, NNotificationProvider, NGlobalStyle, NLoadingBarProvider } from 'naive-ui'
</script>
