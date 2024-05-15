import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { PersistGate } from 'redux-persist/integration/react'
import { StatusBar } from 'expo-status-bar'
import * as eva from '@eva-design/eva'
import { Provider } from 'react-redux'

import { RootNavigation } from 'navigation/RootNavigation'
import { FeatherIconsPack, IoniconsPack } from './utils'
import { persistor, store } from 'store'
import 'utils/i18n'

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IconRegistry icons={[FeatherIconsPack, IoniconsPack]} />
        <StatusBar style="auto" />
        <ApplicationProvider {...eva} theme={eva.light}>
          <RootNavigation />
        </ApplicationProvider>
      </PersistGate>
    </Provider>
  )
}
