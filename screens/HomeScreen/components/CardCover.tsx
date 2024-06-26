import { useTheme } from '@react-navigation/native'
import { StyleSheet, View } from 'react-native'
import { FC } from 'react'

import { HomeScreenNavigationProp } from '..'
import { CustomTheme } from '@/styles/theme'
import { CardContent } from './CardContent'
import { CardHeader } from './CardHeader'
import { CardBottom } from './CardBottom'
import { TPost } from '@/types/post.type'

interface ICardCoverProps {
  post: TPost
  navigation?: HomeScreenNavigationProp
}

export const CardCover: FC<ICardCoverProps> = ({ post, navigation }) => {
  const { colors } = useTheme() as CustomTheme

  return (
    <View style={[styles.card, { backgroundColor: colors.cardBG }]}>
      <CardHeader navigation={navigation} post={post} />
      <CardContent post={post} />
      <CardBottom post={post} />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 10,
  },
})
