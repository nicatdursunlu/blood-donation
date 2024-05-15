import { StyleSheet, TextStyle, TouchableOpacity } from 'react-native'
import { FC } from 'react'

import { TCustomText } from './TCustomText'

interface ILinkProps {
  title: string
  onPress: () => void
  style?: TextStyle
}

export const Link: FC<ILinkProps> = ({ title, onPress, style }) => (
  <TouchableOpacity onPress={onPress}>
    <TCustomText weight="semi" style={{ ...styles.title, ...style }}>
      {title}
    </TCustomText>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  title: {
    color: '#0070c9',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
})
