import { DefaultTheme, Theme } from '@react-navigation/native'

export type CustomTheme = {
  colors: {
    tabBarActive: string
    tabBarBG: string
    tabBarTint: string
    inputBG: string
    inputBorder: string
    inputText: string
    divider: string
    secondaryText: string
    link: string
    lastMsg: string
    btnText: string
    btnBG: string
    drawerBG: string
    chatBG: string
    myMsg: string
    otherMsg: string
    time: string
    cardBG: string
    bloodBG: string
    chatFormBG: string
  }
} & Theme

export const DarkTheme: CustomTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: '#000',
    card: '#0b0d17',
    border: '#999999',
    tabBarActive: '#222b45',
    tabBarBG: '#0b0d17',
    tabBarTint: '#ff6767',
    inputBG: '#1a2138',
    inputBorder: '#25324b',
    inputText: '#8f9bb3',
    divider: '#fff',
    text: '#fff',
    secondaryText: '#dadada',
    link: '#007aff',
    lastMsg: '#dadada',
    btnText: '#000',
    btnBG: 'grey',
    drawerBG: '#222b45',
    chatBG: '#171717',
    myMsg: '#859bde',
    otherMsg: '#3c3c3e',
    time: '#ffffff80',
    cardBG: '#1a2138',
    bloodBG: '#0b0d17',
    chatFormBG: '#1a2138',
  },
}

export const LightTheme: CustomTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    card: '#f2f1f7',
    border: '#999999',
    tabBarActive: '#ff6767',
    tabBarBG: '#f2f1f7',
    tabBarTint: '#fff',
    inputBG: '#f7f9fc',
    inputBorder: '#e4e9f2',
    inputText: '#8f9bb3',
    divider: '#101426',
    text: '#000',
    secondaryText: '#8f9bb3',
    link: '#0070c9',
    lastMsg: '#1c1c1e',
    btnText: '#000',
    btnBG: '#ff6767',
    drawerBG: '#eeeeef',
    chatBG: '#f6f6f6',
    myMsg: '#859bde',
    otherMsg: '#f7f7f7',
    time: '#00000080',
    cardBG: '#ebedf1',
    bloodBG: '#fff',
    chatFormBG: '#fff',
  },
}
