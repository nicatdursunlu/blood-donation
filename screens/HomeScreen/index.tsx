import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button } from '@ui-kitten/components'
import { FC, useEffect, useState } from 'react'

import { BottomTabsParams } from '@/navigation/BottomTabs'
import { CardCover } from './components/CardCover'
import { getPosts } from '@/services/post.service'
import { logOut } from 'store/features/authSlice'
import { useAppDispatch } from 'store/hooks'
import { TPost } from '@/types/post.type'
import { auth } from 'utils/firebase'

type HomeScreenProps = BottomTabScreenProps<BottomTabsParams, 'Home'>

export const HomeScreen: FC<HomeScreenProps> = () => {
  const dispatch = useAppDispatch()

  const [posts, setPosts] = useState<TPost[]>([])

  const getAllPosts = async () => {
    const res = (await getPosts()) || []
    setPosts(res)
  }

  useEffect(() => {
    getAllPosts()
  }, [])

  const logOutHandler = async () => {
    await auth.signOut()
    dispatch(logOut())
  }

  return (
    <View style={styles.container}>
      <Button onPress={logOutHandler}>Log out</Button>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={(post) => <CardCover post={post.item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginBottom: 60,
  },
  list: {
    flexGrow: 1,
    marginHorizontal: 15,
    paddingTop: 15,
  },
})
