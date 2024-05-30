import { createDrawerNavigator } from '@react-navigation/drawer'
import { FC } from 'react'

import { ProfileScreen } from '@/screens'

export type DrawerStackParams = {
  Profile: {
    authorId?: string
    authorFullName?: string
    bloodType?: string
    authorPhoto?: string | null
    profileType: 'user' | 'other'
  }
}

const { Navigator, Screen } = createDrawerNavigator<DrawerStackParams>()

export const DrawerStack: FC = () => {
  return (
    <Navigator
      // drawerContent={({ ...props }) => <DrawerContent {...props} />}
      // drawerContentOptions={{
      //   activeTintColor: '#e91e63',
      //   itemStyle: { marginVertical: 30 },
      // }}
      screenOptions={{ headerShown: false }}
    >
      <Screen name="Profile" component={ProfileScreen} />
    </Navigator>
  )
}
