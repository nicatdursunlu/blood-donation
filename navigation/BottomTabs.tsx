import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DrawerActions, useTheme } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { FC } from 'react'

import {
  ChatsScreen,
  CreatePostScreen,
  HomeScreen,
  ProfileScreen,
} from '@/screens'
import { BottomTabBarStyles } from '@/styles/header-styles'
import { CustomTheme } from '@/styles/theme'
import { TabBarIcon } from '@/components'
import { DrawerStack } from './DrawerStack'
import { Icon } from '@ui-kitten/components'

export type BottomTabsParams = {
  Home: undefined
  Find: undefined
  Chats: undefined
  CreatePost: undefined
  Profile: {
    authorId?: string
    authorFullName?: string
    bloodType?: string
    profilerType: 'user' | 'other'
  }
}

const { Navigator, Screen } = createBottomTabNavigator<BottomTabsParams>()

export const BottomTabs: FC = ({ navigation }: any) => {
  const { t } = useTranslation()
  const { colors } = useTheme() as CustomTheme

  navigation.setOptions({
    headerRight: () => (
      <Icon
        name="menu"
        pack="ion"
        style={{
          height: 28,
          marginRight: 15,
          color: colors.text,
        }}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
    ),
  })

  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.tabBarActive,
        ...BottomTabBarStyles,
        tabBarIcon: ({ focused }) => (
          <TabBarIcon name={route.name} focused={focused} />
        ),
      })}
    >
      <Screen
        name="Home"
        component={HomeScreen}
        options={{ title: t('home') }}
      />
      <Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{ title: t('create') }}
      />
      <Screen
        name="Chats"
        component={ChatsScreen}
        options={{ title: t('chats') }}
      />
      <Screen
        name="Profile"
        component={DrawerStack}
        options={{ title: t('profile') }}
      />
    </Navigator>
  )
}
