import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Image } from 'react-native-elements'
import { Icon } from '@ui-kitten/components'
import { FC } from 'react'

import { AvatarMaker, CustomText } from '@/components'
import { CustomTheme } from '@/styles/theme'
import { SingleChatScreenProps } from '..'

export const ChatHeader: FC<SingleChatScreenProps> = ({
  route,
  navigation,
}) => {
  const { authorFullName, authorPhoto, chatId } = route.params
  const { colors } = useTheme() as CustomTheme

  const onPress = () => {}

  return (
    <View style={[styles.container, { backgroundColor: colors.chatBG }]}>
      <TouchableOpacity onPress={() => navigation.navigate('Chats')}>
        <Icon
          name="chevron-left"
          pack="feather"
          style={[styles.left, { color: colors.link }]}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.info} onPress={onPress}>
        {authorPhoto ? (
          <Image
            style={styles.img}
            source={{ uri: authorPhoto }}
            PlaceholderContent={<ActivityIndicator />}
            placeholderStyle={{ backgroundColor: '#f2f4f8' }}
          />
        ) : (
          <View style={styles.img}>
            <AvatarMaker fullName={authorFullName} height={20} />
          </View>
        )}
        <CustomText
          weight="semi"
          style={{ ...styles.name, ...{ color: colors.text } }}
        >
          {authorFullName}
        </CustomText>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  left: {
    height: 30,
    marginRight: 20,
  },
  info: {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontSize: 15,
  },
})
