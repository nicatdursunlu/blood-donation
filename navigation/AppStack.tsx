import React from 'react'
import i18n from 'i18n-js'
import { Icon } from '@ui-kitten/components'
import { createStackNavigator } from '@react-navigation/stack'
import {
  useTheme,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native'
import { HeaderStyles } from 'styles'
import { HomeScreen } from 'screens'

export type AppStackParams = {
  Home: undefined
}

const { Navigator, Screen } = createStackNavigator<AppStackParams>()

export const AppStack = () => {
  const { colors } = useTheme()
  return (
    <Navigator
      // headerMode="screen"
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
        headerMode: 'float',
      })}
    >
      <Screen name="Home" options={{ title: 'Home' }}>
        {({ ...props }) => <HomeScreen />}
      </Screen>
    </Navigator>
  )
}

// export function getHeaderTitle(route) {
//   const username = useSelector(selectUsername)
//   const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home'
//   switch (routeName) {
//     case 'Home':
//       return i18n.t('home')
//     case 'Find':
//       return i18n.t('find')
//     case 'Create':
//       return i18n.t('new_post')
//     case 'Chats':
//       return i18n.t('chats')
//     case 'Profile':
//       return username
//   }
// }
