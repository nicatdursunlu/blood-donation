import { useTheme } from '@react-navigation/native'
import { Icon } from '@ui-kitten/components'
import { FC } from 'react'

import { CustomTheme } from '@/styles/theme'

const routeNames = {
  Home: 'home',
  Find: 'search',
  CreatePost: 'plus-square',
  Chats: 'message-circle',
  Profile: 'user',
}

interface ITabBarIconProps {
  name: keyof typeof routeNames
  focused: boolean
}

export const TabBarIcon: FC<ITabBarIconProps> = ({ name, focused }) => {
  const { colors } = useTheme() as CustomTheme

  return (
    <Icon
      name={routeNames[name]}
      pack="feather"
      style={{
        height: 25,
        color: focused ? colors.tabBarActive : '#999999',
      }}
    />
  )
}
