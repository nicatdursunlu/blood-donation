import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Image } from 'react-native-elements'
import { TMessage } from '@/types/chat.type'
import { FC } from 'react'

import { AvatarMaker, CustomText } from '@/components'
import { getMessageTime } from '@/utils/date'
import { CustomTheme } from '@/styles/theme'

interface IChatsCoverProps {
  message: TMessage
  onPress: () => void
}

export const ChatsCover: FC<IChatsCoverProps> = ({ message, onPress }) => {
  const { authorFullName, authorPhoto, isRead, lastMessage, createdAt } =
    message
  const { colors } = useTheme() as CustomTheme

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.listCover}>
        {authorPhoto ? (
          <Image
            style={styles.userAvatar}
            source={{ uri: authorPhoto }}
            PlaceholderContent={<ActivityIndicator />}
            placeholderStyle={{ backgroundColor: '#f2f4f8' }}
          />
        ) : (
          <View style={styles.userAvatar}>
            <AvatarMaker fullName={authorFullName} height={22} />
          </View>
        )}
        <View style={styles.content}>
          <View>
            <CustomText
              weight="semi"
              style={{ ...styles.title, ...{ color: colors.text } }}
            >
              {authorFullName}
            </CustomText>
            <CustomText
              numberOfLines={1}
              weight={isRead ? 'regular' : 'bold'}
              style={{ ...styles.lastMessage, ...{ color: colors.lastMsg } }}
            >
              {lastMessage}
            </CustomText>
          </View>
          <View style={styles.timeRow}>
            <CustomText
              weight="bold"
              style={{ ...styles.time, ...{ color: colors.secondaryText } }}
            >
              {getMessageTime(createdAt)}
            </CustomText>
            {!isRead && (
              <View
                style={{
                  ...styles.unread,
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

const styles = StyleSheet.create({
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
})
