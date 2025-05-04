import { Timestamp } from 'firebase/firestore'

/**
 * NULL許容な型を定義する
 */
export type Nullable<T> = {
  [P in keyof T]: T[P] | null
}

/**
 * ユーザー情報
 */
export type User = {
  id: string
  email: string
  displayName: string
  photoURL: string
}

/**
 * チャンネル情報
 */
export interface Channel {
  id: string
  channelName: string
  channelTopic?: string | null
}

/**
 * チャットメッセージ
 */
export interface ChatMessage {
  id: string
  user: User
  message: string
  isEdited: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}
