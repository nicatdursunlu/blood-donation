import {
  CompositeScreenProps,
  useFocusEffect,
  useTheme,
} from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { FC, useCallback, useEffect, useState } from 'react'

import { CardCover } from '../HomeScreen/components/CardCover'
import { DrawerStackParams } from '@/navigation/DrawerStack'
import { AppStackParams } from '@/navigation/AppStack'
import { UserInfo } from './components/UserInfo'
import { useAppSelector } from '@/store/hooks'
import { CustomTheme } from '@/styles/theme'
import { TCustomText } from '@/components'
import { TPost } from '@/types/post.type'
import { Container } from '@/commons'
import { db } from '@/utils/firebase'

export type ProfileScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AppStackParams, 'Profile'>,
  BottomTabScreenProps<DrawerStackParams, 'Profile'>
>

export const ProfileScreen: FC<ProfileScreenProps> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme() as CustomTheme

  const {
    user: { uid },
  } = useAppSelector((state) => state.auth)

  const isMyProfile =
    route?.params?.profileType === 'user' || !route?.params?.profileType

  const [posts, setPosts] = useState<TPost[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const getPosts = async () => {
    try {
      setLoading(true)
      const userId = isMyProfile ? uid : route?.params?.authorId
      const q = query(collection(db, 'posts'), where('userId', '==', userId))
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        setPosts((posts) => [...posts, { id: doc.id, ...doc.data() } as TPost])
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getPosts()
    }, [])
  )

  return (
    <Container>
      <UserInfo route={route} navigation={navigation} />
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
          posts.map((post, index: number) => (
            <CardCover post={post} key={post.id + index} />
          ))
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
