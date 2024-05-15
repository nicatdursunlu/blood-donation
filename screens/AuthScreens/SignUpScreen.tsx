import { createUserWithEmailAndPassword } from 'firebase/auth'
import { CheckBox, Icon, Input } from '@ui-kitten/components'
import { addDoc, collection } from 'firebase/firestore'
import { StyleSheet, View, Alert } from 'react-native'
import { FC, useEffect, useState } from 'react'

import { SIGN_UP_INITIAL_STATE, AUTH_DATA } from 'utils/dummy'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { CustomBtn, Link, TCustomText } from 'components'
import { setUser } from 'store/features/authSlice'
import { TSignUpUser } from 'types/user.type'
import { ModalWindow } from './ModalWindow'
import { getWidthByPercents } from 'utils'
import { auth, db } from 'utils/firebase'
import { Container } from 'commons'

export const SignUpScreen: FC = () => {
  const [checked, setChecked] = useState<boolean>(false)
  const [showPass, setShowPass] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [fields, setFields] = useState<TSignUpUser>(SIGN_UP_INITIAL_STATE)

  const dispatch = useAppDispatch()

  const user = useAppSelector((state) => state.auth)
  console.log('SIGN UP!!!!')

  useEffect(() => {
    console.log('user', user)
  }, [])

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

      if (value?.trim() === '') {
        // Alert.alert(`${i18n.t(key)}  ${i18n.t('req')}`)
        Alert.alert(`${key}  required`)
        return false
      } else if (fields.password !== fields.confirmPassword) {
        Alert.alert(`${key}  doesnt match`)
        return false
      } else if (!checked) {
        // Alert.alert(i18n.t('agree'))
        Alert.alert(`agreement`)
        return false
      } else return true
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
        const {
          name,
          label,
          value,
          caption,
          placeholder,
          captionIcon,
          keyboardType,
          accessoryRight,
        } = item

        return (
          <Input
            key={item.value}
            // label={i18n.t(label)}
            // value={fields[value]}
            label={label}
            value={fields[value as keyof TSignUpUser]}
            // caption={i18n.t(caption)}
            // captionIcon={captionIcon}
            // keyboardType={keyboardType}
            // keyboardType={'default'}
            style={styles.bottomSpacing}
            // placeholder={i18n.t(placeholder)}
            placeholder={placeholder}
            onChangeText={(val) => fieldsChangeHandler(name, val)}
            accessoryRight={
              value === 'password' || value === 'repassword'
                ? togglePass
                : accessoryRight
            }
            secureTextEntry={
              (value === 'password' || value === 'repassword') && !showPass
            }
          />
        )
      })}
      <View style={styles.container}>
        <CheckBox checked={checked} onChange={(val) => setChecked(val)}>
          {
            <TCustomText style={styles.checkText}>
              By creating an account you agree to our
            </TCustomText>
          }
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
      <CustomBtn
        onPress={onSubmit}
        title="create_account"
        style={{ borderWidth: 0 }}
        width={getWidthByPercents(80, 2)}
      />
      <TCustomText>create_account</TCustomText>
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
