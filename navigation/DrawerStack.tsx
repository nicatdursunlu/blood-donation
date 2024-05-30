import { createDrawerNavigator } from '@react-navigation/drawer'
import { FC } from 'react'

import { ProfileScreen } from '@/screens'
import { DrawerContent } from '@/commons'

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
      drawerContent={({ ...props }) => <DrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#e91e63',
        drawerItemStyle: { marginVertical: 30 },
        // itemStyle: { marginVertical: 30 },
        headerShown: false,
      }}
    >
      <Screen name="Profile" component={ProfileScreen} />
    </Navigator>
  )
}
