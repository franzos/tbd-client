import { PublicFile, PublicUser } from '@tbd/common'
import { defineStore, storeToRefs } from 'pinia'
import { useAuthStore } from './auth'

export const useFileStore = defineStore('file', () => {
  const { baseUrl } = useRuntimeConfig().public
  const auth = useAuthStore()
  const { token } = storeToRefs(auth)

  const isBusy = ref<boolean>(false)

  const uploadFile = async (file: File): Promise<PublicFile[] | null> => {
    isBusy.value = true
    const url = `${baseUrl}/files/multi`
    const formData = new FormData()
    formData.append('files', file)
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        method: 'POST',
        body: formData,
      })
      if (res.ok) {
        const body = await res.json()
        return body.files
      } else {
        const body = await res.json()
        console.error(body)
        return null
      }
    } catch (error) {
      console.error(error)
      return null
    } finally {
      isBusy.value = false
    }
  }

  return {
    uploadFile,
    isBusy,
  }
})
