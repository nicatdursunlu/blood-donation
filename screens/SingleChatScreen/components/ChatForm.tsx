import {
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import {
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native'
import { useState, FC } from 'react'
import { useTheme } from '@react-navigation/native'

import { TCreateMessage } from '@/types/chat.type'
import { useAppSelector } from '@/store/hooks'
import { CustomTheme } from '@/styles/theme'
import { Icon } from '@ui-kitten/components'
import { SingleChatScreenProps } from '..'
import { db } from '@/utils/firebase'
import { Field } from '@/components'

interface IChatFormProps {
  route: SingleChatScreenProps['route']
}

export const ChatForm: FC<IChatFormProps> = ({ route }) => {
  const { colors } = useTheme() as CustomTheme

  const { user } = useAppSelector((state) => state.auth)
  const { uid: authorId, fullName, photo } = user

  const [message, setMessage] = useState<TCreateMessage>({
    text: '',
    createdAt: serverTimestamp(),
    authorId,
    chatId: route?.params?.chatId,
    authorFullName: route?.params.authorFullName,
    authorPhoto: route?.params.authorPhoto || null,
  })

  const setMessageText = (value: string) => {
    setMessage((message) => ({
      ...message,
      text: value,
    }))
  }

  const sendMessageHandler = async () => {
    try {
      const companionId =
        message.chatId.split('_').find((chatId) => chatId !== user.uid) || ''

      const ref = doc(db, 'messages', message.chatId)

      const docSnap = await getDoc(ref)
      if (docSnap.exists()) {
        await updateDoc(ref, {
          messages: arrayUnion({
            authorId: user.uid,
            text: message.text,
            createdAt: Date.now(),
          }),
        })
      } else {
        await setDoc(ref, {
          messages: [
            {
              authorId: user.uid,
              text: message.text,
              createdAt: Date.now(),
            },
          ],
        })
      }

      const companionRef = doc(db, 'users_chats', companionId)
      await setDoc(
        companionRef,
        {
          [message.chatId]: {
            authorId: user.uid,
            authorPhoto: user.photo,
            authorFullName: user.fullName,
            lastMessage: message.text,
            isRead: false,
            createdAt: Date.now(),
          },
        },
        { merge: true }
      )

      const userRef = doc(db, 'users_chats', user.uid)
      await setDoc(
        userRef,
        {
          [message.chatId]: {
            authorId: message.authorId,
            authorPhoto: message.authorPhoto,
            authorFullName: message.authorFullName,
            lastMessage: message.text,
            isRead: true,
            createdAt: Date.now(),
          },
        },
        { merge: true }
      )

      setMessage((message) => ({
        ...message,
        text: '',
      }))
    } catch (error: any) {
      Alert.alert(error.code, error.message)
      console.log(error, 'Something went wrong', error.code, error.message)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles().container}
    >
      <Field
        multiline
        value={message.text}
        placeholder="type_here"
        textStyle={{ color: colors.text }}
        onChangeText={(val) => setMessageText(val)}
        style={styles().field}
      />
      <TouchableOpacity style={styles().sendBtn} onPress={sendMessageHandler}>
        <Icon name="send" pack="ion" style={styles().icon} />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}
const styles = () => {
  const { colors } = useTheme() as CustomTheme

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      alignContent: 'center',
      flexDirection: 'row',
      paddingHorizontal: 10,
      borderColor: '#999999',
      borderTopWidth: StyleSheet.hairlineWidth,
      marginBottom: 15,
      justifyContent: 'center',
      backgroundColor: colors.chatBG,
    },
    field: {
      marginTop: 7,
      marginBottom: 7,
      borderRadius: 20,
      width: '85%',
      backgroundColor: colors.chatFormBG,
    },
    icon: {
      height: 20,
      color: '#fff',
    },
    sendBtn: {
      borderRadius: 100,
      width: 45,
      height: 45,
      backgroundColor: colors.primary,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
    },
  })
}
