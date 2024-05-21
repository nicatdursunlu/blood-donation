import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Icon } from '@ui-kitten/components'
import { FC } from 'react'

import { CustomTheme } from '@/styles/theme'
import { TCustomText } from '@/components'
import { TPost } from '@/types/post.type'
import { ICONS } from '@/styles/icons'

interface ICardBottomProps {
  post: TPost
}

export const CardBottom: FC<ICardBottomProps> = () => {
  const { colors } = useTheme() as CustomTheme
  const srcLight = ICONS.savedLight

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.phone}>
        <Icon
          name="phone"
          pack="feather"
          style={[styles.phoneIcon, { color: colors.text }]}
        />
        <TCustomText
          weight="bold"
          style={{ ...styles.phoneText, ...{ color: colors.text } }}
        >
          call
        </TCustomText>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image style={styles.saveIcon} src={srcLight} />
      </TouchableOpacity>
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
  phoneText: {
    fontSize: 12,
    textTransform: 'uppercase',
  },
  saveIcon: {
    width: 20,
    height: 20,
  },
})
