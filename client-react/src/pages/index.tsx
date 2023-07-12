import { GetServerSideProps } from 'next'
import getConfig from 'next/config'
import { Container } from '@chakra-ui/react'
import { ListResponse, PublicEntry } from '@tbd/common'
import Entries from '../components/entries'

export const getServerSideProps: GetServerSideProps = async () => {
  const { publicRuntimeConfig } = getConfig()

  try {
    const response = await fetch(`${publicRuntimeConfig.baseUrl}/entries?limit=50`)
    if (!response.ok) throw new Error('Network response was not ok')
    const data: ListResponse<PublicEntry> = await response.json()
    return { props: { data } }
  } catch (error) {
    console.error('Fetch Error:', error)
    return { props: {} }
  }
}

type Props = { data?: ListResponse<PublicEntry> }

const Home: React.FC<Props> = ({ data }) => {
  const entries = data ? <Entries data={data} cols={4} /> : <div>Error loading data</div>
  return (
    <Container maxWidth="100%" centerContent>
      {entries}
    </Container>
  )
}

export default Home
