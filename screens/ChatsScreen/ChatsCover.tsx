import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Image } from 'react-native-elements'
import { TChat } from '@/types/chat.type'
import { FC } from 'react'

import { AvatarMaker, CustomText } from '@/components'
import { useAppSelector } from '@/store/hooks'
import { getMessageTime } from '@/utils/date'
import { CustomTheme } from '@/styles/theme'
import { Icon } from '@ui-kitten/components'

interface IChatsCoverProps {
  message: TChat
  onPress: () => void
}

export const ChatsCover: FC<IChatsCoverProps> = ({ message, onPress }) => {
  const {
    authorId,
    authorFullName,
    authorPhoto,
    isRead,
    lastMessage,
    createdAt,
  } = message

  const { colors } = useTheme() as CustomTheme

  const { uid } = useAppSelector((state) => state.auth.user)

  const isMyMessage = authorId === uid

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles().listCover}>
        {authorPhoto ? (
          <Image
            style={styles().userAvatar}
            source={{ uri: authorPhoto }}
            PlaceholderContent={<ActivityIndicator color={colors.primary} />}
            placeholderStyle={{ backgroundColor: '#f2f4f8' }}
          />
        ) : (
          <View style={styles().userAvatar}>
            <AvatarMaker fullName={authorFullName} height={22} />
          </View>
        )}
        <View style={styles().content}>
          <View>
            <CustomText
              weight="semi"
              style={{ ...styles().title, ...{ color: colors.text } }}
            >
              {authorFullName}
            </CustomText>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              {isMyMessage && (
                <Icon
                  pack="ion"
                  name={isRead ? 'checkmark-done-outline' : 'checkmark-outline'}
                  style={styles().checkmarkIcon}
                />
              )}
              <CustomText
                numberOfLines={1}
                weight={isRead ? 'regular' : 'bold'}
                style={{
                  ...styles().lastMessage,
                  ...{ color: colors.lastMsg },
                }}
              >
                {lastMessage}
              </CustomText>
            </View>
          </View>
          <View style={styles().timeRow}>
            <CustomText
              weight="bold"
              style={{ ...styles().time, ...{ color: colors.secondaryText } }}
            >
              {getMessageTime(createdAt)}
            </CustomText>
            {!isRead && (
              <View
                style={{
                  ...styles().unread,
                  ...{ backgroundColor: colors.primary },
                }}
              >
                <CustomText
                  weight="bold"
                  style={{ fontSize: 11, color: '#fff' }}
                >
                  2
                </CustomText>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = () => {
  const { colors } = useTheme() as CustomTheme

  return StyleSheet.create({
    listCover: {
      flexDirection: 'row',
      height: 68,
      alignItems: 'center',
      borderBottomColor: '#8994a3',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    content: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    userAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 15,
    },
    title: {
      fontSize: 18,
    },
    lastMessage: {
      fontSize: 13,
    },
    timeRow: {
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    time: {
      fontSize: 11,
      marginBottom: 10,
    },
    unread: {
      width: 20,
      height: 20,
      borderRadius: 100,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkmarkIcon: {
      height: 20,
      marginRight: 5,
      color: colors.link,
    },
  })
}
