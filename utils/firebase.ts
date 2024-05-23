import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { initializeApp } from 'firebase/app'

// const firebaseConfig = {
//   apiKey: 'AIzaSyDnCrA2d3s8Q5ZqaM1kJhnfV44qu0FUk-o',
//   authDomain: 'blood-donation-82d00.firebaseapp.com',
//   databaseURL: 'https://blood-donation-82d00.firebaseio.com',
//   projectId: 'blood-donation-82d00',
//   storageBucket: 'blood-donation-82d00.appspot.com',
//   messagingSenderId: '499846567864',
//   appId: '1:499846567864:web:84f1756a598710e7c4a14d',
//   measurementId: 'G-CX4Z4NZM5Y',
// }

const firebaseConfig = {
  apiKey: 'AIzaSyCv51-14TC1h5Ls1Bg9UNw2efB05Kp9Tu4',
  authDomain: 'blood-donation-bd6d2.firebaseapp.com',
  databaseURL: 'https://blood-donation-bd6d2.firebaseio.com',
  projectId: 'blood-donation-bd6d2',
  storageBucket: 'blood-donation-bd6d2.appspot.com',
  messagingSenderId: '75634962430',
  appId: '1:75634962430:web:39406493f90861a8be5aaf',
  measurementId: 'G-4X9G94477K',
}

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
// }

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})

// export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
