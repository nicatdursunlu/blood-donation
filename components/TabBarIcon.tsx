import { useTheme } from '@react-navigation/native'
import { Icon } from '@ui-kitten/components'
import { FC } from 'react'

import { CustomTheme } from '@/styles/theme'

const routeNames = {
  Home: 'home',
  Find: 'search',
  CreatePost: 'plus-circle',
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
        height: 20,
        color: focused ? colors.tabBarTint : '#999999',
      }}
    />
  )
}
