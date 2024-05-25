export type TMessage = {
  id: string
  authorId: string
  authorFullName: string
  authorPhoto: string | null
  createdAt: Date | string
  lastMessage: string | null
  isRead: boolean
}
