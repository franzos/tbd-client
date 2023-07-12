import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import getConfig from 'next/config'
import { Grid, GridItem, Text } from '@chakra-ui/react'
import { ListResponse, PublicEntry } from '@tbd/common'
import Entry from '@/components/entry'
import Entries from '@/components/entries'
import Sidebar from '@/components/sidebar'

export const getServerSideProps: GetServerSideProps = async context => {
  const { publicRuntimeConfig } = getConfig()
  const { id } = context.query

  try {
    const response = await fetch(`${publicRuntimeConfig.baseUrl}/entries/${id}`)
    if (!response.ok) throw new Error('Network response was not ok')
    const data: PublicEntry = await response.json()
    return { props: { data } }
  } catch (error) {
    console.error('Fetch Error:', error)
    return { props: {} }
  }
}

export default function EntryPage(props: { data: PublicEntry }) {
  const [entries, setEntries] = useState<ListResponse<PublicEntry>>()

  useEffect(() => {
    const fetchEntries = async () => {
      const { publicRuntimeConfig } = getConfig()
      const response = await fetch(`${publicRuntimeConfig.baseUrl}/entries?limit=50`)
      if (response.ok) {
        const data: ListResponse<PublicEntry> = await response.json()
        setEntries(data)
      }
    }
    fetchEntries()
  }, [])

  return (
    <>
      <Grid templateColumns={`repeat(3, 1fr)`} gap={6}>
        <GridItem>
          <Sidebar />
        </GridItem>
        <GridItem>
          <Entry entry={props.data} isEntryPage={true} />
        </GridItem>
        <GridItem></GridItem>
      </Grid>

      <Entries data={entries} cols={6} />
    </>
  )
}
