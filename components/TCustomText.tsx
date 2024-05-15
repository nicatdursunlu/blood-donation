import React from 'react'
import i18n from 'i18n-js'
import { Text } from 'react-native'
import { useTheme } from '@react-navigation/native'

import { FONT_FAMILIES } from '../styles/fonts'
import { useTranslation } from 'react-i18next'

export const TCustomText = ({ weight, style, children, ...rest }: any) => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const styles = {
    fontFamily:
      // (FONT_FAMILIES[weight] as string) ||
      FONT_FAMILIES.regular,
    color: colors.text,
    ...style,
  }

  console.log(t('create_account'))

  return (
    <Text style={styles} {...rest}>
      {t(children)}
    </Text>
  )
}
