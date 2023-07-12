import getConfig from 'next/config'
import { Box, Text, Image, LinkBox, Heading, LinkOverlay } from '@chakra-ui/react'
import { fileDownloadUrlHelper, maxChar } from '@tbd/common'
import type { PublicEntry } from '@tbd/common'
import User from './user'

const { publicRuntimeConfig } = getConfig()

export default function Entry(props: { entry: PublicEntry; isEntryPage: boolean }) {
  const entryPath = function () {
    return props.entry && props.entry.id ? `/entries/${props.entry.id}` : '/'
  }
  const title = function () {
    if (props.entry && props.entry.data.title) return props.entry.data.title
    return 'No title'
  }
  const description = function () {
    if (props.entry && props.entry.data.description) return props.entry.data.description
    return 'No description'
  }
  const coverImage = function () {
    const fallback = 'https://via.placeholder.com/600x400'
    const imageExtensions = ['jpg', 'png', 'gif', 'bmp', 'webp']
    if (!props.entry || !props.entry.files) return fallback
    const imageFiles = props.entry.files.filter(file => {
      const extension = file.path.split('.').pop()
      return extension && imageExtensions.includes(extension)
    })
    if (imageFiles.length > 0) {
      return fileDownloadUrlHelper(publicRuntimeConfig.baseUrl, imageFiles[0].id, imageFiles[0].path)
    }
    return fallback
  }

  const createdBy = function () {
    if (props.entry && props.entry.created_by) {
      return props.entry.created_by
    }
    return undefined
  }

  return (
    <LinkBox as="article" maxW="100%" borderWidth="1px" rounded="md" overflow="auto">
      <Box>
        <Image src={coverImage()} alt={title()} objectFit="cover" />
      </Box>
      <Box p={5}>
        <User user={createdBy()} />
        {props.isEntryPage ? (
          <>
            <Heading size="md" my="2">
              <LinkOverlay href="#">{title()}</LinkOverlay>
            </Heading>
            <Text>{description()}</Text>
          </>
        ) : (
          <>
            <Heading size="sm" my="2">
              <LinkOverlay href={entryPath()}>{title()}</LinkOverlay>
            </Heading>
            <Text>{maxChar(description(), 100)}</Text>
          </>
        )}
      </Box>
    </LinkBox>
  )
}
