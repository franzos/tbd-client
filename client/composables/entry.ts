import { PublicEntry, fileDownloadUrlHelper } from '@tbd/common'
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useNotification } from 'naive-ui'

export function useEntry(entry: PublicEntry, baseUrl: string) {
  const not = useNotification()

  const path = computed(() => {
    return entry && entry.id ? `/entries/${entry.id}` : '/'
  })

  const title = computed(() => {
    if (entry && entry.data.title) return entry.data.title
    return 'No title'
  })

  const type = computed(() => {
    return entry && entry.type ? entry.type : ''
  })

  const description = computed(() => {
    if (entry && entry.data.description) return entry.data.description
    return 'No description'
  })

  const coverImage = computed(() => {
    const fallback = 'https://via.placeholder.com/600x400'
    const imageExtensions = ['jpg', 'png', 'gif', 'bmp', 'webp']
    if (!entry || !entry.files) return fallback
    const imageFiles = entry.files.filter(file => {
      const extension = file.path.split('.').pop()
      return extension && imageExtensions.includes(extension)
    })
    if (imageFiles.length > 0) {
      return fileDownloadUrlHelper(baseUrl, imageFiles[0].id, imageFiles[0].path)
    }
    return fallback
  })

  const location = computed(() => {
    if (entry && entry.city && entry.city.name) {
      return `${entry.city.name}, ${entry.city.country_code}`
    }
    return `World`
  })

  const createdBy = computed(() => {
    if (entry && entry.created_by) {
      return entry.created_by
    }
    return undefined
  })

  let upVotes = ref<number>(0)
  let downVotes = ref<number>(0)
  let isBusy = ref<boolean>(false)

  const castVote = async function (vote: 0 | 1) {
    console.log('castVote', vote)
    if (!entry || !entry.id) return
    const auth = useAuthStore()
    if (!auth.isLoggedIn) {
      not.warning({
        title: 'You need to be logged in to vote.',
        duration: 2000,
      })
      return
    }
    const token = auth.token
    isBusy.value = true
    try {
      const response = await $fetch(`${baseUrl}/votes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          entry_id: entry.id,
          vote,
        }),
      })
      if (vote === 0) {
        upVotes.value += 1
      } else {
        downVotes.value += 1
      }
    } catch (error) {
      console.error(error)
      // if 400
      if (error.status === 400) {
        not.warning({
          title: 'You already voted on this entry.',
          duration: 2000,
        })
      }
    }
    isBusy.value = false
  }

  onMounted(async () => {
    if (!entry || !entry.id) return
    if (entry.up_votes) {
      upVotes.value = entry.up_votes
    }
    if (entry.down_votes) {
      downVotes.value = entry.down_votes
    }
  })

  return {
    path,
    title,
    type,
    description,
    coverImage,
    location,
    createdBy,
    upVotes,
    downVotes,
    castVote,
  }
}
