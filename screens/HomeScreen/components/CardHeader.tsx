import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Image } from 'react-native-elements'
import { FC } from 'react'

import { AvatarMaker, TCustomText } from '@/components'
import { getFormattedDate } from '@/utils/date'
import { useAppSelector } from '@/store/hooks'
import { CustomTheme } from '@/styles/theme'
import { TPost } from '@/types/post.type'

interface ICardHeaderProps {
  post: TPost
}

export const CardHeader: FC<ICardHeaderProps> = ({ post }) => {
  const {
    user: { uid },
  } = useAppSelector((state) => state.auth)

  const { colors } = useTheme() as CustomTheme

  const { authorFullName, location, userId, createdAt, authorPhoto } = post

  // const isMe = uid === userId

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        {authorPhoto ? (
          <Image
            style={styles.image}
            source={{ uri: authorPhoto }}
            PlaceholderContent={<ActivityIndicator color={colors.primary} />}
            placeholderStyle={{ backgroundColor: '#f2f4f8' }}
          />
        ) : (
          <View style={styles.image}>
            <AvatarMaker fullName={authorFullName} height={15} />
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.info}>
        <TouchableOpacity style={styles.header}>
          <TCustomText weight="semi" style={styles.authorFullName}>
            {authorFullName}
          </TCustomText>
          <TCustomText
            weight="regular"
            style={{ ...styles.time, ...{ color: colors.time } }}
          >
            {getFormattedDate(createdAt)}
          </TCustomText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.location}>
          <TCustomText numberOfLines={1} style={styles.locationText}>
            {location}
          </TCustomText>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 18,
    marginRight: 10,
  },
  info: {
    width: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 12,
  },
  location: {
    width: 180,
  },
  locationText: {
    fontSize: 12,
  },
  authorFullName: {
    fontSize: 15,
  },
})
