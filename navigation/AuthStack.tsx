import { FC } from 'react'
import { Icon } from '@ui-kitten/components'
import { createStackNavigator } from '@react-navigation/stack'
import i18n from 'i18n-js'

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
  const { status } = useAppSelector((state) => state.auth)

  return (
    <Navigator
      screenOptions={({ navigation }) => ({
        ...HeaderStyles,
        ...AuthHeader,
        // headerLeft: (props) => (
        //   <Icon
        //     {...props}
        //     name="md-arrow-back"
        //     pack="ion"
        //     onPress={() => navigation.goBack()}
        //     style={{ height: 25, color: '#fff', marginLeft: 15 }}
        //   />
        // ),
        headerTitleAlign: 'center',
        headerMode: 'float',
      })}
    >
      <Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ title: 'Welcome' }}
      />
      <Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          title: 'Sign Up',
          animationTypeForReplace: status ? 'push' : 'pop',
        }}
      />
      <Screen
        name="Login"
        component={LogInScreen}
        options={{ title: 'Lggin' }}
      />
    </Navigator>
  )
}
