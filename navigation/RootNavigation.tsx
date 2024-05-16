import { NavigationContainer } from '@react-navigation/native'
import { FC, useCallback, useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'

import { useAppSelector } from 'store/hooks'
import { LightTheme } from '@/styles/theme'
import { loadFonts } from 'styles/fonts'
import { AuthStack } from './AuthStack'
import { AppStack } from './AppStack'

export const RootNavigation: FC = () => {
  SplashScreen.preventAutoHideAsync()

  const [loaded, setLoaded] = useState<boolean>(false)

  const { status } = useAppSelector((state) => state.auth)

  useEffect(() => {
    async function prepare() {
      try {
        loadFonts()
        await new Promise((resolve) => setTimeout(resolve, 2000))
      } catch (e) {
        console.warn(e)
      } finally {
        setLoaded(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      await SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <NavigationContainer onReady={onLayoutRootView} theme={LightTheme}>
      {status ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}
