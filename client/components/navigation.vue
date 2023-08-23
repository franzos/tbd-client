<template>
  <div class="navbar">
    <n-menu mode="horizontal" :options="menuOptions" @update:value="handleUpdateValue" />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { NMenu, MenuOption, NIcon } from 'naive-ui'
import { HomeOutline as HomeIcon, LogInOutline as LoginIcon, AddOutline as AddIcon } from '@vicons/ionicons5'

const props = defineProps({
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
})

const menu = [
  {
    label: 'Home',
    key: 'home',
    to: '/',
    virtual: false,
    icon: HomeIcon,
  },
  {
    label: 'Post Entry',
    key: 'postEntry',
    show: '*',
    to: '/entries/post',
    virtual: false,
    icon: AddIcon,
  },
  {
    label: 'Account',
    key: 'account',
    show: 'loggedIn',
    to: '/account',
    virtual: false,
    icon: LoginIcon,
  },
  {
    label: 'Login',
    key: 'login',
    show: 'loggedOut',
    to: '/login',
    virtual: false,
    icon: LoginIcon,
  },
  {
    label: 'Logout',
    key: 'logout',
    show: 'loggedIn',
    onclick: () => emitLogout(),
    virtual: false,
    icon: LoginIcon,
  },
]

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

function formatItem(item: (typeof menu)[0]) {
  return item.to
    ? {
        label: () =>
          h(
            RouterLink,
            {
              to: item.to,
            },
            { default: () => item.label },
          ),
        key: item.key,
        icon: renderIcon(item.icon),
      }
    : {
        label: item.label,
        key: item.key,
        icon: renderIcon(item.icon),
        onClick: item.onclick,
      }
}

const menuOptions: Ref<MenuOption[]> = computed(() => {
  return props.isLoggedIn
    ? menu
        .filter(item => item.show !== 'loggedOut')
        .flatMap(item => {
          return formatItem(item)
        })
    : menu
        .filter(item => item.show !== 'loggedIn')
        .flatMap(item => {
          return formatItem(item)
        })
})

function handleUpdateValue(key: string, item: MenuOption) {
  console.log(key, item)
}

// emit
const emits = defineEmits(['logout'])

function emitLogout() {
  emits('logout', {})
}
</script>
