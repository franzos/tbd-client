<template>
  <n-page-header>
    <n-grid x-gap="12" :cols="3" :y-gap="10">
      <n-grid-item> </n-grid-item>
      <n-grid-item>
        <div v-if="!isLoggedIn">
          <Login :active-form="activeForm" v-on:update="setUpdate($event)" :method="method" />
        </div>
        <div v-else style="text-align: center">
          <n-p>Hi, nice to see you here.</n-p>
          <n-p>
            What would you like to do?
            <br />Find, share, support - make your community.
          </n-p>
        </div>
      </n-grid-item>
      <n-grid-item>
        <n-card v-if="!isLoggedIn" :title="info.title">
          {{ info.text }}
        </n-card>
      </n-grid-item>
    </n-grid>
    <template #header>
      <n-breadcrumb>
        <n-breadcrumb-item>Home</n-breadcrumb-item>
        <n-breadcrumb-item>Login</n-breadcrumb-item>
      </n-breadcrumb>
    </template>
    <template #footer>Helptext</template>
  </n-page-header>
</template>

<script setup lang="ts">
import { NGrid, NGridItem, NCard, NP, NPageHeader, NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import Login from '@/components/login.vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)

type ActiveForm = 'login' | 'signup'
type Method = 'username' | 'email' | 'phone'

let activeForm = ref<ActiveForm>('login')
let method = ref<Method>('username')

const setUpdate = (payload: { name: string; value: string }) => {
  if (payload.name === 'activeForm') {
    activeForm.value = payload.value as 'login' | 'signup'
  } else if (payload.name === 'method') {
    method.value = payload.value as Method
  }
}

const info = computed(() => {
  if (activeForm.value === 'login') {
    return {
      title: 'Welcome back',
      text: 'Please login with username, email or phone and password.',
    }
  } else {
    return {
      title: 'Welcome to TBD',
      text: 'To sign up on this community, provide a username or email or phone and password.',
    }
  }
})
</script>

<style scoped>
.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}
</style>
