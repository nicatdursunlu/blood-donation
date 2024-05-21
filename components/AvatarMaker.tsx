import { View, StyleSheet } from 'react-native'

import { CustomText } from './CustomText'
import { FC } from 'react'

interface IAvatarMakerProps {
  fullName: string
  height: number
}

export const AvatarMaker: FC<IAvatarMakerProps> = ({ fullName, height }) => {
  const text = fullName
    ? [fullName[0], fullName[fullName.indexOf(' ') + 1]]
    : '??'
  return (
    <View style={styles.body}>
      <CustomText weight="semi" style={{ ...styles.text, fontSize: height }}>
        {text}
      </CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: '#dbdbdb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textTransform: 'capitalize',
    color: '#ff6767',
  },
})
