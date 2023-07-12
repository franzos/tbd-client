import { SimpleGrid } from '@chakra-ui/react'
import type { ListResponse, PublicEntry } from '@tbd/common'
import Entry from '@/components/entry'

export default function Entries(props: { data: ListResponse<PublicEntry> | undefined; cols: number }) {
  console.log(props)
  const entries = function (items: PublicEntry[]) {
    return items.map(entry => <Entry key={entry.id} entry={entry} isEntryPage={false} />)
  }

  return props.data && props.data.items ? (
    <SimpleGrid templateColumns={`repeat(${props.cols}, 1fr)`} gap={4}>
      {entries(props.data.items)}
    </SimpleGrid>
  ) : (
    <p>Loading...</p>
  )
}
