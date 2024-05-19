import { ImageProps, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { RenderProp } from '@ui-kitten/components/devsupport'
import { useTheme } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { Input } from '@ui-kitten/components'

import { CustomTheme } from '@/styles/theme'
import { FC } from 'react'

interface IFieldProps {
  label?: string
  value?: string
  style?: ViewStyle
  caption?: string
  disabled?: boolean
  textStyle?: TextStyle
  placeholder?: string
  onChangeText?: (value: string) => void
  accessoryRight?: RenderProp<Partial<ImageProps>>
  secureTextEntry?: boolean
  multiline?: boolean
}

export const Field: FC<IFieldProps> = ({
  label = '',
  value,
  style,
  caption = '',
  disabled = false,
  textStyle,
  placeholder = '',
  onChangeText,
  accessoryRight,
  secureTextEntry,
  multiline = false,
}) => {
  const { t } = useTranslation()
  return (
    <Input
      value={value}
      disabled={disabled}
      label={t(label)}
      caption={t(caption)}
      onChangeText={onChangeText}
      accessoryRight={accessoryRight}
      style={[styles().input, style]}
      placeholder={t(placeholder)}
      secureTextEntry={secureTextEntry}
      textStyle={[styles().text, textStyle]}
      multiline={multiline}
    />
  )
}

const styles = () => {
  const { colors } = useTheme() as CustomTheme

  return StyleSheet.create({
    input: {
      marginBottom: 15,
      borderColor: colors.inputBorder,
      backgroundColor: colors.inputBG,
    },
    text: {
      color: colors.inputText,
    },
  })
}
