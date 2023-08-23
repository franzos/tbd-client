<template>
  <n-page-header>
    <template #header>
      <n-breadcrumb>
        <n-breadcrumb-item>Home</n-breadcrumb-item>
        <n-breadcrumb-item v-for="item in breadcrumbs" :key="item.link" :on-click="() => goToLink(item.link)">{{
          item.text
        }}</n-breadcrumb-item>
        <n-breadcrumb-item>{{ type }}</n-breadcrumb-item>
      </n-breadcrumb>
    </template>
    <n-grid x-gap="12" :cols="3" :y-gap="10">
      <n-grid-item>
        <Sidebar />
      </n-grid-item>
      <n-grid-item>
        <Entry :entry="entry" :isEntryPage="true" />
      </n-grid-item>
      <n-grid-item> </n-grid-item>
    </n-grid>
    <template #footer>{{ entry?.created_at }}</template>
  </n-page-header>

  <n-page-header>
    <template #title>
      <n-h2>Related in {{ type }}</n-h2>
    </template>
    <!-- <Entries :data="entries" :cols="6" /> -->

    <n-grid x-gap="12" :cols="3" :y-gap="10">
      <n-grid-item></n-grid-item>
      <n-grid-item>
        <div v-if="entries">
          <div v-for="item of entries.items" :key="item.id">
            <EntryPreview :entry="item" style="margin-bottom: 1rem" />
          </div>
        </div>
      </n-grid-item>
      <n-grid-item></n-grid-item>
    </n-grid>
  </n-page-header>
</template>

<script setup lang="ts">
import { NGrid, NGridItem, NH2, NPageHeader, NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import type { ListResponse, PublicEntry } from '@tbd/common'
import Entry from '~/components/entry.vue'
import EntryPreview from '~/components/entry-preview.vue'
import Sidebar from '~/components/sidebar.vue'

const userRoute = useRoute()
const id = userRoute.params.id
const { baseUrl } = useRuntimeConfig().public
let entries = ref<ListResponse<PublicEntry>>()

const loadEntries = async (type: string) => {
  console.log('loadEntries', type)
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
  const title =
    res.data.value && res.data.value.data && res.data.value.data.title
      ? `${res.data.value.data.title} | TBD`
      : 'No title | TBD'
  const content =
    res.data.value && res.data.value.data && res.data.value.data.description ? res.data.value.data.description : ''
  useHead({
    title,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content,
      },
    ],
  })
  return res
})

// const { type } = useEntry(baseUrl, entry.value)

const type = computed(() => {
  return entry.value && entry.value.type ? entry.value.type : ''
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

onMounted(() => {
  console.log('onMounted')
  loadEntries(type.value)
})

const goToLink = (link: string) => {
  const router = useRouter()
  if (link) {
    router.push(link)
  }
}
</script>
