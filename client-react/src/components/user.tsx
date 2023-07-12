import { Text } from '@chakra-ui/react'
import { PublicUser } from '@tbd/common'

export default function User(props: { user?: PublicUser }) {
  const username = () => {
    if (props.user && props.user.username) return props.user.username
    return 'Unknown'
  }
  return <Text>{username()}</Text>
}
