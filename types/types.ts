export enum UserPermission {
  User,
  Mod,
  Admin,
}

export interface User {
  ID: number
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string | null
  user_name: string
  user_permissions: UserPermission
  user_avatar: string
  user_bio: string
  email: string
}

export enum DeckStatus {
  Private = 1,
  InReview,
  Published,
}

export interface Deck {
  ID: number
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string | null
  deck_name: string
  deck_description: string
  deck_banner: string
  deck_status: DeckStatus
  deck_key: string
  deck_code: string
  deck_share: boolean
}

export interface DeckWithOwner {
  deck: Deck
  owner: string
  today: boolean
}

export enum AccessPermission {
  AccessNone,
  AccessStudent,
  AccessEditor,
  AccessOwner,
}

export interface DeckCreator {
  deck_id: number
  Deck: Deck
  permission: AccessPermission
  card_count: number
  owner_id: number
  Owner: Omit<
    User,
    'user_name' | 'user_permissions' | 'user_avatar' | 'user_bio'
  >
  settings_today: boolean
}

export enum McqType {
  Standalone,
  Linked,
}

export interface Mcq {
  ID: number
  mcq_name: string
  mcq_answers: string
  mcq_type: McqType
  deck_id: number
  Deck: Deck
}

export enum CardType {
  String,
  Int,
  MCQ,
}

export interface Card {
  ID: number
  card_question: string
  card_answer: string
  deck_id: number
  deck: Deck
  card_type: CardType
  card_format: string
  card_image: string
  card_case: boolean
  card_spaces: boolean
  mcq_id?: {
    Int32: number
  }
  Mcq: Mcq
}

export interface CardResponseValidation {
  validate: boolean
  message: string
  correct_answer: string
}
