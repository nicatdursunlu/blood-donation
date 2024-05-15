import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { FC, useEffect } from 'react'
import { Text, View } from 'react-native'
import { useAppDispatch } from 'store/hooks'
import { auth, db } from 'utils/firebase'
import { logOut } from 'store/features/authSlice'
import { Button } from '@ui-kitten/components'

export const HomeScreen: FC = () => {
  const dispatch = useAppDispatch()

  const getUserData = async () => {
    const docRef = query(
      collection(db, `users`),
      where('uid', '==', '3QL5QejcnGaEvyJDqNoHLG1MIyj2')
    )

    const d = await getDoc(doc(db, 'users', '3QL5QejcnGaEvyJDqNoHLG1MIyj2'))

    const collection_ref = collection(db, 'users')
    const q = query(
      collection_ref,
      where('uid', '==', '3QL5QejcnGaEvyJDqNoHLG1MIyj2')
    )
    const doc_refs = await getDocs(q)

    //  return d.data()
    //
    // const docSnap = await getDoc(docRef)

    console.log('USERS', doc_refs.docs)
  }

  useEffect(() => {
    // getUserData()
  }, [])

  const logOutHandler = async () => {
    await auth.signOut()
    dispatch(logOut())
  }

  return (
    <View>
      <Text>Hello World!</Text>
      <Button onPress={logOutHandler}>Log out</Button>
    </View>
  )
}

// export default HomeScreen
