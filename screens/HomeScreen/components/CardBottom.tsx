import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Icon } from '@ui-kitten/components'
import { FC } from 'react'

import { CustomTheme } from '@/styles/theme'
import { TCustomText } from '@/components'
import { TPost } from '@/types/post.type'

interface ICardBottomProps {
  post: TPost
}

export const CardBottom: FC<ICardBottomProps> = ({ post }) => {
  const { colors } = useTheme() as CustomTheme

  const handlePhoneCall = async () => {}

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.phone} onPress={handlePhoneCall}>
        <Icon
          name="phone"
          pack="feather"
          style={[styles.phoneIcon, { color: colors.text }]}
        />
        <TCustomText
          weight="semi"
          style={{ ...styles.phoneText, ...{ color: colors.text } }}
        >
          call
        </TCustomText>
      </TouchableOpacity>
      {/* <TouchableOpacity>
        <Icon
          name="bookmark-outline"
          pack="ion"
          style={[styles.bookmarkIcon, { color: colors.text }]}
        />
      </TouchableOpacity> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  phone: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneIcon: {
    height: 18,
    paddingVertical: 6,
    marginRight: 10,
  },
  bookmarkIcon: {
    height: 24,
    paddingVertical: 6,
    marginRight: 10,
  },
  phoneText: {
    fontSize: 14,
  },
  saveIcon: {
    width: 20,
    height: 20,
  },
})
