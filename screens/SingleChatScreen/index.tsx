import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { doc, onSnapshot } from 'firebase/firestore'
import { FC, useEffect, useState } from 'react'
import { View } from 'react-native'

import { ChatMessages } from './components/ChatMessages'
import { AppStackParams } from '@/navigation/AppStack'
import { ChatHeader } from './components/ChatHeader'
import { ChatForm } from './components/ChatForm'
import { TMessage } from '@/types/chat.type'
import { db } from '@/utils/firebase'

export type SingleChatScreenProps = NativeStackScreenProps<
  AppStackParams,
  'SingleChat'
>

export const SingleChatScreen: FC<SingleChatScreenProps> = ({
  navigation,
  route,
}) => {
  const chatId = route.params.chatId

  const [messages, setMessages] = useState<TMessage[]>([])

  const getMessages = () => {
    const chatDocRef = doc(db, 'messages', chatId)

    onSnapshot(chatDocRef, (doc) => {
      if (doc.exists()) {
        const messages = doc?.data()?.messages as TMessage[]
        const sortedMessages = messages?.sort(
          (a, b) => b.createdAt - a.createdAt
        )
        setMessages(sortedMessages)
      }
    })
  }

  useEffect(() => {
    getMessages()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <ChatHeader {...{ navigation, route }} />
      <ChatMessages messages={messages} />
      <ChatForm route={route} />
    </View>
  )
}
