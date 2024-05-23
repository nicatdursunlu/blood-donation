import {
  FlexStyle,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Spinner } from '@ui-kitten/components'
import { FC } from 'react'

import { CustomTheme } from '@/styles/theme'
import { TCustomText } from './TCustomText'

interface ICustomBtnProps {
  title: string
  onPress: () => void
  width?: FlexStyle['width']
  style?: ViewStyle
  titleStyle?: TextStyle
  loading?: boolean
}

export const CustomBtn: FC<ICustomBtnProps> = ({
  title,
  onPress,
  width,
  style,
  titleStyle = {},
  loading,
}) => {
  const { colors } = useTheme() as CustomTheme
  return (
    <TouchableOpacity onPress={onPress} style={{ width }}>
      <View style={[styles.btn, { borderColor: colors?.inputBorder }, style]}>
        {loading && (
          <Spinner style={{ marginRight: 20 }} status="control" size="small" />
        )}
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
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    color: '#fff',
    fontSize: 17,
    textTransform: 'uppercase',
  },
})
