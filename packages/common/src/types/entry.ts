import { PublicCity } from './city.js'
import { PublicFile } from './file.js'
import { PublicUser } from './user.js'

export interface PublicEntry {
  id: string
  id_with_local_part: string
  type: string
  data: any
  data_signature: string
  files?: PublicFile[]
  city?: PublicCity
  created_by?: PublicUser
  created_at: string
  updated_at: string
  up_votes: number
  down_votes: number
}

export interface EntryType {
  name: string
  label: string
}

// Should probably come from backend
export const EntryTypes: EntryType[] = [
  {
    name: 'apartment-short-term-rental',
    label: 'Apartment: Short Term Rental',
  },
  {
    name: 'apartment-long-term-rental',
    label: 'Apartment: Long Term Rental',
  },
  {
    name: 'pet-sitter',
    label: 'Pet Sitter',
  },
  {
    name: 'item-sale',
    label: 'Item: Sale',
  },
  {
    name: 'looking-for',
    label: 'Looking For',
  },
]
