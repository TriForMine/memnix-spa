export enum DeckStatus {
  Draft = 1,
  Private,
  Published
}

export interface Deck {
  ID: number,
  CreatedAt: string,
  UpdatedAt: string,
  DeletedAt: string | null,
  deck_name: string,
  deck_description: string,
  deck_banner: string,
  deck_status: DeckStatus
}

export enum UserPermission {
  User,
  Mod,
  Admin
}

export interface User {
  ID: number,
  CreatedAt: string,
  UpdatedAt: string,
  DeletedAt: string | null,
  user_name: string,
  user_permissions: UserPermission,
  user_avatar: string,
  user_bio: string,
  email: string
}
