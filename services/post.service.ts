import { addDoc, collection, getDocs } from 'firebase/firestore'

import { TCreatePost, TPost } from '@/types/post.type'
import { db } from '@/utils/firebase'

export const getPosts = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'posts'))
    const result = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as TPost[]

    return result
  } catch (error) {
    console.log('getPosts err => ', error)
  }
}

export const addPost = async (post: TCreatePost) => {
  try {
    await addDoc(collection(db, 'posts'), post)
  } catch (error) {
    console.log(error, 'Something went wrong')
  }
}
