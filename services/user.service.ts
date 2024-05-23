import { doc, getDoc, updateDoc } from 'firebase/firestore'

import { TUpdateUser } from '@/types/user.type'
import { db } from '@/utils/firebase'

export const updateUser = async (user: TUpdateUser) => {
  const ref = doc(db, 'users', user.uid)
  const docSnap = await getDoc(ref)

  if (docSnap.exists()) {
    await updateDoc(ref, user)
  }
}
