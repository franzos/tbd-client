<template>
  <n-card>
    <div class="media">
      <div class="media-content">
        <User :user="createdBy" />
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
      <n-grid :cols="2">
        <n-gi>
          <n-text>
            <small
              ><b>{{ location }}</b></small
            >
          </n-text>
        </n-gi>
        <n-gi>
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
        </n-gi>
      </n-grid>
    </template>
  </n-card>
</template>

<script setup lang="ts">
import { NP, NText, NCard, NImage, NButton, NIcon, NGi, NGrid } from 'naive-ui'
import { maxChar } from '@tbd/common'
import type { PublicEntry } from '@tbd/common'
import { ArrowUpCircleOutline, ArrowDownCircleOutline } from '@vicons/ionicons5'
import User from '~/components/user.vue'
import { useEntry } from '~/composables/entry'

const props = defineProps({
  entry: Object as PropType<PublicEntry>,
})

const { baseUrl } = useRuntimeConfig().public

const entrySnippets = useEntry(props.entry, baseUrl)
const { path, title, type, description, coverImage, location, createdBy, upVotes, downVotes, castVote } = entrySnippets
</script>
