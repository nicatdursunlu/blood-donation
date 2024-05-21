import { useTheme } from '@react-navigation/native'
import { StyleSheet, View } from 'react-native'
import { FC } from 'react'

import { CustomTheme } from '@/styles/theme'
import { TCustomText } from '@/components'
import { TPost } from '@/types/post.type'

interface ICardContentProps {
  post: TPost
}

export const CardContent: FC<ICardContentProps> = ({ post }) => {
  const { colors } = useTheme() as CustomTheme

  const { bloodType, description } = post
  return (
    <View style={styles.container}>
      <View style={[styles.blood, { backgroundColor: colors.bloodBG }]}>
        <TCustomText
          weight="bold"
          style={{ ...styles.bloodText, ...{ color: colors.text } }}
        >
          {bloodType}
        </TCustomText>
      </View>
      <View style={styles.info}>
        <TCustomText style={styles.infoText}>{description}</TCustomText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#636366',
    borderTopColor: '#636366',
  },
  blood: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bloodText: {
    fontSize: 22,
  },
  info: {
    justifyContent: 'center',
    width: '80%',
  },
  infoText: {
    fontSize: 12,
  },
})
