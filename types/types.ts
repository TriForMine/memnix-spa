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

export interface DeckWithOwner {
  deck: Deck,
  owner: string,
  today: boolean
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

export enum McqType {
  Standalone,
  Linked
}

export interface Mcq {
  ID: number,
  mcq_name: string,
  mcq_answers: string,
  mcq_type: McqType,
  deck_id: number,
  Deck: Deck
}

export enum CardType {
  String,
  Int,
  MCQ
}

export interface Card {
  ID: number,
  card_question: string,
  card_answer: string,
  deck_id: number,
  deck: Deck,
  card_type: CardType,
  card_format: string,
  card_image: string,
  card_case: boolean,
  card_spaces: boolean,
  mcq_id: number,
  Mcq: Mcq
}
