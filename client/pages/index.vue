<template>
  <div>
    <n-grid x-gap="12" :cols="3" :y-gap="10">
      <n-grid-item>
        <n-card title="Welcome to TBD">
          TBD is a worldwide <b>community run by it's members</b>. Each community is made up of
          <b>people who share common interests</b> (economically and/or socially). The community evolves around entries
          which may be anything from events, job listings, food delivery services, classifieds, or random thoughts - and
          may relate to one another - for ex. a restaurant and a food delivery startup. Each community member benefits
          from the community economy (and thus it's strength). Communities may have different rules, and can share (and
          agree) on common rules with other communities and form relations.
          <template #footer>
            <n-p><b>TLDR: Classifieds, with a reddit flair and built-in incentive structure</b>></n-p>
          </template>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-space vertical>
          <div class="search">
            <n-auto-complete
              v-model:value="cityName"
              :input-props="{
                autocomplete: 'disabled',
              }"
              :options="citiesOptions"
              placeholder="Email"
            />
            <n-button size="small" style="width: 100%">Search</n-button>
          </div>

          <div v-if="entries">
            <div v-for="entry of entries.items" :key="entry.id">
              <EntryPreview :entry="entry" style="margin-bottom: 1rem" />
            </div>
          </div>
        </n-space>
      </n-grid-item>
      <n-grid-item>
        <n-h4>Categories</n-h4>
        <n-space vertical>
          <n-tag
            v-for="entry of entriesType"
            :key="entry.type"
            @click="setTypeFilter(entry.type)"
            :checkable="true"
            :checked="typeFilter === entry.type"
          >
            {{ entry.type }} ({{ entry.results }})
          </n-tag>
        </n-space>

        <n-h4>Cities</n-h4>
        <n-space vertical>
          <n-tag
            v-for="entry of entriesCities"
            :key="entry.slug"
            @click="setCityFilter(entry.slug)"
            :checkable="true"
            :checked="cityFilter === entry.slug"
          >
            {{ entry.city }} ({{ entry.results }})
          </n-tag>
        </n-space>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import { NAutoComplete, NButton, NGridItem, NGrid, NTag, NSpace, NH4, useLoadingBar, NCard, NP } from 'naive-ui'
import EntryPreview from '~/components/entry-preview.vue'
import type { ListResponse, PublicEntry } from '@tbd/common'
const { baseUrl } = useRuntimeConfig().public
const loadingBar = useLoadingBar()

// Fetch initial data
const { data: entries } = await useFetch<ListResponse<PublicEntry>>(`${baseUrl}/entries`, {
  query: {
    limit: 20,
  },
})

const { data: entriesType } = await useFetch<
  {
    type: string
    results: number
  }[]
>(`${baseUrl}/entries/by-type/count`, {
  query: {
    limit: 20,
  },
})

const { data: entriesCities } = await useFetch<
  {
    city: string
    slug: string
    country_code: string
    results: number
  }[]
>(`${baseUrl}/entries/by-city/count`, {
  query: {
    limit: 20,
  },
})

let cityName = ref<string>('')
let citiesOptions = ref<any[]>([])

let typeFilter = ref<string>('')
let cityFilter = ref<string>('')

let isBusy = ref<boolean>(false)

const filterEntries = async () => {
  isBusy.value = true
  loadingBar.start()
  const { data } = await useFetch<ListResponse<PublicEntry>>(`${baseUrl}/entries`, {
    query: {
      limit: 20,
      type: typeFilter.value,
      city_slug: cityFilter.value,
    },
  })
  isBusy.value = false
  loadingBar.finish()
  entries.value = data.value
}

const setTypeFilter = (type: string) => {
  if (typeFilter.value === type) {
    typeFilter.value = ''
  } else {
    typeFilter.value = type
  }
  filterEntries()
}

const setCityFilter = (city: string) => {
  if (cityFilter.value === city) {
    cityFilter.value = ''
  } else {
    cityFilter.value = city
  }
  filterEntries()
}

const setCityOptions = (cities: any[]) => {
  citiesOptions.value =
    cities && cities.length > 0
      ? cities.map(city => {
          return {
            label: `${city.city} (${city.results})`,
            value: city.city,
          }
        })
      : []
}

const filterCities = async (name: string) => {
  if (!name || name.length < 2) {
    return
  }
  const res = await $fetch<any[]>(`${baseUrl}/entries/by-city/count`, {
    query: {
      limit: 50,
      name,
    },
  })
  setCityOptions(res)
}

await useFetch<any[]>(`${baseUrl}/entries/by-city/count`, {
  query: {
    limit: 50,
  },
}).then(res => {
  console.log('YEAP')
  console.log(res.data.value)
  setCityOptions(res.data.value)
})

watchEffect(() => filterCities(cityName.value))
</script>
