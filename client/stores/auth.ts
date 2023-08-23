import { PublicFile, PublicUser } from '@tbd/common'
import { useNotification } from 'naive-ui'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const { baseUrl } = useRuntimeConfig().public

  const session = useCookie<{
    token: string
    loggedInAt: number
  }>('session')

  let user: Ref<PublicUser | {}> = ref({})
  let token = ref<string>('')
  let isLoggedIn = ref<boolean>(false)
  let isBusy = ref<boolean>(false)

  async function loadUser() {
    if (token.value) {
      const url = `${baseUrl}/account/me`
      try {
        const res = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.value}`,
          },
          method: 'GET',
        })
        if (res.ok) {
          const body = await res.json()
          user.value = body
        } else {
          const body = await res.json()
          console.error(body)
          user.value = {}
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  async function restoreSession() {
    if (isLoggedIn.value) {
      console.log('already logged in')
      return
    }
    if (session.value && session.value.loggedInAt !== 0 && session.value.token !== '') {
      console.log('restoring session')
      token.value = session.value.token
      isLoggedIn.value = true
      await loadUser()
      return
    }
    console.log('no session to restore')
  }

  async function update(data: { profile?: {}; image?: PublicFile }) {
    isBusy.value = true
    const url = `${baseUrl}/account/me`
    try {
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
        method: 'PATCH',
        body: JSON.stringify(data),
      })
      if (res.ok) {
        user.value.image = data.image
        return {
          success: true,
        }
      } else {
        const body = await res.json()
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
        session.value = {
          token: body.token,
          loggedInAt: Date.now(),
        }
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

  async function logout() {
    token.value = ''
    isLoggedIn.value = false
    session.value = {
      token: '',
      loggedInAt: 0,
    }
  }

  return {
    user,
    token,
    isLoggedIn,
    isBusy,
    update,
    signup,
    login,
    logout,
    restoreSession,
  }
})
