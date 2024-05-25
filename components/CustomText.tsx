import { useTheme } from '@react-navigation/native'
import { Text, TextStyle } from 'react-native'
import { FC } from 'react'

import { FONT_FAMILIES } from 'styles/fonts'

interface ICustomTextProps {
  weight?: 'regular' | 'bold' | 'semi'
  children: any
  numberOfLines?: number
  style?: TextStyle
}

export const CustomText: FC<ICustomTextProps> = ({
  weight = 'regular',
  style,
  children,
  numberOfLines,
  ...rest
}) => {
  const { colors } = useTheme()
  const styles = {
    fontFamily: FONT_FAMILIES[weight] || FONT_FAMILIES.regular,
    color: colors.text,
    ...style,
  }

  return (
    <Text style={styles} numberOfLines={numberOfLines} {...rest}>
      {children}
    </Text>
  )
}
