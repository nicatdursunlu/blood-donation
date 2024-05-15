import Icon from 'react-native-vector-icons/Feather'
import { StyleSheet } from 'react-native'

export const FeatherIconsPack = {
  name: 'feather',
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
  toReactElement: (props: any) => FeatherIcon({ name, ...props }),
})

function FeatherIcon({ name, style }: any) {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style)
  return <Icon name={name} size={height} color={tintColor} style={iconStyle} />
}
