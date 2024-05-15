import React from 'react'
import { IMAGES } from '../styles/images'
import { Icon } from '@ui-kitten/components'
import { TSignUpUser } from 'types/user.type'

export const BLOOD_TYPES = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']
export const LANGUAGES = ['english', 'azerbaijani', 'russian']
export const SLIDER_IMAGES = [
  { key: '1', uri: IMAGES.slider1 },
  { key: '2', uri: IMAGES.slider2 },
  { key: '3', uri: IMAGES.slider3 },
  { key: '4', uri: IMAGES.slider4 },
]

export const SIGN_UP_INITIAL_STATE: TSignUpUser = {
  fullName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export const AUTH_DATA = [
  {
    label: 'fullName',
    value: 'fullName',
    placeholder: 'johnd',
    name: 'fullName',
    caption: '',
    keyboardType: '',
  },
  {
    label: 'username',
    value: 'username',
    placeholder: 'johndo',
    caption: '',
    name: 'username',
    keyboardType: '',
    accessoryRight: (props: any) => (
      <Icon {...props} name="user" pack="feather" />
    ),
  },
  {
    label: 'email',
    value: 'email',
    placeholder: 'john',
    name: 'email',
    caption: '',
    accessoryRight: (props: any) => (
      <Icon {...props} name="mail" pack="feather" />
    ),
    keyboardType: 'email-address',
  },
  {
    label: 'password',
    value: 'password',
    placeholder: 'password',
    name: 'password',
    caption: 'pass_hint',
    keyboardType: '',
    captionIcon: (props: any) => (
      <Icon {...props} name="alert-circle" pack="feather" />
    ),
  },
  {
    label: 'repeat_pass',
    value: 'repassword',
    placeholder: 'confirm_pass',
    name: 'repassword',
    caption: 'pass_hint',
    keyboardType: '',
    captionIcon: (props: any) => (
      <Icon {...props} name="alert-circle" pack="feather" />
    ),
  },
]

// export const ITEMS = [
//   {
//     title: 'saved',
//     icon: () => (
//       <Icon
//         name="bookmark"
//         pack="feather"
//         style={{ color: '#999999', height: 23 }}
//       />
//     ),
//     goTo: 'Saved',
//   },
//   {
//     title: 'settings',
//     icon: () => (
//       <Icon
//         name="settings"
//         pack="feather"
//         style={{ color: '#999999', height: 23 }}
//       />
//     ),
//     goTo: 'Settings',
//   },
//   {
//     title: 'about',
//     icon: () => (
//       <Icon
//         name="info"
//         pack="feather"
//         style={{ color: '#999999', height: 23 }}
//       />
//     ),
//     goTo: 'About',
//   },
//   {
//     title: 'rate_us',
//     icon: () => (
//       <Icon
//         name="star"
//         pack="feather"
//         style={{ color: '#999999', height: 23 }}
//       />
//     ),
//     goTo: 'Rate',
//   },
// ]
