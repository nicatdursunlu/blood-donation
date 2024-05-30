import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { useTheme } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { Icon } from '@ui-kitten/components'

import { logOut } from '@/store/features/authSlice'
import { useAppDispatch } from '@/store/hooks'
import { CustomTheme } from '@/styles/theme'
import { DRAWER_ITEMS } from '@/utils/dummy'
import { auth } from '@/utils/firebase'

export const DrawerContent = ({ navigation }: any) => {
  const { t } = useTranslation()
  const { colors } = useTheme() as CustomTheme

  const dispatch = useAppDispatch()

  const logOutHandler = async () => {
    await auth.signOut()
    dispatch(logOut())
  }

  return (
    <DrawerContentScrollView style={{ backgroundColor: colors.drawerBG }}>
      {DRAWER_ITEMS.map((item) => (
        <DrawerItem
          key={item.title}
          icon={item.icon}
          label={t(item.title)}
          onPress={() => navigation.navigate(item.goTo)}
        />
      ))}
      <DrawerItem
        label={t('log_out')}
        icon={() => (
          <Icon
            name="log-out"
            pack="feather"
            style={{ color: '#999999', height: 23 }}
          />
        )}
        onPress={logOutHandler}
      />
    </DrawerContentScrollView>
  )
}
