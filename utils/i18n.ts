import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

import en from 'translations/en.json'
import ru from 'translations/ru.json'
import az from 'translations/az.json'

i18n.use(initReactI18next).init({
  // lng: getLocales()[0].languageCode,
  compatibilityJSON: 'v3',
  fallbackLng: 'ru',
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
    az: {
      translations: az,
    },
  },
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
})

export default i18n
