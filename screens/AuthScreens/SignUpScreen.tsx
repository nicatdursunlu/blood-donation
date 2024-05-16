import { createUserWithEmailAndPassword } from 'firebase/auth'
import { CheckBox, Icon, Input } from '@ui-kitten/components'
import { addDoc, collection } from 'firebase/firestore'
import { StyleSheet, View, Alert } from 'react-native'
import { useTranslation } from 'react-i18next'
import { FC, useState } from 'react'

import { CustomBtn, Link, TCustomText } from 'components'
import { setUser } from 'store/features/authSlice'
import { TSignUpUser } from 'types/user.type'
import { useAppDispatch } from 'store/hooks'
import { ModalWindow } from './ModalWindow'
import { getWidthByPercents } from 'utils'
import { auth, db } from 'utils/firebase'
import { AUTH_DATA } from 'utils/dummy'
import { Container } from 'commons'

export const SignUpScreen: FC = () => {
  const { t } = useTranslation()
  const [checked, setChecked] = useState<boolean>(false)
  const [showPass, setShowPass] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [fields, setFields] = useState<TSignUpUser>({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const dispatch = useAppDispatch()

  const fieldsChangeHandler = (name: string, value: string) => {
    setFields((fields: any) => ({
      ...fields,
      [name]: value,
    }))
  }

  const togglePass = (props: any) => (
    <Icon
      {...props}
      name={showPass ? 'eye' : 'eye-off'}
      pack="ion"
      onPress={() => setShowPass(!showPass)}
    />
  )

  const toggleModal = () => {
    setChecked(true)
    setShowModal(false)
  }

  const validateForm = () => {
    for (let key in fields) {
      const value = fields[key as keyof TSignUpUser]

      console.log(value?.trim())

      if (value?.trim() === '') {
        Alert.alert(`${t(key)}${t('req')}`)
        return false
      } else if (fields.password !== fields.confirmPassword) {
        Alert.alert(t('pass_match'))
        return false
      } else if (!checked) {
        Alert.alert(t('agree'))
        return false
      }
      return true
    }
  }

  const onSubmit = async () => {
    const { email, password, username, fullName } = fields

    try {
      if (validateForm()) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )

        const currentUser = {
          uid: user.uid,
          email,
          username,
          fullName,
          bloodType: null,
          photo: null,
        }

        await addDoc(collection(db, 'users'), {
          authProvider: 'local',
          ...currentUser,
        })

        dispatch(setUser(currentUser))
      }
    } catch (error: any) {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
    }
  }

  return (
    <Container style={{ backgroundColor: '#fff' }}>
      {AUTH_DATA.map((item) => {
        const { name, label, value, caption, placeholder, accessoryRight } =
          item

        return (
          <Input
            key={item.value}
            label={() => (
              <TCustomText style={{ marginBottom: 5 }}>{label}</TCustomText>
            )}
            value={fields[value as keyof TSignUpUser]}
            caption={t(caption)}
            style={styles.bottomSpacing}
            placeholder={t(placeholder)}
            onChangeText={(val) => fieldsChangeHandler(name, val)}
            accessoryRight={
              value === 'password' || value === 'confirmPassword'
                ? togglePass
                : accessoryRight
            }
            secureTextEntry={
              (value === 'password' || value === 'confirmPassword') && !showPass
            }
          />
        )
      })}
      <View style={styles.container}>
        <CheckBox checked={checked} onChange={(val) => setChecked(val)}>
          {<TCustomText style={styles.checkText}>agreement</TCustomText>}
        </CheckBox>
        <Link
          title="terms_and_conditions"
          style={styles.link}
          onPress={() => setShowModal(!showModal)}
        />
        <ModalWindow
          onBackdropPress={() => setShowModal(false)}
          onPress={toggleModal}
          visible={showModal}
        />
      </View>
      <View style={{ justifyContent: 'flex-end', flex: 1, marginBottom: 40 }}>
        <CustomBtn
          onPress={onSubmit}
          title="create_account"
          style={{ borderWidth: 0 }}
          width={getWidthByPercents(80, 2)}
        />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 25,
  },
  checkText: {
    color: '#000',
    marginHorizontal: 10,
    fontSize: 16,
  },
  link: {
    fontSize: 13,
    marginLeft: 32,
  },
  bottomSpacing: {
    marginBottom: 20,
  },
})
