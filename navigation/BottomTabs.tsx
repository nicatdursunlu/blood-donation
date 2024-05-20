import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { FC } from 'react'

import { CreatePostScreen, HomeScreen } from '@/screens'
import { TabBarIcon } from '@/components/TabBarIcon'
import { CustomTheme } from '@/styles/theme'

export type BottomTabsParams = {
  Home: undefined
  Find: undefined
  Chats: undefined
  CreatePost: undefined
  Profile: undefined
}

const { Navigator, Screen } = createBottomTabNavigator<BottomTabsParams>()

export const BottomTabs: FC = () => {
  const { t } = useTranslation()
  const { colors } = useTheme() as CustomTheme

  return (
    <Navigator
      initialRouteName="Home"
      // appearence={{
      //   topPadding: 10,
      //   horizontalPadding: 10,
      // }}
      screenOptions={({ route }) => ({
        tabBarActiveBackgroundColor: colors.tabBarActive,
        tabBarActiveTintColor: colors.tabBarTint,
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarItemStyle: {
          paddingBottom: 15,
          height: 70,
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          marginBottom: 20,
        },
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
    </Navigator>
  )
}
