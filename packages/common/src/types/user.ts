export interface Link {
  url: string;
  name: string;
}

export interface UserProfile {
  links: Link[];
}

export interface PublicUser {
  id: string;
  username: string;
  username_with_local_part: string;
  profile: UserProfile;
  created_at: string;
}
