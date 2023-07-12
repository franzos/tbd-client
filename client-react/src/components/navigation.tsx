import { Box, Link, Stack, Text } from '@chakra-ui/react'

export default function Sidebar() {
  const menu = [
    {
      label: 'Home',
      key: 'home',
      to: '/',
      virtual: false,
    },
    {
      label: 'Login',
      key: 'login',
      show: 'loggedOut',
      to: '/login',
      virtual: false,
    },
  ]

  return (
    <Box as="nav" aria-label="Main navigation">
      {menu.map((item, index) => (
        <Link key={index} href={item.to}>
          <Text as="span" fontSize="lg">
            {item.label}
          </Text>
        </Link>
      ))}
    </Box>
  )
}
