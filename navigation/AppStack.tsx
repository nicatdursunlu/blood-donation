import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from '@react-navigation/native'
import { Icon } from '@ui-kitten/components'
import { FC } from 'react'

import { BottomTabs } from './BottomTabs'
import { HeaderStyles } from 'styles'

export type AppStackParams = {
  Home: undefined
  BottomTabs: undefined
}

const { Navigator, Screen } = createStackNavigator<AppStackParams>()

export const AppStack: FC = () => {
  const { colors } = useTheme()

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
        headerMode: 'float',
      })}
    >
      <Screen
        name="BottomTabs"
        component={BottomTabs}
        // options={({ route }) => ({
        //   ...HeaderStyles,
        //   headerTitle: getHeaderTitle(route),
        //   headerLeft: null,
        // })}
      />
    </Navigator>
  )
}
