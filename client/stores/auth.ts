import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const { baseUrl } = useRuntimeConfig().public

  let user = ref(null)
  let token = ref<string>('')
  let isLoggedIn = ref<boolean>(false)
  let isBusy = ref<boolean>(false)

  async function signup(data: {
    name?: string
    username?: string
    email?: string
    phone?: string
    password: string
    is_listed?: boolean
  }) {
    isBusy.value = true
    const url = `${baseUrl}/signup`
    try {
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
      })
      if (res.ok) {
        return {
          success: true,
        }
      } else {
        const body = await res.json()
        token.value = ''
        isLoggedIn.value = false
        return {
          success: false,
          message: body.message,
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error,
      }
    } finally {
      isBusy.value = false
    }
  }

  async function login(data: { type: string; username?: string; email?: string; phone?: string; password: string }) {
    isBusy.value = true
    const url = `${baseUrl}/login`
    try {
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
      })
      if (res.ok) {
        const body = await res.json()
        token.value = body.token
        isLoggedIn.value = true
        return {
          success: true,
        }
      } else {
        const body = await res.json()
        token.value = ''
        isLoggedIn.value = false
        return {
          success: false,
          message: body.message,
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error,
      }
    } finally {
      isBusy.value = false
    }
  }

  return {
    user,
    isLoggedIn,
    isBusy,
    signup,
    login,
  }
})
