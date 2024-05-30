import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { useFocusEffect, useTheme } from '@react-navigation/native'
import { FC, useCallback, useState } from 'react'

import { BottomTabsParams } from '@/navigation/BottomTabs'
import { CardCover } from './components/CardCover'
import { getPosts } from '@/services/post.service'
import { CustomTheme } from '@/styles/theme'
import { TPost } from '@/types/post.type'

type HomeScreenProps = BottomTabScreenProps<BottomTabsParams, 'Home'>
export type HomeScreenNavigationProp = HomeScreenProps['navigation']

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
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
          renderItem={(post) => (
            <CardCover navigation={navigation} post={post.item} />
          )}
        />
      )}
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
