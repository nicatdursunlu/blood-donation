import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { StyleSheet, View, FlatList } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { FC, useEffect, useState } from 'react'

import { TMessage } from '@/types/chat.type'
import { CustomTheme } from '@/styles/theme'
import { TCustomText } from '@/components'
import { ChatsCover } from './ChatsCover'
import { db } from '@/utils/firebase'

export const ChatsScreen: FC = () => {
  const { colors } = useTheme() as CustomTheme

  const [messages, setMessages] = useState<TMessage[]>([])

  useEffect(() => {
    const q = query(collection(db, 'users_chats'), orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const res = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as TMessage[]

      setMessages(res)
    })

    return () => unsubscribe()
  }, [])

  return (
    <View style={styles.container}>
      <TCustomText style={{ ...styles.title, ...{ color: colors.link } }}>
        recent_chats
      </TCustomText>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <ChatsCover key={item.id} message={item} onPress={() => {}} />
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
