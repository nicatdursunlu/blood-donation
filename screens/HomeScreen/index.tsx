import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { StyleSheet, View } from 'react-native'
import { Button } from '@ui-kitten/components'
import { FC, useEffect } from 'react'

import { logOut } from 'store/features/authSlice'
import { useAppDispatch } from 'store/hooks'
import { auth, db } from 'utils/firebase'

export const HomeScreen: FC = () => {
  const dispatch = useAppDispatch()

  const getUserData = async () => {
    const q = query(
      collection(db, 'users'),
      where('uid', '==', 'bJYJlTr3CKZFFmuwVw5wytngheu2')
    )
    const doc = await getDocs(q)
    const data = doc.docs[0].data()

    // console.log('USERS', data)
  }

  useEffect(() => {
    getUserData()
  }, [])

  const logOutHandler = async () => {
    await auth.signOut()
    dispatch(logOut())
  }

  return (
    <View>
      <Button onPress={logOutHandler}>Log out</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 60,
  },
  list: {
    flexGrow: 1,
    marginHorizontal: 15,
    paddingTop: 15,
  },
})
