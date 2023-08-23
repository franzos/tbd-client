<template>
  <div>
    <n-radio-group
      v-if="props.activeForm != 'login'"
      :value="props.method"
      name="radiobuttongroup1"
      style="margin-bottom: 1rem"
    >
      <n-radio-button value="username" label="Username" @click="changeMethod('username')" />
      <n-radio-button value="email" label="Email" @click="changeMethod('email')" />
      <n-radio-button value="phone" label="Phone" @click="changeMethod('phone')" />
    </n-radio-group>

    <div v-if="props.activeForm === 'login'">
      <n-form ref="loginRef" :model="loginForm">
        <n-form-item-row v-if="method === 'username'" :label="`Username / Email / Phone (${identifierType})`">
          <n-input :value="identifierForm" v-on:input="identifierForm = $event" placeholder="awesome" />
        </n-form-item-row>
        <n-form-item-row v-if="method === 'email'" label="Email">
          <n-input :value="identifierForm" v-on:input="identifierForm = $event" placeholder="idontuse@gmail.com" />
        </n-form-item-row>
        <n-form-item-row v-if="method === 'phone'" label="Phone">
          <n-input :value="identifierForm" v-on:input="identifierForm = $event" placeholder="+4930US833833" />
        </n-form-item-row>
        <n-form-item-row label="Password">
          <n-input
            :value="loginForm.password"
            v-on:input="loginForm.password = $event"
            placeholder="nobodywillguessthis123"
          />
        </n-form-item-row>
      </n-form>
      <n-space>
        <n-button type="primary" @click="login" :loading="isBusy"> Login </n-button>
        <n-button quaternary @click="changeActiveForm('signup')"> Create account instead </n-button>
      </n-space>
    </div>
    <div v-else>
      <n-p>You can sign-up with a username, email, or phone number.</n-p>
      <n-p v-if="method === 'phone' || method === 'email'">
        If you sign-up with email or phone and don't provide a username, a random one will be generated. Your email or
        phone number will not be visible to other users unless you share it in an entry.
      </n-p>
      <n-form ref="signupRef" :model="signupForm">
        <n-form-item-row label="Name">
          <n-input :value="signupForm.name" v-on:input="signupForm.name = $event" placeholder="What's your name?" />
        </n-form-item-row>
        <n-form-item-row label="Username*">
          <n-input :value="signupForm.username" v-on:input="signupForm.username = $event" placeholder="awesome" />
        </n-form-item-row>
        <n-form-item-row v-if="method === 'email'" label="Email*">
          <n-input :value="signupForm.email" v-on:input="signupForm.email = $event" placeholder="istilluse@aol.com" />
        </n-form-item-row>
        <n-form-item-row v-if="method === 'phone'" label="Phone*">
          <n-input :value="signupForm.phone" v-on:input="signupForm.phone = $event" placeholder="+3510VEY0U" />
        </n-form-item-row>
        <n-form-item-row label="Password*">
          <n-input
            :value="signupForm.password"
            v-on:input="signupForm.password = $event"
            placeholder="nobodywillguessthis123"
          />
        </n-form-item-row>
        <n-p
          >If you check this, your profile will be listed in the directory (as in, members of this comunity). Your
          profile will always be accessible via link.</n-p
        >
        <n-form-item-row label="Listed">
          <n-radio-group v-model="signupForm.is_listed">
            <n-radio-button value="true" label="Yes" />
            <n-radio-button value="false" label="No" />
          </n-radio-group>
        </n-form-item-row>
      </n-form>
      <n-space>
        <n-button type="primary" @click="signup" :loading="isBusy"> Signup </n-button>
        <n-button quaternary @click="changeActiveForm('login')"> Login instead</n-button>
      </n-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  NForm,
  NFormItemRow,
  NInput,
  NButton,
  NRadioGroup,
  NRadioButton,
  useNotification,
  FormInst,
  NSpace,
  NP,
} from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

let loginRef = ref<FormInst | null>(null)

const identifierForm = ref('') // The field for username, email, or phone

const signupForm = ref({
  name: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  is_listed: true,
})

const loginForm = ref({
  type: 'email',
  username: '',
  email: '',
  phone: '',
  password: '',
})

const router = useRouter()
const not = useNotification()
const authStore = useAuthStore()
const { isLoggedIn, isBusy } = storeToRefs(authStore)

const props = defineProps({
  activeForm: {
    type: String,
    default: 'login',
  },
  method: {
    type: String,
    default: 'username',
  },
})

const emit = defineEmits(['update'])

const changeActiveForm = (val: 'login' | 'signup') => {
  emit('update', {
    name: 'activeForm',
    value: val,
  })
}

const changeMethod = (val: 'username' | 'email' | 'phone') => {
  emit('update', {
    name: 'method',
    value: val,
  })
}

const signup = async () => {
  let valid = false
  console.log(signupForm.value.username)
  if (signupForm.value.username !== '') {
    valid = true
  } else {
    console.log('no username')
  }
  if (signupForm.value.email !== '') {
    valid = true
  } else {
    console.log('no email')
  }
  if (signupForm.value.phone !== '') {
    valid = true
  } else {
    console.log('no phone')
  }
  if (!valid) {
    not.error({
      content: `Please enter a ${props.method}`,
    })
    return
  }
  if (signupForm.value.password === '') {
    not.error({
      content: 'Please enter a password',
    })
    return
  }
  const result = await authStore.signup(signupForm.value)
}

const identifierType = computed(() => {
  if (/^[\w.-]+@[\w.-]+\.\w+$/.test(identifierForm.value)) {
    return 'email'
  } else if (/^\+?\d+$/.test(identifierForm.value)) {
    return 'phone'
  } else {
    return 'username'
  }
})

const login = async () => {
  let valid = false

  if (/^[\w.-]+@[\w.-]+\.\w+$/.test(identifierForm.value)) {
    loginForm.value.type = 'email'
    loginForm.value.email = identifierForm.value
    valid = true
  } else if (/^\+?\d+$/.test(identifierForm.value)) {
    loginForm.value.type = 'phone'
    loginForm.value.phone = identifierForm.value
    valid = true
  } else {
    loginForm.value.type = 'username'
    loginForm.value.username = identifierForm.value
    valid = true
  }

  if (!valid) {
    not.error({
      content: `Please enter ${props.method} and password`,
    })
    return
  }
  if (loginForm.value.password === '') {
    not.error({
      content: 'Please enter a password',
    })
    return
  }
  const result = await authStore.login(loginForm.value)
  if (!result.success) {
    not.error({
      content: result.message,
    })
  }
}
</script>

<style scoped>
.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}
</style>
