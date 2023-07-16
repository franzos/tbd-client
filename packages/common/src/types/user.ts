import { PublicFile } from './file'

export interface Link {
  url: string
  name: string
}

export interface UserProfile {
  links: Link[]
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
