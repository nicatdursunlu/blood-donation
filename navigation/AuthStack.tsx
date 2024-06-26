import { FC } from 'react'
import { Icon } from '@ui-kitten/components'
import { createStackNavigator } from '@react-navigation/stack'
import { useTranslation } from 'react-i18next'

import { LogInScreen, SignUpScreen, WelcomeScreen } from 'screens'
import { HeaderStyles, AuthHeader } from 'styles'
import { useAppSelector } from 'store/hooks'

export type AuthStackParams = {
  Welcome: undefined
  SignUp: undefined
  Login: undefined
}

const { Navigator, Screen } = createStackNavigator<AuthStackParams>()

export const AuthStack: FC = () => {
  const { t } = useTranslation()
  const { status } = useAppSelector((state) => state.auth)

  return (
    <Navigator
      screenOptions={({ navigation }) => ({
        ...HeaderStyles,
        ...AuthHeader,
        headerLeft: (props) => (
          <Icon
            {...props}
            name="arrow-back"
            pack="ion"
            onPress={() => navigation.goBack()}
            style={{ height: 25, color: '#fff', marginLeft: 15 }}
          />
        ),
        headerTitleAlign: 'center',
        headerMode: 'screen',
        headerStatusBarHeight: 50,
      })}
    >
      <Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false, title: t('welcome') }}
      />
      <Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: t('signup') }}
      />
      <Screen
        name="Login"
        component={LogInScreen}
        options={{ title: t('login') }}
      />
    </Navigator>
  )
}
