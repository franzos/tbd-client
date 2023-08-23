<template>
  <n-card>
    <template #cover>
      <n-image :src="coverImage" object-fit="fill" :lazy="true" />
    </template>

    <div class="media">
      <div class="media-content">
        <User :user="createdBy" />
      </div>
      <div class="media-right">
        <n-button @click="showSignatureModal = !showSignatureModal" text>
          <template #icon>
            <n-icon>
              <KeyOutline />
            </n-icon>
          </template>
          Verify
        </n-button>
      </div>
    </div>

    <n-h2 style="margin-top: 0">{{ title }}</n-h2>
    <div>
      <n-text>{{ description }}</n-text>
    </div>

    <n-collapse v-if="props.entry && props.entry.data_signature" style="margin-top: 1rem; margin-bottom: 1rem">
      <n-collapse-item title="Map" name="1">
        <div style="height: 300px; width: 100%; background: #bbb">
          <n-text>MAP</n-text>
        </div>
      </n-collapse-item>
    </n-collapse>

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

    <n-modal v-model:show="showSignatureModal">
      <n-card
        title="Signature"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
        style="width: 600px; overflow: scroll"
      >
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
      </n-card>
    </n-modal>
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
  NModal,
} from 'naive-ui'
import { ArrowUpCircleOutline, ArrowDownCircleOutline, KeyOutline } from '@vicons/ionicons5'
import type { PublicEntry } from '@tbd/common'
import User from '~/components/user.vue'
import TypeTag from '~/components/type-tag.vue'
import LocationTag from '~/components/location-tag.vue'
import { useEntry } from '@/composables/entry'

const props = defineProps({
  entry: Object as PropType<PublicEntry>,
})

const { baseUrl } = useRuntimeConfig().public

const showSignatureModal = ref(false)

const entrySnippets = useEntry(baseUrl, props.entry)
const { title, type, description, coverImage, locationText, city, createdBy, upVotes, downVotes, castVote } =
  entrySnippets
</script>
