import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { useFocusEffect, useTheme } from '@react-navigation/native'
import { FC, useCallback, useState } from 'react'

import { BottomTabsParams } from '@/navigation/BottomTabs'
import { CardCover } from './components/CardCover'
import { getPosts } from '@/services/post.service'
import { logOut } from 'store/features/authSlice'
import { useAppDispatch } from 'store/hooks'
import { CustomTheme } from '@/styles/theme'
import { TPost } from '@/types/post.type'
import { CustomBtn } from '@/components'
import { auth } from 'utils/firebase'

type HomeScreenProps = BottomTabScreenProps<BottomTabsParams, 'Home'>

export const HomeScreen: FC<HomeScreenProps> = () => {
  const dispatch = useAppDispatch()

  const { colors } = useTheme() as CustomTheme

  const [posts, setPosts] = useState<TPost[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const getAllPosts = async () => {
    setLoading(true)
    const res = (await getPosts()) || []
    setPosts(res)
    setLoading(false)
  }

  useFocusEffect(
    useCallback(() => {
      getAllPosts()
    }, [])
  )

  const logOutHandler = async () => {
    await auth.signOut()
    dispatch(logOut())
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{ marginTop: 30 }}
        />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={(post) => <CardCover post={post.item} />}
        />
      )}
      <CustomBtn title="Log out" onPress={logOutHandler} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flexGrow: 1,
    marginHorizontal: 15,
    paddingTop: 15,
  },
})
