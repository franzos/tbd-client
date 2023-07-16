<template>
  <n-card>
    <template #cover>
      <n-image :src="coverImage" object-fit="fill" :lazy="true" />
    </template>
    <User :user="createdBy" />
    {{ type }}
    <n-h2>{{ title }}</n-h2>
    <n-space>
      <div>
        <n-text>{{ description }}</n-text>
      </div>

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
    </n-space>

    <n-collapse v-if="props.entry && props.entry.data_signature">
      <n-collapse-item title="Map" name="1">
        <div style="height: 300px; width: 100%; background: #bbb">
          <n-text>MAP</n-text>
        </div>
      </n-collapse-item>
      <n-collapse-item title="Signed" name="2">
        <n-space>
          <n-text>The contents have been signed by the author:</n-text>
          <n-code>
            <pre>
                {{
                `
${props.entry.data_signature}
                `
              }}
              </pre
            >
          </n-code>
          <n-text>You can verify this from your computer:</n-text>
          <n-code>
            <pre>
                {{
                `
  import json
  import requests
  import gnupg

  gpg = gnupg.GPG()

  # Fetch data from API
  response = requests.get(
    "${baseUrl}/entries/${props.entry.id}"
  )
  data = response.json()

  # Import public key and verify signature
  gpg.import_keys(data['created_by']['public_key'])
  verification = gpg.verify_data(
    data['data_signature'], json.dumps(data['data']).encode()
  )

  print("Signature is valid" if verification.valid else "Signature is not valid")
  `
              }}
              </pre
            >
          </n-code>
        </n-space>
      </n-collapse-item>
    </n-collapse>
  </n-card>
</template>

<script setup lang="ts">
import {
  NH2,
  NH3,
  NText,
  NCard,
  NImage,
  NCollapse,
  NCollapseItem,
  NCode,
  NSpace,
  NGi,
  NIcon,
  NButton,
  NGrid,
} from 'naive-ui'
import { ArrowUpCircleOutline, ArrowDownCircleOutline } from '@vicons/ionicons5'
import type { PublicEntry } from '@tbd/common'
import User from '~/components/user.vue'
import { useEntry } from '@/composables/entry'

const props = defineProps({
  entry: Object as PropType<PublicEntry>,
})

const { baseUrl } = useRuntimeConfig().public

const entrySnippets = useEntry(props.entry, baseUrl)
const { title, type, description, coverImage, location, createdBy, upVotes, downVotes, castVote } = entrySnippets
</script>
