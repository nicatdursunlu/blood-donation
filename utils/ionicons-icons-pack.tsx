import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export const IoniconsPack = {
  name: 'ion',
  icons: createIconsMap(),
}

function createIconsMap() {
  return new Proxy(
    {},
    {
      get(target, name: string) {
        return IconProvider(name)
      },
    }
  )
}

const IconProvider = (name: string) => ({
  toReactElement: (props: any) => IonIcon({ name, ...props }),
})

function IonIcon({ name, style, onPress }: any) {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style)
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name={name} size={height} color={tintColor} style={iconStyle} />
    </TouchableOpacity>
  )
}
