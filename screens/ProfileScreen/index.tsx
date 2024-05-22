import { collection, getDocs, query, where } from 'firebase/firestore'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { FC, useEffect, useState } from 'react'

import { CardCover } from '../HomeScreen/components/CardCover'
import { UserInfo } from './components/UserInfo'
import { useAppSelector } from '@/store/hooks'
import { CustomTheme } from '@/styles/theme'
import { TCustomText } from '@/components'
import { TPost } from '@/types/post.type'
import { Container } from '@/commons'
import { db } from '@/utils/firebase'

export const ProfileScreen: FC = () => {
  const { colors } = useTheme() as CustomTheme

  const {
    user: { uid },
  } = useAppSelector((state) => state.auth)

  const [posts, setPosts] = useState<TPost[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const getPosts = async () => {
    try {
      setLoading(true)
      const q = query(collection(db, 'posts'), where('userId', '==', uid))
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        setPosts((posts) => [...posts, doc.data() as TPost])
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <Container>
      <UserInfo />
      <View style={styles.divider}>
        <View style={[styles.line, { borderColor: colors.divider }]} />
        <TCustomText>posts</TCustomText>
        <View style={[styles.line, { borderColor: colors.divider }]} />
      </View>
      <View style={styles.card}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{ marginTop: 30 }}
          />
        ) : (
          posts.map((post) => <CardCover key={post.id} post={post} />)
        )}
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  line: {
    width: '35%',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  card: {
    width: '100%',
    marginBottom: 60,
    alignItems: 'center',
  },
  post: {
    fontSize: 20,
    marginTop: 20,
  },
})
