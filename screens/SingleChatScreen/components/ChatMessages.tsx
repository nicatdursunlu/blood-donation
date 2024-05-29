import { FlatList } from 'react-native'
import { FC } from 'react'

import { ChatMessageBubble } from './ChatMessageBubble'
import { TMessage } from '@/types/chat.type'

interface IChatMessagesProps {
  messages: TMessage[]
}

export const ChatMessages: FC<IChatMessagesProps> = ({ messages }) => (
  <FlatList
    data={messages}
    inverted={true}
    renderItem={({ item }) => <ChatMessageBubble message={item} />}
    keyExtractor={(item) => item.createdAt.toString()}
  />
)
