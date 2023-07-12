# TBD Clients and Libraries

- `./client` - TBD client built with Vue.js
- `./client-react` - TBD client built with React
- `./packages` - TBD libraries

Find out more about TBD at [https://github.com/franzos/tbd](https://github.com/franzos/tbd).

## Thougts on Vue (Nuxt.js) vs React (Next.js)

Nuxt

- Quickly fetching some data is much easier with `useFetch` (vs `fetch`)
- Compilation during development is 10x faster

Next

- Server versus client components are just horrible [ref](https://nextjs.org/docs/getting-started/react-essentials#client-components)
- Accessing runtime config requires setup [ref](https://nextjs.org/docs/pages/api-reference/next-config-js/runtime-configuration)
- You have to whitelist image hosts in the config [ref](https://nextjs.org/docs/messages/next-image-unconfigured-host)
- Components can be cleaner in react; for ex:

Vue:

```vue
<template>
  <n-text>
    <b>{{ username }}</b>
  </n-text>
</template>

<script setup lang="ts">
import { NText } from 'naive-ui'
import type { PublicUser } from '@tbd/common'

const props = defineProps({
  user: Object as PropType<PublicUser>,
})

const username = computed(() => {
  if (props.user && props.user.username) return props.user.username
  return 'Unknown'
})
</script>
```

React:

```tsx
import { Text } from '@chakra-ui/react'
import { PublicUser } from '@tbd/common'

export default function User(props: { user?: PublicUser }) {
  const username = () => {
    if (props.user && props.user.username) return props.user.username
    return 'Unknown'
  }
  return <Text><b>{username()}</b></Text>
}
```