<template>
  <n-card>
    <template #cover>
      <div v-if="props.isEntryPage">
        <n-image :src="coverImage" object-fit="fill" :lazy="true" />
      </div>
      <div v-else>
        <nuxt-link :to="entryPath">
          <n-image :src="coverImage" object-fit="fill" :lazy="true" preview-disabled />
        </nuxt-link>
      </div>
    </template>
    <User :user="createdBy" />
    {{ entryType }}
    <div v-if="props.isEntryPage">
      <n-h1>{{ title }}</n-h1>
      <div style="margin-bottom: 2rem">
        <n-text>{{ description }}</n-text>
      </div>
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
              </pre>
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
              </pre>
            </n-code>
          </n-space>
        </n-collapse-item>
      </n-collapse>
    </div>
    <div v-else>
      <nuxt-link :to="entryPath">
        <n-h3>{{ title }}</n-h3>
      </nuxt-link>
      <n-text>{{ maxChar(description, 100) }}</n-text>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { NH1, NH3, NText, NCard, NImage, NCollapse, NCollapseItem, NCode, NSpace } from 'naive-ui'
import { fileDownloadUrlHelper, maxChar } from '@tbd/common'
import type { PublicEntry } from '@tbd/common'
import User from '~/components/user.vue'

const props = defineProps({
  entry: Object as PropType<PublicEntry>,
  isEntryPage: {
    type: Boolean,
    default: false,
    required: false,
  },
})

const { baseUrl } = useRuntimeConfig().public

const entryPath = computed(() => {
  return props.entry && props.entry.id ? `/entries/${props.entry.id}` : '/'
})
const entryType = computed(() => {
  if (props.entry && props.entry.type) return props.entry.type
  return 'No type'
})
const title = computed(() => {
  if (props.entry && props.entry.data.title) return props.entry.data.title
  return 'No title'
})
const description = computed(() => {
  if (props.entry && props.entry.data.description) return props.entry.data.description
  return 'No description'
})
const coverImage = computed(() => {
  const fallback = 'https://via.placeholder.com/600x400'
  const imageExtensions = ['jpg', 'png', 'gif', 'bmp', 'webp']
  if (!props.entry || !props.entry.files) return fallback
  const imageFiles = props.entry.files.filter(file => {
    const extension = file.path.split('.').pop()
    return extension && imageExtensions.includes(extension)
  })
  if (imageFiles.length > 0) {
    return fileDownloadUrlHelper(baseUrl, imageFiles[0].id, imageFiles[0].path)
  }
  return fallback
})

const createdBy = computed(() => {
  if (props.entry && props.entry.created_by) {
    return props.entry.created_by
  }
  return undefined
})
</script>
