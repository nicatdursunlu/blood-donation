import { collection, getDocs, query, where } from 'firebase/firestore'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Icon, Input } from '@ui-kitten/components'
import { Alert, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { FC, useState } from 'react'

import { TLoginUser, TUser } from 'types/user.type'
import { setUser } from 'store/features/authSlice'
import { CustomBtn, Link } from 'components'
import { useAppDispatch } from 'store/hooks'
import { getWidthByPercents } from 'utils'
import { auth, db } from 'utils/firebase'
import { Container } from 'commons'

const fieldsInitialState = {
  email: '',
  password: '',
} as TLoginUser

export const LogInScreen: FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [isLogIn, setIsLogIn] = useState<boolean>(true)
  const [visible, setVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [fields, setFields] = useState<TLoginUser>(fieldsInitialState)

  const togglePass = (props: any) => (
    <Icon
      {...props}
      name={visible ? 'eye' : 'eye-off'}
      pack="ion"
      onPress={() => setVisible(!visible)}
    />
  )

  const fieldsChangeHandler = (name: keyof TLoginUser, value: string) => {
    setFields((fields) => ({
      ...fields,
      [name]: value,
    }))
  }

  const getUserData = async (uid: string) => {
    if (uid) {
      const q = query(collection(db, 'users'), where('uid', '==', uid))
      const doc = await getDocs(q)
      return doc.docs[0].data() as TUser
    }
    return {} as TUser
  }

  const onSubmit = async () => {
    // for (let key in fields) {
    //   const value = fields[key as keyof TLoginUser]

    //   if (value?.trim() === '') {
    //     Alert.alert(`${t(key)} ${t('req')}`)
    //     return false
    //   }
    // }

    try {
      setLoading(true)
      const { email, password } = fields

      await signInWithEmailAndPassword(auth, email, password)

      const uid = auth.currentUser?.uid
      const currentUser = await getUserData(uid!)
      dispatch(setUser(currentUser))
    } catch (error: any) {
      Alert.alert(error.code, error.message)
      console.log(error.code, error.message)
    } finally {
      setLoading(false)
    }
  }

  const sendEmailHandler = () => {
    // sendEmail(fields.email)
    // WebBrowser.openBrowserAsync(
    //   'https://accounts.google.com/signin/v2/identifier?service=mail&passive=true&rm=false&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ss=1&scc=1&ltmpl=default&ltmplcache=2&emr=1&osid=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin'
    // )
    setIsLogIn(true)
    setFields((fields) => ({
      ...fields,
      password: '',
    }))
  }

  return (
    <Container style={{ backgroundColor: '#fff' }}>
      <Input
        value={fields.email}
        label={t('email')}
        placeholder={t('email')}
        keyboardType="email-address"
        accessoryRight={(props) => (
          <Icon {...props} name="user" pack="feather" />
        )}
        onChangeText={(val) => fieldsChangeHandler('email', val)}
        style={styles.bottomSpacing}
      />

      {isLogIn && (
        <>
          <Input
            value={fields.password}
            label={t('password')}
            placeholder={t('password')}
            secureTextEntry={!visible}
            accessoryRight={togglePass}
            onChangeText={(val) => fieldsChangeHandler('password', val)}
            style={styles.bottomSpacing}
          />
          <Link
            title="forgot_password"
            style={styles.bottomSpacing}
            onPress={() => setIsLogIn(false)}
          />
        </>
      )}
      <CustomBtn
        loading={loading}
        style={{ borderWidth: 0 }}
        width={getWidthByPercents(80, 2)}
        title={isLogIn ? 'login' : 'send_email'}
        onPress={isLogIn ? onSubmit : sendEmailHandler}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  bottomSpacing: {
    marginBottom: 20,
  },
})
