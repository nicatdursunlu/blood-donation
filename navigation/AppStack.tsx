import {
  getFocusedRouteNameFromRoute,
  Route,
  useTheme,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useTranslation } from 'react-i18next'
import { Icon } from '@ui-kitten/components'
import { FC } from 'react'

import { useAppSelector } from '@/store/hooks'
import { EditProfileScreen, ProfileScreen } from '@/screens'
import { BottomTabs } from './BottomTabs'
import { HeaderStyles } from 'styles'

export type AppStackParams = {
  Home: undefined
  Profile: { userId?: string; authorFullName?: string; bloodType?: string }
  BottomTabs: undefined
  EditProfile: undefined
}

const { Navigator, Screen } = createStackNavigator<AppStackParams>()

export const AppStack: FC = () => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const {
    user: { username },
  } = useAppSelector((state) => state.auth)

  const routeNames: Record<string, string> = {
    Home: t('home'),
    Find: t('find'),
    CreatePost: t('new_post'),
    Chats: t('chats'),
    Profile: username,
  }

  const getHeaderTitle = (route: Route<string>) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home'
    return routeNames[routeName]
  }

  return (
    <Navigator
      screenOptions={({ navigation }) => ({
        ...HeaderStyles,
        headerLeft: (props) => (
          <Icon
            {...props}
            name="arrow-back"
            pack="ion"
            onPress={() => navigation.goBack()}
            style={{ height: 25, color: colors.text, marginLeft: 15 }}
          />
        ),
        headerTitleAlign: 'center',
        headerMode: 'screen',
      })}
    >
      <Screen
        name="BottomTabs"
        component={BottomTabs}
        options={({ route }) => ({
          // ...HeaderStyles,
          headerTitle: getHeaderTitle(route),
          headerLeft: () => null,
        })}
      />
      <Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerLeft: () => null,
          title: username,
        }}
      />
      <Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerLeft: () => null,
          title: username,
        }}
      />
    </Navigator>
  )
}
