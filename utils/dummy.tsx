import { IMAGES } from '../styles/images'
import { Icon } from '@ui-kitten/components'

export const BLOOD_TYPES = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']
export const LANGUAGES = ['english', 'azerbaijani', 'russian']
export const SLIDER_IMAGES = [
  { key: '1', uri: IMAGES.slider1 },
  { key: '2', uri: IMAGES.slider2 },
  { key: '3', uri: IMAGES.slider3 },
  { key: '4', uri: IMAGES.slider4 },
]

export const AUTH_DATA = [
  {
    label: 'fullName',
    value: 'fullName',
    placeholder: 'johnd',
    name: 'fullName',
    caption: '',
  },
  {
    label: 'username',
    value: 'username',
    placeholder: 'johndo',
    caption: '',
    name: 'username',
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
  },
  {
    label: 'password',
    value: 'password',
    placeholder: 'password',
    name: 'password',
    caption: 'pass_hint',
  },
  {
    label: 'repeat_pass',
    value: 'confirmPassword',
    placeholder: 'confirm_pass',
    name: 'confirmPassword',
    caption: 'pass_hint',
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
