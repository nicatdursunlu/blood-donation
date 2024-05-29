import { FieldValue } from 'firebase/firestore'

export type TChat = {
  id: string
  authorId: string
  authorFullName: string
  authorPhoto: string | null
  createdAt: number
  lastMessage: string | null
  isRead: boolean
}

export type TMessage = {
  authorId: string
  createdAt: number
  text: string
}

export type TCreateMessage = {
  text: string
  // createdAt: Date | string
  createdAt: FieldValue
  authorId: string
  chatId: string
  authorFullName: string
  authorPhoto: string | null
}
