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
    label: 'Login',
    key: 'login',
    show: 'loggedOut',
    to: '/login',
    virtual: false,
    icon: LoginIcon,
  },
  {
    label: 'Post Entry',
    key: 'postEntry',
    show: '*',
    to: '/entries/post',
    virtual: false,
    icon: AddIcon,
  },
]

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

function formatItem(item: (typeof menu)[0]) {
  return {
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
}

const menuOptions: Ref<MenuOption[]> = computed(() => {
  return props.isLoggedIn
    ? menu
        .filter(item => item.show !== 'loggedOut')
        .flatMap(item => {
          return formatItem(item)
        })
    : menu.flatMap(item => {
        return formatItem(item)
      })
})

function handleUpdateValue(key: string, item: MenuOption) {
  console.log(key, item)
}
</script>
