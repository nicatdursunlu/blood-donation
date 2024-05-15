import { useTheme } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { Text, TextStyle } from 'react-native'
import { FC } from 'react'

import { FONT_FAMILIES } from 'styles/fonts'

interface TCustomTextProps {
  weight?: 'regular' | 'bold' | 'semi'
  children: string
  style?: TextStyle
}

export const TCustomText: FC<TCustomTextProps> = ({
  weight = 'regular',
  style,
  children,
  ...rest
}) => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const styles = {
    fontFamily: FONT_FAMILIES[weight] || FONT_FAMILIES.regular,
    color: colors.text,
    ...style,
  }

  return (
    <Text style={styles} {...rest}>
      {t(children)}
    </Text>
  )
}
