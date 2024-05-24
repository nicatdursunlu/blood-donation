import { Image } from 'react-native'
import { IMAGES } from './images'

export const HeaderStyles = {
  headerMode: 'screen',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: '#ff6767',
    fontSize: 20,
  },
}
export const AuthHeader = {
  headerTitleStyle: {
    fontSize: 20,
    color: '#fff',
  },
  headerStyle: {
    // height: 72,
  },
  headerBackground: () => (
    <Image
      source={IMAGES.header}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
      }}
    />
  ),
}

export const BottomTabBarStyles = {
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarItemStyle: {
    paddingBottom: 15,
    height: 70,
  },
  tabBarStyle: {
    backgroundColor: '#fff',
    marginBottom: 15,
    paddingTop: 10,
  },
  tabBarLabelStyle: {
    fontSize: 16,
    fontWeight: 'bold' as 'bold',
  },
}
