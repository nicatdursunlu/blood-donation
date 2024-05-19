import { addDoc, collection } from 'firebase/firestore'

import { TCreatePost } from '@/types/post.type'
import { auth, db } from '@/utils/firebase'

export const addPost = async (post: TCreatePost) => {
  try {
    const res = await addDoc(collection(db, 'posts'), post)
    console.log('res', res)
  } catch (error) {
    console.log(error, 'Something went wrong')
  }
}
