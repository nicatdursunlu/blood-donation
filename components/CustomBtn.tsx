import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import { FC } from 'react'

import { TCustomText } from './TCustomText'

interface ICustomBtnProps {
  title: string
  onPress: () => void
  width?: number
  style?: ViewStyle
  titleStyle?: TextStyle
}

export const CustomBtn: FC<ICustomBtnProps> = ({
  title,
  onPress,
  width,
  style,
  titleStyle = {},
}) => {
  const { colors } = useTheme()
  return (
    <TouchableOpacity onPress={onPress} style={{ width }}>
      <View
        style={[
          styles.btn,
          // { borderColor: colors?.inputBorder },
          style,
        ]}
      >
        <TCustomText weight="bold" style={{ ...styles.title, ...titleStyle }}>
          {title}
        </TCustomText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    height: 40,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff6767',
    borderWidth: StyleSheet.hairlineWidth,
  },
  title: {
    color: '#fff',
    fontSize: 17,
    textTransform: 'uppercase',
  },
})
