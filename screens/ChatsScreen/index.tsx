import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { StyleSheet, View, FlatList } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { FC, useEffect, useState } from 'react'

import { AppStackParams } from '@/navigation/AppStack'
import { useAppSelector } from '@/store/hooks'
import { CustomTheme } from '@/styles/theme'
import { TCustomText } from '@/components'
import { TChat } from '@/types/chat.type'
import { ChatsCover } from './ChatsCover'
import { db } from '@/utils/firebase'

type ChatsScreenProps = NativeStackScreenProps<AppStackParams, 'Chats'>

export const ChatsScreen: FC<ChatsScreenProps> = ({ navigation }) => {
  const { colors } = useTheme() as CustomTheme

  const { uid } = useAppSelector((state) => state.auth.user)

  const [messages, setMessages] = useState<TChat[]>([])

  const getChats = () => {
    const userChatsRef = doc(db, 'users_chats', uid)

    onSnapshot(userChatsRef, (doc) => {
      if (doc.exists()) {
        const lists = doc.data()
        const unionIds = Object.keys(lists)

        const chatListsArr: TChat[] = []
        unionIds.forEach((id) => chatListsArr.push({ id, ...lists[id] }))

        setMessages(chatListsArr)
      }
    })
  }

  useEffect(() => {
    getChats()
  }, [])

  const goToSingleChatScreen = ({ id, authorFullName, authorPhoto }: TChat) => {
    readMessage(id)

    navigation.navigate('SingleChat', {
      chatId: id,
      authorFullName,
      authorPhoto,
    })
  }

  const readMessage = async (id: TChat['id']) => {
    try {
      const selectedChat = messages.find((message) => message.id === id)

      if (!selectedChat) throw new Error(`Chat with id ${id} not found`)

      const userChatDoc = doc(db, 'users_chats', uid)

      await setDoc(
        userChatDoc,
        {
          [id]: { ...selectedChat, isRead: true },
        },
        { merge: true }
      )
    } catch (error: any) {
      console.log('readMessage error =>', error.code, error.message)
    }
  }

  return (
    <View style={styles.container}>
      <TCustomText style={{ ...styles.title, ...{ color: colors.link } }}>
        recent_chats
      </TCustomText>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <ChatsCover
            key={item.id}
            message={item}
            onPress={() => {
              goToSingleChatScreen(item)
            }}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    marginVertical: 10,
    fontSize: 14,
  },
})
