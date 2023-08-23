<template>
  <n-card>
    <div class="media">
      <div class="media-content">
        <div class="media">
          <div class="media-content">
            <User :user="createdBy" />
          </div>
          <div class="media-right"></div>
        </div>

        <nuxt-link :to="path">
          <n-p
            ><b>{{ maxChar(title, 40) }}</b></n-p
          >
        </nuxt-link>
        <n-text>{{ maxChar(description, 100) }}</n-text>
      </div>
      <div class="media-right">
        <n-image :src="coverImage" object-fit="fill" :width="80" :height="80" :lazy="true" />
      </div>
    </div>
    <template #footer>
      <div class="media">
        <div class="media-content">
          <TypeTag :type="type" :city="city" />
          <LocationTag :type="type" :city="city" />
        </div>
        <div class="media-right">
          <n-button @click="castVote(1)" quaternary round>
            <template #icon>
              <n-icon><ArrowDownCircleOutline /></n-icon>
            </template>
            {{ downVotes }}
          </n-button>
          <n-button @click="castVote(0)" quaternary round>
            <template #icon>
              <n-icon><ArrowUpCircleOutline /></n-icon>
            </template>
            {{ upVotes }}
          </n-button>
        </div>
      </div>
    </template>
  </n-card>
</template>

<script setup lang="ts">
import { NP, NText, NCard, NImage, NButton, NIcon, NGi, NGrid, NGridItem } from 'naive-ui'
import { maxChar } from '@tbd/common'
import type { PublicEntry } from '@tbd/common'
import { ArrowUpCircleOutline, ArrowDownCircleOutline } from '@vicons/ionicons5'
import User from '~/components/user.vue'
import TypeTag from '~/components/type-tag.vue'
import LocationTag from '~/components/location-tag.vue'
import { useEntry } from '~/composables/entry'

const props = defineProps({
  entry: Object as PropType<PublicEntry>,
})

const { baseUrl } = useRuntimeConfig().public

const entrySnippets = useEntry(baseUrl, props.entry)
const { path, title, type, description, coverImage, city, createdBy, upVotes, downVotes, castVote } = entrySnippets
</script>
