import { PublicFile } from './file'

export interface Link {
  url: string
  name: string
}

export interface ContactInfo {
  medium: string
  handle: string
  is_public: boolean
}

export interface UserProfile {
  links?: Link[]
  description?: string
  public_contact_info?: ContactInfo[]
}

export interface PublicUser {
  id: string
  image: PublicFile
  username: string
  username_with_local_part: string
  profile: UserProfile
  public_key: string
  created_at: string
}

export interface PrivateUser {
  id: string
  name: string
  email: string
  phone: string
  image: PublicFile
  username: string
  username_with_local_part: string
  profile: UserProfile
  public_key: string
  created_at: string
}
