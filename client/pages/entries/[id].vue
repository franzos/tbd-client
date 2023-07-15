<template>
  <n-page-header>
    <n-grid x-gap="12" :cols="3" :y-gap="10">
      <n-grid-item>
        <Sidebar />
      </n-grid-item>
      <n-grid-item>
        <Entry :entry="entry" :isEntryPage="true" />
      </n-grid-item>
      <n-grid-item> </n-grid-item>
    </n-grid>
    <template #header>
      <n-breadcrumb>
        <n-breadcrumb-item>Home</n-breadcrumb-item>
        <n-breadcrumb-item v-for="item in breadcrumbs" :key="item.link" :on-click="() => goToLink(item.link)">{{
          item.text
        }}</n-breadcrumb-item>
        <n-breadcrumb-item>{{ entryType }} jellw</n-breadcrumb-item>
      </n-breadcrumb>
    </template>
    <template #footer>{{ entry?.created_at }}</template>
  </n-page-header>

  <n-page-header subtitle="In the area ...">
    <Entries :data="entries" :cols="6" />
    <template #title>
      <n-h2>Related in {{ entryType }}</n-h2>
    </template>
  </n-page-header>
</template>

<script setup lang="ts">
import { NGrid, NGridItem, NH2, NButton, NDropdown, NPageHeader, NBreadcrumb, NBreadcrumbItem, NH3 } from 'naive-ui'
import Entry from '~/components/entry.vue'
import Entries from '~/components/entries.vue'
import Sidebar from '~/components/sidebar.vue'
import type { ListResponse, PublicEntry } from '@tbd/common'
import { Watch } from '@vicons/ionicons5'
import { wordsToUrl, wordsFromUrl } from '~/tmplib/url-format'

const userRoute = useRoute()
const id = userRoute.params.id
const { baseUrl } = useRuntimeConfig().public
let entries = ref<ListResponse<PublicEntry>>()

const loadEntries = async (type: string) => {
  const res = await $fetch<ListResponse<PublicEntry>>(`${baseUrl}/entries${type ? `?type=${type}` : ''}`, {
    query: {
      limit: 6,
    },
  })
  entries.value = res
}

const { data: entry } = await useFetch<PublicEntry>(`${baseUrl}/entries/${id}`, {
  params: {
    id,
  },
}).then(res => {
  useHead({
    title: res.data.title,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: res.data.description,
      },
    ],
  })
  return res
})

const entryType = computed(() => {
  return entry.value && entry.value.type ? entry.value.type : ''
})

const location = computed(() => {
  return entry.value && entry.value.city ? entry.value.city : undefined
})

const breadcrumbs = computed(() => {
  const crumbs = []
  if (entry.value && entry.value.city && entry.value.city.name) {
    crumbs.push({
      text: entry.value.city.country_name,
      link: `/country/${entry.value.city.country_code}`,
    })
  }
  if (entry.value && entry.value.city && entry.value.city.name) {
    crumbs.push({
      text: entry.value.city.name,
      link: `/city/${entry.value.city.slug}`,
    })
  }
  return crumbs
})

watchEffect(() => loadEntries(entryType.value))

const goToLink = (link: string) => {
  console.log('goToLink', link)
  const router = useRouter()
  if (link) {
    router.push(link)
  }
}
</script>
