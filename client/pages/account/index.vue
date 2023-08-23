<template>
  <n-page-header>
    <template #title>
      <n-h2>Your profile</n-h2>
    </template>
    <!-- <Entries :data="entries" :cols="6" /> -->

    <n-grid x-gap="12" :cols="3" :y-gap="10">
      <n-grid-item>
        <n-card title="Preferences">
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
        <div class="media">
          <div class="media-left" style="text-align: center">
            <n-space vertical>
              <UserImage :user="user" :width="100" :height="100" :lazy="true" />
              <n-button size="small" text @click="changeProfileImage = !changeProfileImage">Change</n-button>
            </n-space>
          </div>
          <div class="media-content">
            <n-space vertical>
              <n-text>
                <b>Hi, {{ user.username }}</b>
                <br /><small>{{ user.username_with_local_part }}</small>
              </n-text>
              <n-text v-if="user.email"> <b>Email:</b> {{ user.email }} </n-text>
              <n-text v-if="user.phone"> <b>Phone:</b> {{ user.phone }} </n-text>
              <n-text v-if="!hasPublicContactInfo">
                You have not added any public contact information. That's okay if you prefer us to notify you.
                <n-button @click="addNewPublicContactInfo = !addNewPublicContactInfo" text
                  >Add info (Whatsapp, Twitter, Email, ...)</n-button
                >
              </n-text>
              <div v-if="addNewPublicContactInfo">
                <div>Add new public contact info</div>
                <n-input-group>
                  <n-select
                    :value="newPublicContactInfo.medium"
                    v-on:change="newPublicContactInfo.medium = $event"
                    :style="{ width: '40%' }"
                    :options="publicContactMediums"
                    placeholder="What's this?"
                  />
                  <n-input
                    :value="newPublicContactInfo.handle"
                    v-on:input="newPublicContactInfo.handle = $event"
                    :style="{ width: '60%' }"
                    :placeholder="mediumPlaceholderText"
                  />
                </n-input-group>
                <n-button @click="updatePublicInfo">Add</n-button>
              </div>
              <div v-if="changeProfileImage">
                <div>Change profile image</div>
                <UploadFile v-on:file:upload-finish="handleProfileImageChange" />
              </div>
            </n-space>
          </div>
        </div>
        <div v-if="isBusy">Loading...</div>
      </n-grid-item>
      <n-grid-item></n-grid-item>
    </n-grid>
  </n-page-header>
</template>

<script setup lang="ts">
import {
  NGrid,
  NGridItem,
  NH2,
  NPageHeader,
  NText,
  useNotification,
  NSpace,
  NButton,
  NInputGroup,
  NSelect,
  NInput,
} from 'naive-ui'
import type { SelectOption } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import UserImage from '~/components/user-image.vue'
import UploadFile from '~/components/upload-file.vue'
import type { PublicFile, ContactInfo } from '@tbd/common'

const not = useNotification()
const auth = useAuthStore()
const { user, isBusy } = storeToRefs(auth)

const changeProfileImage = ref(false)
const addNewPublicContactInfo = ref(false)
const newPublicContactInfo = ref({
  medium: '',
  handle: '',
  is_public: true,
})
const publicContactMediums = ref<SelectOption>([
  {
    label: 'Whatsapp',
    value: 'whatsapp',
  },
  {
    label: 'Twitter',
    value: 'twitter',
  },
  {
    label: 'Email',
    value: 'email',
  },
  {
    label: 'Phone',
    value: 'phone',
  },
  {
    label: 'Telegram',
    value: 'telegram',
  },
  {
    label: 'Facebook',
    value: 'facebook',
  },
  {
    label: 'Instagram',
    value: 'instagram',
  },
  {
    label: 'Snapchat',
    value: 'snapchat',
  },
  {
    label: 'Tiktok',
    value: 'tiktok',
  },
  {
    label: 'Youtube',
    value: 'youtube',
  },
  {
    label: 'Twitch',
    value: 'twitch',
  },
  {
    label: 'Discord',
    value: 'discord',
  },
  {
    label: 'Github',
    value: 'github',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin',
  },
  {
    label: 'Medium',
    value: 'medium',
  },
  {
    label: 'Other',
    value: 'other',
  },
])
const mediumPlaceholderText = computed(() => {
  if (newPublicContactInfo.value.medium === 'whatsapp') {
    return '+351 123 456 789'
  } else if (newPublicContactInfo.value.medium === 'twitter') {
    return '@username'
  } else if (newPublicContactInfo.value.medium === 'email') {
    return 'user@email.com'
  } else if (newPublicContactInfo.value.medium === 'phone') {
    return '+351 123 456 789'
  } else if (newPublicContactInfo.value.medium === 'telegram') {
    return '@username'
  } else if (newPublicContactInfo.value.medium === 'facebook') {
    return 'https://facebook.com/username'
  } else if (newPublicContactInfo.value.medium === 'instagram') {
    return '@username'
  } else if (newPublicContactInfo.value.medium === 'snapchat') {
    return '@username'
  } else if (newPublicContactInfo.value.medium === 'tiktok') {
    return '@username'
  } else if (newPublicContactInfo.value.medium === 'youtube') {
    return 'https://youtube.com/username'
  } else if (newPublicContactInfo.value.medium === 'twitch') {
    return 'https://twitch.tv/username'
  } else if (newPublicContactInfo.value.medium === 'discord') {
    return 'username#1234'
  } else if (newPublicContactInfo.value.medium === 'github') {
    return '@username'
  } else if (newPublicContactInfo.value.medium === 'linkedin') {
    return 'https://linkedin.com/in/username'
  } else if (newPublicContactInfo.value.medium === 'medium') {
    return '@username'
  } else if (newPublicContactInfo.value.medium === 'other') {
    return 'https://other.com/username'
  } else {
    return 'Add your handle'
  }
})

const profile = computed(() => {
  return user.value.profile
})

const hasPublicContactInfo = computed(() => {
  return profile.value && profile.value.public_contact_info && profile.value.public_contact_info.length > 0
})

// To be used for the first
const updatePublicInfo = async () => {
  let publicContactInfo: ContactInfo[] = []
  if (hasPublicContactInfo.value) {
    publicContactInfo.push([...profile.value.public_contact_info, newPublicContactInfo.value])
  } else {
    publicContactInfo.push(newPublicContactInfo.value)
  }
  const res = await auth.update({
    public_contact_info: [...profile.value.public_contact_info, newPublicContactInfo.value],
  })
  if (res.success) {
    not.success({
      title: 'Public contact info updated',
    })
    addNewPublicContactInfo.value = false
    newPublicContactInfo.value = {
      medium: '',
      handle: '',
      is_public: true,
    }
  } else {
    not.error({
      title: 'Public contact info update failed',
      message: res.error,
    })
  }
}

const removePublicInfo = async (handle: string) => {
  const publicContactInfo = profile.value.public_contact_info.filter(info => info.handle !== handle)
  const res = await auth.update({
    public_contact_info: publicContactInfo,
  })
  if (res.success) {
    not.success({
      title: 'Public contact info updated',
    })
  } else {
    not.error({
      title: 'Public contact info update failed',
    })
  }
}

const handleProfileImageChange = async (file: PublicFile) => {
  console.log('handleProfileImageChange', file)
  const res = await auth.update({
    image: file,
  })
  if (res.success) {
    not.success({
      title: 'Profile image updated',
    })
  } else {
    not.error({
      title: 'Profile image update failed',
      message: res.error,
    })
  }
}
</script>
